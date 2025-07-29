import { TabPosition } from "../tabs/interfaces";
import { Scale } from "../interfaces";

export const ICON = {
  chevronRight: "chevron-right",
  chevronLeft: "chevron-left",
} as const;

export const CSS = {
  container: "container",
  containerHasEndTabTitleOverflow: "container--end-overflow",
  containerHasStartTabTitleOverflow: "container--start-overflow",
  scrollButton: "scroll-button",
  scrollButtonContainer: "scroll-button-container",
  scrollBackwardContainerButton: "scroll-button-container--backward",
  scrollForwardContainerButton: "scroll-button-container--forward",
  tabTitleSlotWrapper: "tab-titles-slot-wrapper",
  scale: (scale: Scale) => `scale-${scale}` as const,
  position: (position: TabPosition) => `position-${position}` as const,
};
