import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getContactPhones = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.contactPhone.findMany({ orderBy: { createdAt: "asc" } });
    },
    ["contact-phones"],
    { tags: ["contact-info"] },
  )();
});

export const getContactEmails = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.contactEmail.findMany({ orderBy: { createdAt: "asc" } });
    },
    ["contact-emails"],
    { tags: ["contact-info"] },
  )();
});

export const getBranches = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.branch.findMany({
        orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
      });
    },
    ["branches"],
    { tags: ["contact-info"] },
  )();
});

export const getSocialLinks = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.socialLink.findMany({ orderBy: { createdAt: "asc" } });
    },
    ["social-links"],
    { tags: ["contact-info"] },
  )();
});
