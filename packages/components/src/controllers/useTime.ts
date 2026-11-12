import { PropertyValues } from "lit";
import { GenericController, T9nMeta, toFunction } from "@arcgis/lumina/controllers";
import { GenericT9nStrings } from "@arcgis/toolkit/intl";
import { createEvent, LitElement } from "@arcgis/lumina";
import {
  EffectiveHourFormat,
  formatTimePart,
  getLocaleHourFormat,
  getLocalizedDecimalSeparator,
  getLocalizedMeridiem,
  getLocalizedTimePartSuffix,
  getMeridiem,
  getMeridiemOrder,
  HourFormat,
  isValidTime,
  localizeTimePart,
  localizeTimeString,
  maxTenthForMinuteAndSecond,
  Meridiem,
  MinuteOrSecond,
  parseTimeString,
  toISOTimeString,
} from "../utils/time";
import { decimalPlaces, getDecimals } from "../utils/math";
import { isValidNumber } from "../utils/number";
import { Locale, NumberingSystem } from "../utils/locale";
import { numberKeys } from "../utils/key";

/** @public */
export interface TimeComponent extends LitElement {
  /**
   * Specifies the component's hour format.
   *
   * - `"user"` displays the user's locale format.
   * - `"12"` displays a 12-hour format.
   * - `"24"` displays a 24-hour format.
   *
   * @public
   */
  hourFormat: HourFormat;
  /**
   * Translated messages and locale information
   *
   * @internal
   */
  messages: Partial<GenericT9nStrings> | T9nMeta<GenericT9nStrings>;
  /**
   * Specifies the Unicode numeral system used by the component for localization.
   *
   * @public
   */
  numberingSystem: NumberingSystem;
  /**
   * Specifies the granularity the component's `value` must adhere to (in seconds).
   *
   * @public
   */
  step: number;
  /**
   * The component's time value in ISO (24-hour) format.
   *
   * @public
   */
  value: string | null;
}

/** @public */
type TimeProperties = {
  /**
   * Change event that fires when the value is committed on Enter keypress or blur
   *
   * @public
   */
  calciteTimeChange: CustomEvent<string>;
  /**
   * The fractional second portion of the time value.
   *
   * @public
   */
  fractionalSecond: string;
  /**
   * Returns true if any portion of the time value is truthy.
   *
   * @public
   */
  hasValue: boolean;
  /**
   * The hour portion of the time value (in ISO 24-hour format).
   *
   * @public
   */
  hour?: string;
  /**
   * The effective hour format, calculated based on the component's hour-format property.
   * The component's hour-format of "user" will resolve to the locale's default hour format.
   *
   * `"12"` displays a 12-hour format, and
   * `"24"` displays a 24-hour format.
   *
   * @public
   */
  hourFormat: EffectiveHourFormat;
  /**
   * The language and region code to localize the time value.
   *
   * @public
   */
  locale: Locale;
  /**
   * The decimal separator used by the locale.
   *
   * @public
   */
  localizedDecimalSeparator: string;
  /**
   * The decimal separator used by the locale.
   *
   * @public
   */
  localizedFractionalSecond: string;
  /**
   * The localized fractional second portion of the time value.
   *
   * @public
   */
  localizedHour: string;
  /**
   * The hour suffix used by the locale.
   *
   * @public
   */
  localizedHourSuffix: string;
  /**
   * The localized meridiem portion of the time value, when hourFormat resolves to 12.
   *
   * @public
   */
  localizedMeridiem: string;
  /**
   * The localized minute portion of the time value.
   *
   * @public
   */
  localizedMinute: string;
  /**
   * The localized minute suffix used by the locale.
   *
   * @public
   */
  localizedMinuteSuffix: string;
  /**
   * The localized second portion of the time value.
   *
   * @public
   */
  localizedSecond: string;
  /**
   * The localized second suffix used by the locale.
   *
   * @public
   */
  localizedSecondSuffix: string;
  /**
   * The effective meridiem of the time value, when hourFormat resolves to 12.
   *
   * `"AM"` for hours between 0 and 12
   * `"PM"` for hours between 12 and 23
   *
   * @public
   */
  meridiem: Meridiem;
  /**
   * An integer representing the order in which the meridiem appears for the locale within an array of values returned by Intl.DateTimeFormat.
   *
   * @public
   */
  meridiemOrder: number;
  /**
   * The minute portion of the time value.
   *
   * @public
   */
  minute?: string;
  /**
   * The second portion of the time value.
   *
   * @public
   */
  second: string;
};

const localizedTimePartProperty = {
  hour: "localizedHour",
  minute: "localizedMinute",
  second: "localizedSecond",
} as const;

/** @public */
export class TimeController extends GenericController<TimeProperties, TimeComponent> {
  //#region Private Properties

  /** @public */
  fractionalSecond?: string | null;

  /** @public */
  get hasValue(): boolean {
    return Boolean(this?.hour || this?.minute || this?.second || this?.fractionalSecond || this?.meridiem);
  }

  /** @public */
  hour?: string | null;

  /** @public */
  hourFormat?: EffectiveHourFormat | null;

  /** @public */
  locale?: Locale | null;

  /** @public */
  localizedDecimalSeparator = ".";

  /** @public */
  localizedFractionalSecond?: string | null;

  /** @public */
  localizedHour?: string | null;

  /** @public */
  localizedHourSuffix?: string | null;

  /** @public */
  localizedMeridiem?: string | null;

  /** @public */
  localizedMinute?: string | null;

  /** @public */
  localizedMinuteSuffix?: string | null;

  /** @public */
  localizedSecond?: string | null;

  /** @public */
  localizedSecondSuffix?: string | null;

  /** @public */
  meridiem?: Meridiem | null;

  /** @public */
  meridiemOrder?: number | null;

  /** @public */
  minute?: string | null;

  /** @public */
  second?: string | null;

  /** @public */
  userChangedValue: boolean = false;

  /** @public */
  handleHourKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key, 10);
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
          event.preventDefault();
          this.setValuePart("hour", undefined);
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

  /** @public */
  handleMinuteKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key, 10);
      let newMinute;
      if (typeof this.minute === "string" && isValidNumber(this.minute) && this.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.minute, 10);
        newMinute = minuteAsNumber > maxTenthForMinuteAndSecond ? keyAsNumber : `${minuteAsNumber}${keyAsNumber}`;
      } else {
        newMinute = keyAsNumber;
      }
      this.setValuePart("minute", newMinute);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          event.preventDefault();
          this.setValuePart("minute", undefined);
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

  /** @public */
  handleSecondKeyDownEvent = (event: KeyboardEvent): void => {
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key, 10);
      let newSecond;
      if (typeof this.second === "string" && isValidNumber(this.second) && this.second.startsWith("0")) {
        const secondAsNumber = parseInt(this.second, 10);
        newSecond = secondAsNumber > maxTenthForMinuteAndSecond ? keyAsNumber : `${secondAsNumber}${keyAsNumber}`;
      } else {
        newSecond = keyAsNumber;
      }
      this.setValuePart("second", newSecond);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          event.preventDefault();
          this.setValuePart("second", undefined);
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

  /** @public */
  handleFractionalSecondKeyDownEvent = (event: KeyboardEvent): void => {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const stepPrecision = decimalPlaces(this.component.step);
      const fractionalSecondAsInteger = parseInt(this.fractionalSecond!, 10);
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
          event.preventDefault();
          this.setValuePart("fractionalSecond", undefined);
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

  /** @public */
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
        event.preventDefault();
        this.setValuePart("meridiem");
        break;
      case "ArrowUp":
        event.preventDefault();
        this.toggleMeridiem("up");
        break;
      case "ArrowDown":
        event.preventDefault();
        this.toggleMeridiem("down");
        break;
      case " ":
      case "Spacebar":
        event.preventDefault();
        break;
    }
  };

  //#endregion

  //#region Events

  /** @public */
  calciteTimeChange = createEvent<string>();

  //#endregion

  //#region Private Methods

  /** @public */
  decrementHour(): void {
    const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour, 10) - 1;
    this.setValuePart("hour", newHour);
  }

  /** @public */
  decrementMinute(): void {
    this.decrementMinuteOrSecond("minute");
  }

  /** @public */
  decrementSecond(): void {
    this.decrementMinuteOrSecond("second");
  }

  /** @public */
  incrementHour(): void {
    const newHour =
      typeof this.hour === "string" && isValidNumber(this.hour)
        ? this.hour === "23"
          ? 0
          : parseInt(this.hour, 10) + 1
        : 1;
    this.setValuePart("hour", newHour);
  }

  /** @public */
  incrementMinute(): void {
    this.incrementMinuteOrSecond("minute");
  }

  /** @public */
  incrementSecond(): void {
    this.incrementMinuteOrSecond("second");
  }

  /**
   * @public
   *
   * @param direction
   */
  nudgeFractionalSecond(direction: "up" | "down"): void {
    const stepDecimal = getDecimals(this.component.step);
    const stepPrecision = decimalPlaces(this.component.step);
    const fractionalSecondAsInteger = parseInt(this.fractionalSecond!, 10);
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

  /**
   * @public
   *
   * @param direction
   */
  toggleMeridiem(direction: "down" | "up"): void {
    let newMeridiem;
    if (!this.meridiem) {
      newMeridiem = direction === "down" ? "PM" : "AM";
    } else {
      newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
    }
    this.setValuePart("meridiem", newMeridiem);
  }

  /** @public */
  hostConnected(): void {
    this.setHourFormat();
    this.setMeridiemOrder();
    this.setValue(this.component.value);
  }

  /**
   * @public
   *
   * @param changes
   */
  hostUpdate(changes: PropertyValues): void {
    let updateHourFormat = false;
    let updateMeridiemOrder = false;
    let updateValue = false;

    if (changes.has("hourFormat")) {
      updateHourFormat = true;
      updateValue = true;
    }
    if (changes.has("messages") && changes.get("messages")?._lang !== this.component.messages._lang) {
      updateHourFormat = true;
      updateMeridiemOrder = true;
      updateValue = true;
    }
    if (changes.has("numberingSystem")) {
      updateValue = true;
    }
    if (changes.has("step")) {
      const oldStep = this.component.step;
      const newStep = changes.get("step");
      if ((oldStep >= 60 && newStep > 0 && newStep < 60) || (newStep >= 60 && oldStep > 0 && oldStep < 60)) {
        updateValue = true;
      }
    }
    if (updateHourFormat) {
      this.setHourFormat();
    }
    if (updateMeridiemOrder) {
      this.setMeridiemOrder();
    }
    if (updateValue) {
      this.setValue(this.component.value);
    }

    this.userChangedValue = false;
  }

  private decrementMinuteOrSecond(key: MinuteOrSecond): void {
    let newValue;
    if (isValidNumber(this[key])) {
      const valueAsNumber = parseInt(this[key]!, 10);
      newValue = valueAsNumber === 0 ? 59 : valueAsNumber - 1;
    } else {
      newValue = 59;
    }
    this.setValuePart(key, newValue);
  }

  private incrementMinuteOrSecond(key: MinuteOrSecond): void {
    const newValue = isValidNumber(this[key]) ? (this[key] === "59" ? 0 : parseInt(this[key]!, 10) + 1) : 0;
    this.setValuePart(key, newValue);
  }

  private setHourFormat(): void {
    const { hourFormat, messages } = this.component;
    this.hourFormat = hourFormat === "user" ? getLocaleHourFormat(messages._lang as Locale) : hourFormat;
  }

  private setMeridiemOrder(): void {
    const { messages } = this.component;
    this.meridiemOrder = getMeridiemOrder(messages._lang as Locale);
  }

  /**
   * @public
   *
   * @param value
   * @param userChangedValue
   */
  setValue(value: string | null, userChangedValue: boolean = false): void {
    const { messages, numberingSystem, step, value: previousValue } = this.component;
    const locale = messages._lang as string;
    const hour12 = this.hourFormat === "12";
    const newValue = toISOTimeString(value, step);
    if (isValidTime(value)) {
      const { hour, minute, second, fractionalSecond } = parseTimeString(newValue, step);
      const localized = localizeTimeString({
        hour12,
        locale,
        numberingSystem,
        parts: true,
        step,
        value: newValue,
      });

      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.fractionalSecond = fractionalSecond;
      if (localized) {
        this.localizedHour = localized.hour;
        this.localizedHourSuffix = localized.hourSuffix;
        this.localizedMinute = localized.minute;
        this.localizedMinuteSuffix = localized.minuteSuffix;
        this.localizedSecond = localized.second;
        this.localizedDecimalSeparator = localized.decimalSeparator;
        this.localizedFractionalSecond = localized.fractionalSecond;
        this.localizedSecondSuffix = localized.secondSuffix;

        if (localized.meridiem) {
          this.meridiem = getMeridiem(this.hour);
          this.localizedMeridiem = localized.meridiem;
        }
      }
    } else {
      this.hour = null;
      this.minute = null;
      this.second = null;
      this.fractionalSecond = null;
      this.meridiem = null;
      this.localizedHour = null;
      this.localizedHourSuffix = getLocalizedTimePartSuffix({ hour12, part: "hour", locale, numberingSystem, step });
      this.localizedMinute = null;
      this.localizedMinuteSuffix = getLocalizedTimePartSuffix({
        hour12,
        part: "minute",
        locale,
        numberingSystem,
        step,
      });
      this.localizedSecond = null;
      this.localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
      this.localizedFractionalSecond = null;
      this.localizedSecondSuffix = getLocalizedTimePartSuffix({
        hour12,
        part: "second",
        locale,
        numberingSystem,
        step,
      });
      this.localizedMeridiem = null;
    }
    if (newValue !== previousValue) {
      this.userChangedValue = userChangedValue;
      this.component.value = newValue ?? "";
    } else {
      this.component.requestUpdate();
    }
  }

  /**
   * @public
   *
   * @param key
   * @param value
   */
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
        const hourAsNumber = parseInt(this.hour!, 10);
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
            this.userChangedValue = true;
            this.component.value = "";
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
      this[localizedTimePartProperty[key]] = localizeTimePart({
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
      if (key === "hour" && hourFormat === "12") {
        this.meridiem = getMeridiem(hour);
        this.localizedMeridiem = getLocalizedMeridiem({ locale, meridiem: this.meridiem });
      }
      this.userChangedValue = true;
      this.calciteTimeChange.emit(newValue ?? "");
    }
  }

  //#endregion
}

/** @public */
export const useTime = toFunction(TimeController);
