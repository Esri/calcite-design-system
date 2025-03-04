import { GenericController, T9nMeta } from "@arcgis/components-controllers";
import { GenericT9nStrings } from "@arcgis/components-utils";
import {
  formatTimePart,
  getLocalizedDecimalSeparator,
  getLocalizedTimePartSuffix,
  getMeridiem,
  getMeridiemOrder,
  HourFormat,
  isValidTime,
  localizeTimePart,
  localizeTimeStringToParts,
  Meridiem,
  parseTimeString,
  toISOTimeString,
  toISOTimeStringFromParts,
} from "../../utils/time";
import { decimalPlaces } from "../../utils/math";
import { isValidNumber } from "../../utils/number";
import { capitalizeWord } from "../../utils/text";
import { NumberingSystem, SupportedLocale } from "../../utils/locale";

export type RequiredTimeArguments = {
  hourFormat: HourFormat;
  messages: Partial<GenericT9nStrings> | T9nMeta<GenericT9nStrings>;
  numberingSystem: NumberingSystem;
  step: number;
  value: string;
};

type TimeProperties = {
  fractionalSecond: string;
  hour: string;
  locale: SupportedLocale;
  localizedDecimalSeparator: string;
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
  second: string;
  showFractionalSecond: boolean;
  showSecond: boolean;
  value: string;
};

export class TimeController extends GenericController<TimeProperties, RequiredTimeArguments> implements TimeProperties {
  // #region Public Properties

  fractionalSecond: string;
  hour: string;
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
  second: string;
  showFractionalSecond: boolean;
  showSecond: boolean;
  value: string;

  // #endregion

  // #region Lifecycle

  hostConnected(): void {
    this.setValue(this.component.value);
    this.meridiemOrder = getMeridiemOrder(this.component.messages._lang as string);
  }

  // #endregion

  // #region Public Methods

  decrementHour(): void {
    const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
    this.setValuePart("hour", newHour);
  }

  incrementHour(): void {
    const newHour = isValidNumber(this.hour) ? (this.hour === "23" ? 0 : parseInt(this.hour) + 1) : 1;
    this.setValuePart("hour", newHour);
  }

  setValue(value: string): void {
    const { hourFormat, messages, numberingSystem, step } = this.component;
    const locale = messages._lang as string;
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

  setValuePart(
    key: "hour" | "minute" | "second" | "fractionalSecond" | "meridiem",
    value: number | string | Meridiem,
  ): void {
    const { hourFormat, messages, numberingSystem, step } = this.component;
    const locale = messages._lang as string;
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
      const stepPrecision = decimalPlaces(step);
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
    this.component.requestUpdate();
    if (emit) {
      // TODO: handle event emitting
      // this.calciteTimePickerChange.emit();
    }
  }

  // #endregion
}
