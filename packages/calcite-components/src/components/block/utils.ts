import { Block } from "./block";

function isBlock(element: Element): element is Block["el"] {
  return element?.tagName === "CALCITE-BLOCK";
}

export function isDraggableBlock(element: Element): boolean {
  return isBlock(element) && !element.hidden;
}
