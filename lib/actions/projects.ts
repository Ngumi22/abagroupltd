"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { requirePermission } from "../auth/require-permission";

export type ProjectActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export type CreateProjectState = ProjectActionState;

function linesToArray(value: FormDataEntryValue | null): string[] {
  return ((value as string) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    type: formData.get("type"),
    location: formData.get("location"),
    year: formData.get("year"),
    status: formData.get("status"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    image: formData.get("image"),
    gallery: formData
      .getAll("gallery")
      .filter((v): v is string => typeof v === "string" && v.length > 0),
    scope: linesToArray(formData.get("scope")),
    progress: formData.get("progress") || undefined,
    deliveryStatus: formData.get("deliveryStatus") || undefined,
  });
}

function fieldErrorsFrom(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

function revalidateProjectPaths() {
  revalidateTag("projects", "default");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  revalidatePath("/projects");
}

export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requirePermission({ project: ["create"] });

  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const existing = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return {
      status: "error",
      message: "That slug is already in use.",
      fieldErrors: { slug: "This slug is already taken." },
    };
  }

  await prisma.project.create({ data: parsed.data });

  revalidateProjectPaths();
  redirect("/admin/projects?created=1");
}

export async function updateProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requirePermission({ project: ["update"] });

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "Missing project id." };
  }

  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const existing = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing && existing.id !== id) {
    return {
      status: "error",
      message: "That slug is already in use.",
      fieldErrors: { slug: "This slug is already taken." },
    };
  }

  await prisma.project.update({ where: { id }, data: parsed.data });

  revalidateProjectPaths();
  redirect("/admin/projects?updated=1");
}

// lib/actions/projects.ts (or wherever your server actions are)

export async function deleteProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requirePermission({ project: ["delete"] });

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "Missing project id." };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidateProjectPaths();
    redirect("/admin/projects?deleted=1");
  } catch (error) {
    console.error("Failed to delete project:", error);
    return {
      status: "error",
      message: "Failed to delete project. Please try again.",
    };
  }
}

export async function updateProjectStatus(
  projectId: string,
  status: "Completed" | "In progress",
): Promise<{ success: boolean; error?: string }> {
  await requirePermission({ project: ["update"] });

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    revalidateProjectPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update project status:", error);
    return {
      success: false,
      error: "Failed to update project status.",
    };
  }
}

export async function updateProjectDeliveryStatus(
  projectId: string,
  deliveryStatus: string | null,
): Promise<{ success: boolean; error?: string }> {
  await requirePermission({ project: ["update"] });

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { deliveryStatus },
    });

    revalidateProjectPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update delivery status:", error);
    return {
      success: false,
      error: "Failed to update delivery status.",
    };
  }
}
