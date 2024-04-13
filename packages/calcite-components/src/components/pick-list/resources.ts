import { ValueUnion } from "../types";

export const CSS = {
  sticky: "sticky-pos",
};

export const ICON_TYPES = {
  circle: "circle",
  square: "square",
  grip: "grip",
};

export type ICON_TYPES = ValueUnion<typeof ICON_TYPES>;

export const TEXT = {
  filterResults: "Filter results",
};

export const SLOTS = {
  menuActions: "menu-actions",
};
