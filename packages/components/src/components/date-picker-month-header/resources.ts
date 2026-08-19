import type { DatePickerMonthHeader } from "./date-picker-month-header";

export const CSS = {
  header: "header",
  chevron: "chevron",
  chevronContainer: "chevron-container",
  chevronContainerLeft: "chevron-container--left",
  chevronContainerRight: "chevron-container--right",
  monthYearContainer: "month-year-container",
  monthPicker: "month-select",
  rangeCalendar: "range-calendar",
  suffix: "suffix",
  yearContainer: "year-container",
  year: "year",
};

export const ICON = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
} as const;

export const ICON_WIDTH_M = 16;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDatePickerMonthHeader(el: Element | null | EventTarget): el is DatePickerMonthHeader["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DATE-PICKER-MONTH-HEADER";
}
