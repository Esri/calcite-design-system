import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  assistiveText: "assistive-text",
  calendarWrapper: "calendar-wrapper",
  clearButton: "clear-button",
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  endInput: "input--end",
  inputBorderTopColorOne: "border-top-color-one",
  inputContainer: "input-container",
  horizontalActionsContainer: "horizontal-actions-container",
  inputWrapper: "input-wrapper",
  input: "input",
  menu: "menu-container",
  toggleIcon: "toggle-icon",
  startInput: "input--start",
  verticalActionsContainer: "vertical-actions-container",
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

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isInputDatePicker = isTag("calcite-input-date-picker");
