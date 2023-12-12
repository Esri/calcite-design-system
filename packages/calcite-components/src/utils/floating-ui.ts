import {
  arrow,
  autoPlacement,
  autoUpdate,
  computePosition,
  flip,
  hide,
  Middleware,
  offset,
  Placement,
  platform,
  shift,
  Side,
  Strategy,
  VirtualElement,
} from "@floating-ui/dom";
import { Build } from "@stencil/core";
import { debounce, DebouncedFunc } from "lodash-es";
import { getElementDir } from "./dom";
import { Layout } from "../components/interfaces";
import { offsetParent } from "composed-offset-position";

(function setUpFloatingUiForShadowDomPositioning(): void {
  if (Build.isBrowser) {
    const originalGetOffsetParent = platform.getOffsetParent;
    platform.getOffsetParent = (element: Element) => originalGetOffsetParent(element, offsetParent);
  }
})();

function roundByDPR(value: number): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}

/**
 * Positions the floating element relative to the reference element.
 *
 * **Note:** exported for testing purposes only
 *
 * @param root0
 * @param root0.referenceEl
 * @param root0.floatingEl
 * @param root0.overlayPositioning
 * @param root0.placement
 * @param root0.flipDisabled
 * @param root0.flipPlacements
 * @param root0.offsetDistance
 * @param root0.offsetSkidding
 * @param root0.arrowEl
 * @param root0.type
 * @param component
 * @param root0.referenceEl.referenceEl
 * @param root0.referenceEl.floatingEl
 * @param root0.referenceEl.overlayPositioning
 * @param root0.referenceEl.placement
 * @param root0.referenceEl.flipDisabled
 * @param root0.referenceEl.flipPlacements
 * @param root0.referenceEl.offsetDistance
 * @param root0.referenceEl.offsetSkidding
 * @param root0.referenceEl.arrowEl
 * @param root0.referenceEl.type
 * @param component.referenceEl
 * @param component.floatingEl
 * @param component.overlayPositioning
 * @param component.placement
 * @param component.flipDisabled
 * @param component.flipPlacements
 * @param component.offsetDistance
 * @param component.offsetSkidding
 * @param component.arrowEl
 * @param component.type
 */
export const positionFloatingUI =
  /* we export arrow function to allow us to spy on it during testing */
  async (
    component: FloatingUIComponent,
    {
      referenceEl,
      floatingEl,
      overlayPositioning = "absolute",
      placement,
      flipDisabled,
      flipPlacements,
      offsetDistance,
      offsetSkidding,
      arrowEl,
      type,
    }: {
      referenceEl: ReferenceElement;
      floatingEl: HTMLElement;
      overlayPositioning: Strategy;
      placement: LogicalPlacement;
      flipDisabled?: boolean;
      flipPlacements?: EffectivePlacement[];
      offsetDistance?: number;
      offsetSkidding?: number;
      arrowEl?: SVGElement;
      type: UIType;
    }
  ): Promise<void> => {
    if (!referenceEl || !floatingEl) {
      return null;
    }

    const {
      x,
      y,
      placement: effectivePlacement,
      strategy: position,
      middlewareData,
    } = await computePosition(referenceEl, floatingEl, {
      strategy: overlayPositioning,
      placement:
        placement === "auto" || placement === "auto-start" || placement === "auto-end"
          ? undefined
          : getEffectivePlacement(floatingEl, placement),
      middleware: getMiddleware({
        placement,
        flipDisabled,
        flipPlacements,
        offsetDistance,
        offsetSkidding,
        arrowEl,
        type,
      }),
    });

    if (arrowEl && middlewareData.arrow) {
      const { x, y } = middlewareData.arrow;
      const side = effectivePlacement.split("-")[0] as Side;
      const alignment = x != null ? "left" : "top";
      const transform = ARROW_CSS_TRANSFORM[side];
      const reset = { left: "", top: "", bottom: "", right: "" };

      if ("floatingLayout" in component) {
        component.floatingLayout = side === "left" || side === "right" ? "horizontal" : "vertical";
      }

      Object.assign(arrowEl.style, {
        ...reset,
        [alignment]: `${alignment == "left" ? x : y}px`,
        [side]: "100%",
        transform,
      });
    }

    const referenceHidden = middlewareData.hide?.referenceHidden;
    const visibility = referenceHidden ? "hidden" : null;
    const pointerEvents = visibility ? "none" : null;

    floatingEl.setAttribute(placementDataAttribute, effectivePlacement);

    const { open } = component;

    Object.assign(floatingEl.style, {
      visibility,
      pointerEvents,
      position,
      transform: open ? `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)` : "",
      width: "max-content",
      top: 0,
      left: 0,
    });
  };

/**
 * Exported for testing purposes only
 */
export const placementDataAttribute = "data-placement";

/**
 * Exported for testing purposes only
 */
export const repositionDebounceTimeout = 100;

export type ReferenceElement = VirtualElement | Element;

type UIType = "menu" | "tooltip" | "popover";
export type OverlayPositioning = Strategy;

/**
 * Variation Placements change based on element direction.
 *
 * These variation placements will automatically flip "left"/"right" depending on LTR/RTL direction.
 *
 * Floating-ui has no plans to offer this functionality out of the box at this time.
 *
 * see: https://github.com/floating-ui/floating-ui/issues/1563 and https://github.com/floating-ui/floating-ui/discussions/1549
 */

export type EffectivePlacement = Placement;

export const placements = [
  // auto placements
  "auto",
  "auto-start",
  "auto-end",
  // placements
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
  // variation placements
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start",
] as const;

export type LogicalPlacement = (typeof placements)[number];

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
  "left-end",
];

export const menuPlacements: MenuPlacement[] = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"];

export const menuEffectivePlacements: EffectivePlacement[] = [
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end",
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
  "left-end",
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
   *
   * @param delayed – (internal) when true, it will reposition the component after a delay. the default is false. This is useful for components that have multiple watched properties that schedule repositioning.
   */
  reposition(delayed?: boolean): Promise<void>;

  /**
   * Used to store the effective floating layout for components that use arrows.
   *
   * This is an internal property and should:
   *
   * - only be used for components that support arrows
   * - use the `@State` decorator
   * - be initialized to "vertical"
   *
   * Possible values: "vertical" or "horizontal".
   *
   * See [FloatingArrow](https://github.com/Esri/calcite-design-system/blob/main/src/components/functional/FloatingArrow.tsx)
   */
  floatingLayout?: FloatingLayout;
}

export type FloatingLayout = Extract<Layout, "vertical" | "horizontal">;

export const FloatingCSS = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active",
};

function getMiddleware({
  placement,
  flipDisabled,
  flipPlacements,
  offsetDistance,
  offsetSkidding,
  arrowEl,
  type,
}: {
  placement: LogicalPlacement;
  flipDisabled?: boolean;
  flipPlacements?: EffectivePlacement[];
  offsetDistance?: number;
  offsetSkidding?: number;
  arrowEl?: SVGElement;
  type: UIType;
}): Middleware[] {
  const defaultMiddleware = [shift(), hide()];

  if (type === "menu") {
    return [
      ...defaultMiddleware,
      flip({
        fallbackPlacements: flipPlacements || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"],
      }),
    ];
  }

  if (type === "popover" || type === "tooltip") {
    const middleware: Middleware[] = [
      ...defaultMiddleware,
      offset({
        mainAxis: typeof offsetDistance === "number" ? offsetDistance : 0,
        crossAxis: typeof offsetSkidding === "number" ? offsetSkidding : 0,
      }),
    ];

    if (placement === "auto" || placement === "auto-start" || placement === "auto-end") {
      middleware.push(
        autoPlacement({ alignment: placement === "auto-start" ? "start" : placement === "auto-end" ? "end" : null })
      );
    } else if (!flipDisabled) {
      middleware.push(flip(flipPlacements ? { fallbackPlacements: flipPlacements } : {}));
    }

    if (arrowEl) {
      middleware.push(
        arrow({
          element: arrowEl,
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

export function getEffectivePlacement(floatingEl: HTMLElement, placement: LogicalPlacement): EffectivePlacement {
  const placements = ["left", "right"];

  if (getElementDir(floatingEl) === "rtl") {
    placements.reverse();
  }

  return placement.replace(/leading/gi, placements[0]).replace(/trailing/gi, placements[1]) as EffectivePlacement;
}

/**
 * Convenience function to manage `reposition` calls for FloatingUIComponents that use `positionFloatingUI.
 *
 * Note: this is not needed for components that use `calcite-popover`.
 *
 * @param component - A floating-ui component.
 * @param options - Reposition parameters.
 * @param options.referenceEl - The `referenceElement` used to position the component according to its `placement` value.
 * @param options.floatingEl - The `floatingElement` containing the floating ui.
 * @param options.overlayPositioning - type of positioning to use for the overlaid content.
 * @param options.placement - Determines where the component will be positioned relative to the `referenceElement`.
 * @param options.flipDisabled - Prevents flipping the component's placement when overlapping its `referenceElement`.
 * @param options.flipPlacements - Defines the available placements that can be used when a flip occurs.
 * @param options.offsetDistance - Offsets the position of the popover away from the `referenceElement`.
 * @param options.offsetSkidding - Offsets the position of the component along the `referenceElement`.
 * @param options.arrowEl - A customizable arrow element.
 * @param options.type - The type of floating UI.
 * @param delayed - Reposition the component after a delay.
 * @returns {Promise<void>}
 */
export async function reposition(
  component: FloatingUIComponent,
  options: Parameters<typeof positionFloatingUI>[1],
  delayed = false
): Promise<void> {
  if (!component.open) {
    return;
  }

  const positionFunction = delayed ? getDebouncedReposition(component) : positionFloatingUI;

  return positionFunction(component, options);
}

function getDebouncedReposition(component: FloatingUIComponent): DebouncedFunc<typeof positionFloatingUI> {
  let debounced = componentToDebouncedRepositionMap.get(component);

  if (debounced) {
    return debounced;
  }

  debounced = debounce(positionFloatingUI, repositionDebounceTimeout, {
    leading: true,
    maxWait: repositionDebounceTimeout,
  });

  componentToDebouncedRepositionMap.set(component, debounced);

  return debounced;
}

const ARROW_CSS_TRANSFORM = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)",
};

/**
 * Exported for testing purposes only
 *
 * @internal
 */
export const cleanupMap = new WeakMap<FloatingUIComponent, () => void>();

const componentToDebouncedRepositionMap = new WeakMap<FloatingUIComponent, DebouncedFunc<typeof positionFloatingUI>>();

/**
 * Helper to set up floating element interactions on connectedCallback.
 *
 * @param component - A floating-ui component.
 * @param referenceEl - The `referenceElement` used to position the component according to its `placement` value.
 * @param floatingEl - The `floatingElement` containing the floating ui.
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

  Object.assign(floatingEl.style, {
    visibility: "hidden",
    pointerEvents: "none",

    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    position: component.overlayPositioning,
  });

  const runAutoUpdate = Build.isBrowser
    ? autoUpdate
    : (_refEl: HTMLElement, _floatingEl: HTMLElement, updateCallback: () => void): (() => void) => {
        updateCallback();
        return () => {
          /* noop */
        };
      };

  cleanupMap.set(
    component,
    runAutoUpdate(referenceEl, floatingEl, () => component.reposition())
  );
}

/**
 * Helper to tear down floating element interactions on disconnectedCallback.
 *
 * @param component - A floating-ui component.
 * @param referenceEl - The `referenceElement` used to position the component according to its `placement` value.
 * @param floatingEl - The `floatingElement` containing the floating ui.
 */
export function disconnectFloatingUI(
  component: FloatingUIComponent,
  referenceEl: ReferenceElement,
  floatingEl: HTMLElement
): void {
  if (!floatingEl || !referenceEl) {
    return;
  }

  cleanupMap.get(component)?.();
  cleanupMap.delete(component);

  componentToDebouncedRepositionMap.get(component)?.cancel();
  componentToDebouncedRepositionMap.delete(component);
}

const visiblePointerSize = 4;

/**
 * Default offset the position of the floating element away from the reference element.
 *
 * @default 6
 */
export const defaultOffsetDistance = Math.ceil(Math.hypot(visiblePointerSize, visiblePointerSize));
