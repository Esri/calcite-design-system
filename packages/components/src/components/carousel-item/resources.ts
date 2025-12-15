export const CSS = {
  container: "container",
  selected: "selected",
};

const idPrefix = "calcite-carousel-item";

export const IDS = {
  host: (id: string) => `${idPrefix}-${id}` as const,
};
