/**
 * Applies (or clears) an inline width/height override without mutating tokens.
 * Pass size = null to clear and allow token cascade to reassert.
 *
 * User resizing (drag/keyboard) sets an inline size that overrides token-defined defaults.
 * This helper lets code adjust or remove that override so tokens can take effect again.
 */
export type SizeAxis = "inline" | "block";

export interface SizeOverrideContext {
  targetElement: HTMLElement;
  getMin?: (axis: SizeAxis) => number | null;
  getMax?: (axis: SizeAxis) => number | null;
  setInternalState?: (axis: SizeAxis, value: number | null) => void;
}

export const useSizeOverride = (
  context: SizeOverrideContext,
  requestedSize: number | null,
  axis: SizeAxis,
): number | null => {
  const { targetElement } = context;
  if (!targetElement) {
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

  (targetElement.style as any)[cssProp] = applied == null ? "" : `${applied}px`;

  context.setInternalState?.(axis, applied);

  return applied;
};
