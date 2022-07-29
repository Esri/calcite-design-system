import {
  Component,
  Element,
  h,
  Host,
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
import { numberKeys } from "../../utils/key";
import { isValidNumber } from "../../utils/number";
import { LabelableComponent, connectLabel, disconnectLabel } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
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
  getLocaleHourCycle,
  getTimeParts
} from "../../utils/time";
import { CSS, TEXT } from "./resources";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Component({
  tag: "calcite-input-time",
  styleUrl: "input-time.scss",
  shadow: true
})
export class InputTime implements LabelableComponent, FormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimeElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled = false;

  /** When true, the icon is flipped in RTL. */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * aria-label for the hour input
   *
   * @default "Hour"
   */
  @Prop() intlHour = TEXT.hour;

  /**
   * aria-label for the meridiem (am/pm) input
   *
   * @default "AM/PM"
   */
  @Prop() intlMeridiem = TEXT.meridiem;

  /**
   * aria-label for the minute input
   *
   * @default "Minute"
   */
  @Prop() intlMinute = TEXT.minute;

  /**
   * aria-label for the second input
   *
   * @default "Second"
   */
  @Prop() intlSecond = TEXT.second;

  /**
   * BCP 47 language tag for desired language and country format
   *
   * @internal
   */
  @Prop({ attribute: "lang", mutable: true }) locale: string =
    document.documentElement.lang || navigator.language || "en";

  @Watch("locale")
  localeWatcher(newLocale: string): void {
    this.hourCycle = getLocaleHourCycle(newLocale);
    this.setValue(this.value, false);
  }

  /** The name of the time input */
  @Prop() name: string;

  /**
   * When true, still focusable but controls are gone and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop() readOnly = false;

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** The scale (size) of the time input */
  @Prop() scale: Scale = "m";

  /** number (seconds) that specifies the granularity that the value must adhere to */
  @Prop() step = 60;

  /** The selected time in UTC (always 24-hour format) */
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

  defaultValue: InputTime["value"];

  formEl: HTMLFormElement;

  private hourEl: HTMLSpanElement;

  labelEl: HTMLCalciteLabelElement;

  private meridiemEl: HTMLSpanElement;

  private minuteEl: HTMLSpanElement;

  private secondEl: HTMLSpanElement;

  private meridiemOrder: number;

  // --------------------------------------------------------------------------
  //
  //  State
  //
  // --------------------------------------------------------------------------

  @State() hour: string;

  @State() hourCycle: HourCycle;

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
  @Event() calciteInternalTimeBlur: EventEmitter<void>;

  /**
   * @internal
   */
  @Event() calciteInternalTimeChange: EventEmitter<string>;

  /**
   * @internal
   */
  @Event() calciteInternalTimeFocus: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("blur")
  hostBlurHandler(): void {
    this.calciteInternalTimeBlur.emit();
  }

  @Listen("focus")
  hostFocusHandler(): void {
    this.calciteInternalTimeFocus.emit();
  }

  hostKeyDownHandler = ({ defaultPrevented, key }: KeyboardEvent): void => {
    if (key === "Enter" && !defaultPrevented) {
      submitForm(this);
    }
  };

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
    const key = event.key;
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

  /**
   * Sets focus on the component.
   *
   * @param target
   */
  @Method()
  async setFocus(target?: TimePart): Promise<void> {
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

  private focusHandler = (event: FocusEvent): void => {
    this.activeEl = event.currentTarget as HTMLSpanElement;
  };

  private hourKeyDownHandler = (event: KeyboardEvent): void => {
    const key = event.key;
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
      case "Spacebar":
        event.preventDefault();
        break;
    }
  };

  private minuteKeyDownHandler = (event: KeyboardEvent): void => {
    const key = event.key;
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

  onLabelClick(): void {
    this.setFocus();
  }

  private secondKeyDownHandler = (event: KeyboardEvent): void => {
    const key = event.key;
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

  private setHourEl = (el: HTMLSpanElement) => (this.hourEl = el);

  private setMeridiemEl = (el: HTMLSpanElement) => (this.meridiemEl = el);

  private setMinuteEl = (el: HTMLSpanElement) => (this.minuteEl = el);

  private setSecondEl = (el: HTMLSpanElement) => (this.secondEl = el);

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
        const formatParts = getTimeParts(value, this.locale);
        this.meridiemOrder = this.getMeridiemOrder(formatParts);
      }
    } else {
      this.hour = null;
      this.localizedHour = null;
      this.localizedHourSuffix = ":";
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
      this.calciteInternalTimeChange.emit();
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
      const showSeconds = this.second && this.showSecond;
      this.value = `${this.hour}:${this.minute}:${showSeconds ? this.second : "00"}`;
    } else {
      this.value = null;
    }
    this.localizedMeridiem = this.value
      ? localizeTimeStringToParts(this.value, this.locale)?.localizedMeridiem || null
      : localizeTimePart(this.meridiem, "meridiem", this.locale);
    if (emit) {
      this.calciteInternalTimeChange.emit();
    }
  };

  private getMeridiemOrder(formatParts: Intl.DateTimeFormatPart[]): number {
    const isRTLKind = this.locale === "ar" || this.locale === "he";
    if (formatParts && !isRTLKind) {
      const index = formatParts.findIndex((parts: { type: string; value: string }) => {
        return parts.value === this.localizedMeridiem;
      });
      return index;
    }
    return 0;
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    this.setValue(this.value, false);
    this.hourCycle = getLocaleHourCycle(this.locale);
    connectLabel(this);
    connectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const hourIsNumber = isValidNumber(this.hour);
    const minuteIsNumber = isValidNumber(this.minute);
    const secondIsNumber = isValidNumber(this.second);
    const showMeridiem = this.hourCycle === "12";
    return (
      <Host onKeyDown={this.hostKeyDownHandler}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.showMeridiem]: showMeridiem,
            [CSS.showSecond]: this.showSecond,
            [CSS[`scale-${this.scale}`]]: true
          }}
          dir="ltr"
        >
          <calcite-icon class={CSS.clockIcon} flipRtl={this.iconFlipRtl} icon="clock" scale="s" />
          <span
            aria-label={this.intlHour}
            aria-valuemax="23"
            aria-valuemin="1"
            aria-valuenow={(hourIsNumber && parseInt(this.hour)) || "0"}
            aria-valuetext={this.hour}
            class={{
              [CSS.input]: true,
              [CSS.hour]: true
            }}
            onFocus={this.focusHandler}
            onKeyDown={this.hourKeyDownHandler}
            ref={this.setHourEl}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedHour || "--"}
          </span>
          <span class={CSS.delimiter}>{this.localizedHourSuffix}</span>
          <span
            aria-label={this.intlMinute}
            aria-valuemax="12"
            aria-valuemin="1"
            aria-valuenow={(minuteIsNumber && parseInt(this.minute)) || "0"}
            aria-valuetext={this.minute}
            class={{
              [CSS.input]: true,
              [CSS.minute]: true
            }}
            onFocus={this.focusHandler}
            onKeyDown={this.minuteKeyDownHandler}
            ref={this.setMinuteEl}
            role="spinbutton"
            tabIndex={0}
          >
            {this.localizedMinute || "--"}
          </span>
          {this.showSecond && <span class={CSS.delimiter}>{this.localizedMinuteSuffix}</span>}
          {this.showSecond && (
            <span
              aria-label={this.intlSecond}
              aria-valuemax="59"
              aria-valuemin="0"
              aria-valuenow={(secondIsNumber && parseInt(this.second)) || "0"}
              aria-valuetext={this.second}
              class={{
                [CSS.input]: true,
                [CSS.second]: true
              }}
              onFocus={this.focusHandler}
              onKeyDown={this.secondKeyDownHandler}
              ref={this.setSecondEl}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedSecond || "--"}
            </span>
          )}
          {this.localizedSecondSuffix && (
            <span class={CSS.delimiter}>{this.localizedSecondSuffix}</span>
          )}
          {showMeridiem && (
            <span
              aria-label={this.intlMeridiem}
              aria-valuemax="2"
              aria-valuemin="1"
              aria-valuenow={(this.meridiem === "PM" && "2") || "1"}
              aria-valuetext={this.meridiem}
              class={{
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.meridiemStart]: this.meridiemOrder === 0
              }}
              onFocus={this.focusHandler}
              onKeyDown={this.meridiemKeyDownHandler}
              ref={this.setMeridiemEl}
              role="spinbutton"
              tabIndex={0}
            >
              {this.localizedMeridiem || "--"}
            </span>
          )}
        </div>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
