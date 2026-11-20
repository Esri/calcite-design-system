import { isTag } from "../resources";

export const CSS = {
  dayWrapper: "day-wrapper",
  day: "day",
  text: "text",
  currentDay: "current-day",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isDatePickerDay = isTag("calcite-date-picker-day");
