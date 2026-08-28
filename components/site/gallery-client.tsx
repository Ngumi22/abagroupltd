"use client";

import { useState } from "react";
import type { GalleryImage as PrismaGalleryImage } from "@/generated/prisma/client";
import { services } from "@/lib/data/services";
import { BentoGallery } from "./gallery";
import type { GalleryImage } from "@/lib/types";

const ALL = "all";

export function GalleryClient({ images }: { images: PrismaGalleryImage[] }) {
  const [category, setCategory] = useState<string>(ALL);

  const filtered =
    category === ALL
      ? images
      : images.filter((image) => image.category === category);

  const mapped: GalleryImage[] = filtered.map((image) => ({
    id: image.id,
    slug: image.slug,
    title: image.title,
    category:
      services.find((s) => s.slug === image.category)?.title ?? image.category,
    alt: image.alt,
    src: image.imageUrl,
    width: image.width,
    height: image.height,
    featured: image.featured,
    sortOrder: image.sortOrder,
  }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-ink/10 pb-4">
        <button
          onClick={() => setCategory(ALL)}
          className={`px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
            category === ALL
              ? "bg-bronze text-paper"
              : "text-ink/50 hover:text-ink"
          }`}
        >
          All work
        </button>
        {services.map((service) => (
          <button
            key={service.slug}
            onClick={() => setCategory(service.slug)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
              category === service.slug
                ? "bg-bronze text-paper"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {mapped.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink/50">
          No images in this category yet.
        </p>
      ) : (
        <BentoGallery images={mapped} />
      )}
    </div>
  );
}
