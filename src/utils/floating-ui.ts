import {
  computePosition,
  Placement,
  Strategy,
  arrow,
  flip,
  shift,
  hide,
  offset,
  autoPlacement,
  getScrollParents,
  Middleware
} from "@floating-ui/dom";
import { getElementDir } from "./dom";

type UIType = "menu" | "tooltip" | "popover";
export type OverlayPositioning = Strategy;

type VariationPlacement =
  | "leading-start"
  | "leading"
  | "leading-end"
  | "trailing-end"
  | "trailing"
  | "trailing-start"
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

export type LogicalPlacement = "auto" | Placement | VariationPlacement;
export type EffectivePlacement = Placement;

export interface FloatingUIComponent {
  /**
   * Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value.
   */
  overlayPositioning: OverlayPositioning;

  /**
   * Determines where the floating element will be positioned relative to the reference element.
   */
  placement: LogicalPlacement;

  /**
   * Updates the position of the component.
   */
  reposition(): Promise<void>;
}

export const FloatingCSS = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};

function getPlacement(floatingEl: HTMLElement, placement: LogicalPlacement): EffectivePlacement {
  if (placement === "auto") {
    return undefined;
  }

  const placements = ["left", "right"];
  const variations = ["start", "end"];

  if (getElementDir(floatingEl) === "rtl") {
    placements.reverse();
    variations.reverse();
  }

  return placement
    .replace(/-leading/gi, `-${variations[0]}`)
    .replace(/-trailing/gi, `-${variations[1]}`)
    .replace(/leading/gi, placements[0])
    .replace(/trailing/gi, placements[1]) as EffectivePlacement;
}

function getMiddleware({
  placement,
  disableFlip,
  flipPlacements,
  offsetDistance,
  offsetSkidding,
  arrowEl,
  type
}: {
  placement: LogicalPlacement;
  disableFlip?: boolean;
  flipPlacements?: EffectivePlacement[];
  offsetDistance?: number;
  offsetSkidding?: number;
  arrowEl?: HTMLElement;
  type: UIType;
}): Middleware[] {
  const defaultMiddleware = [shift(), hide()];

  if (type === "menu") {
    return [
      ...defaultMiddleware,
      flip({ fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"] })
    ];
  }

  if (type === "popover") {
    const middleware: Middleware[] = [...defaultMiddleware];
    if (placement === "auto") {
      middleware.push(autoPlacement());
    } else {
      if (!disableFlip) {
        middleware.push(flip({ fallbackPlacements: flipPlacements }));
      }
    }

    if (arrowEl) {
      middleware.push(
        arrow({
          element: arrowEl
        })
      );
    }

    middleware.push(
      offset({
        mainAxis: typeof offsetDistance === "number" ? offsetDistance : 0,
        crossAxis: typeof offsetSkidding === "number" ? offsetSkidding : 0
      })
    );

    return middleware;
  }

  return [];
}

/**
 * Positions the floating element relative to the reference element.
 */
export async function positionFloatingUI({
  referenceEl,
  floatingEl,
  overlayPositioning = "absolute",
  placement,
  disableFlip,
  flipPlacements,
  offsetDistance,
  offsetSkidding,
  arrowEl,
  type
}: {
  referenceEl: HTMLElement;
  floatingEl: HTMLElement;
  overlayPositioning: Strategy;
  placement: LogicalPlacement;
  disableFlip?: boolean;
  flipPlacements?: EffectivePlacement[];
  offsetDistance?: number;
  offsetSkidding?: number;
  arrowEl?: HTMLElement;
  type: UIType;
}): Promise<void> {
  if (!referenceEl || !floatingEl) {
    return null;
  }

  const middleware = getMiddleware({
    placement,
    disableFlip,
    flipPlacements,
    offsetDistance,
    offsetSkidding,
    arrowEl,
    type
  });
  const {
    x,
    y,
    placement: computedPlacement,
    strategy: position,
    middlewareData
  } = await computePosition(referenceEl, floatingEl, {
    strategy: overlayPositioning,
    placement: getPlacement(floatingEl, placement),
    middleware
  });

  if (middlewareData.arrow) {
    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : ""
    });
  }

  const referenceHidden = middlewareData.hide?.referenceHidden;
  const visibility = referenceHidden ? "hidden" : null;

  floatingEl.setAttribute("data-placement", computedPlacement);

  const transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;

  Object.assign(floatingEl.style, {
    visibility,
    position,
    top: "0",
    left: "0",
    transform
  });
}

const floatingElMap = new WeakMap<HTMLElement, (Element | Window | VisualViewport)[]>();

/**
 * Helper to set up floating element interactions on connectedCallback.
 */
export function connectFloatingUI(component: FloatingUIComponent, el: HTMLElement): void {
  if (!el) {
    return;
  }

  disconnectFloatingUI(component, el);
  const { reposition } = component;
  const boundReposition = reposition.bind(component);
  const scrollParents = getScrollParents(el);
  floatingElMap.set(el, scrollParents);

  scrollParents.forEach((el) => {
    el.addEventListener("scroll", boundReposition);
    el.addEventListener("resize", boundReposition);
  });
}

/**
 * Helper to tear down floating element interactions on disconnectedCallback.
 */
export function disconnectFloatingUI(component: FloatingUIComponent, el: HTMLElement): void {
  if (!el) {
    return;
  }

  const { reposition } = component;
  const boundReposition = reposition.bind(component);

  floatingElMap.get(el)?.forEach((el) => {
    el.removeEventListener("scroll", boundReposition);
    el.removeEventListener("resize", boundReposition);
  });

  floatingElMap.delete(el);
}

function hypotenuse(sideA: number, sideB: number): number {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

const visiblePointerSize = 4;

/**
 * Default offset the position of the floating element away from the reference element.
 * @default 6
 */
export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));
