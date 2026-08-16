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

  const isDashboardUser =
    session.user.role === "admin" || session.user.role === "staff";
  if (!isDashboardUser) {
    redirect("/login");
  }

  const notificationCount = await getNewInquiryCount();

  return (
    <AdminShell notificationCount={notificationCount}>{children}</AdminShell>
  );
}
