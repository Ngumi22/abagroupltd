"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { globalRateLimiter, fallbackGlobalRateLimiter } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function getClientIp(headersList: Headers): string {
  const forwarded =
    headersList.get("x-vercel-forwarded-for") ||
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for");
  if (!forwarded) return "unknown-ip-bucket";
  return forwarded.split(",")[0]?.trim() || "unknown-ip-bucket";
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const limiter = globalRateLimiter ?? fallbackGlobalRateLimiter;

  try {
    const headersList = await headers();
    const rl = await limiter.limit(getClientIp(headersList));
    if (!rl.success) {
      return {
        status: "error",
        message: "Too many requests. Please try again shortly.",
      };
    }
  } catch (error) {
    console.error("[Contact] Rate limiter error:", error);
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission",
    };
  }

  if (parsed.data.company) {
    return { status: "success" };
  }

  const { name, email, message } = parsed.data;

  await prisma.inquiry.create({ data: { name, email, message } });

  try {
    await resend.emails.send({
      from: "Aba Group Website <onboarding@resend.dev>",
      to: process.env.CONTACT_INBOX_EMAIL!,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });
  } catch (error) {
    console.error("[Contact] Failed to send notification email:", error);
  }

  return { status: "success" };
}
