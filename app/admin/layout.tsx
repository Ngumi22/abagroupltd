import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/features/admin-shell";
import { getNewInquiryCount } from "@/lib/data/inquiries";

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
  const isDashboardUser = role === "admin" || role === "staff";
  if (!isDashboardUser) {
    redirect("/login");
  }

  const notificationCount = await getNewInquiryCount();
  const firstName = session.user.name?.split(" ")[0];

  return (
    <AdminShell
      notificationCount={notificationCount}
      role={role}
      userName={firstName}
    >
      {children}
    </AdminShell>
  );
}
