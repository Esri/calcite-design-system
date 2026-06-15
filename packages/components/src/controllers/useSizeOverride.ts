import { makeController } from "@arcgis/lumina/controllers";
import { Ref } from "lit/directives/ref.js";
import { ResizeValues } from "../components/interfaces";

interface AxisBounds {
  min?: number | null;
  max?: number | null;
}

type Axis = "inline" | "block";

type SizeOverride = {
  inline?: number | null;
  block?: number | null;
};

type AppliedSizeOverride = SizeOverride &
  Partial<Pick<ResizeValues, "minInlineSize" | "minBlockSize" | "maxInlineSize" | "maxBlockSize">>;

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
   * Called when resize values change so the host can update its state.
   */
  onResize?: (resizeValues: ResizeValues) => void;
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
  resize: (sizes: SizeOverride) => AppliedSizeOverride;
}

interface GetBounds {
  (): {
    inline: AxisBounds;
    block: AxisBounds;
  };
}

function clampAndApplySize(
  axis: Axis,
  size: number | null | undefined,
  bounds: AxisBounds,
  el: HTMLElement,
): number | null | undefined {
  const cssPropertyName = `${axis}-size`;
  if (size === undefined) {
    return undefined;
  }
  if (size === null) {
    el.style.removeProperty(cssPropertyName);
    return null;
  }
  let clampedSize = size;
  if (bounds.min != null) {
    clampedSize = Math.round(Math.max(clampedSize, bounds.min));
  }
  if (bounds.max != null) {
    clampedSize = Math.round(Math.min(clampedSize, bounds.max));
  }
  el.style.setProperty(cssPropertyName, `${Math.round(clampedSize)}px`);
  return clampedSize;
}

const unboundedAxisBounds: AxisBounds = {};

function getUnboundedAxes(): ReturnType<GetBounds> {
  return {
    inline: unboundedAxisBounds,
    block: unboundedAxisBounds,
  };
}

function resolveTargetElement(context: SizeOverrideContext): HTMLElement | undefined {
  if (typeof context.targetElement === "function") {
    return context.targetElement().value ?? undefined;
  }

  if (context.targetElement && "value" in context.targetElement) {
    return context.targetElement.value ?? undefined;
  }

  return context.targetElement ?? undefined;
}

function toResizeValue(value: number | null | undefined): number | null {
  return value ?? null;
}

/**
 * Applies size to component's inline-size or block-size, clamping to bounds.
 */
export function applyAxes(sizes: SizeOverride, el: HTMLElement, getBounds?: GetBounds): AppliedSizeOverride {
  const bounds = getBounds?.() ?? getUnboundedAxes();

  const clampedInlineSize = clampAndApplySize("inline", sizes.inline, bounds.inline, el);
  const clampedBlockSize = clampAndApplySize("block", sizes.block, bounds.block, el);

  return {
    inline: clampedInlineSize,
    block: clampedBlockSize,
  };
}

/**
 * Creates a controller that manages size overrides on a host element.
 */
export const useSizeOverride = (context: SizeOverrideContext): UseSizeOverride =>
  makeController(() => {
    return {
      resize(sizes: SizeOverride): AppliedSizeOverride {
        const targetElement = resolveTargetElement(context);

        if (!targetElement) {
          return { inline: undefined, block: undefined };
        }
        const { inline: inlineSize, block: blockSize } = applyAxes(sizes, targetElement, context.getBounds);

        const bounds = context.getBounds?.() ?? getUnboundedAxes();

        const resizeValues: ResizeValues = {
          inlineSize,
          blockSize,
          minInlineSize: toResizeValue(bounds.inline.min),
          maxInlineSize: toResizeValue(bounds.inline.max),
          minBlockSize: toResizeValue(bounds.block.min),
          maxBlockSize: toResizeValue(bounds.block.max),
        };

        context.onResize?.(resizeValues);

        return {
          inline: inlineSize,
          block: blockSize,
          minInlineSize: resizeValues.minInlineSize,
          maxInlineSize: resizeValues.maxInlineSize,
          minBlockSize: resizeValues.minBlockSize,
          maxBlockSize: resizeValues.maxBlockSize,
        };
      },
    };
  });
