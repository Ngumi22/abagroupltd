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
    <section className="border border-ink/10 bg-white/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 p-5">
        <div>
          <h3 className="font-serif text-2xl">Lead pipeline</h3>
          <p className="mt-1 text-xs text-ink/50">
            Your most recent opportunities
          </p>
        </div>
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
          Export <ArrowUpRight size={14} />
        </button>
      </div>

      <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />

      <ul className="divide-y divide-ink/10 sm:hidden">
        {visibleLeads.map((lead) => (
          <li
            key={`${lead.id}-${lead.date}`}
            className="flex items-center justify-between gap-3 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{lead.name}</p>
              <p className="mt-1 truncate text-xs text-ink/50">
                {lead.project}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <StatusBadge label={lead.status} />
                <span className="text-[11px] text-ink/40">{lead.date}</span>
              </div>
            </div>
            <MoreHorizontal size={17} className="shrink-0" />
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-150 text-left text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-ink/40">
            <tr>
              <th className="px-5 py-4 font-normal">Lead</th>
              <th className="hidden px-5 py-4 font-normal md:table-cell">
                Project type
              </th>
              <th className="px-5 py-4 font-normal">Status</th>
              <th className="hidden px-5 py-4 font-normal lg:table-cell">
                Received
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead) => (
              <tr
                key={`${lead.id}-${lead.date}`}
                className="border-t border-ink/10"
              >
                <td className="px-5 py-4 font-medium">{lead.name}</td>
                <td className="hidden px-5 py-4 text-ink/60 md:table-cell">
                  {lead.project}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge label={lead.status} />
                </td>
                <td className="hidden px-5 py-4 text-xs text-ink/50 lg:table-cell">
                  {lead.date}
                </td>
                <td className="px-5">
                  <MoreHorizontal size={17} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleLeads.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-ink/50">
          No leads match this filter.
        </p>
      )}
    </section>
  );
}
