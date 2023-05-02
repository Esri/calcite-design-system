export interface MenuItemCustomEvent {
  event: KeyboardEvent;
  children?: HTMLCalciteMenuItemElement[];
  isSubMenuOpen?: boolean;
}
