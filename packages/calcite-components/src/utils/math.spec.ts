import { clamp, decimalPlaces, remap } from "./math";

describe("clamp", () => {
  it("clamps numbers within min/max", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });
});

describe("decimalPlaces", () => {
  it("returns largest number", () => {
    expect(decimalPlaces(123)).toBe(0);
    expect(decimalPlaces(123.123)).toBe(3);
  });
});

describe("remap", () => {
  it("remaps numbers", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
    expect(remap(0, -100, 100, 0, 100)).toBe(50);
    expect(remap(0.5, 0, 1, 0, 100)).toBe(50);
  });
});
