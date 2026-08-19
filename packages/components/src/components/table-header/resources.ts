import type { TableHeader } from "./table-header";

import { IconName } from "../icon/types";

export const CSS = {
  contentCell: "content-cell",
  numberCell: "number-cell",
  selectionCell: "selection-cell",
  bodyRow: "body-row",
  footerRow: "footer-row",
  heading: "heading",
  description: "description",
  multipleSelectionCell: "cell--multiple-selection",
  assistiveText: "assistive-text",
  active: "active",
  selectedCell: "selected-cell",
  lastCell: "last-cell",
  staticCell: "static-cell",
};

export const ICONS: Record<string, IconName> = {
  checked: "check-square-f",
  indeterminate: "minus-square-f",
  unchecked: "square",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTableHeader(el: Element | null | EventTarget): el is TableHeader["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TABLE-HEADER";
}
