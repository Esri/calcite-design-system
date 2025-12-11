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
  readonly targetElement: { value: HTMLElement | null };
}

export interface UseSizeOverride {
  /**
   * Applies (or clears) an inline/block size override in one call.
   * Pass size = null to clear the inline style so normal styling (design tokens or other CSS) reasserts.
   *
   * When to use:
   * User resizing (drag/keyboard) sets an inline size that overrides token-defined defaults.
   * This helper lets code adjust or remove that override so tokens can take effect again.
   *
   * Min/max define the allowed range. Any requested size outside that range gets clamped.
   *
   */
  resize: (sizes: { inline?: number | null; block?: number | null }) => {
    inline?: number | null;
    block?: number | null;
  };
}

/**
 * Creates a controller that manages size overrides on a host element.
 */
export const useSizeOverride = (context: SizeOverrideContext): UseSizeOverride =>
  makeController(() => {
    const applyAxis = (
      requestedSize: number | null | undefined,
      axis: Axis,
      el: HTMLElement | null,
    ): number | null | undefined => {
      if (requestedSize === undefined) {
        return undefined;
      }

      const prop = axis === "block" ? "block-size" : "inline-size";

      if (requestedSize === null) {
        el?.style.removeProperty(prop);
        return null;
      }

      let clampedSize = requestedSize;
      const { min, max } = context.getBounds?.(axis) ?? { min: null, max: null };
      if (min !== null) {
        clampedSize = Math.round(Math.max(clampedSize, min));
      }
      if (max !== null) {
        clampedSize = Math.round(Math.min(clampedSize, max));
      }

      el?.style.setProperty(prop, `${Math.round(clampedSize)}px`);
      return clampedSize;
    };

    return {
      resize(sizes: { inline?: number | null; block?: number | null }) {
        const el = context.targetElement.value;
        const inline = applyAxis(sizes.inline, "inline", el);
        const block = applyAxis(sizes.block, "block", el);

        const result: { inline?: number | null; block?: number | null } = {};
        if (inline !== undefined) {
          result.inline = inline;
        }
        if (block !== undefined) {
          result.block = block;
        }
        return result;
      },
    };
  });
