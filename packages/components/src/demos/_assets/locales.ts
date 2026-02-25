import { Locale as LocaleCode, NumberingSystem } from "../../utils/locale";
import { HourFormat } from "../../utils/time";

interface Locale {
  name: string;
  code: LocaleCode;
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
    code: "ar",
    dir: "rtl",
    hourFormat: "12",
  },
  {
    name: "Arabic",
    code: "ar",
    dir: "rtl",
    numberingSystem: "arab",
    hourFormat: "12",
  },
  {
    name: "Arabic",
    code: "ar",
    dir: "rtl",
    numberingSystem: "arabext",
    hourFormat: "12",
  },
  {
    name: "Bulgarian",
    code: "bg",
    hourFormat: "24",
  },
  {
    name: "Bosnian",
    code: "bs",
    hourFormat: "24",
  },
  {
    name: "Catalan",
    code: "ca",
    hourFormat: "24",
  },
  {
    name: "Czech",
    code: "cs",
    hourFormat: "24",
  },
  {
    name: "Danish",
    code: "da",
    hourFormat: "24",
  },
  {
    name: "German",
    code: "de",
    hourFormat: "24",
  },
  {
    name: "German - Austria",
    code: "de-AT",
    hourFormat: "24",
  },
  {
    name: "German - Switzerland",
    code: "de-CH",
    hourFormat: "24",
  },
  {
    name: "Greek",
    code: "el",
    hourFormat: "12",
  },
  {
    name: "English",
    code: "en",
    hourFormat: "12",
  },
  {
    name: "English - Australia",
    code: "en-AU",
    hourFormat: "12",
  },
  {
    name: "English - Canada",
    code: "en-CA",
    hourFormat: "12",
  },
  {
    name: "English - Great Britain",
    code: "en-GB",
    hourFormat: "24",
  },
  {
    name: "English - United States",
    code: "en-US",
    hourFormat: "12",
  },
  {
    name: "Spanish",
    code: "es",
    hourFormat: "24",
  },
  {
    name: "Spanish - Mexico",
    code: "es-MX",
    hourFormat: "12",
  },
  {
    name: "Estonian",
    code: "et",
    hourFormat: "24",
  },
  {
    name: "Finnish",
    code: "fi",
    hourFormat: "24",
  },
  {
    name: "French",
    code: "fr",
    hourFormat: "24",
  },
  {
    name: "French - Switzerland",
    code: "fr-CH",
    hourFormat: "24",
  },
  {
    name: "Hebrew",
    code: "he",
    dir: "rtl",
    hourFormat: "24",
  },
  {
    name: "Hindi",
    code: "hi",
    hourFormat: "12",
  },
  {
    name: "Croatian",
    code: "hr",
    hourFormat: "24",
  },
  {
    name: "Hungarian",
    code: "hu",
    hourFormat: "24",
  },
  {
    name: "Indonesian",
    code: "id",
    hourFormat: "24",
  },
  {
    name: "Italian",
    code: "it",
    hourFormat: "24",
  },
  {
    name: "Italian - Switzerland",
    code: "it-CH",
    hourFormat: "24",
  },
  {
    name: "Japanese",
    code: "ja",
    hourFormat: "24",
  },
  {
    name: "Korean",
    code: "ko",
    hourFormat: "12",
  },
  {
    name: "Lithuanian",
    code: "lt",
    hourFormat: "24",
  },
  {
    name: "Latvian",
    code: "lv",
    hourFormat: "24",
  },
  {
    name: "Macedonian",
    code: "mk",
    hourFormat: "24",
  },
  {
    name: "Norwegian",
    code: "no",
    hourFormat: "24",
  },
  {
    name: "Dutch",
    code: "nl",
    hourFormat: "24",
  },
  {
    name: "Polish",
    code: "pl",
    hourFormat: "24",
  },
  {
    name: "Portuguese",
    code: "pt",
    hourFormat: "24",
  },
  {
    name: "Portuguese - Brazil",
    code: "pt-BR",
    hourFormat: "24",
  },
  {
    name: "Portuguese",
    code: "pt-PT",
    hourFormat: "24",
  },
  {
    name: "Romanian",
    code: "ro",
    hourFormat: "24",
  },
  {
    name: "Russian",
    code: "ru",
    hourFormat: "24",
  },
  {
    name: "Slovak",
    code: "sk",
    hourFormat: "24",
  },
  {
    name: "Slovenian",
    code: "sl",
    hourFormat: "24",
  },
  {
    name: "Serbian",
    code: "sr",
    hourFormat: "24",
  },
  {
    name: "Swedish",
    code: "sv",
    hourFormat: "24",
  },
  {
    name: "Thai",
    code: "th",
    hourFormat: "24",
  },
  {
    name: "Turkish",
    code: "tr",
    hourFormat: "24",
  },
  {
    name: "Ukrainian",
    code: "uk",
    hourFormat: "24",
  },
  {
    name: "Vietnamese",
    code: "vi",
    hourFormat: "24",
  },
  {
    name: "Chinese",
    code: "zh-CN",
    hourFormat: "24",
  },
  {
    name: "Chinese - Hong Kong",
    code: "zh-HK",
    hourFormat: "12",
  },
  {
    name: "Chinese - Taiwan",
    code: "zh-TW",
    hourFormat: "12",
  },
];
