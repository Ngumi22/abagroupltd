import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { Project as PrismaProject } from "@/generated/prisma/client";
import type { Project } from "@/lib/types";

function mapProject(record: PrismaProject): Project {
  return {
    slug: record.slug,
    name: record.name,
    type: record.type,
    location: record.location,
    year: record.year,
    status: record.status as Project["status"],
    summary: record.summary,
    description: record.description,
    image: record.image,
    gallery: record.gallery,
    scope: record.scope,
    progress: record.progress ?? undefined,
    deliveryStatus:
      (record.deliveryStatus as Project["deliveryStatus"]) ?? undefined,
  };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  return unstable_cache(
    async () => {
      const records = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map(mapProject);
    },
    ["projects-list"],
    { tags: ["projects"] },
  )();
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | undefined> => {
    return unstable_cache(
      async () => {
        const record = await prisma.project.findUnique({ where: { slug } });
        return record ? mapProject(record) : undefined;
      },
      [`project-slug-${slug}`],
      { tags: ["projects", `project-${slug}`] },
    )();
  },
);

export const getProjectsInDelivery = cache(
  async (limit = 3): Promise<Project[]> => {
    return unstable_cache(
      async () => {
        const records = await prisma.project.findMany({
          where: { deliveryStatus: { not: null } },
          orderBy: { updatedAt: "desc" },
          take: limit,
        });
        return records.map(mapProject);
      },
      [`projects-delivery-${limit}`],
      { tags: ["projects"] },
    )();
  },
);
