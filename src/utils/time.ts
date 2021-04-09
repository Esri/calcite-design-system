export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second: string;
}

export type TimeFocusId = "hour" | MinuteOrSecond | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

export const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function getMeridiem(hour: string): Meridiem {
  if (stringIsValidNumber(hour)) {
    const hourAsNumber = parseInt(hour);
    return hourAsNumber >= 0 && hourAsNumber <= 11 ? "AM" : "PM";
  }
  return null;
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

export function stringIsValidNumber(value: string): boolean {
  if (!value) {
    return false;
  }
  const letters = /^[A-Za-z]+$/;
  const numbers = /^[0-9]+$/;
  const letterMatch = value.match(letters);
  const numberMatch = value.match(numbers);
  const hasLetters = Array.isArray(letterMatch);
  const hasNumbers = Array.isArray(numberMatch);
  const isValidNumber = !isNaN(parseInt(value));
  if (hasNumbers && !hasLetters && isValidNumber) {
    return true;
  }
  return false;
}

export function validateTimeString(value: string): string {
  if (!value) {
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
    const hourValid = stringIsValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
    const minuteValid = stringIsValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
    const secondValid = stringIsValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
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
