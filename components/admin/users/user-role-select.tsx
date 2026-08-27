"use client";

import { useTransition } from "react";
import { setDashboardUserRole, type DashboardRole } from "@/lib/actions/users";

const ROLES: DashboardRole[] = ["writer", "staff", "admin"];

export function UserRoleSelect({
  userId,
  role,
}: {
  userId: string;
  role: DashboardRole;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={role}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() =>
          setDashboardUserRole(userId, e.target.value as DashboardRole),
        )
      }
      className="border-b border-ink/20 bg-transparent py-1 text-xs outline-none disabled:opacity-50"
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {r === "writer" ? "Writer" : r === "staff" ? "Staff" : "Admin"}
        </option>
      ))}
    </select>
  );
}
