import { FocusElementInGroupDestination } from "../../utils/dom";

export interface TableRowFocusEvent {
  cellPosition: number;
  rowPosition: number;
  destination: FocusElementInGroupDestination;
  lastCell: boolean;
}

export type RowType = "head" | "body" | "foot";

/** @public */
export type TableLayout = "auto" | "fixed";

/** @public */
export type TableSelectionDisplay = "top" | "none";

/** @public */
export type TableInteractionMode = "interactive" | "static";
