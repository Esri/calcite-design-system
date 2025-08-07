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
import { useWatchAttributes } from "@arcgis/lumina/controllers";
import { getElementDir, setRequestedIcon } from "../../utils/dom";
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
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { CSS_UTILITY } from "../../utils/resources";
import { SetValueOrigin } from "../input/interfaces";
import { Alignment, Scale, Status } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { InternalLabel } from "../functional/InternalLabel";
import { Validation } from "../functional/Validation";
import { syncHiddenFormInput, TextualInputComponent } from "../input/common/input";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { InlineEditable } from "../inline-editable/inline-editable";
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, IDS, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./input-text.scss";

declare global {
  interface DeclareElements {
    "calcite-input-text": InputText;
  }
}

/**
 * @slot action - A slot for positioning a button next to the component.
 * @slot label-content - A slot for rendering content next to the component's `labelText`.
 */
export class InputText
  extends LitElement
  implements LabelableComponent, FormComponent, InteractiveComponent, TextualInputComponent
{
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actionWrapperEl = createRef<HTMLDivElement>();

  attributeWatch = useWatchAttributes(
    ["autofocus", "enterkeyhint", "inputmode", "spellcheck"],
    this.handleGlobalAttributesChanged,
  );

  /** keep track of the rendered child */
  private childEl?: HTMLInputElement;

  defaultValue: InputText["value"];

  formEl: HTMLFormElement;

  private inlineEditableEl: InlineEditable["el"];

  private inputWrapperEl = createRef<HTMLDivElement>();

  labelEl: Label["el"];

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

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

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

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Accessible name for the component's button or hyperlink. */
  @property() label: string;

  /** When provided, displays label text on the component. */
  @property() labelText: string;

  /** When `true`, the component is in the loading state and `calcite-progress` is displayed. */
  @property({ reflect: true }) loading = false;

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
   * When the component resides in a form,
   * specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
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
    }
  }

  //#endregion

  //#region Public Methods

  /** Selects the text of the component's `value`. */
  @method()
  async selectText(): Promise<void> {
    this.childEl?.select();
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
      return this.childEl;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires each time a new value is typed and committed. */
  calciteInputTextChange = createEvent();

  /** Fires each time a new value is typed. */
  calciteInputTextInput = createEvent();

  /** @private */
  calciteInternalInputTextBlur = createEvent<{ element: HTMLInputElement; value: string }>();

  /** @private */
  calciteInternalInputTextFocus = createEvent<{
    element: HTMLInputElement;
    value: string;
  }>();

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
    this.requestedIcon = setRequestedIcon({}, this.icon, "text");
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("icon")) {
      this.requestedIcon = setRequestedIcon({}, this.icon, "text");
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

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private valueWatcher(newValue: string, previousValue: string): void {
    if (!this.userChangedValue) {
      this.setValue({
        origin: "direct",
        previousValue,
        value: !newValue ? "" : newValue,
      });
    }
    this.userChangedValue = false;
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.readOnly || this.disabled || event.defaultPrevented) {
      return;
    }

    if (this.isClearable && event.key === "Escape") {
      this.clearInputTextValue(event);
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

  private clearInputTextValue(nativeEvent: KeyboardEvent | MouseEvent): void {
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  }

  private emitChangeIfUserModified(): void {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputTextChange.emit();
      this.setPreviousEmittedValue(this.value);
    }
  }

  private inputTextBlurHandler() {
    this.calciteInternalInputTextBlur.emit({
      element: this.childEl,
      value: this.value,
    });

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

  private inputTextFocusHandler(): void {
    this.calciteInternalInputTextFocus.emit({
      element: this.childEl,
      value: this.value,
    });
  }

  private inputTextInputHandler(nativeEvent: InputEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.setValue({
      nativeEvent,
      origin: "user",
      value: (nativeEvent.target as HTMLInputElement).value,
    });
  }

  private inputTextKeyDownHandler(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "Enter") {
      this.emitChangeIfUserModified();
    }
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("text", this, input);
  }

  private setChildElRef(el) {
    this.childEl = el;
  }

  private setInputValue(newInputValue: string): void {
    if (!this.childEl) {
      return;
    }
    this.childEl.value = newInputValue;
  }

  private setPreviousEmittedValue(value: string): void {
    this.previousEmittedValue = value;
  }

  private setPreviousValue(value: string): void {
    this.previousValue = value;
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
    this.userChangedValue = origin === "user" && value !== this.value;
    this.value = value;

    if (origin === "direct") {
      this.setInputValue(value);
      this.setPreviousEmittedValue(value);
    }

    if (nativeEvent) {
      const calciteInputTextInputEvent = this.calciteInputTextInput.emit();

      if (calciteInputTextInputEvent.defaultPrevented) {
        this.value = this.previousValue;
      } else if (committing) {
        this.emitChangeIfUserModified();
      }
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
        onClick={this.clearInputTextValue}
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
    const prefixText = <div class={CSS.prefix}>{this.prefixText}</div>;
    const suffixText = <div class={CSS.suffix}>{this.suffixText}</div>;

    const childEl = (
      <input
        aria-errormessage={IDS.validationMessage}
        ariaInvalid={this.status === "invalid"}
        ariaLabel={this.labelText || getLabelText(this)}
        autocomplete={this.autocomplete}
        autofocus={this.el.autofocus}
        class={{
          [CSS.editingEnabled]: this.editingEnabled,
          [CSS.inlineChild]: !!this.inlineEditableEl,
        }}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        enterKeyHint={this.el.enterKeyHint as LuminaJsx.HTMLElementTags["input"]["enterKeyHint"]}
        inputMode={this.el.inputMode as LuminaJsx.HTMLElementTags["input"]["inputMode"]}
        maxLength={this.maxLength}
        minLength={this.minLength}
        name={this.name}
        onBlur={this.inputTextBlurHandler}
        onFocus={this.inputTextFocusHandler}
        onInput={this.inputTextInputHandler}
        onKeyDown={this.inputTextKeyDownHandler}
        pattern={this.pattern}
        placeholder={this.placeholder || ""}
        readOnly={this.readOnly}
        ref={this.setChildElRef}
        required={this.required ? true : null}
        spellcheck={this.el.spellcheck}
        tabIndex={this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null}
        type="text"
        value={this.value}
      />
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.labelText && (
          <InternalLabel
            labelText={this.labelText}
            onClick={() => this.onLabelClick()}
            required={this.required}
            slot={<slot name={SLOTS.labelContent} />}
            spaceBottom
            tooltipText={this.messages.required}
          />
        )}
        <div
          class={{
            [CSS.inputWrapper]: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.clearable]: this.isClearable,
          }}
          ref={this.inputWrapperEl}
        >
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
          {this.suffixText ? suffixText : null}
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
