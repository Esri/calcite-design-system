import { getItemIndex } from "../pick-list/shared-list-logic";
import { DragStatus } from "./interfaces";
import { ValueList } from "./value-list";

export function getScreenReaderText(
  item: HTMLCalciteValueListItemElement,
  status: DragStatus,
  valueList: ValueList<HTMLCalciteValueListItemElement>
): string {
  const { items, messages } = valueList;

  const total = items.length;
  const position = getItemIndex(valueList, item) + 1;
  const template =
    status === "idle"
      ? messages.dragHandleIdle
      : status === "active"
      ? messages.dragHandleActive
      : status === "change"
      ? messages.dragHandleChange
      : messages.dragHandleCommit;

  return replacePlaceholders(template, item.label, position, total);
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
  const replacePosition = text.replace("{position}", position.toString());
  const replaceLabel = replacePosition.replace("{itemLabel}", label);
  return replaceLabel.replace("{total}", total.toString());
}
