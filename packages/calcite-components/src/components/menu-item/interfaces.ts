import type { CalciteMenuItem } from "./menu-item";

export interface MenuItemCustomEvent {
  event: KeyboardEvent;
  children?: CalciteMenuItem["el"][];
  isSubmenuOpen?: boolean;
}
