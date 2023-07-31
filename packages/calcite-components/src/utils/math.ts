export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(value, max));

const decimalNumberRegex = new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

export const decimalPlaces = (value: number): number => {
  const match = ("" + value).match(decimalNumberRegex);
  if (!match) {
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

export function remap(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}
