import { h, JsxNode } from "@arcgis/lumina";

export function highlightText({
  text,
  pattern,
}: {
  text: string;
  pattern: RegExp;
}): string | (string | JsxNode)[] {
  if (!pattern || !text) {
    return text;
  }

  const parts: (string | JsxNode)[] = text.split(pattern);

  if (parts.length > 1) {
    // we only highlight the first match
    parts[1] = <mark class="text-match">{parts[1]}</mark>;
  }

  return parts;
}
