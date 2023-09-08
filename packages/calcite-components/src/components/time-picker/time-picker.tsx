import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { numberKeys } from "../../utils/key";
import { isValidNumber } from "../../utils/number";
import { Scale } from "../interfaces";

import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
} from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  formatTimePart,
  getLocaleHourCycle,
  getLocalizedDecimalSeparator,
  getLocalizedTimePartSuffix,
  getMeridiem,
  getTimeParts,
  HourCycle,
  isValidTime,
  localizeTimePart,
  localizeTimeStringToParts,
  maxTenthForMinuteAndSecond,
  Meridiem,
  MinuteOrSecond,
  parseTimeString,
  TimePart,
} from "../../utils/time";
import { TimePickerMessages } from "./assets/time-picker/t9n";
import { CSS } from "./resources";

import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { decimalPlaces, getDecimals } from "../../utils/math";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Component({
  tag: "calcite-time-picker",
  styleUrl: "time-picker.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class TimePicker implements LoadableComponent, LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the granularity the `value` must adhere to (in seconds). */
  @Prop({ reflect: true }) step = 60;

  @Watch("step")
  stepChange(): void {
    this.toggleSecond();
  }

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   *
   */
  @Prop() numberingSystem: NumberingSystem;

  /** The component's value in UTC (always 24-hour format). */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    this.setValue(newValue);
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TimePickerMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TimePickerMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTimePickerElement;

  private fractionalSecondEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private meridiemEl: HTMLSpanElement;

  private meridiemOrder: number;

  private minuteEl: HTMLSpanElement;

  private pointerActivated = false;

  private secondEl: HTMLSpanElement;

  // --------------------------------------------------------------------------
  //
  //  State
  //
  // --------------------------------------------------------------------------

  @State() activeEl: HTMLSpanElement;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(): void {
    this.updateLocale();
  }

  @State() fractionalSecond: string;

  @State() hour: string;

  @State() hourCycle: HourCycle;

  @State() localizedDecimalSeparator = ".";

  @State() localizedHour: string;

  @State() localizedHourSuffix: string;

  @State() localizedMeridiem: string;

  @State() localizedFractionalSecond: string;

  @State() localizedMinute: string;

  @State() localizedMinuteSuffix: string;

  @State() localizedSecond: string;

  @State() localizedSecondSuffix: string;

  @State() meridiem: Meridiem;

  @State() minute: string;

  @State() second: string;

  @State() showFractionalSecond: boolean;

  @State() showSecond: boolean;

  @State() defaultMessages: TimePickerMessages;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTimePickerBlur: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTimePickerChange: EventEmitter<string>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalTimePickerFocus: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur")
  blurHandler(): void {
    this.activeEl = undefined;
    this.pointerActivated = false;
    this.calciteInternalTimePickerBlur.emit();
  }

  @Listen("focus")
  hostFocusHandler(): void {
    this.calciteInternalTimePickerFocus.emit();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
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
            } else if (this.hourCycle === "12") {
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
            } else if (this.hourCycle === "12") {
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
            if (this.hourCycle === "12") {
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

  @Listen("pointerdown")
  pointerDownHandler(): void {
    this.pointerActivated = true;
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private async focusPart(target: TimePart): Promise<void> {
    await componentFocusable(this);

    this[`${target || "hour"}El`]?.focus();
  }

  private decrementHour = (): void => {
    const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
    this.setValuePart("hour", newHour);
  };

  private decrementMeridiem = (): void => {
    const newMeridiem = this.meridiem === "PM" ? "AM" : "PM";
    this.setValuePart("meridiem", newMeridiem);
  };

  private decrementMinuteOrSecond = (key: MinuteOrSecond): void => {
    let newValue;
    if (isValidNumber(this[key])) {
      const valueAsNumber = parseInt(this[key]);
      newValue = valueAsNumber === 0 ? 59 : valueAsNumber - 1;
    } else {
      newValue = 59;
    }
    this.setValuePart(key, newValue);
  };

  private decrementMinute = (): void => {
    this.decrementMinuteOrSecond("minute");
  };

  private decrementSecond = (): void => {
    this.decrementMinuteOrSecond("second");
  };

  private focusHandler = (event: FocusEvent): void => {
    if (this.pointerActivated) {
      return;
    }
    this.activeEl = event.currentTarget as HTMLSpanElement;
  };

  private fractionalSecondKeyDownHandler = (event: KeyboardEvent): void => {
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
          "0"
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
  };

  private fractionalSecondDownClickHandler = (): void => {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.nudgeFractionalSecond("down");
  };

  private fractionalSecondUpClickHandler = (): void => {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.nudgeFractionalSecond("up");
  };

  private hourDownClickHandler = (): void => {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.decrementHour();
  };

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newHour;
      if (isValidNumber(this.hour)) {
        switch (this.hourCycle) {
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
  };

  private hourUpClickHandler = (): void => {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.incrementHour();
  };

  private incrementMeridiem = (): void => {
    const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
    this.setValuePart("meridiem", newMeridiem);
  };

  private incrementHour = (): void => {
    const newHour = isValidNumber(this.hour)
      ? this.hour === "23"
        ? 0
        : parseInt(this.hour) + 1
      : 1;
    this.setValuePart("hour", newHour);
  };

  private incrementMinuteOrSecond = (key: MinuteOrSecond): void => {
    const newValue = isValidNumber(this[key])
      ? this[key] === "59"
        ? 0
        : parseInt(this[key]) + 1
      : 0;
    this.setValuePart(key, newValue);
  };

  private incrementMinute = (): void => {
    this.incrementMinuteOrSecond("minute");
  };

  private incrementSecond = (): void => {
    this.incrementMinuteOrSecond("second");
  };

  private inputClickHandler = (event: MouseEvent): void => {
    this.activeEl = event.target as HTMLSpanElement;
  };

  private meridiemUpClickHandler = (): void => {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.incrementMeridiem();
  };

  private meridiemKeyDownHandler = (event: KeyboardEvent): void => {
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
  };

  private meridiemDownClickHandler = (): void => {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.decrementMeridiem();
  };

  private minuteDownClickHandler = (): void => {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.decrementMinute();
  };

  private minuteUpClickHandler = (): void => {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.incrementMinute();
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
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
  };

  private nudgeFractionalSecond = (direction: "up" | "down"): void => {
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
  };

  private sanitizeValue = (value: string): string => {
    const { hour, minute, second, fractionalSecond } = parseTimeString(value);
    if (fractionalSecond) {
      const sanitizedFractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
      return `${hour}:${minute}:${second}.${sanitizedFractionalSecond}`;
    }
    return isValidTime(value) && value;
  };

  private sanitizeFractionalSecond = (fractionalSecond: string): string =>
    fractionalSecond && decimalPlaces(this.step) !== fractionalSecond.length
      ? parseFloat(`0.${fractionalSecond}`).toFixed(decimalPlaces(this.step)).replace("0.", "")
      : fractionalSecond;

  private secondKeyDownHandler = (event: KeyboardEvent): void => {
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
  };

  private secondDownClickHandler = (): void => {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.decrementSecond();
  };

  private secondUpClickHandler = (): void => {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.incrementSecond();
  };

  private setHourEl = (el: HTMLSpanElement) => (this.hourEl = el);

  private setMeridiemEl = (el: HTMLSpanElement) => (this.meridiemEl = el);

  private setMinuteEl = (el: HTMLSpanElement) => (this.minuteEl = el);

  private setSecondEl = (el: HTMLSpanElement) => (this.secondEl = el);

  private setFractionalSecondEl = (el: HTMLSpanElement) => (this.fractionalSecondEl = el);

  private setValue = (value: string): void => {
    if (isValidTime(value)) {
      const { hour, minute, second, fractionalSecond } = parseTimeString(value);
      const { effectiveLocale: locale, numberingSystem } = this;
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
      } = localizeTimeStringToParts({ value, locale, numberingSystem });
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
        const formatParts = getTimeParts({ value, locale, numberingSystem });
        this.meridiemOrder = this.getMeridiemOrder(formatParts);
      }
    } else {
      this.hour = null;
      this.fractionalSecond = null;
      this.localizedHour = null;
      this.localizedHourSuffix = getLocalizedTimePartSuffix(
        "hour",
        this.effectiveLocale,
        this.numberingSystem
      );
      this.localizedMeridiem = null;
      this.localizedMinute = null;
      this.localizedMinuteSuffix = getLocalizedTimePartSuffix(
        "minute",
        this.effectiveLocale,
        this.numberingSystem
      );
      this.localizedSecond = null;
      this.localizedDecimalSeparator = getLocalizedDecimalSeparator(
        this.effectiveLocale,
        this.numberingSystem
      );
      this.localizedFractionalSecond = null;
      this.localizedSecondSuffix = getLocalizedTimePartSuffix(
        "second",
        this.effectiveLocale,
        this.numberingSystem
      );
      this.meridiem = null;
      this.minute = null;
      this.second = null;
      this.value = null;
    }
  };

  private setValuePart = (
    key: "hour" | "minute" | "second" | "fractionalSecond" | "meridiem",
    value: number | string | Meridiem
  ): void => {
    const { effectiveLocale: locale, numberingSystem } = this;
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
      });
    } else {
      this[key] = typeof value === "number" ? formatTimePart(value) : value;
      this[`localized${capitalize(key)}`] = localizeTimePart({
        value: this[key],
        part: key,
        locale,
        numberingSystem,
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
      ? localizeTimeStringToParts({ value: this.value, locale, numberingSystem })
          ?.localizedMeridiem || null
      : localizeTimePart({ value: this.meridiem, part: "meridiem", locale, numberingSystem });
    if (emit) {
      this.calciteInternalTimePickerChange.emit();
    }
  };

  private toggleSecond(): void {
    this.showSecond = this.step < 60;
    this.showFractionalSecond = decimalPlaces(this.step) > 0;
  }

  private getMeridiemOrder(formatParts: Intl.DateTimeFormatPart[]): number {
    const locale = this.effectiveLocale;
    const isRTLKind = locale === "ar" || locale === "he";
    if (formatParts && !isRTLKind) {
      const index = formatParts.findIndex((parts: { type: string; value: string }) => {
        return parts.value === this.localizedMeridiem;
      });
      return index;
    }
    return 0;
  }

  private updateLocale() {
    updateMessages(this, this.effectiveLocale);
    this.hourCycle = getLocaleHourCycle(this.effectiveLocale, this.numberingSystem);
    this.localizedDecimalSeparator = getLocalizedDecimalSeparator(
      this.effectiveLocale,
      this.numberingSystem
    );
    this.setValue(this.sanitizeValue(this.value));
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    connectLocalized(this);
    this.updateLocale();
    connectMessages(this);
    this.toggleSecond();
    this.meridiemOrder = this.getMeridiemOrder(
      getTimeParts({
        value: "0:00:00",
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
      })
    );
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const hourIsNumber = isValidNumber(this.hour);
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const minuteIsNumber = isValidNumber(this.minute);
    const secondIsNumber = isValidNumber(this.second);
    const fractionalSecondIsNumber = isValidNumber(this.fractionalSecond);
    const showMeridiem = this.hourCycle === "12";
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
            aria-label={this.messages.hourUp}
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
            aria-label={this.messages.hour}
            aria-valuemax="23"
            aria-valuemin="1"
            aria-valuenow={(hourIsNumber && parseInt(this.hour)) || "0"}
            aria-valuetext={this.hour}
            class={{
              [CSS.input]: true,
              [CSS.hour]: true,
              [CSS.inputFocus]: this.activeEl && this.activeEl === this.hourEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={this.hourKeyDownHandler}
            role="spinbutton"
            tabIndex={0}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.setHourEl}
          >
            {this.localizedHour || "--"}
          </span>
          <span
            aria-label={this.messages.hourDown}
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
        <span class={CSS.delimiter}>{this.localizedHourSuffix}</span>
        <div class={CSS.column} role="group">
          <span
            aria-label={this.messages.minuteUp}
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
            aria-label={this.messages.minute}
            aria-valuemax="12"
            aria-valuemin="1"
            aria-valuenow={(minuteIsNumber && parseInt(this.minute)) || "0"}
            aria-valuetext={this.minute}
            class={{
              [CSS.input]: true,
              [CSS.minute]: true,
              [CSS.inputFocus]: this.activeEl && this.activeEl === this.minuteEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={this.minuteKeyDownHandler}
            role="spinbutton"
            tabIndex={0}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.setMinuteEl}
          >
            {this.localizedMinute || "--"}
          </span>
          <span
            aria-label={this.messages.minuteDown}
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
        {this.showSecond && <span class={CSS.delimiter}>{this.localizedMinuteSuffix}</span>}
        {this.showSecond && (
          <div class={CSS.column} role="group">
            <span
              aria-label={this.messages.secondUp}
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
              aria-label={this.messages.second}
              aria-valuemax="59"
              aria-valuemin="0"
              aria-valuenow={(secondIsNumber && parseInt(this.second)) || "0"}
              aria-valuetext={this.second}
              class={{
                [CSS.input]: true,
                [CSS.second]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.secondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.secondKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setSecondEl}
            >
              {this.localizedSecond || "--"}
            </span>
            <span
              aria-label={this.messages.secondDown}
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
          <span class={CSS.delimiter}>{this.localizedDecimalSeparator}</span>
        )}
        {this.showFractionalSecond && (
          <div class={CSS.column} role="group">
            <span
              aria-label={this.messages.fractionalSecondUp}
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
              aria-label={this.messages.fractionalSecond}
              aria-valuemax="999"
              aria-valuemin="1"
              aria-valuenow={(fractionalSecondIsNumber && parseInt(this.fractionalSecond)) || "0"}
              aria-valuetext={this.localizedFractionalSecond}
              class={{
                [CSS.input]: true,
                [CSS.fractionalSecond]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.fractionalSecondKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setFractionalSecondEl}
            >
              {this.localizedFractionalSecond || "--"}
            </span>
            <span
              aria-label={this.messages.fractionalSecondDown}
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
        {this.localizedSecondSuffix && (
          <span class={CSS.delimiter}>{this.localizedSecondSuffix}</span>
        )}
        {showMeridiem && (
          <div
            class={{
              [CSS.column]: true,
              [CSS.meridiemStart]: this.meridiemOrder === 0,
            }}
            role="group"
          >
            <span
              aria-label={this.messages.meridiemUp}
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
              aria-label={this.messages.meridiem}
              aria-valuemax="2"
              aria-valuemin="1"
              aria-valuenow={(this.meridiem === "PM" && "2") || "1"}
              aria-valuetext={this.meridiem}
              class={{
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.meridiemEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={this.meridiemKeyDownHandler}
              role="spinbutton"
              tabIndex={0}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setMeridiemEl}
            >
              {this.localizedMeridiem || "--"}
            </span>
            <span
              aria-label={this.messages.meridiemDown}
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
}
