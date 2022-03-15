import {
  Placement,
  ComputedPlacement as PopperComputedPlacement,
  Instance as Popper,
  createPopper as setupPopper,
  StrictModifiers,
  PositioningStrategy
} from "@popperjs/core";
import { getElementDir } from "./dom";

type PlacementRtl = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";
type VariationRtl =
  | "leading-leading"
  | "leading-trailing"
  | "trailing-leading"
  | "trailing-trailing"
  | "top-leading"
  | "top-trailing"
  | "bottom-leading"
  | "bottom-trailing"
  | "right-leading"
  | "right-trailing"
  | "left-leading"
  | "left-trailing";

export type ComputedPlacement = PopperComputedPlacement;
export type PopperPlacement = Placement | PlacementRtl | VariationRtl;

export type OverlayPositioning = PositioningStrategy;

export const popperPlacements: PopperPlacement[] = [
  "auto",
  "auto-start",
  "auto-end",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start",
  "leading-leading",
  "leading-trailing",
  "trailing-leading",
  "trailing-trailing",
  "top-leading",
  "top-trailing",
  "bottom-leading",
  "bottom-trailing",
  "right-leading",
  "right-trailing",
  "left-leading",
  "left-trailing"
];

export const popperFlipPlacements: ComputedPlacement[] = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end"
];

export type MenuPlacement = Extract<
  PopperPlacement,
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-leading"
  | "top-trailing"
  | "bottom-leading"
  | "bottom-trailing"
>;

export const defaultMenuPlacement: MenuPlacement = "bottom-leading";

export const popperMenuPlacements: MenuPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end",
  "top-leading",
  "top-trailing",
  "bottom-leading",
  "bottom-trailing"
];

export const popperMenuFlipPlacements: ComputedPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
];

export const CSS = {
  animation: "calcite-popper-anim",
  animationActive: "calcite-popper-anim--active"
};

export function getPlacement(el: HTMLElement, placement: PopperPlacement): Placement {
  const placements = ["left", "right"];
  const variations = ["start", "end"];

  if (getElementDir(el) === "rtl") {
    placements.reverse();
    variations.reverse();
  }

  return placement
    .replace(/-leading/gi, `-${variations[0]}`)
    .replace(/-trailing/gi, `-${variations[1]}`)
    .replace(/leading/gi, placements[0])
    .replace(/trailing/gi, placements[1]) as Placement;
}

export function createPopper({
  referenceEl,
  el,
  placement,
  overlayPositioning = "absolute",
  modifiers
}: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  overlayPositioning: PositioningStrategy;
  placement: PopperPlacement;
  referenceEl: HTMLElement;
}): Popper | null {
  if (!referenceEl) {
    return null;
  }

  return setupPopper(referenceEl, el, {
    strategy: overlayPositioning,
    placement: getPlacement(el, placement),
    modifiers
  });
}

export async function updatePopper({
  el,
  modifiers,
  placement: PopperPlacement,
  popper
}: {
  el: HTMLElement;
  modifiers: Partial<StrictModifiers>[];
  popper: Popper;
  placement: PopperPlacement;
}): Promise<void> {
  const placement = getPlacement(el, PopperPlacement);

  await popper.setOptions({
    modifiers,
    placement
  });
}

export function hypotenuse(sideA: number, sideB: number): number {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

const visiblePointerSize = 4;

export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));
