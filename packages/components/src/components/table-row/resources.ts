import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  lastVisibleRow: "last-visible-row",
  row: "row",
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
export const isTableRow = isTag("calcite-table-row");
