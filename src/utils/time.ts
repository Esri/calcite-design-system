import { isValidNumber } from "./number";

export type HourDisplayFormat = "12" | "24";

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second: string;
}

export type TimeFocusId = "hour" | MinuteOrSecond | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

function createLocaleDateTimeFormatter(locale: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale);
}

export function formatTimePart(number: number): string {
  const numberAsString = number.toString();
  return number >= 0 && number <= 9 ? numberAsString.padStart(2, "0") : numberAsString;
}

export function formatTimeString(value: string): string {
  if (!isValidTime(value)) {
    return null;
  }
  const splitValue = value.split(":");
  const [hour, minute, second] = splitValue;
  const hourAsNumber = parseInt(hour);
  const minuteAsNumber = parseInt(minute);
  let newValue = `${formatTimePart(hourAsNumber)}:${formatTimePart(minuteAsNumber)}`;
  if (second) {
    const secondAsNumber = parseInt(second);
    newValue = `${newValue}:${formatTimePart(secondAsNumber)}`;
  }
  return newValue;
}

export function getMeridiem(hour: string): Meridiem {
  if (!isValidNumber(hour)) {
    return null;
  }
  const hourAsNumber = parseInt(hour);
  return hourAsNumber >= 0 && hourAsNumber <= 11 ? "AM" : "PM";
}

export function getMeridiemHour(hour: string): string {
  if (!isValidNumber(hour)) {
    return null;
  }
  const hourAsNumber = parseInt(hour);
  if (hourAsNumber === 0) {
    return "12";
  }
  return hourAsNumber > 12 ? formatTimePart(hourAsNumber - 12) : hour;
}

export function isValidTime(value: string): boolean {
  if (!value || value.startsWith(":") || value.endsWith(":")) {
    return false;
  }
  const splitValue = value.split(":");
  if (splitValue.length > 1 && splitValue.length < 4) {
    const [hour, minute, second] = splitValue;
    const hourAsNumber = parseInt(splitValue[0]);
    const minuteAsNumber = parseInt(splitValue[1]);
    const secondAsNumber = parseInt(splitValue[2]);
    const hourValid = isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
    const minuteValid = isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
    const secondValid = isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
    if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
      return true;
    }
  }
  return false;
}

export function localizeTimeString(timeString: string, locale: string): string {
  const dateFromTimeString = new Date(timeString);
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale);
    const parts = formatter.formatToParts(dateFromTimeString);
    console.log(parts);
  }
  return timeString;
}

export function parseTimeString(value: string): Time {
  const timeString = formatTimeString(value);
  const [hour, minute, second] = timeString ? timeString.split(":") : [null, null, null];
  return {
    hour,
    minute,
    second: second || (hour && minute ? "00" : null)
  };
}