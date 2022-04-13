import { sanitizeDecimalString, sanitizeExponentialNumberString } from "./number";
import { isValidNumber } from "./number";

export const locales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-CH",
  "el",
  "en",
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
];

function createLocaleNumberFormatter(locale: string): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  });
}

export function delocalizeNumberString(numberString: string, locale: string): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    const allDecimalsExceptLast = new RegExp(`[.](?=.*[.])`, "g");
    const delocalizedNumberString = nonExpoNumString
      .replace(getDecimalSeparator(locale), ".")
      .replace(getMinusSign(locale), "-")
      .replace(allDecimalsExceptLast, "")
      .replace(/[^0-9\-\.]/g, ""); // remove everything except numbers, minus signs, and decimals

    return isValidNumber(delocalizedNumberString) ? delocalizedNumberString : nonExpoNumString;
  });
}

export function getGroupSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567);
  const value = parts.find((part) => part.type === "group")?.value;
  return value ? value.trim() : "";
}

export function getDecimalSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1.1);
  const value = parts.find((part) => part.type === "decimal")?.value;
  return value ? value.trim() : "";
}

export function getMinusSign(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(-9);
  const value = parts.find((part) => part.type === "minusSign")?.value;
  return value ? value.trim() : "";
}

export function localizeNumberString(numberString: string, locale: string, displayGroupSeparator = false): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    if (nonExpoNumString) {
      const number = Number(sanitizeDecimalString(nonExpoNumString));
      if (!isNaN(number)) {
        const formatter = createLocaleNumberFormatter(locale);
        const parts = formatter.formatToParts(number);
        const localizedNumberString = parts
          .map(({ type, value }) => {
            switch (type) {
              case "group":
                return displayGroupSeparator ? getGroupSeparator(locale) : "";
              case "decimal":
                return getDecimalSeparator(locale);
              case "minusSign":
                return getMinusSign(locale);
              default:
                return value;
            }
          })
          .reduce((string, part) => string + part);
        return localizedNumberString;
      }
    }
    return nonExpoNumString;
  });
}
