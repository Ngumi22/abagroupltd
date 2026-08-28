import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/site/project-components";
import { getProjectBySlug, getProjects } from "@/lib/data/index";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const url = `${SITE.siteUrl}/projects/${project.slug}`;

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} | Aba Group Ltd`,
      description: project.summary,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Aba Group Ltd`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
