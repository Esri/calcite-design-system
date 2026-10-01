import { type DragDetail, type DragStartDetail, type MoveDetail } from "../../controllers/useSortable";
import type { Block } from "../block/block";
import type { BlockGroup } from "./block-group";

export type BlockDragDetail = DragDetail<BlockGroup["el"], BlockGroup["el"], Block["el"]>;
export type BlockDragStartDetail = DragStartDetail<BlockDragDetail>;
export type BlockMoveDetail = MoveDetail<BlockGroup["el"], BlockGroup["el"], Block["el"], Block["el"]>;
