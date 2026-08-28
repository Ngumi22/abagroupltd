"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/require-permission";
import {
  galleryBatchSchema,
  type GalleryImageInput,
} from "@/lib/validations/gallery";

export type GalleryActionState = {
  status: "idle" | "error";
  message?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function revalidateGalleryPaths() {
  revalidateTag("gallery", "default");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function createGalleryImages(
  items: GalleryImageInput[],
): Promise<GalleryActionState> {
  await requirePermission({ gallery: ["create"] });

  const parsed = galleryBatchSchema.safeParse(items);
  if (!parsed.success) {
    return { status: "error", message: "Invalid gallery data." };
  }

  const existingCount = await prisma.galleryImage.count();
  const stamp = Date.now().toString(36);

  try {
    await prisma.galleryImage.createMany({
      data: parsed.data.map((item, index) => ({
        ...item,
        slug: `${slugify(item.title)}-${stamp}-${index}`,
        sortOrder: existingCount + index + 1,
      })),
    });
  } catch (error) {
    console.error("Failed to create gallery images:", error);
    return { status: "error", message: "Failed to save gallery images." };
  }

  revalidateGalleryPaths();
  return { status: "idle" };
}

export async function deleteGalleryImage(
  id: string,
): Promise<GalleryActionState> {
  await requirePermission({ gallery: ["delete"] });

  try {
    await prisma.galleryImage.delete({ where: { id } });
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return { status: "error", message: "Failed to delete image." };
  }

  revalidateGalleryPaths();
  return { status: "idle" };
}

export async function toggleGalleryImageFeatured(
  id: string,
  featured: boolean,
): Promise<GalleryActionState> {
  await requirePermission({ gallery: ["update"] });

  try {
    await prisma.galleryImage.update({ where: { id }, data: { featured } });
  } catch (error) {
    console.error("Failed to update gallery image:", error);
    return { status: "error", message: "Failed to update image." };
  }

  revalidateGalleryPaths();
  return { status: "idle" };
}
