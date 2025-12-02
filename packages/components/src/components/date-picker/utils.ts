// @ts-strict-ignore
import { defaultLocale, normalizeLocale, supportedLocales } from "@arcgis/toolkit/intl";
import { dateFromISO } from "../../utils/date";
import { getAssetPath } from "../../runtime";
import { Locale } from "../../utils/locale";

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
export const translationCache: Record<Locale, DateLocaleData> = {};

/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const requestCache: Record<Locale, Promise<DateLocaleData>> = {};

/**
 * Additional locales supported by NLS data but not by the main intl package
 */
const extraNlsLocales = [
  "de-AT",
  "de-CH",
  "en-AU",
  "en-CA",
  "en-GB",
  "es-MX",
  "fr-CA",
  "fr-CH",
  "hi",
  "it-CH",
  "mk",
  "pt",
] as const;

export const supportedNlsLocales = [...supportedLocales, ...extraNlsLocales];

/**
 * Normalizes locale to match NLS bundles used by date-picker's calendar rendering
 */
function normalizeNlsLocale(locale: Locale): (typeof supportedNlsLocales)[number] {
  if (!locale) {
    return defaultLocale;
  }

  const localeParts = locale.split("-");
  locale = `${localeParts[0].toLowerCase()}${localeParts.length >= 2 ? `-${localeParts[1].toUpperCase()}` : ""}`;

  if (extraNlsLocales.includes(locale as (typeof extraNlsLocales)[number])) {
    return locale as (typeof supportedNlsLocales)[number];
  }

  return normalizeLocale(locale);
}

/**
 * Fetch NLS data used for localized calendar rendering
 */
export async function getLocaleData(locale: Locale): Promise<DateLocaleData> {
  locale = normalizeNlsLocale(locale);

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

  return (translationCache[locale] = await requestCache[locale]);
}

/**
 * Ensures consistent locale is used across browsers
 */
export function applyLocaleOverride(locale: Locale): Locale {
  const localeOverrideMap: Record<Locale, Locale> = {
    "ar-SA": "ar", // see https://github.com/Esri/calcite-design-system/issues/11399
  };

  return localeOverrideMap[locale] || locale;
}

/**
 * Maps value to valueAsDate
 *
 * @param value
 */

export function getValueAsDateRange(value: string[]): Date[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}
