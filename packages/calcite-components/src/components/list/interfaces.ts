import { DragDetail, MoveDetail } from "../../utils/sortableComponent";
import type { ListItem } from "../list-item/list-item";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { List } from "./list";

export type ListDisplayMode = "flat" | "nested";

export interface ListDragDetail extends DragDetail {
  toEl: List["el"];
  fromEl: List["el"];
  dragEl: ListItem["el"];
}

export interface ListMoveDetail extends MoveDetail {
  toEl: List["el"];
  fromEl: List["el"];
  dragEl: ListItem["el"];
  relatedEl: ListItem["el"];
}

export type ListElement = ListItem["el"] | ListItemGroup["el"];
