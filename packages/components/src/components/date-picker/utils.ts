// @ts-strict-ignore
import { defaultLocale, normalizeLocale, supportedLocales } from "@arcgis/toolkit/intl";
import { dateFromISO } from "../../utils/date";
import { getAssetPath } from "../../runtime";

/**
 * Translation resource data structure
 *
 * @private
 */
export interface DateLocaleData {
  "default-calendar": "gregorian" | "buddhist";
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
 * CLDR cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const translationCache: Record<HTMLElement["lang"], DateLocaleData> = {};

/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const requestCache: Record<HTMLElement["lang"], Promise<DateLocaleData>> = {};

const nlsLocaleExceptions = [
  "de-AT",
  "de-CH",
  "en-AU",
  "en-CA",
  "en-GB",
  "es-MX",
  "fr-CH",
  "hi",
  "it-CH",
  "mk",
  "pt",
] as const;

export const supportedNlsLocales = [...supportedLocales, ...nlsLocaleExceptions];

/**
 * Normalizes locale to match NLS bundle
 *
 * @param locale
 */
function toSupportedNlsLocale(locale: string): (typeof supportedNlsLocales)[number] {
  if (!locale) {
    return defaultLocale;
  }

  const localeParts = locale.split("-");
  locale = `${localeParts[0].toLowerCase()}${localeParts.length >= 2 ? `-${localeParts[1].toUpperCase()}` : ""}`;

  if (nlsLocaleExceptions.includes(locale as (typeof nlsLocaleExceptions)[number])) {
    return locale as (typeof supportedNlsLocales)[number];
  }

  return normalizeLocale(locale);
}

/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
export async function getLocaleData(lang: string): Promise<DateLocaleData> {
  const locale = toSupportedNlsLocale(lang);

  if (translationCache[locale]) {
    return translationCache[locale];
  }

  if (!requestCache[locale]) {
    requestCache[locale] = fetch(getAssetPath(`./assets/date-picker/nls/${locale}.json`))
      .then((resp) => resp.json())
      .catch(() => {
        console.error(`Native Language Support data for "${locale}" not found or invalid, falling back to english`);
        return getLocaleData(defaultLocale);
      });
  }

  const data = await requestCache[locale];
  translationCache[locale] = data;

  return data;
}

/**
 * Normalizes lang value for date picker locale data fetching
 *
 * @param lang
 * @see https://github.com/Esri/calcite-design-system/issues/11399
 */
export function normalizeDatePickerLang(lang: string): string {
  const specialMappings: Record<HTMLElement["lang"], HTMLElement["lang"]> = {
    "ar-SA": "ar",
  };

  return specialMappings[lang] || lang;
}

/**
 * Maps value to valueAsDate
 *
 * @param value
 */

export function getValueAsDateRange(value: string[]): Date[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}
