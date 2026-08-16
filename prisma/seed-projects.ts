import { prisma } from "@/lib/prisma";
import { projects } from "@/lib/data";

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project },
    });
  }
  console.log(`Seeded ${projects.length} projects.`);
}

main();
