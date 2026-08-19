import type { DatePicker } from "./date-picker";

export const HEADING_LEVEL = 2;

export const DATE_PICKER_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: "full" };

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDatePicker(el: Element | null | EventTarget): el is DatePicker["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DATE-PICKER";
}
