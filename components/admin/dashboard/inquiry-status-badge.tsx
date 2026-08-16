import type { InquiryStatus } from "@/generated/prisma/client";

const STATUS_STYLES: Record<
  InquiryStatus,
  { label: string; dot: string; text?: string }
> = {
  NEW: { label: "New", dot: "bg-bronze" },
  READ: { label: "Read", dot: "bg-ink/30" },
  ARCHIVED: { label: "Archived", dot: "bg-ink/15", text: "text-ink/40" },
};

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const { label, dot, text } = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-2 text-xs ${text ?? ""}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
