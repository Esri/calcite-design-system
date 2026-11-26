import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const IDS = {
  content: "content",
  toggle: "toggle",
};

export const CSS = {
  chevronIcon: "chevron-icon",
  content: "content",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  sectionHeaderText: "section-header__text",
  switch: "switch",
  toggle: "toggle",
  toggleContainer: "toggle-container",
  toggleSwitchContent: "toggle--switch__content",
  toggleSwitchText: "toggle--switch__text",
};

export const ICONS: Record<string, IconName> = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isBlockSection = isTag("calcite-block-section");
