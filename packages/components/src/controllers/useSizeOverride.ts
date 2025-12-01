import { makeController } from "@arcgis/lumina/controllers";
import { Axis } from "../components/interfaces";

interface SizeOverrideContext {
  /**
   * Returns both min and max allowed sizes (pixels) for the axis ("inline" | "block"). Use null for no bound.
   */
  readonly getBounds?: (axis: Axis) => { min: number | null; max: number | null };
  /**
   * Callback invoked after an override is applied or cleared so the host can sync internal state.
   * The value will be a rounded pixel number or null if cleared.
   */
  readonly setInternalState?: (axis: Axis, value: number | null) => void;
  /**
   * Lazy getter for the element whose size will be overridden.
   * Should return null until the element is available.
   */
  readonly targetElement: () => HTMLElement | null;
}

export interface UseSizeOverride {
  /**
   * Applies (or clears) an inline/block size override.
   * Pass size = null to clear the inline style so normal styling (design tokens or other CSS) reasserts.
   *
   * When to use:
   * User resizing (drag/keyboard) sets an inline size that overrides token-defined defaults.
   * This helper lets code adjust or remove that override so tokens can take effect again.
   *
   * Clamping:
   * Min/max define the allowed range. Any requested size outside that range gets clamped before rounding.
   *
   */
  resize: (size: number | null, axis: Axis) => void;
}

/**
 * Creates a controller that manages inline size overrides on a host element.
 *
 * Typical usage: user drag/keyboard resizes, temporarily overriding token-defined defaults;
 * this helper lets code adjust or remove that override so tokens can take effect again.
 *
 * @param context
 */
export const useSizeOverride = (context: SizeOverrideContext): UseSizeOverride =>
  makeController(() => {
    return {
      resize(size: number | null, axis: Axis): void {
        const el = context.targetElement();
        if (!el) {
          return;
        }

        let boundSize = size;

        const { min, max } = context.getBounds?.(axis) ?? { min: null, max: null };

        if (boundSize !== null) {
          if (min !== null) {
            boundSize = Math.max(boundSize, min);
          }
          if (max !== null) {
            boundSize = Math.min(boundSize, max);
          }
        }

        const applied = boundSize === null ? null : Math.round(boundSize);
        const cssProp = axis === "block" ? "blockSize" : "inlineSize";
        const cssPropKey = cssProp as keyof CSSStyleDeclaration;

        el.style[cssPropKey] = applied === null ? "" : `${applied}px`;
        context.setInternalState?.(axis, applied);
      },
    };
  });
