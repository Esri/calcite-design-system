import { FocusElementInGroupDestination } from "../../utils/dom";

export interface TableRowFocusEvent {
  cellPosition: number;
  rowPosition: number;
  destination: FocusElementInGroupDestination;
  fromHeader: boolean;
}

export type TableAppearance = "bordered" | "simple" | "bordered-zebra" | "simple-zebra";

export type TableLayout = "auto" | "fixed";
