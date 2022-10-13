import { locales, numberStringFormatter } from "./locale";

describe("NumberStringFormat", () => {
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

    it(`floating point numbers localize and delocalize in "${locale}"`, () => {
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
      const numberString = "12345678.9";
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
