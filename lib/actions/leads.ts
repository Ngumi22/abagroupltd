"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/require-permission";
import {
  createLeadSchema,
  convertInquirySchema,
} from "@/lib/validations/leads";
import { LeadStatus } from "@/generated/prisma/client";

export type ActionState = { status: "idle" | "error"; message?: string };
const idle: ActionState = { status: "idle" };

function revalidateLeadPages() {
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function createLead(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ lead: ["create"] });

  const parsed = createLeadSchema.safeParse({
    name: formData.get("name"),
    project: formData.get("project"),
    status: formData.get("status") || undefined,
    value: formData.get("value") || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid lead",
    };
  }

  await prisma.lead.create({ data: parsed.data });
  revalidateLeadPages();
  return idle;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requirePermission({ lead: ["update"] });
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidateLeadPages();
}

export async function deleteLead(id: string) {
  await requirePermission({ lead: ["delete"] });
  await prisma.lead.delete({ where: { id } });
  revalidateLeadPages();
}

export async function convertInquiryToLead(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Touches both resources — creating a lead and closing out the inquiry it came from.
  await requirePermission({ lead: ["create"], inquiry: ["update"] });

  const parsed = convertInquirySchema.safeParse({
    inquiryId: formData.get("inquiryId"),
    project: formData.get("project"),
    value: formData.get("value") || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: parsed.data.inquiryId },
  });
  if (!inquiry) {
    return { status: "error", message: "That inquiry no longer exists." };
  }

  await prisma.$transaction([
    prisma.lead.create({
      data: {
        name: inquiry.name,
        project: parsed.data.project,
        value: parsed.data.value,
        status: "NEW_LEAD",
      },
    }),
    prisma.inquiry.update({
      where: { id: inquiry.id },
      data: { status: "ARCHIVED" },
    }),
  ]);

  revalidateLeadPages();
  return idle;
}
