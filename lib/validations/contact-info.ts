import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().trim().min(2).max(80),
  addressLine1: z.string().trim().min(2).max(120),
  addressLine2: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(80),
  isPrimary: z.coerce.boolean().default(false),
});

export const contactPhoneSchema = z.object({
  label: z.string().trim().min(1).max(40),
  number: z.string().trim().min(7).max(20),
});

export const contactEmailSchema = z.object({
  label: z.string().trim().min(1).max(40),
  email: z.string().trim().email(),
});

export const socialLinkSchema = z.object({
  platform: z.enum([
    "FACEBOOK",
    "INSTAGRAM",
    "X",
    "LINKEDIN",
    "TIKTOK",
    "YOUTUBE",
    "WHATSAPP",
  ]),
  url: z.string().trim().url(),
});

export const updateBranchSchema = branchSchema.extend({ id: z.string() });
export const updateContactPhoneSchema = contactPhoneSchema.extend({
  id: z.string(),
});
export const updateContactEmailSchema = contactEmailSchema.extend({
  id: z.string(),
});
export const updateSocialLinkSchema = socialLinkSchema.extend({
  id: z.string(),
});
