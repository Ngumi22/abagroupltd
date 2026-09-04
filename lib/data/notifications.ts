"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type NotificationType = "inquiry" | "lead";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  status: string;
  href: string;
  createdAt: Date;
}

export async function getRecentNotifications(
  limit = 8,
): Promise<NotificationItem[]> {
  const [inquiries, leads] = await Promise.all([
    prisma.inquiry.findMany({
      where: { status: "NEW" },
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
    prisma.lead.findMany({
      where: { status: "NEW_LEAD" },
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
  ]);

  const items: NotificationItem[] = [
    ...inquiries.map((i) => ({
      id: i.id,
      type: "inquiry" as const,
      title: i.name,
      subtitle:
        i.message.length > 60 ? `${i.message.slice(0, 60)}…` : i.message,
      status: i.status,
      href: "/admin/messages",
      createdAt: i.createdAt,
    })),
    ...leads.map((l) => ({
      id: l.id,
      type: "lead" as const,
      title: l.name,
      subtitle: l.project,
      status: l.status,
      href: "/admin/leads",
      createdAt: l.createdAt,
    })),
  ];

  return items
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export async function markInquiryRead(id: string) {
  await prisma.inquiry.update({ where: { id }, data: { status: "READ" } });
  revalidatePath("/admin");
}
