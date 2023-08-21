import { locales, numberStringFormatter } from "./locale";
import {
  BigDecimal,
  addLocalizedTrailingDecimalZeros,
  expandExponentialNumberString,
  isValidNumber,
  parseNumberString,
  sanitizeNumberString,
} from "./number";

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
  it("returns empty string for string values that can't compute to a number", () => {
    expect(parseNumberString()).toBe("");
    expect(parseNumberString(null)).toBe("");
    expect(parseNumberString(undefined)).toBe("");
    expect(parseNumberString("")).toBe("");
    expect(parseNumberString("only numbers")).toBe("");

    const lettersAndSymbols = "kjas;lkjwo;aij(*&,asd;flkj-";
    const lettersAndSymbolsWithLeadingNegativeSign = "-ASDF(*^LKJihsdf*&^";

    expect(parseNumberString(lettersAndSymbols)).toBe("");
    expect(parseNumberString(lettersAndSymbolsWithLeadingNegativeSign)).toBe("");
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
    const stringWithOnlyZeros = "0000000";
    const stringWithLeadingZeros = "00000001";
    const negativeStringWithLeadingZeros = "-00001";
    const negativeDecimalStringWithLeadingZeros = "-00001.0001";
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
    const trailingDecimalZeros = "0.110000";

    expect(sanitizeNumberString(stringWithMultipleDashes)).toBe("1234");
    expect(sanitizeNumberString(negativeStringWithMultipleDashes)).toBe("-1234");
    expect(sanitizeNumberString(stringWithOnlyZeros)).toBe("0");
    expect(sanitizeNumberString(stringWithLeadingZeros)).toBe("1");
    expect(sanitizeNumberString(negativeStringWithLeadingZeros)).toBe("-1");
    expect(sanitizeNumberString(negativeDecimalStringWithLeadingZeros)).toBe("-1.0001");
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
    expect(sanitizeNumberString(trailingDecimalZeros)).toBe("0.110000");
  });
});

describe("BigDecimal", () => {
  it("handles precise/large numbers and arbitrary-precision arithmetic", () => {
    const subtract = new BigDecimal("0.3").subtract("0.1").toString();
    expect(subtract).toBe("0.2");

    const add = new BigDecimal(Number.MAX_SAFE_INTEGER.toString()).add("1").toString();
    expect(Number(add)).toBeGreaterThan(Number.MAX_SAFE_INTEGER);

    const negativeZero = new BigDecimal("-0").toString();
    expect(negativeZero).toBe("-0");
  });

  it("correctly formats long decimal numbers", () => {
    numberStringFormatter.numberFormatOptions = {
      locale: "en",
      numberingSystem: "latn",
      useGrouping: true,
    };
    expect(new BigDecimal("123.0123456789").format(numberStringFormatter)).toBe("123.0123456789");
  });

  locales.forEach((locale) => {
    it(`correctly localizes number parts - ${locale}`, () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        // the group separator is different in arabic depending on the numberingSystem
        numberingSystem: locale === "ar" ? "arab" : "latn",
        useGrouping: true,
      };

      const parts = new BigDecimal("-12345678.9").formatToParts(numberStringFormatter);
      const groupPart = parts.find((part) => part.type === "group").value;
      expect(groupPart.trim().length === 0 || groupPart === " " ? "\u00A0" : groupPart).toBe(
        numberStringFormatter.group
      );
      expect(parts.find((part) => part.type === "decimal").value).toBe(numberStringFormatter.decimal);
      expect(parts.find((part) => part.type === "minusSign").value).toBe(numberStringFormatter.minusSign);
    });
  });
});

describe("expandExponentialNumberString", () => {
  it("integer based exponential numbers", () => {
    expect(expandExponentialNumberString("123e4")).toBe("1230000");
    expect(expandExponentialNumberString("1e50")).toBe("100000000000000000000000000000000000000000000000000");
  });
  it("decimal based exponential number strings", () => {
    expect(expandExponentialNumberString(".987e0")).toBe("0.987");
    expect(expandExponentialNumberString(".00000000000000000000000000000000000000000000000001e50")).toBe("1");
    expect(expandExponentialNumberString("1.2345678987654321000000000000000000000000000000000000000000e16")).toBe(
      "12345678987654321"
    );
  });
  it("exponential number strings with negative magnitude", () => {
    expect(expandExponentialNumberString("1.23e-60")).toBe(
      "0.00000000000000000000000000000000000000000000000000000000000123"
    );
    expect(expandExponentialNumberString("100000000000000000000000000000000000000000000000000e-50")).toBe("1");
  });
  it("handles non-exponential numbers", () => {
    expect(expandExponentialNumberString("1100000000000000000000000000000000000000000000000000")).toBe(
      "1100000000000000000000000000000000000000000000000000"
    );
    expect(expandExponentialNumberString("")).toBe("");
  });
});

describe("addLocalizedTrailingDecimalZeros", () => {
  function getLocalizedDecimalValue(value: string, trailingZeros: number): string {
    const localizedValue = numberStringFormatter.localize(value);
    const localizedZeroValue = numberStringFormatter.localize("0");
    return `${localizedValue}`.padEnd(localizedValue.length + trailingZeros, localizedZeroValue);
  }

  locales.forEach((locale) => {
    it(`add back sanitized trailing decimal zero values - ${locale}`, () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        // the group separator is different in arabic depending on the numberingSystem
        numberingSystem: locale === "ar" ? "arab" : "latn",
        useGrouping: true,
      };

      const stringWithTrailingZeros = "123456.1000";
      const bigDecimalWithTrailingZeros =
        "1230000000000000000000000000000.00000000000000000000045000000000000000000000000";
      const negativeExponentialString = "-10.021e10000";

      expect(
        addLocalizedTrailingDecimalZeros(
          numberStringFormatter.localize(stringWithTrailingZeros),
          stringWithTrailingZeros,
          numberStringFormatter
        )
      ).toBe(getLocalizedDecimalValue(stringWithTrailingZeros, 3));
      expect(
        addLocalizedTrailingDecimalZeros(
          numberStringFormatter.localize(bigDecimalWithTrailingZeros),
          bigDecimalWithTrailingZeros,
          numberStringFormatter
        )
      ).toBe(getLocalizedDecimalValue(bigDecimalWithTrailingZeros, 24));
      expect(
        addLocalizedTrailingDecimalZeros(
          numberStringFormatter.localize(negativeExponentialString),
          negativeExponentialString,
          numberStringFormatter
        )
      ).toBe(numberStringFormatter.localize(negativeExponentialString));
    });

    it(`returns same value if no trailing decimal zero value is removed - ${locale}`, () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        // the group separator is different in arabic depending on the numberingSystem
        numberingSystem: locale === "ar" ? "arab" : "latn",
        useGrouping: true,
      };
      const localizedValue = numberStringFormatter.localize("0.001");
      expect(addLocalizedTrailingDecimalZeros(localizedValue, "0.001", numberStringFormatter)).toBe(localizedValue);
    });
  });
});
