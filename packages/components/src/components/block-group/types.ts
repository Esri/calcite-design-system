import { type DragDetail, type MoveDetail, type OrderRequestDetail } from "../../controllers/useSortable";
import type { Block } from "../block/block";
import type { BlockGroup } from "./block-group";

export type BlockDragDetail = DragDetail<BlockGroup["el"], BlockGroup["el"], Block["el"]>;
export type BlockOrderRequestDetail = OrderRequestDetail<BlockDragDetail>;
export type BlockMoveDetail = MoveDetail<BlockGroup["el"], BlockGroup["el"], Block["el"], Block["el"]>;
