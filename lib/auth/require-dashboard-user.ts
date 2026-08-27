import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const DASHBOARD_ROLES = ["admin", "staff", "writer"] as const;
type DashboardRole = (typeof DASHBOARD_ROLES)[number];

function isDashboardRole(role: string | undefined): role is DashboardRole {
  return !!role && (DASHBOARD_ROLES as readonly string[]).includes(role);
}

export async function requireDashboardSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || session.user.banned || !isDashboardRole(role)) {
    throw new Error("Unauthorized");
  }

  return { session, role };
}

export async function requireDashboardUser() {
  await requireDashboardSession();
}
