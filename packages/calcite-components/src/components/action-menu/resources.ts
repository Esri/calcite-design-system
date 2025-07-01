export const CSS = {
  menu: "menu",
  defaultTrigger: "default-trigger",
};

export const IDS = {
  actionMenuId: (id: string) => `calcite-action-menu-${id}`,
  menuButtonId: (id: string) => `${id}-menu-button`,
  menuId: (id: string) => `${id}-menu`,
  actionId: (id: string, actionId: number) => `${id}-action-${actionId}`,
} as const;

export const SLOTS = {
  tooltip: "tooltip",
  trigger: "trigger",
};

export const ICONS = {
  menu: "ellipsis",
} as const;
