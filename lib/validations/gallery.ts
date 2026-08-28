import { z } from "zod";

export const galleryImageSchema = z.object({
  title: z.string().min(1, "Title is required."),
  category: z.string().min(1, "Category is required."),
  alt: z.string().min(1, "Alt text is required."),
  imageUrl: z.string().url("Invalid image URL."),
  imagekitFileId: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  featured: z.boolean().default(false),
});

export const galleryBatchSchema = z.array(galleryImageSchema).min(1);

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
export type GalleryBatchInput = z.infer<typeof galleryBatchSchema>;
