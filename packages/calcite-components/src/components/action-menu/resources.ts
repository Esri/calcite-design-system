export const CSS = {
  menu: "menu",
  defaultTrigger: "default-trigger",
};

const idPrefix = "calcite-action-menu";

export const IDS = {
  button: (id: string) => `${idPrefix}-${id}-menu-button`,
  menu: (id: string) => `${idPrefix}-${id}-menu`,
  action: (id: string, actionId: number) => `${idPrefix}-${id}-action-${actionId}`,
} as const;

export const SLOTS = {
  tooltip: "tooltip",
  trigger: "trigger",
};

export const ICONS = {
  menu: "ellipsis",
} as const;
