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
  Watch,
} from "@stencil/core";
import {
  getElementDir,
  getSlotted,
  isPrimaryPointerButton,
  setRequestedIcon,
} from "../../utils/dom";
import { Alignment, Scale, Status } from "../interfaces";

import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  internalHiddenInputInputEvent,
  submitForm,
} from "../../utils/form";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import {
  addLocalizedTrailingDecimalZeros,
  BigDecimal,
  isValidNumber,
  parseNumberString,
  sanitizeNumberString,
} from "../../utils/number";
import { createObserver } from "../../utils/observers";
import { CSS_UTILITY } from "../../utils/resources";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { InputPlacement, NumberNudgeDirection, SetValueOrigin } from "../input/interfaces";
import { InputNumberMessages } from "./assets/input-number/t9n";
import { CSS, SLOTS } from "./resources";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import {
  NumericInputComponent,
  syncHiddenFormInput,
  TextualInputComponent,
} from "../input/common/input";

/**
 * @slot action - A slot for positioning a button next to the component.
 */
@Component({
  tag: "calcite-input-number",
  styleUrl: "input-number.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class InputNumber
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    LocalizedComponent,
    NumericInputComponent,
    T9nComponent,
    TextualInputComponent,
    LoadableComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the text alignment of the component's value. */
  @Prop({ reflect: true }) alignment: Extract<"start" | "end", Alignment> = "start";

  /**
   * When `true`, the component is focused on page load. Only one element can contain `autofocus`. If multiple elements have `autofocus`, the first element will receive focus.
   *
   * @mdn [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
   */
  @Prop({ reflect: true }) autofocus = false;

  /**
   * When `true`, a clear button is displayed when the component has a value.
   */
  @Prop({ reflect: true }) clearable = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  disabledWatcher(): void {
    this.setDisabledAction();
  }

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true }) form: string;

  /**
   * When `true`, number values are displayed with a group separator corresponding to the language and country format.
   */
  @Prop({ reflect: true }) groupSeparator = false;

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** When `true`, restricts the component to integer numbers only and disables exponential notation. */
  @Prop() integer = false;

  /** Accessible name for the component's button or hyperlink. */
  @Prop() label: string;

  /** When `true`, the component is in the loading state and `calcite-progress` is displayed. */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

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
  @Prop({ reflect: true }) max: number;

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
  @Prop({ reflect: true }) min: number;

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
  @Prop({ reflect: true }) maxLength: number;

  /**
   * Specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   */
  @Prop({ reflect: true }) minLength: number;

  /** Specifies the validation message to display under the component. */
  @Prop() validationMessage: string;

  /** Specifies the validation icon to display under the component. */
  @Prop({ reflect: true }) validationIcon: string | boolean;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the placement of the buttons. */
  @Prop({ reflect: true }) numberButtonType: InputPlacement = "vertical";

  /**
   * Specifies placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @Prop() placeholder: string;

  /** Adds text to the start of the component. */
  @Prop() prefixText: string;

  /**
   * When `true`, the component's value can be read, but cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop({ reflect: true }) readOnly = false;

  /** When `true`, the component must have a value in order for the form to submit. */
  @Prop({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @Prop({ reflect: true }) status: Status = "idle";

  /**
   * Specifies the granularity that the component's value must adhere to.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)
   */
  @Prop({ reflect: true }) step: number | "any";

  /**
   * Specifies the type of content to autocomplete, for use in forms.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  @Prop() autocomplete: string;

  /**
   * Specifies the type of content to help devices display an appropriate virtual keyboard.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
   */
  @Prop() inputMode = "decimal";

  /**
   * Specifies the action label or icon for the Enter key on virtual keyboards.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)
   */
  @Prop() enterKeyHint: string;

  /** Adds text to the end of the component.  */
  @Prop() suffixText: string;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  /** The component's value. */
  @Prop({ mutable: true }) value = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InputNumberMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputNumberMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("value")
  valueWatcher(newValue: string, previousValue: string): void {
    if (!this.userChangedValue) {
      if (newValue === "Infinity" || newValue === "-Infinity") {
        this.displayedValue = newValue;
        this.previousEmittedNumberValue = newValue;
        return;
      }

      this.setNumberValue({
        origin: "direct",
        previousValue,
        value:
          newValue == null || newValue == ""
            ? ""
            : isValidNumber(newValue)
              ? newValue
              : this.previousValue || "",
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

  @Element() el: HTMLCalciteInputNumberElement;

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

  private previousEmittedNumberValue: string;

  private previousValue: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: string;

  private nudgeNumberValueIntervalId: number;

  mutationObserver = createObserver("mutation", () => this.setDisabledAction());

  private userChangedValue = false;

  //--------------------------------------------------------------------------
  //
  //  State
  //
  //--------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(locale: string): void {
    updateMessages(this, this.effectiveLocale);
    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem: this.numberingSystem,
      useGrouping: false,
    };
  }

  @State() defaultMessages: InputNumberMessages;

  @State() displayedValue: string;

  @State() slottedActionElDisabledInternally = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    connectLabel(this);
    connectForm(this);

    this.setPreviousEmittedNumberValue(this.value);
    this.setPreviousNumberValue(this.value);

    this.warnAboutInvalidNumberValue(this.value);

    if (this.value === "Infinity" || this.value === "-Infinity") {
      this.displayedValue = this.value;
      this.previousEmittedNumberValue = this.value;
    } else {
      this.setNumberValue({
        origin: "connected",
        value: isValidNumber(this.value) ? this.value : "",
      });
    }

    this.mutationObserver?.observe(this.el, { childList: true });
    this.setDisabledAction();
    this.el.addEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);

    this.mutationObserver?.disconnect();
    this.el.removeEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon({}, this.icon, "number");
    await setUpMessages(this);
  }

  componentShouldUpdate(newValue: string, oldValue: string, property: string): boolean {
    if (property === "value" && newValue && !isValidNumber(newValue)) {
      this.setNumberValue({
        origin: "reset",
        value: oldValue,
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
   */
  @Event({ cancelable: true }) calciteInputNumberInput: EventEmitter<void>;

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
    await componentFocusable(this);

    this.childNumberEl?.focus();
  }

  /** Selects the text of the component's `value`. */
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
    nativeEvent: KeyboardEvent | MouseEvent,
  ): void {
    const { value } = this;

    if (value === "Infinity" || value === "-Infinity") {
      return;
    }

    const adjustment = direction === "up" ? 1 : -1;
    const stepHandleInteger =
      this.integer && this.step !== "any" ? Math.round(this.step) : this.step;
    const inputStep = stepHandleInteger === "any" ? 1 : Math.abs(stepHandleInteger || 1);
    const inputVal = new BigDecimal(value !== "" ? value : "0");
    const nudgedValue = inputVal.add(`${inputStep * adjustment}`);

    const nudgedValueBelowInputMin = () =>
      typeof inputMin === "number" &&
      !isNaN(inputMin) &&
      nudgedValue.subtract(`${inputMin}`).isNegative;

    const nudgedValueAboveInputMax = () =>
      typeof inputMax === "number" &&
      !isNaN(inputMax) &&
      !nudgedValue.subtract(`${inputMax}`).isNegative;

    const finalValue = nudgedValueBelowInputMin()
      ? `${inputMin}`
      : nudgedValueAboveInputMax()
        ? `${inputMax}`
        : nudgedValue.toString();

    this.setNumberValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: finalValue,
    });
  }

  private clearInputValue = (nativeEvent: KeyboardEvent | MouseEvent): void => {
    this.setNumberValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  };

  private emitChangeIfUserModified = (): void => {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedNumberValue) {
      this.calciteInputNumberChange.emit();
      this.setPreviousEmittedNumberValue(this.value);
    }
  };

  private inputNumberBlurHandler = () => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
    this.calciteInternalInputNumberBlur.emit();
    this.emitChangeIfUserModified();
  };

  private clickHandler = (event: MouseEvent): void => {
    if (this.disabled) {
      return;
    }

    const slottedActionEl = getSlotted(this.el, "action");
    if (event.target !== slottedActionEl) {
      this.setFocus();
    }
  };

  private inputNumberFocusHandler = (): void => {
    this.calciteInternalInputNumberFocus.emit();
  };

  private inputNumberInputHandler = (nativeEvent: InputEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.value === "Infinity" || this.value === "-Infinity") {
      return;
    }

    const value = (nativeEvent.target as HTMLInputElement).value;
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };
    const delocalizedValue = numberStringFormatter.delocalize(value);
    if (nativeEvent.inputType === "insertFromPaste") {
      if (
        !isValidNumber(delocalizedValue) ||
        (this.integer && (delocalizedValue.includes("e") || delocalizedValue.includes(".")))
      ) {
        nativeEvent.preventDefault();
      }
      this.setNumberValue({
        nativeEvent,
        origin: "user",
        value: parseNumberString(delocalizedValue),
      });
      this.childNumberEl.value = this.displayedValue;
    } else {
      this.setNumberValue({
        nativeEvent,
        origin: "user",
        value: delocalizedValue,
      });
    }
  };

  private inputNumberKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.value === "Infinity" || this.value === "-Infinity") {
      event.preventDefault();
      if (event.key === "Backspace" || event.key === "Delete") {
        this.clearInputValue(event);
      }
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
      "Tab",
    ];
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const isShiftTabEvent = event.shiftKey && event.key === "Tab";
    if (supportedKeys.includes(event.key) || isShiftTabEvent) {
      if (event.key === "Enter") {
        this.emitChangeIfUserModified();
      }
      return;
    }

    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    if (event.key === numberStringFormatter.decimal && !this.integer) {
      if (!this.value && !this.childNumberEl.value) {
        return;
      }
      if (this.value && this.childNumberEl.value.indexOf(numberStringFormatter.decimal) === -1) {
        return;
      }
    }
    if (/[eE]/.test(event.key) && !this.integer) {
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
    nativeEvent: KeyboardEvent | MouseEvent,
  ): void => {
    if (nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) {
      return;
    }

    const inputMax = this.maxString ? parseFloat(this.maxString) : null;
    const inputMin = this.minString ? parseFloat(this.minString) : null;
    const valueNudgeDelayInMs = 150;

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

  private nudgeButtonPointerUpHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private nudgeButtonPointerOutHandler = (): void => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private nudgeButtonPointerDownHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    event.preventDefault();
    const direction = (event.target as HTMLDivElement).dataset.adjustment as NumberNudgeDirection;
    if (!this.disabled) {
      this.nudgeNumberValue(direction, event);
    }
  };

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("number", this, input);
  }

  private onHiddenFormInputInput = (event: Event): void => {
    if ((event.target as HTMLInputElement).name === this.name) {
      this.setNumberValue({
        value: (event.target as HTMLInputElement).value,
        origin: "direct",
      });
    }
    this.setFocus();
    event.stopPropagation();
  };

  private setChildNumberElRef = (el: HTMLInputElement) => {
    this.childNumberEl = el;
  };

  private setDisabledAction(): void {
    const slottedActionEl = getSlotted(this.el, "action");

    if (!slottedActionEl) {
      return;
    }

    if (this.disabled) {
      if (slottedActionEl.getAttribute("disabled") == null) {
        this.slottedActionElDisabledInternally = true;
      }
      slottedActionEl.setAttribute("disabled", "");
    } else if (this.slottedActionElDisabledInternally) {
      slottedActionEl.removeAttribute("disabled");
      this.slottedActionElDisabledInternally = false;
    }
  }

  private setInputNumberValue = (newInputValue: string): void => {
    if (!this.childNumberEl) {
      return;
    }
    this.childNumberEl.value = newInputValue;
  };

  private setPreviousEmittedNumberValue = (value: string): void => {
    this.previousEmittedNumberValue = this.normalizeValue(value);
  };

  private normalizeValue(value: string): string {
    return isValidNumber(value) ? value : "";
  }

  private setPreviousNumberValue = (value: string): void => {
    this.previousValue = this.normalizeValue(value);
  };

  private setNumberValue = ({
    committing = false,
    nativeEvent,
    origin,
    previousValue,
    value,
  }: {
    committing?: boolean;
    nativeEvent?: MouseEvent | KeyboardEvent | InputEvent;
    origin: SetValueOrigin;
    previousValue?: string;
    value: string;
  }): void => {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    const isValueDeleted =
      this.previousValue?.length > value.length || this.value?.length > value.length;

    const valueHandleInteger = this.integer ? value.replace(/[e.]/g, "") : value;

    const hasTrailingDecimalSeparator =
      valueHandleInteger.charAt(valueHandleInteger.length - 1) === ".";

    const sanitizedValue =
      hasTrailingDecimalSeparator && isValueDeleted
        ? valueHandleInteger
        : sanitizeNumberString(valueHandleInteger);

    const newValue =
      value && !sanitizedValue
        ? isValidNumber(this.previousValue)
          ? this.previousValue
          : ""
        : sanitizedValue;

    let newLocalizedValue = numberStringFormatter.localize(newValue);

    if (origin !== "connected" && !hasTrailingDecimalSeparator) {
      newLocalizedValue = addLocalizedTrailingDecimalZeros(
        newLocalizedValue,
        newValue,
        numberStringFormatter,
      );
    }

    // adds localized trailing decimal separator
    this.displayedValue =
      hasTrailingDecimalSeparator && isValueDeleted
        ? `${newLocalizedValue}${numberStringFormatter.decimal}`
        : newLocalizedValue;

    this.setPreviousNumberValue(previousValue ?? this.value);
    this.previousValueOrigin = origin;
    this.userChangedValue = origin === "user" && this.value !== newValue;
    // don't sanitize the start of negative/decimal numbers, but
    // don't set value to an invalid number
    this.value = ["-", "."].includes(newValue) ? "" : newValue;

    if (origin === "direct") {
      this.setInputNumberValue(newLocalizedValue);
      this.setPreviousEmittedNumberValue(newLocalizedValue);
    }

    if (nativeEvent) {
      const calciteInputNumberInputEvent = this.calciteInputNumberInput.emit();
      if (calciteInputNumberInputEvent.defaultPrevented) {
        this.value = this.previousValue;
        this.displayedValue = numberStringFormatter.localize(this.previousValue);
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
        <calcite-progress label={this.messages.loading} type="indeterminate" />
      </div>
    );

    const inputClearButton = (
      <button
        aria-label={this.messages.clear}
        class={CSS.clearButton}
        disabled={this.disabled || this.readOnly}
        onClick={this.clearInputValue}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon="x" scale={getIconScale(this.scale)} />
      </button>
    );
    const iconEl = (
      <calcite-icon
        class={CSS.inputIcon}
        flipRtl={this.iconFlipRtl}
        icon={this.requestedIcon}
        scale={getIconScale(this.scale)}
      />
    );

    const isHorizontalNumberButton = this.numberButtonType === "horizontal";

    const numberButtonsHorizontalUp = (
      <button
        aria-hidden="true"
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
        }}
        data-adjustment="up"
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerOutHandler}
        onPointerUp={this.nudgeButtonPointerUpHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon="chevron-up" scale={getIconScale(this.scale)} />
      </button>
    );

    const numberButtonsHorizontalDown = (
      <button
        aria-hidden="true"
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
        }}
        data-adjustment="down"
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerOutHandler}
        onPointerUp={this.nudgeButtonPointerUpHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon="chevron-down" scale={getIconScale(this.scale)} />
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
        autocomplete={this.autocomplete}
        autofocus={this.autofocus ? true : null}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        enterKeyHint={this.enterKeyHint}
        inputMode={this.inputMode}
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
        type="text"
        value={this.displayedValue}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setChildNumberElRef}
      />
    );

    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
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
          {this.validationMessage && this.status === "invalid" ? (
            <Validation
              icon={this.validationIcon}
              message={this.validationMessage}
              scale={this.scale}
              status={this.status}
            />
          ) : null}
        </InteractiveContainer>
      </Host>
    );
  }
}
