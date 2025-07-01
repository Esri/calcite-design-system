export const CSS = {
  assistiveText: "assistive-text",
  calendarWrapper: "calendar-wrapper",
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  horizontalArrowContainer: "horizontal-arrow-container",
  inputBorderTopColorOne: "border-top-color-one",
  inputContainer: "input-container",
  inputNoBottomBorder: "input--no-bottom-border",
  inputNoRightBorder: "input--no-right-border",
  inputNoTopBorder: "input--no-top-border",
  inputNoLeftBorder: "input--no-left-border",
  inputWrapper: "input-wrapper",
  input: "input",
  menu: "menu-container",
  toggleIcon: "toggle-icon",
  verticalChevronContainer: "vertical-chevron-container",
  chevronIcon: "chevron-icon",
};

export const IDS = {
  validationMessage: "inputDatePickerValidationMessage",
  dialogId: (id: string) => `date-picker-dialog--${id}` as const,
  placeholderId: (id: string) => `calcite-input-date-picker-placeholder-${id}` as const,
};

export const POSITION = {
  start: "start",
  end: "end",
};

export const ICONS = {
  calendar: "calendar",
  chevronDown: "chevron-down",
  chevronUp: "chevron-up",
};
