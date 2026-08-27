"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/require-permission";
import { blogSchema } from "@/lib/validations/blog";

export type BlogActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function linesToArray(value: FormDataEntryValue | null): string[] {
  return ((value as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseBlogForm(formData: FormData, status: "DRAFT" | "PUBLISHED") {
  return blogSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    tags: linesToArray(formData.get("tags")),
    status,
    metaTitle: formData.get("metaTitle") || "",
    metaDescription: formData.get("metaDescription") || "",
  });
}

function fieldErrorsFrom(error: import("zod").ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key])
      fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export async function createBlog(
  _prev: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  const session = await requirePermission({ blog: ["create"] });

  const status = formData.get("intent") === "publish" ? "PUBLISHED" : "DRAFT";
  const parsed = parseBlogForm(formData, status);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const existing = await prisma.blog.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return {
      status: "error",
      message: "That slug is already in use.",
      fieldErrors: { slug: "This slug is already taken." },
    };
  }

  await prisma.blog.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidateTag("blogs", "default");
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(
  id: string,
  _prev: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  await requirePermission({ blog: ["update"] });

  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) {
    return { status: "error", message: "Post not found." };
  }

  const status =
    formData.get("intent") === "publish"
      ? "PUBLISHED"
      : formData.get("intent") === "unpublish"
        ? "DRAFT"
        : existing.status;
  const parsed = parseBlogForm(formData, status);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.blog.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (slugTaken) {
      return {
        status: "error",
        message: "That slug is already in use.",
        fieldErrors: { slug: "This slug is already taken." },
      };
    }
  }

  const isNewlyPublished =
    status === "PUBLISHED" && existing.status !== "PUBLISHED";

  await prisma.blog.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt: isNewlyPublished ? new Date() : existing.publishedAt,
    },
  });

  revalidateTag("blogs", "default");
  revalidateTag(`blog-${existing.slug}`, "default");
  if (parsed.data.slug !== existing.slug) {
    revalidateTag(`blog-${parsed.data.slug}`, "default");
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${parsed.data.slug}`);
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  await requirePermission({ blog: ["delete"] });

  const blog = await prisma.blog.delete({ where: { id } });

  revalidateTag("blogs", "default");
  revalidateTag(`blog-${blog.slug}`, "default");
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}
