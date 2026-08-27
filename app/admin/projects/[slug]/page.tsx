import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/site/project-components";
import { getProjectBySlug } from "@/lib/data/index";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { requirePageAccess } from "@/lib/auth/require-page-access";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requirePageAccess({ project: ["read"] });
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="View project"
      description="View project."
    >
      <ProjectDetail project={project} />
    </AdminPageFrame>
  );
}
