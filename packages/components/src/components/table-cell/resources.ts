import { isTag } from "../resources";

export const CSS = {
  contentCell: "content-cell",
  numberCell: "number-cell",
  footerCell: "footer-cell",
  selectionCell: "selection-cell",
  selectedCell: "selected-cell",
  assistiveText: "assistive-text",
  lastCell: "last-cell",
  staticCell: "static-cell",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTableCell = isTag("calcite-table-cell");
