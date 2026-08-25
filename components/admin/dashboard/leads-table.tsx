"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Lead, LeadStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import { FilterTabs } from "./filter-tabs";
import { DataTable, DataTableColumn } from "../data-table/data-table";
import { downloadCsv } from "@/lib/csv";

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
      keyExtractor={(lead) => lead.id ?? `${lead.name}-${lead.date}`}
      title="Lead pipeline"
      description="Your most recent opportunities"
      headerActions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-colors hover:text-ink/70 sm:text-[10px]"
          >
            View all <ArrowUpRight size={13} className="sm:h-3.5 sm:w-3.5" />
          </Link>
          <span className="text-ink/20">|</span>
          <button
            onClick={handleExport}
            disabled={visibleLeads.length === 0}
            className="flex items-center gap-2 text-[9px] uppercase tracking-widest transition-colors hover:text-ink/70 disabled:opacity-40 sm:text-[10px]"
          >
            Export <ArrowUpRight size={13} className="sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      }
      searchPlaceholder="Search leads…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      emptyMessage="No leads match this filter."
    />
  );
}
