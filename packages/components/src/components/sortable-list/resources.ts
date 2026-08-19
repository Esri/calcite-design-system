import type { SortableList } from "./sortable-list";

export const CSS = {
  sortItem: "sort-item",
  container: "container",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSortableList(el: Element | null | EventTarget): el is SortableList["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SORTABLE-LIST";
}
