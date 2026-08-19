import type { Link } from "./link";

export const CSS = {
  calciteLinkIcon: "calcite-link--icon",
  iconStart: "icon-start",
  iconEnd: "icon-end",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isLink(el: Element | null | EventTarget): el is Link["el"] {
  return (el as Element | null)?.tagName === "CALCITE-LINK";
}
