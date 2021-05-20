import { isValidNumber } from "./number";

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second: string;
}

export type TimeFocusId = "hour" | MinuteOrSecond | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

export function getMeridiem(hour: string): Meridiem {
  if (isValidNumber(hour)) {
    const hourAsNumber = parseInt(hour);
    return hourAsNumber >= 0 && hourAsNumber <= 11 ? "AM" : "PM";
  }
  return null;
}

export function getMeridiemHour(hour: string): string {
  if (!isValidNumber(hour)) {
    return null;
  }
  const hourAsNumber = parseInt(hour);
  if (hourAsNumber === 0) {
    return "12";
  }
  return hourAsNumber > 12 ? zeroPadNumber(hourAsNumber - 12) : hour;
}

export function parseTimeString(value: string): Time {
  const timeString = validateTimeString(value);
  const [hour, minute, second] = timeString ? timeString.split(":") : [null, null, null];
  return {
    hour,
    minute,
    second: second || (hour && minute ? "00" : null)
  };
}

export function validateTimeString(value: string): string {
  if (!value || value.endsWith(":") || value.startsWith(":")) {
    return null;
  }
  const splitValue = value.split(":");
  if (splitValue.length > 1) {
    const hour = splitValue[0];
    const minute = splitValue[1];
    const second = splitValue[2];
    const hourAsNumber = parseInt(splitValue[0]);
    const minuteAsNumber = parseInt(splitValue[1]);
    const secondAsNumber = parseInt(splitValue[2]);
    const hourValid = isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
    const minuteValid = isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
    const secondValid = isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
    if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
      let newValue = `${zeroPadNumber(hourAsNumber)}:${zeroPadNumber(minuteAsNumber)}`;
      if (secondValid) {
        newValue = `${newValue}:${zeroPadNumber(secondAsNumber)}`;
      }
      return newValue;
    }
  }
  return null;
}

export function zeroPadNumber(number: number): string {
  const numberAsString = number.toString();
  return number >= 0 && number <= 9 ? numberAsString.padStart(2, "0") : numberAsString;
}
