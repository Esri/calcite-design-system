import { numberKeys } from "./key";

export function isValidNumber(numberString: string): boolean {
  return !numberString || isNaN(Number(numberString)) ? false : true;
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

function stringContainsNumbers(string: string): boolean {
  return numberKeys.some((number) => string.includes(number));
}
