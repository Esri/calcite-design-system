// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { isValidNumber } from "../../utils/number";
import { Scale } from "../interfaces";
import { NumberingSystem } from "../../utils/locale";
import { HourFormat, TimePart } from "../../utils/time";
import { getIconScale } from "../../utils/component";
import { componentFocusable } from "../../utils/component";
import { decimalPlaces } from "../../utils/math";
import { getElementDir } from "../../utils/dom";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import { TimeComponent, useTime } from "../../controllers/useTime";
import { CSS, ICONS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./time-picker.scss";

declare global {
  interface DeclareElements {
    "calcite-time-picker": TimePicker;
  }
}

export class TimePicker extends LitElement implements TimeComponent {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private fractionalSecondEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private meridiemEl: HTMLSpanElement;

  private minuteEl: HTMLSpanElement;

  private pointerActivated = false;

  private secondEl: HTMLSpanElement;

  private stepPrecision: number;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() activeEl: HTMLSpanElement;

  @state() showFractionalSecond: boolean;

  @state() showSecond: boolean;

  //#endregion

  //#region Public Properties

  /**
   * @internal
   */
  @property() time: ReturnType<typeof useTime> = useTime(this);

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

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the granularity the `value` must adhere to (in seconds). */
  @property({ reflect: true }) step = 60;

  /** The component's value in UTC (always 24-hour format). */
  @property() value: string = null;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when a user changes the component's time */
  calciteTimePickerChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("blur", this.blurHandler);
    this.listen("calciteTimeChange", this.timeChangeHandler);
    this.listen("keydown", this.keyDownHandler);
    this.listen("pointerdown", this.pointerDownHandler);
  }

  override connectedCallback(): void {
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
      this.time.setValue(this.value);
    }
  }

  //#endregion

  //#region Private Methods

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

    const { hourFormat } = this.time;
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
            } else if (hourFormat === "12") {
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
            } else if (hourFormat === "12") {
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
            if (hourFormat === "12") {
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

  private focusHandler(event: FocusEvent): void {
    if (this.pointerActivated) {
      return;
    }
    this.activeEl = event.currentTarget as HTMLSpanElement;
  }

  private fractionalSecondDownClickHandler(): void {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.time.nudgeFractionalSecond("down");
  }

  private fractionalSecondUpClickHandler(): void {
    this.activeEl = this.fractionalSecondEl;
    this.fractionalSecondEl.focus();
    this.time.nudgeFractionalSecond("up");
  }

  private hourDownClickHandler(): void {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.time.decrementHour();
  }

  private hourUpClickHandler(): void {
    this.activeEl = this.hourEl;
    this.hourEl.focus();
    this.time.incrementHour();
  }

  private inputClickHandler(event: MouseEvent): void {
    this.activeEl = event.target as HTMLSpanElement;
  }

  private meridiemUpClickHandler(): void {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.time.toggleMeridiem("up");
  }

  private meridiemDownClickHandler(): void {
    this.activeEl = this.meridiemEl;
    this.meridiemEl.focus();
    this.time.toggleMeridiem("down");
  }

  private minuteDownClickHandler(): void {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.time.decrementMinute();
  }

  private minuteUpClickHandler(): void {
    this.activeEl = this.minuteEl;
    this.minuteEl.focus();
    this.time.incrementMinute();
  }

  private secondDownClickHandler(): void {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.time.decrementSecond();
  }

  private secondUpClickHandler(): void {
    this.activeEl = this.secondEl;
    this.secondEl.focus();
    this.time.incrementSecond();
  }

  private setHourEl(el: HTMLSpanElement): void {
    if (!el) {
      return;
    }

    this.hourEl = el;
  }

  private setMeridiemEl(el: HTMLSpanElement): void {
    if (!el) {
      return;
    }

    this.meridiemEl = el;
  }

  private setMinuteEl(el: HTMLSpanElement): void {
    if (!el) {
      return;
    }

    this.minuteEl = el;
  }

  private setSecondEl(el: HTMLSpanElement): void {
    if (!el) {
      return;
    }

    this.secondEl = el;
  }

  private setFractionalSecondEl(el: HTMLSpanElement): void {
    if (!el) {
      return;
    }

    this.fractionalSecondEl = el;
  }

  private timeChangeHandler(event: CustomEvent<string>): void {
    event.stopPropagation();

    const newValue = event.detail;
    if (newValue !== this.value) {
      this.value = newValue;
    }

    this.calciteTimePickerChange.emit();
  }

  private toggleSecond(): void {
    this.showSecond = this.step < 60;
    this.stepPrecision = decimalPlaces(this.step);
    this.showFractionalSecond = this.stepPrecision > 0;
  }

  //#endregion

  //#region Rendering

  // #region Rendering

  override render(): JsxNode {
    const { activeEl, messages, scale } = this;
    const { _lang: locale } = messages;
    const {
      fractionalSecond,
      handleFractionalSecondKeyDownEvent,
      handleHourKeyDownEvent,
      handleMeridiemKeyDownEvent,
      handleMinuteKeyDownEvent,
      handleSecondKeyDownEvent,
      hour,
      hourFormat,
      localizedDecimalSeparator,
      localizedFractionalSecond,
      localizedHour,
      localizedHourSuffix,
      localizedMeridiem,
      localizedMinute,
      localizedMinuteSuffix,
      localizedSecond,
      localizedSecondSuffix,
      meridiem,
      meridiemOrder,
      minute,
      second,
    } = this.time;
    const hourIsNumber = isValidNumber(hour);
    const iconScale = getIconScale(scale);
    const minuteIsNumber = isValidNumber(minute);
    const secondIsNumber = isValidNumber(second);
    const fractionalSecondIsNumber = isValidNumber(fractionalSecond);
    const showSecondSuffix = locale !== "bg" && localizedSecondSuffix;
    const showMeridiem = hourFormat === "12";
    return (
      <div
        class={{
          [CSS.timePicker]: true,
          [CSS.showMeridiem]: showMeridiem,
          [CSS.showSecond]: this.showSecond,
          [CSS.scale(scale)]: true,
        }}
        dir="ltr"
      >
        <div class={CSS.column} role="group">
          <span
            ariaLabel={messages.hourUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourUp]: true,
              [CSS.buttonTopLeft]: true,
            }}
            onClick={this.hourUpClickHandler}
            role="button"
          >
            <calcite-icon icon={ICONS.chevronUp} scale={iconScale} />
          </span>
          <span
            ariaLabel={messages.hour}
            ariaValueMax="23"
            ariaValueMin="1"
            ariaValueNow={(hourIsNumber && parseInt(hour)) || "0"}
            ariaValueText={hour}
            class={{
              [CSS.input]: true,
              [CSS.hour]: true,
              [CSS.inputFocus]: activeEl && activeEl === this.hourEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={handleHourKeyDownEvent}
            ref={this.setHourEl}
            role="spinbutton"
            tabIndex={0}
          >
            {localizedHour || "--"}
          </span>
          <span
            ariaLabel={messages.hourDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonHourDown]: true,
              [CSS.buttonBottomLeft]: true,
            }}
            onClick={this.hourDownClickHandler}
            role="button"
          >
            <calcite-icon icon={ICONS.chevronDown} scale={iconScale} />
          </span>
        </div>
        <span class={{ [CSS.delimiter]: true, [CSS.hourSuffix]: true }}>{localizedHourSuffix}</span>
        <div class={CSS.column} role="group">
          <span
            ariaLabel={messages.minuteUp}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteUp]: true,
            }}
            onClick={this.minuteUpClickHandler}
            role="button"
          >
            <calcite-icon icon={ICONS.chevronUp} scale={iconScale} />
          </span>
          <span
            ariaLabel={messages.minute}
            ariaValueMax="12"
            ariaValueMin="1"
            ariaValueNow={(minuteIsNumber && parseInt(minute)) || "0"}
            ariaValueText={minute}
            class={{
              [CSS.input]: true,
              [CSS.minute]: true,
              [CSS.inputFocus]: activeEl && activeEl === this.minuteEl,
            }}
            onClick={this.inputClickHandler}
            onFocus={this.focusHandler}
            onKeyDown={handleMinuteKeyDownEvent}
            ref={this.setMinuteEl}
            role="spinbutton"
            tabIndex={0}
          >
            {localizedMinute || "--"}
          </span>
          <span
            ariaLabel={messages.minuteDown}
            class={{
              [CSS.button]: true,
              [CSS.buttonMinuteDown]: true,
            }}
            onClick={this.minuteDownClickHandler}
            role="button"
          >
            <calcite-icon icon={ICONS.chevronDown} scale={iconScale} />
          </span>
        </div>
        {this.showSecond && (
          <span class={{ [CSS.delimiter]: true, [CSS.minuteSuffix]: true }}>
            {localizedMinuteSuffix}
          </span>
        )}
        {this.showSecond && (
          <div class={CSS.column} role="group">
            <span
              ariaLabel={messages.secondUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondUp]: true,
              }}
              onClick={this.secondUpClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronUp} scale={iconScale} />
            </span>
            <span
              ariaLabel={messages.second}
              ariaValueMax="59"
              ariaValueMin="0"
              ariaValueNow={(secondIsNumber && parseInt(second)) || "0"}
              ariaValueText={second}
              class={{
                [CSS.input]: true,
                [CSS.second]: true,
                [CSS.inputFocus]: activeEl && activeEl === this.secondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={handleSecondKeyDownEvent}
              ref={this.setSecondEl}
              role="spinbutton"
              tabIndex={0}
            >
              {localizedSecond || "--"}
            </span>
            <span
              ariaLabel={messages.secondDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonSecondDown]: true,
              }}
              onClick={this.secondDownClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronDown} scale={iconScale} />
            </span>
          </div>
        )}
        {this.showFractionalSecond && (
          <span class={{ [CSS.delimiter]: true, [CSS.decimalSeparator]: true }}>
            {localizedDecimalSeparator}
          </span>
        )}
        {this.showFractionalSecond && (
          <div class={CSS.column} role="group">
            <span
              ariaLabel={messages.fractionalSecondUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonFractionalSecondUp]: true,
              }}
              onClick={this.fractionalSecondUpClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronUp} scale={iconScale} />
            </span>
            <span
              ariaLabel={messages.fractionalSecond}
              ariaValueMax="999"
              ariaValueMin="1"
              ariaValueNow={(fractionalSecondIsNumber && parseInt(fractionalSecond)) || "0"}
              ariaValueText={localizedFractionalSecond}
              class={{
                [CSS.input]: true,
                [CSS.fractionalSecond]: true,
                [CSS.inputFocus]: activeEl && activeEl === this.fractionalSecondEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={handleFractionalSecondKeyDownEvent}
              ref={this.setFractionalSecondEl}
              role="spinbutton"
              tabIndex={0}
            >
              {localizedFractionalSecond || "".padStart(this.stepPrecision, "-")}
            </span>
            <span
              ariaLabel={messages.fractionalSecondDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonFractionalSecondDown]: true,
              }}
              onClick={this.fractionalSecondDownClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronDown} scale={iconScale} />
            </span>
          </div>
        )}
        {showSecondSuffix && (
          <span class={{ [CSS.delimiter]: true, [CSS.secondSuffix]: true }}>
            {localizedSecondSuffix}
          </span>
        )}
        {showMeridiem && (
          <div
            class={{
              [CSS.column]: true,
              [CSS.meridiemStart]: meridiemOrder === 0 || getElementDir(this.el) === "rtl",
            }}
            role="group"
          >
            <span
              ariaLabel={messages.meridiemUp}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemUp]: true,
                [CSS.buttonTopRight]: true,
              }}
              onClick={this.meridiemUpClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronUp} scale={iconScale} />
            </span>
            <span
              ariaLabel={messages.meridiem}
              ariaValueMax="2"
              ariaValueMin="1"
              ariaValueNow={(meridiem === "PM" && "2") || "1"}
              ariaValueText={meridiem}
              class={{
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.inputFocus]: activeEl && activeEl === this.meridiemEl,
              }}
              onClick={this.inputClickHandler}
              onFocus={this.focusHandler}
              onKeyDown={handleMeridiemKeyDownEvent}
              ref={this.setMeridiemEl}
              role="spinbutton"
              tabIndex={0}
            >
              {localizedMeridiem || "--"}
            </span>
            <span
              ariaLabel={messages.meridiemDown}
              class={{
                [CSS.button]: true,
                [CSS.buttonMeridiemDown]: true,
                [CSS.buttonBottomRight]: true,
              }}
              onClick={this.meridiemDownClickHandler}
              role="button"
            >
              <calcite-icon icon={ICONS.chevronDown} scale={iconScale} />
            </span>
          </div>
        )}
      </div>
    );
  }

  //#endregion
}
