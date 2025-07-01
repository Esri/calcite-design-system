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

export const IDS = {
  tabTitleId: (id: any) => `calcite-tab-title-${id}` as const,
};
