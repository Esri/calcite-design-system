import { getItemIndex } from "../pick-list/shared-list-logic";
import { DragStatus } from "./interfaces";

export function getScreenReaderText(item: HTMLCalciteValueListItemElement, status: DragStatus): string {
  const { items } = this;
  const total = items.length;
  const position = getItemIndex(this, item) + 1;

  switch (status) {
    case "start":
      return this.intlDragHandleStart
        ? this.intlDragHandleStart
        : `${item.title} item .press space and use arrow keys to re-order content. current position ${position} of ${total}`;
    case "activated":
      return this.intlDragHandleActivated
        ? this.intlDragHandleActivated
        : `Reordering ${item.title} .current position ${position} of ${total}`;
    case "newPosition":
      return this.intlDragHandleNewPosition
        ? this.intlDragHandleNewPosition
        : `${item.title} , new position ${position} of ${total}. press space to confirm`;
    case "currentPosition":
      return this.intlDragHandleCurrentPosition
        ? this.intlDragHandleCurrentPosition
        : `${item.title} ,current position ${position} of ${total}`;
    default:
      break;
  }
}
