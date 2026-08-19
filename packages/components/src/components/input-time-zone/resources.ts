import type { InputTimeZone } from "./input-time-zone";

export const CSS = {
  offset: "offset",
};

export const SLOTS = {
  labelContent: "label-content",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isInputTimeZone(el: Element | null | EventTarget): el is InputTimeZone["el"] {
  return (el as Element | null)?.tagName === "CALCITE-INPUT-TIME-ZONE";
}
