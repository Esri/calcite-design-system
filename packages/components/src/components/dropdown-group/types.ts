import type { DropdownItem } from "../dropdown-item/dropdown-item";
import type { DropdownGroup } from "./dropdown-group";

/** @internal */
export interface RequestedItem {
  /** @internal */
  requestedDropdownItem: DropdownItem["el"];
  /** @internal */
  requestedDropdownGroup: DropdownGroup["el"];
}
