export function isTreeItem(element: Element): element is HTMLCalciteTreeItemElement {
  return element?.tagName === "CALCITE-TREE-ITEM";
}

export function getTraversableItems(root: HTMLCalciteTreeElement): HTMLCalciteTreeItemElement[] {
  return Array.from(root.querySelectorAll<HTMLCalciteTreeItemElement>("calcite-tree-item:not([disabled])")).filter(
    (item): boolean => {
      let currentItem: HTMLElement = item;

      while (currentItem !== root && currentItem !== undefined) {
        const parent = currentItem.parentElement;
        const traversable = !isTreeItem(parent) || !parent.hasChildren || parent.expanded;

        if (!traversable) {
          return false;
        }

        currentItem = currentItem.parentElement;
      }

      return true;
    }
  );
}
