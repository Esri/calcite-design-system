import { isTag } from "../resources";
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
export const isDropdownItem = isTag("calcite-dropdown-item");
