import { prisma } from "@/lib/prisma";
import type { Lead, LeadStatus } from "@/lib/types";
import type {
  Lead as PrismaLead,
  LeadStatus as PrismaLeadStatus,
} from "@/generated/prisma/client";

const STATUS_TO_DISPLAY: Record<PrismaLeadStatus, LeadStatus> = {
  NEW_LEAD: "New lead",
  PROPOSAL_SENT: "Proposal sent",
  SITE_VISIT: "Site visit",
  QUALIFIED: "Qualified",
  WON: "Won",
  LOST: "Lost",
};

function formatDate(date: Date): string {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function mapLead(record: PrismaLead): Lead {
  return {
    id: record.id,
    name: record.name,
    project: record.project,
    status: STATUS_TO_DISPLAY[record.status],
    date: formatDate(record.createdAt),
  };
}

export async function getLeads(): Promise<Lead[]> {
  const records = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapLead);
}

/** Sum of estimated value across leads not yet Won or Lost — the real pipeline figure. */
export async function getOpenLeadsPipelineValue(): Promise<number> {
  const result = await prisma.lead.aggregate({
    where: { status: { notIn: ["WON", "LOST"] } },
    _sum: { value: true },
  });
  return result._sum.value ?? 0;
}
