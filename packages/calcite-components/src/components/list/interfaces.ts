import { DragDetail } from "../../utils/sortableComponent";

export type ListDragDetail = DragDetail & {
  toEl: HTMLCalciteListElement;
  fromEl: HTMLCalciteListElement;
  dragEl: HTMLCalciteListItemElement;
};
