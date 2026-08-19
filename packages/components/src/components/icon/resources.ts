import type { Icon } from "./icon";

export const CSS = {
  icon: "icon",
  flipRtl: "flip-rtl",
  svg: "svg",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isIcon(el: Element | null | EventTarget): el is Icon["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ICON";
}
