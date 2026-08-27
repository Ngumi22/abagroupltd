import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { ProjectForm } from "@/components/admin/pages/new-project-form";
import { requirePageAccess } from "@/lib/auth/require-page-access";

export default async function NewProjectPage() {
  await requirePageAccess({ lead: ["read"] });
  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Add project"
      description="Add a new project to the portfolio and delivery tracker."
    >
      <ProjectForm />
    </AdminPageFrame>
  );
}
