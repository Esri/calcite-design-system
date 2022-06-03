import { numberKeys } from "./key";
import { createLocaleNumberFormatter, getDecimalSeparator, getMinusSign } from "./locale";

// regex for number sanitization
const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
const decimalAtEndOfStringButNotStart = /(?!^\.)\.$/;
const allHyphensExceptTheStart = /(?!^-)-/g;
const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;

// BigInt based solution borrowed from: https://stackoverflow.com/a/66939244
// BigInt limitations for  0 > n > -1 (e.g. -0.01): https://forum.kirupa.com/t/js-tip-of-the-day-negative-zero/643094
export class BigDecimal {
  _n: bigint;

  _isNegative: boolean;

  // Configuration: constants
  static DECIMALS = 20; // number of decimals on all instances

  static ROUNDED = true; // numbers are truncated (false) or rounded (true)

  static SHIFT = BigInt("1" + "0".repeat(BigDecimal.DECIMALS)); // derived constant

  constructor(value: string | BigDecimal) {
    if (value instanceof BigDecimal) {
      return value;
    }
    const [ints, decis] = String(value).split(".").concat("");
    this._n =
      BigInt(ints + decis.padEnd(BigDecimal.DECIMALS, "0").slice(0, BigDecimal.DECIMALS)) +
      BigInt(BigDecimal.ROUNDED && decis[BigDecimal.DECIMALS] >= "5");

    this._isNegative = value.charAt(0) === "-";
  }

  static _divRound(dividend: bigint, divisor: bigint): bigint {
    return BigDecimal.fromBigInt(
      dividend / divisor + (BigDecimal.ROUNDED ? ((dividend * BigInt(2)) / divisor) % BigInt(2) : BigInt(0))
    );
  }

  static fromBigInt(bigint: bigint): bigint {
    return Object.assign(Object.create(BigDecimal.prototype), { _n: bigint });
  }

  toString(): string {
    const s = this._n
      .toString()
      .replace(new RegExp("-", "g"), "")
      .padStart(BigDecimal.DECIMALS + 1, "0");

    const i = s.slice(0, -BigDecimal.DECIMALS);
    const d = s.slice(-BigDecimal.DECIMALS).replace(/\.?0+$/, "");
    const value = i.concat(d.length ? "." + d : "");
    return (this._isNegative ? "-" : "").concat(value);
  }

  formatToParts(locale: string, numberingSystem?: string): Intl.NumberFormatPart[] {
    const formatter = createLocaleNumberFormatter(locale, numberingSystem);

    const s = this._n
      .toString()
      .replace(new RegExp("-", "g"), "")
      .padStart(BigDecimal.DECIMALS + 1, "0");

    const i = s.slice(0, -BigDecimal.DECIMALS);
    const d = s.slice(-BigDecimal.DECIMALS).replace(/\.?0+$/, "");

    const parts = formatter.formatToParts(BigInt(i));
    if (d.length) {
      parts.push({ type: "decimal", value: getDecimalSeparator(locale) });
      d.split("").forEach((char: string) => parts.push({ type: "fraction", value: char }));
    }
    this._isNegative && parts.unshift({ type: "minusSign", value: getMinusSign(locale) });
    return parts;
  }

  add(num: string): bigint {
    return BigDecimal.fromBigInt(this._n + new BigDecimal(num)._n);
  }

  subtract(num: string): bigint {
    return BigDecimal.fromBigInt(this._n - new BigDecimal(num)._n);
  }

  multiply(num: string): bigint {
    return BigDecimal._divRound(this._n * new BigDecimal(num)._n, BigDecimal.SHIFT);
  }

  divide(num: string): bigint {
    return BigDecimal._divRound(this._n * BigDecimal.SHIFT, new BigDecimal(num)._n);
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
      .reduce((string, part) => string + part);

    return isValidNumber(result) ? new BigDecimal(result).toString() : "";
  });
}

export function sanitizeDecimalString(decimalString: string): string {
  return decimalString.replace(decimalAtEndOfStringButNotStart, "");
}

export function sanitizeNegativeString(negativeString: string): string {
  return negativeString.replace(allHyphensExceptTheStart, "");
}

export function sanitizeLeadingZeroString(zeroString: string): string {
  return zeroString.replace(allLeadingZerosOptionallyNegative, "$1");
}

export function sanitizeNumberString(numberString: string): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    const sanitizedValue = sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(nonExpoNumString)));
    const bigDecimalString = new BigDecimal(sanitizedValue).toString();

    return isValidNumber(sanitizedValue)
      ? isNegativeDecimalOnlyZeros.test(sanitizedValue)
        ? sanitizedValue
        : bigDecimalString
      : nonExpoNumString;
  });
}

export function sanitizeExponentialNumberString(numberString: string, func: (s: string) => string): string {
  if (!numberString) {
    return numberString;
  }

  const firstE = numberString.toLowerCase().indexOf("e") + 1;

  return numberString
    .replace(/[eE]*$/g, "")
    .substring(0, firstE)
    .concat(numberString.slice(firstE).replace(/[eE]/g, ""))
    .split(/[eE]/)
    .map((section, i) => (i === 1 ? func(section.replace(/\./g, "")) : func(section)))
    .join("e")
    .replace(/^e/, "1e");
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}
