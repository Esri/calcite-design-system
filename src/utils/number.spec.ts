import { isValidNumber, parseNumberString, sanitizeNumberString } from "./number";

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
    expect(parseNumberString("no nums")).toBe(null);

    const lettersAndSymbols = "kjas;lkjwo;aij(*&,asd;flkj-";
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

describe("sanitizeNumberString", () => {
  it("sanitizes exponential numbers, leading zeros, multiple dashes, and trailing decimals", () => {
    const stringWithMultipleDashes = "1--2-34----";
    const negativeStringWithMultipleDashes = "---1--23--4---";
    const stringWithLeadingZeros = "0000000";
    const stringWithoutLeadingZeros = "10000000";
    const stringWithTrailingDecimal = "123.";
    const stringWithDecimal = "123.45";
    const exponentialString = "2.5e123";
    const negativeExponentialString = "-2.5e-1--2--3";
    const multipleEString = "2e4ee2421e";
    const singleEString = "E";
    const leadingEString = "E5";
    const trailingEString = "12E";
    const leadingZeroExponentialString = "000005e00006";
    const nonLeadingZeroExponentialString = "500000e00600";
    const multiDecimalExponentialString = "1.2e2.1";
    const crazyExponentialString = "-2-.-1ee.5-3e.1..e--09";

    expect(sanitizeNumberString(stringWithMultipleDashes)).toBe("1234");
    expect(sanitizeNumberString(negativeStringWithMultipleDashes)).toBe("-1234");
    expect(sanitizeNumberString(stringWithLeadingZeros)).toBe("0");
    expect(sanitizeNumberString(stringWithoutLeadingZeros)).toBe("10000000");
    expect(sanitizeNumberString(stringWithTrailingDecimal)).toBe("123");
    expect(sanitizeNumberString(stringWithDecimal)).toBe("123.45");
    expect(sanitizeNumberString(exponentialString)).toBe("2.5e123");
    expect(sanitizeNumberString(negativeExponentialString)).toBe("-2.5e-123");
    expect(sanitizeNumberString(multipleEString)).toBe("2e42421");
    expect(sanitizeNumberString(singleEString)).toBe("");
    expect(sanitizeNumberString(leadingEString)).toBe("1e5");
    expect(sanitizeNumberString(trailingEString)).toBe("12");
    expect(sanitizeNumberString(leadingZeroExponentialString)).toBe("5e6");
    expect(sanitizeNumberString(nonLeadingZeroExponentialString)).toBe("500000e600");
    expect(sanitizeNumberString(multiDecimalExponentialString)).toBe("1.2e21");
    expect(sanitizeNumberString(crazyExponentialString)).toBe("-2.1e53109");
  });
});
