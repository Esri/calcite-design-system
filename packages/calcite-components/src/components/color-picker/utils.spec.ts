import {
  colorEqual,
  hexToRGB,
  isLonghandHex,
  isShorthandHex,
  isValidHex,
  normalizeHex,
  parseMode,
  rgbToHex,
} from "./utils";
import Color from "color";

describe("utils", () => {
  it("can parse supported color modes", () => {
    expect(parseMode("#abc")).toBe("hex");
    expect(parseMode("#aabbcc")).toBe("hex");
    expect(parseMode("#caca")).toBe("hexa");
    expect(parseMode("#cacacaca")).toBe("hexa");
    expect(parseMode("rgb(214, 122, 127)")).toBe("rgb-css");
    expect(parseMode("rgba(34, 12, 64, 0.6)")).toBe("rgba-css");
    expect(parseMode("hsl(30, 100%, 50%)")).toBe("hsl-css");
    expect(parseMode("hsla(30, 100%, 50%, .3)")).toBe("hsla-css");
    expect(parseMode("unknown")).toBeNull();
    expect(parseMode({ r: 255, g: 255, b: 255 })).toBe("rgb");
    expect(parseMode({ r: 255, g: 255, b: 255, a: 0.5 })).toBe("rgba");
    expect(parseMode({ h: 255, s: 255, l: 255 })).toBe("hsl");
    expect(parseMode({ h: 255, s: 255, l: 255, a: 0.5 })).toBe("hsla");
    expect(parseMode({ h: 255, s: 255, v: 255 })).toBe("hsv");
    expect(parseMode({ h: 255, s: 255, v: 255, a: 0.5 })).toBe("hsva");

    const nonMatchingObject = {} as any;
    expect(parseMode(nonMatchingObject)).toBeNull();
  });

  it("helps compare Color instances", () => {
    expect(colorEqual(Color("#f0f"), Color({ r: 255, g: 0, b: 255 }))).toBe(true);
    expect(colorEqual(Color("rgb(255, 0, 255)"), Color({ h: 300, s: 100, v: 100 }))).toBe(true);
  });

  it("can convert hex to RGB", () => {
    expect(hexToRGB("#0f0")).toMatchObject({ r: 0, g: 255, b: 0 });
    expect(hexToRGB("#00ff00")).toMatchObject({ r: 0, g: 255, b: 0 });
    expect(hexToRGB("0f0")).toBeNull();
    expect(hexToRGB("00ff00")).toBeNull();

    expect(hexToRGB("#0f0f", true)).toMatchObject({ r: 0, g: 255, b: 0, a: 1 });
    expect(hexToRGB("#00ff00ff", true)).toMatchObject({ r: 0, g: 255, b: 0, a: 1 });
  });

  it("can convert RGB to hex", () => {
    expect(
      rgbToHex({
        r: 0,
        g: 255,
        b: 0,
      })
    ).toBe("#00ff00");

    expect(
      rgbToHex({
        r: 0,
        g: 255,
        b: 0,
        a: 1,
      })
    ).toBe("#00ff00ff");
  });

  it("can determine shorthand hex", () => {
    expect(isShorthandHex("#0f0")).toBe(true);
    expect(isShorthandHex("")).toBe(false);
    expect(isShorthandHex("#")).toBe(false);
    expect(isShorthandHex("#0")).toBe(false);
    expect(isShorthandHex("#0f")).toBe(false);
    expect(isShorthandHex("#0f00")).toBe(false);
    expect(isShorthandHex("#00ff00")).toBe(false);

    expect(isShorthandHex("#0f0f", true)).toBe(true);
    expect(isShorthandHex("", true)).toBe(false);
    expect(isShorthandHex("#", true)).toBe(false);
    expect(isShorthandHex("#0", true)).toBe(false);
    expect(isShorthandHex("#0f", true)).toBe(false);
    expect(isShorthandHex("#0f0", true)).toBe(false);
    expect(isShorthandHex("#0f0f0", true)).toBe(false);
    expect(isShorthandHex("#00ff00", true)).toBe(false);
  });

  it("can normalize hex", () => {
    expect(normalizeHex("#f00")).toBe("#ff0000");
    expect(normalizeHex("f00")).toBe("#ff0000");
    expect(normalizeHex("#ff0000")).toBe("#ff0000");
    expect(normalizeHex("ff0000")).toBe("#ff0000");

    expect(normalizeHex("#f00f", true)).toBe("#ff0000ff");
    expect(normalizeHex("f00f", true)).toBe("#ff0000ff");
    expect(normalizeHex("#ff0000ff", true)).toBe("#ff0000ff");
    expect(normalizeHex("ff0000ff", true)).toBe("#ff0000ff");

    expect(normalizeHex("#f00", true, true)).toBe("#ff0000ff");
    expect(normalizeHex("f00", true, true)).toBe("#ff0000ff");
    expect(normalizeHex("#ff0000", true, true)).toBe("#ff0000ff");
    expect(normalizeHex("ff0000", true, true)).toBe("#ff0000ff");
  });

  it("can validate hex", () => {
    expect(isValidHex("#ff0")).toBe(true);
    expect(isValidHex("#ffff00")).toBe(true);
    expect(isValidHex("")).toBe(false);
    expect(isValidHex("#")).toBe(false);
    expect(isValidHex("#f")).toBe(false);
    expect(isValidHex("#f0")).toBe(false);
    expect(isValidHex("#ff00")).toBe(false);
    expect(isValidHex("#ffff0")).toBe(false);
    expect(isValidHex("#ffff000")).toBe(false);
    expect(isValidHex("ff0")).toBe(false);
    expect(isValidHex("ffff00")).toBe(false);

    expect(isValidHex("#ff00", true)).toBe(true);
    expect(isValidHex("#ffff0000", true)).toBe(true);
    expect(isValidHex("")).toBe(false);
    expect(isValidHex("#")).toBe(false);
    expect(isValidHex("#f")).toBe(false);
    expect(isValidHex("#f0", true)).toBe(false);
    expect(isValidHex("#ff0", true)).toBe(false);
    expect(isValidHex("#ffff0", true)).toBe(false);
    expect(isValidHex("#ffff000", true)).toBe(false);
    expect(isValidHex("ff00", true)).toBe(false);
    expect(isValidHex("ffff0000", true)).toBe(false);
  });

  it("can determine longhand hex", () => {
    expect(isLonghandHex("#00ff00")).toBe(true);
    expect(isLonghandHex("")).toBe(false);
    expect(isLonghandHex("#")).toBe(false);
    expect(isLonghandHex("#0f")).toBe(false);
    expect(isLonghandHex("#0f0")).toBe(false);
    expect(isLonghandHex("#00ff")).toBe(false);
    expect(isLonghandHex("#00ff0")).toBe(false);
    expect(isLonghandHex("#00ff000")).toBe(false);

    expect(isLonghandHex("#00ff00ff", true)).toBe(true);
    expect(isLonghandHex("", true)).toBe(false);
    expect(isLonghandHex("#", true)).toBe(false);
    expect(isLonghandHex("#0", true)).toBe(false);
    expect(isLonghandHex("#0f", true)).toBe(false);
    expect(isLonghandHex("#0f0", true)).toBe(false);
    expect(isLonghandHex("#0f0f", true)).toBe(false);
    expect(isLonghandHex("#00ff00", true)).toBe(false);
    expect(isLonghandHex("#00ff00f", true)).toBe(false);
    expect(isLonghandHex("#00ff00ff0", true)).toBe(false);
  });
});
