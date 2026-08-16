import { InquiriesList } from "@/components/admin/dashboard/inquiries-list";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { getInquiries } from "@/lib/data/inquiries";

export default async function MessagesPage() {
  const inquiries = await getInquiries();

  return (
    <AdminPageFrame
      eyebrow="Client communication"
      title="Messages"
      description="Keep client communication visible and organized across active projects."
    >
      <InquiriesList inquiries={inquiries} />
    </AdminPageFrame>
  );
}
