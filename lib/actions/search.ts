"use server";

import { prisma } from "@/lib/prisma";

export type SearchResultType = "lead" | "inquiry" | "project" | "blog";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
}

export async function globalSearch(rawQuery: string): Promise<SearchResult[]> {
  const query = rawQuery.trim();
  if (query.length < 2) return [];

  const [leads, inquiries, projects, blogs] = await Promise.all([
    prisma.lead.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { project: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.inquiry.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { message: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
          { type: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return [
    ...leads.map((l) => ({
      id: l.id,
      type: "lead" as const,
      title: l.name,
      subtitle: l.project,
      href: "/admin/leads",
    })),
    ...inquiries.map((i) => ({
      id: i.id,
      type: "inquiry" as const,
      title: i.name,
      subtitle: i.email,
      href: "/admin/inquiries",
    })),
    ...projects.map((p) => ({
      id: p.id,
      type: "project" as const,
      title: p.name,
      subtitle: p.location,
      href: `/admin/projects/${p.slug}`,
    })),
    ...blogs.map((b) => ({
      id: b.id,
      type: "blog" as const,
      title: b.title,
      subtitle: b.excerpt,
      href: `/admin/blogs/${b.slug}`,
    })),
  ];
}
