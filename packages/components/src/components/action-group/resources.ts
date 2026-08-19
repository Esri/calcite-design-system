import { IconName } from "../icon/types";
import type { ActionGroup } from "./action-group";

export const SLOTS = {
  menuActions: "menu-actions",
  menuTooltip: "menu-tooltip",
};

export const ICONS: Record<string, IconName> = {
  menu: "ellipsis",
};

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isActionGroup(el: Element | null | EventTarget): el is ActionGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ACTION-GROUP";
}
