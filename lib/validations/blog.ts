import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(slugPattern, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().min(10).max(300),
  content: z
    .string()
    .trim()
    .min(50, "Content should be at least a few sentences"),
  coverImage: z.string().trim().url("Enter a valid image URL"),
  tags: z.array(z.string().trim().min(1)).max(8).default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  metaTitle: z
    .string()
    .trim()
    .max(60, "Keep meta titles under 60 characters for SEO")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .trim()
    .max(160, "Keep meta descriptions under 160 characters for SEO")
    .optional()
    .or(z.literal("")),
});

export type BlogInput = z.infer<typeof blogSchema>;
