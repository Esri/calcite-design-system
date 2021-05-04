export const locales = [
  "ar",
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
  if (numberString) {
    const groupSeparator = getGroupSeparator(locale);
    const decimalSeparator = getDecimalSeparator(locale);

    const splitNumberString = numberString.split("");
    const decimalIndex = splitNumberString.lastIndexOf(decimalSeparator);

    const delocalizedNumberString = splitNumberString
      .map((value, index) => {
        if (value === groupSeparator || (value === decimalSeparator && index !== decimalIndex)) {
          return "";
        }
        return value;
      })
      .reduce((string, part) => string + part)
      .replace(decimalSeparator, ".");

    return isNaN(Number(delocalizedNumberString)) ? numberString : delocalizedNumberString;
  }
  return numberString;
}

export function getGroupSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "group").value;
  return value.trim().length === 0 ? " " : value;
}

export function getDecimalSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "decimal").value;
  return value.trim().length === 0 ? " " : value;
}

export function localizeNumberString(numberString: string, locale: string, displayGroupSeparator = false): string {
  if (numberString) {
    const number = Number(sanitizeDecimalString(numberString));
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
            default:
              return value;
          }
        })
        .reduce((string, part) => string + part);
      return localizedNumberString;
    }
  }
  return numberString;
}

export function sanitizeDecimalString(decimalString: string): string {
  return decimalString?.endsWith(".") ? decimalString.replace(".", "") : decimalString;
}
