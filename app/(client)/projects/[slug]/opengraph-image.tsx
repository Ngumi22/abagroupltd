import { ImageResponse } from "next/og";
import { renderBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/og/template";
import { DEFAULT_BACKGROUND_IMAGE } from "@/lib/constants";
import { getProjectBySlug } from "@/lib/data/projects";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const { element, fonts } = await renderBrandedOgImage({
    eyebrow: "Aba Group Ltd — Portfolio",
    lines: [{ text: project?.name ?? "Aba Group Ltd" }],
    backgroundImage: project?.image ?? DEFAULT_BACKGROUND_IMAGE,
    footerLeft: project ? `${project.type} · ${project.location}` : "Portfolio",
  });

  return new ImageResponse(element, {
    ...size,
    fonts,
    headers: {
      "Cache-Control":
        "public, immutable, no-transform, max-age=86400, s-maxage=31536000",
    },
  });
}
