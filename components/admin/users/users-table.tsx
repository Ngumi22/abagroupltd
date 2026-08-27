"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import {
  setDashboardUserRole,
  banDashboardUser,
  unbanDashboardUser,
} from "@/lib/actions/users";
import { UserRoleBadge } from "./user-role-badge";
import { DataTable } from "../data-table/data-table";
import type { DataTableFeatures } from "../data-table/data-table-features";

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  banned?: boolean | null;
}

export function UsersTable({
  users,
  currentUserId,
}: {
  users: DashboardUser[];
  currentUserId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      }
    });
  }

  const columns: ColumnDef<DataTableFeatures, DashboardUser>[] = [
    {
      id: "user",
      header: "User",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.original.name}{" "}
            {row.original.id === currentUserId && (
              <span className="text-xs text-ink/40">(you)</span>
            )}
          </p>
          <p className="text-xs text-ink/50">{row.original.email}</p>
        </div>
      ),
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => (
        <UserRoleBadge role={row.original.role} banned={row.original.banned} />
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        if (user.id === currentUserId) return null;

        return (
          <div className="flex items-center gap-3">
            <button
              disabled={isPending}
              onClick={() =>
                run(() =>
                  setDashboardUserRole(
                    user.id,
                    user.role === "admin" ? "staff" : "admin",
                  ),
                )
              }
              aria-label={
                user.role === "admin" ? "Demote to staff" : "Promote to admin"
              }
              className="text-ink/40 transition hover:text-ink disabled:opacity-40"
            >
              {user.role === "admin" ? (
                <UserCheck size={16} />
              ) : (
                <ShieldCheck size={16} />
              )}
            </button>
            <button
              disabled={isPending}
              onClick={() =>
                run(() =>
                  user.banned
                    ? unbanDashboardUser(user.id)
                    : banDashboardUser(user.id, "Removed by admin"),
                )
              }
              aria-label={user.banned ? "Unban" : "Ban"}
              className="text-ink/40 transition hover:text-red-700 disabled:opacity-40"
            >
              <Ban size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      columnMeta={{ user: { primary: true } }}
      getSearchText={(u) => `${u.name} ${u.email}`}
      searchPlaceholder="Search by name or email…"
      emptyMessage="No dashboard users yet."
    />
  );
}
