// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { numberKeys } from "../../utils/key";
import { isValidNumber } from "../../utils/number";
import { Scale } from "../interfaces";
import { NumberingSystem } from "../../utils/locale";
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
  TimePart,
} from "../../utils/time";
import { getIconScale } from "../../utils/component";
import { componentFocusable } from "../../utils/component";
import { decimalPlaces, getDecimals } from "../../utils/math";
import { getElementDir } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import { CSS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./time-picker.scss";

declare global {
  interface DeclareElements {
    "calcite-time-picker": TimePicker;
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export class TimePicker extends LitElement {
  // #region Static Members
  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private fractionalSecondEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private meridiemEl: HTMLSpanElement;

  private meridiemOrder: number;

  private minuteEl: HTMLSpanElement;

  private pointerActivated = false;

  private secondEl: HTMLSpanElement;

  // #endregion

  // #region State Properties

  @state() activeEl: HTMLSpanElement;

  @state() effectiveHourFormat: EffectiveHourFormat;

  @state() fractionalSecond: string;

  @state() hour: string;

  @state() localizedDecimalSeparator = ".";

  @state() localizedFractionalSecond: string;

  @state() localizedHour: string;

  @state() localizedHourSuffix: string;

  @state() localizedMeridiem: string;

  @state() localizedMinute: string;

  @state() localizedMinuteSuffix: string;

  @state() localizedSecond: string;

  @state() localizedSecondSuffix: string;

  @state() meridiem: Meridiem;

  @state() minute: string;

  @state() second: string;

  @state() showFractionalSecond: boolean;

  @state() showSecond: boolean;

  // #endregion

  // #region Public Properties

  /**
   * Specifies the component's hour format, where:
   *
   * `"user"` displays the user's locale format,
   * `"12"` displays a 12-hour format, and
   * `"24"` displays a 24-hour format.
   *
   * @default "user"
   */
  @property({ reflect: true }) hourFormat: HourFormat = "user";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the granularity the `value` must adhere to (in seconds). */
  @property({ reflect: true }) step = 60;

  /** The component's value in UTC (always 24-hour format). */
  @property() value: string = null;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  // #endregion

  // #region Events

  /** Fires when a user changes the component's time */
  calciteTimePickerChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("blur", this.blurHandler);
    this.listen("keydown", this.keyDownHandler);
    this.listen("pointerdown", this.pointerDownHandler);
  }

  override connectedCallback(): void {
    this.updateLocale();
    this.toggleSecond();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("step") && (this.hasUpdated || this.step !== 60)) {
      this.toggleSecond();
    }

    if (changes.has("value") && (this.hasUpdated || this.value !== null)) {
      this.setValue(this.value);
    }

    if (changes.has("hourFormat") || changes.has("messages")) {
      this.updateLocale();
    }
  }

  // #endregion

  // #region Private Methods
  private blurHandler(): void {
    this.activeEl = undefined;
    this.pointerActivated = false;
  }

  private keyDownHandler(event: KeyboardEvent): void {
    this.pointerActivated = false;
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    switch (this.activeEl) {
      case this.hourEl:
        if (key === "ArrowRight") {
          this.focusPart("minute");
          event.preventDefault();
        }
        break;
      case this.minuteEl:
        switch (key) {
          case "ArrowLeft":
            this.focusPart("hour");
            event.preventDefault();
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.focusPart("second");
              event.preventDefault();
            } else if (this.effectiveHourFormat === "12") {
              this.focusPart("meridiem");
              event.preventDefault();
            }
            break;
        }
        break;
      case this.secondEl:
        switch (key) {
          case "ArrowLeft":
            this.focusPart("minute");
            event.preventDefault();
            break;
          case "ArrowRight":
            if (this.showFractionalSecond) {
              this.focusPart("fractionalSecond");
            } else if (this.effectiveHourFormat === "12") {
              this.focusPart("meridiem");
              event.preventDefault();
            }
            break;
        }
        break;
      case this.fractionalSecondEl:
        switch (key) {
          case "ArrowLeft":
            this.focusPart("second");
            event.preventDefault();
            break;
          case "ArrowRight":
            if (this.effectiveHourFormat === "12") {
              this.focusPart("meridiem");
              event.preventDefault();
            }
            break;
        }
        break;
      case this.meridiemEl:
        switch (key) {
          case "ArrowLeft":
            if (this.showFractionalSecond) {
              this.focusPart("fractionalSecond");
            } else if (this.step !== 60) {
              this.focusPart("second");
              event.preventDefault();
            } else {
              this.focusPart("minute");
              event.preventDefault();
            }
            break;
        }
        break;
    }
  }

  private pointerDownHandler(): void {
    this.pointerActivated = true;
  }

  private async focusPart(target: TimePart): Promise<void> {
    await componentFocusable(this);

    this[`${target || "hour"}El`]?.focus();
  }

  private decrementHour(): void {
    const newHour = !this.hour ? 0 : parseInt(this.hour) === 0 ? 23 : parseInt(this.hour) - 1;
    this.setValuePart("hour", newHour);
  }

  private decrementMeridiem(): void {
    const newMeridiem = this.meridiem === "PM" ? "AM" : "PM";
    this.setValuePart("meridiem", newMeridiem);
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

  private decrementMinute(): void {
    this.decrementMinuteOrSecond("minute");
  }

  private decrementSecond(): void {
    this.decrementMinuteOrSecond("second");
  }

  private focusHandler(event: FocusEvent): void {
    if (this.pointerActivated) {
      return;
    }
    this.activeEl = event.currentTarget as HTMLSpanElement;
  }

  private fractionalSecondKeyDownHandler(event: KeyboardEvent): void {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const stepPrecision = decimalPlaces(this.step);
      const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
      const fractionalSecondAsIntegerLength = fractionalSecondAsInteger.toString().length;

      let newFractionalSecondAsIntegerString;

      if (fractionalSecondAsIntegerLength >= stepPrecision) {
        newFractionalSecondAsIntegerString = key.padStart(stepPrecision, "0");
      } else if (fractionalSecondAsIntegerLength < stepPrecision) {
        newFractionalSecondAsIntegerString = `${fractionalSecondAsInteger}${key}`.padStart(
          stepPrecision,
          "0",
        );
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
  }

  private fractionalSecondDownClickHandler(): void {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.nudgeFractionalSecond("down");
  }

  private fractionalSecondUpClickHandler(): void {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.nudgeFractionalSecond("up");
  }

  private hourDownClickHandler(): void {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.decrementHour();
  }

  private hourKeyDownHandler(event: KeyboardEvent): void {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newHour;
      if (isValidNumber(this.hour)) {
        switch (this.effectiveHourFormat) {
          case "12":
            newHour =
              this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2
                ? `1${keyAsNumber}`
                : keyAsNumber;
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
          event.preventDefault();
          break;
      }
    }
  }

  private hourUpClickHandler(): void {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.incrementHour();
  }

  private incrementMeridiem(): void {
    const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
    this.setValuePart("meridiem", newMeridiem);
  }

  private incrementHour(): void {
    const newHour = isValidNumber(this.hour)
      ? this.hour === "23"
        ? 0
        : parseInt(this.hour) + 1
      : 1;
    this.setValuePart("hour", newHour);
  }

  private incrementMinuteOrSecond(key: MinuteOrSecond): void {
    const newValue = isValidNumber(this[key])
      ? this[key] === "59"
        ? 0
        : parseInt(this[key]) + 1
      : 0;
    this.setValuePart(key, newValue);
  }

  private incrementMinute(): void {
    this.incrementMinuteOrSecond("minute");
  }

  private incrementSecond(): void {
    this.incrementMinuteOrSecond("second");
  }

  private inputClickHandler(event: MouseEvent): void {
    this.activeEl = event.target as HTMLSpanElement;
  }

  private meridiemUpClickHandler(): void {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.incrementMeridiem();
  }

  private meridiemKeyDownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case "a":
        this.setValuePart("meridiem", "AM");
        break;
      case "p":
        this.setValuePart("meridiem", "PM");
        break;
      case "Backspace":
      case "Delete":
        this.setValuePart("meridiem", null);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.incrementMeridiem();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.decrementMeridiem();
        break;
      case " ":
        event.preventDefault();
        break;
    }
  }

  private meridiemDownClickHandler(): void {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.decrementMeridiem();
  }

  private minuteDownClickHandler(): void {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.decrementMinute();
  }

  private minuteUpClickHandler(): void {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.incrementMinute();
  }

  private minuteKeyDownHandler(event: KeyboardEvent): void {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newMinute;
      if (isValidNumber(this.minute) && this.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.minute);
        newMinute =
          minuteAsNumber > maxTenthForMinuteAndSecond
            ? keyAsNumber
            : `${minuteAsNumber}${keyAsNumber}`;
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
          event.preventDefault();
          break;
      }
    }
  }

  private nudgeFractionalSecond(direction: "up" | "down"): void {
    const stepDecimal = getDecimals(this.step);
    const stepPrecision = decimalPlaces(this.step);
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

  private sanitizeValue(value: string): string {
    const { hour, minute, second, fractionalSecond } = parseTimeString(value);
    if (fractionalSecond) {
      const sanitizedFractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
      return `${hour}:${minute}:${second}.${sanitizedFractionalSecond}`;
    }
    return isValidTime(value) && value;
  }

  private sanitizeFractionalSecond(fractionalSecond: string): string {
    return fractionalSecond && decimalPlaces(this.step) !== fractionalSecond.length
      ? parseFloat(`0.${fractionalSecond}`).toFixed(decimalPlaces(this.step)).replace("0.", "")
      : fractionalSecond;
  }

  private secondKeyDownHandler(event: KeyboardEvent): void {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newSecond;
      if (isValidNumber(this.second) && this.second.startsWith("0")) {
        const secondAsNumber = parseInt(this.second);
        newSecond =
          secondAsNumber > maxTenthForMinuteAndSecond
            ? keyAsNumber
            : `${secondAsNumber}${keyAsNumber}`;
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
          event.preventDefault();
          break;
      }
    }
  }

  private secondDownClickHandler(): void {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.decrementSecond();
  }

  private secondUpClickHandler(): void {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.incrementSecond();
  }

  private setHourEl(el: HTMLSpanElement): void {
    this.hourEl = el;
  }

  private setMeridiemEl(el: HTMLSpanElement): void {
    this.meridiemEl = el;
  }

  private setMinuteEl(el: HTMLSpanElement): void {
    this.minuteEl = el;
  }

  private setSecondEl(el: HTMLSpanElement): void {
    this.secondEl = el;
  }

  private setFractionalSecondEl(el: HTMLSpanElement): void {
    this.fractionalSecondEl = el;
  }

  private setValue(value: string): void {
    if (isValidTime(value)) {
      const { hour, minute, second, fractionalSecond } = parseTimeString(value);
      const {
        effectiveHourFormat,
        messages: { _lang: locale },
        numberingSystem,
        step,
      } = this;
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
        hour12: effectiveHourFormat === "12",
        step,
      });
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.fractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
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
      this.localizedHourSuffix = getLocalizedTimePartSuffix(
        "hour",
        this.messages._lang,
        this.numberingSystem,
      );
      this.localizedMeridiem = null;
      this.localizedMinute = null;
      this.localizedMinuteSuffix = getLocalizedTimePartSuffix(
        "minute",
        this.messages._lang,
        this.numberingSystem,
      );
      this.localizedSecond = null;
      this.localizedDecimalSeparator = getLocalizedDecimalSeparator(
        this.messages._lang,
        this.numberingSystem,
      );
      this.localizedFractionalSecond = null;
      this.localizedSecondSuffix = getLocalizedTimePartSuffix(
        "second",
        this.messages._lang,
        this.numberingSystem,
      );
      this.meridiem = null;
      this.minute = null;
      this.second = null;
      this.value = null;
    }
  }

  private setValuePart(
    key: "hour" | "minute" | "second" | "fractionalSecond" | "meridiem",
    value: number | string | Meridiem,
  ): void {
    const {
      effectiveHourFormat,
      messages: { _lang: locale },
      numberingSystem,
      step,
    } = this;
    const hour12 = effectiveHourFormat === "12";
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
        this.fractionalSecond =
          value === 0 ? "".padStart(stepPrecision, "0") : formatTimePart(value, stepPrecision);
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
      this[`localized${capitalize(key)}`] = localizeTimePart({
        value: this[key],
        part: key,
        locale,
        numberingSystem,
        hour12,
      });
    }
    let emit = false;
    let newValue;
    if (this.hour && this.minute) {
      newValue = `${this.hour}:${this.minute}`;
      if (this.showSecond) {
        newValue = `${newValue}:${this.second ?? "00"}`;
        if (this.showFractionalSecond && this.fractionalSecond) {
          newValue = `${newValue}.${this.fractionalSecond}`;
        }
      }
    } else {
      newValue = null;
    }
    if (this.value !== newValue) {
      emit = true;
    }
    this.value = newValue;
    this.localizedMeridiem = this.value
      ? localizeTimeStringToParts({
          hour12,
          locale,
          numberingSystem,
          step,
          value: this.value,
        })?.localizedMeridiem || null
      : localizeTimePart({ value: this.meridiem, part: "meridiem", locale, numberingSystem });
    if (emit) {
      this.calciteTimePickerChange.emit();
    }
  }

  private toggleSecond(): void {
    this.showSecond = this.step < 60;
    this.showFractionalSecond = decimalPlaces(this.step) > 0;
  }

  private updateLocale() {
    this.effectiveHourFormat =
      this.hourFormat === "user" ? getLocaleHourFormat(this.messages._lang) : this.hourFormat;
    this.localizedDecimalSeparator = getLocalizedDecimalSeparator(
      this.messages._lang,
      this.numberingSystem,
    );
    this.meridiemOrder = getMeridiemOrder(this.messages._lang);
    this.setValue(this.sanitizeValue(this.value));
  }

  // #endregion

  override render(): JsxNode {
    const hourIsNumber = isValidNumber(this.hour);
    const iconScale = getIconScale(this.scale);
    const minuteIsNumber = isValidNumber(this.minute);
    const secondIsNumber = isValidNumber(this.second);
    const fractionalSecondIsNumber = isValidNumber(this.fractionalSecond);
    const showSecondSuffix = this.messages._lang !== "bg" && this.localizedSecondSuffix;
    const showMeridiem = this.effectiveHourFormat === "12";
    return (
      <div
        class={{
          [CSS.timePicker]: true,
          [CSS.showMeridiem]: showMeridiem,
          [CSS.showSecond]: this.showSecond,
          [CSS[`scale-${this.scale}`]]: true,
        }}
        dir="ltr"
      >
        <div class={CSS.column} role="group">
          <span
            ariaLabel={this.messages.hourUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourUp]: true,
              [CSS.buttonTopLeft]: true,
            }}
            onClick={this.hourUpClickHandler}
            role="button"
          >
            <calcite-icon icon="chevron-up" scale={iconScale} />
          </span>
          <span
            ariaLabel={this.messages.hour}
            ariaValueMax="23"
            ariaValueMin="1"
            ariaValueNow={(hourIsNumber && parseInt(this.hour)) || "0"}
            ariaValueText={this.hour}
            class={{
              [CSS.input]: true,
              [CSS.hour]: true,
              [CSS.inputFocus]: this.activeEl && this.activeEl === this.hourEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={this.hourKeyDownHandler}
            ref={this.setHourEl}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedHour || "--"}
          </span>
          <span
            ariaLabel={this.messages.hourDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourDown]: true,
              [CSS.buttonBottomLeft]: true,
            }}
            onClick={this.hourDownClickHandler}
            role="button"
          >
            <calcite-icon icon="chevron-down" scale={iconScale} />
          </span>
        </div>
        <span class={{ [CSS.delimiter]: true, [CSS.hourSuffix]: true }}>
          {this.localizedHourSuffix}
        </span>
        <div class={CSS.column} role="group">
          <span
            ariaLabel={this.messages.minuteUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteUp]: true,
            }}
            onClick={this.minuteUpClickHandler}
            role="button"
          >
            <calcite-icon icon="chevron-up" scale={iconScale} />
          </span>
          <span
            ariaLabel={this.messages.minute}
            ariaValueMax="12"
            ariaValueMin="1"
            ariaValueNow={(minuteIsNumber && parseInt(this.minute)) || "0"}
            ariaValueText={this.minute}
            class={{
              [CSS.input]: true,
              [CSS.minute]: true,
              [CSS.inputFocus]: this.activeEl && this.activeEl === this.minuteEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={this.minuteKeyDownHandler}
            ref={this.setMinuteEl}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedMinute || "--"}
          </span>
          <span
            ariaLabel={this.messages.minuteDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteDown]: true,
            }}
            onClick={this.minuteDownClickHandler}
            role="button"
          >
            <calcite-icon icon="chevron-down" scale={iconScale} />
          </span>
        </div>
        {this.showSecond && (
          <span class={{ [CSS.delimiter]: true, [CSS.minuteSuffix]: true }}>
            {this.localizedMinuteSuffix}
          </span>
        )}
        {this.showSecond && (
          <div class={CSS.column} role="group">
            <span
              ariaLabel={this.messages.secondUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondUp]: true,
              }}
              onClick={this.secondUpClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-up" scale={iconScale} />
            </span>
            <span
              ariaLabel={this.messages.second}
              ariaValueMax="59"
              ariaValueMin="0"
              ariaValueNow={(secondIsNumber && parseInt(this.second)) || "0"}
              ariaValueText={this.second}
              class={{
                [CSS.input]: true,
                [CSS.second]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.secondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.secondKeyDownHandler}
              ref={this.setSecondEl}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedSecond || "--"}
            </span>
            <span
              ariaLabel={this.messages.secondDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondDown]: true,
              }}
              onClick={this.secondDownClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-down" scale={iconScale} />
            </span>
          </div>
        )}
        {this.showFractionalSecond && (
          <span class={{ [CSS.delimiter]: true, [CSS.decimalSeparator]: true }}>
            {this.localizedDecimalSeparator}
          </span>
        )}
        {this.showFractionalSecond && (
          <div class={CSS.column} role="group">
            <span
              ariaLabel={this.messages.fractionalSecondUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonFractionalSecondUp]: true,
              }}
              onClick={this.fractionalSecondUpClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-up" scale={iconScale} />
            </span>
            <span
              ariaLabel={this.messages.fractionalSecond}
              ariaValueMax="999"
              ariaValueMin="1"
              ariaValueNow={(fractionalSecondIsNumber && parseInt(this.fractionalSecond)) || "0"}
              ariaValueText={this.localizedFractionalSecond}
              class={{
                [CSS.input]: true,
                [CSS.fractionalSecond]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.fractionalSecondKeyDownHandler}
              ref={this.setFractionalSecondEl}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedFractionalSecond || "".padStart(decimalPlaces(this.step), "-")}
            </span>
            <span
              ariaLabel={this.messages.fractionalSecondDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonFractionalSecondDown]: true,
              }}
              onClick={this.fractionalSecondDownClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-down" scale={iconScale} />
            </span>
          </div>
        )}
        {showSecondSuffix && (
          <span class={{ [CSS.delimiter]: true, [CSS.secondSuffix]: true }}>
            {this.localizedSecondSuffix}
          </span>
        )}
        {showMeridiem && (
          <div
            class={{
              [CSS.column]: true,
              [CSS.meridiemStart]: this.meridiemOrder === 0 || getElementDir(this.el) === "rtl",
            }}
            role="group"
          >
            <span
              ariaLabel={this.messages.meridiemUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemUp]: true,
                [CSS.buttonTopRight]: true,
              }}
              onClick={this.meridiemUpClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-up" scale={iconScale} />
            </span>
            <span
              ariaLabel={this.messages.meridiem}
              ariaValueMax="2"
              ariaValueMin="1"
              ariaValueNow={(this.meridiem === "PM" && "2") || "1"}
              ariaValueText={this.meridiem}
              class={{
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.meridiemEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.meridiemKeyDownHandler}
              ref={this.setMeridiemEl}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedMeridiem || "--"}
            </span>
            <span
              ariaLabel={this.messages.meridiemDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemDown]: true,
                [CSS.buttonBottomRight]: true,
              }}
              onClick={this.meridiemDownClickHandler}
              role="button"
            >
              <calcite-icon icon="chevron-down" scale={iconScale} />
            </span>
          </div>
        )}
      </div>
    );
  }

  // #endregion
}
