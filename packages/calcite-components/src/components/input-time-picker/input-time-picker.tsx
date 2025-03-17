// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
  submitForm,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import { componentFocusable } from "../../utils/component";
import { NumberingSystem } from "../../utils/locale";
import { HourFormat, TimePart, maxTenthForMinuteAndSecond } from "../../utils/time";
import { Scale, Status } from "../interfaces";
import { decimalPlaces } from "../../utils/math";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { focusFirstTabbable, getElementDir } from "../../utils/dom";
import { IconNameOrString } from "../icon/interfaces";
import { syncHiddenFormInput } from "../input/common/input";
import { useT9n } from "../../controllers/useT9n";
import type { TimePicker } from "../time-picker/time-picker";
import type { Popover } from "../popover/popover";
import type { Label } from "../label/label";
import { isValidNumber } from "../../utils/number";
import { RequiredTimeArguments, TimeController } from "../../controllers/time/time";
import { styles } from "./input-time-picker.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, TEXT } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-input-time-picker": InputTimePicker;
  }
}

export class InputTimePicker
  extends LitElement
  implements FormComponent, InteractiveComponent, LabelableComponent, RequiredTimeArguments
{
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private activeEl: HTMLSpanElement;

  private calciteTimePickerEl: TimePicker["el"];

  private containerEl: HTMLDivElement;

  defaultValue: InputTimePicker["value"];

  formEl: HTMLFormElement;

  private fractionalSecondEl: HTMLSpanElement;

  private hourEl: HTMLSpanElement;

  private meridiemEl: HTMLSpanElement;

  private minuteEl: HTMLSpanElement;

  labelEl: Label["el"];

  private popoverEl: Popover["el"];

  private secondEl: HTMLSpanElement;

  time = new TimeController(this);

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

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

  /** When `true`, the clock icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * aria-label for the hour input
   *
   * @default "Hour"
   */
  @property() intlHour = TEXT.hour;

  /**
   * aria-label for the meridiem (am/pm) input
   *
   * @default "AM/PM"
   */
  @property() intlMeridiem = TEXT.meridiem;

  /**
   * aria-label for the minute input
   *
   * @default "Minute"
   */
  @property() intlMinute = TEXT.minute;

  /**
   * aria-label for the second input
   *
   * @default "Second"
   */
  @property() intlSecond = TEXT.second;

  /**
   * When the component resides in a form,
   * specifies the maximum value.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#max)
   */
  @property({ reflect: true }) max: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides & TimePicker["messageOverrides"];

  /**
   * Translated messages and locale information
   *
   * @internal
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * When the component resides in a form,
   * specifies the minimum value.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#min)
   */
  @property({ reflect: true }) min: string;

  /** Specifies the name of the component on form submission. */
  @property() name: string;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** When `true`, displays the `calcite-time-picker` component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property() overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the popover will be positioned relative to the input. */
  @property({ reflect: true }) placement: LogicalPlacement = "auto";

  /**
   * When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies the granularity the component's `value` must adhere to (in seconds). */
  @property({ reflect: true }) step: number = 60;

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /** The time value in ISO (24-hour) format. */
  @property({ reflect: true }) value: string;

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed If true, delay the repositioning.
   */
  @method()
  async reposition(delayed = false): Promise<void> {
    this.popoverEl?.reposition(delayed);
  }

  /**
   * Sets focus on the component.
   *
   * @param target
   */
  @method()
  async setFocus(target?: TimePart): Promise<void> {
    await componentFocusable(this);
    if (target) {
      this[`${target || "hour"}El`]?.focus();
    } else {
      focusFirstTabbable(this.el);
    }
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteInputTimePickerBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteInputTimePickerBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component's `value` is changes. */
  calciteInputTimePickerChange = createEvent();

  /** Fires when the component is closed and animation is complete. */
  calciteInputTimePickerClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteInputTimePickerOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    this.time.setValue(this.value);
  }

  async load(): Promise<void> {
    // TODO: update locale in time controller
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      if (!this.disabled) {
        this.open = false;
      }
    }

    if (changes.has("hourFormat")) {
      // TODO: relocalize input value
      // TODO: update locale in time controller
    }

    if (changes.has("readOnly") && (this.hasUpdated || this.readOnly !== false)) {
      if (!this.readOnly) {
        this.open = false;
      }
    }

    if (changes.has("messages")) {
      // TODO: relocalize input value
      // TODO: update locale in time controller
    }

    if (changes.has("numberingSystem")) {
      // TODO: relocalize input value
    }

    if (changes.has("step") && (this.hasUpdated || this.step !== 60)) {
      this.stepWatcher(this.step, changes.get("step"));
    }

    if (changes.has("value")) {
      this.valueChangeHandler();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  // #endregion

  // #region Internal Methods

  /** @internal */
  valueChangeHandler(): void {
    if (this.hasUpdated) {
      this.calciteInputTimePickerChange.emit();
    }
  }

  // #endregion

  // #region Private Methods

  private openHandler(): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.popoverEl) {
      // we set the property instead of the attribute to ensure popover's open/close events are emitted properly
      this.popoverEl.open = this.open;
    }
  }

  private stepWatcher(newStep: number, oldStep?: number): void {
    if (
      (oldStep >= 60 && newStep > 0 && newStep < 60) ||
      (newStep >= 60 && oldStep > 0 && oldStep < 60)
    ) {
      this.time.setValue(this.value);
    }
  }

  private fractionalSecondKeyDownHandler(event: KeyboardEvent): void {
    const { key } = event;
    if (numberKeys.includes(key)) {
      const stepPrecision = decimalPlaces(this.step);
      const fractionalSecondAsInteger = parseInt(this.time.fractionalSecond);
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

      this.time.setValuePart(
        "fractionalSecond",
        parseFloat(`0.${newFractionalSecondAsIntegerString}`),
      );
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.time.setValuePart("fractionalSecond", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.time.nudgeFractionalSecond("down");
          break;
        case "ArrowUp":
          event.preventDefault();
          this.time.nudgeFractionalSecond("up");
          break;
        case " ":
          event.preventDefault();
          break;
      }
    }
  }

  private hourKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newHour;
      if (isValidNumber(this.time.hour)) {
        switch (this.time.hourFormat) {
          case "12":
            newHour =
              this.time.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2
                ? `1${keyAsNumber}`
                : keyAsNumber;
            break;
          case "24":
            if (this.time.hour === "01") {
              newHour = `1${keyAsNumber}`;
            } else if (this.time.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
              newHour = `2${keyAsNumber}`;
            } else {
              newHour = keyAsNumber;
            }
            break;
        }
      } else {
        newHour = keyAsNumber;
      }
      this.time.setValuePart("hour", newHour);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.time.setValuePart("hour", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.time.decrementHour();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.time.incrementHour();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  }

  private timePickerChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    const target = event.target as TimePicker["el"];
    const value = target.value;
    this.time.setValue(value);
  }

  private minuteKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newMinute;
      if (isValidNumber(this.time.minute) && this.time.minute.startsWith("0")) {
        const minuteAsNumber = parseInt(this.time.minute);
        newMinute =
          minuteAsNumber > maxTenthForMinuteAndSecond
            ? keyAsNumber
            : `${minuteAsNumber}${keyAsNumber}`;
      } else {
        newMinute = keyAsNumber;
      }
      this.time.setValuePart("minute", newMinute);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.time.setValuePart("minute", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.time.decrementMinute();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.time.incrementMinute();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  }

  private popoverBeforeOpenHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeOpen.emit();
  }

  private popoverOpenHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerOpen.emit();
  }

  private popoverBeforeCloseHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerBeforeClose.emit();
  }

  private popoverCloseHandler(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteInputTimePickerClose.emit();
    this.open = false;
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("time", this, input);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
      }

      if (event.composedPath().includes(this.calciteTimePickerEl)) {
        return;
      }
    } else if (this.open && this.focusTrapDisabled && key === "Escape") {
      this.open = false;
      event.preventDefault();
    } else {
      const showFractionalSecond = decimalPlaces(this.step) > 0;
      const showSecond = this.step < 60;
      switch (this.activeEl) {
        case this.hourEl:
          if (key === "ArrowRight") {
            this.setFocus("minute");
          } else if (
            key === "ArrowLeft" &&
            this.time.hourFormat === "12" &&
            this.time.meridiemOrder === 0
          ) {
            this.setFocus("meridiem");
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
              } else if (this.time.hourFormat === "12") {
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
              if (decimalPlaces(this.step) > 0) {
                this.setFocus("fractionalSecond");
              } else if (this.time.hourFormat === "12") {
                this.setFocus("meridiem");
              }
              break;
          }
          break;
        case this.fractionalSecondEl:
          switch (key) {
            case "ArrowLeft":
              this.setFocus("second");
              break;
            case "ArrowRight":
              if (this.time.hourFormat === "12" && this.time.meridiemOrder !== 0) {
                this.setFocus("meridiem");
              }
              break;
          }
          break;
        case this.meridiemEl:
          if (key === "ArrowLeft" && this.time.meridiemOrder !== 0) {
            if (showFractionalSecond) {
              this.setFocus("fractionalSecond");
            } else if (showSecond) {
              this.setFocus("second");
            } else {
              this.setFocus("minute");
            }
          } else if (key === "ArrowRight" && this.time.meridiemOrder === 0) {
            this.setFocus("hour");
          }
          break;
      }
    }
  }

  private meridiemKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    switch (event.key) {
      case "a":
        this.time.setValuePart("meridiem", "AM");
        break;
      case "p":
        this.time.setValuePart("meridiem", "PM");
        break;
      case "Backspace":
      case "Delete":
        this.time.setValuePart("meridiem");
        break;
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        this.time.toggleMeridiem();
        break;
      case " ":
      case "Spacebar":
        event.preventDefault();
        break;
    }
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private secondKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    const key = event.key;
    if (numberKeys.includes(key)) {
      const keyAsNumber = parseInt(key);
      let newSecond;
      if (isValidNumber(this.time.second) && this.time.second.startsWith("0")) {
        const secondAsNumber = parseInt(this.time.second);
        newSecond =
          secondAsNumber > maxTenthForMinuteAndSecond
            ? keyAsNumber
            : `${secondAsNumber}${keyAsNumber}`;
      } else {
        newSecond = keyAsNumber;
      }
      this.time.setValuePart("second", newSecond);
    } else {
      switch (key) {
        case "Backspace":
        case "Delete":
          this.time.setValuePart("second", null);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.time.decrementSecond();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.time.incrementSecond();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    }
  }

  private setCalcitePopoverEl(el: Popover["el"]): void {
    this.popoverEl = el;
    this.openHandler();
  }

  private setContainerEl(el: HTMLDivElement): void {
    this.containerEl = el;
  }

  private setFractionalSecondEl(el: HTMLSpanElement) {
    this.fractionalSecondEl = el;
  }

  private setHourEl(el: HTMLSpanElement): void {
    this.hourEl = el;
  }

  private setMinuteEl(el: HTMLSpanElement): void {
    this.minuteEl = el;
  }

  private setSecondEl(el: HTMLSpanElement): void {
    this.secondEl = el;
  }

  private setCalciteTimePickerEl(el: TimePicker["el"]): void {
    if (!el) {
      return;
    }
    this.calciteTimePickerEl = el;
  }

  private setMeridiemEl(el: HTMLSpanElement): void {
    this.meridiemEl = el;
  }

  private timePartFocusHandler(event: FocusEvent): void {
    this.activeEl = event.currentTarget as HTMLSpanElement;
  }

  private toggleIconClickHandler() {
    this.open = !this.open;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { messages, readOnly } = this;
    const {
      fractionalSecond,
      hour,
      hourFormat,
      localizedDecimalSeparator,
      localizedFractionalSecond,
      localizedHour,
      localizedHourSuffix,
      localizedMinute,
      localizedMinuteSuffix,
      localizedSecond,
      localizedSecondSuffix,
      meridiemOrder,
      minute,
      second,
    } = this.time;
    const emptyPlaceholder = "--";
    const fractionalSecondIsNumber = isValidNumber(fractionalSecond);
    const hourIsNumber = isValidNumber(hour);
    const minuteIsNumber = isValidNumber(minute);
    const secondIsNumber = isValidNumber(second);
    const showFractionalSecond = decimalPlaces(this.step) > 0;
    const showMeridiem = hourFormat === "12";
    const showSecond = this.step < 60;
    const meridiemStart = meridiemOrder === 0 || getElementDir(this.el) === "rtl";
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={{
            [CSS.container]: true,
            [CSS.readOnly]: readOnly,
          }}
          ref={this.setContainerEl}
        >
          <calcite-icon class={CSS.clockIcon} flipRtl={this.iconFlipRtl} icon="clock" scale="s" />
          <div class={CSS.inputContainer} dir="ltr">
            {showMeridiem && meridiemStart && this.renderMeridiem("start")}
            <span
              aria-label={this.intlHour}
              aria-valuemax="23"
              aria-valuemin="1"
              aria-valuenow={(hourIsNumber && parseInt(hour)) || "0"}
              aria-valuetext={hour}
              class={{
                [CSS.empty]: !localizedHour,
                [CSS.hour]: true,
                [CSS.input]: true,
              }}
              onFocus={this.timePartFocusHandler}
              onKeyDown={this.hourKeyDownHandler}
              ref={this.setHourEl}
              role="spinbutton"
              tabIndex={0}
            >
              {localizedHour || emptyPlaceholder}
            </span>
            <span class={CSS.hourSuffix}>{localizedHourSuffix}</span>
            <span
              aria-label={this.intlMinute}
              aria-valuemax="12"
              aria-valuemin="1"
              aria-valuenow={(minuteIsNumber && parseInt(minute)) || "0"}
              aria-valuetext={minute}
              class={{
                [CSS.empty]: !localizedMinute,
                [CSS.input]: true,
                [CSS.minute]: true,
              }}
              onFocus={this.timePartFocusHandler}
              onKeyDown={this.minuteKeyDownHandler}
              ref={this.setMinuteEl}
              role="spinbutton"
              tabIndex={0}
            >
              {localizedMinute || emptyPlaceholder}
            </span>
            {showSecond && <span class={CSS.minuteSuffix}>{localizedMinuteSuffix}</span>}
            {showSecond && (
              <span
                aria-label={this.intlSecond}
                aria-valuemax="59"
                aria-valuemin="0"
                aria-valuenow={(secondIsNumber && parseInt(second)) || "0"}
                aria-valuetext={second}
                class={{
                  [CSS.empty]: !localizedSecond,
                  [CSS.input]: true,
                  [CSS.second]: true,
                }}
                onFocus={this.timePartFocusHandler}
                onKeyDown={this.secondKeyDownHandler}
                ref={this.setSecondEl}
                role="spinbutton"
                tabIndex={0}
              >
                {localizedSecond || emptyPlaceholder}
              </span>
            )}
            {showFractionalSecond && (
              <span class={CSS.decimalSeparator}>{localizedDecimalSeparator}</span>
            )}
            {showFractionalSecond && (
              <span
                // TODO: add translated message fractionalSecond and others from time-picker
                // aria-label={this.messages.fractionalSecond}
                aria-valuemax="999"
                aria-valuemin="1"
                aria-valuenow={(fractionalSecondIsNumber && parseInt(fractionalSecond)) || "0"}
                aria-valuetext={localizedFractionalSecond}
                class={{
                  [CSS.empty]: !localizedFractionalSecond,
                  [CSS.fractionalSecond]: true,
                  [CSS.input]: true,
                }}
                onFocus={this.timePartFocusHandler}
                onKeyDown={this.fractionalSecondKeyDownHandler}
                ref={this.setFractionalSecondEl}
                role="spinbutton"
                tabIndex={0}
              >
                {localizedFractionalSecond || "".padStart(decimalPlaces(this.step), "-")}
              </span>
            )}
            {localizedSecondSuffix && <span class={CSS.secondSuffix}>{localizedSecondSuffix}</span>}
            {showMeridiem && !meridiemStart && this.renderMeridiem("end")}
          </div>
          {!this.readOnly && this.renderToggleIcon(this.open)}
        </div>
        <calcite-popover
          autoClose={true}
          focusTrapDisabled={this.focusTrapDisabled}
          focusTrapOptions={{ initialFocus: false }}
          label={messages.chooseTime}
          lang={this.messages._lang}
          oncalcitePopoverBeforeClose={this.popoverBeforeCloseHandler}
          oncalcitePopoverBeforeOpen={this.popoverBeforeOpenHandler}
          oncalcitePopoverClose={this.popoverCloseHandler}
          oncalcitePopoverOpen={this.popoverOpenHandler}
          overlayPositioning={this.overlayPositioning}
          placement={this.placement}
          ref={this.setCalcitePopoverEl}
          referenceElement={this.containerEl}
          triggerDisabled={true}
        >
          <calcite-time-picker
            hourFormat={this.time.hourFormat}
            lang={this.messages._lang}
            messageOverrides={this.messageOverrides}
            numberingSystem={this.numberingSystem}
            oncalciteTimePickerChange={this.timePickerChangeHandler}
            ref={this.setCalciteTimePickerEl}
            scale={this.scale}
            step={this.step}
            tabIndex={this.open ? undefined : -1}
            value={this.value}
          />
        </calcite-popover>
        <HiddenFormInputSlot component={this} />
        {this.validationMessage && this.status === "invalid" ? (
          <Validation
            icon={this.validationIcon}
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </InteractiveContainer>
    );
  }

  private renderMeridiem(position: "start" | "end"): JsxNode {
    const { localizedMeridiem, meridiem } = this.time;
    return (
      <span
        aria-label={this.intlMeridiem}
        aria-valuemax="2"
        aria-valuemin="1"
        aria-valuenow={(meridiem === "PM" && "2") || "1"}
        aria-valuetext={meridiem}
        class={{
          [CSS.empty]: !localizedMeridiem,
          [CSS.input]: true,
          [CSS.meridiemStart]: position === "start",
          [CSS.meridiemEnd]: position === "end",
        }}
        onFocus={this.timePartFocusHandler}
        onKeyDown={this.meridiemKeyDownHandler}
        ref={this.setMeridiemEl}
        role="spinbutton"
        tabIndex={0}
      >
        {localizedMeridiem || "--"}
      </span>
    );
  }

  private renderToggleIcon(open: boolean): JsxNode {
    return (
      <calcite-icon
        class={CSS.toggleIcon}
        icon={open ? "chevron-up" : "chevron-down"}
        onClick={this.toggleIconClickHandler}
        scale={getIconScale(this.scale)}
      />
    );
  }

  // #endregion
}
