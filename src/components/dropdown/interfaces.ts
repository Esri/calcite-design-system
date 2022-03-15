import { LogicalPlacement } from "../../utils/floating-ui";

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export type DropdownPlacement = Extract<
  LogicalPlacement,
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-leading"
  | "top-trailing"
  | "bottom-leading"
  | "bottom-trailing"
>;

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}
