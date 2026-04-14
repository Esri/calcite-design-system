import { IconName } from "../icon/interfaces";
import { Action } from "./action";

export const CSS = {
  button: "button",
  buttonGroup: "button-group",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  buttonSplitPrimary: "button--split-primary",
  buttonSplitSecondary: "button--split-secondary",
  buttonSplitSecondaryActive: "button--split-secondary-active",
  buttonOverflowOpen: "button--overflow-open",
  buttonMenuOpen: "button--menu-open",
  menu: "menu",
  menuChevron: "menu-chevron",
  menuContent: "menu-content",
  menuTrigger: "button--menu-trigger",
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
  action: (id: string, actionId: number) => `${prefixId}-${id}-action-${actionId}`,
  button: (id: string) => `${prefixId}-${id}-button`,
  indicator: (id: string) => `${prefixId}-${id}-indicator`,
  menu: (id: string) => `${prefixId}-${id}-menu`,
} as const;

export const SLOTS = {
  menuActions: "menu-actions",
  tooltip: "tooltip",
};

export const ICONS: Record<string, IconName> = {
  chevronDown: "chevronDown",
  overflow: "ellipsis",
};

export function isAction(el: Element | null): el is Action["el"] {
  return el?.tagName === "CALCITE-ACTION";
}
