import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getGalleryImages = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
    },
    ["gallery-images"],
    { tags: ["gallery"] },
  )();
});

export const getFeaturedGalleryImages = cache(async (limit = 7) => {
  return unstable_cache(
    async () => {
      return prisma.galleryImage.findMany({
        where: { featured: true },
        orderBy: { sortOrder: "asc" },
        take: limit,
      });
    },
    [`gallery-featured-${limit}`],
    { tags: ["gallery"] },
  )();
});
