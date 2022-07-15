import { getItemIndex } from "../pick-list/shared-list-logic";
import { DragStatus } from "./interfaces";
import { ValueList } from "./value-list";

export function getScreenReaderText(
  item: HTMLCalciteValueListItemElement,
  status: DragStatus,
  valueList: ValueList<HTMLCalciteValueListItemElement>
): string {
  const { items, intlDragHandleIdle, intlDragHandleActive, intlDragHandleChange, intlDragHandleCommit } = valueList;

  const total = items.length;
  const position = getItemIndex(valueList, item) + 1;

  if (status === "idle") {
    const idleText = intlDragHandleIdle
      ? replacePlaceholders(intlDragHandleIdle, item.label, position, total)
      : `${item.label}, press space and use arrow keys to reorder content. Current position ${position} of ${total}.`;

    return idleText;
  } else if (status === "active") {
    const activeText = intlDragHandleActive
      ? replacePlaceholders(intlDragHandleActive, item.label, position, total)
      : `Reordering ${item.label}, current position ${position} of ${total}.`;

    return activeText;
  } else if (status === "change") {
    const changeText = intlDragHandleChange
      ? replacePlaceholders(intlDragHandleChange, item.label, position, total)
      : `${item.label}, new position ${position} of ${total}. Press space to confirm.`;

    return changeText;
  } else {
    const commitText = intlDragHandleCommit
      ? replacePlaceholders(intlDragHandleCommit, item.label, position, total)
      : `${item.label}, current position ${position} of ${total}.`;

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

export function replacePlaceholders(text: string, label: string, position: number, total: number): string {
  const replacePosition = text.replace("${position}", position.toString());
  const replaceLabel = replacePosition.replace("${item.label}", label);
  return replaceLabel.replace("${total}", total.toString());
}
