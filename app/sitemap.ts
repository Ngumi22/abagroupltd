import { getPublishedBlogs } from "@/lib/data/blogs";
import { getProjects } from "@/lib/data/projects";
import { MetadataRoute } from "next";
import { toISOString } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE.siteUrl}/projects/${project.slug}`,
    lastModified: toISOString(project.updatedAt) ?? new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogs = await getPublishedBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE.siteUrl}/blogs/${blog.slug}`,
    lastModified: toISOString(blog.updatedAt) ?? new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
