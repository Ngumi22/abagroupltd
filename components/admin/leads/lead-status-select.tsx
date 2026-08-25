"use client";

import { LeadStatus } from "@/generated/prisma/client";
import { updateLeadStatus } from "@/lib/actions/leads";
import { useTransition } from "react";

const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW_LEAD: "New lead",
  PROPOSAL_SENT: "Proposal sent",
  SITE_VISIT: "Site visit",
  QUALIFIED: "Qualified",
  WON: "Won",
  LOST: "Lost",
};

export function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() =>
          updateLeadStatus(leadId, e.target.value as LeadStatus),
        )
      }
      className="border-b border-ink/20 bg-transparent py-1 text-xs outline-none disabled:opacity-50"
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
