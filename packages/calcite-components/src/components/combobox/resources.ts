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

export const IDS = {
  validationMessage: "comboboxValidationMessage",
  itemUidPrefix: (id: string) => `combobox-item-${id}` as const,
  chipUidPrefix: (id: string) => `combobox-chip-${id}` as const,
  labelUidPrefix: (id: string) => `combobox-label-${id}` as const,
  listboxUidPrefix: (id: string) => `combobox-listbox-${id}` as const,
  inputUidPrefix: (id: string) => `combobox-input-${id}` as const,
};

export const ICONS = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};
