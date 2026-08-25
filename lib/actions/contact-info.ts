"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  branchSchema,
  contactPhoneSchema,
  contactEmailSchema,
  socialLinkSchema,
  updateBranchSchema,
  updateContactPhoneSchema,
  updateContactEmailSchema,
  updateSocialLinkSchema,
} from "@/lib/validations/contact-info";
import { requirePermission } from "../auth/require-permission";

export type ActionState = { status: "idle" | "error"; message?: string };
const idle: ActionState = { status: "idle" };

function revalidateContactPages() {
  revalidatePath("/admin/settings");
  revalidatePath("/contact");
}

export async function createBranch(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["create"] });

  const parsed = branchSchema.safeParse({
    name: formData.get("name"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    isPrimary: formData.get("isPrimary") === "on",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid branch",
    };
  }

  if (parsed.data.isPrimary) {
    await prisma.branch.updateMany({
      where: { isPrimary: true },
      data: { isPrimary: false },
    });
  }
  await prisma.branch.create({ data: parsed.data });

  revalidateContactPages();
  return idle;
}

export async function deleteBranch(id: string) {
  await requirePermission({ contactInfo: ["delete"] });
  await prisma.branch.delete({ where: { id } });
  revalidateContactPages();
}

// ---- Phone ----

export async function createContactPhone(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["create"] });

  const parsed = contactPhoneSchema.safeParse({
    label: formData.get("label"),
    number: formData.get("number"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid phone number",
    };
  }

  await prisma.contactPhone.create({ data: parsed.data });
  revalidateContactPages();
  return idle;
}

export async function deleteContactPhone(id: string) {
  await requirePermission({ contactInfo: ["delete"] });
  await prisma.contactPhone.delete({ where: { id } });
  revalidateContactPages();
}

// ---- Email ----

export async function createContactEmail(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["create"] });

  const parsed = contactEmailSchema.safeParse({
    label: formData.get("label"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid email",
    };
  }

  await prisma.contactEmail.create({ data: parsed.data });
  revalidateContactPages();
  return idle;
}

export async function deleteContactEmail(id: string) {
  await requirePermission({ contactInfo: ["delete"] });
  await prisma.contactEmail.delete({ where: { id } });
  revalidateContactPages();
}

// ---- Social ----

export async function createSocialLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["create"] });

  const parsed = socialLinkSchema.safeParse({
    platform: formData.get("platform"),
    url: formData.get("url"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid social link",
    };
  }

  await prisma.socialLink.create({ data: parsed.data });
  revalidateContactPages();
  return idle;
}

export async function deleteSocialLink(id: string) {
  await requirePermission({ contactInfo: ["delete"] });
  await prisma.socialLink.delete({ where: { id } });
  revalidateContactPages();
}

export async function updateBranch(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["update"] });

  const parsed = updateBranchSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    isPrimary: formData.get("isPrimary") === "on",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid branch",
    };
  }

  const { id, ...data } = parsed.data;
  if (data.isPrimary) {
    await prisma.branch.updateMany({
      where: { isPrimary: true, NOT: { id } },
      data: { isPrimary: false },
    });
  }
  await prisma.branch.update({ where: { id }, data });

  revalidateContactPages();
  return idle;
}

export async function updateContactPhone(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["update"] });

  const parsed = updateContactPhoneSchema.safeParse({
    id: formData.get("id"),
    label: formData.get("label"),
    number: formData.get("number"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid phone number",
    };
  }

  const { id, ...data } = parsed.data;
  await prisma.contactPhone.update({ where: { id }, data });

  revalidateContactPages();
  return idle;
}

export async function updateContactEmail(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["update"] });

  const parsed = updateContactEmailSchema.safeParse({
    id: formData.get("id"),
    label: formData.get("label"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid email",
    };
  }

  const { id, ...data } = parsed.data;
  await prisma.contactEmail.update({ where: { id }, data });

  revalidateContactPages();
  return idle;
}

export async function updateSocialLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requirePermission({ contactInfo: ["update"] });

  const parsed = updateSocialLinkSchema.safeParse({
    id: formData.get("id"),
    platform: formData.get("platform"),
    url: formData.get("url"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid social link",
    };
  }

  const { id, ...data } = parsed.data;
  await prisma.socialLink.update({ where: { id }, data });

  revalidateContactPages();
  return idle;
}
