"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Inquiry, InquiryStatus } from "@/generated/prisma/client";

export async function getInquiries(): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getNewInquiryCount(): Promise<number> {
  return prisma.inquiry.count({ where: { status: "NEW" } });
}

async function requireDashboardUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (
    !session ||
    session.user.banned ||
    (role !== "admin" && role !== "staff")
  ) {
    throw new Error("Unauthorized");
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireDashboardUser();

  await prisma.inquiry.update({ where: { id }, data: { status } });

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
