import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getTestimonials = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.testimonial.findMany({ orderBy: { reviewedAt: "desc" } });
    },
    ["testimonials"],
    { tags: ["testimonials"] },
  )();
});

export const getFeaturedTestimonials = cache(async (limit = 6) => {
  return unstable_cache(
    async () => {
      return prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { reviewedAt: "desc" },
        take: limit,
      });
    },
    [`testimonials-featured-${limit}`],
    { tags: ["testimonials"] },
  )();
});
