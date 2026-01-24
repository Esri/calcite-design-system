import { IconName } from "../icon/interfaces";
import { Scale } from "../interfaces";

export const CSS = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  iconCustom: "icon--custom",
  description: "description",
  icon: "icon",
  label: "label",
  scale: (scale: Scale) => `scale--${scale}` as const,
  shortText: "short-text",
  single: "label--single",
  textContainer: "text-container",
  heading: "heading",
};

export const ICONS: Record<string, IconName> = {
  checked: "check-square-f",
  circle: "circle",
  indeterminate: "minus-square-f",
  selectedSingle: "circle-inset-large",
  unchecked: "square",
};

export const SLOTS = {
  contentEnd: "content-end",
  contentStart: "content-start",
};

export const itemSpacingMultiplier = "--calcite-combobox-item-spacing-indent-multiplier";
