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
import { getKey } from "../../utils/key";
import { formatTimeString, isValidTime, localizeTimeString } from "../../utils/time";
import { Scale } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";

@Component({
  tag: "calcite-input-time-picker",
  styleUrl: "calcite-input-time-picker.scss",
  shadow: true
})
export class CalciteInputTimePicker implements LabelableComponent {
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

  /** The active state of the time input */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** The disabled state of the time input */
  @Prop({ reflect: true }) disabled = false;

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

  /** BCP 47 language tag for desired language and country format */
  @Prop() lang: string = document.documentElement.lang || navigator.language;

  @Watch("lang")
  langWatcher(newLang: string): void {
    this.setInputValue(localizeTimeString(this.value, newLang, this.shouldIncludeSeconds()));
  }

  /** The name of the time input */
  @Prop() name?: string;

  /** The scale (size) of the time input */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** number that specifies the granularity that the value must adhere to */
  @Prop() step = 60;

  /** The selected time (always 24-hour format)*/
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

  private calciteInputEl: HTMLCalciteInputElement;

  private calciteTimePickerEl: HTMLCalciteTimePickerElement;

  /** whether the value of the input was changed as a result of user typing or not */
  private internalValueChange = false;

  private previousValidValue: string = null;

  private referenceElementId = `input-time-picker-${guid()}`;

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
  @Event() calciteInputTimePickerChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  private calciteInputBlurHandler = (): void => {
    this.active = false;

    const localizedInputValue = localizeTimeString(
      this.calciteInputEl.value,
      this.lang,
      this.shouldIncludeSeconds()
    );
    this.setInputValue(
      localizedInputValue || localizeTimeString(this.value, this.lang, this.shouldIncludeSeconds())
    );
  };

  private calciteInputFocusHandler = (): void => {
    this.active = true;
  };

  private calciteInputInputHandler = (event: CustomEvent): void => {
    this.setValue({ value: event.detail.value });
  };

  @Listen("click")
  clickHandler(event: MouseEvent): void {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }

  @Listen("keyup")
  keyUpHandler(event: KeyboardEvent): void {
    if (getKey(event.key) === "Escape" && this.active) {
      this.active = false;
    }
  }

  @Listen("calciteTimePickerBlur")
  timePickerBlurHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.active = false;
  }

  @Listen("calciteTimePickerChange")
  timePickerChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    const value = event.detail;
    this.setValue({ value, origin: "time-picker" });
  }

  @Listen("calciteTimePickerFocus")
  timePickerFocusHandler(event: CustomEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.active = true;
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.calciteInputEl.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private shouldIncludeSeconds = (): boolean => {
    return this.step < 60;
  };

  onLabelClick(): void {
    this.setFocus();
  }

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
    const newLocalizedValue = localizeTimeString(newValue, this.lang, this.shouldIncludeSeconds());

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
    if (this.value) {
      this.setValue({ value: isValidTime(this.value) ? this.value : undefined, origin: "loading" });
    }
    connectLabel(this);
  }

  componentDidLoad() {
    this.setInputValue(this.localizedValue);
  }

  disconnectedCallback() {
    disconnectLabel(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const popoverId = `${this.referenceElementId}-popover`;
    return (
      <Host>
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
            name={this.name}
            onCalciteInputBlur={this.calciteInputBlurHandler}
            onCalciteInputFocus={this.calciteInputFocusHandler}
            onCalciteInputInput={this.calciteInputInputHandler}
            ref={this.setCalciteInputEl}
            scale={this.scale}
            step={this.step}
          />
        </div>
        <calcite-popover
          id={popoverId}
          label="Time Picker"
          open={this.active || false}
          referenceElement={this.referenceElementId}
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
            lang={this.lang}
            ref={this.setCalciteTimePickerEl}
            scale={this.scale}
            step={this.step}
            value={this.value}
          />
        </calcite-popover>
      </Host>
    );
  }
}
