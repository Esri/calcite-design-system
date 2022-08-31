import {
  Component,
  Element,
  Host,
  VNode,
  h,
  Prop,
  Listen,
  Event,
  EventEmitter,
  Method,
  Watch,
  State
} from "@stencil/core";
import { guid } from "../../utils/guid";
import { formatTimeString, isValidTime, localizeTimeString } from "../../utils/time";
import { Scale } from "../interfaces";
import { LogicalPlacement } from "../../utils/floating-ui";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { defaultNumberingSystem } from "../../utils/locale";

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "input-time-picker.scss",
  shadow: true
})
export class InputTimePicker implements LabelableComponent, FormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTimePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The active state of the time input
   *
   * @deprecated Use open instead.
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active")
  activeHandler(value: boolean): void {
    this.open = value;
  }

  /** When true, displays the `calcite-time-picker` component.*/

  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    this.active = value;
    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }

    this.reposition();
  }

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, still focusable but controls are gone and the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop() readOnly = false;

  @Watch("disabled")
  @Watch("readOnly")
  handleDisabledAndReadOnlyChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  /** aria-label for the hour input */
  @Prop() intlHour?: string;

  /** aria-label for the hour down button */
  @Prop() intlHourDown?: string;

  /** aria-label for the hour up button */
  @Prop() intlHourUp?: string;

  /** aria-label for the meridiem (am/pm) input */
  @Prop() intlMeridiem?: string;

  /** aria-label for the meridiem (am/pm) down button */
  @Prop() intlMeridiemDown?: string;

  /** aria-label for the meridiem (am/pm) up button */
  @Prop() intlMeridiemUp?: string;

  /** aria-label for the minute input */
  @Prop() intlMinute?: string;

  /** aria-label for the minute down button */
  @Prop() intlMinuteDown?: string;

  /** aria-label for the minute up button */
  @Prop() intlMinuteUp?: string;

  /** aria-label for the second input */
  @Prop() intlSecond?: string;

  /** aria-label for the second down button */
  @Prop() intlSecondDown?: string;

  /** aria-label for the second up button */
  @Prop() intlSecondUp?: string;

  /**
   * BCP 47 language tag for desired language and country format
   *
   * @internal
   */
  @Prop({ attribute: "lang", mutable: true }) locale: string =
    document.documentElement.lang || navigator.language || "en";

  @Watch("locale")
  localeWatcher(newLocale: string): void {
    this.setInputValue(
      localizeTimeString(this.value, newLocale, this.numberingSystem, this.shouldIncludeSeconds())
    );
  }

  /** The name of the time input */
  @Prop() name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   *
   * @mdn [numberingSystem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem)
   */
  @Prop() numberingSystem?: string;

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop({ reflect: true }) required = false;

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * Determines where the popover will be positioned relative to the input.
   *
   * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  /** number (seconds) that specifies the granularity that the value must adhere to */
  @Prop() step = 60;

  /** The selected time in UTC (always 24-hour format) */
  @Prop({ mutable: true }) value: string = null;

  @Watch("value")
  valueWatcher(newValue: string): void {
    if (!this.internalValueChange) {
      this.setValue({ value: newValue, origin: "external" });
    }
    this.internalValueChange = false;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputTimePicker["value"];

  private calciteInputEl: HTMLCalciteInputElement;

  private calciteTimePickerEl: HTMLCalciteTimePickerElement;

  /** whether the value of the input was changed as a result of user typing or not */
  private internalValueChange = false;

  private previousValidValue: string = null;

  private referenceElementId = `input-time-picker-${guid()}`;

  popoverEl: HTMLCalcitePopoverElement;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() localizedValue: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the time value is changed as a result of user input.
   */
  @Event({ cancelable: true }) calciteInputTimePickerChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private calciteInternalInputBlurHandler = (): void => {
    this.open = false;
    const shouldIncludeSeconds = this.shouldIncludeSeconds();

    const localizedInputValue = localizeTimeString(
      this.calciteInputEl.value,
      this.locale,
      this.numberingSystem,
      shouldIncludeSeconds
    );
    this.setInputValue(
      localizedInputValue ||
        localizeTimeString(this.value, this.locale, this.numberingSystem, shouldIncludeSeconds)
    );
  };

  private calciteInternalInputFocusHandler = (event: CustomEvent): void => {
    if (!this.readOnly) {
      this.open = true;
      event.stopPropagation();
    }
  };

  private calciteInputInputHandler = (event: CustomEvent): void => {
    const target = event.target as HTMLCalciteTimePickerElement;
    this.setValue({ value: target.value });

    if (this.localizedValue && isValidTime(target.value)) {
      this.setInputValue(this.localizedValue);
    } else {
      const formatter = new Intl.NumberFormat(this.locale, {
        numberingSystem: this.numberingSystem || defaultNumberingSystem
      } as Intl.ResolvedNumberFormatOptions);

      const formattedValue = target.value
        .split("")
        .map((char) => (numberKeys.includes(char) ? formatter.format(Number(char)) : char))
        .filter((char) => char)
        .join("");

      this.setInputValue(formattedValue);
    }
  };

  @Listen("click")
  clickHandler(event: MouseEvent): void {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }

  @Listen("calciteInternalTimePickerBlur")
  timePickerBlurHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  }

  private timePickerChangeHandler = (event: CustomEvent): void => {
    event.stopPropagation();
    const target = event.target as HTMLCalciteTimePickerElement;
    const value = target.value;
    this.setValue({ value, origin: "time-picker" });
  };

  @Listen("calciteInternalTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.readOnly) {
      this.open = true;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.calciteInputEl?.setFocus();
  }

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    this.popoverEl?.reposition();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
      }
    }

    if (key === "Escape" && this.open) {
      this.open = false;
      event.preventDefault();
    }
  };

  onLabelClick(): void {
    this.setFocus();
  }

  private shouldIncludeSeconds(): boolean {
    return this.step < 60;
  }

  private setCalcitePopoverEl = (el: HTMLCalcitePopoverElement): void => {
    this.popoverEl = el;
  };

  private setCalciteInputEl = (el: HTMLCalciteInputElement): void => {
    this.calciteInputEl = el;
  };

  private setCalciteTimePickerEl = (el: HTMLCalciteTimePickerElement): void => {
    this.calciteTimePickerEl = el;
  };

  private setInputValue = (newInputValue: string): void => {
    if (!this.calciteInputEl) {
      return;
    }
    this.calciteInputEl.value = newInputValue;
  };

  private setValue = ({
    value,
    origin = "input"
  }: {
    value: string;
    origin?: "input" | "time-picker" | "external" | "loading";
  }): void => {
    const previousValue = this.value;
    const newValue = formatTimeString(value);
    const newLocalizedValue = localizeTimeString(
      newValue,
      this.locale,
      this.numberingSystem,
      this.shouldIncludeSeconds()
    );
    this.internalValueChange = origin !== "external" && origin !== "loading";

    const shouldEmit =
      origin !== "loading" &&
      origin !== "external" &&
      ((value !== this.previousValidValue && !value) ||
        !!(!this.previousValidValue && newValue) ||
        (newValue !== this.previousValidValue && newValue));

    if (value) {
      if (shouldEmit) {
        this.previousValidValue = newValue;
      }
      if (newValue && newValue !== this.value) {
        this.value = newValue;
      }
      this.localizedValue = newLocalizedValue;
    } else {
      this.value = value;
      this.localizedValue = null;
    }

    if (origin === "time-picker" || origin === "external") {
      this.setInputValue(newLocalizedValue);
    }

    if (shouldEmit) {
      const changeEvent = this.calciteInputTimePickerChange.emit();

      if (changeEvent.defaultPrevented) {
        this.internalValueChange = false;
        this.value = previousValue;
        this.setInputValue(previousValue);
        this.previousValidValue = previousValue;
      } else {
        this.previousValidValue = newValue;
      }
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    const { active, open } = this;
    if (this.value) {
      this.setValue({ value: isValidTime(this.value) ? this.value : undefined, origin: "loading" });
    }
    connectLabel(this);
    connectForm(this);

    if (open) {
      this.active = open;
    } else if (active) {
      this.open = active;
    }
  }

  componentDidLoad() {
    this.setInputValue(this.localizedValue);
  }

  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const popoverId = `${this.referenceElementId}-popover`;
    return (
      <Host onKeyDown={this.keyDownHandler}>
        <div
          aria-controls={popoverId}
          aria-haspopup="dialog"
          aria-label={this.name}
          aria-owns={popoverId}
          id={this.referenceElementId}
          role="combobox"
        >
          <calcite-input
            disabled={this.disabled}
            icon="clock"
            label={getLabelText(this)}
            locale={this.locale}
            numberingSystem={this.numberingSystem}
            onCalciteInputInput={this.calciteInputInputHandler}
            onCalciteInternalInputBlur={this.calciteInternalInputBlurHandler}
            onCalciteInternalInputFocus={this.calciteInternalInputFocusHandler}
            readOnly={this.readOnly}
            ref={this.setCalciteInputEl}
            scale={this.scale}
            step={this.step}
          />
        </div>
        <calcite-popover
          id={popoverId}
          label="Time Picker"
          open={this.open}
          placement={this.placement}
          ref={this.setCalcitePopoverEl}
          referenceElement={this.referenceElementId}
          triggerDisabled={true}
        >
          <calcite-time-picker
            intlHour={this.intlHour}
            intlHourDown={this.intlHourDown}
            intlHourUp={this.intlHourUp}
            intlMeridiem={this.intlMeridiem}
            intlMeridiemDown={this.intlMeridiemDown}
            intlMeridiemUp={this.intlMeridiemUp}
            intlMinute={this.intlMinute}
            intlMinuteDown={this.intlMinuteDown}
            intlMinuteUp={this.intlMinuteUp}
            intlSecond={this.intlSecond}
            intlSecondDown={this.intlSecondDown}
            intlSecondUp={this.intlSecondUp}
            lang={this.locale}
            numberingSystem={this.numberingSystem}
            onCalciteInternalTimePickerChange={this.timePickerChangeHandler}
            ref={this.setCalciteTimePickerEl}
            scale={this.scale}
            step={this.step}
            value={this.value}
          />
        </calcite-popover>
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
