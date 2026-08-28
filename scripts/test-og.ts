import { writeFile } from "fs/promises";
import { renderBrandedOgImage } from "@/lib/og/template";
import { DEFAULT_BACKGROUND_IMAGE } from "@/lib/constants";

async function testOG() {
  const { element, fonts } = await renderBrandedOgImage({
    lines: [
      { text: "Built with intention." },
      { text: "Made to endure.", accent: true },
    ],
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
  });

  const { ImageResponse } = await import("next/og");
  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts,
  });

  const buffer = await response.arrayBuffer();
  await writeFile("./og-preview.png", Buffer.from(buffer));
  console.log("✅ OG image saved to og-preview.png");
}

testOG().catch(console.error);
