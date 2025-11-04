import { datePartsFromISO } from "../../utils/date";

/**
 * Specifies if an ISO string date (YYYY-MM-DD) has two digit year.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isTwoDigitYear(value: string): boolean {
  if (!value) {
    return false;
  }
  const { year } = datePartsFromISO(value);
  return Number(year) < 100;
}

/**
 * Returns a normalized year to current century from a given two digit year number.
 *
 * @param {number} twoDigitYear
 * @returns {string}
 */
export function normalizeToCurrentCentury(twoDigitYear: number): number {
  const currentYear = new Date().getFullYear();
  const normalizedYear = Math.floor(currentYear / 100) * 100 + twoDigitYear;
  return normalizedYear;
}
