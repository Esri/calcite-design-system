import { isServer } from "lit";
import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
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
import { debounce, DebouncedFunction } from "es-toolkit";
import { offsetParent } from "composed-offset-position";
import { Layout } from "../components/interfaces";
import { Direction } from "../utils/dom";
import { DEBOUNCE } from "../utils/resources";

(function setUpFloatingUiForShadowDomPositioning(): void {
  if (!isServer) {
    const originalGetOffsetParent = platform.getOffsetParent;
    platform.getOffsetParent = (element: Element) => originalGetOffsetParent(element, offsetParent);
  }
})();

function roundByDPR(value: number): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}

export interface PositionFloatingUiOptions {
  /**
   * The associated arrow element used to point to the reference element, if applicable.
   */
  arrowEl?: SVGSVGElement;

  /**
   * The direction of the component, which determines the effective placement of variation placements (e.g., "leading" or "trailing").
   */
  direction: Direction;

  /**
   * Prevents flipping the component's placement when overlapping its `referenceElement`.
   */
  flipDisabled?: boolean;

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  flipPlacements?: FlipPlacement[];

  /**
   * The `floatingElement` containing the floating ui.
   */
  floatingEl?: HTMLElement;

  /**
   * Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value.
   */
  overlayPositioning: Strategy;

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   */
  placement: LogicalPlacement;

  /**
   * Offsets the position of the popover away from the `referenceElement`.
   */
  offsetDistance?: number;

  /**
   * Offsets the position of the component along the `referenceElement`.
   */
  offsetSkidding?: number;

  /**
   * The `referenceElement` used to position the component according to its `placement` value.
   */
  referenceEl?: ReferenceElement;

  /**
   * The type of floating UI, which determines the default middleware used for positioning.
   */
  type: UIType;
}

/**
 * Positions the floating element relative to the reference element.
 *
 * **Note:** exported for testing purposes only
 */
export const positionFloatingUI =
  /* we export arrow function to allow us to spy on it during testing */
  async (
    component: FloatingUIHost,
    {
      arrowEl,
      direction,
      flipDisabled,
      flipPlacements,
      floatingEl,
      offsetDistance,
      offsetSkidding,
      overlayPositioning = "absolute",
      placement,
      referenceEl,
      type,
    }: PositionFloatingUiOptions,
  ): Promise<void> => {
    if (!referenceEl || !floatingEl) {
      return;
    }

    const isRTL = direction === "rtl";

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
          : getEffectivePlacement(placement, isRTL),
      middleware: getMiddleware({
        placement,
        flipDisabled,
        flipPlacements: flipPlacements?.map((placement) => getEffectivePlacement(placement, isRTL)),
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

    Object.assign(floatingEl.style, {
      pointerEvents,
      position,
      transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
      visibility,
    });
  };

/** Exported for testing purposes only */
export const placementDataAttribute = "data-placement";

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

export type FlipPlacement = Exclude<LogicalPlacement, "auto" | "auto-start" | "auto-end">;

export const flipPlacements: FlipPlacement[] = [
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
  "leading",
  "trailing",
  "leading-start",
  "leading-end",
  "trailing-start",
  "trailing-end",
];

export type MenuPlacement = Extract<
  LogicalPlacement,
  "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end"
>;

export const defaultMenuPlacement: MenuPlacement = "bottom-start";
export const defaultEndMenuPlacement: MenuPlacement = "bottom-end";

export interface FloatingUIComponent {
  /** Whether the component is opened. */
  open: boolean;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  overlayPositioning: OverlayPositioning;

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   *
   * Possible values: "auto", "auto-start", "auto-end", "top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end", "leading-start", "leading", "leading-end", "trailing-end", "trailing",  or "trailing-start".
   */
  placement: LogicalPlacement;

  /**
   * Updates the position of the component.
   *
   * @param delayed – (internal) when true, it will reposition the component after a delay. the default is false. This is useful for components that have multiple watched properties that schedule repositioning.
   */
  reposition: (delayed?: boolean) => Promise<void>;

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
   * See [FloatingArrow](https://github.com/Esri/calcite-design-system/blob/dev/src/components/functional/FloatingArrow.tsx)
   */
  floatingLayout?: FloatingLayout;

  /** The `floatingElement` containing the floating ui. */
  floatingEl?: HTMLElement;

  /** The `referenceElement` used to position the component according to its `placement` value. */
  referenceEl?: ReferenceElement;
}

export type FloatingLayout = Extract<Layout, "vertical" | "horizontal">;

type FloatingUIHost = LitElement & {
  floatingLayout?: FloatingLayout;
  open: boolean;
};

export const FloatingCSS = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active",
  arrow: "calcite-floating-ui-arrow",
  arrowStroke: "calcite-floating-ui-arrow__stroke",
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
  arrowEl?: SVGSVGElement;
  type: UIType;
}): Middleware[] {
  const middleware = [shift(), hide()];

  if (type === "menu") {
    middleware.push(
      flip({
        fallbackPlacements: flipPlacements || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"],
      }),
    );
  }

  middleware.push(
    offset({
      mainAxis: typeof offsetDistance === "number" ? offsetDistance : 0,
      crossAxis: typeof offsetSkidding === "number" ? offsetSkidding : 0,
    }),
  );

  if (placement === "auto" || placement === "auto-start" || placement === "auto-end") {
    middleware.push(
      autoPlacement({ alignment: placement === "auto-start" ? "start" : placement === "auto-end" ? "end" : null }),
    );
  } else if (!flipDisabled) {
    middleware.push(flip(flipPlacements ? { fallbackPlacements: flipPlacements } : {}));
  }

  if (arrowEl) {
    middleware.push(
      arrow({
        element: arrowEl,
      }),
    );
  }

  return middleware;
}

function isFlipPlacement(placement: string): placement is FlipPlacement {
  return flipPlacements.includes(placement as FlipPlacement);
}

export function filterValidFlipPlacements(placements: string[], el: HTMLElement): FlipPlacement[] {
  const filteredPlacements = placements.filter(isFlipPlacement);

  if (filteredPlacements.length !== placements.length) {
    console.warn(
      `${el.tagName}: Invalid value found in: flipPlacements. Try any of these: ${flipPlacements
        .map((placement) => `"${placement}"`)
        .join(", ")
        .trim()}`,
      { el },
    );
  }

  return filteredPlacements;
}

export function getEffectivePlacement(placement: LogicalPlacement, isRTL = false): EffectivePlacement {
  const placements = ["left", "right"];

  if (isRTL) {
    placements.reverse();
  }

  return placement.replace(/leading/gi, placements[0]).replace(/trailing/gi, placements[1]) as EffectivePlacement;
}

export interface UseFloatingUi {
  /**
   * Sets up automatic positioning using the current reference and floating elements.
   */
  connect: () => Promise<void>;

  /**
   * Clears positioning styles when the floating element closes.
   */
  hide: () => void;

  /**
   * Updates the position of the floating element.
   *
   * @param delayed - When true, positions after the shared reposition delay.
   */
  reposition: (delayed?: boolean) => Promise<void>;
}

export type UseFloatingUiOptions = () => PositionFloatingUiOptions;

/**
 * Creates a controller for positioning floating content.
 *
 * Automatic positioning and pending delayed work are cleaned up when the host disconnects.
 */
export const useFloatingUi = <T extends FloatingUIHost>(
  getOptions: UseFloatingUiOptions,
): ReturnType<typeof makeGenericController<UseFloatingUi, T>> =>
  makeGenericController<UseFloatingUi, T>((component, controller) => {
    let autoUpdateCleanup: (() => void) | undefined;
    let autoUpdatePending = false;

    const debouncedReposition: DebouncedFunction<typeof positionFloatingUI> = debounce(
      positionFloatingUI,
      DEBOUNCE.reposition,
      {
        edges: ["leading", "trailing"],
      },
    );

    const disconnect = (): void => {
      autoUpdateCleanup?.();
      autoUpdateCleanup = undefined;
      autoUpdatePending = false;
      // eslint-disable-next-line no-restricted-properties -- this controller manages cancel calls
      debouncedReposition.cancel();
    };

    const hide = (): void => {
      const { floatingEl } = getOptions();

      if (!floatingEl) {
        return;
      }

      Object.assign(floatingEl.style, {
        display: "",
        left: "",
        pointerEvents: "",
        position: "",
        top: "",
        transform: "",
        visibility: "",
      });
    };

    const reposition = async (delayed = false): Promise<void> => {
      const options = getOptions();

      if (!component.open || !options.floatingEl || !options.referenceEl) {
        return;
      }

      Object.assign(options.floatingEl.style, {
        display: "block",
        inset: "unset",
        // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
        left: "0",
        position: options.overlayPositioning ?? "absolute",
        top: "0",
      });

      if (!autoUpdatePending && !autoUpdateCleanup) {
        return runAutoUpdate();
      }

      const positionFunction = delayed ? debouncedReposition : positionFloatingUI;

      await positionFunction(component, options);
    };

    const runAutoUpdate = async (): Promise<void> => {
      const { referenceEl, floatingEl } = getOptions();

      if (!floatingEl?.isConnected || !referenceEl) {
        return;
      }

      const effectiveAutoUpdate = !isServer
        ? autoUpdate
        : (_refEl: ReferenceElement, _floatingEl: HTMLElement, updateCallback: () => void): (() => void) => {
            updateCallback();
            return () => {
              /* noop */
            };
          };

      autoUpdatePending = true;

      let repositionPromise: Promise<void>;

      const cleanup = effectiveAutoUpdate(
        referenceEl,
        floatingEl,
        // callback is invoked immediately
        () => {
          const promise = reposition();

          if (!repositionPromise) {
            repositionPromise = promise;
          }
        },
      );

      autoUpdatePending = false;
      autoUpdateCleanup = cleanup;

      return repositionPromise!;
    };

    const connect = async (): Promise<void> => {
      const { floatingEl, referenceEl } = getOptions();

      hide();
      disconnect();

      if (!floatingEl || !referenceEl || !component.open) {
        return;
      }

      return runAutoUpdate();
    };

    controller.onDisconnected(disconnect);

    return {
      connect,
      hide,
      reposition,
    };
  });

const ARROW_CSS_TRANSFORM = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)",
};

const visiblePointerSize = 4;

/**
 * Default offset the position of the floating element away from the reference element.
 */
export const defaultOffsetDistance = Math.ceil(Math.hypot(visiblePointerSize, visiblePointerSize));
