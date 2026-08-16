import {
  CircleDollarSign,
  FolderKanban,
  MessageSquare,
  Users,
} from "lucide-react";
import type { DashboardStat } from "@/lib/types";
import { getLeads } from "./leads";
import { getProjects } from "./projects";
import { getNewInquiryCount } from "./inquiries";

export async function getDashboardStats(): Promise<DashboardStat[]> {
  const [leads, projects, newInquiries] = await Promise.all([
    getLeads(),
    getProjects(),
    getNewInquiryCount(),
  ]);

  const openLeads = leads.filter(
    (l) => l.status !== "Won" && l.status !== "Lost",
  );
  const activeProjects = projects.filter((p) => p.status === "In progress");

  return [
    {
      id: "open-leads",
      label: "Open leads",
      value: String(openLeads.length).padStart(2, "0"),
      trend: `${leads.length} total this month`,
      icon: Users,
    },
    {
      id: "pipeline-value",
      label: "Pipeline value",
      value: "KES 48.6M",
      trend: "+8.4% this month",
      icon: CircleDollarSign,
    },
    {
      id: "active-projects",
      label: "Active projects",
      value: String(activeProjects.length).padStart(2, "0"),
      trend: `${projects.length} total`,
      icon: FolderKanban,
    },
    {
      id: "new-inquiries",
      label: "New inquiries",
      value: String(newInquiries).padStart(2, "0"),
      trend: "Since your last visit",
      icon: MessageSquare,
    },
  ];
}
