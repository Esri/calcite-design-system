export const SLOTS = {
  dropdownTrigger: "trigger",
};

export const CSS = {
  content: "calcite-dropdown-content",
  wrapper: "calcite-dropdown-wrapper",
  triggerContainer: "calcite-trigger-container",
};

const idPrefix = "calcite-dropdown";

export const IDS = {
  menuButton: (id: string) => `${idPrefix}-${id}-menubutton`,
  menu: (id: string) => `${idPrefix}-${id}-menu`,
} as const;
