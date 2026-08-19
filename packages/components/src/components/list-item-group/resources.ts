import type { ListItemGroup } from "./list-item-group";

export const CSS = {
  container: "container",
  heading: "heading",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isListItemGroup(el: Element | null | EventTarget): el is ListItemGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-LIST-ITEM-GROUP";
}
