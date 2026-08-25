"use client";

import { useState } from "react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import { FilterTabs } from "./filter-tabs";

const FILTERS: Array<LeadStatus | "All leads"> = [
  "All leads",
  "New lead",
  "Proposal sent",
  "Site visit",
  "Qualified",
];

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All leads");

  const visibleLeads = leads.filter(
    (lead) => filter === "All leads" || lead.status === filter,
  );

  return (
    <section className="border border-ink/10 bg-white/40 w-full">
      <div className="flex flex-col items-start gap-3 border-b border-ink/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 md:p-6">
        <div className="min-w-0 w-full sm:w-auto">
          <h3 className="truncate font-serif text-xl sm:text-2xl md:text-3xl">
            Lead pipeline
          </h3>
          <p className="mt-0.5 text-[10px] text-ink/50 sm:mt-1 sm:text-xs">
            Your most recent opportunities
          </p>
        </div>
        <button className="flex shrink-0 items-center gap-2 text-[9px] uppercase tracking-widest transition-colors hover:text-ink/70 sm:text-[10px]">
          Export <ArrowUpRight size={13} className="sm:h-3.5 sm:w-3.5" />
        </button>
      </div>

      <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />

      <ul className="divide-y divide-ink/10 sm:hidden">
        {visibleLeads.map((lead) => (
          <li
            key={`${lead.id}-${lead.date}`}
            className="flex items-center justify-between gap-3 px-4 py-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{lead.name}</p>
              <p className="mt-0.5 truncate text-xs text-ink/50">
                {lead.project}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StatusBadge label={lead.status} />
                <span className="text-[10px] text-ink/40">{lead.date}</span>
              </div>
            </div>
            <MoreHorizontal size={17} className="shrink-0" />
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="ww-full md:min-w-150 text-left text-sm">
          <thead className="text-[9px] uppercase tracking-widest text-ink/40 sm:text-[10px]">
            <tr>
              <th className="px-4 py-3 font-normal sm:px-5 sm:py-4">Lead</th>
              <th className="hidden px-4 py-3 font-normal sm:px-5 sm:py-4 md:table-cell">
                Project type
              </th>
              <th className="px-4 py-3 font-normal sm:px-5 sm:py-4">Status</th>
              <th className="hidden px-4 py-3 font-normal sm:px-5 sm:py-4 lg:table-cell">
                Received
              </th>
              <th className="px-4 py-3 sm:px-5 sm:py-4" />
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead) => (
              <tr
                key={`${lead.id}-${lead.date}`}
                className="border-t border-ink/10"
              >
                <td className="px-4 py-3 text-sm font-medium sm:px-5 sm:py-4">
                  {lead.name}
                </td>
                <td className="hidden px-4 py-3 text-sm text-ink/60 sm:px-5 sm:py-4 md:table-cell">
                  {lead.project}
                </td>
                <td className="px-4 py-3 sm:px-5 sm:py-4">
                  <StatusBadge label={lead.status} />
                </td>
                <td className="hidden px-4 py-3 text-xs text-ink/50 sm:px-5 sm:py-4 lg:table-cell">
                  {lead.date}
                </td>
                <td className="px-4 py-3 sm:px-5 sm:py-4">
                  <MoreHorizontal size={17} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleLeads.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-ink/50 sm:px-5">
          No leads match this filter.
        </p>
      )}
    </section>
  );
}
