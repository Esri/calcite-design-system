import type { DropdownItem } from "./dropdown-item";

import { IconName } from "../icon/types";

export const CSS = {
  container: "container",
  containerNone: "container--none-selection",
  icon: "icon",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  itemContent: "content",
  link: "link",
};

export const ICONS: Record<string, IconName> = {
  check: "check",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDropdownItem(el: Element | null | EventTarget): el is DropdownItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DROPDOWN-ITEM";
}
