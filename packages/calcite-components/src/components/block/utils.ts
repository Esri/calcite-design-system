import { Block } from "./block";

export function isBlock(element: Element): element is Block["el"] {
  return element.tagName === "CALCITE-BLOCK";
}
