import { intersectsHorizontally } from "../../utils/dom";
import type { RangeThumbProperty, ThumbCollisionMode, ThumbCollisionResult, TickLabelMeasurement } from "./types";

export type HorizontalBounds = Pick<DOMRectReadOnly, "left" | "right">;

/**
 * Applies a range collision policy to an already bounded, quantized pointer value.
 * Equality is allowed; swapping changes the moving role only after crossing.
 */
export function applyThumbCollisionMode(
  mode: Exclude<ThumbCollisionMode, "legacy">,
  prop: RangeThumbProperty,
  value: number,
  minValue: number,
  maxValue: number,
): ThumbCollisionResult {
  const isMin = prop === "minValue";
  const other = isMin ? maxValue : minValue;
  if (mode === "swap") {
    return {
      minValue: Math.min(value, other),
      maxValue: Math.max(value, other),
      prop: value < other ? "minValue" : value > other ? "maxValue" : prop,
    };
  }
  if (mode === "push") {
    return {
      minValue: isMin ? value : Math.min(minValue, value),
      maxValue: isMin ? Math.max(maxValue, value) : value,
      prop,
    };
  }
  return {
    minValue: isMin ? Math.min(value, maxValue) : minValue,
    maxValue: isMin ? maxValue : Math.max(value, minValue),
    prop,
  };
}

function getHostOffset(host: HorizontalBounds, label: HorizontalBounds): number {
  if (label.left < host.left) {
    return host.left - label.left;
  }
  if (label.right > host.right) {
    return host.right - label.right;
  }
  return 0;
}

/**
 * Clamps handle labels to the host and joins colliding range labels when a
 * font size is supplied. Bounds are untransformed and ordered physically.
 */
export function getHandleLabelOffsets(
  host: HorizontalBounds,
  leftLabel: HorizontalBounds,
  rightLabel?: HorizontalBounds,
  fontSize?: number,
): { left: number; right: number; hyphenate: boolean } {
  let left = getHostOffset(host, leftLabel);
  let right = rightLabel ? getHostOffset(host, rightLabel) : 0;

  if (!rightLabel || fontSize === undefined) {
    return { left, right, hyphenate: false };
  }

  const overlap = Math.max(leftLabel.right + left + fontSize - (rightLabel.left + right), 0);
  if (overlap === 0) {
    return { left, right, hyphenate: false };
  }

  const labelOffset = fontSize / 2;
  if (left === 0 && right === 0) {
    left = labelOffset - overlap / 2;
    right = overlap / 2;
    const leftHostOffset = getHostOffset(host, {
      left: leftLabel.left + left - labelOffset,
      right: leftLabel.right + left - labelOffset,
    });
    const rightHostOffset = getHostOffset(host, {
      left: rightLabel.left + right,
      right: rightLabel.right + right,
    });
    left += leftHostOffset + rightHostOffset;
    right += leftHostOffset + rightHostOffset;
  } else if (left > 0 || right > 0) {
    left += labelOffset;
    right += overlap;
  } else {
    left = -(Math.abs(left) + overlap - labelOffset);
  }

  return { left, right, hyphenate: true };
}

/**
 * Determines which tick labels fit by sorting their horizontal text bounds by
 * right edge, then balancing the gaps between visible labels.
 *
 * Reserve endpoints first, then choose the earliest-finishing bounds to maximize
 * the remaining label count. One sweep of legal one-for-one replacements improves
 * spacing without changing that count or overlapping neighbors. This is a local
 * balance heuristic, not a global spacing optimizer. Numeric value breaks ties
 * consistently in mirrored layouts. Sorting is O(n log n); balancing is O(n²).
 */
export function getVisibleTickLabels(
  labels: readonly TickLabelMeasurement[],
  keepOverlappingEndpoints = false,
): Set<number> {
  const min = labels.find((label) => label.edge === "min");
  const max = labels.find((label) => label.edge === "max");
  const endpoints: TickLabelMeasurement[] = [];
  if (min) {
    endpoints.push(min);
  }
  if (max && (!min || !intersectsHorizontally(min, max) || keepOverlappingEndpoints)) {
    endpoints.push(max);
  }
  const candidates = labels
    .filter((label) => !label.edge && !endpoints.some((endpoint) => intersectsHorizontally(label, endpoint)))
    .sort((first, second) => first.right - second.right || first.value - second.value);
  const selected: TickLabelMeasurement[] = [];

  for (const candidate of candidates) {
    const previous = selected.at(-1);
    if (!previous || !intersectsHorizontally(previous, candidate)) {
      selected.push(candidate);
    }
  }

  if (selected.length === candidates.length) {
    return new Set([...endpoints, ...selected].map((label) => label.value));
  }

  selected.push(...endpoints);
  selected.sort((first, second) => first.value - second.value);

  for (let index = 0; index < selected.length; index++) {
    const current = selected[index];
    if (current.edge) {
      continue;
    }

    const previous = selected[index - 1];
    const next = selected[index + 1];
    const start = previous?.position ?? 0;
    const end = next?.position ?? 1;
    const gapCost = (label: TickLabelMeasurement): number =>
      (label.position - start) ** 2 + (end - label.position) ** 2;
    let best = current;

    for (const candidate of candidates) {
      if (
        candidate.position <= start ||
        candidate.position >= end ||
        (previous && intersectsHorizontally(previous, candidate)) ||
        (next && intersectsHorizontally(next, candidate))
      ) {
        continue;
      }

      const cost = gapCost(candidate);
      const bestCost = gapCost(best);
      if (cost < bestCost || (cost === bestCost && candidate.value < best.value)) {
        best = candidate;
      }
    }

    selected[index] = best;
  }

  return new Set(selected.map((label) => label.value));
}
