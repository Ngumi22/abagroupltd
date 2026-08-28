import Link from "next/link";
import Image from "next/image";
import type { GalleryImage } from "@/generated/prisma/client";

interface BentoGalleryProps {
  images: GalleryImage[];
  preview?: boolean;
}

function getBentoSpanClass(index: number, preview: boolean): string {
  if (preview) {
    if (index === 0) return "bento-span-2x2";
    if (index === 5 || index === 6) return "bento-span-2x1";
    return "";
  }
  if (index % 7 === 0) return "bento-span-2x2";
  if (index % 5 === 0) return "bento-span-1x2";
  return "";
}

function BentoItem({
  image,
  index,
  preview,
}: {
  image: GalleryImage;
  index: number;
  preview: boolean;
}) {
  const spanClass = getBentoSpanClass(index, preview);

  return (
    <Link
      href={`/gallery#${image.slug}`}
      className={`bento-item ${spanClass}`.trimEnd()}
    >
      <Image
        src={image.imageUrl}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="bento-image"
        priority={index === 0}
      />
      <div className="bento-overlay" />
      <div className="bento-content">
        <span className="bento-number">
          {String(image.sortOrder).padStart(2, "0")}
        </span>
        <h3 className="bento-title">{image.title}</h3>
        <p className="bento-category">{image.category}</p>
      </div>
    </Link>
  );
}

export function BentoGallery({ images, preview = false }: BentoGalleryProps) {
  const visibleImages = preview ? images.slice(0, 7) : images;

  return (
    <div className="bento-grid">
      {visibleImages.map((image, index) => (
        <BentoItem
          key={image.id}
          image={image}
          index={index}
          preview={preview}
        />
      ))}
    </div>
  );
}

export function GallerySection({ images }: { images: GalleryImage[] }) {
  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <div>
            <p className="gallery-label">A visual record</p>
            <h2 className="gallery-title">
              Built to be <em className="gallery-emphasis">seen.</em>
            </h2>
          </div>
          <Link href="/gallery" className="gallery-link">
            View full gallery
          </Link>
        </div>
        <BentoGallery images={images} preview />
      </div>
    </section>
  );
}
