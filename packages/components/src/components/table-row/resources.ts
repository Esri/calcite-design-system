import type { TableRow } from "./table-row";

import { IconName } from "../icon/types";

export const CSS = {
  lastVisibleRow: "last-visible-row",
};

export const ICONS: Record<string, IconName> = {
  checkSquare: "check-square-f",
  square: "square",
  circleF: "circle-f",
  circle: "circle",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTableRow(el: Element | null | EventTarget): el is TableRow["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TABLE-ROW";
}
