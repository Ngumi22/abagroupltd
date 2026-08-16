import { DashboardOverview } from "@/components/admin/dashboard/dashboard-overview";
import {
  getDashboardStats,
  getLeads,
  getProjectsInDelivery,
} from "@/lib/data/index";

export default async function AdminPage() {
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
