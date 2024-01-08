import { DateLocaleData } from "../components/date-picker/utils";
import { numberStringFormatter } from "./locale";

export interface HoverRange {
  focused: "end" | "start";
  start: Date;
  end: Date;
}

/**
 * Check if date is within a min and max
 *
 * @param date
 * @param min
 * @param max
 */
export function inRange(date: Date, min?: Date | string, max?: Date | string): boolean {
  if (!date) {
    return;
  }
  const time = date.getTime();
  const afterMin = !(min instanceof Date) || time >= min.getTime();
  const beforeMax = !(max instanceof Date) || time <= max.getTime();
  return afterMin && beforeMax;
}

/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 *
 * @param date
 * @param min
 * @param max
 */
export function dateFromRange(date?: any, min?: Date | string, max?: Date | string): Date | null {
  if (!(date instanceof Date)) {
    return null;
  }
  const time = date.getTime();
  const beforeMin = min instanceof Date && time < min.getTime();
  const afterMax = max instanceof Date && time > max.getTime();
  if (beforeMin) {
    return min as Date;
  }
  if (afterMax) {
    return max as Date;
  }
  return date;
}

/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 *
 * @param iso8601
 * @param isEndDate
 */
export function dateFromISO(iso8601: string | Date, isEndDate = false): Date | null {
  if (iso8601 instanceof Date) {
    return iso8601;
  }
  if (!iso8601 || typeof iso8601 !== "string") {
    return null;
  }
  const d = iso8601.split(/[: T-]/).map(parseFloat);
  const date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1);
  date.setFullYear(d[0]);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO 8601 date: "${iso8601}"`);
  }
  if (isEndDate) {
    return setEndOfDay(date);
  }
  return date;
}

/**
 * Parse a localized date string into a valid Date.
 * return false if date is invalid, or out of range
 *
 * @param value
 * @param localeData
 */
export function dateFromLocalizedString(value: string, localeData: DateLocaleData): Date {
  if (!localeData) {
    return null;
  }
  const { separator } = localeData;
  const parts = parseDateString(value, localeData);

  const { day, month } = parts;
  const year = parseCalendarYear(parts.year, localeData);

  const date = new Date(year, month, day);
  date.setFullYear(year);

  const validDay = day > 0;
  const validMonth = month > -1;
  const validDate = !isNaN(date.getTime());
  const validLength = value.split(separator).filter((c) => c).length > 2;
  const validYear = year.toString().length > 0;

  if (validDay && validMonth && validDate && validLength && validYear) {
    return date;
  }
  return null;
}

export function parseCalendarYear(year: number, localeData: DateLocaleData): number {
  return processCalendarYear(year, localeData, "read");
}

export function formatCalendarYear(year: number, localeData: DateLocaleData): number {
  return processCalendarYear(year, localeData, "write");
}

function processCalendarYear(year: number, localeData: DateLocaleData, mode: "read" | "write"): number {
  if (localeData["default-calendar"] !== "buddhist") {
    return year;
  }

  const BUDDHIST_CALENDAR_YEAR_OFFSET = 543;
  const yearOffset = BUDDHIST_CALENDAR_YEAR_OFFSET * (mode === "read" ? -1 : 1);

  return year + yearOffset;
}

/**
 * Retrieve day, month, and year strings from a localized string
 *
 * @param string
 * @param localeData
 */
export function datePartsFromLocalizedString(
  string: string,
  localeData: DateLocaleData,
): { day: string; month: string; year: string } {
  const { separator, unitOrder } = localeData;
  const order = getOrder(unitOrder);
  const values = string.split(separator).map((part) => numberStringFormatter.delocalize(part));
  const day = values[order.indexOf("d")];
  const month = values[order.indexOf("m")];
  const year = values[order.indexOf("y")];
  return { day, month, year };
}

/**
 * Return first portion of ISO string (YYYY-mm-dd)
 *
 * @param date
 */
export function dateToISO(date?: Date): string {
  if (date instanceof Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  }
  return "";
}

/**
 * Retrieve day, month, and year strings from a ISO string (YYYY-mm-dd)
 *
 * @param string
 * @param isoDate
 */
export function datePartsFromISO(isoDate: string): { day: string; month: string; year: string } {
  const dateParts = isoDate.split("-");
  return { day: dateParts[2], month: dateParts[1], year: dateParts[0] };
}

/**
 * Check if two dates are the same day, month, year
 *
 * @param d1
 * @param d2
 */
export function sameDate(d1: Date, d2: Date): boolean {
  return (
    d1 instanceof Date &&
    d2 instanceof Date &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

/**
 * Get a date one month in the past
 *
 * @param date
 */
export function prevMonth(date: Date): Date {
  const month = date.getMonth();
  const nextDate = new Date(date);
  nextDate.setMonth(month - 1);
  // date doesn't exist in new month, use last day
  if (month === nextDate.getMonth()) {
    return new Date(date.getFullYear(), month, 0);
  }
  return nextDate;
}

/**
 * Get a date for the specified Month
 *
 * @param date
 * @param month
 */
export function requestedMonth(date: Date, month: number): Date {
  const nextDate = new Date(date);
  nextDate.setMonth(month);
  // date doesn't exist in new month, use last day
  if (month !== date.getMonth()) {
    return new Date(date.getFullYear(), month + 1, 0);
  }
  return nextDate;
}

/**
 * Get a date one month in the future
 *
 * @param date
 */
export function nextMonth(date: Date): Date {
  const month = date.getMonth();
  const nextDate = new Date(date);
  nextDate.setMonth(month + 1);
  // date doesn't exist in new month, use last day
  if ((month + 2) % 7 === nextDate.getMonth() % 7) {
    return new Date(date.getFullYear(), month + 2, 0);
  }
  return nextDate;
}

/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 * can return values as number or string
 *
 * @param string
 * @param localeData
 */
export function parseDateString(
  string: string,
  localeData: DateLocaleData,
): { day: number; month: number; year: number } {
  const { day, month, year } = datePartsFromLocalizedString(string, localeData);
  return {
    day: parseInt(day),
    month: parseInt(month) - 1, // this subtracts by 1 because the month in the Date constructor is zero-based https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
    year: parseInt(year),
  };
}

type unitOrderSignifier = "m" | "d" | "y";

/**
 * Based on the unitOrder string, find order of month, day, and year for locale
 *
 * @param unitOrder
 */
export function getOrder(unitOrder: string): unitOrderSignifier[] {
  const signifiers: unitOrderSignifier[] = ["d", "m", "y"];
  const order = unitOrder.toLowerCase();
  return signifiers.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

/**
 * Get number of days between two dates
 *
 * @param date1
 * @param date2
 */
export function getDaysDiff(date1: Date, date2: Date): number {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();
  return (ts1 - ts2) / (1000 * 3600 * 24);
}

/**
 * Set time of the day to the end.
 *
 * @param {Date} date Date.
 * @returns {Date} Date with time set to end of day .
 */
export function setEndOfDay(date: Date): Date {
  date.setHours(23, 59, 59, 999);
  return date;
}
