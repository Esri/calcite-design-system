import { describe, expect, it } from "vitest";
import { getVisibleTickLabels, type TickLabelMeasurement } from "./utils";

function label(value: number, left: number, right: number): TickLabelMeasurement {
  return {
    value,
    position: value / 100,
    left,
    right,
    edge: value === 0 ? "min" : value === 100 ? "max" : undefined,
  };
}

/**
 * label(value, left, right) places a tick on a 0-100 scale and supplies its text
 * bounds independently. Values 0 and 100 identify the endpoints.
 *
 * For example, [0--30] [20--35] [40--60] [65--80] [70--100] are text bounds
 * for ticks 0, 25, 50, 75, 100. Keeping endpoints leaves tick 50 as the only
 * interior label that fits. Assertions compare the visible tick values.
 */
describe(getVisibleTickLabels, () => {
  it("keeps all labels that fit, including sparse formatter output", () => {
    expect(getVisibleTickLabels([label(0, 0, 10), label(50, 45, 55), label(100, 90, 100)])).toEqual(
      new Set([0, 50, 100]),
    );
    expect(getVisibleTickLabels([])).toEqual(new Set());
    expect(getVisibleTickLabels([label(50, 45, 55)])).toEqual(new Set([50]));
  });

  it("prioritizes endpoints over conflicting interior labels", () => {
    expect(
      getVisibleTickLabels([
        label(0, 0, 30),
        label(25, 20, 35),
        label(50, 40, 60),
        label(75, 65, 80),
        label(100, 70, 100),
      ]),
    ).toEqual(new Set([0, 50, 100]));
  });

  it("keeps min when endpoints collide unless both are requested", () => {
    const labels = [label(0, 0, 60), label(50, 45, 55), label(100, 40, 100)];
    expect(getVisibleTickLabels(labels)).toEqual(new Set([0]));
    expect(getVisibleTickLabels(labels, true)).toEqual(new Set([0, 100]));
  });

  it("maximizes count instead of favoring a wide interior label", () => {
    expect(
      getVisibleTickLabels([
        label(0, 0, 5),
        label(25, 10, 30),
        label(50, 15, 85),
        label(75, 70, 90),
        label(100, 95, 100),
      ]),
    ).toEqual(new Set([0, 25, 75, 100]));
  });

  it("improves balance without reducing the maximum count", () => {
    expect(
      getVisibleTickLabels([
        label(0, 0, 5),
        label(20, 10, 30),
        label(25, 15, 35),
        label(50, 40, 60),
        label(75, 65, 85),
        label(80, 70, 90),
        label(100, 95, 100),
      ]),
    ).toEqual(new Set([0, 25, 50, 75, 100]));
  });

  it("handles irregular terminal ticks and mirrored coordinates deterministically", () => {
    const labels = [label(0, 0, 10), label(30, 20, 40), label(60, 50, 70), label(90, 80, 100), label(100, 90, 110)];
    const mirrored = labels.map((item) => ({
      ...item,
      left: 110 - item.right,
      right: 110 - item.left,
    }));

    expect(getVisibleTickLabels(labels)).toEqual(new Set([0, 30, 60, 100]));
    expect(getVisibleTickLabels(mirrored)).toEqual(getVisibleTickLabels(labels));
  });

  it("handles a single endpoint in a collapsed range", () => {
    expect(getVisibleTickLabels([label(0, 0, 10)])).toEqual(new Set([0]));
  });
});
