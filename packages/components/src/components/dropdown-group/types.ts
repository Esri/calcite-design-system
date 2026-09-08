import type { DropdownItem } from "../dropdown-item/dropdown-item";
import type { DropdownGroup } from "./dropdown-group";

export interface RequestedItem {
  requestedDropdownItem: DropdownItem["el"];
  requestedDropdownGroup: DropdownGroup["el"];
}
