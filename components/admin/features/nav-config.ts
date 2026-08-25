import type { LucideIcon } from "lucide-react";
import {
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Shield, adminOnly: true },
];
