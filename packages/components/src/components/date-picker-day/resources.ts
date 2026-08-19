import type { DatePickerDay } from "./date-picker-day";

export const CSS = {
  dayWrapper: "day-wrapper",
  day: "day",
  text: "text",
  currentDay: "current-day",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isDatePickerDay(el: Element | null | EventTarget): el is DatePickerDay["el"] {
  return (el as Element | null)?.tagName === "CALCITE-DATE-PICKER-DAY";
}
