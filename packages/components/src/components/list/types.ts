import { type DragDetail, type MoveDetail } from "../../controllers/useSortable";
import type { ListItem } from "../list-item/list-item";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { List } from "./list";

export type ListDisplayMode = "flat" | "nested";

export type ListDragDetail = DragDetail<List["el"], List["el"], ListItem["el"]>;
export type ListMoveDetail = MoveDetail<List["el"], List["el"], ListItem["el"], ListItem["el"]>;

export type ListElement = ListItem["el"] | ListItemGroup["el"];
