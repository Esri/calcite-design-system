import { describe, expect, it } from "vitest";
import { calculateMaxItems, getOverflowCount } from "./overflow";

describe("calculateMaxItems", () => {
  it("should return the total number of items if all items fit within the container", () => {
    const result = calculateMaxItems({
      bufferSize: 0,
      containerSize: 100,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(3);
  });

  it("should return the correct number of items that fit when some items overflow", () => {
    const result = calculateMaxItems({
      bufferSize: 0,
      containerSize: 50,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(2);
  });

  it("should return 0 if no items fit within the container", () => {
    const result = calculateMaxItems({
      bufferSize: 0,
      containerSize: 10,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(0);
  });

  it("should account for the buffer size when calculating the maximum items", () => {
    const result = calculateMaxItems({
      bufferSize: 10,
      containerSize: 50,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(1);
  });

  it("should return 0 if the container size is less than or equal to the buffer size", () => {
    const result = calculateMaxItems({
      bufferSize: 50,
      containerSize: 50,
      itemSizes: [20, 30, 40],
    });
    expect(result).toBe(0);
  });

  it("should return the total number of items if the itemSizes array is empty", () => {
    const result = calculateMaxItems({
      bufferSize: 0,
      containerSize: 100,
      itemSizes: [],
    });
    expect(result).toBe(0);
  });
});

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
    expect(result).toBe(2);
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
    expect(result).toBe(3);
  });

  it("should handle edge case where containerSize is exactly the sum of itemSizes", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 90,
      itemSizes: [30, 30, 30],
    });
    expect(result).toBe(0);
  });

  it("should handle edge case where containerSize is slightly less than the sum of itemSizes", () => {
    const result = getOverflowCount({
      bufferSize: 0,
      containerSize: 89,
      itemSizes: [30, 30, 30],
    });
    expect(result).toBe(1);
  });
});
