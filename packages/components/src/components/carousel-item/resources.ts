import type { CarouselItem } from "./carousel-item";

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
export function isCarouselItem(el: Element | null | EventTarget): el is CarouselItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-CAROUSEL-ITEM";
}
