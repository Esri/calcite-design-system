import { PopperPlacement } from "../../utils/popper";

export interface ItemRegistration {
  position: number;
}

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export interface GroupRegistration {
  items: HTMLCalciteDropdownItemElement[];
  position: number;
  group: HTMLCalciteDropdownGroupElement;
  titleEl: HTMLSpanElement;
  separatorEl: HTMLDivElement;
}

export interface RegisteredItem {
  item: HTMLCalciteDropdownItemElement;
  position: number;
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
