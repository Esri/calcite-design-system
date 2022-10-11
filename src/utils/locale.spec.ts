import { delocalizeNumberString, localizeNumberString, locales, numberStringFormatter } from "./locale";

const localesWithIssues = ["ar"]; // arabic has different numeral characters

describe("localizeNumberString and delocalizeNumberString", () => {
  locales
    .filter((locale) => !localesWithIssues.includes(locale))
    .forEach((locale) => {
      it(`integers localize and delocalize in "${locale}"`, () => {
        const numberString = "555";
        const localizedNumberString = localizeNumberString(numberString, locale);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`negative numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "-123";
        const localizedNumberString = localizeNumberString(numberString, locale);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`floating point numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "4.321";
        const localizedNumberString = localizeNumberString(numberString, locale);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`exponential numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "2.5e-3";
        const localizedNumberString = localizeNumberString(numberString, locale);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "1,234";
        const localizedNumberString = localizeNumberString(numberString, locale, true);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe("1234");
      });

      it(`floating point numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "12,345,678.9";
        const localizedNumberString = localizeNumberString(numberString, locale, true);
        const delocalizedNumberString = delocalizeNumberString(localizedNumberString, locale);
        expect(delocalizedNumberString).toBe("12345678.9");
      });
    });
});

describe("NumberStringFormat", () => {
  locales
    .filter((locale) => !localesWithIssues.includes(locale))
    .forEach((locale) => {
      it(`integers localize and delocalize in "${locale}"`, () => {
        const numberString = "555";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: false
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`negative numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "-123";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: false
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`floating point numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "4.321";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: false
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`exponential numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "2.5e-3";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: false
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "1234";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: true
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe("1234");
      });

      it(`floating point numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "12345678.9";
        numberStringFormatter.setOptions({
          locale,
          numberingSystem: "latn",
          useGrouping: true
        });
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe("12345678.9");
      });
    });
});
