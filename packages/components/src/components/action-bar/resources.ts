export const CSS = {
  container: "container",
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
