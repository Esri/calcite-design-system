import { isTag } from "../resources";

export const HEADING_LEVEL = 2;

export const DATE_PICKER_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: "full" };

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isDatePicker = isTag("calcite-date-picker");
