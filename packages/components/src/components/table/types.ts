import { FocusElementInGroupDestination } from "../../utils/dom";

/** @internal */
export interface TableRowFocusEvent {
  /** @internal */
  cellPosition: number;
  /** @internal */
  rowPosition: number;
  /** @internal */
  destination: FocusElementInGroupDestination;
  /** @internal */
  lastCell: boolean;
}

/** @internal */
export type RowType = "head" | "body" | "foot";

/** @public */
export type TableLayout = "auto" | "fixed";

/** @public */
export type TableSelectionDisplay = "top" | "none";

/** @public */
export type TableInteractionMode = "interactive" | "static";
