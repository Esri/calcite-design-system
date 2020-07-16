import { parseMode } from "./utils";

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
    expect(parseMode(null)).toBeNull();
  });
});
