export interface MenuItemCustomEvent {
  event: KeyboardEvent;
  children?: HTMLCalciteMenuItemElement[];
  isSubmenuOpen?: boolean;
}
