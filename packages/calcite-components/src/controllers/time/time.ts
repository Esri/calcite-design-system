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
  maxTenthForMinuteAndSecond,
  Meridiem,
  MinuteOrSecond,
  parseTimeString,
  toISOTimeString,
} from "../../utils/time";
import { decimalPlaces, getDecimals } from "../../utils/math";
import { isValidNumber } from "../../utils/number";
import { capitalizeWord } from "../../utils/text";
import { NumberingSystem, SupportedLocale } from "../../utils/locale";
import { numberKeys } from "../../utils/key";

export type RequiredTimeComponentProperties = {
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
};

export class TimeController
  extends GenericController<TimeProperties, RequiredTimeComponentProperties>
  implements TimeProperties
{
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

  // #endregion

  // #region Lifecycle

  hostConnected(): void {
    const { hourFormat, messages } = this.component;
    const locale = messages._lang as SupportedLocale;
    this.hourFormat = hourFormat === "user" ? getLocaleHourFormat(locale) : hourFormat;
    this.meridiemOrder = getMeridiemOrder(locale);
    this.setValue(this.component.value);
  }

  // #endregion

  // #region Private Methods

  private decrementHour(): void {
    const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
    this.setValuePart("hour", newHour);
  }

  private decrementMinute(): void {
    this.decrementMinuteOrSecond("minute");
  }

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

  private incrementHour(): void {
    const newHour = isValidNumber(this.hour) ? (this.hour === "23" ? 0 : parseInt(this.hour) + 1) : 1;
    this.setValuePart("hour", newHour);
  }

  private incrementMinute(): void {
    this.incrementMinuteOrSecond("minute");
  }

  private incrementMinuteOrSecond(key: MinuteOrSecond): void {
    const newValue = isValidNumber(this[key]) ? (this[key] === "59" ? 0 : parseInt(this[key]) + 1) : 0;
    this.setValuePart(key, newValue);
  }

  // #endregion

  // #region Public Methods

  decrementSecond(): void {
    this.decrementMinuteOrSecond("second");
  }

  handleHourKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newHour;
      if (isValidNumber(this.hour)) {
        switch (this.hourFormat) {
          case "12":
            newHour = this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2 ? `1${keyAsNumber}` : keyAsNumber;
            break;
          case "24":
            if (this.hour === "01") {
              newHour = `1${keyAsNumber}`;
            } else if (this.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
              newHour = `2${keyAsNumber}`;
            } else {
              newHour = keyAsNumber;
            }
            break;
        }
      } else {
        newHour = keyAsNumber;
      }
      this.setValuePart("hour", newHour);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.setValuePart("hour", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementHour();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementHour();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  handleMinuteKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newMinute;
      if (isValidNumber(this.minute) && this.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.minute);
        newMinute = minuteAsNumber > maxTenthForMinuteAndSecond ? keyAsNumber : `${minuteAsNumber}${keyAsNumber}`;
      } else {
        newMinute = keyAsNumber;
      }
      this.setValuePart("minute", newMinute);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.setValuePart("minute", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementMinute();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementMinute();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  handleSecondKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newSecond;
      if (isValidNumber(this.second) && this.second.startsWith("0")) {
        const secondAsNumber = parseInt(this.second);
        newSecond = secondAsNumber > maxTenthForMinuteAndSecond ? keyAsNumber : `${secondAsNumber}${keyAsNumber}`;
      } else {
        newSecond = keyAsNumber;
      }
      this.setValuePart("second", newSecond);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.setValuePart("second", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementSecond();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementSecond();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  handleFractionalSecondKeyDownEvent = (event: KeyboardEvent): void => {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const stepPrecision = decimalPlaces(this.component.step);
      const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
      const fractionalSecondAsIntegerLength = fractionalSecondAsInteger.toString().length;

      let newFractionalSecondAsIntegerString;

      if (fractionalSecondAsIntegerLength >= stepPrecision) {
        newFractionalSecondAsIntegerString = key.padStart(stepPrecision, "0");
      } else if (fractionalSecondAsIntegerLength < stepPrecision) {
        newFractionalSecondAsIntegerString = `${fractionalSecondAsInteger}${key}`.padStart(stepPrecision, "0");
      }

      this.setValuePart("fractionalSecond", parseFloat(`0.${newFractionalSecondAsIntegerString}`));
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.setValuePart("fractionalSecond", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.nudgeFractionalSecond("down");
          break;
        case "ArrowUp":
          event.preventDefault();
          this.nudgeFractionalSecond("up");
          break;
        case " ":
          event.preventDefault();
          break;
      }
    }
  };

  handleMeridiemKeyDownEvent = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "a":
        this.setValuePart("meridiem", "AM");
        break;
      case "p":
        this.setValuePart("meridiem", "PM");
        break;
      case "Backspace":
      case "Delete":
        this.setValuePart("meridiem");
        break;
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        this.toggleMeridiem();
        break;
      case " ":
      case "Spacebar":
        event.preventDefault();
        break;
    }
  };

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
    const { messages, numberingSystem, step, value: previousValue } = this.component;
    const locale = messages._lang as string;
    const hour12 = this.hourFormat === "12";
    const newValue = toISOTimeString(value, step);
    if (isValidTime(value)) {
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
      if (newValue !== previousValue) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.fractionalSecond = fractionalSecond;
        if (localizedMeridiem) {
          this.meridiem = getMeridiem(this.hour);
        }
      }
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
      }
    } else {
      this.hour = null;
      this.minute = null;
      this.second = null;
      this.fractionalSecond = null;
      this.meridiem = null;
      this.localizedHour = null;
      this.localizedHourSuffix = getLocalizedTimePartSuffix("hour", locale, numberingSystem);
      this.localizedMinute = null;
      this.localizedMinuteSuffix = getLocalizedTimePartSuffix("minute", locale, numberingSystem);
      this.localizedSecond = null;
      this.localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
      this.localizedFractionalSecond = null;
      this.localizedSecondSuffix = getLocalizedTimePartSuffix("second", locale, numberingSystem);
      this.localizedMeridiem = null;
    }
    if (newValue !== previousValue) {
      this.component.value = newValue;
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
    const previousValue = this.component.value;
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
          default:
            this.component.value = null;
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
    if (previousValue !== newValue) {
      this.component.value = newValue;
      if (key === "hour" && this.meridiem) {
        this.localizedMeridiem = newValue
          ? localizeTimeStringToParts({
              hour12,
              locale,
              numberingSystem,
              value: newValue,
              step,
            })?.localizedMeridiem || null
          : localizeTimePart({ hour12, value: this.meridiem, part: "meridiem", locale, numberingSystem });
      }
    }
  }

  toggleMeridiem(): void {
    const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
    this.setValuePart("meridiem", newMeridiem);
  }

  // #endregion
}
