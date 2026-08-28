import { loadCormorantGaramond } from "./fonts";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const INK = "#101719";
const PAPER = "#f5f1e9";
const BRONZE = "#c59a5b";

const cornerBase = {
  display: "flex" as const,
  position: "absolute" as const,
  width: 28,
  height: 28,
};

export interface OgHeadlineLine {
  text: string;
  accent?: boolean;
}

export interface RenderBrandedOgImageOptions {
  eyebrow?: string;
  lines: OgHeadlineLine[];
  backgroundImage?: string;
  footerLeft?: string;
  footerRight?: string;
}

function fontSizeForLines(lines: OgHeadlineLine[]): number {
  const longest = Math.max(...lines.map((l) => l.text.length));
  if (longest > 70) return 44;
  if (longest > 50) return 56;
  if (longest > 32) return 68;
  return 84;
}

export async function renderBrandedOgImage({
  eyebrow = "Aba Group Ltd",
  lines,
  backgroundImage,
  footerLeft = "Architecture · Construction · Development",
  footerRight = "abagroupltd.co.ke",
}: RenderBrandedOgImageOptions) {
  const text = lines.map((l) => l.text).join("");
  const fontData = await loadCormorantGaramond(text);
  const fontSize = fontSizeForLines(lines);

  const element = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "72px 80px",
        backgroundColor: INK,
        color: PAPER,
        fontFamily: "sans-serif",
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(16, 23, 25, 0.85), rgba(16, 23, 25, 0.85)), url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          ...cornerBase,
          top: 40,
          left: 40,
          borderTop: `2px solid ${BRONZE}`,
          borderLeft: `2px solid ${BRONZE}`,
        }}
      />
      <div
        style={{
          ...cornerBase,
          top: 40,
          right: 40,
          borderTop: `2px solid ${BRONZE}`,
          borderRight: `2px solid ${BRONZE}`,
        }}
      />
      <div
        style={{
          ...cornerBase,
          bottom: 40,
          left: 40,
          borderBottom: `2px solid ${BRONZE}`,
          borderLeft: `2px solid ${BRONZE}`,
        }}
      />
      <div
        style={{
          ...cornerBase,
          bottom: 40,
          right: 40,
          borderBottom: `2px solid ${BRONZE}`,
          borderRight: `2px solid ${BRONZE}`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: 15,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: BRONZE,
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
        {lines.map((line, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize,
              lineHeight: 1.1,
              fontWeight: 600,
              color: line.accent ? BRONZE : PAPER,
            }}
          >
            {line.text}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: "1px solid rgba(246,243,236,0.2)",
        }}
      >
        <span
          style={{
            fontSize: 15,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(246,243,236,0.6)",
          }}
        >
          {footerLeft}
        </span>
        <span
          style={{
            fontSize: 15,
            letterSpacing: 2,
            color: "rgba(246,243,236,0.6)",
          }}
        >
          {footerRight}
        </span>
      </div>
    </div>
  );

  return {
    element,
    fonts: [
      {
        name: "Cormorant Garamond",
        data: fontData,
        weight: 600 as const,
        style: "normal" as const,
      },
    ],
  };
}
