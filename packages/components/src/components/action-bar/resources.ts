import { isTag } from "../resources";

export const CSS = {
  container: "container",
  hasActionGroups: "has-action-groups",
  lineOverlay: "line-overlay",
  line: "line",
  actionGroupEnd: "action-group--end",
  actionGroupStart: "action-group--start",
};

const idPrefix = "calcite-action-bar";

export const IDS = {
  action: (id: string, index: number) => `${idPrefix}-${id}-action-${index}`,
  actionGroup: (id: string, index: number) => `${idPrefix}-${id}-action-group-${index}`,
} as const;

export const SLOTS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  expandTooltip: "expand-tooltip",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isActionBar = isTag("calcite-action-bar");
