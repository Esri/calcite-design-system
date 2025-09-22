import { Scale } from "../interfaces";

export const CSS = {
  firstTitle: "combobox-first-title",
  list: "list",
  label: "label",
  separator: "combobox-separator",
  title: "title",
  scale: (scale: Scale) => `scale--${scale}` as const,
};

export const itemSpacingMultiplier = "--calcite-combobox-item-spacing-indent-multiplier";
