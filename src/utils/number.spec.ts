import { isValidNumber, parseNumberString } from "./number";

describe("isValidNumber", () => {
  it("returns false for string values that can't compute to a number", () => {
    expect(isValidNumber("undefined")).toBe(false);
    expect(isValidNumber(";lkj2323")).toBe(false);
    expect(isValidNumber("")).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber("null")).toBe(false);
    expect(isValidNumber("not a number")).toBe(false);
    expect(isValidNumber("1 2345,67")).toBe(false);
  });

  it("returns true for string values that compute to a valid number", () => {
    expect(isValidNumber("123345345")).toBe(true);
    expect(isValidNumber("123123.234234")).toBe(true);
  });
});

describe("parseNumberString", () => {
  it("returns null for string values that can't compute to a number", () => {
    expect(parseNumberString("undefined")).toBe(null);
    expect(parseNumberString()).toBe(null);
    expect(parseNumberString("")).toBe(null);
    expect(parseNumberString(undefined)).toBe(null);
    expect(parseNumberString(null)).toBe(null);
    expect(parseNumberString("null")).toBe(null);
    expect(parseNumberString("not a number")).toBe(null);
    expect(parseNumberString("kjas;lkjwo;aiej(*&,asd;flkj-")).toBe(null);
  });

  it("returns valid number string for string values that compute to a valid number", () => {
    expect(parseNumberString(";lkj2323")).toBe("2323");
    expect(parseNumberString("1 2345,67")).toBe("1234567");
    expect(parseNumberString("123345345")).toBe("123345345");
    expect(parseNumberString("123sdfa34345klndfsi8*&(^asdf5345")).toBe("1233434585345");
    expect(parseNumberString("123123.234234")).toBe("123123.234234");
    expect(parseNumberString("12asdfas$%@$3123.23asdf2a4234")).toBe("123123.2324234");
    expect(parseNumberString("12a-sdfas$%@$3123.23asdf2a4234")).toBe("123123.2324234");
    expect(parseNumberString("-12a-sdfas$%@$3123.23asdf2a4234")).toBe("-123123.2324234");
  });
});
