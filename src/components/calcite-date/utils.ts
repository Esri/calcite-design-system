import { getAssetPath } from "@stencil/core";

/**
 * Translation resource data structure
 * @private
 */
export interface DateLocaleData {
  "default-calendar": "gregorian";
  separator: string;
  unitOrder: string;
  weekStart: number;
  placeholder: string;
  days: {
    abbreviated?: string[];
    narrow?: string[];
    short?: string[];
    wide?: string[];
  };
  numerals: string;
  months: {
    abbreviated: string[];
    narrow: string[];
    wide: string[];
  };
  year?: {
    suffix: string;
  };
}

/**
 * List of supported country codes
 * @private
 */
const supportedLocales = [
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

/**
 * Get supported locale code from raw user input
 * Exported for testing purposes.
 * @private
 */
function getSupportedLocale(lang = "") {
  if (supportedLocales.indexOf(lang) > -1) {
    return lang;
  } else {
    const base = lang.split("-")[0];
    if (supportedLocales.indexOf(base) > -1) {
      return base;
    } else {
      return "en";
    }
  }
}

/**
 * CLDR cache.
 * Exported for testing purposes.
 * @private
 */
export const translationCache: Record<string, DateLocaleData> = {};

/**
 * CLDR request cache.
 * Exported for testing purposes.
 * @private
 */
export const requestCache: Record<string, Promise<DateLocaleData>> = {};

/**
 * Fetch calendar data for a given locale from list of supported languages
 * @public
 */
export async function getLocaleData(lang: string): Promise<DateLocaleData> {
  const locale = getSupportedLocale(lang);
  if (translationCache[locale]) {
    return translationCache[locale];
  }
  if (!requestCache[locale]) {
    requestCache[locale] = fetch(getAssetPath(`./calcite-date-nls/${locale}.json`))
      .then((resp) => resp.json())
      .catch(() => {
        console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
        return getLocaleData("en");
      });
  }

  const data = await requestCache[locale];
  translationCache[locale] = data;

  return data;
}
