import { Scale } from "../interfaces";

export const CSS = {
  closeButton: "close-button",
  container: "container",
  containerBottom: "container--bottom",
  content: "content",
  contentHasText: "content--has-text",
  iconEnd: "icon-end",
  iconPresent: "icon-present",
  iconStart: "icon-start",
  titleIcon: "calcite-tab-title--icon",
  scale: (scale: Scale) => `scale-${scale}` as const,
  selectedIndicator: "selected-indicator",
};

export const ICONS = {
  close: "x",
};
