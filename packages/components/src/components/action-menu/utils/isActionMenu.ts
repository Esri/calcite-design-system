import type { ActionMenu } from "../action-menu";

export function isActionMenu(el: Element | null): el is ActionMenu["el"] {
  return el?.tagName === "CALCITE-ACTION-MENU";
}
