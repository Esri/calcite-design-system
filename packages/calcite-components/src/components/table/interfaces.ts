import { FocusElementInGroupDestination } from "../../utils/dom";

export interface TableRowFocusEvent {
  cellPosition: number;
  rowPosition: number;
  destination: FocusElementInGroupDestination;
  lastCell: boolean;
}

export type RowType = "head" | "body" | "foot";

export type TableLayout = "auto" | "fixed";
