import { h, JsxNode } from "@arcgis/lumina";

const CSS = {
  textMatch: "text-match",
};

/**
 * Capitalizes the first letter in a provided word.
 * Assumes an unbroken string of text representing a single word.
 *
 * @param word string
 */
export function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Highlight text based on a search pattern.
 *
 * Items using this in their rendering should include the `text-highlight-item` mixin from `includes.scss` in their styles.
 *
 * @param text.text
 * @param text
 * @param pattern
 * @param text.pattern
 */
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
    parts[1] = <mark class={CSS.textMatch}>{parts[1]}</mark>;
  }

  return parts;
}
