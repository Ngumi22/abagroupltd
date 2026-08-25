import {
  CircleDollarSign,
  FolderKanban,
  Globe,
  MessageSquare,
  Users,
} from "lucide-react";
import type { DashboardStat } from "@/lib/types";
import { getLeads, getOpenLeadsPipelineValue } from "./leads";
import { getProjects } from "./projects";
import { getNewInquiryCount } from "./inquiries";
import { getWebsiteVisits } from "./analytics";
import { formatCurrency } from "../utils";

export async function getDashboardStats(): Promise<DashboardStat[]> {
  const [leads, projects, newInquiries, pipelineValue, visits] =
    await Promise.all([
      getLeads(),
      getProjects(),
      getNewInquiryCount(),
      getOpenLeadsPipelineValue(),
      getWebsiteVisits(30),
    ]);

  const openLeads = leads.filter(
    (l) => l.status !== "Won" && l.status !== "Lost",
  );
  const activeProjects = projects.filter((p) => p.status === "In progress");

  return [
    {
      id: "website-visits",
      label: "Website visits",
      value: visits.visits.toLocaleString(),
      trend: visits.trendLabel,
      icon: Globe,
    },
    {
      id: "open-leads",
      label: "Open leads",
      value: String(openLeads.length).padStart(2, "0"),
      trend: `${leads.length} total`,
      icon: Users,
    },
    {
      id: "pipeline-value",
      label: "Pipeline value",
      value: formatCurrency(pipelineValue),
      trend: `${openLeads.length} open leads`,
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
      trend: "Unread messages",
      icon: MessageSquare,
    },
  ];
}
