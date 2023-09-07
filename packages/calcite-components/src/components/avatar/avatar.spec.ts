import { isValidHex } from "../color-picker/utils";
import { hexToHue, rgbToHue, stringToHex } from "./utils";

describe("stringToHex", () => {
  it("generates a consistent hex", () => {
    expect(stringToHex("testing")).toEqual(stringToHex("testing"));
  });
  it("handles empty input", () => {
    expect(stringToHex("")).toBeTruthy();
  });
  it("generates a valid hex color, regardless of input", () => {
    expect(isValidHex(stringToHex("hey dude"))).toBe(true);
    expect(isValidHex(stringToHex("number8972983767869891823"))).toBe(true);
    expect(isValidHex(stringToHex("asdf8798768657476876yashjkdfbasd"))).toBe(true);
    expect(isValidHex(stringToHex(")#@$%*@^#&%$(^!)@*)#$*!%"))).toBe(true);
    expect(isValidHex(stringToHex("0"))).toBe(true);
    expect(isValidHex(stringToHex("##########"))).toBe(true);
    expect(isValidHex(stringToHex("키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다"))).toBe(true);
    expect(isValidHex(stringToHex("✨🌈"))).toBe(true);
  });
});

describe("rgbToHue", () => {
  it("correctly finds hue of various rgb colors", () => {
    expect(rgbToHue({ r: 0, g: 0, b: 0 })).toEqual(0);
    expect(rgbToHue({ r: 255, g: 255, b: 255 })).toEqual(0);
    expect(rgbToHue({ r: 255, g: 0, b: 0 })).toEqual(0);
    expect(rgbToHue({ r: 0, g: 255, b: 0 })).toEqual(120);
    expect(rgbToHue({ r: 0, g: 0, b: 255 })).toEqual(240);
    expect(rgbToHue({ r: 18, g: 77, b: 123 })).toEqual(206);
    expect(rgbToHue({ r: 214, g: 90, b: 45 })).toEqual(16);
    expect(rgbToHue({ r: 160, g: 123, b: 45 })).toEqual(41);
  });
});

describe("hexToHue", () => {
  it("correctly finds hue of various hex colors", () => {
    expect(hexToHue("#a07b2d")).toEqual(41);
    expect(hexToHue("#44ed51")).toEqual(125);
    expect(hexToHue("#151515")).toEqual(0);
    expect(hexToHue("#ffc800")).toEqual(47);
    expect(hexToHue("#47bbff")).toEqual(202);
    expect(hexToHue("#ffffff")).toEqual(0);
  });
});
