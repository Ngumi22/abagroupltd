import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your project")
    .max(2000),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
