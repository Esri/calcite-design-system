import { makeController } from "@arcgis/lumina/controllers";
import { Axis } from "../components/interfaces";

interface SizeOverrideContext {
  /**
   * Returns the maximum allowed size in pixels for the given axis. Return null for no max.
   */
  readonly getMax?: (axis: Axis) => number | null;
  /**
   * Returns the minimum allowed size in pixels for the given axis. Return null for no min.
   */
  readonly getMin?: (axis: Axis) => number | null;
  /**
   * Callback invoked after an override is applied or cleared so the host can sync internal state.
   * The value will be a rounded pixel number or null if cleared.
   */
  readonly setInternalState?: (axis: Axis, value: number | null) => void;
  /**
   * Lazy getter for the element whose inline size (width/height) will be overridden.
   * Should return null until the element is available.
   */
  readonly targetElement: () => HTMLElement | null;
}

export interface UseSizeOverride {
  /**
   * Applies (or clears) an inline width/height override.
   * Pass size = null to clear the inline style so normal styling (design tokens or other CSS) reasserts.
   *
   * When to use:
   * User resizing (drag/keyboard) sets an inline size that overrides token-defined defaults.
   * This helper lets code adjust or remove that override so tokens can take effect again.
   *
   * Clamping:
   * If min and/or max are provided and the requested size is not null, the value is clamped before rounding.
   *
   * @param size - Pixel value to apply. Null clears any existing override.
   * @param axis - "inline" for width or "block" for height.
   */
  resize: (size: number | null, axis: Axis) => void;
}

/**
 * Creates a controller that manages inline size overrides on a host element.
 *
 * Typical usage: user drag/keyboard resize sets an inline style (width/height) that temporarily
 * overrides token-defined defaults; this helper lets code adjust or remove that override so tokens can take effect again.
 *
 * @param context - Supplies target element, optional bounds, and state callback.
 * @returns controller implementing UseSizeOverride.
 */
export const useSizeOverride = (context: SizeOverrideContext): UseSizeOverride =>
  makeController(() => {
    return {
      resize(size: number | null, axis: Axis): void {
        const el = context.targetElement();
        if (!el) {
          return;
        }

        let next = size;

        const min = context.getMin?.(axis);
        const max = context.getMax?.(axis);
        if (next != null) {
          if (min != null) {
            next = Math.max(next, min);
          }
          if (max != null) {
            next = Math.min(next, max);
          }
        }

        const applied = next == null ? null : Math.round(next);
        const cssProp = axis === "block" ? "height" : "width";
        const cssPropKey = cssProp as keyof CSSStyleDeclaration;

        el.style[cssPropKey] = applied == null ? "" : `${applied}px`;

        context.setInternalState?.(axis, applied);
      },
    };
  });
