import { IconName } from "../icon/interfaces";

export const DURATION = 6000;

export const CSS = {
  container: "container",
  containerOverlaid: "container--overlaid",
  containerEdged: "container--edged",
  itemContainer: "item-container",
  itemContainerForward: "item-container--forward",
  itemContainerBackward: "item-container--backward",
  pagination: "pagination",
  paginationItems: "pagination-items",
  paginationItem: "pagination-item",
  paginationItemIndividual: "pagination-item--individual",
  paginationItemVisible: "pagination-item--visible",
  paginationItemOutOfRange: "pagination-item--out-of-range",
  paginationItemSelected: "pagination-item--selected",
  paginationItemRangeEdge: "pagination-item--range-edge",
  pageNext: "page-next",
  pagePrevious: "page-previous",
  autoplayControl: "autoplay-control",
  autoplayProgress: "autoplay-progress",
};

export const ICONS = {
  chevronLeft: "chevron-left" as IconName,
  chevronRight: "chevron-right" as IconName,
  inactive: "bullet-point" as IconName,
  active: "bullet-point-large" as IconName,
  pause: "pause-f" as IconName,
  play: "play-f" as IconName,
};

export const centerItemsByBreakpoint = {
  medium: 7,
  small: 5,
  xsmall: 3,
  xxsmall: 1,
};

const idPrefix = "calcite-carousel-container";

export const IDS = {
  host: (id: string) => `${idPrefix}-${id}` as const,
};
