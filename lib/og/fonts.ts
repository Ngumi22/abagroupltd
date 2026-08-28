export async function loadCormorantGaramond(
  text: string,
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: "Cormorant Garamond:wght@600",
    text,
  });
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?${params}`)
  ).text();

  const fontUrl = css.match(
    /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
  )?.[1];
  if (!fontUrl) {
    throw new Error("Could not resolve a Cormorant Garamond font URL");
  }

  const fontResponse = await fetch(fontUrl);
  return fontResponse.arrayBuffer();
}
