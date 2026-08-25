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

      <ul className="divide-y divide-ink/10 md:hidden">
        {visible.map((lead) => (
          <li key={lead.id} className="flex flex-col gap-2 px-4 py-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{lead.name}</p>
                <p className="mt-0.5 truncate text-xs text-ink/60">
                  {lead.project}
                </p>
              </div>
              <DeleteIconButton
                onDelete={() => deleteLead(lead.id)}
                confirmMessage={`Delete "${lead.name}"?`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <LeadStatusSelect leadId={lead.id} status={lead.status} />
                {lead.value && (
                  <span className="text-xs font-medium text-ink/60">
                    KES {lead.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-3xl text-left text-sm">
          <thead className="text-[9px] uppercase tracking-widest text-ink/40 sm:text-[10px]">
            <tr>
              <th className="px-4 py-3 font-normal sm:px-5 sm:py-4">Name</th>
              <th className="hidden px-4 py-3 font-normal sm:px-5 sm:py-4 lg:table-cell">
                Project
              </th>
              <th className="hidden px-4 py-3 font-normal sm:px-5 sm:py-4 xl:table-cell">
                Est. value
              </th>
              <th className="px-4 py-3 font-normal sm:px-5 sm:py-4">Status</th>
              <th className="px-4 py-3 font-normal sm:px-5 sm:py-4" />
            </tr>
          </thead>
          <tbody>
            {visible.map((lead) => (
              <tr key={lead.id} className="border-t border-ink/10">
                <td className="px-4 py-3 text-sm font-medium sm:px-5 sm:py-4">
                  {lead.name}
                </td>
                <td className="hidden px-4 py-3 text-sm text-ink/60 sm:px-5 sm:py-4 lg:table-cell">
                  {lead.project}
                </td>
                <td className="hidden px-4 py-3 text-sm text-ink/60 sm:px-5 sm:py-4 xl:table-cell">
                  {lead.value ? `KES ${lead.value.toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3 sm:px-5 sm:py-4">
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </td>
                <td className="px-4 py-3 sm:px-5 sm:py-4">
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
        <p className="px-4 py-8 text-center text-sm text-ink/50 sm:px-5">
          No leads match this filter.
        </p>
      )}
    </section>
  );
}
