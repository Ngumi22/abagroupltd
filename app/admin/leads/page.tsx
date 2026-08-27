import { LeadsManagementTable } from "@/components/admin/leads/leads-management-table";
import { prisma } from "@/lib/prisma";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { AddLeadPopover } from "@/components/admin/leads/add-lead-popover";
import { requirePageAccess } from "@/lib/auth/require-page-access";

export default async function AdminLeadsPage() {
  await requirePageAccess({ lead: ["read"] });

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminPageFrame
      eyebrow="Pipeline"
      title="Leads"
      description="Track every prospect, from first contact through to a signed project."
    >
      <div className="grid gap-6">
        <div className="flex justify-end">
          <AddLeadPopover />
        </div>
        <LeadsManagementTable leads={leads} />
      </div>
    </AdminPageFrame>
  );
}
