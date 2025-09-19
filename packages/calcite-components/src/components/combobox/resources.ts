export const ComboboxItemSelector = "CALCITE-COMBOBOX-ITEM";
export const ComboboxItemGroupSelector = "CALCITE-COMBOBOX-ITEM-GROUP";
export const AllComboboxChildrenSelector = `${ComboboxItemSelector}, ${ComboboxItemGroupSelector}`;

export const CSS = {
  allSelected: "all-selected",
  chip: "chip",
  chipInvisible: "chip--invisible",
  icon: "icon",
  input: "input",
  inputHidden: "input--hidden",
  label: "label",
  labelIcon: "label--icon",
  listContainer: "list-container",
  noMatches: "no-matches",
  noMatchesPlaceholder: "no-matches-placeholder",
  placeholderIcon: "placeholder-icon",
  selectAll: "select-all",
  selectionDisplayFit: "selection-display--fit",
  selectionDisplaySingle: "selection-display--single",
  selectedIcon: "selected-icon",
  floatingUIContainer: "floating-ui-container",
  screenReadersOnly: "screen-readers-only",
  wrapper: "wrapper",
  wrapperSingle: "wrapper--single",
  wrapperActive: "wrapper--active",
  gridInput: "grid-input",
  inputSingle: "input--single",
  inputIcon: "input--icon",
  inputWrap: "input-wrap",
  inputWrapSingle: "input-wrap--single",
  iconEnd: "icon-end",
  iconStart: "icon-start",
  list: "list",
  listHide: "list--hide",
};

const idPrefix = "combobox";

export const IDS = {
  validationMessage: "comboboxValidationMessage",
  item: (id: string) => `${idPrefix}-item-${id}`,
  chip: (id: string) => `${idPrefix}-chip-${id}`,
  label: (id: string) => `${idPrefix}-label-${id}`,
  listbox: (id: string) => `${idPrefix}-listbox-${id}`,
  input: (id: string) => `${idPrefix}-input-${id}`,
} as const;

export const ICONS = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};

export const SLOTS = {
  labelContent: "label-content",
};
