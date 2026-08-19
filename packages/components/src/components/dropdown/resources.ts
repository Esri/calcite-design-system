import type { Dropdown } from "./dropdown";

export const SLOTS = {
  trigger: "trigger",
};

export const CSS = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDropdown(el: Element | null | EventTarget): el is Dropdown["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DROPDOWN";
}
