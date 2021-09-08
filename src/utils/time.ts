import { isValidNumber } from "./number";

export type HourCycle = "12" | "24";

export interface LocalizedTime {
  localizedHour: string;
  localizedHourSuffix: string;
  localizedMinute: string;
  localizedMinuteSuffix: string;
  localizedSecond: string;
  localizedSecondSuffix: string;
  localizedMeridiem: string;
}

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  hour: string;
  minute: string;
  second: string;
}

export type TimePart = "hour" | "hourSuffix" | "minute" | "minuteSuffix" | "second" | "secondSuffix" | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

function createLocaleDateTimeFormatter(locale: string, includeSeconds = true): Intl.DateTimeFormat {
  try {
    const options: any = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    };
    if (includeSeconds) {
      options.second = "2-digit";
    }
    return new Intl.DateTimeFormat(locale, options);
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
  return `${formatTimePart(hourAsNumber)}:${formatTimePart(minuteAsNumber)}:${
    secondAsNumber ? formatTimePart(secondAsNumber) : "00"
  }`;
}

function getLocalizedTimePart(part: TimePart, parts: Intl.DateTimeFormatPart[]): string {
  if (!part || !parts) {
    return null;
  }
  if (part === "hourSuffix") {
    const hourIndex = parts.indexOf(parts.find(({ type }): boolean => type === "hour"));
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    if (minuteIndex - hourIndex === 2) {
      return parts[hourIndex + 1]?.value.trim() || null;
    }
  }
  if (part === "minuteSuffix") {
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    const secondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "second"));
    if (secondIndex - minuteIndex === 2) {
      return parts[minuteIndex + 1]?.value.trim() || null;
    }
  }
  if (part === "secondSuffix") {
    const secondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "second"));
    const meridiemIndex = parts.indexOf(parts.find(({ type }): boolean => type === "dayPeriod"));
    if (meridiemIndex - secondIndex === 2) {
      return parts[meridiemIndex + 1]?.value.trim() || null;
    }
  }
  return parts.find(({ type }) => (part == "meridiem" ? type === "dayPeriod" : type === part))?.value || null;
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

function isValidTimePart(value: string, part: TimePart): boolean {
  if (part === "meridiem") {
    return value === "AM" || value === "PM";
  }
  if (!isValidNumber(value)) {
    return false;
  }
  const valueAsNumber = Number(value);
  switch (part) {
    case "hour":
      return valueAsNumber >= 0 && valueAsNumber < 24;
    case "minute":
    case "second":
      return valueAsNumber >= 0 && valueAsNumber < 60;
  }
}

export function getLocaleHourCycle(locale: string): HourCycle {
  const formatter = createLocaleDateTimeFormatter(locale);
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart("meridiem", parts) ? "12" : "24";
}

export function localizeTimePart(value: string, part: TimePart, locale: string): string {
  if (!isValidTimePart(value, part)) {
    return;
  }
  const date = new Date(
    Date.UTC(
      0,
      0,
      0,
      part === "hour" ? parseInt(value) : 0,
      part === "minute" ? parseInt(value) : 0,
      part === "second" ? parseInt(value) : 0
    )
  );
  if (!date) {
    return;
  }
  const formatter = createLocaleDateTimeFormatter(locale);
  const parts = formatter.formatToParts(date);
  return getLocalizedTimePart(part, parts);
}

export function localizeTimeString(value: string, locale = "en", includeSeconds = true): string {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second) || 0));
  const formatter = createLocaleDateTimeFormatter(locale, includeSeconds);
  return formatter?.format(dateFromTimeString) || null;
}

export function localizeTimeStringToParts(value: string, locale = "en"): LocalizedTime {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale);
    const parts = formatter.formatToParts(dateFromTimeString);
    if (locale === "fr-CA" || locale === "bg") {
      console.log(locale, parts);
    }
    return {
      localizedHour: getLocalizedTimePart("hour", parts),
      localizedHourSuffix: getLocalizedTimePart("hourSuffix", parts),
      localizedMinute: getLocalizedTimePart("minute", parts),
      localizedMinuteSuffix: getLocalizedTimePart("minuteSuffix", parts),
      localizedSecond: getLocalizedTimePart("second", parts),
      localizedSecondSuffix: getLocalizedTimePart("secondSuffix", parts),
      localizedMeridiem: getLocalizedTimePart("meridiem", parts)
    };
  }
  return null;
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
