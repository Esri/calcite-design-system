export function getMenubarItem(el: HTMLCalciteMenuItemElement): HTMLCalciteMenuItemElement {
  let parentEl = el.parentElement;
  let menuBarItem: HTMLCalciteMenuItemElement | null = null;

  while (parentEl.matches("calcite-menu-item")) {
    menuBarItem = parentEl as HTMLCalciteMenuItemElement;
    parentEl = parentEl.parentElement;
  }
  menuBarItem.subMenuOpen = false;
  return menuBarItem;
}
