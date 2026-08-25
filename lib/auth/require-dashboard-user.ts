import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireDashboardUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (
    !session ||
    session.user.banned ||
    (role !== "admin" && role !== "staff")
  ) {
    throw new Error("Unauthorized");
  }
}
