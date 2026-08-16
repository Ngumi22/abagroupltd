import type { Project as PrismaProject } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
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

export async function getProjects(): Promise<Project[]> {
  const records = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(mapProject);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const record = await prisma.project.findUnique({ where: { slug } });
  return record ? mapProject(record) : undefined;
}

export async function getProjectsInDelivery(limit = 3): Promise<Project[]> {
  const records = await prisma.project.findMany({
    where: { deliveryStatus: { not: null } },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
  return records.map(mapProject);
}
