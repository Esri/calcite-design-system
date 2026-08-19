import type { Scrim } from "./scrim";

export const CSS = {
  scrim: "scrim",
  content: "content",
};

export const BREAKPOINTS = {
  s: 72, // Less than 72px.
  // medium is assumed default.
  l: 480, // Greater than or equal to 480px.
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isScrim(el: Element | null | EventTarget): el is Scrim["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SCRIM";
}
