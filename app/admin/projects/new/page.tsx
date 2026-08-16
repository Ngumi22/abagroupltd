import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { NewProjectForm } from "@/components/admin/pages/new-project-form";

export default function NewProjectPage() {
  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Add project"
      description="Add a new project to the portfolio and delivery tracker."
    >
      <NewProjectForm />
    </AdminPageFrame>
  );
}
