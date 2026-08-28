import { GalleryImageList } from "@/components/admin/gallery/gallery-image-list";
import { GalleryUploadForm } from "@/components/admin/gallery/upload-form";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { getGalleryImages } from "@/lib/data/gallery";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <AdminPageFrame
      eyebrow="Content"
      title="Gallery"
      description="Upload and manage images for the public gallery."
    >
      <div className="grid gap-10">
        <GalleryUploadForm />
        <GalleryImageList images={images} />
      </div>
    </AdminPageFrame>
  );
}
