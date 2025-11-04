import { Scale } from "../interfaces";

export const CSS = {
  container: "container",
  content: "content",
  scale: (scale: Scale) => `scale-${scale}` as const,
};

export const IDS = {
  tabTitleId: (id: any) => `calcite-tab-title-${id}` as const,
};
