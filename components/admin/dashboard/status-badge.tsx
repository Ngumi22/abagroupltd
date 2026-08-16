export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
      {label}
    </span>
  );
}
