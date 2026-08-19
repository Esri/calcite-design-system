import type { Label } from "./label";

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isLabel(el: Element | null | EventTarget): el is Label["el"] {
  return (el as Element | null)?.tagName === "CALCITE-LABEL";
}
