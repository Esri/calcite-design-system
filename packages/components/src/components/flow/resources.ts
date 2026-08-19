import type { Flow } from "./flow";

export const CSS = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isFlow(el: Element | null | EventTarget): el is Flow["el"] {
  return (el as Element | null)?.tagName === "CALCITE-FLOW";
}
