import { isTag } from "../resources";

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

const prefixId = "calcite-action";

export const IDS = {
  button: (id: string) => `${prefixId}-${id}-button`,
  indicator: (id: string) => `${prefixId}-${id}-indicator`,
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isAction = isTag("calcite-action");
