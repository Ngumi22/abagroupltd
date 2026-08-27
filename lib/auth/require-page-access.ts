import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { statement } from "@/lib/auth/permissions";

type PermissionMap = {
  [K in keyof typeof statement]?: (typeof statement)[K][number][];
};

export function defaultLandingFor(role?: string | null): string {
  return role === "writer" ? "/admin/blogs" : "/admin";
}

export async function requirePageAccess(permissions: PermissionMap) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || session.user.banned) redirect("/login");

  const result = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions },
  });

  if (!result.success) redirect(defaultLandingFor(role));

  return session;
}
