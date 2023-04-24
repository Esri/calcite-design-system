import { getAssetPath } from "@stencil/core";
import { dateFromISO } from "../../utils/date";
import { getSupportedLocale } from "../../utils/locale";

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
export const translationCache: Record<string, DateLocaleData> = {};

/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const requestCache: Record<string, Promise<DateLocaleData>> = {};

/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
export async function getLocaleData(lang: string): Promise<DateLocaleData> {
  const locale = getSupportedLocale(lang);
  if (translationCache[locale]) {
    return translationCache[locale];
  }
  if (!requestCache[locale]) {
    requestCache[locale] = fetch(getAssetPath(`./assets/date-picker/nls/${locale}.json`))
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

/**
 *  Maps value to valueAsDate
 *
 * @param value
 */

export function getValueAsDateRange(value: string[]): Date[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}
