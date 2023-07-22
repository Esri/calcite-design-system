import { NumberingSystem } from "../../utils/locale";

interface Locale {
  name: string;
  locale: string;
  dir?: "ltr" | "rtl";
  numberingSystem?: NumberingSystem;
}

export const locales: Locale[] = [
  {
    name: "Arabic",
    locale: "ar",
    dir: "rtl",
  },
  {
    name: "Arabic (Arab Numerals)",
    locale: "ar",
    dir: "rtl",
    numberingSystem: "arab",
  },
  {
    name: "Arabic (Arab Ext Numerals)",
    locale: "ar",
    dir: "rtl",
    numberingSystem: "arabext",
  },
  {
    name: "Bulgarian",
    locale: "bg",
  },
  {
    name: "Bosnian",
    locale: "bs",
  },
  {
    name: "Catalan",
    locale: "ca",
  },
  {
    name: "Czech",
    locale: "cs",
  },
  {
    name: "Danish",
    locale: "da",
  },
  {
    name: "German",
    locale: "de",
  },
  {
    name: "German (Austria)",
    locale: "de-AT",
  },
  {
    name: "German (Switzerland)",
    locale: "de-CH",
  },
  {
    name: "Greek",
    locale: "el",
  },
  {
    name: "English",
    locale: "en",
  },
  {
    name: "English (Australia)",
    locale: "en-AU",
  },
  {
    name: "English (Canada)",
    locale: "en-CA",
  },
  {
    name: "English (Great Britain)",
    locale: "en-GB",
  },
  {
    name: "English (United States)",
    locale: "en-US",
  },
  {
    name: "Spanish",
    locale: "es",
  },
  {
    name: "Spanish (Mexico)",
    locale: "es-MX",
  },
  {
    name: "Estonian",
    locale: "et",
  },
  {
    name: "Finnish",
    locale: "fi",
  },
  {
    name: "French",
    locale: "fr",
  },
  {
    name: "French (Switzerland)",
    locale: "fr-CH",
  },
  {
    name: "Hebrew",
    locale: "he",
  },
  {
    name: "Hindi",
    locale: "hi",
  },
  {
    name: "Croatian",
    locale: "hr",
  },
  {
    name: "Hungarian",
    locale: "hu",
  },
  {
    name: "Indonesian (ISO 3166)",
    locale: "id",
  },
  {
    name: "Italian",
    locale: "it",
  },
  {
    name: "Italian (Switzerland)",
    locale: "it-CH",
  },
  {
    name: "Japanese",
    locale: "ja",
  },
  {
    name: "Korean",
    locale: "ko",
  },
  {
    name: "Lithuanian",
    locale: "lt",
  },
  {
    name: "Latvian",
    locale: "lv",
  },
  {
    name: "Macedonian",
    locale: "mk",
  },
  {
    name: "Norwegian",
    locale: "no",
  },
  {
    name: "Dutch",
    locale: "nl",
  },
  {
    name: "Polish",
    locale: "pl",
  },
  {
    name: "Portuguese",
    locale: "pt",
  },
  {
    name: "Portuguese (Brazil)",
    locale: "pt-BR",
  },
  {
    name: "Portuguese (Portugal)",
    locale: "pt-PT",
  },
  {
    name: "Romanian",
    locale: "ro",
  },
  {
    name: "Russian",
    locale: "ru",
  },
  {
    name: "Slovak",
    locale: "sk",
  },
  {
    name: "Slovenian",
    locale: "sl",
  },
  {
    name: "Serbian",
    locale: "sr",
  },
  {
    name: "Swedish",
    locale: "sv",
  },
  {
    name: "Thai",
    locale: "th",
  },
  {
    name: "Thai (Thai digits)",
    locale: "th",
    numberingSystem: "thai",
  },
  {
    name: "Turkish",
    locale: "tr",
  },
  {
    name: "Ukrainian",
    locale: "uk",
  },
  {
    name: "Vietnamese",
    locale: "vi",
  },
  {
    name: "Chinese (China)",
    locale: "zh-CN",
  },
  {
    name: "Chinese (China) (Hanidec numerals)",
    locale: "zh-CN",
    numberingSystem: "hanidec",
  },
  {
    name: "Chinese (Hong Kong)",
    locale: "zh-HK",
  },
  {
    name: "Chinese (Hong Kong) (Hanidec numerals)",
    locale: "zh-HK",
    numberingSystem: "hanidec",
  },
  {
    name: "Chinese (Taiwan)",
    locale: "zh-TW",
  },
  {
    name: "Chinese (Taiwan) (Hanidec numerals)",
    locale: "zh-TW",
    numberingSystem: "hanidec",
  },
];
