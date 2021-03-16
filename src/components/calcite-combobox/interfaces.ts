export interface listItem {
  label: string;
  value: string;
}

export type ComboboxSelectionMode = "single" | "multi" | "ancestors";

export type ComboboxChildElement = HTMLCalciteComboboxItemElement | HTMLCalciteComboboxItemGroupElement;
