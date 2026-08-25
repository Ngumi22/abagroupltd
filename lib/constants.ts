import { SocialPlatform } from "@/generated/prisma/browser";

export const SITE = {
  name: "Aba Group Ltd",
  shortName: "ABA GROUP",
  tagline: "Construction & Development",
  region: "Kenya",
  phone: "+254 700 123 456",
  email: "hello@abagroup.co.ke",
  address: "Nairobi, Kenya",
  siteUrl: "https://abagroup.co.ke",
} as const;

export const NAV_LINKS = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Contact", "/contact"],
  ["Projects", "/projects"],
  ["Blogs", "/blogs"],
] as const;

export const ADMIN_CREDENTIALS = {
  email: "admin@abagroup.co.ke",
  password: "aba-demo-2025",
} as const;

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  X: "X (Twitter)",
  LINKEDIN: "LinkedIn",
  TIKTOK: "TikTok",
  YOUTUBE: "YouTube",
  WHATSAPP: "WhatsApp",
};
