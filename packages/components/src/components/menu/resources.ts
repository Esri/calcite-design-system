import type { Menu } from "./menu";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isMenu(el: Element | null | EventTarget): el is Menu["el"] {
  return (el as Element | null)?.tagName === "CALCITE-MENU";
}
