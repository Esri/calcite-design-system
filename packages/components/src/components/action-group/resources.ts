import { IconName } from "../icon/interfaces";

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

export function isActionGroup(el: Element | null): el is ActionGroup["el"] {
  return el?.tagName === "CALCITE-ACTION-GROUP";
}
