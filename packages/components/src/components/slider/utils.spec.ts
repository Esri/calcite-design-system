import { describe, expect, it } from "vitest";
import type { TickLabelMeasurement } from "./types";
import { applyThumbCollisionMode, getHandleLabelOffsets, getVisibleTickLabels } from "./utils";

describe(applyThumbCollisionMode, () => {
  it.each([
    ["swap", "maxValue", 0, 50, 100, { minValue: 0, maxValue: 50, prop: "minValue" }],
    ["swap", "minValue", 100, 0, 50, { minValue: 50, maxValue: 100, prop: "maxValue" }],
    ["push", "maxValue", 0, 50, 100, { minValue: 0, maxValue: 0, prop: "maxValue" }],
    ["push", "minValue", 100, 0, 50, { minValue: 100, maxValue: 100, prop: "minValue" }],
    ["block", "maxValue", 0, 50, 100, { minValue: 50, maxValue: 50, prop: "maxValue" }],
    ["block", "minValue", 100, 0, 50, { minValue: 50, maxValue: 50, prop: "minValue" }],
  ] as const)("applies %s when %s crosses the other endpoint", (mode, prop, value, minValue, maxValue, expected) => {
    expect(applyThumbCollisionMode(mode, prop, value, minValue, maxValue)).toEqual(expected);
  });

  it.each(["swap", "push", "block"] as const)("allows touching without changing roles in %s", (mode) => {
    expect(applyThumbCollisionMode(mode, "maxValue", 50, 50, 100)).toEqual({
      minValue: 50,
      maxValue: 50,
      prop: "maxValue",
    });
    expect(applyThumbCollisionMode(mode, "minValue", 50, 0, 50)).toEqual({
      minValue: 50,
      maxValue: 50,
      prop: "minValue",
    });
  });

  it("keeps the passive value fixed when a swapped thumb reverses direction", () => {
    const crossed = applyThumbCollisionMode("swap", "maxValue", 0, 50, 100);
    expect(applyThumbCollisionMode("swap", crossed.prop, 80, crossed.minValue, crossed.maxValue)).toEqual({
      minValue: 50,
      maxValue: 80,
      prop: "maxValue",
    });
  });

  it("does not pull a pushed endpoint back when the active thumb reverses", () => {
    const pushed = applyThumbCollisionMode("push", "maxValue", 0, 50, 100);
    expect(applyThumbCollisionMode("push", pushed.prop, 100, pushed.minValue, pushed.maxValue)).toEqual({
      minValue: 0,
      maxValue: 100,
      prop: "maxValue",
    });
  });

  it("preserves negative and fractional values when swapping", () => {
    expect(applyThumbCollisionMode("swap", "maxValue", -0.25, 0.25, 1.25)).toEqual({
      minValue: -0.25,
      maxValue: 0.25,
      prop: "minValue",
    });
  });
});

describe(getHandleLabelOffsets, () => {
  const host = { left: 0, right: 100 };

  it("clamps single labels and prioritizes the left edge when neither edge fits", () => {
    expect(getHandleLabelOffsets(host, { left: -10, right: 10 })).toEqual({
      left: 10,
      right: 0,
      hyphenate: false,
    });
    expect(getHandleLabelOffsets(host, { left: 90, right: 110 })).toEqual({
      left: -10,
      right: 0,
      hyphenate: false,
    });
    expect(getHandleLabelOffsets(host, { left: -10, right: 110 }).left).toBe(10);
  });

  it("keeps labels separate when joining is disabled or the font-size gap fits", () => {
    expect(getHandleLabelOffsets(host, { left: 40, right: 60 }, { left: 45, right: 65 })).toEqual({
      left: 0,
      right: 0,
      hyphenate: false,
    });
    expect(getHandleLabelOffsets(host, { left: 10, right: 20 }, { left: 30, right: 40 }, 10)).toEqual({
      left: 0,
      right: 0,
      hyphenate: false,
    });
  });

  it.each([
    ["center", { left: 30, right: 50 }, { left: 45, right: 65 }, -2.5, 7.5],
    ["left edge", { left: -10, right: 10 }, { left: -5, right: 15 }, 15, 35],
    ["right edge", { left: 85, right: 105 }, { left: 90, right: 110 }, -30, -10],
    ["near left edge", { left: 0, right: 20 }, { left: 5, right: 25 }, 5, 25],
    ["near right edge", { left: 75, right: 95 }, { left: 80, right: 100 }, -20, 0],
  ])("joins labels at the %s", (_position, leftLabel, rightLabel, left, right) => {
    expect(getHandleLabelOffsets(host, leftLabel, rightLabel, 10)).toEqual({
      left,
      right,
      hyphenate: true,
    });
  });

  it("preserves both edge corrections when the joined pair exceeds the host", () => {
    expect(getHandleLabelOffsets({ left: 0, right: 30 }, { left: 0, right: 20 }, { left: 10, right: 30 }, 40)).toEqual({
      left: -5,
      right: 25,
      hyphenate: true,
    });
  });
});

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
