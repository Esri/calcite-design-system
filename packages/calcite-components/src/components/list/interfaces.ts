import { DragDetail, MoveDetail } from "../../utils/sortableComponent";

export interface ListDragDetail extends DragDetail {
  toEl: HTMLCalciteListElement;
  fromEl: HTMLCalciteListElement;
  dragEl: HTMLCalciteListItemElement;
}

export interface ListMoveDetail extends MoveDetail {
  toEl: HTMLCalciteListElement;
  fromEl: HTMLCalciteListElement;
  dragEl: HTMLCalciteListItemElement;
  relatedEl: HTMLCalciteListItemElement;
}
