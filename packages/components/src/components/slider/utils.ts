import { intersectsHorizontally } from "../../utils/dom";

export interface TickLabelMeasurement extends Pick<DOMRectReadOnly, "left" | "right"> {
  value: number;
  position: number;
  edge?: "min" | "max";
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
