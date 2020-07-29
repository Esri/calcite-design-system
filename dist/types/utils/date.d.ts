/**
 * Check if date is within a min and max
 */
export declare function inRange(date: Date, min?: Date | string, max?: Date | string): boolean;
/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 */
export declare function dateFromRange(date?: any, min?: Date | string, max?: Date | string): Date | null;
/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 */
export declare function dateFromISO(iso8601: string): Date | null;
/**
 * Return first portion of ISO string (YYYY-mm-dd)
 */
export declare function dateToISO(date?: Date): string;
/**
 * Check if two dates are the same day, month, year
 */
export declare function sameDate(d1: Date, d2: Date): boolean;
/**
 * Get a date one month in the past
 */
export declare function prevMonth(date: Date): Date;
/**
 * Get a date one month in the future
 */
export declare function nextMonth(date: Date): Date;
