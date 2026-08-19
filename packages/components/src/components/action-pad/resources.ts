import type { ActionPad } from "./action-pad";

export const CSS = {
  actionGroupEnd: "action-group--end",
  container: "container",
};

export const SLOTS = {
  expandTooltip: "expand-tooltip",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isActionPad(el: Element | null | EventTarget): el is ActionPad["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ACTION-PAD";
}
