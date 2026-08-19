import type { List } from "./list";

export const CSS = {
  container: "container",
  table: "table",
  scrim: "scrim",
  stack: "stack",
  tableContainer: "table-container",
  sticky: "sticky-pos",
  assistiveText: "assistive-text",
  containerHeight: "container-height",
};

export type SelectionAppearance = "border" | "highlight" | "icon";

export const SLOTS = {
  emptyContent: "empty-content",
  filterNoResults: "filter-no-results",
  filterActionsStart: "filter-actions-start",
  filterActionsEnd: "filter-actions-end",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isList(el: Element | null | EventTarget): el is List["el"] {
  return (el as Element | null)?.tagName === "CALCITE-LIST";
}
