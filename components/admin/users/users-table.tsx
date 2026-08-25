"use client";

import { useTransition } from "react";
import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import {
  setDashboardUserRole,
  banDashboardUser,
  unbanDashboardUser,
} from "@/lib/actions/users";
import { UserRoleBadge } from "./user-role-badge";
import { DataTable, DataTableColumn } from "../data-table/data-table";

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
        alert(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  }

  const columns: DataTableColumn<DashboardUser>[] = [
    {
      key: "user",
      header: "User",
      primary: true,
      searchValue: (u) => `${u.name} ${u.email}`,
      accessor: (u) => (
        <div>
          <p className="font-medium">
            {u.name}{" "}
            {u.id === currentUserId && (
              <span className="text-xs text-ink/40">(you)</span>
            )}
          </p>
          <p className="text-xs text-ink/50">{u.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      accessor: (u) => <UserRoleBadge role={u.role} banned={u.banned} />,
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      keyExtractor={(u) => u.id}
      searchPlaceholder="Search by name or email…"
      emptyMessage="No dashboard users yet."
      renderRowActions={(user) =>
        user.id === currentUserId ? null : (
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
        )
      }
    />
  );
}
