import { DragDetail, MoveDetail } from "../../utils/sortableComponent";
import type { Block } from "../block/block";
import type { BlockGroup } from "./block-group";

export interface BlockDragDetail extends DragDetail {
  toEl: BlockGroup["el"];
  fromEl: BlockGroup["el"];
  dragEl: Block["el"];
}

export interface BlockMoveDetail extends MoveDetail {
  toEl: BlockGroup["el"];
  fromEl: BlockGroup["el"];
  dragEl: Block["el"];
  relatedEl: Block["el"];
}
