import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { ProjectForm } from "@/components/admin/pages/new-project-form";
import { requirePageAccess } from "@/lib/auth/require-page-access";
import { getProjectBySlug } from "@/lib/data/index";
import { toProjectFormData } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requirePageAccess({ project: ["update"] });
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Edit project"
      description="Edit an existing project."
    >
      <ProjectForm project={project ? toProjectFormData(project) : undefined} />
    </AdminPageFrame>
  );
}
