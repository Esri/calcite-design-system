import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  clearButton: "clear-button",
  clockIcon: "clock-icon",
  container: "container",
  contentContainer: "content-container",
  decimalSeparator: "decimal-separator",
  delimiter: "delimiter",
  empty: "empty",
  fractionalSecond: "fractional-second",
  hour: "hour",
  hourSuffix: "hour-suffix",
  input: "input",
  inputContainer: "input-container",
  inputContainerHidden: "input-container--hidden",
  meridiem: "meridiem",
  minute: "minute",
  minuteSuffix: "minute-suffix",
  placeholder: "placeholder",
  readOnly: "read-only",
  second: "second",
  secondSuffix: "second-suffix",
  toggleIcon: "toggle-icon",
};

export const IDS = {
  inputContainer: "inputContainer",
  validationMessage: "inputTimePickerValidationMessage",
};

export const ICONS: Record<string, IconName> = {
  clock: "clock",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isInputTimePicker = isTag("calcite-input-time-picker");
