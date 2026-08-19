import type { Progress } from "./progress";

export const CSS = {
  track: "track",
  bar: "bar",
  text: "text",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isProgress(el: Element | null | EventTarget): el is Progress["el"] {
  return (el as Element | null)?.tagName === "CALCITE-PROGRESS";
}
