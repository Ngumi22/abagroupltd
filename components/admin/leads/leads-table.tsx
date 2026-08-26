"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import type { Lead, LeadStatus } from "@/lib/types";
import { StatusBadge } from "../dashboard/status-badge";
import { FilterTabs } from "../dashboard/filter-tabs";
import { DataTable, type DataTableColumnMeta } from "../data-table/data-table";
import type { DataTableFeatures } from "../data-table/data-table-features";
import { LeadRowActions } from "./lead-row-actions";
import { downloadCsv } from "@/lib/csv";

const FILTERS: Array<LeadStatus | "All leads"> = [
  "All leads",
  "New lead",
  "Proposal sent",
  "Site visit",
  "Qualified",
];

const columnHelper = createColumnHelper<DataTableFeatures, Lead>();

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Lead",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  }),
  columnHelper.accessor("project", {
    header: "Project type",
    cell: ({ row }) => (
      <span className="text-ink/60">{row.original.project}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => <StatusBadge label={row.original.status} />,
  }),
  columnHelper.accessor("date", {
    header: "Received",
    cell: ({ row }) => (
      <span className="text-xs text-ink/50">{row.original.date}</span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => <LeadRowActions lead={row.original} />,
  }),
]);

const columnMeta: Record<string, DataTableColumnMeta> = {
  name: { primary: true },
  project: { hideBelow: "md" },
  date: { hideBelow: "lg" },
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All leads");
  const visibleLeads = leads.filter(
    (lead) => filter === "All leads" || lead.status === filter,
  );

  function handleExport() {
    downloadCsv(
      `leads-${new Date().toISOString().slice(0, 10)}.csv`,
      visibleLeads.map((lead) => ({
        Name: lead.name,
        Project: lead.project,
        Status: lead.status,
        Received: lead.date,
      })),
    );
  }

  return (
    <DataTable
      data={visibleLeads}
      columns={columns}
      columnMeta={columnMeta}
      getSearchText={(lead) => `${lead.name} ${lead.project}`}
      title="Lead pipeline"
      description="Your most recent opportunities"
      headerActions={
        <button
          onClick={handleExport}
          disabled={visibleLeads.length === 0}
          className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-colors hover:text-ink/70 disabled:opacity-40 sm:text-[10px]"
        >
          Export <ArrowUpRight size={13} className="sm:h-3.5 sm:w-3.5" />
        </button>
      }
      searchPlaceholder="Search leads…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      emptyMessage="No leads match this filter."
    />
  );
}
