import type { Switch } from "./switch";

export const CSS = {
  container: "container",
  track: "track",
  handle: "handle",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSwitch(el: Element | null | EventTarget): el is Switch["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SWITCH";
}
