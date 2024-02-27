import { DragDetail } from "../../utils/sortableComponent";

export interface ListDragDetail extends DragDetail {
  toEl: HTMLCalciteListElement;
  fromEl: HTMLCalciteListElement;
  dragEl: HTMLCalciteListItemElement;
}
