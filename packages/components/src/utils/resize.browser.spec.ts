import { describe, it, expect } from "vitest";
import { ariaValueFromSize } from "./resize";

describe("ariaValueFromSize", () => {
  it("returns block value as string when isBlockPosition is true and blockValue is not null", () => {
    expect(ariaValueFromSize(true, 42, 100)).toBe("42");
    expect(ariaValueFromSize(true, 0, 100)).toBe("0");
  });

  it("returns inline value as string when isBlockPosition is false and inlineValue is not null", () => {
    expect(ariaValueFromSize(false, 42, 100)).toBe("100");
    expect(ariaValueFromSize(false, 42, 0)).toBe("0");
  });

  it("returns undefined if blockValue is null when isBlockPosition is true", () => {
    expect(ariaValueFromSize(true, null, 100)).toBeUndefined();
  });

  it("returns undefined if inlineValue is null when isBlockPosition is false", () => {
    expect(ariaValueFromSize(false, 42, null)).toBeUndefined();
  });

  it("returns undefined if both values are null", () => {
    expect(ariaValueFromSize(true, null, null)).toBeUndefined();
    expect(ariaValueFromSize(false, null, null)).toBeUndefined();
  });
});
