import { isTag } from "../resources";
import { Reorder } from "./types";

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

export const SLOTS = {
  trigger: "trigger",
};

export const IDS = {
  add: "add",
  move: "move",
  reorder: "reorder",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSortHandle = isTag("calcite-sort-handle");
