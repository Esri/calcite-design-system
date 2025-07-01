export const CSS = {
  positionContainer: "position-container",
  container: "container",
};

export const IDS = {
  tooltipId: (id: any) => `calcite-tooltip-${id}` as const,
};

export const TOOLTIP_OPEN_DELAY_MS = 300;
export const TOOLTIP_QUICK_OPEN_DELAY_MS = TOOLTIP_OPEN_DELAY_MS / 3;
export const TOOLTIP_CLOSE_DELAY_MS = TOOLTIP_OPEN_DELAY_MS * 1.5;

export const ARIA_DESCRIBED_BY = "aria-describedby";
