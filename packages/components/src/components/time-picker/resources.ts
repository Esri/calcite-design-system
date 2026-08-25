import { isTag } from "../resources";
import { IconName } from "../icon/types";
import { Scale } from "../types";

export const CSS = {
  button: "button",
  buttonBottomLeft: "button--bottom-left",
  buttonBottomRight: "button--bottom-right",
  buttonFractionalSecondDown: "button--fractionalSecond-down",
  buttonFractionalSecondUp: "button--fractionalSecond-up",
  buttonHourDown: "button--hour-down",
  buttonHourUp: "button--hour-up",
  buttonMeridiemDown: "button--meridiem-down",
  buttonMeridiemUp: "button--meridiem-up",
  buttonMinuteDown: "button--minute-down",
  buttonMinuteUp: "button--minute-up",
  buttonSecondDown: "button--second-down",
  buttonSecondUp: "button--second-up",
  buttonTopLeft: "button--top-left",
  buttonTopRight: "button--top-right",
  column: "column",
  decimalSeparator: "decimal-separator",
  delimiter: "delimiter",
  fractionalSecond: "fractionalSecond",
  hour: "hour",
  hourSuffix: "hour-suffix",
  input: "input",
  inputFocus: "inputFocus",
  meridiem: "meridiem",
  minute: "minute",
  minuteSuffix: "minute-suffix",
  second: "second",
  secondSuffix: "second-suffix",
  showMeridiem: "show-meridiem",
  showSecond: "show-second",
  scale: (scale: Scale) => `scale-${scale}` as const,
  timePicker: "time-picker",
  meridiemStart: "meridiem--start",
};

export const ICONS: Record<string, IconName> = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTimePicker = isTag("calcite-time-picker");
