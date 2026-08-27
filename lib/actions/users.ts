"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requirePermission } from "@/lib/auth/require-permission";
import { createDashboardUserSchema } from "@/lib/validations/user";

export type ActionState = { status: "idle" | "error"; message?: string };
const idle: ActionState = { status: "idle" };

export type DashboardRole = "admin" | "staff" | "writer";

export async function createDashboardUser(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requirePermission({ user: ["create"] });

  const parsed = createDashboardUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    await auth.api.createUser({ body: parsed.data, headers: await headers() });
  } catch {
    return {
      status: "error",
      message: "Could not create user — that email may already be in use.",
    };
  }

  void session;
  revalidatePath("/admin/users");
  return idle;
}

export async function setDashboardUserRole(
  userId: string,
  role: DashboardRole,
) {
  const session = await requirePermission({ user: ["set-role"] });

  if (session.user.id === userId) {
    throw new Error("You can't change your own role.");
  }

  await auth.api.setRole({ body: { userId, role }, headers: await headers() });
  revalidatePath("/admin/users");
}

export async function banDashboardUser(userId: string, reason: string) {
  const session = await requirePermission({ user: ["ban"] });

  if (session.user.id === userId) {
    throw new Error("You can't ban your own account.");
  }

  await auth.api.banUser({
    body: { userId, banReason: reason },
    headers: await headers(),
  });
  revalidatePath("/admin/users");
}

export async function unbanDashboardUser(userId: string) {
  await requirePermission({ user: ["ban"] });
  await auth.api.unbanUser({ body: { userId }, headers: await headers() });
  revalidatePath("/admin/users");
}
