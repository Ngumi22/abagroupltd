import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";

export type DashboardRole = "admin" | "staff" | "writer";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: DashboardRole[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  {
    label: "Blog",
    href: "/admin/blogs",
    icon: FileText,
    roles: ["admin", "staff", "writer"],
  },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Shield, roles: ["admin"] },
];
