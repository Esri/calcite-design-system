import type { TabNav } from "./tab-nav";

import { TabPosition } from "../tabs/types";
import { Scale } from "../types";

export const ICON = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left",
} as const;

export const CSS = {
  container: "container",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardButton: "scroll-button--backward",
  scrollForwardButton: "scroll-button--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper",
  scale: (scale: Scale) => `scale-${scale}` as const,
  position: (position: TabPosition) => `position-${position}` as const,
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTabNav(el: Element | null | EventTarget): el is TabNav["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TAB-NAV";
}
