import type { Select } from "./select";

export const CSS = {
  icon: "icon",
  iconContainer: "icon-container",
  select: "select",
  wrapper: "wrapper",
};

export const IDS = {
  validationMessage: "selectValidationMessage",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSelect(el: Element | null | EventTarget): el is Select["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SELECT";
}
