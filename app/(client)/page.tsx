import type { Metadata } from "next";
import {
  AboutTeaser,
  BlogsTeaser,
  Hero,
  Process,
  ProjectsPreview,
  ServicesTeaser,
  Stats,
} from "@/components/site/sections";
import { Contact } from "@/components/site/contact";
import { getPublishedBlogs } from "@/lib/data/blogs";
import { getProjects } from "@/lib/data/index";

export const metadata: Metadata = {
  title: "Aba Group Ltd | Construction & Development in Kenya",
  description:
    "Aba Group Ltd brings architecture, construction, and development together to create spaces that elevate how Kenya lives and works.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [blogs, projects] = await Promise.all([
    getPublishedBlogs(),
    getProjects(),
  ]);

  const projectsCompleted = projects.filter(
    (p) => p.status === "Completed",
  ).length;

  return (
    <main>
      <Hero />
      <Stats projectsCompleted={projectsCompleted} />
      <AboutTeaser />
      <ProjectsPreview projects={projects} />
      <ServicesTeaser />
      <Process />
      <BlogsTeaser blogs={blogs} />
      <Contact />
    </main>
  );
}
