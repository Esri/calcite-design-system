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

  it("returns the amount of non-zero decimal places for a given number string", () => {
    expect(decimalPlaces("0")).toBe(0);
    expect(decimalPlaces("0.0")).toBe(0);
    expect(decimalPlaces("0.00")).toBe(0);
    expect(decimalPlaces("0.000")).toBe(0);
    expect(decimalPlaces("0.1")).toBe(1);
    expect(decimalPlaces("0.01")).toBe(2);
    expect(decimalPlaces("0.001")).toBe(3);
    expect(decimalPlaces("0.0001")).toBe(4);
  });

  it("returns the amount of decimal places for a number representation of a decimal", () => {
    expect(decimalPlaces(0)).toBe(0);
    expect(decimalPlaces(0.0)).toBe(0);
    expect(decimalPlaces(0.1)).toBe(1);
    expect(decimalPlaces(0.01)).toBe(2);
    expect(decimalPlaces(0.001)).toBe(3);
    expect(decimalPlaces(0.0001)).toBe(4);
  });
});
