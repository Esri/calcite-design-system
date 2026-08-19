import type { SwatchGroup } from "./swatch-group";

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSwatchGroup(el: Element | null | EventTarget): el is SwatchGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SWATCH-GROUP";
}
