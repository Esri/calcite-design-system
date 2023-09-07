import { getDateTimeFormat, getSupportedNumberingSystem, NumberingSystem, numberStringFormatter } from "./locale";
import { decimalPlaces } from "./math";
import { isValidNumber } from "./number";

export type FractionalSecondDigits = 1 | 2 | 3;

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

export type TimePart =
  | "hour"
  | "hourSuffix"
  | "minute"
  | "minuteSuffix"
  | "second"
  | "decimalSeparator"
  | "fractionalSecond"
  | "secondSuffix"
  | "meridiem";

export const maxTenthForMinuteAndSecond = 5;

function createLocaleDateTimeFormatter(
  locale: string,
  numberingSystem: NumberingSystem,
  includeSeconds = true,
  fractionalSecondDigits?: FractionalSecondDigits
): Intl.DateTimeFormat {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: getSupportedNumberingSystem(numberingSystem),
  };
  if (includeSeconds) {
    options.second = "2-digit";
    if (fractionalSecondDigits) {
      options.fractionalSecondDigits = fractionalSecondDigits;
    }
  }

  return getDateTimeFormat(locale, options);
}

export function formatTimePart(number: number, minLength?: number): string {
  if (number === null || number === undefined) {
    return;
  }
  const numberAsString = number.toString();
  const numberDecimalPlaces = decimalPlaces(number);
  if (number < 1 && numberDecimalPlaces > 0 && numberDecimalPlaces < 4) {
    const fractionalDigits = numberAsString.replace("0.", "");
    if (!minLength || fractionalDigits.length === minLength) {
      return fractionalDigits;
    }
    if (fractionalDigits.length < minLength) {
      return fractionalDigits.padEnd(minLength, "0");
    }
    return fractionalDigits;
  }
  if (number >= 0 && number < 10) {
    return numberAsString.padStart(2, "0");
  }
  if (number >= 10) {
    return numberAsString;
  }
}

export function formatTimeString(value: string): string {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second, fractionalSecond } = parseTimeString(value);
  let formattedValue = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;
  if (second) {
    formattedValue += `:${formatTimePart(parseInt(second))}`;
    if (fractionalSecond) {
      formattedValue += `.${fractionalSecond}`;
    }
  }
  return formattedValue;
}

function fractionalSecondPartToMilliseconds(fractionalSecondPart: string): number {
  return parseInt((parseFloat(`0.${fractionalSecondPart}`) / 0.001).toFixed(3));
}

export function getLocaleHourCycle(locale: string, numberingSystem: NumberingSystem = "latn"): HourCycle {
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart("meridiem", parts) ? "12" : "24";
}

export function getLocalizedDecimalSeparator(locale: string, numberingSystem: NumberingSystem): string {
  numberStringFormatter.numberFormatOptions = {
    locale,
    numberingSystem,
  };
  return numberStringFormatter.localize("1.1").split("")[1];
}

export function getLocalizedTimePartSuffix(
  part: "hour" | "minute" | "second",
  locale: string,
  numberingSystem: NumberingSystem = "latn"
): string {
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart(`${part}Suffix` as TimePart, parts);
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
  numberingSystem?: NumberingSystem;
}

export function localizeTimePart({ value, part, locale, numberingSystem }: LocalizeTimePartParameters): string {
  if (part === "fractionalSecond") {
    const localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
    let localizedFractionalSecond = null;
    if (value) {
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem,
      };
      const localizedZero = numberStringFormatter.localize("0");
      if (parseInt(value) === 0) {
        localizedFractionalSecond = "".padStart(value.length, localizedZero);
      } else {
        localizedFractionalSecond = numberStringFormatter
          .localize(`0.${value}`)
          .replace(`${localizedZero}${localizedDecimalSeparator}`, "");
        if (localizedFractionalSecond.length < value.length) {
          localizedFractionalSecond = localizedFractionalSecond.padEnd(value.length, localizedZero);
        }
      }
    }
    return localizedFractionalSecond;
  }

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
  fractionalSecondDigits?: FractionalSecondDigits;
  locale: string;
  numberingSystem: NumberingSystem;
}

export function localizeTimeString({
  value,
  locale,
  numberingSystem,
  includeSeconds = true,
  fractionalSecondDigits,
}: LocalizeTimeStringParameters): string {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value);

  const dateFromTimeString = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
      fractionalSecond && fractionalSecondPartToMilliseconds(fractionalSecond)
    )
  );
  const formatter = createLocaleDateTimeFormatter(locale, numberingSystem, includeSeconds, fractionalSecondDigits);
  return formatter.format(dateFromTimeString) || null;
}

interface LocalizeTimeStringToPartsParameters {
  value: string;
  locale: string;
  numberingSystem?: NumberingSystem;
}

export function localizeTimeStringToParts({
  value,
  locale,
  numberingSystem = "latn",
}: LocalizeTimeStringToPartsParameters): LocalizedTime {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value);
  const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
  if (dateFromTimeString) {
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(dateFromTimeString);
    return {
      localizedHour: getLocalizedTimePart("hour", parts),
      localizedHourSuffix: getLocalizedTimePart("hourSuffix", parts),
      localizedMinute: getLocalizedTimePart("minute", parts),
      localizedMinuteSuffix: getLocalizedTimePart("minuteSuffix", parts),
      localizedSecond: getLocalizedTimePart("second", parts),
      localizedDecimalSeparator: getLocalizedDecimalSeparator(locale, numberingSystem),
      localizedFractionalSecond: localizeTimePart({
        value: fractionalSecond,
        part: "fractionalSecond",
        locale,
        numberingSystem,
      }),
      localizedSecondSuffix: getLocalizedTimePart("secondSuffix", parts),
      localizedMeridiem: getLocalizedTimePart("meridiem", parts),
    };
  }
  return null;
}

interface GetTimePartsParameters {
  value: string;
  locale: string;
  numberingSystem?: NumberingSystem;
}
export function getTimeParts({
  value,
  locale,
  numberingSystem = "latn",
}: GetTimePartsParameters): Intl.DateTimeFormatPart[] {
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
    let second = secondDecimal;
    let fractionalSecond = null;
    if (secondDecimal?.includes(".")) {
      [second, fractionalSecond] = secondDecimal.split(".");
    }
    return {
      fractionalSecond,
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
  const { hour, minute, second, fractionalSecond } = parseTimeString(value);

  let isoTimeString = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;

  if (includeSeconds) {
    isoTimeString += `:${formatTimePart(parseInt((includeSeconds && second) || "0"))}`;
    if (fractionalSecond) {
      isoTimeString += `.${fractionalSecond}`;
    }
  }

  return isoTimeString;
}
