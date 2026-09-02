import { describe, expect, it } from "vitest";
import { getIconScale, inlineEditConverter } from "./component";

describe("inlineEditConverter", () => {
  it("converts inline-edit attribute values", () => {
    expect(inlineEditConverter.fromAttribute(null)).toBe(false);
    expect(inlineEditConverter.fromAttribute("")).toBe(true);
    expect(inlineEditConverter.fromAttribute("controls-disabled")).toBe("controls-disabled");
  });

  it("reflects inline-edit values", () => {
    expect(inlineEditConverter.toAttribute(false)).toBeNull();
    expect(inlineEditConverter.toAttribute(true)).toBe("");
    expect(inlineEditConverter.toAttribute("controls-disabled")).toBe("controls-disabled");
  });
});

describe("getIconScale", () => {
  it('should return "m" when input is "l"', () => {
    expect(getIconScale("l")).toBe("m");
  });

  it('should return "s" when input is not "l"', () => {
    expect(getIconScale("m")).toBe("s");
    expect(getIconScale("s")).toBe("s");
  });
});
