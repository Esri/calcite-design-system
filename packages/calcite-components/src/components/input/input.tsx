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
import { Scale, Status, Alignment } from "../interfaces";

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
import { InputMessages } from "./assets/input/t9n";
import { InputPlacement, NumberNudgeDirection, SetValueOrigin } from "./interfaces";
import { CSS, INPUT_TYPE_ICONS, SLOTS } from "./resources";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";

/**
 * @slot action - A slot for positioning a `calcite-button` next to the component.
 */
@Component({
  tag: "calcite-input",
  styleUrl: "input.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Input
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    T9nComponent,
    LocalizedComponent,
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
   * When `true`, a clear button is displayed when the component has a value. The clear button shows by default for `"search"`, `"time"`, and `"date"` types, and will not display for the `"textarea"` type.
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
   * When `true`, the component will not be visible.
   *
   * @mdn [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
   */
  @Prop({ reflect: true }) hidden = false;

  /**
   * When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Accessible name for the component. */
  @Prop() label: string;

  /** When `true`, a busy indicator is displayed. */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   *
   */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /**
   * When `true`, uses locale formatting for numbers.
   *
   * @internal
   */
  @Prop() localeFormat = false;

  /**
   * Specifies the maximum value for type "number".
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
   * Specifies the minimum value for `type="number"`.
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
  @Prop() validationIcon: string | boolean;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @Prop({ reflect: true }) name: string;

  /** Specifies the placement of the buttons for `type="number"`. */
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
   * Specifies the granularity the component's `value` must adhere to.
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
   * Specifies a regex pattern the component's `value` must match for validation.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @Prop() pattern: string;

  /**
   * Specifies a comma separated list of unique file type specifiers for limiting accepted file types.
   * This property only has an effect when `type` is "file".
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @Prop() accept: string;

  /**
   * When `true`, the component can accept more than one value.
   * This property only has an effect when `type` is "email" or "file".
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)
   */
  @Prop() multiple = false;

  /**
   * Specifies the type of content to help devices display an appropriate virtual keyboard.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
   */
  @Prop() inputMode = "text";

  /**
   * Specifies the action label or icon for the Enter key on virtual keyboards.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)
   */
  @Prop() enterKeyHint: string;

  /** Adds text to the end of the component. */
  @Prop() suffixText: string;

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) editingEnabled = false;

  /**
   * Specifies the component type.
   *
   * Note that the following `type`s add type-specific icons by default: `"date"`, `"email"`, `"password"`, `"search"`, `"tel"`, `"time"`.
   */
  @Prop({ reflect: true }) type:
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

  /** The component's value. */
  @Prop({ mutable: true }) value = "";

  /**
   * When `type` is `"file"`, specifies the component's selected files.
   *
   * @mdn https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files
   */
  @Prop() files: FileList | undefined;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: InputMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("value")
  valueWatcher(newValue: string, previousValue: string): void {
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

  @Watch("icon")
  @Watch("type")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Input["value"];

  inlineEditableEl: HTMLCalciteInlineEditableElement;

  /** keep track of the rendered child type */
  private childEl?: HTMLInputElement | HTMLTextAreaElement;

  /** keep track of the rendered child type */
  private childElType?: "input" | "textarea" = "input";

  /** number text input element for locale */
  private childNumberEl?: HTMLInputElement;

  get isClearable(): boolean {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value?.length > 0;
  }

  get isTextarea(): boolean {
    return this.childElType === "textarea";
  }

  private minString?: string;

  private maxString?: string;

  private previousEmittedValue: string;

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

  @State() defaultMessages: InputMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

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

    this.mutationObserver?.observe(this.el, { childList: true });

    this.setDisabledAction();
    this.el.addEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
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
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentShouldUpdate(newValue: string, oldValue: string, property: string): boolean {
    if (this.type === "number" && property === "value" && newValue && !isValidNumber(newValue)) {
      this.setValue({
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
  @Event({ cancelable: false }) calciteInternalInputFocus: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalInputBlur: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed.
   */
  @Event({ cancelable: true }) calciteInputInput: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed and committed.
   */
  @Event({ cancelable: false }) calciteInputChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    if (this.type === "number") {
      this.childNumberEl?.focus();
    } else {
      this.childEl?.focus();
    }
  }

  /** Selects the text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    if (this.type === "number") {
      this.childNumberEl?.select();
    } else {
      this.childEl?.select();
    }
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

  private clearInputValue = (nativeEvent: KeyboardEvent | MouseEvent): void => {
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  };

  private emitChangeIfUserModified = (): void => {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputChange.emit();
      this.setPreviousEmittedValue(this.value);
    }
  };

  private inputBlurHandler = () => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
    this.calciteInternalInputBlur.emit();
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

  private inputFocusHandler = (): void => {
    this.calciteInternalInputFocus.emit();
  };

  private inputChangeHandler = (): void => {
    if (this.type === "file") {
      this.files = (this.childEl as HTMLInputElement).files;
    }
  };

  private inputInputHandler = (nativeEvent: InputEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.setValue({
      nativeEvent,
      origin: "user",
      value: (nativeEvent.target as HTMLInputElement).value,
    });
  };

  private inputKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "Enter") {
      this.emitChangeIfUserModified();
    }
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
      if (!isValidNumber(delocalizedValue)) {
        nativeEvent.preventDefault();
      }
      this.setValue({
        nativeEvent,
        origin: "user",
        value: parseNumberString(delocalizedValue),
      });
      this.childNumberEl.value = this.displayedValue;
    } else {
      this.setValue({
        nativeEvent,
        origin: "user",
        value: delocalizedValue,
      });
    }
  };

  private inputNumberKeyDownHandler = (event: KeyboardEvent): void => {
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
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator,
    };
    if (event.key === numberStringFormatter.decimal) {
      if (!this.value && !this.childNumberEl.value) {
        return;
      }
      if (this.value && this.childNumberEl.value.indexOf(numberStringFormatter.decimal) === -1) {
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
    nativeEvent: KeyboardEvent | MouseEvent,
  ): void => {
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
  };

  private numberButtonPointerUpAndOutHandler = (): void => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private numberButtonPointerDownHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    event.preventDefault();
    const direction = (event.target as HTMLDivElement).dataset.adjustment as NumberNudgeDirection;
    if (!this.disabled) {
      this.nudgeNumberValue(direction, event);
    }
  };

  onFormReset(): void {
    this.setValue({
      origin: "reset",
      value: this.defaultValue,
    });
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    const { type } = this;

    input.type = type;

    if (type === "number") {
      input.min = this.min?.toString(10) ?? "";
      input.max = this.max?.toString(10) ?? "";
    } else if (type === "text") {
      if (this.minLength != null) {
        input.minLength = this.minLength;
      }

      if (this.maxLength != null) {
        input.maxLength = this.maxLength;
      }
    }
  }

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

  private setChildElRef = (el: HTMLInputElement | HTMLTextAreaElement) => {
    this.childEl = el;
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

  private setInputValue = (newInputValue: string): void => {
    if (this.type === "text" && !this.childEl) {
      return;
    }
    if (this.type === "number" && !this.childNumberEl) {
      return;
    }
    this[`child${this.type === "number" ? "Number" : ""}El`].value = newInputValue;
  };

  private setPreviousEmittedValue = (value: string): void => {
    this.previousEmittedValue = this.normalizeValue(value);
  };

  private normalizeValue(value: string): string {
    return this.type === "number" ? (isValidNumber(value) ? value : "") : value;
  }

  private setPreviousValue = (value: string): void => {
    this.previousValue = this.normalizeValue(value);
  };

  private setValue = ({
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
    this.setPreviousValue(previousValue ?? this.value);
    this.previousValueOrigin = origin;

    if (this.type === "number") {
      numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
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
  };

  private inputKeyUpHandler = (): void => {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  };

  private warnAboutInvalidNumberValue(value: string): void {
    if (this.type === "number" && value && !isValidNumber(value)) {
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
        aria-hidden="true"
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

    const localeNumberInput =
      this.type === "number" ? (
        <input
          accept={this.accept}
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
          multiple={this.multiple}
          name={undefined}
          onBlur={this.inputBlurHandler}
          onFocus={this.inputFocusHandler}
          onInput={this.inputNumberInputHandler}
          onKeyDown={this.inputNumberKeyDownHandler}
          onKeyUp={this.inputKeyUpHandler}
          pattern={this.pattern}
          placeholder={this.placeholder || ""}
          readOnly={this.readOnly}
          type="text"
          value={this.displayedValue}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setChildNumberElRef}
        />
      ) : null;

    const childEl =
      this.type !== "number"
        ? [
            <this.childElType
              accept={this.accept}
              aria-label={getLabelText(this)}
              autocomplete={this.autocomplete}
              autofocus={this.autofocus ? true : null}
              class={{
                [CSS.editingEnabled]: this.editingEnabled,
                [CSS.inlineChild]: !!this.inlineEditableEl,
              }}
              defaultValue={this.defaultValue}
              disabled={this.disabled ? true : null}
              enterKeyHint={this.enterKeyHint}
              inputMode={this.inputMode}
              max={this.maxString}
              maxLength={this.maxLength}
              min={this.minString}
              minLength={this.minLength}
              multiple={this.multiple}
              name={this.name}
              onBlur={this.inputBlurHandler}
              onChange={this.inputChangeHandler}
              onFocus={this.inputFocusHandler}
              onInput={this.inputInputHandler}
              onKeyDown={this.inputKeyDownHandler}
              onKeyUp={this.inputKeyUpHandler}
              pattern={this.pattern}
              placeholder={this.placeholder || ""}
              readOnly={this.readOnly}
              required={this.required ? true : null}
              step={this.step}
              tabIndex={
                this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null
              }
              type={this.type}
              value={this.value}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setChildElRef}
            />,
            this.isTextarea ? (
              <div class={CSS.resizeIconWrapper}>
                <calcite-icon icon="chevron-down" scale={getIconScale(this.scale)} />
              </div>
            ) : null,
          ]
        : null;

    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          <div class={{ [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
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
            <div class={CSS.actionWrapper}>
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
          {this.validationMessage ? (
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
