import { numberKeys } from "./key";

export function isValidNumber(numberString: string): boolean {
  return !(!numberString || isNaN(Number(numberString)));
}

export function parseNumberString(numberString?: string): string {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return null;
  }

  return handleExponentialNumberString(numberString, (nonExpoNumString: string): string => {
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
  return zeroString.replace(/^0+/, "0");
}

export function sanitizeNumberString(numberString: string): string {
  return handleExponentialNumberString(numberString, (nonExpoNumString) =>
    nonExpoNumString
      ? Number(sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(nonExpoNumString)))).toString()
      : nonExpoNumString
  );
}

export function handleExponentialNumberString(numberString: string, func: (s: string) => string): string {
  if (!numberString) {
    return numberString;
  }

  const numberSections = /^[eE]/.test(numberString) ? ("1" + numberString).split(/[eE]/) : numberString.split(/[eE]/);

  return numberSections.length !== 2 || /[eE]/.test(numberString.charAt(numberString.length - 1))
    ? func(numberString.replace(/[eE]/g, ""))
    : numberSections.map((section) => func(section)).join("e");
}

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}
