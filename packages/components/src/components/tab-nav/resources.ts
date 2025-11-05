import { TabPosition } from "../tabs/interfaces";
import { Scale } from "../interfaces";

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
