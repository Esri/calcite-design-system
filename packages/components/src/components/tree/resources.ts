import type { Tree } from "./tree";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTree(el: Element | null | EventTarget): el is Tree["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TREE";
}
