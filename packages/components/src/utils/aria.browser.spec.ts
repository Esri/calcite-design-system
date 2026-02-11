import { describe, it, expect } from "vitest";
import { ariaValueFromSize } from "./aria";

describe("toAriaBoolean()", () => {
  it("handles truthy values", () => {
    expect(toAriaBoolean(true)).toBe("true");
  });

  it("handles falsy values", () => {
    expect(toAriaBoolean(false)).toBe("false");
    expect(toAriaBoolean(null)).toBe("false");
    expect(toAriaBoolean(undefined)).toBe("false");
  });
});

describe("ariaValueFromSize", () => {
  it("returns block value as string when axis is 'block' and blockValue is not null", () => {
    expect(ariaValueFromSize("block", 42, 100)).toBe("42");
    expect(ariaValueFromSize("block", 0, 100)).toBe("0");
  });

  it("returns inline value as string when axis is 'inline' and inlineValue is not null", () => {
    expect(ariaValueFromSize("inline", 42, 100)).toBe("100");
    expect(ariaValueFromSize("inline", 42, 0)).toBe("0");
  });

  it("returns undefined if blockValue is null when axis is 'block'", () => {
    expect(ariaValueFromSize("block", null, 100)).toBeUndefined();
  });

  it("returns undefined if inlineValue is null when axis is 'inline'", () => {
    expect(ariaValueFromSize("inline", 42, null)).toBeUndefined();
  });

  it("returns undefined if both values are null", () => {
    expect(ariaValueFromSize("block", null, null)).toBeUndefined();
    expect(ariaValueFromSize("inline", null, null)).toBeUndefined();
  });
});
