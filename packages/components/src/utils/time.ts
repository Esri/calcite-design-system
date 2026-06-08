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
  hour: string | null;
  hourSuffix: string | null;
  minute: string | null;
  minuteSuffix: string | null;
  second: string | null;
  decimalSeparator: string;
  fractionalSecond: string | null;
  secondSuffix: string | null;
  meridiem: string | null;
}

export type Meridiem = "AM" | "PM";

export type MinuteOrSecond = "minute" | "second";

export interface Time {
  fractionalSecond?: string | null;
  hour?: string | null;
  minute?: string | null;
  second?: string | null;
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

export function formatTimePart(number: number | null | undefined, minLength?: number): string | undefined {
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
  meridiem?: Meridiem | null;
  parts?: Intl.DateTimeFormatPart[];
}): string | null | undefined {
  // Node v22 doesn't return correct localized meridiem for Hebrew.
  // Chromium doesn't return correct localized meridiem for Bosnian or Macedonian.
  // @see https://issues.chromium.org/issues/40172622
  // @see https://issues.chromium.org/issues/40676973
  const localesWithBrowserBugs = ["he", "bs", "mk"];
  let localizedMeridiem;
  if (fromParts) {
    localizedMeridiem = fromParts.find(({ type }) => type === "dayPeriod")?.value || null;
    if (locale && localesWithBrowserBugs.includes(locale)) {
      const localeData = localizedTwentyFourHourMeridiems.get(locale)!;
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
      const localeData = localizedTwentyFourHourMeridiems.get(locale)!;
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
}): string | null {
  const formatter = createLocaleDateTimeFormatter({ hour12, includeSeconds: step < 60, locale, numberingSystem });
  const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
  return getLocalizedTimePart(`${part}Suffix`, parts, locale);
}

function getLocalizedTimePart(part: TimePart, parts: Intl.DateTimeFormatPart[], locale: Locale = "en"): string | null {
  if (!part || !parts) {
    return null;
  }
  if (part === "hourSuffix") {
    const hourPart = parts.find(({ type }): boolean => type === "hour");
    const minutePart = parts.find(({ type }): boolean => type === "minute");
    const hourIndex = hourPart ? parts.indexOf(hourPart) : -1;
    const minuteIndex = minutePart ? parts.indexOf(minutePart) : -1;
    const hourSuffix = parts[hourIndex + 1];
    return hourSuffix?.type === "literal" && minuteIndex - hourIndex === 2 ? hourSuffix.value || null : null;
  }
  if (part === "minuteSuffix") {
    const minutePart = parts.find(({ type }): boolean => type === "minute");
    const minuteIndex = minutePart ? parts.indexOf(minutePart) : -1;
    const minuteSuffix = parts[minuteIndex + 1];
    return minuteSuffix?.type === "literal" ? minuteSuffix.value || null : null;
  }
  if (part === "secondSuffix") {
    let secondSuffixPart;
    const fractionalSecondPart = parts.find(({ type }): boolean => type === "fractionalSecond");
    const fractionalSecondIndex = fractionalSecondPart ? parts.indexOf(fractionalSecondPart) : -1;
    if (fractionalSecondIndex !== -1) {
      secondSuffixPart = parts[fractionalSecondIndex + 1];
    } else {
      const secondPart = parts.find(({ type }): boolean => type === "second");
      const secondIndex = secondPart ? parts.indexOf(secondPart) : -1;
      secondSuffixPart = parts[secondIndex + 1];
    }
    return (secondSuffixPart?.type === "literal" && secondSuffixPart.value) || null;
  }
  if (part === "meridiem") {
    const meridiemFromBrowser = parts.find(({ type }) => type === "dayPeriod")?.value || null;
    if (meridiemFromBrowser) {
      return getLocalizedMeridiem({ locale, parts }) ?? null;
    }
  }
  return parts.find(({ type }) => type === part)?.value || null;
}

export function getMeridiem(hour: string | null | undefined): Meridiem | null {
  if (!isValidNumber(hour)) {
    return null;
  }
  const hourAsNumber = parseInt(hour!);
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

export function isValidTime(value: string | Time | null | undefined): value is string | Time {
  const isString = typeof value === "string";
  if (
    !value ||
    (isString && (value.startsWith(":") || value.endsWith(":"))) ||
    (!isString && (!value.hour || !value.minute))
  ) {
    return false;
  }
  let hour: string | null | undefined;
  let minute: string | null | undefined;
  let second: string | null | undefined;
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
  const secondAsNumber = parseInt(second ?? "");
  const hourValid = isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
  const minuteValid = isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
  const secondValid = isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
  return hourValid && minuteValid && (!second || secondValid);
}

function isValidTimePart(value: string | null | undefined, part: TimePart): boolean {
  if (part === "meridiem") {
    return value === "AM" || value === "PM";
  }
  if (!isValidNumber(value)) {
    return false;
  }
  const valueAsString = value as string;
  const valueAsNumber = Number(valueAsString);
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
  value: string | null | undefined;
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
}: LocalizeTimePartParameters): string | null | undefined {
  if (!isValidTimePart(value, part)) {
    return;
  }
  if (part === "fractionalSecond") {
    const localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
    let localizedFractionalSecond: string | null = null;
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

  const valueAsNumber = parseInt(value as string);
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

type LocalizeTimeStringToStringParameters = {
  hour12?: boolean;
  includeSeconds?: boolean;
  locale: Locale;
  numberingSystem?: NumberingSystem;
  parts?: false | undefined;
  step?: number;
  value: string;
};
type LocalizeTimeStringToPartsParameters = {
  hour12?: boolean;
  includeSeconds?: boolean;
  locale: Locale;
  numberingSystem?: NumberingSystem;
  parts?: true;
  step?: number;
  value: string | null;
};
type LocalizeTimeStringParameters = LocalizeTimeStringToStringParameters | LocalizeTimeStringToPartsParameters;

export function localizeTimeString(params: LocalizeTimeStringToStringParameters): string | null;
export function localizeTimeString(params: LocalizeTimeStringToPartsParameters): LocalizedTime | null;
export function localizeTimeString({
  hour12,
  locale,
  numberingSystem = "latn",
  parts: toParts = false,
  step,
  value,
}: LocalizeTimeStringParameters): string | LocalizedTime | null {
  if (!isValidTime(value)) {
    return null;
  }
  const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value, step);
  const includeSeconds = (step as number) < 60;
  const dateFromTimeString = new Date(
    Date.UTC(
      0,
      0,
      0,
      parseInt(hour!),
      parseInt(minute!),
      includeSeconds && typeof second === "string" ? parseInt(second) : 0,
      includeSeconds && fractionalSecond ? fractionalSecondPartToMilliseconds(fractionalSecond) : 0,
    ),
  );

  const formatter = createLocaleDateTimeFormatter({
    fractionalSecondDigits: decimalPlaces(step as number) as FractionalSecondDigits,
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
      secondSuffix: locale !== "bg" ? getLocalizedTimePart("secondSuffix", parts) : null,
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
      const localeData = localizedTwentyFourHourMeridiems.get(locale)!;
      if (result!.includes("AM")) {
        result = (result as string).replaceAll("AM", localeData.am);
      } else if ((result as string).includes("PM")) {
        result = (result as string).replaceAll("PM", localeData.pm);
      }
      // This ensures just the decimal separator is replaced and not the period at the end of Macedonian meridiems.
      if (locale !== "he" && (result as string).indexOf(".") !== (result as string).length - 1) {
        result = (result as string).replace(".", ",");
      }
    }
    return result;
  }
}

export function parseTimeString(value: string | null, step?: number): Time {
  if (isValidTime(value)) {
    const [hour, minute, secondDecimal] = value.split(":");
    let second = secondDecimal;
    let fractionalSecond: string | null = null;
    if (secondDecimal?.includes(".")) {
      [second, fractionalSecond] = secondDecimal.split(".");
    }
    if (step && typeof fractionalSecond === "string") {
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

export function toISOTimeString(value: string | Time | null | undefined, step: number = 60): string | null {
  if (!isValidTime(value)) {
    return null;
  }

  let hour: string | null | undefined;
  let minute: string | null | undefined;
  let second: string | null | undefined;
  let secondDecimal: string | undefined;
  let fractionalSecond: string | null | undefined;
  let isoTimeString: string | null = null;

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
