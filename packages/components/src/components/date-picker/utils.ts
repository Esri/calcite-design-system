import { defaultLocale } from "@arcgis/toolkit/intl";
import { PropertyValues } from "lit";
import { dateFromISO } from "../../utils/date";
import { Locale } from "../../utils/locale";
import type { DatePicker } from "./date-picker";

type MinSource = Extract<keyof DatePicker, "min" | "minAsDate">;
type MaxSource = Extract<keyof DatePicker, "max" | "maxAsDate">;
type MinMaxType = "min" | "max";

/**
 * Locale data used for calendar rendering and date input parsing.
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
  };
  months: {
    abbreviated: string[];
    wide: string[];
  };
  year?: {
    suffix: string;
  };
}

/**
 * Date locale data cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const dateLocaleDataCache: Record<Locale, DateLocaleData> = {};

/**
 * Date locale formatter cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const dateLocaleFormatterCache: Record<string, Intl.DateTimeFormat> = {};

const dateForLocaleData = new Date(Date.UTC(2006, 10, 22));
const monthDates = Array.from({ length: 12 }, (_, month) => new Date(Date.UTC(2006, month, 1)));
const weekDates = Array.from({ length: 7 }, (_, day) => new Date(Date.UTC(2006, 0, day + 1)));

function memoize<T>(getValue: () => T): () => T {
  let value: T;
  let initialized = false;
  return () => {
    if (!initialized) {
      value = getValue();
      initialized = true;
    }
    return value;
  };
}

function normalizeDateLocale(locale: Locale): Locale {
  if (!locale) {
    return defaultLocale;
  }

  try {
    return Intl.getCanonicalLocales(locale)[0];
  } catch {
    try {
      return Intl.getCanonicalLocales(locale.split("-")[0])[0];
    } catch {
      return defaultLocale;
    }
  }
}

function getCalendar(locale: Locale): DateLocaleData["default-calendar"] {
  const formatter = getLocaleFormatter(locale, "calendar");
  return formatter.resolvedOptions().calendar === "buddhist" ? "buddhist" : "gregorian";
}

function getLocaleFormatter(
  locale: Locale,
  cacheKey: string,
  options: Intl.DateTimeFormatOptions = {},
): Intl.DateTimeFormat {
  const key = `${locale}:${cacheKey}`;
  if (!dateLocaleFormatterCache[key]) {
    const calendar = cacheKey === "calendar" ? undefined : getCalendar(locale) === "buddhist" ? "buddhist" : "gregory";
    dateLocaleFormatterCache[key] = new Intl.DateTimeFormat(locale, {
      ...options,
      ...(calendar && { calendar }),
      timeZone: "UTC",
    });
  }
  return dateLocaleFormatterCache[key];
}

function getDatePattern(locale: Locale): {
  placeholder: string;
  separator: string;
  unitOrder: string;
} {
  const parts = getLocaleFormatter(locale, "date-pattern", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(dateForLocaleData);
  const placeholder = parts
    .map(({ type, value }) => {
      switch (type) {
        case "day":
          return "DD";
        case "month":
          return "MM";
        case "year":
          return "YYYY";
        default:
          return value;
      }
    })
    .join("");

  return {
    placeholder,
    separator: parts.find(({ type }) => type === "literal")?.value ?? "/",
    unitOrder: placeholder,
  };
}

function getMonthNames(locale: Locale, width: "abbreviated" | "wide"): string[] {
  const month = width === "abbreviated" ? "short" : "long";
  const formatter = getLocaleFormatter(locale, `months-${width}`, { month });
  return monthDates.map((date) => formatter.format(date));
}

function getWeekdayNames(locale: Locale, width: "abbreviated" | "narrow"): string[] {
  const weekday = width === "abbreviated" ? "short" : "narrow";
  const formatter = getLocaleFormatter(locale, `weekdays-${width}`, { weekday });
  return weekDates.map((date) => formatter.format(date));
}

function getShortWeekdayNames(abbreviatedWeekdays: string[]): string[] {
  // Intl does not expose CLDR's two-character weekday width. Use the next-best short width for now.
  return abbreviatedWeekdays;
}

function getWeekStart(locale: Locale): number {
  const intlLocale = new Intl.Locale(locale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  const weekInfo = intlLocale.getWeekInfo?.() ?? intlLocale.weekInfo;
  if (!weekInfo) {
    throw new Error(`Week information is not available for locale "${locale}"`);
  }
  return weekInfo.firstDay;
}

function getYearSuffix(locale: Locale): string | undefined {
  const parts = getLocaleFormatter(locale, "year", { year: "numeric" }).formatToParts(dateForLocaleData);
  const yearIndex = parts.findIndex(({ type }) => type === "year");
  const suffix = parts
    .slice(yearIndex + 1)
    .filter(({ type }) => type === "literal")
    .map(({ value }) => value)
    .join("");
  return suffix || undefined;
}

/**
 * Returns lazily derived locale data used for localized calendar rendering.
 */
export function getLocaleData(locale: Locale): DateLocaleData {
  locale = normalizeDateLocale(locale);

  if (dateLocaleDataCache[locale]) {
    return dateLocaleDataCache[locale];
  }

  const calendar = memoize(() => getCalendar(locale));
  const datePattern = memoize(() => getDatePattern(locale));
  const abbreviatedMonths = memoize(() => getMonthNames(locale, "abbreviated"));
  const wideMonths = memoize(() => getMonthNames(locale, "wide"));
  const abbreviatedWeekdays = memoize(() => getWeekdayNames(locale, "abbreviated"));
  const narrowWeekdays = memoize(() => getWeekdayNames(locale, "narrow"));
  const shortWeekdays = memoize(() => getShortWeekdayNames(abbreviatedWeekdays()));
  const weekStart = memoize(() => getWeekStart(locale));
  const yearSuffix = memoize(() => getYearSuffix(locale));
  const localeData: DateLocaleData = {
    get "default-calendar"() {
      return calendar();
    },
    get separator() {
      return datePattern().separator;
    },
    get unitOrder() {
      return datePattern().unitOrder;
    },
    get weekStart() {
      return weekStart();
    },
    get placeholder() {
      return datePattern().placeholder;
    },
    days: {
      get abbreviated() {
        return abbreviatedWeekdays();
      },
      get narrow() {
        return narrowWeekdays();
      },
      get short() {
        return shortWeekdays();
      },
    },
    months: {
      get abbreviated() {
        return abbreviatedMonths();
      },
      get wide() {
        return wideMonths();
      },
    },
    get year() {
      const suffix = yearSuffix();
      return suffix ? { suffix } : undefined;
    },
  };

  return (dateLocaleDataCache[locale] = localeData);
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

export function getValueAsDateRange(value: string[]): (Date | undefined)[] {
  return value.map((v, index) => dateFromISO(v, index === 1));
}

function getSource<T extends string>(changes: PropertyValues, stringProp: T, dateProp: T): T | undefined {
  const stringPropChanged = changes.has(stringProp);
  const datePropChanged = changes.has(dateProp);

  if (stringPropChanged && !datePropChanged) {
    return stringProp;
  }

  if (datePropChanged && !stringPropChanged) {
    return dateProp;
  }

  return undefined;
}

/**
 * Returns the source of min/max.
 *
 * - For "min": returns "min" or "minAsDate"
 * - For "max": returns "max" or "maxAsDate"
 *
 */
export function getMinMaxSource(changes: PropertyValues, type: MinMaxType): MinSource | MaxSource | undefined {
  return type === "min" ? getSource(changes, "min", "minAsDate") : getSource(changes, "max", "maxAsDate");
}
