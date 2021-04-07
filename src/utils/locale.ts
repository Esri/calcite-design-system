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

export function delocalizeNumberString(stringNumber: string, locale: string): string {
  if (stringNumber && locales.includes(locale)) {
    const number = Number(stringNumber);
    if (!isNaN(number)) {
      return stringNumber
        .replace(getGroupSeparator(locale), "")
        .replace(getDecimalSeparator(locale), ".")
        .replace(" ", "")
        .trim();
    }
  }

  return stringNumber;
}

export function getGroupSeparator(locale: string): string {
  if (!locales.includes(locale)) {
    return ",";
  }
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "group").value;
  return value.trim().length === 0 ? " " : value;
}

export function getDecimalSeparator(locale: string): string {
  if (!locales.includes(locale)) {
    return ".";
  }

  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567.8);
  const value = parts.find((part) => part.type === "decimal").value;
  return value.trim().length === 0 ? " " : value;
}

export function localizeNumberString(stringNumber: string, locale: string): string {
  if (stringNumber && locales.includes(locale)) {
    const number = Number(stringNumber);
    if (!isNaN(number)) {
      const formatter = createLocaleNumberFormatter(locale);
      const parts = formatter.formatToParts(number);
      const localizedNumberString = parts
        .map(({ type, value }) => {
          switch (type) {
            case "group":
              return getGroupSeparator(locale);
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

  return stringNumber;
}
