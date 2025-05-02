import { describe, expect, it } from "vitest";
import { getOverflowCount } from "./overflow";

describe("getOverflowCount", () => {
  it("should return 0 when no items overflow", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 100,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(0);
  });

  it("should return the correct number of overflowing items", () => {
    const result = getOverflowCount({
      bufferSize: 10,
      containerSize: 100,
      itemSizes: [30, 40, 50, 20],
    });
    expect(result).toBe(1); // Only the last item overflows
  });

  it("should return the total number of items when all overflow", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 10,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(3);
  });

  it("should return 0 when itemSizes is empty", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 100,
      itemSizes: [],
    });
    expect(result).toBe(0);
  });

  it("should handle edge case where bufferSize is larger than containerSize", () => {
    const result = getOverflowCount({
      bufferSize: 150,
      containerSize: 100,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(3); // All items overflow
  });

  it("should handle edge case where containerSize is exactly the sum of itemSizes", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 90,
      itemSizes: [30, 30, 30],
    });
    expect(result).toBe(0); // No items overflow
  });

  it("should handle edge case where containerSize is slightly less than the sum of itemSizes", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 89,
      itemSizes: [30, 30, 30],
    });
    expect(result).toBe(1); // One item overflows
  });
});
