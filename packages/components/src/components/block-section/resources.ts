import type { BlockSection } from "./block-section";

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
  invalid: "invalid",
  sectionHeaderText: "section-header__text",
  statusIcon: "status-icon",
  switch: "switch",
  toggle: "toggle",
  toggleContainer: "toggle-container",
  toggleSwitchContent: "toggle--switch__content",
  toggleSwitchText: "toggle--switch__text",
  valid: "valid",
};

export const ICONS: Record<string, IconName> = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isBlockSection(el: Element | null | EventTarget): el is BlockSection["el"] {
  return (el as Element | null)?.tagName === "CALCITE-BLOCK-SECTION";
}
