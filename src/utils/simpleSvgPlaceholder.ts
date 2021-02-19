interface PlaceholderImageOptions {
  width: number;
  height: number;
  text?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  dy?: number;
  bgColor?: string;
  textColor?: string;
  dataUri?: boolean;
  charset?: string;
}

export default function simpleSvgPlaceholder({
  width = 300,
  height = 150,
  text = `${width}×${height}`,
  fontFamily = "sans-serif",
  fontWeight = "bold",
  fontSize = Math.floor(Math.min(width, height) * 0.2),
  dy = fontSize * 0.35,
  bgColor = "#ddd",
  textColor = "rgba(0,0,0,0.5)",
  dataUri = true,
  charset = "UTF-8"
}: PlaceholderImageOptions): string {
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
  </svg>`;

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replace(/[\t\n\r]/gim, "") // Strip newlines and tabs
    .replace(/\s\s+/g, " ") // Condense multiple spaces
    .replace(/'/gim, "\\i"); // Normalize quotes

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, "%28") // Encode brackets
      .replace(/\)/g, "%29");

    return `data:image/svg+xml;charset=${charset},${encoded}`;
  }

  return cleaned;
}
