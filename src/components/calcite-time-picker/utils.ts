export type AmPm = "--" | "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second?: string;
}

export function formatNumberAsTimeString(number: number): string {
  return number >= 0 && number <= 9 ? `0${number}` : number.toString();
}

export const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
