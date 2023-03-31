export function getMenubarItem(el: HTMLCalciteNavMenuItemElement): HTMLCalciteNavMenuItemElement {
  let parentEl = el.parentElement;
  let menuBarItem: HTMLCalciteNavMenuItemElement | null = null;

  while (parentEl.matches("calcite-nav-menu-item")) {
    menuBarItem = parentEl as HTMLCalciteNavMenuItemElement;
    parentEl = parentEl.parentElement;
  }
  menuBarItem.subMenuOpen = false;
  return menuBarItem;
}
