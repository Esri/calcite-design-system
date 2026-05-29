import { describe, expect, it } from "vitest";
import { area, range, translate } from "./util";
import type { DataSeries, Point } from "./interfaces";

describe("translate", () => {
  it("maps points from data space to graph coordinates", () => {
    const t = translate({
      width: 100,
      height: 50,
      min: [10, 20],
      max: [20, 30],
    });

    expect(t([10, 20])).toEqual([0, 50]);
    expect(t([15, 25])).toEqual([50, 25]);
    expect(t([20, 30])).toEqual([100, 0]);
  });

  it("supports negative ranges", () => {
    const t = translate({
      width: 200,
      height: 100,
      min: [-10, -10],
      max: [10, 10],
    });

    expect(t([-10, -10])).toEqual([0, 100]);
    expect(t([0, 0])).toEqual([100, 50]);
    expect(t([10, 10])).toEqual([200, 0]);
  });
});

describe("range", () => {
  it("returns min and max extents for mixed values", () => {
    expect(
      range([
        [3, 5],
        [0, 7],
        [9, -1],
        [2, 4],
      ]),
    ).toEqual({
      min: [0, -1],
      max: [9, 7],
    });
  });

  it("returns identical min/max for single-point datasets", () => {
    expect(range([[4, 8]])).toEqual({
      min: [4, 8],
      max: [4, 8],
    });
  });
});

describe("area", () => {
  it("returns an empty path string for empty datasets", () => {
    const t = translate({
      width: 100,
      height: 100,
      min: [0, 0],
      max: [1, 1],
    });

    expect(area({ data: [], min: [0, 0], max: [1, 1], t })).toBe("");
  });

  it("generates a closed path for two points", () => {
    const data: DataSeries = [
      [0, 2],
      [2, 6],
    ];
    const min: Point = [0, 0];
    const max: Point = [2, 6];
    const t = translate({ width: 20, height: 10, min, max });

    expect(area({ data, min, max, t })).toBe(
      "M 0,10 L 0,6.666666666666667 L 0,6.666666666666667 C 6.666666666666667,4.444444444444445 13.333333333333334,2.2222222222222223 20,0 L 20,10 Z",
    );
  });

  it("generates smooth curve commands for datasets with three or more points", () => {
    const data: DataSeries = [
      [0, 2],
      [1, 6],
      [2, 6],
      [3, 10],
    ];
    const min: Point = [0, 0];
    const max: Point = [3, 10];
    const t = translate({ width: 30, height: 10, min, max });

    const d = area({ data, min, max, t });

    expect(d).toContain("M 0,10 L 0,8 L 0,8");
    expect(d.match(/ C /g)!.length).toBe(3);
    expect(d.endsWith(" L 30,10 Z")).toBe(true);
  });
});
