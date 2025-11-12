import { makeController } from "@arcgis/lumina/controllers";

/**
 * Applies (or clears) an inline width/height override without mutating tokens.
 * Pass size = null to clear and allow token cascade to reassert.
 *
 * User resizing (drag/keyboard) sets an inline size that overrides token-defined defaults.
 * This helper lets code adjust or remove that override so tokens can take effect again.
 */
export type SizeAxis = "inline" | "block";

export interface SizeOverrideContext {
  readonly getMax?: (axis: SizeAxis) => number | null;
  readonly getMin?: (axis: SizeAxis) => number | null;
  readonly setInternalState?: (axis: SizeAxis, value: number | null) => void;
  readonly targetElement: () => HTMLElement | null;
}

export const useSizeOverride = (
  context: SizeOverrideContext,
): {
  apply: (requestedSize: number | null, axis: SizeAxis) => void;
} =>
  makeController(() => {
    return {
      apply(requestedSize: number | null, axis: SizeAxis): void {
        const el = context.targetElement();
        if (!el) {
          return null;
        }

        let next = requestedSize;

        const min = context.getMin?.(axis);
        const max = context.getMax?.(axis);
        if (next != null && min != null && max != null) {
          next = Math.min(Math.max(next, min), max);
        }

        const applied = next == null ? null : Math.round(next);
        const cssProp = axis === "block" ? "height" : "width";
        const cssPropKey = cssProp as keyof CSSStyleDeclaration;

        (el.style as any)[cssPropKey] = applied == null ? "" : `${applied}px`;

        context.setInternalState?.(axis, applied);
      },
    };
  });
