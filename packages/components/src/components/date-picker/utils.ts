// @ts-strict-ignore
import { Info } from "luxon";
import { dateFromISO } from "../../utils/date";

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
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
export function getLocaleData(lang: string): DateLocaleData {
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  return (translationCache[lang] = generateLocaleData(lang));
}

function generateLocaleData(locale = "en"): DateLocaleData {
  const knownCalendarTypes = {
    th: "buddhist",
  };

  const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(2000, 1, 2));
  const sep = parts.find((p) => p.type === "literal")?.value || "/";
  const order = parts
    .filter((p) => ["day", "month", "year"].includes(p.type))
    .map((p) => {
      if (p.type === "day") {
        return "DD";
      }
      if (p.type === "month") {
        return "MM";
      }
      if (p.type === "year") {
        return "YYYY";
      }
    })
    .join(sep);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(2021, 7, 2 + i));
    return {
      wide: new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date),
      abbreviated: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date),
      short: new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(date),
    };
  });
  const daysObj = {
    wide: days.map((d) => d.wide),
    abbreviated: days.map((d) => d.abbreviated),
    short: days.map((d) => d.short),
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(Date.UTC(2021, i, 1));
    return {
      wide: new Intl.DateTimeFormat(locale, { month: "long" }).format(date),
      abbreviated: new Intl.DateTimeFormat(locale, { month: "short" }).format(date),
      narrow: new Intl.DateTimeFormat(locale, { month: "narrow" }).format(date),
    };
  });
  const monthsObj = {
    wide: months.map((m) => m.wide),
    abbreviated: months.map((m) => m.abbreviated),
    narrow: months.map((m) => m.narrow),
  };

  const numerals = Array.from({ length: 10 }, (_, i) => new Intl.NumberFormat(locale).format(i)).join("");

  const weekStart = Info.getStartOfWeek(locale); // 1=Monday, 7=Sunday

  return {
    "default-calendar": knownCalendarTypes[locale] || "gregorian",
    separator: sep,
    unitOrder: order,
    weekStart,
    placeholder: order,
    days: daysObj,
    numerals,
    months: monthsObj,
  };
}

/**
 * Maps value to valueAsDate
 *
 * @param value
 */

export function getValueAsDateRange(value: string[]): Date[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}
