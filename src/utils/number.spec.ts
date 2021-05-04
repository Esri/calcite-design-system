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
    expect(parseNumberString()).toBe(null);
    expect(parseNumberString("")).toBe(null);
    expect(parseNumberString(undefined)).toBe(null);
    expect(parseNumberString(null)).toBe(null);
    expect(parseNumberString("text only")).toBe(null);

    const lettersAndSymbols = "kjas;lkjwo;aiej(*&,asd;flkj-";
    const lettersAndSymbolsWithLeadingNegativeSign = "-ASDF(*^LKJihsdf*&^";

    expect(parseNumberString(lettersAndSymbols)).toBe(null);
    expect(parseNumberString(lettersAndSymbolsWithLeadingNegativeSign)).toBe(null);
  });

  it("returns valid number string for string values that compute to a valid number", () => {
    const stringWithLettersAndDigits = "lkj2323lkj";
    const frenchNumber = "1 2345,67";
    const positiveInteger = "123345345";
    const stringWithLettersDigitsAndSymbols = "123sdfa34345klndfsi8*&(^asdf5345";
    const decimal = "123123.234234";
    const stringWithLettersAndDecimal = "12asdfas$%@$3123.23asdf2a4234";
    const stringWithLettersDecimalAndNonLeadingNegativeSign = "12a-sdfas$%@$3123.23asdf2a4234";
    const stringWithLettersDecimalAndLeadingNegativeSign = "-12a-sdfas$%@$3123.23asdf2a4234";

    expect(parseNumberString(stringWithLettersAndDigits)).toBe("2323");
    expect(parseNumberString(frenchNumber)).toBe("1234567");
    expect(parseNumberString(positiveInteger)).toBe(positiveInteger);
    expect(parseNumberString(stringWithLettersDigitsAndSymbols)).toBe("1233434585345");
    expect(parseNumberString(decimal)).toBe(decimal);
    expect(parseNumberString(stringWithLettersAndDecimal)).toBe("123123.2324234");
    expect(parseNumberString(stringWithLettersDecimalAndNonLeadingNegativeSign)).toBe("123123.2324234");
    expect(parseNumberString(stringWithLettersDecimalAndLeadingNegativeSign)).toBe("-123123.2324234");
  });
});
