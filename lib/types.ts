import { LucideIcon } from "lucide-react";

export type ProjectPhase = "Completed" | "In progress";

export type ProjectDeliveryStatus =
  | "On track"
  | "Due soon"
  | "Delayed"
  | "Completed";

export type Project = {
  id: string;
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
  progress?: number;
  deliveryStatus?: ProjectDeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectFormData = {
  id: string;
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
  progress: number | null;
  deliveryStatus: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function toProjectFormData(project: Project): ProjectFormData {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    type: project.type,
    location: project.location,
    year: project.year,
    status: project.status,
    summary: project.summary,
    description: project.description,
    image: project.image,
    gallery: project.gallery,
    scope: project.scope,
    progress: project.progress ?? null,
    deliveryStatus: project.deliveryStatus ?? null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

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
