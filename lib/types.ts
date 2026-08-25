import { LucideIcon } from "lucide-react";

export type ProjectPhase = "Completed" | "In progress";

export type ProjectDeliveryStatus =
  | "On track"
  | "Due soon"
  | "Delayed"
  | "Completed";

export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  year: string;
  status: ProjectPhase;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  scope: string[];
  // Admin-only delivery tracking. Optional: not every project has this yet.
  progress?: number; // 0–100
  deliveryStatus?: ProjectDeliveryStatus;
};

export type LeadStatus =
  | "New lead"
  | "Proposal sent"
  | "Site visit"
  | "Qualified"
  | "Won"
  | "Lost";

export type Lead = {
  id?: string;
  name: string;
  project: string;
  status: LeadStatus;
  date: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Blog = {
  title: string;
  date: string;
  image: string;
};

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}
