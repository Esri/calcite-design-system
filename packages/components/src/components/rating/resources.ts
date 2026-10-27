import { isTag } from "../resources";

export const CSS = {
  fieldSet: "fieldset",
  star: "star",
  hovered: "hovered",
  selected: "selected",
  average: "average",
  fraction: "fraction",
  numberAverage: "number--average",
  numberCount: "number--count",
  wrapper: "wrapper",
  visuallyHidden: "visually-hidden",
  partial: "partial",
};

const idPrefix = "calcite-ratings";

export const IDS = {
  validationMessage: "validationMessage",
  host: (id: any) => `${idPrefix}-${id}` as const,
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isRating = isTag("calcite-rating");
