import { FocusElementInGroupDestination } from "../../utils/dom";

export interface TableRowFocusEvent {
  cellPosition: number;
  rowPosition: number;
  destination: FocusElementInGroupDestination;
  lastCell: boolean;
}

export interface TableRowSelectEvent {
  userTriggered?: boolean;
}

export type RowType = "head" | "body" | "foot";

export type TableLayout = "auto" | "fixed";

export type TableSelectionDisplay = "top" | "none";

export type TableInteractionMode = "interactive" | "static";
