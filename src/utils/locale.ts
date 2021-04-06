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

export function delocalizeNumberString(stringNumber: string, locale: string): string {
  if (stringNumber && locales.includes(locale)) {
    return stringNumber
      .replace(getGroupSeparator(locale), "")
      .replace(getDecimalSeparator(locale), ".")
      .replace(" ", "")
      .trim();
  }
  return;
}

export function getGroupSeparator(locale: string): string {
  if (locales.includes(locale)) {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234567.8);
    const value = parts.find((part) => part.type === "group").value;
    return value.trim().length === 0 ? " " : value;
  }
  return ",";
}

export function getDecimalSeparator(locale: string): string {
  if (locales.includes(locale)) {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1234567.8);
    const value = parts.find((part) => part.type === "decimal").value;
    return value.trim().length === 0 ? " " : value;
  }
  return ".";
}
