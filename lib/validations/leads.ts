import { z } from "zod";

export const leadStatusValues = [
  "NEW_LEAD",
  "PROPOSAL_SENT",
  "SITE_VISIT",
  "QUALIFIED",
  "WON",
  "LOST",
] as const;

export const createLeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  project: z.string().trim().min(2).max(120),
  status: z.enum(leadStatusValues).default("NEW_LEAD"),
  value: z.coerce.number().int().min(0).optional(),
});

export const convertInquirySchema = z.object({
  inquiryId: z.string(),
  project: z.string().trim().min(2).max(120),
  value: z.coerce.number().int().min(0).optional(),
});
