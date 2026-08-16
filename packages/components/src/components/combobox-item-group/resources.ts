import { Scale } from "../types";

export const CSS = {
  firstTitle: "first-title",
  list: "list",
  label: "label",
  separator: "separator",
  title: "title",
  scale: (scale: Scale) => `scale--${scale}` as const,
};

export const itemSpacingMultiplier = "--calcite-combobox-item-spacing-indent-multiplier";
