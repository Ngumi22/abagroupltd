import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Blog } from "@/generated/prisma/client";

export const getAllBlogsForAdmin = cache(async (): Promise<Blog[]> => {
  return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
});

export const getBlogById = cache(async (id: string): Promise<Blog | null> => {
  return prisma.blog.findUnique({ where: { id } });
});

export const getPublishedBlogs = cache(async (): Promise<Blog[]> => {
  return unstable_cache(
    async () => {
      return prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      });
    },
    ["published-blogs-list"],
    {
      tags: ["blogs"],
    },
  )();
});

export const getPublishedBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    return unstable_cache(
      async () => {
        return prisma.blog.findFirst({
          where: { slug, status: "PUBLISHED" },
        });
      },
      [`blog-slug-${slug}`],
      {
        tags: ["blogs", `blog-${slug}`],
      },
    )();
  },
);
