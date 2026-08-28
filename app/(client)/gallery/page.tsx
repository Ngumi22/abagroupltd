import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/data/gallery";
import { GalleryClient } from "@/components/site/gallery-client";

export const metadata: Metadata = {
  title: "Gallery | Aba Group Ltd",
  description:
    "A visual record of Aba Group Ltd's architecture, construction, and interiors work across Kenya.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[.2em] text-bronze-dark">
            Aba Group visual archive
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">
            The work, in{" "}
            <em className="text-bronze-dark not-italic">detail.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-ink/60">
            A numbered collection of spaces, materials, and details shaped by
            our team across Kenya.
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">
            Built to be <em className="text-bronze-dark not-italic">seen.</em>
          </h1>
        </div>
        <div className="mt-12">
          <GalleryClient images={images} />
        </div>
      </div>
    </main>
  );
}
