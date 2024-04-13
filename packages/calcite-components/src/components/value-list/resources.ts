import { ValueUnion } from "../types";

export const CSS = {
  container: "container",
  handle: "handle",
};

export const ICON_TYPES = {
  grip: "grip",
};

export type ICON_TYPES = ValueUnion<typeof ICON_TYPES>;

export const TEXT = {
  filterResults: "Filter results",
};
