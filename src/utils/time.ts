export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second?: string;
}

export type TimeComponents = "hour" | MinuteOrSecond | "meridiem";

export function formatNumberAsTimeString(number: number): string {
  const numberAsString = number.toString();
  return number >= 0 && number <= 9 ? numberAsString.padStart(2, "0") : numberAsString;
}

export const maxTenthForMinuteAndSecond = 5;

export const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function stringContainsOnlyNumbers(value: string): boolean {
  if (!value) {
    return false;
  }
  const letters = /^[A-Za-z]+$/;
  const numbers = /^[0-9]+$/;
  const letterMatch = value.match(letters);
  const numberMatch = value.match(numbers);
  const hasLetters = Array.isArray(letterMatch);
  const hasNumbers = Array.isArray(numberMatch);
  if (hasNumbers && !hasLetters) {
    return true;
  }
  return false;
}
