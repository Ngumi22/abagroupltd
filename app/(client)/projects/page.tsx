import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/site/project-components";
import { SectionLabel } from "@/components/site/shared";
import { getProjects } from "@/lib/data/index";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Aba Group Ltd residential and commercial construction projects across Kenya.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-ink sm:h-48 -z-10" />
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Selected work</SectionLabel>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          Spaces that <em className="text-bronze-dark not-italic">speak.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-ink/60">
          A selection of homes, workplaces, and places shaped by our team across
          Kenya.
        </p>
        <div className="mt-14">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </main>
  );
}
