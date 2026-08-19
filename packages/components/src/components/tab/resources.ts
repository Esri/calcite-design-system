import type { Tab } from "./tab";

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
export function isTab(el: Element | null | EventTarget): el is Tab["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TAB";
}
