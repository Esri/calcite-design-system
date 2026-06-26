import { IconName } from "../icon/interfaces";

export const CSS = {
  assistiveText: "assistive-text",
  calendarWrapper: "calendar-wrapper",
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  endInput: "input--end",
  horizontalArrowContainer: "horizontal-arrow-container",
  inputBorderTopColorOne: "border-top-color-one",
  inputContainer: "input-container",
  inputWrapper: "input-wrapper",
  input: "input",
  menu: "menu-container",
  toggleIcon: "toggle-icon",
  startInput: "input--start",
  verticalChevronContainer: "vertical-chevron-container",
  chevronIcon: "chevron-icon",
};

const idPrefix = "calcite-input-date-picker";

export const IDS = {
  validationMessage: "inputDatePickerValidationMessage",
  dialog: (id: string) => `date-picker-dialog--${id}`,
  placeholder: (id: string) => `${idPrefix}-placeholder-${id}`,
} as const;

export const POSITION = {
  start: "start",
  end: "end",
};

export const ICONS: Record<string, IconName> = {
  calendar: "calendar",
  chevronDown: "chevron-down",
  chevronUp: "chevron-up",
};
