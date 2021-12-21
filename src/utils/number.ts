import { numberKeys } from "./key";

export function isValidNumber(numberString: string): boolean {
  return !(!numberString || isNaN(Number(numberString)));
}

export function parseNumberString(numberString?: string): string {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return null;
  }
  let containsDecimal = false;
  const result = numberString
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
  return isValidNumber(result) ? Number(result).toString() : null;
}

export function sanitizeDecimalString(decimalString: string): string {
  return decimalString?.endsWith(".") ? decimalString.replace(".", "") : decimalString;
}

export function sanitizeNegativeString(negativeString: string): string {
  return negativeString.charAt(0) + negativeString.substring(1).replace(/-/g, "");
}

export function sanitizeLeadingZeroString(zeroString: string): string {
  return zeroString.replace(/^0+$/, "0");
}

export function sanitizeNumberString(value: string): string {
  return value
    ? Number(sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(value)))).toString()
    : value;
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}
