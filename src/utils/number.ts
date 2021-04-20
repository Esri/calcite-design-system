export function isValidNumber(numberString: string): boolean {
  return !numberString || isNaN(Number(numberString)) ? false : true;
}

export function parseNumberString(numberString: string): number {
  return isValidNumber(numberString) ? Number(numberString) : null;
}

export function sanitizeDecimalString(decimalString: string): string {
  return isValidNumber(decimalString) && decimalString.endsWith(".") ? decimalString.replace(".", "") : decimalString;
}
