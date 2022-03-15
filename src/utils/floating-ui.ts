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
  autoUpdate,
  Middleware
} from "@floating-ui/dom";
import { getElementDir } from "./dom";

type UIType = "menu" | "tooltip" | "popover";
export type OverlayPositioning = Strategy;

type VariationPlacement = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";

type AutoPlacement = "auto" | "auto-start" | "auto-end";
export type LogicalPlacement = AutoPlacement | Placement | VariationPlacement;
export type EffectivePlacement = Placement;

export const placements: LogicalPlacement[] = [
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
  "trailing-start"
];

export const menuPlacements: MenuPlacement[] = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"];

export const flipPlacements: EffectivePlacement[] = [
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
  LogicalPlacement,
  "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end"
>;

export const defaultMenuPlacement: MenuPlacement = "bottom-start";

export interface FloatingUIComponent {
  /**
   * Whether the component is opened.
   */
  active: boolean;

  /**
   * Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value.
   */
  overlayPositioning: OverlayPositioning;

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   *
   * Possible values: "auto", "auto-start", "auto-end", "top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end", "leading-start", "leading", "leading-end", "trailing-end", "trailing",  or "trailing-start".
   *
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

  if (type === "popover" || type === "tooltip") {
    const middleware: Middleware[] = [
      ...defaultMiddleware,
      offset({
        mainAxis: typeof offsetDistance === "number" ? offsetDistance : 0,
        crossAxis: typeof offsetSkidding === "number" ? offsetSkidding : 0
      })
    ];

    if (placement === "auto" || placement === "auto-start" || placement === "auto-end") {
      middleware.push(
        autoPlacement({ alignment: placement === "auto-start" ? "start" : placement === "auto-end" ? "end" : null })
      );
    } else if (!disableFlip) {
      middleware.push(flip(flipPlacements ? { fallbackPlacements: flipPlacements } : {}));
    }

    if (arrowEl) {
      middleware.push(
        arrow({
          element: arrowEl
        })
      );
    }

    return middleware;
  }

  return [];
}

export function getEffectivePlacement(floatingEl: HTMLElement, placement: LogicalPlacement): EffectivePlacement {
  const placements = ["left", "right"];

  if (getElementDir(floatingEl) === "rtl") {
    placements.reverse();
  }

  return placement.replace(/leading/gi, placements[0]).replace(/trailing/gi, placements[1]) as EffectivePlacement;
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

  const {
    x,
    y,
    placement: computedPlacement,
    strategy: position,
    middlewareData
  } = await computePosition(referenceEl, floatingEl, {
    strategy: overlayPositioning,
    placement:
      placement === "auto" || placement === "auto-start" || placement === "auto-end"
        ? undefined
        : getEffectivePlacement(floatingEl, placement),
    middleware: getMiddleware({
      placement,
      disableFlip,
      flipPlacements,
      offsetDistance,
      offsetSkidding,
      arrowEl,
      type
    })
  });

  if (middlewareData?.arrow) {
    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : ""
    });
  }

  const referenceHidden = middlewareData?.hide?.referenceHidden;
  const escaped = middlewareData?.hide?.escaped;
  const visibility = referenceHidden || escaped ? "hidden" : null;
  const pointerEvents = visibility ? "none" : null;

  floatingEl.setAttribute("data-placement", computedPlacement);

  const transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;

  Object.assign(floatingEl.style, {
    visibility,
    pointerEvents,
    position,
    top: "0",
    left: "0",
    transform
  });
}

const cleanupMap = new WeakMap<FloatingUIComponent, () => void>();

/**
 * Helper to set up floating element interactions on connectedCallback.
 */
export function connectFloatingUI(
  component: FloatingUIComponent,
  referenceEl: HTMLElement,
  floatingEl: HTMLElement
): void {
  if (!floatingEl || !referenceEl) {
    return;
  }

  disconnectFloatingUI(component, referenceEl, floatingEl);

  cleanupMap.set(
    component,
    autoUpdate(referenceEl, floatingEl, () => {
      if (component.active) {
        component.reposition();
      }
    })
  );
}

/**
 * Helper to tear down floating element interactions on disconnectedCallback.
 */
export function disconnectFloatingUI(
  component: FloatingUIComponent,
  referenceEl: HTMLElement,
  floatingEl: HTMLElement
): void {
  if (!floatingEl || !referenceEl) {
    return;
  }

  const cleanup = cleanupMap.get(component);

  if (cleanup) {
    cleanup();
  }

  cleanupMap.delete(component);
}

export function hypotenuse(sideA: number, sideB: number): number {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

const visiblePointerSize = 4;

/**
 * Default offset the position of the floating element away from the reference element.
 * @default 6
 */
export const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));
