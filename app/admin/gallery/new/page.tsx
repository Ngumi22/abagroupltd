import { GalleryUploadForm } from "@/components/admin/gallery/upload-form";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminGalleryPage() {
  return (
    <AdminPageFrame
      eyebrow="Content"
      title="Gallery"
      description="Stage one or many project images for the public gallery."
      action={
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper"
        >
          <Plus size={15} /> New post
        </Link>
      }
    >
      <div className="mt-8">
        <GalleryUploadForm />
      </div>
    </AdminPageFrame>
  );
}
