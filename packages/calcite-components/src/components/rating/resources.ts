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

export const IDS = {
  validationMessage: "validationMessage",
  ratingId: (id: any) => `calcite-ratings-${id}` as const,
};
