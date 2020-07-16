/**
 * Check if date is within a min and max
 */
export function inRange(date, min, max) {
    const time = date.getTime();
    const afterMin = !(min instanceof Date) || time >= min.getTime();
    const beforeMax = !(max instanceof Date) || time <= max.getTime();
    return afterMin && beforeMax;
}
/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 */
export function dateFromRange(date, min, max) {
    if (!(date instanceof Date)) {
        return null;
    }
    const time = date.getTime();
    const beforeMin = min instanceof Date && time < min.getTime();
    const afterMax = max instanceof Date && time > max.getTime();
    if (beforeMin) {
        return min;
    }
    if (afterMax) {
        return max;
    }
    return date;
}
/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 */
export function dateFromISO(iso8601) {
    if (!iso8601 || typeof iso8601 !== "string") {
        return null;
    }
    const d = iso8601.split(/[: T-]/).map(parseFloat);
    const date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid ISO 8601 date: "${iso8601}"`);
    }
    return date;
}
/**
 * Return first portion of ISO string (YYYY-mm-dd)
 */
export function dateToISO(date) {
    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }
    return "";
}
/**
 * Check if two dates are the same day, month, year
 */
export function sameDate(d1, d2) {
    return (d1 instanceof Date &&
        d2 instanceof Date &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear());
}
/**
 * Get a date one month in the past
 */
export function prevMonth(date) {
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
 * Get a date one month in the future
 */
export function nextMonth(date) {
    const month = date.getMonth();
    const nextDate = new Date(date);
    nextDate.setMonth(month + 1);
    // date doesn't exist in new month, use last day
    if ((month + 2) % 7 === nextDate.getMonth() % 7) {
        return new Date(date.getFullYear(), month + 2, 0);
    }
    return nextDate;
}
