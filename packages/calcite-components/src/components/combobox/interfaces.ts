import type { ComboboxItemGroup } from "../combobox-item-group/combobox-item-group";
import type { ComboboxItem } from "../combobox-item/combobox-item";

export type ComboboxChildElement = ComboboxItem["el"] | ComboboxItemGroup["el"];
export type SelectionDisplay = "all" | "fit" | "single";

export interface ItemData extends BaseData {
  description: string;
  metadata: Record<string, unknown>;
  shortHeading: string;
  textLabel: string;
  el: ComboboxItem["el"] | ComboboxItemGroup["el"];
}

export type GroupData = BaseData;

interface BaseData {
  label: string;
}
