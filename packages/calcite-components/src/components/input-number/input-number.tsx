// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  LuminaJsx,
  stringOrBoolean,
  EventEmitter,
} from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { getElementDir, isPrimaryPointerButton, setRequestedIcon } from "../../utils/dom";
import { Alignment, Scale, Status } from "../interfaces";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  internalHiddenInputInputEvent,
  MutableValidityState,
  submitForm,
} from "../../utils/form";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { numberKeys } from "../../utils/key";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import {
  addLocalizedTrailingDecimalZeros,
  BigDecimal,
  getLocalizedCharAllowList,
  hasLeadingMinusSign,
  hasLeadingZeros,
  hasTrailingDecimal,
  isInfinity,
  isValidNumber,
  parseNumberString,
  sanitizeNumberString,
} from "../../utils/number";
import { CSS_UTILITY } from "../../utils/resources";
import { InputPlacement, NumberNudgeDirection } from "../input/interfaces";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import {
  NumericInputComponent,
  syncHiddenFormInput,
  TextualInputComponent,
} from "../input/common/input";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { InlineEditable } from "../inline-editable/inline-editable";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useValue } from "../../controllers/useValue";
import { CSS, ICONS, IDS, SLOTS, DIRECTION } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./input-number.scss";

declare global {
  interface DeclareElements {
    "calcite-input-number": InputNumber;
  }
}

/** @slot action - A slot for positioning a button next to the component. */
export class InputNumber
  extends LitElement
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    NumericInputComponent,
    TextualInputComponent
{
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actionWrapperEl = createRef<HTMLDivElement>();

  attributeWatch = useWatchAttributes(
    ["autofocus", "enterkeyhint", "inputmode"],
    this.handleGlobalAttributesChanged,
  );

  /** number text input element for locale */
  private childNumberEl?: HTMLInputElement;

  defaultValue: InputNumber["value"];

  formEl: HTMLFormElement;

  private inlineEditableEl: InlineEditable["el"];

  private inputWrapperEl = createRef<HTMLDivElement>();

  labelEl: Label["el"];

  private maxString?: string;

  private minString?: string;

  private nudgeNumberValueIntervalId: number;

  private onHiddenFormInputInput = (event: Event): void => {
    if ((event.target as HTMLInputElement).name === this.name) {
      this.setValue((event.target as HTMLInputElement).value);
    }
    this.setFocus();
    event.stopPropagation();
  };

  /** the computed icon to render */
  private requestedIcon?: IconNameOrString;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  private valueController = useValue(this);

  private getLocalizedNumberString = (value: string): string => {
    if (!value) {
      return "";
    }

    const { integer, isValueShortened, setNumberFormatOptions, valueController } = this;
    const { previousValue } = valueController;

    setNumberFormatOptions();

    let newLocalizedValue = numberStringFormatter.localize(value);
    const localizedCharAllowlist = getLocalizedCharAllowList(numberStringFormatter);
    const validatedInteger = integer ? value.replace(/[e.]/g, "") : value;
    const valueHasLeadingMinusSign = hasLeadingMinusSign(validatedInteger);
    const valueHasTrailingDecimal = hasTrailingDecimal(validatedInteger);
    const valueHasLeadingZeros = hasLeadingZeros(validatedInteger);

    if (!valueHasTrailingDecimal) {
      newLocalizedValue = addLocalizedTrailingDecimalZeros(
        newLocalizedValue,
        value,
        numberStringFormatter,
      );
    }

    if (valueHasTrailingDecimal && isValueShortened(value, previousValue)) {
      newLocalizedValue = `${newLocalizedValue}${numberStringFormatter.decimal}`;
    }

    if (valueHasLeadingZeros) {
      newLocalizedValue = `${
        valueHasLeadingMinusSign ? newLocalizedValue.charAt(0) : ""
      }${numberStringFormatter.localize("0").repeat(valueHasLeadingZeros[1].length)}${
        valueHasLeadingMinusSign ? newLocalizedValue.slice(1) : newLocalizedValue
      }`;
    }

    if (newLocalizedValue) {
      newLocalizedValue = Array.from(newLocalizedValue)
        .filter((char) => localizedCharAllowlist.has(char))
        .join("");
    }

    return newLocalizedValue;
  };

  private getValidNumberString = (value: string): string => {
    if (isInfinity(value)) {
      return value;
    }

    value = parseNumberString(value);

    if (!isValidNumber(value)) {
      return "";
    }

    const { integer, isValueShortened, valueController } = this;
    const { previousValue } = valueController;

    const validatedInteger = integer ? value.replace(/[e.]/g, "") : value;

    const sanitizedValue =
      hasTrailingDecimal(validatedInteger) && isValueShortened(value, previousValue)
        ? validatedInteger
        : sanitizeNumberString(validatedInteger);

    const newValue =
      value && !sanitizedValue
        ? isValidNumber(previousValue)
          ? previousValue
          : ""
        : sanitizedValue;

    return ["-", "."].includes(newValue) ? "" : newValue;
  };

  private setNumberFormatOptions = (): void => {
    const { groupSeparator: useGrouping, messages, numberingSystem } = this;
    const { _lang: locale } = messages;
    numberStringFormatter.numberFormatOptions = {
      locale,
      numberingSystem,
      useGrouping,
    };
  };

  private isValueShortened = (value: string, previousValue: string): boolean => {
    return previousValue?.length > value.length || this.value?.length > value.length;
  };

  private setLocalizedValue = (value: string): void => {
    this.localizedValue = isInfinity(this.value)
      ? this.value
      : this.getLocalizedNumberString(value);

    if (this.childNumberEl) {
      const childInputValue = this.childNumberEl?.value;
      const localizedCharAllowList = getLocalizedCharAllowList(numberStringFormatter);
      if (childInputValue) {
        const sanitizedChildInputValue = Array.from(childInputValue)
          .filter((char) => localizedCharAllowList.has(char))
          .join("");

        if (sanitizedChildInputValue !== childInputValue) {
          this.childNumberEl.value = sanitizedChildInputValue;
        }
      }
    }
  };

  private setValue = (value: string): void => {
    this.value = this.getValidNumberString(value);
    this.setLocalizedValue(this.value);
    this.warnAboutInvalidNumberValue(value);
  };

  //#endregion

  //#region State Properties

  @state() localizedValue: string;

  @state() slottedActionElDisabledInternally = false;

  //#endregion

  //#region Public Properties

  /** Specifies the text alignment of the component's value. */
  @property({ reflect: true }) alignment: Alignment = "start";

  /**
   * Specifies the type of content to autocomplete, for use in forms.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  @property() autocomplete: AutoFill;

  /** When `true`, a clear button is displayed when the component has a value. */
  @property({ reflect: true }) clearable = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @property({ reflect: true }) disabled = false;

  /** @private */
  @property({ reflect: true }) editingEnabled = false;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, restricts the component to integer numbers only and disables exponential notation. */
  @property() integer = false;

  /** Accessible name for the component's button or hyperlink. */
  @property() label: string;

  /** When `true`, the component is in the loading state and `calcite-progress` is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * Toggles locale formatting for numbers.
   *
   * @private
   */
  @property() localeFormat = false;

  /**
   * When the component resides in a form,
   * specifies the maximum value.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max)
   */
  @property({ reflect: true }) max: number;

  /**
   * When the component resides in a form,
   * specifies the maximum length of text for the component's value.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
   * @deprecated This property has no effect on the component.
   */
  @property({ reflect: true }) maxLength: number;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When the component resides in a form,
   * specifies the minimum value.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min)
   */
  @property({ reflect: true }) min: number;

  /**
   * When the component resides in a form,
   * specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   * @deprecated This property has no effect on the component.
   */
  @property({ reflect: true }) minLength: number;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @property({ reflect: true }) name: string;

  /** Specifies the placement of the buttons. */
  @property({ reflect: true }) numberButtonType: InputPlacement = "vertical";

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /**
   * Specifies placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @property() placeholder: string;

  /** Adds text to the start of the component. */
  @property() prefixText: string;

  /**
   * When `true`, the component's value can be read, but cannot be modified.
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

  /**
   * Specifies the granularity that the component's value must adhere to.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)
   */
  @property({ reflect: true }) step: number | "any";

  /** Adds text to the end of the component. */
  @property() suffixText: string;

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

  /** The component's value. */
  @property() value: string = "";

  //#endregion

  //#region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    this.childNumberEl?.select();
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.childNumberEl;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires each time a new value is typed and committed. */
  calciteInputNumberChange = createEvent({ cancelable: false });

  /** Fires each time a new value is typed. */
  calciteInputNumberInput: EventEmitter<string> = createEvent();

  /** @private */
  calciteInternalInputNumberBlur = createEvent({ cancelable: false });

  /** @private */
  calciteInternalInputNumberFocus = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    connectLabel(this);
    connectForm(this);
    this.el.addEventListener(
      internalHiddenInputInputEvent,
      this.onHiddenFormInputInput,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;

    this.setValue(this.value);
  }

  async load(): Promise<void> {
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon({}, this.icon, "number");
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("max")) {
      this.maxString = this.max?.toString() || null;
    }

    if (changes.has("min")) {
      this.minString = this.min?.toString() || null;
    }

    if (changes.has("icon")) {
      this.requestedIcon = setRequestedIcon({}, this.icon, "number");
    }

    if (changes.has("messages")) {
      this.setNumberFormatOptions();
    }

    if (changes.has("value")) {
      this.setLocalizedValue(this.value);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    this.el.removeEventListener(
      internalHiddenInputInputEvent,
      this.onHiddenFormInputInput,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  }

  //#endregion

  //#region Private Methods

  private commitValue() {
    this.valueController.commitCurrentValue({ changeEventEmitter: this.calciteInputNumberChange });
  }

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private inputValue(value: string) {
    const { calciteInputNumberInput: inputEventEmitter, getValidNumberString } = this;
    const validatedValue = getValidNumberString(value);
    if (validatedValue || !value || (value && !validatedValue)) {
      this.valueController.inputValue({ inputEventEmitter, value: validatedValue });
    }
    this.setLocalizedValue(this.value);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.readOnly || this.disabled || event.defaultPrevented) {
      return;
    }

    if (this.isClearable && event.key === "Escape") {
      this.clearInputValue();
      event.preventDefault();
    }
    if (event.key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
      }
    }
  }

  onLabelClick(): void {
    this.setFocus();
  }

  private incrementOrDecrementNumberValue(
    direction: NumberNudgeDirection,
    inputMax: number | null,
    inputMin: number | null,
  ): void {
    const { value } = this;

    if (isInfinity(value)) {
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

    this.valueController.inputValue({
      inputEventEmitter: this.calciteInputNumberInput,
      value: finalValue,
    });
  }

  private clearInputValue(): void {
    this.valueController.inputValue({ inputEventEmitter: this.calciteInputNumberInput, value: "" });
  }

  private inputNumberBlurHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
    this.calciteInternalInputNumberBlur.emit();
    this.commitValue();
  }

  private clickHandler(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const composedPath = event.composedPath();

    if (
      !composedPath.includes(this.inputWrapperEl.value) ||
      composedPath.includes(this.actionWrapperEl.value)
    ) {
      return;
    }

    this.setFocus();
  }

  private inputNumberFocusHandler(): void {
    this.calciteInternalInputNumberFocus.emit();
  }

  private inputNumberInputHandler(nativeEvent: InputEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (isInfinity(this.value)) {
      return;
    }

    const value = (nativeEvent.target as HTMLInputElement).value;

    this.setNumberFormatOptions();

    const delocalizedValue = numberStringFormatter.delocalize(value);
    if (
      nativeEvent.inputType === "insertFromPaste" &&
      (!isValidNumber(delocalizedValue) ||
        (this.integer && (delocalizedValue.includes("e") || delocalizedValue.includes("."))))
    ) {
      nativeEvent.preventDefault();
    }
    this.inputValue(delocalizedValue);
  }

  private inputNumberKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (isInfinity(this.value)) {
      event.preventDefault();
      if (event.key === "Backspace" || event.key === "Delete") {
        this.clearInputValue();
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
      event.preventDefault();
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
        this.commitValue();
      }
      return;
    }

    this.setNumberFormatOptions();

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
  }

  private nudgeNumberValue(
    direction: NumberNudgeDirection,
    nativeEvent: KeyboardEvent | MouseEvent,
  ): void {
    if (nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) {
      return;
    }

    const inputMax = this.maxString ? parseFloat(this.maxString) : null;
    const inputMin = this.minString ? parseFloat(this.minString) : null;
    const valueNudgeDelayInMs = 150;

    this.incrementOrDecrementNumberValue(direction, inputMax, inputMin);

    if (this.nudgeNumberValueIntervalId) {
      window.clearInterval(this.nudgeNumberValueIntervalId);
    }
    let firstValueNudge = true;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (firstValueNudge) {
        firstValueNudge = false;
        return;
      }

      this.incrementOrDecrementNumberValue(direction, inputMax, inputMin);
    }, valueNudgeDelayInMs);
  }

  private nudgeButtonPointerUpHandler(event: PointerEvent): void {
    if (!isPrimaryPointerButton(event)) {
      return;
    }
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }

  private nudgeButtonPointerOutHandler(): void {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }

  private nudgeButtonPointerDownHandler(event: PointerEvent): void {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    event.preventDefault();
    const direction = (event.target as HTMLDivElement).dataset.adjustment as NumberNudgeDirection;
    if (!this.disabled) {
      this.nudgeNumberValue(direction, event);
    }
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("number", this, input);
  }

  private setChildNumberElRef(el: HTMLInputElement) {
    this.childNumberEl = el;
  }

  private inputNumberKeyUpHandler(): void {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }

  private warnAboutInvalidNumberValue(value: string): void {
    if (value && !isValidNumber(value)) {
      console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const dir = getElementDir(this.el);
    const loader = (
      <div class={CSS.loader}>
        <calcite-progress label={this.messages.loading} type="indeterminate" />
      </div>
    );

    const inputClearButton = (
      <button
        ariaLabel={this.messages.clear}
        class={CSS.clearButton}
        disabled={this.disabled || this.readOnly}
        onClick={this.clearInputValue}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon={ICONS.clear} scale={getIconScale(this.scale)} />
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
        ariaHidden="true"
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
        }}
        data-adjustment={DIRECTION.up}
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerOutHandler}
        onPointerUp={this.nudgeButtonPointerUpHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon={ICONS.chevronUp} scale={getIconScale(this.scale)} />
      </button>
    );

    const numberButtonsHorizontalDown = (
      <button
        ariaHidden="true"
        class={{
          [CSS.numberButtonItem]: true,
          [CSS.buttonItemHorizontal]: isHorizontalNumberButton,
        }}
        data-adjustment={DIRECTION.down}
        disabled={this.disabled || this.readOnly}
        onPointerDown={this.nudgeButtonPointerDownHandler}
        onPointerOut={this.nudgeButtonPointerOutHandler}
        onPointerUp={this.nudgeButtonPointerUpHandler}
        tabIndex={-1}
        type="button"
      >
        <calcite-icon icon={ICONS.chevronDown} scale={getIconScale(this.scale)} />
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
        aria-errormessage={IDS.validationMessage}
        ariaInvalid={this.status === "invalid"}
        ariaLabel={getLabelText(this)}
        autocomplete={this.autocomplete}
        autofocus={this.el.autofocus}
        defaultValue={this.defaultValue}
        disabled={this.disabled}
        enterKeyHint={this.el.enterKeyHint as LuminaJsx.HTMLElementTags["input"]["enterKeyHint"]}
        inputMode={
          (this.el.inputMode as LuminaJsx.HTMLElementTags["input"]["inputMode"]) || "decimal"
        }
        key="localized-input"
        maxLength={this.maxLength}
        minLength={this.minLength}
        name={undefined}
        onBlur={this.inputNumberBlurHandler}
        onFocus={this.inputNumberFocusHandler}
        onInput={this.inputNumberInputHandler}
        onKeyDown={this.inputNumberKeyDownHandler}
        // eslint-disable-next-line react/forbid-dom-props -- intentional onKeyUp usage
        onKeyUp={this.inputNumberKeyUpHandler}
        placeholder={this.placeholder || ""}
        readOnly={this.readOnly}
        ref={this.setChildNumberElRef}
        type="text"
        value={this.localizedValue}
      />
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={{
            [CSS.inputWrapper]: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.hasSuffix]: this.suffixText,
            [CSS.hasPrefix]: this.prefixText,
            [CSS.clearable]: this.isClearable,
          }}
          ref={this.inputWrapperEl}
        >
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
          <div class={CSS.actionWrapper} ref={this.actionWrapperEl}>
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
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </InteractiveContainer>
    );
  }

  //#endregion
}
