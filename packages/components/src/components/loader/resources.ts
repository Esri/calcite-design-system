import type { Loader } from "./loader";

export const CSS = {
  container: "container",
  loader: "loader",
  percentage: "percentage",
  progressRing: "ring--progress",
  ring: "ring",
  rings: "rings",
  text: "text",
  trackRing: "ring--track",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isLoader(el: Element | null | EventTarget): el is Loader["el"] {
  return (el as Element | null)?.tagName === "CALCITE-LOADER";
}
