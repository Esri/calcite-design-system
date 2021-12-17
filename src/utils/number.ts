import { data } from "autoprefixer";
import { number } from "yargs";
import { numberKeys } from "./key";

export function isValidNumber(numberString: string): boolean {
  return !(!numberString || isNaN(Number(numberString)));
}

export function parseNumberString(numberString?: string): string {
  return applyFuncOnNumberString(numberString, (nonExpoNumString: string): string => {
    if (!nonExpoNumString || !stringContainsNumbers(nonExpoNumString)) {
      return null;
    }
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
    return isValidNumber(result) ? Number(result).toString() : null;
  });
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
  const sanitizeNonExponentialString = (nonExpoNumString: string) =>
    nonExpoNumString
      ? Number(sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(nonExpoNumString)))).toString()
      : nonExpoNumString;

  let paddedEValue = value;
  if (/^[eE]/.test(value)) {
    paddedEValue = "1" + paddedEValue;
  }

  const numberSections = paddedEValue.split(/[eE]/);
  if (numberSections.length !== 2 || /[eE]/.test(value.charAt(value.length - 1))) {
    return sanitizeNonExponentialString(value.replace(/[eE]/g, ""));
  }
  return numberSections.map((section) => sanitizeNonExponentialString(section)).join("e");
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}

export function applyFuncOnNumberString(numberString: string, func: (s: string) => string): string {
  const sanitizedNumberString = sanitizeNumberString(numberString);

  return /[eE]/.test(sanitizedNumberString)
    ? sanitizedNumberString
        .split("e")
        .map((numSection) => func(numSection))
        .join("e")
    : func(numberString);
}
