import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { listDashboardUsers } from "@/lib/data/users";
import { UsersTable } from "@/components/admin/users/users-table";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { AddUserPopover } from "@/components/admin/users/add-user-popover";

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([
    listDashboardUsers(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  return (
    <AdminPageFrame
      eyebrow="Access control"
      title="Dashboard users"
      description="Manage who can access the admin dashboard and what they're allowed to do."
    >
      <div className="grid gap-6">
        <AddUserPopover />
        <UsersTable users={users} currentUserId={session!.user.id} />
      </div>
    </AdminPageFrame>
  );
}
