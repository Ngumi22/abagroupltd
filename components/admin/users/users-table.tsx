"use client";

import { useState, useTransition } from "react";
import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import {
  setDashboardUserRole,
  banDashboardUser,
  unbanDashboardUser,
} from "@/lib/actions/users";
import { UserRoleBadge } from "./user-role-badge";

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
  const [pendingId, setPendingId] = useState<string | null>(null);

  function run(id: string, action: () => Promise<void>) {
    setPendingId(id);
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Something went wrong.");
      }
      setPendingId(null);
    });
  }

  return (
    <div className="hidden overflow-x-auto sm:block">
      <table className="w-full min-w-150 text-left text-sm">
        <thead className="text-[10px] uppercase tracking-widest text-ink/40">
          <tr>
            <th className="px-5 py-4 font-normal">User</th>
            <th className="px-5 py-4 font-normal">Role</th>
            <th className="px-5 py-4 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const isRowPending = isPending && pendingId === user.id;

            const roleLabel =
              user.role === "admin" ? "Demote to staff" : "Promote to admin";
            const banLabel = user.banned ? "Unban user" : "Ban user";

            return (
              <tr key={user.id} className="border-t border-ink/10">
                <td className="px-5 py-4">
                  <p className="font-medium">
                    {user.name}{" "}
                    {isSelf && (
                      <span className="text-xs text-ink/40">(you)</span>
                    )}
                  </p>
                  <p className="text-xs text-ink/50">{user.email}</p>
                </td>
                <td className="px-5 py-4">
                  <UserRoleBadge role={user.role} banned={user.banned} />
                </td>
                <td className="px-5 py-4">
                  {!isSelf && (
                    <div className="flex items-center gap-3">
                      {/* Role Action Button + Popover */}
                      <div className="relative group flex items-center justify-center">
                        <button
                          disabled={isRowPending}
                          onClick={() =>
                            run(user.id, () =>
                              setDashboardUserRole(
                                user.id,
                                user.role === "admin" ? "staff" : "admin",
                              ),
                            )
                          }
                          aria-label={roleLabel}
                          className="text-ink/40 transition hover:text-ink disabled:opacity-40"
                        >
                          {user.role === "admin" ? (
                            <UserCheck size={16} />
                          ) : (
                            <ShieldCheck size={16} />
                          )}
                        </button>
                        <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
                          {roleLabel}
                        </span>
                      </div>

                      {/* Ban Action Button + Popover */}
                      <div className="relative group flex items-center justify-center">
                        <button
                          disabled={isRowPending}
                          onClick={() =>
                            run(user.id, () =>
                              user.banned
                                ? unbanDashboardUser(user.id)
                                : banDashboardUser(user.id, "Removed by admin"),
                            )
                          }
                          aria-label={banLabel}
                          className="text-ink/40 transition hover:text-red-700 disabled:opacity-40"
                        >
                          <Ban size={16} />
                        </button>
                        <span className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block z-20">
                          {banLabel}
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
