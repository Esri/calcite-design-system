import { delocalizeNumberString, localizeNumberString, locales } from "./locale";

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
        const numberString = "1.05";
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
    });
});
