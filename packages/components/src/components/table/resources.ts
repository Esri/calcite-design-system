import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  bordered: "bordered",
  striped: "striped",
  selectionArea: "selection-area",
  paginationArea: "pagination-area",
  container: "container",
  table: "table",
  tableBody: "table__body",
  tableContainer: "table-container",
  tableContainerOverflow: "table-container--overflow",
  tableFixed: "table--fixed",
  tableFoot: "table__foot",
  tableHead: "table__head",
  selectionActions: "selection-actions",
  dismissButton: "dismiss-button",
  selectionChipActive: "selection-chip--active",
  selectionCountChip: "selection-chip",
  selectionOutOfViewChip: "selection-chip--out-of-view",
};

export const SLOTS = {
  selectionActions: "selection-actions",
  tableHeader: "table-header",
  tableFooter: "table-footer",
};

export const ICONS: Record<string, IconName> = {
  hideEmpty: "hide-empty",
  clear: "x",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTable = isTag("calcite-table");
