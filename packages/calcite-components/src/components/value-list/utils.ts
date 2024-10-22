import { getItemIndex } from "../pick-list/shared-list-logic";
import type { ValueListItem } from "../value-list-item/value-list-item";
import type { Handle } from "../handle/handle";
import { DragStatus } from "./interfaces";
import { ValueList } from "./value-list";

export function getScreenReaderText(
  item: ValueListItem["el"],
  status: DragStatus,
  valueList: ValueList<ValueListItem["el"]>,
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
  handle: Handle["el"];
  item: ValueListItem["el"];
} {
  const handle = event
    .composedPath()
    .find((item: HTMLElement): item is Handle["el"] => item.dataset?.jsHandle !== undefined);

  const item = event
    .composedPath()
    .find(
      (item: HTMLElement): item is ValueListItem["el"] => item.tagName?.toLowerCase() === "calcite-value-list-item",
    );

  return { handle, item };
}

export function replacePlaceholders(text: string, label: string, position: number, total: number): string {
  const replacePosition = text.replace("{position}", position.toString());
  const replaceLabel = replacePosition.replace("{itemLabel}", label);
  return replaceLabel.replace("{total}", total.toString());
}
