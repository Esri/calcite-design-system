/**
 * Date units
 */
var units;
(function (units) {
    units["day"] = "day";
    units["month"] = "month";
    units["year"] = "year";
})(units || (units = {}));
/**
 * Parse date formatting data for a given locale
 */
export function getLocaleFormatData(locale) {
    let data = [
        { unit: units.month, num: "11", placeholder: "mm" },
        { unit: units.day, num: "22", placeholder: "dd" },
        { unit: units.year, num: "3333", placeholder: "yyyy" },
    ];
    // create a new localized string from a known date
    let test = new Date(3333, 10, 22).toLocaleDateString(locale);
    const buddhist = test.indexOf("3876") > -1;
    // replace arabic numerals and adjust for buddhist era
    test = replaceArabicNumerals(test).replace("3876", "3333");
    const placeholder = data.reduce((str, d) => str.replace(d.num, d.placeholder), test);
    // given the localized test string, determine the order of day, month, year
    const order = data
        .sort((a, b) => (test.indexOf(a.num) < test.indexOf(b.num) ? -1 : 1))
        .map((d) => d.unit);
    const separator = [". ", ".", "-", "/", "/"].find((char) => test.indexOf(char) > -1);
    return {
        order,
        separator,
        buddhist,
        placeholder,
    };
}
/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 */
export function parseDateString(str, locale) {
    const { separator, order, buddhist } = getLocaleFormatData(locale);
    const values = replaceArabicNumerals(str)
        .split(separator)
        .filter((part) => part !== separator)
        .map((part) => part.replace(".", ""));
    return {
        day: parseInt(values[order.indexOf(units.day)]),
        month: parseInt(values[order.indexOf(units.month)]) - 1,
        year: parseInt(values[order.indexOf(units.year)]) - (buddhist ? 543 : 0),
    };
}
/**
 * Convert eastern arbic numerals and remove right-to-left control marks
 */
export function replaceArabicNumerals(str = "") {
    return str
        .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660))
        .replace(/[\u06f0-\u06f9]/g, (c) => (c.charCodeAt(0) - 0x06f0))
        .replace(/[^\x00-\x7F]/g, "");
}
/**
 * Assemble an array of month names for a locale
 */
export function getMonths(locale) {
    const date = new Date(0, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        date.setMonth(i);
        return new Intl.DateTimeFormat(locale, {
            month: "long",
        }).format(date);
    });
}
/**
 * Get localized year name for given locale
 */
export function getYear(date, locale) {
    return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(date);
}
/**
 * Generate an array of localized week day names in the correct order
 */
export function getLocalizedWeekdays(locale, format = "short") {
    const startWeek = [];
    const endWeek = [];
    const date = new Date();
    for (let w = 1; w < 8; w++) {
        date.setDate(w);
        let day = new Intl.DateTimeFormat(locale, {
            weekday: format,
        }).format(date);
        date.getDay() === getFirstDayOfWeek(locale) || startWeek.length > 0
            ? startWeek.push(day)
            : endWeek.push(day);
    }
    return [...startWeek, ...endWeek];
}
/**
 * Find the week starting day for a given locale
 */
export function getFirstDayOfWeek(locale) {
    return firstDayOfWeek[locale.slice(0, 2).toUpperCase()] || 0;
}
/**
 * Which day of the week is considered the start in each locale
 * Sunday starting locales have been omitted.
 * https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/weekData.json
 */
export const firstDayOfWeek = {
    AD: 1,
    AE: 6,
    AF: 6,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AT: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BY: 1,
    CH: 1,
    CL: 1,
    CM: 1,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    HR: 1,
    HU: 1,
    IE: 1,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JO: 6,
    KG: 1,
    KW: 6,
    KZ: 1,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MK: 1,
    MN: 1,
    MQ: 1,
    MV: 5,
    MY: 1,
    NL: 1,
    NO: 1,
    NZ: 1,
    OM: 6,
    PL: 1,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SD: 6,
    SE: 1,
    SI: 1,
    SK: 1,
    SM: 1,
    SY: 6,
    TJ: 1,
    TM: 1,
    TR: 1,
    UA: 1,
    UY: 1,
    UZ: 1,
    VA: 1,
    VN: 1,
    XK: 1,
};
