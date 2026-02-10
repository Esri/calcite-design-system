// @ts-strict-ignore
import { makeController } from "@arcgis/lumina/controllers";
import { Ref } from "lit/directives/ref.js";
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
  readonly targetElement: Ref<HTMLElement> | (() => { value?: HTMLElement | null }) | null;
  /**
   * Returns true if fullscreen sizing should be disabled for the host component.
   */
  readonly fullscreenDisabled?: () => boolean;
}

export interface UseSizeOverride {
  /**
   * Applies (or clears) an inline/block size override in one call.
   * Pass `null` to clear size overrides.
   *
   * Use when the component needs to set inline styles
   * to override sizing from user resizing via drag or keyboard.
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
        el.style.removeProperty(prop);
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

      el.style.setProperty(prop, `${Math.round(clampedSize)}px`);
      return clampedSize;
    };

    return {
      resize(sizes: { inline?: number | null; block?: number | null }) {
        let targetElement: HTMLElement | null | undefined;
        if (typeof context.targetElement === "function") {
          const refObject = context.targetElement();
          targetElement = refObject?.value ?? null;
        } else if (context.targetElement && "value" in context.targetElement) {
          targetElement = context.targetElement.value;
        } else {
          targetElement = context.targetElement as HTMLElement | null;
        }

        if (!targetElement) {
          return { inline: undefined, block: undefined };
        }
        const inline = applyAxis(sizes.inline, "inline", targetElement);
        const block = applyAxis(sizes.block, "block", targetElement);

        return {
          inline,
          block,
        };
      },
    };
  });
