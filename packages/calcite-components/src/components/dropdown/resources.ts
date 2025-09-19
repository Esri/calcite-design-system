export const SLOTS = {
  trigger: "trigger",
};

export const CSS = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container",
};

const idPrefix = "calcite-dropdown";

export const IDS = {
  menuButton: (id: string) => `${idPrefix}-${id}-menubutton`,
  menu: (id: string) => `${idPrefix}-${id}-menu`,
} as const;
