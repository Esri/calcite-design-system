import type { Checkbox } from "./checkbox";

export const CSS = {
  toggle: "toggle",
  check: "check-svg",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isCheckbox(el: Element | null | EventTarget): el is Checkbox["el"] {
  return (el as Element | null)?.tagName === "CALCITE-CHECKBOX";
}
