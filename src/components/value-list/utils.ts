import { getItemIndex } from "../pick-list/shared-list-logic";
import { DragStatus } from "./interfaces";
import { ValueList } from "./value-list";

export function getScreenReaderText(
  item: HTMLCalciteValueListItemElement,
  status: DragStatus,
  valueList: ValueList<HTMLCalciteValueListItemElement>
): string {
  const {
    items,
    intlDragHandleStart,
    intlDragHandleActivated,
    intlDragHandleNewPosition,
    intlDragHandleCurrentPosition
  } = valueList;
  const total = items.length;
  const position = getItemIndex(valueList, item) + 1;
  switch (status) {
    case "start":
      return intlDragHandleStart
        ? intlDragHandleStart
        : `${item.label} ,press space and use arrow keys to re-order content. current position ${position} of ${total}`;
    case "activated":
      return intlDragHandleActivated
        ? intlDragHandleActivated
        : `Reordering ${item.label} ,current position ${position} of ${total}`;
    case "newPosition":
      return intlDragHandleNewPosition
        ? intlDragHandleNewPosition
        : `${item.label} , new position ${position} of ${total}. press space to confirm`;
    case "currentPosition":
      return intlDragHandleCurrentPosition
        ? intlDragHandleCurrentPosition
        : `${item.label} ,current position ${position} of ${total}`;
    default:
      break;
  }
}

export function getHandleAndItemElement(event: KeyboardEvent | FocusEvent): {
  handleElement: HTMLCalciteHandleElement;
  item: HTMLCalciteValueListItemElement;
} {
  const handleElement = event
    .composedPath()
    .find((item: HTMLElement) => item.dataset?.jsHandle !== undefined) as HTMLCalciteHandleElement;

  const item = event
    .composedPath()
    .find(
      (item: HTMLElement) => item.tagName?.toLowerCase() === "calcite-value-list-item"
    ) as HTMLCalciteValueListItemElement;

  return { handleElement, item };
}
