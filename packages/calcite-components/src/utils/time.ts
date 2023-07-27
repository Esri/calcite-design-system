import { getDateTimeFormat, getSupportedNumberingSystem, NumberingSystem, numberStringFormatter } from "./locale";
import { getDecimalPlaces, isValidNumber } from "./number";
export type HourCycle = "12" | "24";

export interface LocalizedTime {
  localizedHour: string;
  localizedHourSuffix: string;
  localizedMinute: string;
  localizedMinuteSuffix: string;
  localizedSecond: string;
  localizedDecimalSeparator: string;
  localizedFractionalSecond: string;
  localizedSecondSuffix: string;
  localizedMeridiem: string;
}

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  fractionalSecond: string;
  hour: string;
  minute: string;
  second: string;
}

export type TimePart = "hour" | "hourSuffix" | "minute" | "minuteSuffix" | "second" | "secondSuffix" | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

function createLocaleDateTimeFormatter(
  locale: string,
  numberingSystem: NumberingSystem,
  includeSeconds = true
): Intl.DateTimeFormat {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: getSupportedNumberingSystem(numberingSystem),
  };
  if (includeSeconds) {
    options.second = "2-digit";
  }

  return getDateTimeFormat(locale, options);
}

export function formatTimePart(number: number): string {
  const numberAsString = number.toString();
  return number >= 0 && number <= 9 ? numberAsString.padStart(2, "0") : numberAsString;
}

export function formatTimeString(value: string): string {
  if (!isValidTime(value)) {
    return null;
  }
  const [hourString, minuteString, secondString] = value.split(":");
  const hour = formatTimePart(parseInt(hourString));
  const minute = formatTimePart(parseInt(minuteString));
  if (secondString) {
    const second = formatTimePart(parseInt(secondString));
    return `${hour}:${minute}:${second}`;
  }
  return `${hour}:${minute}`;
}

export function getLocaleHourCycle(locale: string, numberingSystem: NumberingSystem): HourCycle {
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart("meridiem", parts) ? "12" : "24";
}

function getLocalizedTimePart(part: TimePart, parts: Intl.DateTimeFormatPart[]): string {
  if (!part || !parts) {
    return null;
  }
  if (part === "hourSuffix") {
    const hourIndex = parts.indexOf(parts.find(({ type }): boolean => type === "hour"));
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    const hourSuffix = parts[hourIndex + 1];
    return hourSuffix && hourSuffix.type === "literal" && minuteIndex - hourIndex === 2
      ? hourSuffix.value?.trim() || null
      : null;
  }
  if (part === "minuteSuffix") {
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    const secondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "second"));
    const minuteSuffix = parts[minuteIndex + 1];
    return minuteSuffix && minuteSuffix.type === "literal" && secondIndex - minuteIndex === 2
      ? minuteSuffix.value?.trim() || null
      : null;
  }
  if (part === "secondSuffix") {
    const secondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "second"));
    const secondSuffix = parts[secondIndex + 1];
    return secondSuffix && secondSuffix.type === "literal" ? secondSuffix.value?.trim() || null : null;
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

export function isValidTime(value: string): boolean {
  if (!value || value.startsWith(":") || value.endsWith(":")) {
    return false;
  }
  const splitValue = value.split(":");
  const validLength = splitValue.length > 1 && splitValue.length < 4;
  if (!validLength) {
    return false;
  }
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

function isValidTimePart(value: string, part: TimePart): boolean {
  if (part === "meridiem") {
    return value === "AM" || value === "PM";
  }
  if (!isValidNumber(value)) {
    return false;
  }
  const valueAsNumber = Number(value);
  return part === "hour" ? valueAsNumber >= 0 && valueAsNumber < 24 : valueAsNumber >= 0 && valueAsNumber < 60;
}

interface LocalizeTimePartParameters {
  value: string;
  part: TimePart;
  locale: string;
  numberingSystem: NumberingSystem;
}

export function localizeTimePart({ value, part, locale, numberingSystem }: LocalizeTimePartParameters): string {
  if (!isValidTimePart(value, part)) {
    return;
  }
  const valueAsNumber = parseInt(value);
  const date = new Date(
    Date.UTC(
      0,
      0,
      0,
      part === "hour" ? valueAsNumber : part === "meridiem" ? (value === "AM" ? 0 : 12) : 0,
      part === "minute" ? valueAsNumber : 0,
      part === "second" ? valueAsNumber : 0
    )
  );
  if (!date) {
    return;
  }
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
  const parts = formatter.formatToParts(date);
  return getLocalizedTimePart(part, parts);
}

interface LocalizeTimeStringParameters {
  value: string;
  includeSeconds?: boolean;
  locale: string;
  numberingSystem: NumberingSystem;
}

export function localizeTimeString({
  value,
  locale,
  numberingSystem,
  includeSeconds = true,
}: LocalizeTimeStringParameters): string {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0" } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem, includeSeconds);
  return formatter?.format(dateFromTimeString) || null;
}

interface LocalizeTimeStringToPartsParameters {
  value: string;
  locale: string;
  numberingSystem: NumberingSystem;
}

export function localizeTimeStringToParts({
  value,
  locale,
  numberingSystem,
}: LocalizeTimeStringToPartsParameters): LocalizedTime {
  if (!isValidTime(value)) {
    return null;
  }

  const { hour, minute, second = "0" } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(dateFromTimeString);

    let fractionalSecond, fractionalSecondDecimal, localizedFractionalSecondDecimal, localizedDecimalSeparator;
    const secondPrecision = getDecimalPlaces(second);
    if (secondPrecision && secondPrecision > 1) {
      fractionalSecond = parseFloat(second).toFixed(3);
      fractionalSecondDecimal = fractionalSecond.split(".", 2)[1];
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem,
      };
      localizedFractionalSecondDecimal = numberStringFormatter.localize(fractionalSecondDecimal);
      localizedDecimalSeparator = numberStringFormatter.localize("1.1").split("")[1];
    }

    return {
      localizedDecimalSeparator,
      localizedHour: getLocalizedTimePart("hour", parts),
      localizedHourSuffix: getLocalizedTimePart("hourSuffix", parts),
      localizedFractionalSecond: localizedFractionalSecondDecimal,
      localizedMinute: getLocalizedTimePart("minute", parts),
      localizedMinuteSuffix: getLocalizedTimePart("minuteSuffix", parts),
      localizedSecond: getLocalizedTimePart("second", parts),
      localizedSecondSuffix: getLocalizedTimePart("secondSuffix", parts),
      localizedMeridiem: getLocalizedTimePart("meridiem", parts),
    };
  }
  return null;
}

interface GetTimePartsParameters {
  value: string;
  locale: string;
  numberingSystem: NumberingSystem;
}
export function getTimeParts({ value, locale, numberingSystem }: GetTimePartsParameters): Intl.DateTimeFormatPart[] {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0" } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(dateFromTimeString);
    return parts;
  }
  return null;
}

export function parseTimeString(value: string): Time {
  if (isValidTime(value)) {
    const [hour, minute, secondDecimal] = value.split(":");
    let second, fractionalSecond;
    if (secondDecimal) {
      [second, fractionalSecond] = secondDecimal.split(".");
    }
    return {
      fractionalSecond: fractionalSecond && parseInt(fractionalSecond) !== 0 ? fractionalSecond : null,
      hour,
      minute,
      second,
    };
  }
  return {
    fractionalSecond: null,
    hour: null,
    minute: null,
    second: null,
  };
}

export function toISOTimeString(value: string, includeSeconds = true): string {
  if (!isValidTime(value)) {
    return "";
  }
  const { hour, minute, second } = parseTimeString(value);

  let isoTimeString = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;

  if (includeSeconds) {
    isoTimeString += `:${formatTimePart(parseInt((includeSeconds && second) || "0"))}`;
  }

  return isoTimeString;
}
