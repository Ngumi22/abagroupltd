"use client";

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { Lead as PrismaLead } from "@/generated/prisma/client";
import { FilterTabs } from "@/components/admin/dashboard/filter-tabs";
import { LeadStatusSelect } from "./lead-status-select";
import { DeleteIconButton } from "@/components/admin/settings/delete-icon-button";
import { deleteLead } from "@/lib/actions/leads";
import { DataTable, type DataTableColumnMeta } from "../data-table/data-table";
import type { DataTableFeatures } from "../data-table/data-table-features";

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

const columnHelper = createColumnHelper<DataTableFeatures, PrismaLead>();

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  }),
  columnHelper.accessor("project", {
    header: "Project",
    cell: ({ row }) => (
      <span className="text-ink/60">{row.original.project}</span>
    ),
  }),
  columnHelper.accessor("value", {
    header: "Est. value",
    cell: ({ row }) =>
      row.original.value ? `KES ${row.original.value.toLocaleString()}` : "—",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <LeadStatusSelect leadId={row.original.id} status={row.original.status} />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DeleteIconButton
        onDelete={() => deleteLead(row.original.id)}
        confirmMessage={`Delete "${row.original.name}"?`}
      />
    ),
  }),
]);

const columnMeta: Record<string, DataTableColumnMeta> = {
  name: { primary: true },
  project: { hideBelow: "lg" },
  value: { hideBelow: "xl" },
};

export function LeadsManagementTable({ leads }: { leads: PrismaLead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = leads.filter(
    (lead) => filter === "All" || STATUS_TO_LABEL[lead.status] === filter,
  );

  return (
    <DataTable
      data={filtered}
      columns={columns}
      columnMeta={columnMeta}
      getSearchText={(lead) => `${lead.name} ${lead.project}`}
      searchPlaceholder="Search leads by name or project…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      emptyMessage="No leads match this filter."
    />
  );
}
