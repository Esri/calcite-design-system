export const CSS = {
  button: "button",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  indicatorText: "indicator-text",
  iconContainer: "icon-container",
  slotContainer: "slot-container",
  slotContainerHidden: "slot-container--hidden",
  textContainer: "text-container",
  textContainerVisible: "text-container--visible",
  indicatorWithIcon: "indicator-with-icon",
  indicatorWithoutIcon: "indicator-without-icon",
};

export const IDS = {
  actionId: (id: string) => `calcite-action-${id}`,
  buttonId: (id: string) => `${id}-button`,
  indicatorId: (id: string) => `${id}-indicator`,
} as const;

export const SLOTS = {
  tooltip: "tooltip",
};
