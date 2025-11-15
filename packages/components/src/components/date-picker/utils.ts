// @ts-strict-ignore
import { dateFromISO } from "../../utils/date";
import { defaultLocale } from "../../utils/locale";
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

/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
export async function getLocaleData(lang: string): Promise<DateLocaleData> {
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  if (!requestCache[lang]) {
    requestCache[lang] = fetch(getAssetPath(`./assets/date-picker/nls/${lang}.json`))
      .then((resp) => resp.json())
      .catch(() => {
        console.error(`Native Language Support data for "${lang}" not found or invalid, falling back to english`);
        return getLocaleData(defaultLocale);
      });
  }

  const data = await requestCache[lang];
  translationCache[lang] = data;

  return data;
}

export function normalizeDatePickerLang(lang: string): string {
  // some locales require special mapping, see https://github.com/Esri/calcite-design-system/issues/11399
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
