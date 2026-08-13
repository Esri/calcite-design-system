import type { TreeItem } from "../tree-item/tree-item";
import type { Tree } from "./tree";

export function isTreeItem(element: Element | undefined): element is TreeItem["el"] {
  return element?.tagName === "CALCITE-TREE-ITEM";
}

export function getTraversableItems(root: Tree["el"]): TreeItem["el"][] {
  return Array.from(root.querySelectorAll<TreeItem["el"]>("calcite-tree-item:not([disabled])")).filter(
    (item): boolean => {
      let currentItem: HTMLElement | null = item;

      while (currentItem !== root && currentItem !== null) {
        const parent = currentItem.parentElement ?? undefined;
        const traversable = !isTreeItem(parent) || !parent.hasChildren || parent.expanded;

        if (!traversable) {
          return false;
        }

        currentItem = currentItem.parentElement;
      }

      return true;
    },
  );
}
