import {
  locales,
  numberingSystems,
  numberStringFormatter,
  defaultLocale,
  defaultNumberingSystem,
  NumberStringFormatOptions
} from "./locale";

describe("NumberStringFormat", () => {
  it("NumberFormat formatter is not initialized until necessary", () => {
    const num = "123.456";

    // should still work with options set
    expect(numberStringFormatter.numberFormatOptions).toBeUndefined();
    expect(numberStringFormatter.delocalize(numberStringFormatter.localize(num))).toBe(num);

    // adding the default locale/numberingSystem should
    // not create the formatter
    numberStringFormatter.numberFormatOptions = {
      locale: defaultLocale,
      numberingSystem: defaultNumberingSystem
    };
    expect(numberStringFormatter.numberFormatter).toBeUndefined();
    expect(numberStringFormatter.numberFormatOptions).toBeUndefined();

    // setting a non-locale/numberingSystem option creates the formatter
    // with the default locale/numberingSystem values
    numberStringFormatter.numberFormatOptions = {
      useGrouping: true
    } as NumberStringFormatOptions;

    expect(numberStringFormatter.numberFormatter).toBeDefined();
    expect(numberStringFormatter.numberFormatOptions.numberingSystem).toBe(defaultNumberingSystem);
    expect(numberStringFormatter.numberFormatOptions.locale).toBe(defaultLocale);
  });

  describe("locales", () => {
    locales.forEach((locale) => {
      it(`integers localize and delocalize in "${locale}"`, () => {
        const numberString = "555";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`negative numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "-123";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`locale: floating point numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "4.321";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`exponential numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "2.5e-3";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "1234567890";
        numberStringFormatter.numberFormatOptions = {
          locale,
          // the group separator is different in arabic depending on the numberingSystem
          numberingSystem: locale === "ar" ? "arab" : "latn",
          useGrouping: true
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`floating point numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "12345678.0123456789";
        numberStringFormatter.numberFormatOptions = {
          locale,
          // the group separator is different in arabic depending on the numberingSystem
          numberingSystem: locale === "ar" ? "arab" : "latn",
          useGrouping: true
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });
    });
  });

  describe("numberingSystems", () => {
    numberingSystems.forEach((numberingSystem) => {
      const numberString = "0.0123456789";
      it(`floating point numbers with group separators localize and delocalize in "${numberingSystem}"`, () => {
        numberStringFormatter.numberFormatOptions = {
          locale: numberingSystem === "arab" ? "ar" : "en",
          numberingSystem,
          useGrouping: true
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });
    });
  });
});
