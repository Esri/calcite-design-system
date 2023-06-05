import { clamp, decimalPlaces } from "./math";

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
