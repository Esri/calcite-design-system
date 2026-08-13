import type { MenuItem } from "./menu-item";

export interface MenuItemCustomEvent {
  event: KeyboardEvent;
  children?: MenuItem["el"][];
  isSubmenuOpen?: boolean;
}

export type Layout = "horizontal" | "vertical";
