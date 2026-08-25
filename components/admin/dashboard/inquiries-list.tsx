"use client";

import { Fragment, useState, useTransition } from "react";
import { Archive, Mail, MailOpen, UserPlus } from "lucide-react";
import { FilterTabs } from "@/components/admin/dashboard/filter-tabs";
import { InquiryStatusBadge } from "./inquiry-status-badge";

import { Inquiry, InquiryStatus } from "@/generated/prisma/client";
import { updateInquiryStatus } from "@/lib/data/inquiries";
import { formatDate } from "@/lib/utils";
import { ConvertToLeadForm } from "../messages/convert-to-lead-form";

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

  return (
    <section className="border border-ink/10 bg-white/40">
      <FilterTabs options={FILTERS} value={filter} onChange={setFilter} />

      {/* Mobile: stacked cards */}
      <ul className="divide-y divide-ink/10 sm:hidden">
        {visible.map((inquiry) => (
          <li key={inquiry.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{inquiry.name}</p>
                <p className="truncate text-xs text-ink/50">{inquiry.email}</p>
              </div>
              <InquiryStatusBadge status={inquiry.status} />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              {inquiry.message}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-ink/40">
                {formatDate(inquiry.createdAt)}
              </span>
              <InquiryActions
                inquiry={inquiry}
                isPending={isPending && pendingId === inquiry.id}
                onStatusChange={handleStatusChange}
                onConvert={handleToggleConvert}
              />
            </div>
            {convertingId === inquiry.id && (
              <ConvertToLeadForm
                inquiryId={inquiry.id}
                onDone={() => setConvertingId(null)}
              />
            )}
          </li>
        ))}
      </ul>

      {/* sm and up: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-150 text-left text-sm">
          <thead className="text-[10px] uppercase tracking-widest text-ink/40">
            <tr>
              <th className="px-5 py-4 font-normal">From</th>
              <th className="hidden px-5 py-4 font-normal md:table-cell">
                Message
              </th>
              <th className="px-5 py-4 font-normal">Status</th>
              <th className="hidden px-5 py-4 font-normal lg:table-cell">
                Received
              </th>
              <th className="px-5 py-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((inquiry) => (
              <Fragment key={inquiry.id}>
                <tr className="border-t border-ink/10 align-top">
                  <td className="px-5 py-4">
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-xs text-ink/50">{inquiry.email}</p>
                  </td>
                  <td className="hidden max-w-80 px-5 py-4 text-ink/60 md:table-cell">
                    <p className="line-clamp-2">{inquiry.message}</p>
                  </td>
                  <td className="px-5 py-4">
                    <InquiryStatusBadge status={inquiry.status} />
                  </td>
                  <td className="hidden px-5 py-4 text-xs text-ink/50 lg:table-cell">
                    {formatDate(inquiry.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <InquiryActions
                      inquiry={inquiry}
                      isPending={isPending && pendingId === inquiry.id}
                      onStatusChange={handleStatusChange}
                      onConvert={handleToggleConvert}
                    />
                  </td>
                </tr>
                {convertingId === inquiry.id && (
                  <tr
                    key={`${inquiry.id}-convert`}
                    className="border-t border-ink/10 bg-[#eee9df]/40"
                  >
                    <td colSpan={5} className="px-5 py-4">
                      <ConvertToLeadForm
                        inquiryId={inquiry.id}
                        onDone={() => setConvertingId(null)}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-ink/50">
          No messages match this filter.
        </p>
      )}
    </section>
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
