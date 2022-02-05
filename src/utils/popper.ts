import {
  Placement,
  Instance as Popper,
  createPopper as setupPopper,
  StrictModifiers,
  PositioningStrategy
} from "@popperjs/core";
import { getElementDir, queryElementRoots } from "./dom";

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

export type PopperPlacement = Placement | PlacementRtl | VariationRtl;

export type OverlayPositioning = PositioningStrategy;

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

export interface ReferenceElementComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
   */
  referenceElement?: HTMLElement | string;

  /**
   * Reference HTMLElement used to position this component according to the placement property.
   */
  effectiveReferenceElement: HTMLElement;
}

export function setEffectiveReferenceElement(component: ReferenceElementComponent): void {
  const { el, referenceElement } = component;

  component.effectiveReferenceElement =
    (typeof referenceElement === "string" ? queryElementRoots(el, { id: referenceElement }) : referenceElement) || null;

  if (referenceElement && !component.effectiveReferenceElement) {
    console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
      el
    });
  }
}
