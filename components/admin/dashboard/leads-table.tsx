"use client";

import { useState } from "react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import { FilterTabs } from "./filter-tabs";
import { DataTable, DataTableColumn } from "../data-table/data-table";

const FILTERS: Array<LeadStatus | "All leads"> = [
  "All leads",
  "New lead",
  "Proposal sent",
  "Site visit",
  "Qualified",
];

const columns: DataTableColumn<Lead>[] = [
  {
    key: "name",
    header: "Lead",
    primary: true,
    searchValue: (lead) => lead.name,
    accessor: (lead) => <span className="font-medium">{lead.name}</span>,
  },
  {
    key: "project",
    header: "Project type",
    hideBelow: "md",
    searchValue: (lead) => lead.project,
    accessor: (lead) => <span className="text-ink/60">{lead.project}</span>,
  },
  {
    key: "status",
    header: "Status",
    accessor: (lead) => <StatusBadge label={lead.status} />,
  },
  {
    key: "date",
    header: "Received",
    hideBelow: "lg",
    accessor: (lead) => (
      <span className="text-xs text-ink/50">{lead.date}</span>
    ),
  },
];

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All leads");
  const visibleLeads = leads.filter(
    (lead) => filter === "All leads" || lead.status === filter,
  );

  return (
    <DataTable
      data={visibleLeads}
      columns={columns}
      keyExtractor={(lead) => lead.id ?? `${lead.name}-${lead.date}`}
      title="Lead pipeline"
      description="Your most recent opportunities"
      headerActions={
        <button className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-colors hover:text-ink/70 sm:text-[10px]">
          Export <ArrowUpRight size={13} className="sm:h-3.5 sm:w-3.5" />
        </button>
      }
      searchPlaceholder="Search leads…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      renderRowActions={() => <MoreHorizontal size={17} />}
      emptyMessage="No leads match this filter."
    />
  );
}
