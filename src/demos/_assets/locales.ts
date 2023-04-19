interface Locale {
  name: string;
  locale: string;
  dir?: "ltr" | "rtl";
}

export const locales: Locale[] = [
  {
    name: "Arabic",
    locale: "ar",
    dir: "rtl"
  },
  { name: "Arabic (Arab Numerals)", locale: "ar", dir: "rtl", numberingSystem: "arab" },
  {
    name: "Bosnian",
    locale: "bs"
  },
  {
    name: "Bulgarian",
    locale: "bg"
  },
  {
    name: "Catalan",
    locale: "ca"
  },
  {
    name: "Chinese (China)",
    locale: "zh-CN"
  },
  {
    name: "Chinese (Hong Kong)",
    locale: "zh-HK"
  },
  {
    name: "Chinese (Taiwan)",
    locale: "zh-TW"
  },
  {
    name: "Croatian",
    locale: "hr"
  },
  {
    name: "Czech",
    locale: "cs"
  },
  {
    name: "Danish",
    locale: "da"
  },
  {
    name: "Dutch",
    locale: "nl"
  },
  {
    name: "English",
    locale: "en"
  },
  {
    name: "English (Australia)",
    locale: "en-AU"
  },
  {
    name: "English (Canada)",
    locale: "en-CA"
  },
  {
    name: "English (Great Britain)",
    locale: "en-GB"
  },
  {
    name: "English (United States)",
    locale: "en-US"
  },
  {
    name: "Estonian",
    locale: "et"
  },
  {
    name: "Finnish",
    locale: "fi"
  },
  {
    name: "French",
    locale: "fr"
  },
  {
    name: "French (Switzerland)",
    locale: "fr-CH"
  },
  {
    name: "German",
    locale: "de"
  },
  {
    name: "German (Austria)",
    locale: "de-AT"
  },
  {
    name: "German (Switzerland)",
    locale: "de-CH"
  },
  {
    name: "Greek",
    locale: "el"
  },
  {
    name: "Hungarian",
    locale: "hu"
  },
  {
    name: "Indonesian (ISO 3166)",
    locale: "id"
  },
  {
    name: "Italian",
    locale: "it"
  },
  {
    name: "Italian (Switzerland)",
    locale: "it-CH"
  },
  {
    name: "Japanese",
    locale: "ja"
  },
  {
    name: "Korean",
    locale: "ko"
  },
  {
    name: "Latvian",
    locale: "lv"
  },
  {
    name: "Lithuanian",
    locale: "lt"
  },
  {
    name: "Macedonian",
    locale: "mk"
  },
  {
    name: "Norwegian",
    locale: "no"
  },
  {
    name: "Polish",
    locale: "pl"
  },
  {
    name: "Portuguese",
    locale: "pt"
  },
  {
    name: "Portuguese (Brazil)",
    locale: "pt-BR"
  },
  {
    name: "Portuguese (Portugal)",
    locale: "pt-PT"
  },
  {
    name: "Romanian",
    locale: "ro"
  },
  {
    name: "Russian",
    locale: "ru"
  },
  {
    name: "Serbian",
    locale: "sr"
  },
  {
    name: "Slovak",
    locale: "sk"
  },
  {
    name: "Slovenian",
    locale: "sl"
  },
  {
    name: "Spanish",
    locale: "es"
  },
  {
    name: "Spanish (Mexico)",
    locale: "es-MX"
  },
  {
    name: "Swedish",
    locale: "sv"
  },
  {
    name: "Thai",
    locale: "th"
  },
  {
    name: "Turkish",
    locale: "tr"
  },
  {
    name: "Ukrainian",
    locale: "uk"
  },
  {
    name: "Vietnamese",
    locale: "vi"
  }
];
