import type { Rating } from "./rating";

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
export function isRating(el: Element | null | EventTarget): el is Rating["el"] {
  return (el as Element | null)?.tagName === "CALCITE-RATING";
}
