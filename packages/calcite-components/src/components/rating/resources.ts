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

export const SLOTS = {
  labelContent: "label-content",
};
