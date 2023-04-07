import { dateFromISO } from "../../utils/date";
import { getDateTimeFormat, getSupportedLocale } from "../../utils/locale";

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
export const localeDataCache: Record<string, DateLocaleData> = {};

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

  const supportedLocaleStartOfWeek: Record<string, number> = {
    ar: 6,
    bg: 1,
    bs: 1,
    ca: 1,
    cs: 1,
    da: 1,
    de: 1,
    "de-CH": 1,
    el: 1,
    en: 7,
    "en-AU": 1,
    "en-CA": 7,
    "en-GB": 1,
    es: 1,
    "es-MX": 7,
    et: 1,
    fi: 1,
    fr: 1,
    "fr-CH": 1,
    he: 7,
    hi: 7,
    hr: 1,
    hu: 1,
    id: 7,
    it: 1,
    "it-CH": 1,
    ja: 7,
    ko: 7,
    lt: 1,
    lv: 1,
    mk: 1,
    nl: 1,
    no: 1,
    pl: 1,
    pt: 7,
    "pt-BR": 7,
    "pt-PT": 7,
    ro: 1,
    ru: 1,
    sk: 1,
    sl: 1,
    sr: 1,
    sv: 1,
    th: 7,
    tr: 1,
    uk: 1,
    vi: 1,
    "zh-CN": 7,
    "zh-HK": 7,
    "zh-TW": 7
  };

  if (localeDataCache[locale]) {
    return localeDataCache[locale];
  }

  function pickPart(format: Intl.DateTimeFormat, part: Intl.DateTimeFormatPartTypes, date: Date): string {
    return format.formatToParts(date).find(({ type }) => type === part)?.value;
  }

  const shortFormat = getDateTimeFormat(locale, { month: "short", weekday: "narrow" });
  const mediumFormat = getDateTimeFormat(locale, { weekday: "short" });
  const regularFormat = getDateTimeFormat(locale, { month: "2-digit", day: "2-digit", year: "numeric" });
  const longFormat = getDateTimeFormat(locale, { month: "long" });
  const resolvedOptions = regularFormat.resolvedOptions();
  const sampleDate = new Date();
  const parts = regularFormat.formatToParts(sampleDate);
  const builtData: Partial<DateLocaleData> = {};

  function mapWeek(fn: (date: Date) => string): string[] {
    const mw: string[] = [];

    for (let i = 0; i <= 7; i++) {
      const start = new Date(Date.UTC(2016, 10, 14 + i));
      mw.push(fn(start));
    }

    return mw;
  }

  function mapMonth(fn: (date: Date) => string): string[] {
    const mm: string[] = [];

    for (let i = 0; i <= 11; i++) {
      const start = new Date(Date.UTC(2016, 1 + i, 1));
      mm.push(fn(start));
    }

    return mm;
  }

  const separator = parts.find((part) => part.type === "literal")?.value ?? "/";

  const unitOrder: string = parts
    .map((part) => {
      return part.type === "day"
        ? "D".repeat(part.value.length)
        : part.type === "month"
        ? "M".repeat(part.value.length)
        : part.type === "year"
        ? "Y".repeat(part.value.length)
        : undefined;
    })
    .filter(Boolean)
    .join(separator);

  builtData["default-calendar"] = resolvedOptions.calendar as DateLocaleData["default-calendar"];
  builtData.separator = separator;
  builtData.unitOrder = unitOrder;
  builtData.weekStart = supportedLocaleStartOfWeek[locale];
  builtData.placeholder = unitOrder;

  builtData.days = {
    // narrow or short will always be used if specified (currently)
    narrow: mapWeek((date) => pickPart(mediumFormat, "weekday", date)),
    short: mapWeek((date) => pickPart(shortFormat, "weekday", date))
  };

  builtData.numerals = locale === "ar" ? "٠١٢٣٤٥٦٧٨٩" : "0123456789"; // use numberformatter or more reliable

  builtData.months = {
    // wide will always be used if specified (currently)
    wide: mapMonth((date) => pickPart(longFormat, "month", date)),

    // intentionally empty as
    abbreviated: [],
    narrow: []
  };

  const yearIndex = parts.findIndex((part) => part.type === "year");
  const yearSeparator = parts.slice(yearIndex).find((part) => part.type === "literal");
  builtData.year = yearSeparator ? { suffix: yearSeparator.value } : undefined;

  localeDataCache[locale] = builtData as DateLocaleData;

  return localeDataCache[locale];
}

/**
 *  Maps value to valueAsDate
 *
 * @param value
 */

export function getValueAsDateRange(value: string[]): Date[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}
