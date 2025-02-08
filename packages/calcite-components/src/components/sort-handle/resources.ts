import { Reorder } from "./interfaces";

export const CSS = {
  handle: "handle",
  dropdown: "dropdown",
} as const;

export const ICONS = {
  drag: "drag",
  blank: "blank",
} as const;

export const SUBSTITUTIONS = {
  label: "{label}",
  position: "{position}",
  total: "{total}",
} as const;

export const REORDER_VALUES: Reorder[] = ["top", "up", "down", "bottom"] as const;
