import { IconName } from "../icon/types";
import type { MenuItem } from "./menu-item";

export const CSS = {
  container: "container",
  content: "content",
  dropdownVertical: "dropdown--vertical",
  dropdownMenuItems: "dropdown-menu-items",
  dropdownAction: "dropdown-action",
  layoutVertical: "layout--vertical",
  hoverHrefIcon: "hover-href-icon",
  icon: "icon",
  iconBreadcrumb: "icon--breadcrumb",
  iconDropdown: "icon--dropdown",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  isParentVertical: "parent--vertical",
  itemContent: "item-content",
  open: "open",
  nested: "nested",
  textContainer: "text-container",
};

export const SLOTS = {
  submenuItem: "submenu-item",
};

export const ICONS: Record<string, IconName> = {
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isMenuItem(el: Element | null | EventTarget): el is MenuItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-MENU-ITEM";
}
