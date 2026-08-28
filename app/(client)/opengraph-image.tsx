import { ImageResponse } from "next/og";
import { renderBrandedOgImage, OG_IMAGE_SIZE } from "@/lib/og/template";
import { DEFAULT_BACKGROUND_IMAGE } from "@/lib/constants";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Aba Group Ltd — Construction & Development in Kenya";

export default async function Image() {
  const { element, fonts } = await renderBrandedOgImage({
    lines: [
      { text: "Built with intention." },
      { text: "Made to endure.", accent: true },
    ],
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
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
