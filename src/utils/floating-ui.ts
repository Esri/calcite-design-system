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
  Middleware,
  VirtualElement
} from "@floating-ui/dom";
import { getElementDir } from "./dom";

export type ReferenceElement = VirtualElement | Element;

type UIType = "menu" | "tooltip" | "popover";
export type OverlayPositioning = Strategy;

/**
 * Placements that change based on element direction.
 *
 * These variation placements will automatically flip "left"/"right" depending on LTR/RTL direction.
 *
 * Floating-ui has no plans to offer this functionality out of the box at this time.
 *
 * see: https://github.com/floating-ui/floating-ui/issues/1563 and https://github.com/floating-ui/floating-ui/discussions/1549
 */
type VariationPlacement = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";

type AutoPlacement = "auto" | "auto-start" | "auto-end";

/**
 * Use "*-start" and "*-end" instead.
 *
 * There is no need for our "*-leading" and "*-trailing" values anymore since "*-start" and "*-end" are already flipped in RTL.
 *
 * @deprecated use expanded instead
 */
type DeprecatedPlacement =
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

export type LogicalPlacement = AutoPlacement | Placement | VariationPlacement | DeprecatedPlacement;
export type EffectivePlacement = Placement;

export const placements: LogicalPlacement[] = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start"
];

export const effectivePlacements: EffectivePlacement[] = [
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

export const menuPlacements: MenuPlacement[] = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"];

export const menuEffectivePlacements: EffectivePlacement[] = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
];

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
  open: boolean;

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

export function filterComputedPlacements(placements: string[], el: HTMLElement): EffectivePlacement[] {
  const filteredPlacements = placements.filter((placement: EffectivePlacement) =>
    effectivePlacements.includes(placement)
  ) as EffectivePlacement[];

  if (filteredPlacements.length !== placements.length) {
    console.warn(
      `${el.tagName}: Invalid value found in: flipPlacements. Try any of these: ${effectivePlacements
        .map((placement) => `"${placement}"`)
        .join(", ")
        .trim()}`,
      { el }
    );
  }

  return filteredPlacements;
}

/*
In floating-ui, "*-start" and "*-end" are already flipped in RTL.
There is no need for our "*-leading" and "*-trailing" values anymore.
https://github.com/floating-ui/floating-ui/issues/1530
https://github.com/floating-ui/floating-ui/issues/1563
*/
export function getEffectivePlacement(floatingEl: HTMLElement, placement: LogicalPlacement): EffectivePlacement {
  const placements = ["left", "right"];

  if (getElementDir(floatingEl) === "rtl") {
    placements.reverse();
  }

  return placement
    .replace(/-leading/gi, "-start")
    .replace(/-trailing/gi, "-end")
    .replace(/leading/gi, placements[0])
    .replace(/trailing/gi, placements[1]) as EffectivePlacement;
}

/**
 * Positions the floating element relative to the reference element.
 *
 * @param root0
 * @param root0.referenceEl
 * @param root0.floatingEl
 * @param root0.overlayPositioning
 * @param root0.placement
 * @param root0.disableFlip
 * @param root0.flipPlacements
 * @param root0.offsetDistance
 * @param root0.offsetSkidding
 * @param root0.arrowEl
 * @param root0.type
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
  referenceEl: ReferenceElement;
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
    placement: effectivePlacement,
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
  const visibility = referenceHidden ? "hidden" : null;
  const pointerEvents = visibility ? "none" : null;

  floatingEl.setAttribute("data-placement", effectivePlacement);

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
 *
 * @param component
 * @param referenceEl
 * @param floatingEl
 */
export function connectFloatingUI(
  component: FloatingUIComponent,
  referenceEl: ReferenceElement,
  floatingEl: HTMLElement
): void {
  if (!floatingEl || !referenceEl) {
    return;
  }

  disconnectFloatingUI(component, referenceEl, floatingEl);

  cleanupMap.set(
    component,
    autoUpdate(referenceEl, floatingEl, () => {
      if (component.open) {
        component.reposition();
      }
    })
  );
}

/**
 * Helper to tear down floating element interactions on disconnectedCallback.
 *
 * @param component
 * @param referenceEl
 * @param floatingEl
 */
export function disconnectFloatingUI(
  component: FloatingUIComponent,
  referenceEl: ReferenceElement,
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

const visiblePointerSize = 4;

/**
 * Default offset the position of the floating element away from the reference element.
 *
 * @default 6
 */
export const defaultOffsetDistance = Math.ceil(Math.hypot(visiblePointerSize, visiblePointerSize));
