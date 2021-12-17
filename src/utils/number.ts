import { data } from "autoprefixer";
import { number } from "yargs";
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
  const sanitizeNonExponentialString = (nonExpoNum) =>
    nonExpoNum
      ? Number(sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(nonExpoNum)))).toString()
      : nonExpoNum;

  let paddedEValue = value;
  if (/^[eE]/.test(value)) {
    paddedEValue = "1" + paddedEValue;
  }
  if (/[eE]$/.test(value)) {
    paddedEValue = paddedEValue + "1";
  }

  const numberSections = paddedEValue.split(/[eE]/);
  if (numberSections.length !== 2) {
    return sanitizeNonExponentialString(value.replace(/[eE]/g, ""));
  }
  return numberSections.map((section) => sanitizeNonExponentialString(section)).join("e");
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}
