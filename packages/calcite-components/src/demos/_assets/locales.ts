import { NumberingSystem, SupportedLocale } from "../../utils/locale";
import { HourFormat } from "../../utils/time";

interface Locale {
  name: string;
  locale: SupportedLocale;
  dir?: "ltr" | "rtl";
  numberingSystem?: NumberingSystem;
  /*
   * Hour formats below are based on:
   * @see https://github.com/unicode-org/cldr-json/blob/main/cldr-json/cldr-core/supplemental/timeData.json
   *
   * To reference a specific locale, search for the lang code in the timeData.json file and see the "_preferred" value.
   * The value "h" generally refers to a 12-hour clock format, whereas "H" refers to a 24-hour style.
   */
  hourFormat: HourFormat;
}

export const locales: Locale[] = [
  {
    name: "Arabic",
    locale: "ar",
    dir: "rtl",
    hourFormat: "12",
  },
  {
    name: "Arabic",
    locale: "ar",
    dir: "rtl",
    numberingSystem: "arab",
    hourFormat: "12",
  },
  {
    name: "Arabic",
    locale: "ar",
    dir: "rtl",
    numberingSystem: "arabext",
    hourFormat: "12",
  },
  {
    name: "Bulgarian",
    locale: "bg",
    hourFormat: "24",
  },
  {
    name: "Bosnian",
    locale: "bs",
    hourFormat: "24",
  },
  {
    name: "Catalan",
    locale: "ca",
    hourFormat: "24",
  },
  {
    name: "Czech",
    locale: "cs",
    hourFormat: "24",
  },
  {
    name: "Danish",
    locale: "da",
    hourFormat: "24",
  },
  {
    name: "German",
    locale: "de",
    hourFormat: "24",
  },
  {
    name: "German - Austria",
    locale: "de-AT",
    hourFormat: "24",
  },
  {
    name: "German - Switzerland",
    locale: "de-CH",
    hourFormat: "24",
  },
  {
    name: "Greek",
    locale: "el",
    hourFormat: "12",
  },
  {
    name: "English",
    locale: "en",
    hourFormat: "12",
  },
  {
    name: "English - Australia",
    locale: "en-AU",
    hourFormat: "12",
  },
  {
    name: "English - Canada",
    locale: "en-CA",
    hourFormat: "12",
  },
  {
    name: "English - Great Britain",
    locale: "en-GB",
    hourFormat: "24",
  },
  {
    name: "English - United States",
    locale: "en-US",
    hourFormat: "12",
  },
  {
    name: "Spanish",
    locale: "es",
    hourFormat: "24",
  },
  {
    name: "Spanish - Mexico",
    locale: "es-MX",
    hourFormat: "12",
  },
  {
    name: "Estonian",
    locale: "et",
    hourFormat: "24",
  },
  {
    name: "Finnish",
    locale: "fi",
    hourFormat: "24",
  },
  {
    name: "French",
    locale: "fr",
    hourFormat: "24",
  },
  {
    name: "French - Switzerland",
    locale: "fr-CH",
    hourFormat: "24",
  },
  {
    name: "Hebrew",
    locale: "he",
    dir: "rtl",
    hourFormat: "24",
  },
  {
    name: "Hindi",
    locale: "hi",
    hourFormat: "12",
  },
  {
    name: "Croatian",
    locale: "hr",
    hourFormat: "24",
  },
  {
    name: "Hungarian",
    locale: "hu",
    hourFormat: "24",
  },
  {
    name: "Indonesian",
    locale: "id",
    hourFormat: "24",
  },
  {
    name: "Italian",
    locale: "it",
    hourFormat: "24",
  },
  {
    name: "Italian - Switzerland",
    locale: "it-CH",
    hourFormat: "24",
  },
  {
    name: "Japanese",
    locale: "ja",
    hourFormat: "24",
  },
  {
    name: "Korean",
    locale: "ko",
    hourFormat: "12",
  },
  {
    name: "Lithuanian",
    locale: "lt",
    hourFormat: "24",
  },
  {
    name: "Latvian",
    locale: "lv",
    hourFormat: "24",
  },
  {
    name: "Macedonian",
    locale: "mk",
    hourFormat: "24",
  },
  {
    name: "Norwegian",
    locale: "no",
    hourFormat: "24",
  },
  {
    name: "Dutch",
    locale: "nl",
    hourFormat: "24",
  },
  {
    name: "Polish",
    locale: "pl",
    hourFormat: "24",
  },
  {
    name: "Portuguese",
    locale: "pt",
    hourFormat: "24",
  },
  {
    name: "Portuguese - Brazil",
    locale: "pt-BR",
    hourFormat: "24",
  },
  {
    name: "Portuguese",
    locale: "pt-PT",
    hourFormat: "24",
  },
  {
    name: "Romanian",
    locale: "ro",
    hourFormat: "24",
  },
  {
    name: "Russian",
    locale: "ru",
    hourFormat: "24",
  },
  {
    name: "Slovak",
    locale: "sk",
    hourFormat: "24",
  },
  {
    name: "Slovenian",
    locale: "sl",
    hourFormat: "24",
  },
  {
    name: "Serbian",
    locale: "sr",
    hourFormat: "24",
  },
  {
    name: "Swedish",
    locale: "sv",
    hourFormat: "24",
  },
  {
    name: "Thai",
    locale: "th",
    hourFormat: "24",
  },
  {
    name: "Turkish",
    locale: "tr",
    hourFormat: "24",
  },
  {
    name: "Ukrainian",
    locale: "uk",
    hourFormat: "24",
  },
  {
    name: "Vietnamese",
    locale: "vi",
    hourFormat: "24",
  },
  {
    name: "Chinese",
    locale: "zh-CN",
    hourFormat: "24",
  },
  {
    name: "Chinese - Hong Kong",
    locale: "zh-HK",
    hourFormat: "12",
  },
  {
    name: "Chinese - Taiwan",
    locale: "zh-TW",
    hourFormat: "12",
  },
];
