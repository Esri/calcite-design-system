import {
  Component,
  Element,
  h,
  Prop,
  VNode,
  Event,
  EventEmitter,
  Watch,
  State,
  Listen,
  Method
} from "@stencil/core";
import { Scale } from "../interfaces";
import { getKey, isActivationKey, numberKeys } from "../../utils/key";
import { isValidNumber } from "../../utils/number";

import {
  formatTimePart,
  MinuteOrSecond,
  maxTenthForMinuteAndSecond,
  TimePart,
  getMeridiem,
  HourCycle,
  isValidTime,
  localizeTimeStringToParts,
  parseTimeString,
  localizeTimePart,
  Meridiem,
  getLocaleHourCycle
} from "../../utils/time";
import { CSS, TEXT } from "./resources";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Component({
  tag: "calcite-time-picker",
  styleUrl: "calcite-time-picker.scss",
  shadow: true
})
export class CalciteTimePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteTimePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** aria-label for the hour input
   * @default "Hour"
   */
  @Prop() intlHour = TEXT.hour;

  /** aria-label for the hour down button
   * @default "Decrease hour"
   */
  @Prop() intlHourDown = TEXT.hourDown;

  /** aria-label for the hour up button
   * @default "Increase hour"
   */
  @Prop() intlHourUp = TEXT.hourUp;

  /** aria-label for the meridiem (am/pm) input
   * @default "AM/PM"
   */
  @Prop() intlMeridiem = TEXT.meridiem;

  /** aria-label for the meridiem (am/pm) down button
   * @default "Decrease AM/PM"
   */
  @Prop() intlMeridiemDown = TEXT.meridiemDown;

  /** aria-label for the meridiem (am/pm) up button
   * @default "Increase AM/PM"
   */
  @Prop() intlMeridiemUp = TEXT.meridiemUp;

  /** aria-label for the minute input
   * @default "Minute"
   */
  @Prop() intlMinute = TEXT.minute;

  /** aria-label for the minute down button
   * @default "Decrease minute"
   */
  @Prop() intlMinuteDown = TEXT.minuteDown;

  /** aria-label for the minute up button
   * @default "Increase minute"
   */
  @Prop() intlMinuteUp = TEXT.minuteUp;

  /** aria-label for the second input
   * @default "Second"
   */
  @Prop() intlSecond = TEXT.second;

  /** aria-label for the second down button
   * @default "Decrease second"
   */
  @Prop() intlSecondDown = TEXT.secondDown;

  /** aria-label for the second up button
   * @default "Increase second"
   */
  @Prop() intlSecondUp = TEXT.secondUp;

  /** The scale (size) of the time picker */
  @Prop() scale: Scale = "m";

  /** number that specifies the granularity that the value must adhere to */
  @Prop() step = 60;

  /** The selected time in UTC */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    this.setValue(newValue, false);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private activeEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private meridiemEl: HTMLSpanElement;

  private minuteEl: HTMLSpanElement;

  private secondEl: HTMLSpanElement;

  // --------------------------------------------------------------------------
  //
  //  State
  //
  // --------------------------------------------------------------------------

  @State() hour: string;

  @Watch("hour")
  hourChanged(newHour: string): void {
    if (this.meridiem && isValidNumber(newHour)) {
      this.setValuePart("meridiem", getMeridiem(newHour));
    }
  }

  @State() hourCycle: HourCycle;

  /** BCP 47 language tag for desired language and country format */
  @State() locale: string = document.documentElement.lang || navigator.language;

  @Watch("locale")
  localeWatcher(newLocale: string): void {
    this.hourCycle = getLocaleHourCycle(newLocale);
    this.setValue(this.value, false);
  }

  @State() localizedHour: string;

  @State() localizedHourSuffix: string;

  @State() localizedMeridiem: string;

  @State() localizedMinute: string;

  @State() localizedMinuteSuffix: string;

  @State() localizedSecond: string;

  @State() localizedSecondSuffix: string;

  @State() meridiem: Meridiem;

  @State() minute: string;

  @State() second: string;

  @State() showSecond: boolean = this.step < 60;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event() calciteTimePickerBlur: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteTimePickerChange: EventEmitter<string>;

  /**
   * @internal
   */
  @Event() calciteTimePickerFocus: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur")
  hostBlurHandler(): void {
    this.calciteTimePickerBlur.emit();
  }

  @Listen("focus")
  hostFocusHandler(): void {
    this.calciteTimePickerFocus.emit();
  }

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    const key = getKey(event.key);
    switch (this.activeEl) {
      case this.hourEl:
        if (key === "ArrowRight") {
          this.setFocus("minute");
        }
        break;
      case this.minuteEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("hour");
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.setFocus("second");
            } else if (this.hourCycle === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.secondEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("minute");
            break;
          case "ArrowRight":
            if (this.hourCycle === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.meridiemEl:
        switch (key) {
          case "ArrowLeft":
            if (this.step !== 60) {
              this.setFocus("second");
            } else {
              this.setFocus("minute");
            }
            break;
        }
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(target: TimePart): Promise<void> {
    this[`${target || "hour"}El`]?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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

  private buttonActivated(event: KeyboardEvent): boolean {
    const key = getKey(event.key);

    if (key === " ") {
      event.preventDefault();
    }

    return isActivationKey(key);
  }

  private focusHandler = (event: FocusEvent): void => {
    this.activeEl = event.currentTarget as HTMLSpanElement;
  };

  private hourDownButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.decrementHour();
    }
  };

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    const key = getKey(event.key);
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
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  private hourUpButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.incrementHour();
    }
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

  private meridiemDownButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.decrementMeridiem();
    }
  };

  private meridiemKeyDownHandler = (event: KeyboardEvent): void => {
    switch (getKey(event.key)) {
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
      case "Spacebar":
        event.preventDefault();
        break;
    }
  };

  private meridiemUpButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.incrementMeridiem();
    }
  };

  private minuteDownButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.decrementMinute();
    }
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
    const key = getKey(event.key);
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
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  private minuteUpButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.incrementMinute();
    }
  };

  private secondDownButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.decrementSecond();
    }
  };

  private secondKeyDownHandler = (event: KeyboardEvent): void => {
    const key = getKey(event.key);
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
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  };

  private secondUpButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.buttonActivated(event)) {
      this.incrementSecond();
    }
  };

  private setValue = (value: string, emit = true): void => {
    if (isValidTime(value)) {
      const { hour, minute, second } = parseTimeString(value);
      const {
        localizedHour,
        localizedHourSuffix,
        localizedMinute,
        localizedMinuteSuffix,
        localizedSecond,
        localizedSecondSuffix,
        localizedMeridiem
      } = localizeTimeStringToParts(value, this.locale);
      this.localizedHour = localizedHour;
      this.localizedHourSuffix = localizedHourSuffix;
      this.localizedMinute = localizedMinute;
      this.localizedMinuteSuffix = localizedMinuteSuffix;
      this.localizedSecond = localizedSecond;
      this.localizedSecondSuffix = localizedSecondSuffix;
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      if (localizedMeridiem) {
        this.localizedMeridiem = localizedMeridiem;
        this.meridiem = getMeridiem(this.hour);
      }
    } else {
      this.hour = null;
      this.localizedHour = null;
      this.localizedHourSuffix = null;
      this.localizedMeridiem = null;
      this.localizedMinute = null;
      this.localizedMinuteSuffix = null;
      this.localizedSecond = null;
      this.localizedSecondSuffix = null;
      this.meridiem = null;
      this.minute = null;
      this.second = null;
      this.value = null;
    }
    if (emit) {
      this.calciteTimePickerChange.emit(this.value);
    }
  };

  private setValuePart = (
    key: "hour" | "minute" | "second" | "meridiem",
    value: number | string | Meridiem,
    emit = true
  ): void => {
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
        this.localizedHour = localizeTimePart(this.hour, "hour", this.locale);
      }
    } else {
      this[key] = typeof value === "number" ? formatTimePart(value) : value;
      this[`localized${capitalize(key)}`] = localizeTimePart(this[key], key, this.locale);
    }
    if (this.hour && this.minute) {
      this.value =
        this.second && this.showSecond
          ? `${this.hour}:${this.minute}:${this.second}`
          : `${this.hour}:${this.minute}:00`;
    } else {
      this.value = null;
    }
    this.localizedMeridiem = this.value
      ? localizeTimeStringToParts(this.value, this.locale)?.localizedMeridiem || null
      : localizeTimePart(this.meridiem, "meridiem", this.locale);
    if (emit) {
      this.calciteTimePickerChange.emit(this.value);
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    this.setValue(this.value, false);
    this.hourCycle = getLocaleHourCycle(this.locale);
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
    const showMeridiem = this.hourCycle === "12";
    return (
      <div
        class={{
          [CSS.timePicker]: true,
          [CSS.showMeridiem]: showMeridiem,
          [CSS.showSecond]: this.showSecond,
          [CSS[`scale-${this.scale}`]]: true
        }}
      >
        <div class={CSS.column} role="group">
          <span
            aria-label={this.intlHourUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourUp]: true,
              [CSS.buttonTopLeft]: true
            }}
            onClick={this.incrementHour}
            onKeyDown={this.hourUpButtonKeyDownHandler}
            role="button"
            tabIndex={-1}
          >
            <calcite-icon icon="chevron-up" scale={iconScale} />
          </span>
          <span
            aria-label={this.intlHour}
            aria-valuemax="23"
            aria-valuemin="1"
            aria-valuenow={hourIsNumber && parseInt(this.hour)}
            aria-valuetext={this.hour}
            class={{
              [CSS.input]: true,
              [CSS.hour]: true
            }}
            onFocus={this.focusHandler}
            onKeyDown={this.hourKeyDownHandler}
            ref={(el) => (this.hourEl = el)}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedHour || "--"}
          </span>
          <span
            aria-label={this.intlHourDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourDown]: true,
              [CSS.buttonBottomLeft]: true
            }}
            onClick={this.decrementHour}
            onKeyDown={this.hourDownButtonKeyDownHandler}
            role="button"
            tabIndex={-1}
          >
            <calcite-icon icon="chevron-down" scale={iconScale} />
          </span>
        </div>
        <span class={CSS.delimiter}>{this.localizedHourSuffix}</span>
        <div class={CSS.column} role="group">
          <span
            aria-label={this.intlMinuteUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteUp]: true
            }}
            onClick={this.incrementMinute}
            onKeyDown={this.minuteUpButtonKeyDownHandler}
            role="button"
            tabIndex={-1}
          >
            <calcite-icon icon="chevron-up" scale={iconScale} />
          </span>
          <span
            aria-label={this.intlMinute}
            aria-valuemax="12"
            aria-valuemin="1"
            aria-valuenow={minuteIsNumber && parseInt(this.minute)}
            aria-valuetext={this.minute}
            class={{
              [CSS.input]: true,
              [CSS.minute]: true
            }}
            onFocus={this.focusHandler}
            onKeyDown={this.minuteKeyDownHandler}
            ref={(el) => (this.minuteEl = el)}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedMinute || "--"}
          </span>
          <span
            aria-label={this.intlMinuteDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteDown]: true
            }}
            onClick={this.decrementMinute}
            onKeyDown={this.minuteDownButtonKeyDownHandler}
            role="button"
            tabIndex={-1}
          >
            <calcite-icon icon="chevron-down" scale={iconScale} />
          </span>
        </div>
        {this.showSecond && <span class={CSS.delimiter}>{this.localizedMinuteSuffix}</span>}
        {this.showSecond && (
          <div class={CSS.column} role="group">
            <span
              aria-label={this.intlSecondUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondUp]: true
              }}
              onClick={this.incrementSecond}
              onKeyDown={this.secondUpButtonKeyDownHandler}
              role="button"
              tabIndex={-1}
            >
              <calcite-icon icon="chevron-up" scale={iconScale} />
            </span>
            <span
              aria-label={this.intlSecond}
              aria-valuemax="59"
              aria-valuemin="0"
              aria-valuenow={secondIsNumber && parseInt(this.second)}
              aria-valuetext={this.second}
              class={{
                [CSS.input]: true,
                [CSS.second]: true
              }}
              onFocus={this.focusHandler}
              onKeyDown={this.secondKeyDownHandler}
              ref={(el) => (this.secondEl = el)}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedSecond || "--"}
            </span>
            <span
              aria-label={this.intlSecondDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondDown]: true
              }}
              onClick={this.decrementSecond}
              onKeyDown={this.secondDownButtonKeyDownHandler}
              role="button"
              tabIndex={-1}
            >
              <calcite-icon icon="chevron-down" scale={iconScale} />
            </span>
          </div>
        )}
        {this.localizedSecondSuffix && (
          <span class={CSS.delimiter}>{this.localizedSecondSuffix}</span>
        )}
        {showMeridiem && (
          <div class={CSS.column} role="group">
            <span
              aria-label={this.intlMeridiemUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemUp]: true,
                [CSS.buttonTopRight]: true
              }}
              onClick={this.incrementMeridiem}
              onKeyDown={this.meridiemUpButtonKeyDownHandler}
              role="button"
              tabIndex={-1}
            >
              <calcite-icon icon="chevron-up" scale={iconScale} />
            </span>
            <span
              aria-label={this.intlMeridiem}
              aria-valuemax="2"
              aria-valuemin="1"
              aria-valuenow={
                this.meridiem === "AM" ? "1" : this.meridiem === "PM" ? "2" : undefined
              }
              aria-valuetext={this.meridiem}
              class={{
                [CSS.input]: true,
                [CSS.meridiem]: true
              }}
              onFocus={this.focusHandler}
              onKeyDown={this.meridiemKeyDownHandler}
              ref={(el) => (this.meridiemEl = el)}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedMeridiem || "--"}
            </span>
            <span
              aria-label={this.intlMeridiemDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemDown]: true,
                [CSS.buttonBottomRight]: true
              }}
              onClick={this.decrementMeridiem}
              onKeyDown={this.meridiemDownButtonKeyDownHandler}
              role="button"
              tabIndex={-1}
            >
              <calcite-icon icon="chevron-down" scale={iconScale} />
            </span>
          </div>
        )}
      </div>
    );
  }
}
