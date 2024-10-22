import type { ValueListItem } from "./value-list-item";

export interface ListItemAndHandle {
  item: ValueListItem["el"];
  handle: HTMLSpanElement;
}
