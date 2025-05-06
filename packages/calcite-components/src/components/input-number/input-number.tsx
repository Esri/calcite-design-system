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
} from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/components-controllers";
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
  isValidNumber,
  parseNumberString,
  sanitizeNumberString,
} from "../../utils/number";
import { CSS_UTILITY } from "../../utils/resources";
import { InputPlacement, NumberNudgeDirection, SetValueOrigin } from "../input/interfaces";
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
import { CSS, IDS, SLOTS } from "./resources";
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
      this.setNumberValue({
        value: (event.target as HTMLInputElement).value,
        origin: "direct",
      });
    }
    this.setFocus();
    event.stopPropagation();
  };

  private previousEmittedNumberValue: string;

  private previousValue: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: IconNameOrString;

  private userChangedValue = false;

  private _value = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() displayedValue: string;

  @state() slottedActionElDisabledInternally = false;

  //#endregion

  //#region Public Properties

  /** Specifies the text alignment of the component's value. */
  @property({ reflect: true }) alignment: Extract<"start" | "end", Alignment> = "start";

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
  @property()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      this.valueWatcher(value, oldValue);
      if (value && this._value === "") {
        this.setNumberValue({
          origin: "reset",
          value: oldValue,
        });
      }
    }
  }

  //#endregion

  //#region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    this.childNumberEl?.select();
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.childNumberEl;
    });
  }

  //#endregion

  //#region Events

  /** Fires each time a new value is typed and committed. */
  calciteInputNumberChange = createEvent({ cancelable: false });

  /** Fires each time a new value is typed. */
  calciteInputNumberInput = createEvent();

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
  }

  async load(): Promise<void> {
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon({}, this.icon, "number");
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
      numberStringFormatter.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: false,
      };
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

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private valueWatcher(newValue: string, previousValue: string): void {
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

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.readOnly || this.disabled || event.defaultPrevented) {
      return;
    }

    if (this.isClearable && event.key === "Escape") {
      this.clearInputValue(event);
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

  private clearInputValue(nativeEvent: KeyboardEvent | MouseEvent): void {
    this.setNumberValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  }

  private emitChangeIfUserModified(): void {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedNumberValue) {
      this.calciteInputNumberChange.emit();
      this.setPreviousEmittedNumberValue(this.value);
    }
  }

  private inputNumberBlurHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
    this.calciteInternalInputNumberBlur.emit();
    this.emitChangeIfUserModified();
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

    if (this.value === "Infinity" || this.value === "-Infinity") {
      return;
    }

    const value = (nativeEvent.target as HTMLInputElement).value;
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
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
  }

  private inputNumberKeyDownHandler(event: KeyboardEvent): void {
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
        this.emitChangeIfUserModified();
      }
      return;
    }

    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
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

  private setInputNumberValue(newInputValue: string): void {
    if (!this.childNumberEl) {
      return;
    }
    this.childNumberEl.value = newInputValue;
  }

  private setPreviousEmittedNumberValue(value: string): void {
    this.previousEmittedNumberValue = this.normalizeValue(value);
  }

  private normalizeValue(value: string): string {
    return isValidNumber(value) ? value : "";
  }

  private setPreviousNumberValue(value: string): void {
    this.previousValue = this.normalizeValue(value);
  }

  private setNumberValue({
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
  }): void {
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };

    const isValueDeleted =
      this.previousValue?.length > value.length || this.value?.length > value.length;

    const valueHandleInteger = this.integer ? value.replace(/[e.]/g, "") : value;

    const hasTrailingDecimalSeparator =
      valueHandleInteger.charAt(valueHandleInteger.length - 1) === ".";

    const hasLeadingMinusSign = valueHandleInteger.charAt(0) === "-";
    const hasLeadingZeros = valueHandleInteger.match(/^-?(0+)\d/);

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
    if (hasTrailingDecimalSeparator && isValueDeleted) {
      newLocalizedValue = `${newLocalizedValue}${numberStringFormatter.decimal}`;
    }

    // adds localized leading zeros
    if (hasLeadingZeros) {
      newLocalizedValue = `${
        hasLeadingMinusSign ? newLocalizedValue.charAt(0) : ""
      }${numberStringFormatter.localize("0").repeat(hasLeadingZeros[1].length)}${
        hasLeadingMinusSign ? newLocalizedValue.slice(1) : newLocalizedValue
      }`;
    }

    this.displayedValue = newLocalizedValue;
    this.setPreviousNumberValue(previousValue ?? this.value);
    this.previousValueOrigin = origin;
    this.userChangedValue = origin === "user" && this.value !== newValue;
    // don't sanitize the start of negative/decimal numbers, but
    // don't set value to an invalid number
    const validNewValue = ["-", "."].includes(newValue) ? "" : newValue;
    this.value = validNewValue;

    const localizedCharAllowlist = new Set([
      "e",
      "E",
      numberStringFormatter.decimal,
      numberStringFormatter.minusSign,
      numberStringFormatter.group,
      ...numberStringFormatter.digits,
    ]);

    const childInputValue = this.childNumberEl?.value;
    // remove invalid characters from child input
    if (childInputValue) {
      const sanitizedChildInputValue = Array.from(childInputValue)
        .filter((char) => localizedCharAllowlist.has(char))
        .join("");

      if (sanitizedChildInputValue !== childInputValue) {
        this.setInputNumberValue(sanitizedChildInputValue);
      }
    }

    if (origin === "direct") {
      this.setInputNumberValue(newLocalizedValue);
      this.setPreviousEmittedNumberValue(validNewValue);
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
        ariaHidden="true"
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
        ariaHidden="true"
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
        value={this.displayedValue}
      />
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={{ [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
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
