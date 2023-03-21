import { numberKeys } from "./key";
import { NumberStringFormat } from "./locale";

const unnecessaryDecimal = new RegExp(`\\${"."}(0+)?$`);
const trailingZeros = new RegExp("0+$");

const isNegativeNumber = (numberString: string) => numberString.charAt(0) === "-";

// adopted from https://stackoverflow.com/a/66939244
export class BigDecimal {
  value: bigint;

  // BigInt("-0").toString() === "0" which removes the minus sign when typing numbers like -0.1
  isNegative: boolean;

  // Configuration: constants
  static DECIMALS = 100; // number of decimals on all instances

  static ROUNDED = true; // numbers are truncated (false) or rounded (true)

  static SHIFT = BigInt("1" + "0".repeat(BigDecimal.DECIMALS)); // derived constant

  constructor(input: string | BigDecimal) {
    if (input instanceof BigDecimal) {
      return input;
    }
    const [integers, decimals] = expandExponentialNumberString(input).split(".").concat("");
    this.value =
      BigInt(integers + decimals.padEnd(BigDecimal.DECIMALS, "0").slice(0, BigDecimal.DECIMALS)) +
      BigInt(BigDecimal.ROUNDED && decimals[BigDecimal.DECIMALS] >= "5");

    this.isNegative = isNegativeNumber(input);
  }

  static _divRound = (dividend: bigint, divisor: bigint): BigDecimal =>
    BigDecimal.fromBigInt(
      dividend / divisor + (BigDecimal.ROUNDED ? ((dividend * BigInt(2)) / divisor) % BigInt(2) : BigInt(0))
    );

  static fromBigInt = (bigint: bigint): BigDecimal =>
    Object.assign(Object.create(BigDecimal.prototype), { value: bigint, isNegative: bigint < BigInt(0) });

  getIntegersAndDecimals(): { integers: string; decimals: string } {
    const s = this.value
      .toString()
      .replace("-", "")
      .padStart(BigDecimal.DECIMALS + 1, "0");
    const integers = s.slice(0, -BigDecimal.DECIMALS);
    const decimals = s.slice(-BigDecimal.DECIMALS).replace(trailingZeros, "");
    return { integers, decimals };
  }

  toString(): string {
    const { integers, decimals } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${integers}${decimals.length ? "." + decimals : ""}`;
  }

  formatToParts(formatter: NumberStringFormat): Intl.NumberFormatPart[] {
    const { integers, decimals } = this.getIntegersAndDecimals();
    const parts = formatter.numberFormatter.formatToParts(BigInt(integers));
    this.isNegative && parts.unshift({ type: "minusSign", value: formatter.minusSign });

    if (decimals.length) {
      parts.push({ type: "decimal", value: formatter.decimal });
      decimals
        .split("")
        .forEach((char: string) =>
          parts.push({ type: "fraction", value: formatter.numberFormatter.format(Number(char)) })
        );
    }

    return parts;
  }

  format(formatter: NumberStringFormat): string {
    const { integers, decimals } = this.getIntegersAndDecimals();
    const integersFormatted = `${this.isNegative ? formatter.minusSign : ""}${formatter.numberFormatter.format(
      BigInt(integers)
    )}`;
    // format decimals one char at a time so leading zeros aren't removed
    const decimalsFormatted = decimals.length
      ? `${formatter.decimal}${decimals
          .split("")
          .map((char: string) => formatter.numberFormatter.format(Number(char)))
          .join("")}`
      : "";
    return `${integersFormatted}${decimalsFormatted}`;
  }

  add(n: string): BigDecimal {
    return BigDecimal.fromBigInt(this.value + new BigDecimal(n).value);
  }

  subtract(n: string): BigDecimal {
    return BigDecimal.fromBigInt(this.value - new BigDecimal(n).value);
  }

  multiply(n: string): BigDecimal {
    return BigDecimal._divRound(this.value * new BigDecimal(n).value, BigDecimal.SHIFT);
  }

  divide(n: string): BigDecimal {
    return BigDecimal._divRound(this.value * BigDecimal.SHIFT, new BigDecimal(n).value);
  }
}

export function isValidNumber(numberString: string): boolean {
  return !(!numberString || isNaN(Number(numberString)));
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}

/*
 * Parses and sanitizes a string into a valid number, if possible.
 * The function is used for pasted text which can contain any characters.
 */
export function parseNumberString(numberString?: string): string {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return "";
  }

  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    let containsDecimal = false;
    const result = nonExpoNumString
      .split("")
      .filter((value, i) => {
        if (value === "." && !containsDecimal) {
          containsDecimal = true;
          return true;
        }
        if (value === "-" && i === 0) {
          return true;
        }
        return numberKeys.includes(value);
      })
      .reduce((string, part) => string + part);
    return isValidNumber(result) ? new BigDecimal(result).toString() : "";
  });
}

// regex for number sanitization
const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
const decimalOnlyAtEndOfString = /(?!^\.)\.$/;
const allHyphensExceptTheStart = /(?!^-)-/g;
const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;

/*
 * Attempts to sanitize numbers as they are being typed. If the sanitized value is not
 * a valid number, the initial value is returned to prevent interrupting a user's typing.
 */
export const sanitizeNumberString = (numberString: string): string =>
  sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    const sanitizedValue = nonExpoNumString
      .replace(allHyphensExceptTheStart, "")
      .replace(decimalOnlyAtEndOfString, "")
      .replace(allLeadingZerosOptionallyNegative, "$1");

    return isValidNumber(sanitizedValue)
      ? // BigDecimal uses BigInt internally, which doesn't support -0 like number does
        isNegativeDecimalOnlyZeros.test(sanitizedValue)
        ? sanitizedValue
        : new BigDecimal(sanitizedValue).toString() // formats the number for consistency
      : nonExpoNumString;
  });

/**
 * Runs the provided function on the numbers before and after the first "e", if applicable.
 * This function is used by our locale/number utils to support exponential notation.
 * It also sanitizes decimals and E's from the magnitude of numbers in exponential notation.
 *
 * @param  {string} numberString the stringified number (potentially in exponential notation) to sanitize
 * @param {(s: string) => string} func the sanitization function to run on each side of the "e"
 * @returns {string} the sanitized numberString
 */
export function sanitizeExponentialNumberString(numberString: string, func: (s: string) => string): string {
  if (!numberString) {
    return numberString;
  }

  const firstE = numberString.toLowerCase().indexOf("e") + 1;

  if (!firstE) {
    return func(numberString);
  }

  return numberString
    .replace(/[eE]*$/g, "")
    .substring(0, firstE)
    .concat(numberString.slice(firstE).replace(/[eE]/g, "")) // remove E's from the magnitude
    .split(/[eE]/)
    .map((section, i) =>
      i === 1
        ? func(section.replace(/\./g, "")) // remove decimals from the magnitude
        : func(section)
    )
    .join("e")
    .replace(/^e/, "1e");
}

/**
 * Converts an exponential notation numberString into decimal notation.
 * BigInt doesn't support exponential notation, so this is required to maintain precision
 *
 * @param {string} numberString - pre-validated exponential or decimal number
 * @returns {string} numberString in decimal notation
 */
export function expandExponentialNumberString(numberString: string): string {
  const exponentialParts = numberString.split(/[eE]/);
  if (exponentialParts.length === 1) {
    return numberString;
  }

  const number = +numberString;
  if (Number.isSafeInteger(number)) {
    return `${number}`;
  }

  const isNegative = isNegativeNumber(numberString);
  const magnitude = +exponentialParts[1];
  const decimalParts = exponentialParts[0].split(".");
  const integers = (isNegative ? decimalParts[0].substring(1) : decimalParts[0]) || "";
  const decimals = decimalParts[1] || "";

  const shiftDecimalLeft = (): string => {
    const magnitudeDelta = Math.abs(magnitude) - integers.length;
    const leftPaddedZeros = magnitudeDelta > 0 ? `${"0".repeat(magnitudeDelta)}${integers}` : integers;
    const shiftedDecimal = `${leftPaddedZeros.slice(0, magnitude)}${"."}${leftPaddedZeros.slice(magnitude)}`;
    return shiftedDecimal;
  };

  const shiftDecimalRight = (): string => {
    const rightPaddedZeros =
      magnitude > decimals.length ? `${decimals}${"0".repeat(magnitude - decimals.length)}` : decimals;
    const shiftedDecimal = `${rightPaddedZeros.slice(0, magnitude)}${"."}${rightPaddedZeros.slice(magnitude)}`;
    return shiftedDecimal;
  };

  const expandedNumberString = magnitude > 0 ? `${integers}${shiftDecimalRight()}` : `${shiftDecimalLeft()}${decimals}`;

  return `${isNegative ? "-" : ""}${expandedNumberString.charAt(0) === "." ? "0" : ""}${expandedNumberString
    .replace(unnecessaryDecimal, "")
    .replace(allLeadingZerosOptionallyNegative, "")}`;
}
