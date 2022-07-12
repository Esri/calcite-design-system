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

  if (status === "idle") {
    const idleText = intlDragHandleStart
      ? intlDragHandleStart
      : `${item.label} ,press space and use arrow keys to re-order content. Current position ${position} of ${total}.`;

    return idleText;
  } else if (status === "active") {
    const activeText = intlDragHandleActivated
      ? intlDragHandleActivated
      : `Reordering ${item.label} ,current position ${position} of ${total}.`;

    return activeText;
  } else if (status === "change") {
    const changeText = intlDragHandleNewPosition
      ? intlDragHandleNewPosition
      : `${item.label} , new position ${position} of ${total}. Press space to confirm.`;

    return changeText;
  } else {
    const commitText = intlDragHandleCurrentPosition
      ? intlDragHandleCurrentPosition
      : `${item.label} ,current position ${position} of ${total}.`;

    return commitText;
  }
}

export function getHandleAndItemElement(event: KeyboardEvent | FocusEvent): {
  handle: HTMLCalciteHandleElement;
  item: HTMLCalciteValueListItemElement;
} {
  const handle = event
    .composedPath()
    .find((item: HTMLElement) => item.dataset?.jsHandle !== undefined) as HTMLCalciteHandleElement;

  const item = event
    .composedPath()
    .find(
      (item: HTMLElement) => item.tagName?.toLowerCase() === "calcite-value-list-item"
    ) as HTMLCalciteValueListItemElement;

  return { handle, item };
}
