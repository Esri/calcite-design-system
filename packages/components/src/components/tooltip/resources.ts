import type { Tooltip } from "./tooltip";

export const CSS = {
  positionContainer: "position-container",
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTooltip(el: Element | null | EventTarget): el is Tooltip["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TOOLTIP";
}
