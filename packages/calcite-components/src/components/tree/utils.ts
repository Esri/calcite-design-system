// @ts-strict-ignore
import type { TreeItem } from "../tree-item/tree-item";
import type { Tree } from "./tree";

export function isTreeItem(element: Element): element is TreeItem["el"] {
  return element?.tagName === "CALCITE-TREE-ITEM";
}

export function getTraversableItems(root: Tree["el"]): TreeItem["el"][] {
  return Array.from(root.querySelectorAll<TreeItem["el"]>("calcite-tree-item:not([disabled])")).filter(
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
    },
  );
}
