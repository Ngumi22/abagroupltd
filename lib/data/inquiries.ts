"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Inquiry, InquiryStatus } from "@/generated/prisma/client";
import { requirePermission } from "../auth/require-permission";

export async function getInquiries(): Promise<Inquiry[]> {
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getNewInquiryCount(): Promise<number> {
  return prisma.inquiry.count({ where: { status: "NEW" } });
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requirePermission({ inquiry: ["update"] });

  await prisma.inquiry.update({ where: { id }, data: { status } });

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
