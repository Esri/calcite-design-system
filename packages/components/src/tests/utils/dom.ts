/**
 * Determines whether the given element is placed in the top layer.
 */
export function isInTopLayer(el: Element): boolean {
  return el.hasAttribute("popover") && el.matches(":popover-open");
}
