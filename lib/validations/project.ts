import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(slugPattern, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(2).max(120),
  type: z.string().trim().min(2).max(60),
  location: z.string().trim().min(2).max(120),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter a 4-digit year"),
  status: z.enum(["Completed", "In progress"]),
  summary: z.string().trim().min(10).max(240),
  description: z.string().trim().min(20).max(4000),
  image: z.string().trim().url("Enter a valid image URL"),
  gallery: z.array(z.string().trim().url()).default([]),
  scope: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one scope item"),
  progress: z.coerce.number().int().min(0).max(100).optional(),
  deliveryStatus: z
    .enum(["On track", "Due soon", "Delayed", "Completed"])
    .optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
