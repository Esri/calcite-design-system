export const SLOTS = {
  dropdownTrigger: "trigger",
};

export const CSS = {
  content: "calcite-dropdown-content",
  wrapper: "calcite-dropdown-wrapper",
  triggerContainer: "calcite-trigger-container",
};

export const IDS = {
  dropdownId: (id: string) => `calcite-dropdown-${id}`,
  menuButtonId: (id: string) => `${id}-menubutton`,
  menuId: (id: string) => `${id}-menu`,
} as const;
