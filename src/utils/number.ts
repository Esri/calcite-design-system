export function isValidNumber(numberString: string): boolean {
  return !numberString || isNaN(Number(numberString)) ? false : true;
}
