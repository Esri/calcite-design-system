import { numberKeys } from "./key";

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
    return isValidNumber(result) ? Number(result).toString() : null;
  });
}

export function sanitizeDecimalString(decimalString: string): string {
  const decimalAtEndOfStringButNotStart = /(?!^\.)\.$/;
  return decimalString.replace(decimalAtEndOfStringButNotStart, "");
}

export function sanitizeNegativeString(negativeString: string): string {
  const allHyphensExceptTheStart = /(?!^-)-/g;
  return negativeString.replace(allHyphensExceptTheStart, "");
}

export function sanitizeLeadingZeroString(zeroString: string): string {
  const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
  return zeroString.replace(allLeadingZerosOptionallyNegative, "$1");
}

export function sanitizeNumberString(numberString: string): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    const sanitizedValue = sanitizeNegativeString(sanitizeDecimalString(sanitizeLeadingZeroString(nonExpoNumString)));
    const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;

    return isValidNumber(sanitizedValue)
      ? isNegativeDecimalOnlyZeros.test(sanitizedValue)
        ? sanitizedValue
        : Number(sanitizedValue).toString()
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
