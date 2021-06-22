import { PopperPlacement } from "../../utils/popper";

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export type DropdownPlacement = Extract<
  PopperPlacement,
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
