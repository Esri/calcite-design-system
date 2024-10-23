import { DragDetail } from "../../utils/sortableComponent";
import type { ListItem } from "../list-item/list-item";
import type { List } from "./list";

export interface ListDragDetail extends DragDetail {
  toEl: List["el"];
  fromEl: List["el"];
  dragEl: ListItem["el"];
}
