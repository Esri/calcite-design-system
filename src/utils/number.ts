export function parseNumberString(numberString: string): number {
  const number = Number(numberString);
  return isNaN(number) ? null : number;
}

export function sanitizeDecimalString(decimalString: string): string {
  const decimal = parseNumberString(decimalString);
  if (!decimal) {
    return "";
  }
  return decimalString.endsWith(".") ? decimalString.replace(".", "") : decimalString;
}
