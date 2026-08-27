"use client";

import { useState, useTransition } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Archive, Mail, MailOpen, UserPlus } from "lucide-react";
import { FilterTabs } from "@/components/admin/dashboard/filter-tabs";
import { InquiryStatusBadge } from "./inquiry-status-badge";
import type { Inquiry, InquiryStatus } from "@/generated/prisma/client";
import { updateInquiryStatus } from "@/lib/data/inquiries";
import { formatDate } from "@/lib/utils";
import { ConvertToLeadForm } from "../messages/convert-to-lead-form";
import { DataTable } from "../data-table/data-table";
import type { DataTableFeatures } from "../data-table/data-table-features";

const FILTERS = ["All", "New", "Read", "Archived"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_TO_STATUS: Record<Exclude<Filter, "All">, InquiryStatus> = {
  New: "NEW",
  Read: "READ",
  Archived: "ARCHIVED",
};

export function InquiriesList({ inquiries }: { inquiries: Inquiry[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const visible = inquiries.filter(
    (inquiry) =>
      filter === "All" || inquiry.status === FILTER_TO_STATUS[filter],
  );

  function handleStatusChange(id: string, status: InquiryStatus) {
    setPendingId(id);
    startTransition(async () => {
      await updateInquiryStatus(id, status);
      setPendingId(null);
    });
  }

  function handleToggleConvert(id: string) {
    setConvertingId((current) => (current === id ? null : id));
  }

  if (inquiries.length === 0) {
    return (
      <div className="border border-dashed border-ink/20 bg-[#eee9df] p-10 text-center">
        <h2 className="font-serif text-2xl">No messages yet</h2>
        <p className="mt-2 text-sm text-ink/55">
          New contact form submissions will appear here.
        </p>
      </div>
    );
  }

  const columns: ColumnDef<DataTableFeatures, Inquiry>[] = [
    {
      id: "from",
      header: "From",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-ink/50">{row.original.email}</p>
        </div>
      ),
    },
    {
      id: "message",
      header: "Message",
      cell: ({ row }) => (
        <p className="line-clamp-2 max-w-80 text-ink/60">
          {row.original.message}
        </p>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <InquiryStatusBadge status={row.original.status} />,
    },
    {
      id: "received",
      header: "Received",
      cell: ({ row }) => (
        <span className="text-xs text-ink/50">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <InquiryActions
          inquiry={row.original}
          isPending={isPending && pendingId === row.original.id}
          onStatusChange={handleStatusChange}
          onConvert={handleToggleConvert}
        />
      ),
    },
  ];

  return (
    <DataTable
      data={visible}
      columns={columns}
      columnMeta={{
        from: { primary: true },
        message: { hideBelow: "md" },
        received: { hideBelow: "lg" },
      }}
      getSearchText={(inquiry) =>
        `${inquiry.name} ${inquiry.email} ${inquiry.message}`
      }
      searchPlaceholder="Search messages by name or email…"
      filters={
        <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />
      }
      emptyMessage="No messages match this filter."
      isRowExpanded={(inquiry) => convertingId === inquiry.id}
      renderExpandedContent={(inquiry) => (
        <ConvertToLeadForm
          inquiryId={inquiry.id}
          onDone={() => setConvertingId(null)}
        />
      )}
    />
  );
}

function InquiryActions({
  inquiry,
  isPending,
  onStatusChange,
  onConvert,
}: {
  inquiry: Inquiry;
  isPending: boolean;
  onStatusChange: (id: string, status: InquiryStatus) => void;
  onConvert: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {inquiry.status === "NEW" && (
        <div className="relative group flex items-center justify-center">
          <button
            onClick={() => onStatusChange(inquiry.id, "READ")}
            disabled={isPending}
            className="text-ink/50 transition hover:text-ink disabled:opacity-40"
            aria-label="Mark as read"
          >
            <MailOpen size={16} />
          </button>
          <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
            Mark as read
          </span>
        </div>
      )}

      <div className="relative group flex items-center justify-center">
        <a
          href={`mailto:${inquiry.email}`}
          className="text-ink/50 transition hover:text-ink"
          aria-label="Reply by email"
        >
          <Mail size={16} />
        </a>
        <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
          Reply by email
        </span>
      </div>

      {inquiry.status !== "ARCHIVED" && (
        <div className="relative group flex items-center justify-center">
          <button
            onClick={() => onStatusChange(inquiry.id, "ARCHIVED")}
            disabled={isPending}
            className="text-ink/50 transition hover:text-ink disabled:opacity-40"
            aria-label="Archive"
          >
            <Archive size={16} />
          </button>
          <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
            Archive
          </span>
        </div>
      )}

      {inquiry.status !== "ARCHIVED" && (
        <div className="relative group flex items-center justify-center">
          <button
            onClick={() => onConvert(inquiry.id)}
            disabled={isPending}
            className="text-ink/50 transition hover:text-ink disabled:opacity-40"
            aria-label="Convert to lead"
          >
            <UserPlus size={16} />
          </button>
          <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
            Convert to lead
          </span>
        </div>
      )}
    </div>
  );
}
