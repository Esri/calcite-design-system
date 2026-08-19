import type { Option } from "./option";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isOption(el: Element | null | EventTarget): el is Option["el"] {
  return (el as Element | null)?.tagName === "CALCITE-OPTION";
}
