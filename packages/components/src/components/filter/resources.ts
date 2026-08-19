import type { Filter } from "./filter";

export const CSS = {
  container: "container",
};

export const ICONS = {
  search: "search",
  close: "x",
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isFilter(el: Element | null | EventTarget): el is Filter["el"] {
  return (el as Element | null)?.tagName === "CALCITE-FILTER";
}
