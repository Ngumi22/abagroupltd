import { prisma } from "@/lib/prisma";

export async function getBranches() {
  return prisma.branch.findMany({
    orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
  });
}

export async function getContactPhones() {
  return prisma.contactPhone.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getContactEmails() {
  return prisma.contactEmail.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { createdAt: "asc" } });
}
