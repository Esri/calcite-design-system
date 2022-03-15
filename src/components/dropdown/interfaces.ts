import { LogicalPlacement } from "../../utils/floating-ui";

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export type DropdownPlacement = Extract<
  LogicalPlacement,
  "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end"
>;

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}
