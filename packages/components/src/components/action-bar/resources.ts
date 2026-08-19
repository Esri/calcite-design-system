import type { ActionBar } from "./action-bar";

export const CSS = {
  container: "container",
  hasActionGroups: "has-action-groups",
  lineOverlay: "line-overlay",
  line: "line",
  actionGroupEnd: "action-group--end",
  actionGroupStart: "action-group--start",
};

export const SLOTS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  expandTooltip: "expand-tooltip",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isActionBar(el: Element | null | EventTarget): el is ActionBar["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ACTION-BAR";
}
