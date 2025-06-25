import { describe, expect, it } from "vitest";
import { mockConsole } from "../tests/utils/logging";
import { filter } from "./filter";

describe("filter function", () => {
  mockConsole();

  it("warns and returns empty array for empty data", () => {
    const result = filter([], "test");
    /* eslint-disable no-console -- assert on logger when converted to browser mode test */
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    /* eslint-enable no-console */
  });

  it("returns empty array when no objects match", () => {
    const data = [{ name: "John" }, { name: "Jane" }];
    const result = filter(data, "Doe");
    expect(result).toEqual([]);
  });

  it("returns matching objects", () => {
    const data = [{ name: "John" }, { name: "Jane" }];
    const result = filter(data, "Jane");
    expect(result).toEqual([{ name: "Jane" }]);
  });

  it("considers only specified fields for matching", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const result = filter(data, "25", ["age"]);
    expect(result).toEqual([{ name: "Jane", age: 25 }]);

    const result2 = filter(data, "John", ["age"]);
    expect(result2).toEqual([]);
  });

  it("ignores functions and null values in objects", () => {
    const data = [{ name: "John", action: () => {}, value: null }];
    const result = filter(data, "John");
    expect(result).toEqual([{ name: "John", action: expect.any(Function), value: null }]);
  });

  it("returns empty array when searching with 'null'", () => {
    const data = [{ name: "John", action: () => {}, value: null }];
    const result = filter(data, "null");
    expect(result).toEqual([]);
  });

  it("searches nested objects correctly", () => {
    const data = [{ name: "John", details: { age: 30 } }];
    const result = filter(data, "30");
    expect(result).toEqual([{ name: "John", details: { age: 30 } }]);
  });

  it("searches arrays in objects correctly", () => {
    const data = [{ name: "John", tags: ["developer", "tester"] }];
    const result = filter(data, "tester");
    expect(result).toEqual([{ name: "John", tags: ["developer", "tester"] }]);
  });

  it("always includes objects with filterDisabled set to true", () => {
    const data = [{ name: "John" }, { name: "Jane", filterDisabled: true }];
    const result = filter(data, "Doe");
    expect(result).toEqual([{ name: "Jane", filterDisabled: true }]);
  });

  it("always includes objects with constant set to true", () => {
    const data = [{ name: "John" }, { name: "Jane", constant: true }];
    const result = filter(data, "Doe");
    expect(result).toEqual([{ name: "Jane", constant: true }]);
  });

  it("should return all results when given an empty search string", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const result = filter(data, "");
    expect(result).toEqual(data);
  });
});
