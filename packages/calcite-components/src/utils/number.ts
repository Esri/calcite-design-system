import { numberKeys } from "./key";
import { NumberStringFormat } from "./locale";

const unnecessaryDecimal = new RegExp(`\\${"."}(0+)?$`);
const trailingZeros = new RegExp("0+$");

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

    this.isNegative = input.charAt(0) === "-";
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
      decimals.split("").forEach((char: string) => parts.push({ type: "fraction", value: char }));
    }

    return parts;
  }

  format(formatter: NumberStringFormat): string {
    const { integers, decimals } = this.getIntegersAndDecimals();
    const integersFormatted = `${this.isNegative ? formatter.minusSign : ""}${formatter.numberFormatter.format(
      BigInt(integers)
    )}`;
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

export function parseNumberString(numberString?: string): string {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return "";
  }

  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    let containsDecimal = false;
    const result = nonExpoNumString
      .split("")
      .filter((value, i) => {
        if (value.match(/\./g) && !containsDecimal) {
          containsDecimal = true;
          return true;
        }
        if (value.match(/\-/g) && i === 0) {
          return true;
        }
        return numberKeys.includes(value);
      })
      .join("");
    return isValidNumber(result) ? new BigDecimal(result).toString() : "";
  });
}

// regex for number sanitization
const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
const decimalOnlyAtEndOfString = /(?!^\.)\.$/;
const allHyphensExceptTheStart = /(?!^-)-/g;
const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;
const hasTrailingDecimalZeros = /0*$/;

export const sanitizeNumberString = (numberString: string): string =>
  sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    const sanitizedValue = nonExpoNumString
      .replace(allHyphensExceptTheStart, "")
      .replace(decimalOnlyAtEndOfString, "")
      .replace(allLeadingZerosOptionallyNegative, "$1");
    return isValidNumber(sanitizedValue)
      ? isNegativeDecimalOnlyZeros.test(sanitizedValue)
        ? sanitizedValue
        : getBigDecimalAsString(sanitizedValue)
      : nonExpoNumString;
  });

export function getBigDecimalAsString(sanitizedValue: string): string {
  const sanitizedValueDecimals = sanitizedValue.split(".")[1];
  const value = new BigDecimal(sanitizedValue).toString();
  const [bigDecimalValueInteger, bigDecimalValueDecimals] = value.split(".");

  return sanitizedValueDecimals && bigDecimalValueDecimals !== sanitizedValueDecimals
    ? `${bigDecimalValueInteger}.${sanitizedValueDecimals}`
    : value;
}

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
    .concat(numberString.slice(firstE).replace(/[eE]/g, ""))
    .split(/[eE]/)
    .map((section, i) => (i === 1 ? func(section.replace(/\./g, "")) : func(section)))
    .join("e");
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

  const isNegative = numberString.charAt(0) === "-";
  const magnitude = +exponentialParts[1];
  const decimalParts = exponentialParts[0].split(".");
  const integers = (isNegative ? decimalParts[0].substring(1) : decimalParts[0]) || "";
  const decimals = decimalParts[1] || "";

  const shiftDecimalLeft = (integers: string, magnitude: number): string => {
    const magnitudeDelta = Math.abs(magnitude) - integers.length;
    const leftPaddedZeros = magnitudeDelta > 0 ? `${"0".repeat(magnitudeDelta)}${integers}` : integers;
    const shiftedDecimal = `${leftPaddedZeros.slice(0, magnitude)}${"."}${leftPaddedZeros.slice(magnitude)}`;
    return shiftedDecimal;
  };

  const shiftDecimalRight = (decimals: string, magnitude: number): string => {
    const rightPaddedZeros =
      magnitude > decimals.length ? `${decimals}${"0".repeat(magnitude - decimals.length)}` : decimals;
    const shiftedDecimal = `${rightPaddedZeros.slice(0, magnitude)}${"."}${rightPaddedZeros.slice(magnitude)}`;
    return shiftedDecimal;
  };

  const expandedNumberString =
    magnitude > 0
      ? `${integers}${shiftDecimalRight(decimals, magnitude)}`
      : `${shiftDecimalLeft(integers, magnitude)}${decimals}`;

  return `${isNegative ? "-" : ""}${expandedNumberString.charAt(0) === "." ? "0" : ""}${expandedNumberString
    .replace(unnecessaryDecimal, "")
    .replace(allLeadingZerosOptionallyNegative, "")}`;
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}

/**
 * Adds localized trailing decimals zero values to the number string.
 * BigInt conversion to string removes the trailing decimal zero values (Ex: 1.000 is returned as 1). This method helps adding them back.
 *
 * @param {string} localizedValue - localized number string value
 * @param {string} value - current value in the input field
 * @param {NumberStringFormat} formatter - numberStringFormatter instance to localize the number value
 * @returns {string} localized number string value
 */
export function addLocalizedTrailingDecimalZeros(
  localizedValue: string,
  value: string,
  formatter: NumberStringFormat
): string {
  const decimals = value.split(".")[1];
  if (decimals) {
    const trailingDecimalZeros = decimals.match(hasTrailingDecimalZeros)[0];
    if (
      trailingDecimalZeros &&
      formatter.delocalize(localizedValue).length !== value.length &&
      decimals.indexOf("e") === -1
    ) {
      const decimalSeparator = formatter.decimal;
      localizedValue = !localizedValue.includes(decimalSeparator)
        ? `${localizedValue}${decimalSeparator}`
        : localizedValue;
      return localizedValue.padEnd(localizedValue.length + trailingDecimalZeros.length, formatter.localize("0"));
    }
  }
  return localizedValue;
}
