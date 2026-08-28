import { ImageResponse } from "next/og";
import { renderBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/og/template";
import { DEFAULT_BACKGROUND_IMAGE } from "@/lib/constants";
import { getPublishedBlogBySlug } from "@/lib/data/blogs";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  const { element, fonts } = await renderBrandedOgImage({
    eyebrow: "Aba Group Ltd — Blog",
    lines: [{ text: blog?.title ?? "Aba Group Ltd" }],
    backgroundImage: blog?.coverImage ?? DEFAULT_BACKGROUND_IMAGE,
    footerLeft: blog?.tags?.length ? blog.tags.slice(0, 3).join(" · ") : "Blog",
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
