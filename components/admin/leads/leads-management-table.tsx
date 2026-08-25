"use client";

import { useState } from "react";
import type { Lead as PrismaLead } from "@/generated/prisma/client";
import { FilterTabs } from "@/components/admin/dashboard/filter-tabs";
import { LeadStatusSelect } from "./lead-status-select";
import { DeleteIconButton } from "@/components/admin/settings/delete-icon-button";
import { deleteLead } from "@/lib/actions/leads";
import { DataTable, DataTableColumn } from "../data-table/data-table";

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

const columns: DataTableColumn<PrismaLead>[] = [
  {
    key: "name",
    header: "Name",
    primary: true,
    searchValue: (lead) => lead.name,
    accessor: (lead) => <span className="font-medium">{lead.name}</span>,
  },
  {
    key: "project",
    header: "Project",
    hideBelow: "lg",
    searchValue: (lead) => lead.project,
    accessor: (lead) => <span className="text-ink/60">{lead.project}</span>,
  },
  {
    key: "value",
    header: "Est. value",
    hideBelow: "xl",
    accessor: (lead) =>
      lead.value ? `KES ${lead.value.toLocaleString()}` : "—",
  },
  {
    key: "status",
    header: "Status",
    accessor: (lead) => (
      <LeadStatusSelect leadId={lead.id} status={lead.status} />
    ),
  },
];

export function LeadsManagementTable({ leads }: { leads: PrismaLead[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = leads.filter(
    (lead) => filter === "All" || STATUS_TO_LABEL[lead.status] === filter,
  );

  return (
    <DataTable
      data={filtered}
      columns={columns}
      keyExtractor={(lead) => lead.id}
      searchPlaceholder="Search leads by name or project…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      renderRowActions={(lead) => (
        <DeleteIconButton
          onDelete={() => deleteLead(lead.id)}
          confirmMessage={`Delete "${lead.name}"?`}
        />
      )}
      emptyMessage="No leads match this filter."
    />
  );
}
