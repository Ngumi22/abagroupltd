import { DashboardOverview } from "@/components/admin/dashboard/dashboard-overview";
import { requirePageAccess } from "@/lib/auth/require-page-access";
import {
  getDashboardStats,
  getLeads,
  getProjectsInDelivery,
} from "@/lib/data/index";

export default async function AdminPage() {
  await requirePageAccess({ lead: ["read"] });
  const [stats, leads, pulseProjects] = await Promise.all([
    getDashboardStats(),
    getLeads(),
    getProjectsInDelivery(3),
  ]);

  return (
    <DashboardOverview
      stats={stats}
      leads={leads}
      pulseProjects={pulseProjects}
    />
  );
}
