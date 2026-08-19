import type { DropdownGroup } from "./dropdown-group";

export const CSS = {
  title: "title",
  firstTitle: "first-title",
  separator: "separator",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDropdownGroup(el: Element | null | EventTarget): el is DropdownGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DROPDOWN-GROUP";
}
