"use client";

import { useState } from "react";
import type { Lead as PrismaLead } from "@/generated/prisma/client";
import { FilterTabs } from "@/components/admin/dashboard/filter-tabs";
import { LeadStatusSelect } from "./lead-status-select";
import { DeleteIconButton } from "@/components/admin/settings/delete-icon-button";
import { deleteLead } from "@/lib/actions/leads";

const FILTERS = [
  "All",
  "New lead",
  "Proposal sent",
  "Site visit",
  "Qualified",
  "Won",
  "Lost",
] as const;

const STATUS_TO_LABEL: Record<string, (typeof FILTERS)[number]> = {
  NEW_LEAD: "New lead",
  PROPOSAL_SENT: "Proposal sent",
  SITE_VISIT: "Site visit",
  QUALIFIED: "Qualified",
  WON: "Won",
  LOST: "Lost",
};

export function LeadsManagementTable({ leads }: { leads: PrismaLead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = leads.filter(
    (lead) => filter === "All" || STATUS_TO_LABEL[lead.status] === filter,
  );

  return (
    <section className="border border-ink/10 bg-white/40">
      <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />

      <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-left text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-ink/40">
            <tr>
              <th className="px-5 py-4 font-normal">Name</th>
              <th className="hidden px-5 py-4 font-normal md:table-cell">
                Project
              </th>
              <th className="hidden px-5 py-4 font-normal lg:table-cell">
                Est. value
              </th>
              <th className="px-5 py-4 font-normal">Status</th>
              <th className="px-5 py-4 font-normal" />
            </tr>
          </thead>
          <tbody>
            {visible.map((lead) => (
              <tr key={lead.id} className="border-t border-ink/10">
                <td className="px-5 py-4 font-medium">{lead.name}</td>
                <td className="hidden px-5 py-4 text-ink/60 md:table-cell">
                  {lead.project}
                </td>
                <td className="hidden px-5 py-4 text-ink/60 lg:table-cell">
                  {lead.value ? `KES ${lead.value.toLocaleString()}` : "—"}
                </td>
                <td className="px-5 py-4">
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </td>
                <td className="px-5 py-4">
                  <DeleteIconButton
                    onDelete={() => deleteLead(lead.id)}
                    confirmMessage={`Delete "${lead.name}"?`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-ink/50">
          No leads match this filter.
        </p>
      )}
    </section>
  );
}
