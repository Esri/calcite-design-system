/**
 * Date units
 */
declare enum units {
    day = "day",
    month = "month",
    year = "year"
}
/**
 * Useful date rendering information
 * provides numeral type, order of date/month/year, etc.
 */
export interface DateFormattingData {
    /** Array of units in the order this culture prefers them */
    order: units[];
    /** The character(s) most commonly used to join units (ex: /, -, .) */
    separator: string;
    /** Uses buddhist era years, rather than common era */
    buddhist: boolean;
    /** Placeholder string with correct order and separator */
    placeholder: string;
}
/**
 * Parse date formatting data for a given locale
 */
export declare function getLocaleFormatData(locale: string): DateFormattingData;
/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 */
export declare function parseDateString(str: string, locale: string): {
    [U in units]: number;
};
/**
 * Convert eastern arbic numerals and remove right-to-left control marks
 */
export declare function replaceArabicNumerals(str?: string): string;
/**
 * Assemble an array of month names for a locale
 */
export declare function getMonths(locale: string): string[];
/**
 * Get localized year name for given locale
 */
export declare function getYear(date: Date, locale: string): string;
/**
 * Generate an array of localized week day names in the correct order
 */
export declare function getLocalizedWeekdays(locale: string, format?: string): string[];
/**
 * Find the week starting day for a given locale
 */
export declare function getFirstDayOfWeek(locale: string): number;
/**
 * Which day of the week is considered the start in each locale
 * Sunday starting locales have been omitted.
 * https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/weekData.json
 */
export declare const firstDayOfWeek: {
    [key: string]: number;
};
export {};
