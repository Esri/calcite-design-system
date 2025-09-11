import { Scale } from "../interfaces";

export const CSS = {
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

const idPrefix = "calcite-tab-title";

export const IDS = {
  host: (id: any) => `${idPrefix}-${id}`,
} as const;
