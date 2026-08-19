import { IconName } from "../icon/types";
import type { ActionMenu } from "./action-menu";

export const CSS = {
  menu: "menu",
  defaultTrigger: "default-trigger",
};

const idPrefix = "calcite-action-menu";

export const IDS = {
  button: (id: string) => `${idPrefix}-${id}-menu-button`,
  menu: (id: string) => `${idPrefix}-${id}-menu`,
  action: (id: string, actionId: number) => `${idPrefix}-${id}-action-${actionId}`,
} as const;

export const SLOTS = {
  tooltip: "tooltip",
  trigger: "trigger",
};

export const ICONS: Record<string, IconName> = {
  menu: "ellipsis",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isActionMenu(el: Element | null | EventTarget): el is ActionMenu["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ACTION-MENU";
}
