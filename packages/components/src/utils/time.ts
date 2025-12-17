// @ts-strict-ignore
import {
  getDateTimeFormat,
  getSupportedNumberingSystem,
  Locale,
  localizedTwentyFourHourMeridiems,
  NumberingSystem,
  numberStringFormatter,
} from "./locale";
import { decimalPlaces } from "./math";
import { isValidNumber } from "./number";

export type FractionalSecondDigits = 1 | 2 | 3;

export type EffectiveHourFormat = "12" | "24";

export type HourFormat = "user" | EffectiveHourFormat;

export const hourFormats: EffectiveHourFormat[] = ["12", "24"];

export interface LocalizedTime {
  hour: string;
  hourSuffix: string;
  minute: string;
  minuteSuffix: string;
  second: string;
  decimalSeparator: string;
  fractionalSecond: string;
  secondSuffix: string;
  meridiem: string;
}

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  fractionalSecond?: string;
  hour: string;
  minute: string;
  second?: string;
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

interface DateTimeFormatterOptions {
  locale: Locale;
  numberingSystem?: NumberingSystem;
  includeSeconds?: boolean;
  fractionalSecondDigits?: FractionalSecondDigits;
  hour12?: boolean;
}

function createLocaleDateTimeFormatter({
  locale,
  numberingSystem,
  includeSeconds,
  fractionalSecondDigits,
  hour12,
}: DateTimeFormatterOptions): Intl.DateTimeFormat {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    numberingSystem: getSupportedNumberingSystem(numberingSystem),
  };
  if (typeof hour12 === "boolean") {
    options.hour12 = hour12;
  }
  if (includeSeconds) {
    options.second = "2-digit";
    if (fractionalSecondDigits) {
      options.fractionalSecondDigits = fractionalSecondDigits;
    }
  }

  return getDateTimeFormat(locale, options);
}

function formatFractionalSecond(fractionalSecondAsIntegerString: string, step: number): string {
  return parseFloat(`0.${fractionalSecondAsIntegerString}`).toFixed(decimalPlaces(step)).replace("0.", "");
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

function fractionalSecondPartToMilliseconds(fractionalSecondPart: string): number {
  return parseInt((parseFloat(`0.${fractionalSecondPart}`) / 0.001).toFixed(3));
}

export function getLocaleHourFormat(locale: Locale): EffectiveHourFormat {
  const options: DateTimeFormatterOptions = { locale };
  if (locale === "mk") {
    // Chromium's Intl.DateTimeFormat incorrectly formats mk time to 12-hour cycle so we need to force hour12 to false
    // @see https://issues.chromium.org/issues/40676973
    options.hour12 = false;
  } else if (locale.toLowerCase() === "es-mx") {
    // Firefox incorrectly formats es-MX time to 24-hour (should be 12)
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=1919656
    options.hour12 = true;
  }
  const formatter = createLocaleDateTimeFormatter(options);
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return parts.find(({ type }) => type === "dayPeriod")?.value ? "12" : "24";
}

/**
 * To reference the CLDR meridiems for each supported locale navigate to:
 * https://github.com/unicode-org/cldr-json/tree/main/cldr-json/cldr-dates-full/main,
 * click {locale}/ca-generic.json and drill down to main.{locale}.dates.calendars.generic.dayPeriods.format.abbreviated.
 *
 * @param locale.locale
 * @param locale
 * @param meridiem
 * @param parts
 * @param locale.meridiem
 * @param locale.parts
 */
export function getLocalizedMeridiem({
  locale,
  meridiem,
  parts: fromParts,
}: {
  locale: Locale;
  meridiem?: Meridiem;
  parts?: Intl.DateTimeFormatPart[];
}): string {
  // Node v22 doesn't return correct localized meridiem for Hebrew.
  // Chromium doesn't return correct localized meridiem for Bosnian or Macedonian.
  // @see https://issues.chromium.org/issues/40172622
  // @see https://issues.chromium.org/issues/40676973
  const localesWithBrowserBugs = ["he", "bs", "mk"];
  let localizedMeridiem;
  if (fromParts) {
    localizedMeridiem = fromParts.find(({ type }) => type === "dayPeriod")?.value || null;
    if (locale && localesWithBrowserBugs.includes(locale)) {
      const localeData = localizedTwentyFourHourMeridiems.get(locale);
      // This literal check is necessary because in some runtime environments the problem locales actually return the correct value.
      if (localizedMeridiem === "PM") {
        localizedMeridiem = localeData.pm;
      }
      // This literal check is necessary because in some runtime environments the problem locales actually return the correct value.
      if (localizedMeridiem === "AM") {
        localizedMeridiem = localeData.am;
      }
    }
  } else if (meridiem) {
    if (localesWithBrowserBugs.includes(locale)) {
      const localeData = localizedTwentyFourHourMeridiems.get(locale);
      localizedMeridiem = meridiem === "PM" ? localeData.pm : localeData.am;
    } else {
      const formatter = createLocaleDateTimeFormatter({ locale, hour12: true });
      const arbitraryAMHour = 6;
      const arbitraryPMHour = 18;
      const dateWithHourBasedOnMeridiem = new Date(
        Date.UTC(0, 0, 0, meridiem === "AM" ? arbitraryAMHour : arbitraryPMHour, 0),
      );
      const parts = formatter.formatToParts(dateWithHourBasedOnMeridiem);
      localizedMeridiem = parts.find(({ type }) => type === "dayPeriod")?.value || null;
    }
  }
  return localizedMeridiem;
}

export function getLocalizedDecimalSeparator(locale: Locale, numberingSystem: NumberingSystem): string {
  numberStringFormatter.numberFormatOptions = {
    locale,
    numberingSystem,
  };
  return numberStringFormatter.localize("1.1").split("")[1];
}

export function getLocalizedTimePartSuffix({
  hour12,
  locale,
  numberingSystem = "latn",
  part,
  step,
}: {
  hour12: boolean;
  locale: Locale;
  numberingSystem: NumberingSystem;
  part: Extract<TimePart, "hour" | "minute" | "second">;
  step: number;
}): string {
  const formatter = createLocaleDateTimeFormatter({ hour12, includeSeconds: step < 60, locale, numberingSystem });
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart(`${part}Suffix` as TimePart, parts, locale);
}

function getLocalizedTimePart(part: TimePart, parts: Intl.DateTimeFormatPart[], locale: Locale = "en"): string {
  if (!part || !parts) {
    return null;
  }
  if (part === "hourSuffix") {
    const hourIndex = parts.indexOf(parts.find(({ type }): boolean => type === "hour"));
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    const hourSuffix = parts[hourIndex + 1];
    return hourSuffix?.type === "literal" && minuteIndex - hourIndex === 2 ? hourSuffix.value || null : null;
  }
  if (part === "minuteSuffix") {
    const minuteIndex = parts.indexOf(parts.find(({ type }): boolean => type === "minute"));
    const minuteSuffix = parts[minuteIndex + 1];
    return minuteSuffix?.type === "literal" ? minuteSuffix.value || null : null;
  }
  if (part === "secondSuffix") {
    let secondSuffixPart;
    const fractionalSecondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "fractionalSecond"));
    if (fractionalSecondIndex !== -1) {
      secondSuffixPart = parts[fractionalSecondIndex + 1];
    } else {
      const secondIndex = parts.indexOf(parts.find(({ type }): boolean => type === "second"));
      secondSuffixPart = parts[secondIndex + 1];
    }
    return (secondSuffixPart?.type === "literal" && secondSuffixPart.value) || null;
  }
  if (part === "meridiem") {
    const meridiemFromBrowser = parts.find(({ type }) => type === "dayPeriod")?.value || null;
    if (meridiemFromBrowser) {
      return getLocalizedMeridiem({ locale, parts });
    }
  }
  return parts.find(({ type }) => type === part)?.value || null;
}

export function getMeridiem(hour: string): Meridiem {
  if (!isValidNumber(hour)) {
    return null;
  }
  const hourAsNumber = parseInt(hour);
  return hourAsNumber >= 0 && hourAsNumber <= 11 ? "AM" : "PM";
}

export function getMeridiemOrder(locale: Locale): number {
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
    timeZone: "UTC",
  });
  const timeParts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0)));
  return timeParts.findIndex((value) => value.type === "dayPeriod");
}

export function isValidTime(value: string | Time): boolean {
  const isString = typeof value === "string";
  if (
    !value ||
    (isString && (value.startsWith(":") || value.endsWith(":"))) ||
    (!isString && (!value.hour || !value.minute))
  ) {
    return false;
  }
  let hour;
  let minute;
  let second;
  if (isString) {
    [hour, minute, second] = value.split(":");
  } else {
    ({ hour, minute, second } = value);
  }
  if (!hour || !minute) {
    return false;
  }
  const hourAsNumber = parseInt(hour);
  const minuteAsNumber = parseInt(minute);
  const secondAsNumber = parseInt(second);
  const hourValid = isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
  const minuteValid = isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
  const secondValid = isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
  if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
    return true;
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
  const isZeroOrGreater = valueAsNumber >= 0;
  const isLessThanMaxHour = valueAsNumber < 24;
  const isLessThanMaxSecond = valueAsNumber < 60;
  const isLessThanMaxFractionalSecond = valueAsNumber <= 999;

  if (part === "hour") {
    return isZeroOrGreater && isLessThanMaxHour;
  }
  if (part === "fractionalSecond") {
    return isZeroOrGreater && isLessThanMaxFractionalSecond;
  }
  return isZeroOrGreater && isLessThanMaxSecond;
}

interface LocalizeTimePartParameters {
  value: string;
  part: TimePart;
  locale: Locale;
  numberingSystem?: NumberingSystem;
  hour12?: boolean;
}

export function localizeTimePart({
  value,
  part,
  locale,
  numberingSystem = "latn",
  hour12,
}: LocalizeTimePartParameters): string {
  if (!isValidTimePart(value, part)) {
    return;
  }
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

  const valueAsNumber = parseInt(value);
  const date = new Date(
    Date.UTC(
      0,
      0,
      0,
      part === "hour" ? valueAsNumber : part === "meridiem" ? (value === "AM" ? 0 : 12) : 0,
      part === "minute" ? valueAsNumber : 0,
      part === "second" ? valueAsNumber : 0,
    ),
  );
  if (!date) {
    return;
  }
  const includeSeconds = ["second", "fractionalSecond"].includes(part);
  const formatter = createLocaleDateTimeFormatter({ hour12, includeSeconds, locale, numberingSystem });
  const parts = formatter.formatToParts(date);
  return getLocalizedTimePart(part, parts, locale);
}

interface LocalizeTimeStringParameters {
  hour12?: boolean;
  includeSeconds?: boolean;
  locale: Locale;
  numberingSystem?: NumberingSystem;
  parts?: boolean;
  step?: number;
  value: string;
}

export function localizeTimeString({
  hour12,
  locale,
  numberingSystem = "latn",
  parts: toParts = false,
  step,
  value,
}: LocalizeTimeStringParameters): string | LocalizedTime {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value, step);
  const includeSeconds = step < 60;
  const dateFromTimeString = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(hour),
      parseInt(minute),
      includeSeconds && parseInt(second),
      includeSeconds && fractionalSecond && fractionalSecondPartToMilliseconds(fractionalSecond),
    ),
  );

  const formatter = createLocaleDateTimeFormatter({
    fractionalSecondDigits: decimalPlaces(step) as FractionalSecondDigits,
    hour12,
    includeSeconds,
    locale,
    numberingSystem,
  });
  if (toParts) {
    const parts = formatter.formatToParts(dateFromTimeString);
    return {
      hour: getLocalizedTimePart("hour", parts),
      hourSuffix: getLocalizedTimePart("hourSuffix", parts),
      minute: getLocalizedTimePart("minute", parts),
      minuteSuffix: getLocalizedTimePart("minuteSuffix", parts),
      second: getLocalizedTimePart("second", parts),
      decimalSeparator: getLocalizedDecimalSeparator(locale, numberingSystem),
      fractionalSecond: getLocalizedTimePart("fractionalSecond", parts),
      secondSuffix: locale !== "bg" && getLocalizedTimePart("secondSuffix", parts),
      meridiem: getLocalizedTimePart("meridiem", parts, locale),
    };
  } else {
    let result = formatter.format(dateFromTimeString) || null;

    // The bulgarian "ч." character (abbreviation for "hours") should not display for short and medium time formats.
    if (!toParts && typeof result === "string" && locale === "bg" && result && result.includes(" ч.")) {
      result = result.replaceAll(" ч.", "");
    }

    // Node v22 doesn't return correct localized meridiem for Hebrew.
    // Chromium doesn't return correct localized meridiem for Bosnian or Macedonian.
    // @see https://issues.chromium.org/issues/40172622
    // @see https://issues.chromium.org/issues/40676973
    if (["he", "bs", "mk"].includes(locale)) {
      const localeData = localizedTwentyFourHourMeridiems.get(locale);
      if (result.includes("AM")) {
        result = result.replaceAll("AM", localeData.am);
      } else if (result.includes("PM")) {
        result = result.replaceAll("PM", localeData.pm);
      }
      // This ensures just the decimal separator is replaced and not the period at the end of Macedonian meridiems.
      if (locale !== "he" && result.indexOf(".") !== result.length - 1) {
        result = result.replace(".", ",");
      }
    }
    return result;
  }
}

export function parseTimeString(value: string, step?: number): Time {
  if (isValidTime(value)) {
    const [hour, minute, secondDecimal] = value.split(":");
    let second = secondDecimal;
    let fractionalSecond = null;
    if (secondDecimal?.includes(".")) {
      [second, fractionalSecond] = secondDecimal.split(".");
    }
    if (step) {
      fractionalSecond = formatFractionalSecond(fractionalSecond, step);
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

export function toISOTimeString(value: string | Time, step: number = 60): string {
  if (!isValidTime(value)) {
    return null;
  }

  let hour: string;
  let minute: string;
  let second: string;
  let secondDecimal: string;
  let fractionalSecond: string;
  let isoTimeString: string = null;

  if (typeof value === "string") {
    [hour, minute, secondDecimal] = value.split(":");
    [second, fractionalSecond] = secondDecimal?.split(".") || ["0"];
  } else {
    hour = value.hour;
    minute = value.minute;
    second = value.second;
    fractionalSecond = value.fractionalSecond;
  }

  if (hour && minute) {
    isoTimeString = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;
    if (step < 60) {
      isoTimeString += `:${formatTimePart(parseInt(second || "0"))}`;
      if (step < 1) {
        isoTimeString += `.${formatFractionalSecond(fractionalSecond || "0", step)}`;
      }
    }
  }

  return isoTimeString;
}
