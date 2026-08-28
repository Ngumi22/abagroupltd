"use client";

import { useEffect, useState, useTransition } from "react";
import { upload } from "@imagekit/next";
import { toast } from "sonner";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { services } from "@/lib/data/services";
import { getUploadAuthParams } from "@/lib/upload/get-auth-params";
import { describeUploadError } from "@/lib/upload/describe-upload-error";
import { readImageDimensions } from "@/lib/upload/dimensions";
import { createGalleryImages } from "@/lib/actions/gallery";
import type { GalleryImageInput } from "@/lib/validations/gallery";

type LocalImage = {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  featured: boolean;
};

export function GalleryUploadForm() {
  const [images, setImages] = useState<LocalImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        category: services[0].slug,
        featured: false,
      }));
    setImages((current) => [...current, ...incoming]);
  }

  function removeImage(id: string) {
    setImages((current) => {
      const image = current.find((item) => item.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return current.filter((item) => item.id !== id);
    });
  }

  function updateImage(id: string, patch: Partial<LocalImage>) {
    setImages((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  useEffect(
    () => () => images.forEach((image) => URL.revokeObjectURL(image.preview)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!images.length) {
      toast.error("Choose at least one image first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { publicKey, params } = await getUploadAuthParams(
        images.length,
        "gallery",
      );

      const uploaded: GalleryImageInput[] = await Promise.all(
        images.map(async (image, index) => {
          const { width, height } = await readImageDimensions(image.file);
          const auth = params[index];
          const result = await upload({
            file: image.file,
            fileName: image.file.name,
            token: auth.token,
            expire: auth.expire,
            signature: auth.signature,
            publicKey,
            folder: "/gallery",
            useUniqueFileName: true,
          });

          if (!result.url) {
            throw new Error(`Upload failed for ${image.file.name}`);
          }

          return {
            title: image.title,
            category: image.category,
            alt: image.title,
            imageUrl: result.url,
            imagekitFileId: result.fileId,
            width,
            height,
            featured: image.featured,
          };
        }),
      );

      startTransition(async () => {
        const result = await createGalleryImages(uploaded);
        if (result.status === "error") {
          toast.error(result.message ?? "Failed to save gallery images.");
          return;
        }
        toast.success(
          `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} added to the gallery.`,
        );
        images.forEach((image) => URL.revokeObjectURL(image.preview));
        setImages([]);
      });
    } catch (err) {
      toast.error(describeUploadError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  const busy = isSubmitting || isPending;

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="grid gap-5">
        <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center border border-dashed border-ink/25 bg-[#eee9df] p-8 text-center transition-colors hover:border-bronze-dark">
          <Upload className="text-bronze-dark" />
          <span className="mt-4 font-serif text-2xl">Drop images here</span>
          <span className="mt-2 text-sm text-ink/55">
            Upload one image or select multiple files at once.
          </span>
          <span className="mt-5 border border-bronze-dark px-4 py-2 text-[10px] uppercase tracking-[.16em]">
            Choose images
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="sr-only"
            onChange={(event) => addFiles(event.target.files)}
          />
        </label>

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.id}
                className="group relative overflow-hidden border border-ink/10 bg-[#eee9df]"
              >
                <img
                  src={image.preview}
                  alt={image.title}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  aria-label={`Remove ${image.title}`}
                  className="absolute right-2 top-2 grid size-8 place-items-center bg-ink/80 text-paper transition-colors hover:bg-bronze-dark"
                >
                  <X size={15} />
                </button>
                <div className="space-y-2 p-3">
                  <input
                    value={image.title}
                    onChange={(e) =>
                      updateImage(image.id, { title: e.target.value })
                    }
                    className="w-full truncate border-b border-ink/15 bg-transparent text-xs capitalize outline-none focus:border-bronze-dark"
                  />
                  <select
                    value={image.category}
                    onChange={(e) =>
                      updateImage(image.id, { category: e.target.value })
                    }
                    className="w-full border border-ink/10 bg-paper px-2 py-1.5 text-[11px] outline-none focus:border-bronze-dark"
                  >
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink/55">
                    <input
                      type="checkbox"
                      checked={image.featured}
                      onChange={(e) =>
                        updateImage(image.id, { featured: e.target.checked })
                      }
                    />
                    Featured
                  </label>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <aside className="flex h-fit flex-col gap-5 border border-ink/10 bg-[#eee9df] p-5">
        <div>
          <p className="text-[10px] uppercase tracking-[.18em] text-bronze-dark">
            Gallery upload
          </p>
          <h2 className="mt-2 font-serif text-2xl">
            {images.length} image{images.length === 1 ? "" : "s"} staged
          </h2>
        </div>
        <p className="text-xs leading-5 text-ink/55">
          <ImagePlus size={15} className="mb-2 text-bronze-dark" />
          Set a title, category, and whether each image should be featured on
          the homepage teaser before uploading.
        </p>
        <button
          type="submit"
          disabled={busy || images.length === 0}
          className="inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-[.16em] text-paper transition-colors hover:bg-bronze-dark disabled:opacity-50"
        >
          {busy ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {busy ? "Uploading…" : "Upload & create records"}
        </button>
      </aside>
    </form>
  );
}
