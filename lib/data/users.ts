import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function listDashboardUsers() {
  const result = await auth.api.listUsers({
    query: { sortBy: "createdAt", sortDirection: "desc", limit: 100 },
    headers: await headers(),
  });
  return result.users;
}
