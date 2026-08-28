import { SocialPlatform } from "@/generated/prisma/browser";

export const SITE_NAME = "Aba Group Ltd";
export const SITE_TITLE = "Aba Group Ltd | Construction & Development in Kenya";
export const SITE_DESCRIPTION =
  "Construction, architecture, and development in Kenya. Built with intention. Made to endure.";

export const SITE = {
  name: "Aba Group Ltd",
  shortName: "ABA GROUP",
  tagline: "Construction & Development",
  region: "Kenya",
  phone: "+254 700 123 456",
  email: "contact@abagroup.co.ke",
  privacyemail: "privacy@abagroup.co.ke",
  address: "Nairobi, Kenya",
  siteUrl: "https://abagroupltd.co.ke",
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

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/aba-group",
  instagram: "https://www.instagram.com/abagroup",
};

export const DEFAULT_BACKGROUND_IMAGE =
  "https://ik.imagekit.io/abagroup/projects/covers/1_pZcZ-r49u.png?updatedAt=1787842415214";

export const LAST_UPDATED = "August 28, 2026";
