import { isValidHex } from "../calcite-color/utils";
import { stringToHex } from "./utils";

describe("stringToHex", () => {
  it("generates a consistent hex", () => {
    expect(stringToHex("testing")).toEqual(stringToHex("testing"));
  });
  it("handles empty input", () => {
    expect(stringToHex("")).toBeTruthy();
  });
  it("generates a valid hex color, regardless of input", () => {
    expect(isValidHex(stringToHex("hey dude"))).toBe(true);
    expect(isValidHex(stringToHex("numbe8972983767869891823"))).toBe(true);
    expect(isValidHex(stringToHex("asdf8798768657476876yashjkdfbasd"))).toBe(true);
    expect(isValidHex(stringToHex(")#@$%*@^#&%$(^!)@*)#$*!%"))).toBe(true);
    expect(isValidHex(stringToHex("0"))).toBe(true);
    expect(isValidHex(stringToHex("##########"))).toBe(true);
    expect(isValidHex(stringToHex("키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다"))).toBe(true);
    expect(isValidHex(stringToHex("✨🌈"))).toBe(true);
  });
});
