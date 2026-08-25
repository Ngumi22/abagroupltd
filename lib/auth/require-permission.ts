import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { statement } from "@/lib/auth/permissions";

export type PermissionMap = {
  [K in keyof typeof statement]?: (typeof statement)[K][number][];
};

export async function requirePermission(permissions: PermissionMap) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.banned) {
    throw new Error("Unauthorized");
  }

  const result = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions },
  });

  if (!result.success) {
    throw new Error("Forbidden");
  }

  return session;
}
