import { isTag } from "../resources";

export const CSS = {
  container: "container",
  selected: "selected",
};

const idPrefix = "calcite-carousel-item";

export const IDS = {
  host: (id: string) => `${idPrefix}-${id}` as const,
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isCarouselItem = isTag("calcite-carousel-item");
