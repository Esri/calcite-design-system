function isTreeItem(element: Element): element is HTMLCalciteTreeItemElement {
  return element?.matches("calcite-tree-item");
}

export function getEnabledSiblingItem(el: Element, direction: "up" | "down"): HTMLCalciteTreeItemElement {
  const directionProp = direction === "down" ? "nextElementSibling" : "previousElementSibling";
  let currentEl: Element = el;
  let enabledEl: HTMLCalciteTreeItemElement | null = null;

  while (isTreeItem(currentEl)) {
    if (!currentEl.disabled) {
      enabledEl = currentEl;
      break;
    }

    currentEl = currentEl[directionProp];
  }

  return enabledEl;
}
