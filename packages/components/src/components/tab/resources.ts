import { isTag } from "../resources";
import { Scale } from "../types";

export const CSS = {
  container: "container",
  content: "content",
  scale: (scale: Scale) => `scale-${scale}` as const,
};

export const IDS = {
  tabTitleId: (id: any) => `calcite-tab-title-${id}` as const,
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTab = isTag("calcite-tab");
