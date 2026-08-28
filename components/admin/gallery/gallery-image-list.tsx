"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Star, Trash2, MoreVertical } from "lucide-react";
import type { GalleryImage } from "@/generated/prisma/client";
import { getServiceBySlug } from "@/lib/data/services";
import {
  deleteGalleryImage,
  toggleGalleryImageFeatured,
} from "@/lib/actions/gallery";

function ImageActionMenu({
  image,
  busy,
  onToggleFeatured,
  onDelete,
}: {
  image: GalleryImage;
  busy: boolean;
  onToggleFeatured: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="absolute right-2 top-2 z-10" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={busy}
        aria-label="Open image actions"
        aria-expanded={isOpen}
        className={`grid size-7 place-items-center rounded-full transition-colors disabled:opacity-50 ${
          isOpen
            ? "bg-bronze text-ink"
            : "bg-ink/70 text-paper hover:bg-bronze hover:text-ink"
        }`}
      >
        {busy ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <MoreVertical size={14} />
        )}
      </button>

      {isOpen && !busy && (
        <div className="absolute right-0 top-full mt-1.5 w-40 origin-top-right overflow-hidden rounded-md border border-ink/15 bg-paper py-1 shadow-lg animate-in fade-in zoom-in-95">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onToggleFeatured(image);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-ink/5"
          >
            <Star
              size={14}
              fill={image.featured ? "currentColor" : "none"}
              className={image.featured ? "text-bronze-dark" : "text-ink/70"}
            />
            {image.featured ? "Unfeature" : "Feature"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onDelete(image);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-600/10"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function GalleryImageList({ images }: { images: GalleryImage[] }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = images.filter((image) =>
    `${image.title} ${image.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  function performDelete(id: string) {
    setPendingId(id);
    startTransition(async () => {
      const result = await deleteGalleryImage(id);
      setPendingId(null);
      if (result.status === "error") {
        toast.error(result.message ?? "Failed to delete image.");
        return;
      }
      toast.success("Image deleted.");
    });
  }

  function handleDelete(image: GalleryImage) {
    toast(`Delete "${image.title}"?`, {
      description: "This action cannot be undone.",
      action: { label: "Delete", onClick: () => performDelete(image.id) },
      cancel: { label: "Cancel", onClick: () => {} },
      duration: 10000,
    });
  }

  function handleToggleFeatured(image: GalleryImage) {
    setPendingId(image.id);
    startTransition(async () => {
      const result = await toggleGalleryImageFeatured(
        image.id,
        !image.featured,
      );
      setPendingId(null);
      if (result.status === "error") {
        toast.error(result.message ?? "Failed to update image.");
        return;
      }
      toast.success(
        image.featured ? "Removed from featured." : "Marked as featured.",
      );
    });
  }

  return (
    <section className="border border-ink/10 bg-[#eee9df] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[.18em] text-bronze-dark">
            Published library
          </p>
          <h2 className="mt-2 font-serif text-2xl">
            {images.length} gallery images
          </h2>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search images"
          aria-label="Search gallery images"
          className="w-full border border-ink/15 bg-paper px-3 py-3 text-sm outline-none focus:border-bronze-dark sm:max-w-xs"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((image) => {
          const busy = isPending && pendingId === image.id;
          return (
            <article
              key={image.id}
              className="group relative overflow-hidden border border-ink/10 bg-paper"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.alt}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 z-10 bg-ink/80 px-2 py-1 text-[9px] uppercase tracking-wider text-paper shadow-sm">
                  #{image.sortOrder}
                </span>

                {/* Dropdown Menu Component */}
                <ImageActionMenu
                  image={image}
                  busy={busy}
                  onToggleFeatured={handleToggleFeatured}
                  onDelete={handleDelete}
                />
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-medium capitalize">
                  {image.title}
                </h3>
                <p className="mt-1 text-xs text-ink/50">
                  {getServiceBySlug(image.category)?.title ?? image.category}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {!filtered.length && (
        <p className="py-10 text-center text-sm text-ink/55">
          No gallery images match your search.
        </p>
      )}
    </section>
  );
}
