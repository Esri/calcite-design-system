import type { ComboboxItemGroup } from "../combobox-item-group/combobox-item-group";
import type { ComboboxItem } from "../combobox-item/combobox-item";

export type ComboboxChildElement = ComboboxItem["el"] | ComboboxItemGroup["el"];
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
