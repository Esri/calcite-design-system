import { GenericController, T9nMeta } from "@arcgis/components-controllers";
import { GenericT9nStrings } from "@arcgis/components-utils";
import {
  EffectiveHourFormat,
  formatTimePart,
  getLocaleHourFormat,
  getLocalizedDecimalSeparator,
  getLocalizedTimePartSuffix,
  getMeridiem,
  getMeridiemOrder,
  HourFormat,
  isValidTime,
  localizeTimePart,
  localizeTimeStringToParts,
  Meridiem,
  MinuteOrSecond,
  parseTimeString,
  toISOTimeString,
} from "../../utils/time";
import { decimalPlaces, getDecimals } from "../../utils/math";
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
  hourFormat: EffectiveHourFormat;
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
  value: string;
};

export class TimeController extends GenericController<TimeProperties, RequiredTimeArguments> implements TimeProperties {
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
  second: string;
  value: string;

  // #endregion

  // #region Lifecycle

  hostConnected(): void {
    const { hourFormat, messages } = this.component;
    const locale = messages._lang as SupportedLocale;
    this.hourFormat = hourFormat === "user" ? getLocaleHourFormat(locale) : hourFormat;
    this.meridiemOrder = getMeridiemOrder(locale);
  }

  // #endregion

  // #region Private Methods

  private decrementMinuteOrSecond(key: MinuteOrSecond): void {
    let newValue;
    if (isValidNumber(this[key])) {
      const valueAsNumber = parseInt(this[key]);
      newValue = valueAsNumber === 0 ? 59 : valueAsNumber - 1;
    } else {
      newValue = 59;
    }
    this.setValuePart(key, newValue);
  }

  private incrementMinuteOrSecond(key: MinuteOrSecond): void {
    const newValue = isValidNumber(this[key]) ? (this[key] === "59" ? 0 : parseInt(this[key]) + 1) : 0;
    this.setValuePart(key, newValue);
  }

  // #endregion

  // #region Public Methods

  decrementHour(): void {
    const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
    this.setValuePart("hour", newHour);
  }

  decrementMinute(): void {
    this.decrementMinuteOrSecond("minute");
  }

  decrementSecond(): void {
    this.decrementMinuteOrSecond("second");
  }

  incrementHour(): void {
    const newHour = isValidNumber(this.hour) ? (this.hour === "23" ? 0 : parseInt(this.hour) + 1) : 1;
    this.setValuePart("hour", newHour);
  }

  incrementMinute(): void {
    this.incrementMinuteOrSecond("minute");
  }

  incrementSecond(): void {
    this.incrementMinuteOrSecond("second");
  }

  nudgeFractionalSecond(direction: "up" | "down"): void {
    const stepDecimal = getDecimals(this.component.step);
    const stepPrecision = decimalPlaces(this.component.step);
    const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
    const fractionalSecondAsFloat = parseFloat(`0.${this.fractionalSecond}`);
    let nudgedValue;
    let nudgedValueRounded;
    let nudgedValueRoundedDecimals;
    let newFractionalSecond;
    if (direction === "up") {
      nudgedValue = isNaN(fractionalSecondAsInteger) ? 0 : fractionalSecondAsFloat + stepDecimal;
      nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
      nudgedValueRoundedDecimals = getDecimals(nudgedValueRounded);
      newFractionalSecond =
        nudgedValueRounded < 1 && decimalPlaces(nudgedValueRoundedDecimals) > 0
          ? formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
          : "".padStart(stepPrecision, "0");
    }
    if (direction === "down") {
      nudgedValue =
        isNaN(fractionalSecondAsInteger) || fractionalSecondAsInteger === 0
          ? 1 - stepDecimal
          : fractionalSecondAsFloat - stepDecimal;
      nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
      nudgedValueRoundedDecimals = getDecimals(nudgedValueRounded);
      newFractionalSecond =
        nudgedValueRounded < 1 &&
        decimalPlaces(nudgedValueRoundedDecimals) > 0 &&
        Math.sign(nudgedValueRoundedDecimals) === 1
          ? formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
          : "".padStart(stepPrecision, "0");
    }
    this.setValuePart("fractionalSecond", newFractionalSecond);
  }

  setValue(value: string): void {
    const { messages, numberingSystem, step } = this.component;
    const locale = messages._lang as string;
    const hour12 = this.hourFormat === "12";
    if (isValidTime(value)) {
      const newValue = toISOTimeString(value, step);
      const { hour, minute, second, fractionalSecond } = parseTimeString(newValue, step);
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
        hour12,
        locale,
        numberingSystem,
        step,
        value: newValue,
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
      this.value = newValue;
      this.component.value = newValue;
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
      this.component.value = null;
    }
  }

  setValuePart(
    key: "hour" | "minute" | "second" | "fractionalSecond" | "meridiem",
    value?: number | string | Meridiem,
  ): void {
    const { hourFormat } = this;
    const { messages, numberingSystem, step } = this.component;
    const locale = messages._lang as string;
    const hour12 = hourFormat === "12";
    if (key === "meridiem") {
      const oldMeridiem = this.meridiem;
      this.meridiem = value as Meridiem;
      this.localizedMeridiem = localizeTimePart({
        hour12,
        locale,
        numberingSystem,
        part: "meridiem",
        value: this.meridiem,
      });
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
          hour12,
          locale,
          numberingSystem,
          part: "hour",
          value: this.hour,
        });
      }
      if (oldMeridiem !== this.meridiem) {
        this.component.requestUpdate();
      }
    } else if (key === "fractionalSecond") {
      const oldFractionalSecond = this.fractionalSecond;
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
      if (oldFractionalSecond !== this.fractionalSecond) {
        this.component.requestUpdate();
      }
    } else {
      const oldValue = this[key];
      this[key] = typeof value === "number" ? formatTimePart(value) : value;
      this[`localized${capitalizeWord(key)}`] = localizeTimePart({
        value: this[key],
        part: key,
        locale,
        numberingSystem,
        hour12,
      });
      if (oldValue !== this[key]) {
        this.component.requestUpdate();
      }
    }
    const { hour, minute, second, fractionalSecond } = this;
    const newValue = toISOTimeString({ hour, minute, second, fractionalSecond }, step);
    const previousValue = this.value;
    if (previousValue !== newValue) {
      this.value = newValue;
      if (key === "hour" && this.meridiem) {
        this.localizedMeridiem = this.value
          ? localizeTimeStringToParts({
              hour12,
              locale,
              numberingSystem,
              value: this.value,
              step,
            })?.localizedMeridiem || null
          : localizeTimePart({ hour12, value: this.meridiem, part: "meridiem", locale, numberingSystem });
      }
      this.component.value = newValue;
    }
  }

  toggleMeridiem(): void {
    const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
    this.setValuePart("meridiem", newMeridiem);
  }

  // #endregion
}
