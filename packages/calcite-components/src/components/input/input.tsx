// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { literal } from "lit-html/static.js";
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
import {
  focusFirstTabbable,
  getElementDir,
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
import { componentFocusable } from "../../utils/component";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import {
  addLocalizedTrailingDecimalZeros,
  BigDecimal,
  isValidNumber,
  parseNumberString,
  sanitizeNumberString,
} from "../../utils/number";
import { CSS_UTILITY } from "../../utils/resources";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { InlineEditable } from "../inline-editable/inline-editable";
import type { Label } from "../label/label";
import T9nStrings from "./assets/t9n/messages.en.json";
import { InputPlacement, NumberNudgeDirection, SetValueOrigin } from "./interfaces";
import { CSS, IDS, INPUT_TYPE_ICONS, SLOTS } from "./resources";
import { NumericInputComponent, syncHiddenFormInput, TextualInputComponent } from "./common/input";
import { styles } from "./input.scss";

declare global {
  interface DeclareElements {
    "calcite-input": Input;
  }
}

/** @slot action - A slot for positioning a `calcite-button` next to the component. */
export class Input
  extends LitElement
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    NumericInputComponent,
    TextualInputComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private actionWrapperEl = createRef<HTMLDivElement>();

  attributeWatch = useWatchAttributes(
    ["autofocus", "enterkeyhint", "inputmode", "spellcheck"],
    this.handleGlobalAttributesChanged,
  );

  /** keep track of the rendered child type */
  private childEl = createRef<HTMLInputElement | HTMLTextAreaElement>();

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** number text input element for locale */
  private childNumberEl = createRef<HTMLInputElement>();

  defaultValue: Input["value"];

  formEl: HTMLFormElement;

  private inlineEditableEl: InlineEditable["el"];

  private inputWrapperEl = createRef<HTMLDivElement>();

  get isClearable(): boolean {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value?.length > 0;
  }

  get isTextarea(): boolean {
    return this.childElType === "textarea";
  }

  labelEl: Label["el"];

  private maxString?: string;

  private minString?: string;

  private nudgeNumberValueIntervalId: number;

  private onHiddenFormInputInput = (event: Event): void => {
    if ((event.target as HTMLInputElement).name === this.name) {
      this.setValue({
        value: (event.target as HTMLInputElement).value,
        origin: "direct",
      });
    }
    this.setFocus();
    event.stopPropagation();
  };

  private previousEmittedValue: string;

  private previousValue: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: IconNameOrString;

  private userChangedValue = false;

  private _value = "";

  // #endregion

  // #region State Properties

  @state() displayedValue: string;

  @state() slottedActionElDisabledInternally = false;

  // #endregion

  // #region Public Properties

  /**
   * Specifies a comma separated list of unique file type specifiers for limiting accepted file types.
   * This property only has an effect when `type` is "file".
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @property() accept: string;

  /** Specifies the text alignment of the component's value. */
  @property({ reflect: true }) alignment: Extract<"start" | "end", Alignment> = "start";

  /**
   * Specifies the type of content to autocomplete, for use in forms.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  @property() autocomplete: AutoFill;

  /** When `true`, a clear button is displayed when the component has a value. The clear button shows by default for `"search"`, `"time"`, and `"date"` types, and will not display for the `"textarea"` type. */
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
   * When `type` is `"file"`, specifies the component's selected files.
   *
   * @mdn https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files
   */
  @property() files: FileList | undefined;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When `true`, number values are displayed with a group separator corresponding to the language and country format. */
  @property({ reflect: true }) groupSeparator = false;

  /** When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon. */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * When `true`, uses locale formatting for numbers.
   *
   * @private
   */
  @property() localeFormat = false;

  /**
   * When the component resides in a form,
   * specifies the maximum value for `type="number"`.
   *
   * @mdn [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max)
   */
  @property({ reflect: true }) max: number;

  /**
   * When the component resides in a form,
   * specifies the maximum length of text for the component's value.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
   */
  @property({ reflect: true }) maxLength: number;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * When the component resides in a form,
   * specifies the minimum value for `type="number"`.
   *
   * @mdn [min](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min)
   */
  @property({ reflect: true }) min: number;

  /**
   * When the component resides in a form,
   * specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   */
  @property({ reflect: true }) minLength: number;

  /**
   * When `true`, the component can accept more than one value.
   * This property only has an effect when `type` is "email" or "file".
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)
   */
  @property() multiple = false;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @property({ reflect: true }) name: string;

  /** Specifies the placement of the buttons for `type="number"`. */
  @property({ reflect: true }) numberButtonType: InputPlacement = "vertical";

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /**
   * When the component resides in a form,
   * specifies a regular expression (regex) pattern the component's `value` must match for validation.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @property() pattern: string;

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
   * Specifies the granularity the component's `value` must adhere to.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step)
   */
  @property({ reflect: true }) step: number | "any";

  /** Adds text to the end of the component. */
  @property() suffixText: string;

  /**
   * Specifies the component type.
   *
   * Note that the following `type`s add type-specific icons by default: `"date"`, `"email"`, `"password"`, `"search"`, `"tel"`, `"time"`.
   *
   *  `"textarea"` [Deprecated] use the `calcite-text-area` component instead.
   */
  @property({ reflect: true }) type:
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "image"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "textarea"
    | "time"
    | "url"
    | "week" = "text";

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
        this.setValue({
          origin: "reset",
          value: oldValue,
        });
      }
    }
  }

  // #endregion

  // #region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    if (this.type === "number") {
      this.childNumberEl.value?.select();
    } else {
      this.childEl.value?.select();
    }
  }

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusFirstTabbable(this.type === "number" ? this.childNumberEl.value : this.childEl.value);
  }

  // #endregion

  // #region Events

  /** Fires each time a new `value` is typed and committed. */
  calciteInputChange = createEvent({ cancelable: false });

  /** Fires each time a new `value` is typed. */
  calciteInputInput = createEvent();

  /** @private */
  calciteInternalInputBlur = createEvent({ cancelable: false });

  /** @private */
  calciteInternalInputFocus = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

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
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);

    if (this.type === "number") {
      if (this.value === "Infinity" || this.value === "-Infinity") {
        this.displayedValue = this.value;
        this.previousEmittedValue = this.value;
      } else {
        this.warnAboutInvalidNumberValue(this.value);
        this.setValue({
          origin: "connected",
          value: isValidNumber(this.value) ? this.value : "",
        });
      }
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("max")) {
      this.maxString = this.max?.toString() || null;
    }

    if (changes.has("min")) {
      this.minString = this.min?.toString() || null;
    }

    if (changes.has("icon") || (changes.has("type") && (this.hasUpdated || this.type !== "text"))) {
      this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
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

  // #endregion

  // #region Private Methods

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private valueWatcher(newValue: string, previousValue: string): void {
    if (!this.userChangedValue) {
      if (this.type === "number" && (newValue === "Infinity" || newValue === "-Infinity")) {
        this.displayedValue = newValue;
        this.previousEmittedValue = newValue;
        return;
      }

      this.setValue({
        origin: "direct",
        previousValue,
        value:
          newValue == null || newValue == ""
            ? ""
            : this.type === "number"
              ? isValidNumber(newValue)
                ? newValue
                : this.previousValue || ""
              : newValue,
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
    const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
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

    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: finalValue,
    });
  }

  private clearInputValue(nativeEvent: KeyboardEvent | MouseEvent): void {
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  }

  private emitChangeIfUserModified(): void {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputChange.emit();
      this.setPreviousEmittedValue(this.value);
    }
  }

  private inputBlurHandler() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
    this.calciteInternalInputBlur.emit();
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

  private inputFocusHandler(): void {
    this.calciteInternalInputFocus.emit();
  }

  private inputInputHandler(nativeEvent: InputEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.type === "file") {
      this.files = (this.childEl.value as HTMLInputElement).files;
    }

    this.setValue({
      nativeEvent,
      origin: "user",
      value: (nativeEvent.target as HTMLInputElement).value,
    });
  }

  private inputKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "Enter") {
      this.emitChangeIfUserModified();
    }
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
      if (!isValidNumber(delocalizedValue)) {
        nativeEvent.preventDefault();
      }
      this.setValue({
        nativeEvent,
        origin: "user",
        value: parseNumberString(delocalizedValue),
      });
      if (this.childNumberEl.value) {
        this.childNumberEl.value.value = this.displayedValue;
      }
    } else {
      this.setValue({
        nativeEvent,
        origin: "user",
        value: delocalizedValue,
      });
    }
  }

  private inputNumberKeyDownHandler(event: KeyboardEvent): void {
    if (this.type !== "number" || this.disabled || this.readOnly) {
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
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };
    if (event.key === numberStringFormatter.decimal) {
      if (!this.value && !this.childNumberEl.value?.value) {
        return;
      }
      if (
        this.value &&
        this.childNumberEl.value?.value.indexOf(numberStringFormatter.decimal) === -1
      ) {
        return;
      }
    }
    if (/[eE]/.test(event.key)) {
      if (!this.value && !this.childNumberEl.value?.value) {
        return;
      }
      if (this.value && !/[eE]/.test(this.childNumberEl.value?.value)) {
        return;
      }
    }

    if (event.key === "-") {
      if (!this.value && !this.childNumberEl.value?.value) {
        return;
      }
      if (this.value && this.childNumberEl.value?.value.split("-").length <= 2) {
        return;
      }
    }
    event.preventDefault();
  }

  private nudgeNumberValue(
    direction: NumberNudgeDirection,
    nativeEvent: KeyboardEvent | MouseEvent,
  ): void {
    if ((nativeEvent instanceof KeyboardEvent && nativeEvent.repeat) || this.type !== "number") {
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

  private numberButtonPointerUpAndOutHandler(): void {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }

  private numberButtonPointerDownHandler(event: PointerEvent): void {
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
    syncHiddenFormInput(this.type, this, input);
  }

  private setInputValue(newInputValue: string): void {
    if (this.type === "number" && this.childNumberEl.value) {
      this.childNumberEl.value.value = newInputValue;
    } else if (this.childEl.value) {
      this.childEl.value.value = newInputValue;
    }
  }

  private setPreviousEmittedValue(value: string): void {
    this.previousEmittedValue = this.normalizeValue(value);
  }

  private normalizeValue(value: string): string {
    return this.type === "number" ? (isValidNumber(value) ? value : "") : value;
  }

  private setPreviousValue(value: string): void {
    this.previousValue = this.normalizeValue(value);
  }

  private setValue({
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
    this.setPreviousValue(previousValue ?? this.value);
    this.previousValueOrigin = origin;

    if (this.type === "number") {
      numberStringFormatter.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never",
      };

      const isValueDeleted =
        this.previousValue?.length > value.length || this.value?.length > value.length;
      const hasTrailingDecimalSeparator = value.charAt(value.length - 1) === ".";
      const sanitizedValue =
        hasTrailingDecimalSeparator && isValueDeleted ? value : sanitizeNumberString(value);

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

      this.userChangedValue = origin === "user" && this.value !== newValue;
      // don't sanitize the start of negative/decimal numbers, but
      // don't set value to an invalid number
      this.value = ["-", "."].includes(newValue) ? "" : newValue;
    } else {
      this.userChangedValue = origin === "user" && this.value !== value;
      this.value = value;
    }

    if (origin === "direct") {
      this.setInputValue(value);
      this.previousEmittedValue = value;
    }

    if (nativeEvent) {
      const calciteInputInputEvent = this.calciteInputInput.emit();
      if (calciteInputInputEvent.defaultPrevented) {
        this.value = this.previousValue;
        this.displayedValue =
          this.type === "number"
            ? numberStringFormatter.localize(this.previousValue)
            : this.previousValue;
      } else if (committing) {
        this.emitChangeIfUserModified();
      }
    }
  }

  private inputKeyUpHandler(): void {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }

  private warnAboutInvalidNumberValue(value: string): void {
    if (this.type === "number" && value && !isValidNumber(value)) {
      console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
    }
  }

  // #endregion

  // #region Rendering

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
        onPointerDown={this.numberButtonPointerDownHandler}
        onPointerOut={this.numberButtonPointerUpAndOutHandler}
        onPointerUp={this.numberButtonPointerUpAndOutHandler}
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
        onPointerDown={this.numberButtonPointerDownHandler}
        onPointerOut={this.numberButtonPointerUpAndOutHandler}
        onPointerUp={this.numberButtonPointerUpAndOutHandler}
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

    const autofocus = this.el.autofocus;
    const enterKeyHint = this.el.enterKeyHint as LuminaJsx.HTMLElementTags["input"]["enterKeyHint"];
    const inputMode = this.el.inputMode as LuminaJsx.HTMLElementTags["input"]["inputMode"];

    const localeNumberInput =
      this.type === "number" ? (
        <input
          accept={this.accept}
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
          ariaLabel={getLabelText(this)}
          autocomplete={this.autocomplete}
          autofocus={autofocus}
          defaultValue={this.defaultValue}
          disabled={this.disabled ? true : null}
          enterKeyHint={enterKeyHint}
          inputMode={inputMode}
          key="localized-input"
          maxLength={this.maxLength}
          minLength={this.minLength}
          multiple={this.multiple}
          name={undefined}
          onBlur={this.inputBlurHandler}
          onFocus={this.inputFocusHandler}
          onInput={this.inputNumberInputHandler}
          onKeyDown={this.inputNumberKeyDownHandler}
          // eslint-disable-next-line react/forbid-dom-props -- intentional onKeyUp usage
          onKeyUp={this.inputKeyUpHandler}
          pattern={this.pattern}
          placeholder={this.placeholder || ""}
          readOnly={this.readOnly}
          ref={this.childNumberEl}
          type="text"
          value={this.displayedValue}
        />
      ) : null;
    const DynamicHtmlTag =
      this.childElType === "input"
        ? (literal`input` as unknown as "input")
        : (literal`textarea` as unknown as "textarea");

    const childEl =
      this.type !== "number" ? (
        <DynamicHtmlTag
          accept={this.accept}
          aria-errormessage={IDS.validationMessage}
          ariaInvalid={this.status === "invalid"}
          ariaLabel={getLabelText(this)}
          autocomplete={this.autocomplete}
          autofocus={autofocus}
          class={{
            [CSS.editingEnabled]: this.editingEnabled,
            [CSS.inlineChild]: !!this.inlineEditableEl,
          }}
          defaultValue={this.defaultValue}
          disabled={this.disabled ? true : null}
          enterKeyHint={enterKeyHint}
          inputMode={inputMode}
          max={this.maxString}
          maxLength={this.maxLength}
          min={this.minString}
          minLength={this.minLength}
          multiple={this.multiple}
          name={this.name}
          onBlur={this.inputBlurHandler}
          onFocus={this.inputFocusHandler}
          onInput={this.inputInputHandler}
          onKeyDown={this.inputKeyDownHandler}
          // eslint-disable-next-line react/forbid-component-props -- intentional onKeyUp usage
          onKeyUp={this.inputKeyUpHandler}
          pattern={this.pattern}
          placeholder={this.placeholder || ""}
          readOnly={this.readOnly}
          ref={this.childEl}
          required={this.required ? true : null}
          spellcheck={this.el.spellcheck}
          step={this.step}
          tabIndex={this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null}
          type={this.type}
          value={this.value}
        />
      ) : null;

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class={{
            [CSS.inputWrapper]: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.hasSuffix]: this.suffixText,
            [CSS.hasPrefix]: this.prefixText,
          }}
          ref={this.inputWrapperEl}
        >
          {this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly
            ? numberButtonsHorizontalDown
            : null}
          {this.prefixText ? prefixText : null}
          <div class={CSS.wrapper}>
            {localeNumberInput}
            {childEl}
            {this.isClearable ? inputClearButton : null}
            {this.requestedIcon ? iconEl : null}
            {this.loading ? loader : null}
          </div>
          <div class={CSS.actionWrapper} ref={this.actionWrapperEl}>
            <slot name={SLOTS.action} />
          </div>
          {this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly
            ? numberButtonsVertical
            : null}
          {this.suffixText ? suffixText : null}
          {this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly
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

  // #endregion
}
