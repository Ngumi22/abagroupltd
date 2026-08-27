import { z } from "zod";

export const createDashboardUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(12, "Use at least 12 characters"),
  role: z.enum(["admin", "staff", "writer"]),
});
