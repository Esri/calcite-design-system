import { describe, it, expect } from "vitest";
import { ariaValueFromSize, resolveAriaLive, toAriaBoolean } from "./aria";

describe("resolveAriaLive()", () => {
  it("returns valid aria-live values", () => {
    expect(resolveAriaLive("off")).toBe("off");
    expect(resolveAriaLive("polite")).toBe("polite");
    expect(resolveAriaLive("assertive")).toBe("assertive");
  });

  it("returns undefined for unsupported values", () => {
    expect(resolveAriaLive("invalid")).toBeUndefined();
    expect(resolveAriaLive("")).toBeUndefined();
    expect(resolveAriaLive(null)).toBeUndefined();
    expect(resolveAriaLive(undefined)).toBeUndefined();
  });
});

describe("toAriaBoolean()", () => {
  it("stringifies values", () => {
    expect(toAriaBoolean(true)).toBe("true");
    expect(toAriaBoolean(false)).toBe("false");
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
