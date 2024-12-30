import { h, JsxNode } from "@arcgis/lumina";

export function mark({
  text,
  pattern,
  className,
}: {
  text: string;
  pattern: RegExp;
  className: string;
}): string | (string | JsxNode)[] {
  if (!pattern || !text) {
    return text;
  }

  const parts: (string | JsxNode)[] = text.split(pattern);

  if (parts.length > 1) {
    // we only highlight the first match
    parts[1] = <mark class={className}>{parts[1]}</mark>;
  }

  return parts;
}
