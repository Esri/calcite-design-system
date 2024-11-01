export type ComboboxChildElement = HTMLCalciteComboboxItemElement | HTMLCalciteComboboxItemGroupElement;
export type SelectionDisplay = "all" | "fit" | "single";

export interface ItemData {
  description: string;
  label: string;
  metadata: Record<string, unknown>;
  shortHeading: string;
  value: string;
}

export interface GroupData {
  label: string;
}
