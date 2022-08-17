import { DeprecatedEventPayload, Scale, Status } from "../interfaces";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { getElementDir, getElementProp, getSlotted, setRequestedIcon } from "../../utils/dom";

import { CSS, SLOTS, TEXT } from "./resources";
import { InputPlacement } from "./interfaces";
import { Position } from "../interfaces";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm
} from "../../utils/form";
import {
  getDecimalSeparator,
  delocalizeNumberString,
  localizeNumberString
} from "../../utils/locale";
import { numberKeys } from "../../utils/key";
import { isValidNumber, parseNumberString, sanitizeNumberString } from "../../utils/number";
import { CSS_UTILITY, TEXT as COMMON_TEXT } from "../../utils/resources";
import { decimalPlaces } from "../../utils/math";
import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

type NumberNudgeDirection = "up" | "down";
type setNumberValueOrigin = "initial" | "connected" | "user" | "reset" | "direct";

/**
 * @slot action - A slot for positioning a button next to the component.
 */
@Component({
  tag: "calcite-input-number",
  styleUrl: "input-number.scss",
  shadow: true
})
export class InputNumber implements LabelableComponent, FormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputNumberElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the text alignment of the component's value. */
  @Prop({ reflect: true }) alignment: Position = "start";

  /**
   * When true, the component is focused on page load.
   *
   * @mdn [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
   */
  @Prop() autofocus = false;

  /**
   * When true, a clear button is displayed when the component has a value.
   */
  @Prop({ reflect: true }) clearable = false;

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledWatcher(): void {
    this.setDisabledAction();
  }

  /**
   * When true, number values are displayed with the locale's group separator.
   */
  @Prop() groupSeparator = false;

  /**
   * When true, the component will not be visible.
   *
   * @mdn [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
   */
  @Prop() hidden = false;

  /**
   * When true, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /**
   * A text label that will appear on the clear button for screen readers.
   */
  @Prop() intlClear?: string;

  /**
   * Accessible name that will appear while loading.
   *
   * @default "Loading"
   */
  @Prop() intlLoading?: string = COMMON_TEXT.loading;

  /** When true, the icon is flipped in RTL. */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Accessible name for the component's button or hyperlink. */
  @Prop() label?: string;

  /** When true, the component is in the loading state and `calcite-progress` is displayed. */
  @Prop({ reflect: true }) loading = false;

  /** Specifies the BCP 47 language tag for the desired language and country format. */
  @Prop() locale: string = document.documentElement.lang || "en";

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   *
   * @mdn [numberingSystem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem)
   */
  @Prop() numberingSystem?: string;

  /**
   * Toggles locale formatting for numbers.
   *
   * @internal
   */
  @Prop() localeFormat = false;

  /**
   * Specifies the maximum value.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max)
   */
  @Prop({ reflect: true }) max?: number;

  /** watcher to update number-to-string for max */
  @Watch("max")
  maxWatcher(): void {
    this.maxString = this.max?.toString() || null;
  }

  /**
   * Specifies the minimum value.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min)
   */
  @Prop({ reflect: true }) min?: number;

  /** watcher to update number-to-string for min */
  @Watch("min")
  minWatcher(): void {
    this.minString = this.min?.toString() || null;
  }

  /**
   * Specifies the maximum length of text for the component's value.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
   */
  @Prop({ reflect: true }) maxLength?: number;

  /**
   * Specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   */
  @Prop({ reflect: true }) minLength?: number;

  /**
   * Specifies the name of the component.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the placement of the buttons. */
  @Prop({ reflect: true }) numberButtonType?: InputPlacement = "vertical";

  /**
   * Specifies placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @Prop() placeholder: string;

  /** Adds text to the start of the component. */
  @Prop() prefixText?: string;

  /**
   * When true, the value cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop() readOnly = false;

  /** When true, the component must have a value in order for the form to submit. */
  @Prop() required = false;

  /** Specifies the size of the component. */
  @Prop({ mutable: true, reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ mutable: true, reflect: true }) status: Status = "idle";

  /**
   * Specifies the granularity that the component's value must adhere to.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)
   */
  @Prop({ reflect: true }) step?: number | "any";

  /** Adds text to the end of the component.  */
  @Prop() suffixText?: string;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  /** The component's value. */
  @Prop({ mutable: true }) value = "";

  @Watch("value")
  valueWatcher(newValue: string, previousValue: string): void {
    if (!this.userChangedValue) {
      this.setNumberValue({
        origin: "direct",
        previousValue,
        value:
          newValue == null || newValue == ""
            ? ""
            : isValidNumber(newValue)
            ? newValue
            : this.previousValue || ""
      });
      this.warnAboutInvalidNumberValue(newValue);
    }
    this.userChangedValue = false;
  }

  @Watch("icon")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon({}, this.icon, "number");
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputNumber["value"];

  inlineEditableEl: HTMLCalciteInlineEditableElement;

  /** number text input element for locale */
  private childNumberEl?: HTMLInputElement;

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  private minString?: string;

  private maxString?: string;

  private previousEmittedValue: string;

  private previousValue: string;

  private previousValueOrigin: setNumberValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: string;

  private nudgeNumberValueIntervalId;

  mutationObserver = createObserver("mutation", () => this.setDisabledAction());

  private userChangedValue = false;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() localizedValue: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.status = getElementProp(this.el, "status", this.status);
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    this.setPreviousEmittedNumberValue(this.value);
    this.setPreviousNumberValue(this.value);

    this.warnAboutInvalidNumberValue(this.value);
    this.setNumberValue({
      origin: "connected",
      value: isValidNumber(this.value) ? this.value : ""
    });
    connectLabel(this);
    connectForm(this);
    this.mutationObserver?.observe(this.el, { childList: true });
    this.setDisabledAction();
    this.el.addEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.mutationObserver?.disconnect();
    this.el.removeEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }

  componentWillLoad(): void {
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon({}, this.icon, "number");
  }

  componentShouldUpdate(newValue: string, oldValue: string, property: string): boolean {
    if (property === "value" && newValue && !isValidNumber(newValue)) {
      this.setNumberValue({
        origin: "reset",
        value: oldValue
      });
      return false;
    }
    return true;
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalInputNumberFocus: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalInputNumberBlur: EventEmitter<void>;

  /**
   * Fires each time a new value is typed.
   *
   * **Note:**: The `el` and `value` event payload props are deprecated, please use the event's target/currentTarget instead
   */
  @Event({ cancelable: true }) calciteInputNumberInput: EventEmitter<DeprecatedEventPayload>;

  /**
   * Fires each time a new value is typed and committed.
   */
  @Event({ cancelable: false }) calciteInputNumberChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.childNumberEl?.focus();
  }

  /** Selects all text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    this.childNumberEl?.select();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
    if (this.readOnly || this.disabled) {
      return;
    }
    if (this.isClearable && event.key === "Escape") {
      this.clearInputValue(event);
      event.preventDefault();
    }
    if (event.key === "Enter" && !event.defaultPrevented) {
      if (submitForm(this)) {
        event.preventDefault();
      }
    }
  };

  onLabelClick(): void {
    this.setFocus();
  }

  incrementOrDecrementNumberValue(
    direction: NumberNudgeDirection,
    inputMax: number | null,
    inputMin: number | null,
    nativeEvent: KeyboardEvent | MouseEvent
  ): void {
    const { value } = this;
    const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
    const inputVal = value && value !== "" ? parseFloat(value) : 0;

    const adjustment = direction === "up" ? 1 : -1;
    const nudgedValue = inputVal + inputStep * adjustment;
    const finalValue =
      (typeof inputMin === "number" && !isNaN(inputMin) && nudgedValue < inputMin) ||
      (typeof inputMax === "number" && !isNaN(inputMax) && nudgedValue > inputMax)
        ? inputVal
        : nudgedValue;

    const inputValPlaces = decimalPlaces(inputVal);
    const inputStepPlaces = decimalPlaces(inputStep);

    this.setNumberValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: finalValue.toFixed(Math.max(inputValPlaces, inputStepPlaces))
    });
  }

  private clearInputValue = (nativeEvent: KeyboardEvent | MouseEvent): void => {
    this.setNumberValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: ""
    });
  };

  private emitChangeIfUserModified = (): void => {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputNumberChange.emit();
    }
    this.previousEmittedValue = this.value;
  };

  private inputNumberBlurHandler = () => {
    this.calciteInternalInputNumberBlur.emit();
    this.emitChangeIfUserModified();
  };

  private inputNumberFocusHandler = (event: FocusEvent): void => {
    const slottedActionEl = getSlotted(this.el, "action");
    if (event.target !== slottedActionEl) {
      this.setFocus();
    }
    this.calciteInternalInputNumberFocus.emit();
  };

  private inputNumberInputHandler = (nativeEvent: InputEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    const value = (nativeEvent.target as HTMLInputElement).value;
    const delocalizedValue = delocalizeNumberString(value, this.locale);
    if (nativeEvent.inputType === "insertFromPaste") {
      if (!isValidNumber(delocalizedValue)) {
        nativeEvent.preventDefault();
      }
      this.setNumberValue({
        nativeEvent,
        origin: "user",
        value: parseNumberString(delocalizedValue)
      });
      this.childNumberEl.value = this.localizedValue;
    } else {
      this.setNumberValue({
        nativeEvent,
        origin: "user",
        value: delocalizedValue
      });
    }
  };

  private inputNumberKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "ArrowUp") {
      /* prevent default behavior of moving cursor to the beginning of the input when holding down ArrowUp */
      event.preventDefault();
      this.nudgeNumberValue("up", event);
      return;
    }
    if (event.key === "ArrowDown") {
      this.nudgeNumberValue("down", event);
      return;
    }
    const supportedKeys = [
      ...numberKeys,
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Delete",
      "Enter",
      "Escape",
      "Tab"
    ];
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const isShiftTabEvent = event.shiftKey && event.key === "Tab";
    if (supportedKeys.includes(event.key) && (!event.shiftKey || isShiftTabEvent)) {
      if (event.key === "Enter") {
        this.emitChangeIfUserModified();
      }
      return;
    }
    const decimalSeparator = getDecimalSeparator(this.locale);
    if (event.key === decimalSeparator) {
      if (!this.value && !this.childNumberEl.value) {
        return;
      }
      if (this.value && this.childNumberEl.value.indexOf(decimalSeparator) === -1) {
        return;
      }
    }
    if (/[eE]/.test(event.key)) {
      if (!this.value && !this.childNumberEl.value) {
        return;
      }
      if (this.value && !/[eE]/.test(this.childNumberEl.value)) {
        return;
      }
    }

    if (event.key === "-") {
      if (!this.value && !this.childNumberEl.value) {
        return;
      }
      if (this.value && this.childNumberEl.value.split("-").length <= 2) {
        return;
      }
    }
    event.preventDefault();
  };

  private nudgeNumberValue = (
    direction: NumberNudgeDirection,
    nativeEvent: KeyboardEvent | MouseEvent
  ): void => {
    if (nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) {
      return;
    }

    const inputMax = this.maxString ? parseFloat(this.maxString) : null;
    const inputMin = this.minString ? parseFloat(this.minString) : null;
    const valueNudgeDelayInMs = 100;

    this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);

    if (this.nudgeNumberValueIntervalId) {
      window.clearInterval(this.nudgeNumberValueIntervalId);
    }
    let firstValueNudge = true;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (firstValueNudge) {
        firstValueNudge = false;
        return;
      }

      this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);
    }, valueNudgeDelayInMs);
  };

  private nudgeButtonPointerUpAndOutHandler = (): void => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private nudgeButtonPointerDownHandler = (event: PointerEvent): void => {
    event.preventDefault();
    const direction = (event.target as HTMLDivElement).dataset.adjustment as NumberNudgeDirection;
    if (!this.disabled) {
      this.nudgeNumberValue(direction, event);
    }
  };

  onFormReset(): void {
    this.setNumberValue({
      origin: "reset",
      value: this.defaultValue
    });
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.type = "number";
    input.min = this.min?.toString(10) ?? "";
    input.max = this.max?.toString(10) ?? "";
  }

  hiddenInputChangeHandler = (event: Event): void => {
    if ((event.target as HTMLInputElement).name === this.name) {
      this.setNumberValue({
        value: (event.target as HTMLInputElement).value,
        origin: "direct"
      });
    }
    event.stopPropagation();
  };

  private setChildNumberElRef = (el) => {
    this.childNumberEl = el;
  };

  private setDisabledAction(): void {
    const slottedActionEl = getSlotted(this.el, "action");

    if (!slottedActionEl) {
      return;
    }

    this.disabled
      ? slottedActionEl.setAttribute("disabled", "")
      : slottedActionEl.removeAttribute("disabled");
  }

  private setInputNumberValue = (newInputValue: string): void => {
    if (!this.childNumberEl) {
      return;
    }
    this.childNumberEl.value = newInputValue;
  };

  private setPreviousEmittedNumberValue = (newPreviousEmittedValue: string): void => {
    this.previousEmittedValue = isValidNumber(newPreviousEmittedValue)
      ? newPreviousEmittedValue
      : "";
  };

  private setPreviousNumberValue = (newPreviousValue: string): void => {
    this.previousValue = isValidNumber(newPreviousValue) ? newPreviousValue : "";
  };

  private setNumberValue = ({
    committing = false,
    nativeEvent,
    origin,
    previousValue,
    value
  }: {
    committing?: boolean;
    nativeEvent?: MouseEvent | KeyboardEvent | InputEvent;
    origin: setNumberValueOrigin;
    previousValue?: string;
    value: string;
  }): void => {
    const previousLocalizedValue = localizeNumberString(
      this.previousValue,
      this.locale,
      this.groupSeparator,
      this.numberingSystem
    );

    const sanitizedValue = sanitizeNumberString(value);
    const newValue =
      value && !sanitizedValue
        ? isValidNumber(this.previousValue)
          ? this.previousValue
          : ""
        : sanitizedValue;

    const newLocalizedValue = localizeNumberString(
      newValue,
      this.locale,
      this.groupSeparator,
      this.numberingSystem
    );

    this.setPreviousNumberValue(previousValue || this.value);
    this.previousValueOrigin = origin;
    this.userChangedValue = origin === "user" && this.value !== newValue;
    this.value = newValue;

    this.localizedValue = newLocalizedValue;

    if (origin === "direct") {
      this.setInputNumberValue(newLocalizedValue);
    }

    if (nativeEvent) {
      const calciteInputNumberInputEvent = this.calciteInputNumberInput.emit({
        element: this.childNumberEl,
        nativeEvent,
        value: this.value
      });

      if (calciteInputNumberInputEvent.defaultPrevented) {
        this.value = this.previousValue;
        this.localizedValue = previousLocalizedValue;
      } else if (committing) {
        this.emitChangeIfUserModified();
      }
    }
  };

  private inputNumberKeyUpHandler = (): void => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private warnAboutInvalidNumberValue(value: string): void {
    if (value && !isValidNumber(value)) {
      console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    const loader = (
      <div class={CSS.loader}>
        <calcite-progress label={this.intlLoading} type="indeterminate" />
      </div>
    );

    const inputClearButton = (
      <button
        aria-label={this.intlClear || TEXT.clear}
        class={CSS.clearButton}
        disabled={this.disabled || this.readOnly}
        onClick={this.clearInputValue}
        tabIndex={this.disabled ? -1 : 0}
        type="button"
      >
        <calcite-icon icon="x" scale="s" />
      </button>
    );
    const iconEl = (
      <calcite-icon
        class={CSS.inputIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.requestedIcon}
        scale="s"
      />
    );

    const isHorizontalNumberButton = this.numberButtonType === "horizontal";

    const numberButtonsHorizontalUp = (
      <button
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton
        }}
        data-adjustment="up"
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerUpAndOutHandler}
        onPointerUp={this.nudgeButtonPointerUpAndOutHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon="chevron-up" scale="s" />
      </button>
    );

    const numberButtonsHorizontalDown = (
      <button
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton
        }}
        data-adjustment="down"
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerUpAndOutHandler}
        onPointerUp={this.nudgeButtonPointerUpAndOutHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon="chevron-down" scale="s" />
      </button>
    );

    const numberButtonsVertical = (
      <div class={CSS.numberButtonWrapper}>
        {numberButtonsHorizontalUp}
        {numberButtonsHorizontalDown}
      </div>
    );

    const prefixText = <div class={CSS.prefix}>{this.prefixText}</div>;

    const suffixText = <div class={CSS.suffix}>{this.suffixText}</div>;

    const childEl = (
      <input
        aria-label={getLabelText(this)}
        autofocus={this.autofocus ? true : null}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        enterKeyHint={this.el.enterKeyHint}
        inputMode={this.el.inputMode}
        key="localized-input"
        maxLength={this.maxLength}
        minLength={this.minLength}
        name={undefined}
        onBlur={this.inputNumberBlurHandler}
        onFocus={this.inputNumberFocusHandler}
        onInput={this.inputNumberInputHandler}
        onKeyDown={this.inputNumberKeyDownHandler}
        onKeyUp={this.inputNumberKeyUpHandler}
        placeholder={this.placeholder || ""}
        readOnly={this.readOnly}
        ref={this.setChildNumberElRef}
        type="text"
        value={this.localizedValue}
      />
    );

    return (
      <Host onClick={this.inputNumberFocusHandler} onKeyDown={this.keyDownHandler}>
        <div class={{ [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          {this.numberButtonType === "horizontal" && !this.readOnly
            ? numberButtonsHorizontalDown
            : null}
          {this.prefixText ? prefixText : null}
          <div class={CSS.wrapper}>
            {childEl}
            {this.isClearable ? inputClearButton : null}
            {this.requestedIcon ? iconEl : null}
            {this.loading ? loader : null}
          </div>
          <div class={CSS.actionWrapper}>
            <slot name={SLOTS.action} />
          </div>
          {this.numberButtonType === "vertical" && !this.readOnly ? numberButtonsVertical : null}
          {this.suffixText ? suffixText : null}
          {this.numberButtonType === "horizontal" && !this.readOnly
            ? numberButtonsHorizontalUp
            : null}
          <HiddenFormInputSlot component={this} />
        </div>
      </Host>
    );
  }
}
