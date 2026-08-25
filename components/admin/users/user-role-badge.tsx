export function UserRoleBadge({
  role,
  banned,
}: {
  role: string | null | undefined;
  banned?: boolean | null;
}) {
  if (banned) {
    return (
      <span className="text-[10px] uppercase tracking-widest text-red-700">
        Banned
      </span>
    );
  }
  return (
    <span
      className={`text-[10px] uppercase tracking-widest ${
        role === "admin" ? "text-bronze-dark" : "text-ink/50"
      }`}
    >
      {role ?? "staff"}
    </span>
  );
}
