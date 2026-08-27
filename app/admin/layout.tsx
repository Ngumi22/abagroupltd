import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/features/admin-shell";
import { getRecentNotifications } from "@/lib/data/notifications";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.banned) {
    redirect("/login");
  }

  const role = (session.user as { role?: string }).role;
  const isDashboardUser =
    role === "admin" || role === "staff" || role === "writer";
  if (!isDashboardUser) {
    redirect("/login");
  }

  const notifications = await getRecentNotifications();
  const firstName = session.user.name?.split(" ")[0];

  return (
    <AdminShell notifications={notifications} role={role} userName={firstName}>
      {children}
    </AdminShell>
  );
}
