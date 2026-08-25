"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { requirePermission } from "../auth/require-permission";

export type CreateProjectState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function linesToArray(value: FormDataEntryValue | null): string[] {
  return ((value as string) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createProject(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  await requirePermission({ project: ["create"] });

  const parsed = projectSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    type: formData.get("type"),
    location: formData.get("location"),
    year: formData.get("year"),
    status: formData.get("status"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    image: formData.get("image"),
    gallery: linesToArray(formData.get("gallery")),
    scope: linesToArray(formData.get("scope")),
    progress: formData.get("progress") || undefined,
    deliveryStatus: formData.get("deliveryStatus") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key])
        fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors,
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

  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  revalidatePath("/projects");

  redirect("/admin/projects");
}
