import { isTag } from "../resources";

export const CSS = {
  calendar: "calendar",
  calendarContainer: "calendar-container",
  calendarStart: "calendar--start",
  currentDay: "current-day",
  dayContainer: "day-container",
  month: "month",
  noncurrent: "noncurrent",
  weekDays: "week-days",
  weekHeader: "week-header",
  weekHeaderContainer: "week-header-container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isDatePickerMonth = isTag("calcite-date-picker-month");
