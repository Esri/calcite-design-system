import { makeController } from "@arcgis/lumina/controllers";
import { Axis } from "../components/interfaces";

interface AxisBounds {
  min: number | null;
  max: number | null;
}

interface SizeOverrideContext {
  /**
   * Returns both min and max allowed sizes (pixels) for the axis "inline" and "block". Use null for no bound.
   */
  readonly getBounds?: () => {
    inline: AxisBounds;
    block: AxisBounds;
  };
  /**
   * Callback invoked after an override is applied or cleared so the host can sync internal state.
   * The value will be a rounded pixel number or null if cleared.
   */
  readonly targetElement: { value: HTMLElement };
}

export interface UseSizeOverride {
  /**
   * Applies (or clears) an inline/block size override in one call.
   * Pass size = null to clear the inline style overrides.
   *
   * When to use:
   * User resizing (drag/keyboard) sets an inline size that overrides defaults.
   * This helper lets code adjust or remove that override.
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
      el: HTMLElement,
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
      const bounds = context.getBounds?.() ?? { inline: { min: null, max: null }, block: { min: null, max: null } };
      const { min, max } = axis === "inline" ? bounds.inline : bounds.block;

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
        const targetElement = context.targetElement.value;
        const inline = applyAxis(sizes.inline, "inline", targetElement);
        const block = applyAxis(sizes.block, "block", targetElement);

        return {
          inline,
          block,
        };
      },
    };
  });
