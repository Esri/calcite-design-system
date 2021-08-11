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
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC"
    });
  } catch (e) {
    throw new Error(`Invalid locale supplied while attempting to create a DateTime formatter: ${locale}`);
  }
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
  const secondAsNumber = parseInt(second);
  return `${formatTimePart(hourAsNumber)}:${formatTimePart(minuteAsNumber)}:${secondAsNumber ? formatTimePart(secondAsNumber) : "00"}`;
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

export function localizeTimeString(value: string, locale: string = "en"): string {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale);
    return formatter.format(dateFromTimeString);
  }
  return value;
}

export function parseTimeString(value: string): Time {
  if (isValidTime(value)) {
    const [hour, minute, second] = value.split(":");
    return {
      hour,
      minute,
      second
    };
  }
  return {
    hour: null,
    minute: null,
    second: null
  };
}