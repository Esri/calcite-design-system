import type { Handle } from "./handle";

export const CSS = {
  handle: "handle",
  handleSelected: "handle--selected",
};

export const ICONS = {
  drag: "drag",
} as const;

export const SUBSTITUTIONS = {
  itemLabel: "{itemLabel}",
  position: "{position}",
  total: "{total}",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isHandle(el: Element | null | EventTarget): el is Handle["el"] {
  return (el as Element | null)?.tagName === "CALCITE-HANDLE";
}
