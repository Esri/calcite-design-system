export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(value, max));

const decimalNumberRegex = new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

/**
 * Returns the quantity of real decimal places for a number, which excludes trailing zeros.
 *
 * Adapted from {@link https://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number}.
 *
 * @param decimal - decimal value
 * @param value
 * @returns {number} the amount of decimal places in a number
 */
export const decimalPlaces = (value: number | string): number => {
  const match = ("" + value).match(decimalNumberRegex);
  if (!match || parseInt(match[1]) === 0) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0)
  );
};

export function getDecimals(value: number): number {
  if (decimalPlaces(value) > 0 && value > 0) {
    return parseFloat(`0.${value.toString().split(".")[1]}`);
  }
  return value;
}

export function remap(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}

/**
 * Helper to determine if a value is close to the edge of a range within a threshold.
 *
 * @param value
 * @param range
 * @param threshold
 * @returns -1 if close to lower edge, 1 if close to upper edge, 0 otherwise.
 */
export function closeToRangeEdge(value: number, range: number, threshold: number): number {
  return value < threshold ? -1 : value > range - threshold ? 1 : 0;
}
