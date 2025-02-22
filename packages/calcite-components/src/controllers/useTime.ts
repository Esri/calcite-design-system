import { Controller } from "@arcgis/components-controllers";
import {
  EffectiveHourFormat,
  formatTimePart,
  getLocalizedDecimalSeparator,
  getLocalizedTimePartSuffix,
  getMeridiem,
  getMeridiemOrder,
  isValidTime,
  localizeTimePart,
  localizeTimeStringToParts,
  Meridiem,
  parseTimeString,
  toISOTimeString,
  toISOTimeStringFromParts,
} from "../utils/time";
import { decimalPlaces } from "../utils/math";
import { isValidNumber } from "../utils/number";
import { capitalizeWord } from "../utils/text";
import { NumberingSystem, SupportedLocale } from "../utils/locale";

export class TimeController extends Controller {
  constructor(value: string) {
    super();
    this.value = value;
  }

  // #region Public Properties

  fractionalSecond: string;

  hour: string;

  hourFormat: EffectiveHourFormat;

  locale: SupportedLocale;

  localizedDecimalSeparator = ".";

  localizedFractionalSecond: string;

  localizedHour: string;

  localizedHourSuffix: string;

  localizedMeridiem: string;

  localizedMinute: string;

  localizedMinuteSuffix: string;

  localizedSecond: string;

  localizedSecondSuffix: string;

  meridiem: Meridiem;

  meridiemOrder: number;

  minute: string;

  numberingSystem: NumberingSystem;

  second: string;

  showFractionalSecond: boolean;

  showSecond: boolean;

  step: number;

  value: string;

  // #endregion

  // #region Lifecycle

  hostConnected(): void {
    const { locale } = this;
    this.localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, this.numberingSystem);
    this.meridiemOrder = getMeridiemOrder(locale);
  }

  // #endregion

  // #region Private Methods

  setValue(value: string): void {
    const { hourFormat, locale, numberingSystem, step } = this;
    if (isValidTime(value)) {
      const { hour, minute, second, fractionalSecond } = parseTimeString(toISOTimeString(value), step);
      const {
        localizedHour,
        localizedHourSuffix,
        localizedMinute,
        localizedMinuteSuffix,
        localizedSecond,
        localizedDecimalSeparator,
        localizedFractionalSecond,
        localizedSecondSuffix,
        localizedMeridiem,
      } = localizeTimeStringToParts({
        value,
        locale,
        numberingSystem,
        hour12: hourFormat === "12",
      });
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.fractionalSecond = fractionalSecond;
      this.localizedHour = localizedHour;
      this.localizedHourSuffix = localizedHourSuffix;
      this.localizedMinute = localizedMinute;
      this.localizedMinuteSuffix = localizedMinuteSuffix;
      this.localizedSecond = localizedSecond;
      this.localizedDecimalSeparator = localizedDecimalSeparator;
      this.localizedFractionalSecond = localizedFractionalSecond;
      this.localizedSecondSuffix = localizedSecondSuffix;
      if (localizedMeridiem) {
        this.localizedMeridiem = localizedMeridiem;
        this.meridiem = getMeridiem(this.hour);
      }
    } else {
      this.hour = null;
      this.fractionalSecond = null;
      this.localizedHour = null;
      this.localizedHourSuffix = getLocalizedTimePartSuffix("hour", locale, numberingSystem);
      this.localizedMeridiem = null;
      this.localizedMinute = null;
      this.localizedMinuteSuffix = getLocalizedTimePartSuffix("minute", locale, numberingSystem);
      this.localizedSecond = null;
      this.localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
      this.localizedFractionalSecond = null;
      this.localizedSecondSuffix = getLocalizedTimePartSuffix("second", locale, numberingSystem);
      this.meridiem = null;
      this.minute = null;
      this.second = null;
      this.value = null;
    }
  }

  // #endregion

  // #region Public Methods

  setValuePart(
    key: "hour" | "minute" | "second" | "fractionalSecond" | "meridiem",
    value: number | string | Meridiem,
  ): void {
    const { hourFormat, locale, numberingSystem, step } = this;
    const hour12 = hourFormat === "12";
    if (key === "meridiem") {
      this.meridiem = value as Meridiem;
      if (isValidNumber(this.hour)) {
        const hourAsNumber = parseInt(this.hour);
        switch (value) {
          case "AM":
            if (hourAsNumber >= 12) {
              this.hour = formatTimePart(hourAsNumber - 12);
            }
            break;
          case "PM":
            if (hourAsNumber < 12) {
              this.hour = formatTimePart(hourAsNumber + 12);
            }
            break;
        }
        this.localizedHour = localizeTimePart({
          value: this.hour,
          part: "hour",
          locale,
          numberingSystem,
          hour12,
        });
      }
    } else if (key === "fractionalSecond") {
      const stepPrecision = decimalPlaces(this.step);
      if (typeof value === "number") {
        this.fractionalSecond = value === 0 ? "".padStart(stepPrecision, "0") : formatTimePart(value, stepPrecision);
      } else {
        this.fractionalSecond = value;
      }
      this.localizedFractionalSecond = localizeTimePart({
        value: this.fractionalSecond,
        part: "fractionalSecond",
        locale,
        numberingSystem,
        hour12,
      });
    } else {
      this[key] = typeof value === "number" ? formatTimePart(value) : value;
      this[`localized${capitalizeWord(key)}`] = localizeTimePart({
        value: this[key],
        part: key,
        locale,
        numberingSystem,
        hour12,
      });
    }
    let emit = false;
    const { hour, minute, second, fractionalSecond } = this;
    const newValue = toISOTimeStringFromParts({ hour, minute, second, fractionalSecond }, step);
    if (this.value !== newValue) {
      emit = true;
    }
    this.value = newValue;
    this.localizedMeridiem = this.value
      ? localizeTimeStringToParts({
          hour12,
          locale,
          numberingSystem,
          value: this.value,
        })?.localizedMeridiem || null
      : localizeTimePart({ value: this.meridiem, part: "meridiem", locale, numberingSystem });
    if (emit) {
      // TODO: handle event emitting
      // this.calciteTimePickerChange.emit();
    }
  }

  // #endregion
}
