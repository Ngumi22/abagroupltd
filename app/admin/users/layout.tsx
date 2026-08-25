import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  const canManageUsers = session
    ? await auth.api.userHasPermission({
        body: {
          userId: session.user.id,
          permissions: { user: ["create", "set-role", "ban"] },
        },
      })
    : { success: false };

  if (!canManageUsers.success) redirect("/admin");

  return <>{children}</>;
}
