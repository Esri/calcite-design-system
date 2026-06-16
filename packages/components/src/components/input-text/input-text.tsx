import { PropertyValues } from "lit";
import { createRef } from "lit/directives/ref.js";
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
import { useDirection, useWatchAttributes } from "@arcgis/lumina/controllers";
import { setRequestedIcon } from "../../utils/dom";
import { useForm } from "../../controllers/useForm";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { CSS_UTILITY } from "../../utils/resources";
import { SetValueOrigin } from "../input/interfaces";
import { Alignment, Scale, Status } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { ClearButton } from "../functional/ClearButton";
import { InternalLabel } from "../functional/InternalLabel";
import {
  CSS as InlineEditingControlsCSS,
  InlineEditingControls,
} from "../functional/InlineEditingControls";
import { Validation } from "../functional/Validation";
import { TextualInputComponent } from "../input/common/input";
import { IconName } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { UseInlineEditing } from "../../controllers/useInlineEditing";
import type { Action } from "../action/action";
import type { InlineEditable } from "../inline-editable/inline-editable"; // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0
import type { Label } from "../label/label";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS, IDS, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./input-text.scss";

declare global {
  interface DeclareElements {
    "calcite-input-text": InputText;
  }
}

/**
 * @slot action - A slot for positioning a `calcite-action` or other interactive content adjacent to the component.
 * @slot label-content - A slot for rendering content next to the component's `labelText`.
 */
export class InputText extends LitElement implements LabelableComponent, TextualInputComponent {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actionWrapperRef = createRef<HTMLDivElement>();

  attributeWatch = useWatchAttributes(
    ["autofocus", "enterkeyhint", "inputmode", "spellcheck"],
    this.handleGlobalAttributesChanged,
  );

  private childRef = createRef<HTMLInputElement>();

  private enableInlineEditingButtonRef = createRef<Action["el"]>();

  defaultValue?: InputText["value"];

  private direction = useDirection();

  // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0
  private inlineEditableEl?: InlineEditable["el"];

  private inputWrapperRef = createRef<HTMLDivElement>();

  labelEl?: Label["el"];

  private previousEmittedValue?: string;

  private previousValue!: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: IconName;

  private userChangedValue = false;

  private _value = "";

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  private formSupport = useForm<this>({
    inputType: "text",
  })(this);

  private interactiveContainer = useInteractive(this);

  private useInlineEditing = new UseInlineEditing({
    getEditingEnabled: () => this.editingEnabled,
    setEditingEnabled: (editingEnabled) => {
      this.editingEnabled = editingEnabled;
    },
    getValue: () => this.value,
    setValue: (value) => {
      this.setValue({ origin: "direct", value });
    },
    setFocus: () => {
      void this.setFocus();
    },
    emitCancel: () => {
      this.calciteInputTextInlineEditingCancel.emit();
    },
    emitConfirm: () => {
      this.calciteInputTextInlineEditingConfirm.emit();
    },
    emitEnableEditingChange: () => {
      this.calciteInputTextInlineEditingEnableEditingChange.emit();
    },
  });

  // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0 (remove !this.inlineEditableEl)
  private get selfManagedInlineEditing(): boolean {
    return this.inlineEditing && !this.inlineEditableEl;
  }

  // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0 (remove !!this.inlineEditableEl)
  private get hasInlineEditingContext(): boolean {
    return this.inlineEditing || !!this.inlineEditableEl;
  }

  // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0 (remove this.inlineEditableEl ? this.inlineEditableEl.editingEnabled)
  private get inlineEditingEnabledInContext(): boolean {
    return this.inlineEditableEl ? this.inlineEditableEl.editingEnabled : this.editingEnabled;
  }

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  //#endregion

  //#region State Properties

  @state() inlineEditingLoading = false;

  @state() slottedActionElDisabledInternally = false;

  //#endregion

  //#region Public Properties

  /** Specifies the text alignment of the component's `value`. */
  @property({ reflect: true }) alignment: Alignment = "start";

  /**
   * Specifies the type of content to autocomplete, for use in forms.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @see [MDN - autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  @property() autocomplete?: AutoFill;

  /** When `true` and the component has a `value`, a clear button is displayed. */
  @property({ reflect: true }) clearable = false;

  /**
   * When `true`, prevents interaction and decreases the component's opacity.
   *
   * @see [MDN - disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @property({ reflect: true }) disabled = false;

  /**
   * When `true`, the component displays its inline editing mode.
   *
   * @private
   */
  @property({ reflect: true }) editingEnabled = false;

  /** When `true`, enables the component's built-in inline editing behavior. */
  @property({ reflect: true }) inlineEditing = false;

  /** When `true` and `editingEnabled` is `true`, displays the component's built-in inline editing save and cancel controls. */
  @property({ reflect: true }) inlineEditingControls = false;

  /** Specifies a callback to be executed when saving inline editing changes */
  @property() inlineEditingAfterConfirm!: () => Promise<void>;

  /**
   * Specifies the `id` of the component's associated form.
   *
   * When not set, the component is associated with its ancestor form element, if one exists.
   */
  @property({ reflect: true }) form?: string;

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @property({ reflect: true, converter: stringOrBoolean, type: String }) icon?: IconName | boolean;

  /** When `true` and the element direction is right-to-left (`"rtl"`), flips the component`s `icon`. */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies an accessible label for the component's button or hyperlink. */
  @property() label?: string;

  /** Specifies the component's label text. */
  @property() labelText?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * When the component resides in a form,
   * specifies the maximum length of text for the component's value.
   *
   * @see [MDN - maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
   */
  @property({ reflect: true }) maxLength?: number;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When the component resides in a form,
   * specifies the minimum length of text for the component's value.
   *
   * @see [MDN - minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   */
  @property({ reflect: true }) minLength?: number;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @see [MDN - name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @property({ reflect: true }) name?: string;

  /**
   * When the component resides in a form,
   * specifies a regular expression (regex) pattern the component's `value` must match for validation.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @see [MDN - step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @property() pattern?: string;

  /**
   * Specifies the component's placeholder text.
   *
   * @see [MDN - placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @property() placeholder?: string;

  /** Specifies text to display at the start of the component. */
  @property() prefixText?: string;

  /**
   * When `true`, the component's `value` can be read, but cannot be modified.
   *
   * @see [MDN - readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /**
   * When `true` and the component resides in a form,
   * the component must have a `value` in order for the form to submit.
   */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the input field's status, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Specifies text to display at the end of the component. */
  @property() suffixText?: string;

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean, type: String }) validationIcon?:
    | IconName
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage?: string;

  /**
   * The component's current validation state.
   *
   * @readonly
   * @see [MDN - ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property({ readOnly: true }) validity!: ValidityState;

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
    this.childRef.value?.select();
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.childRef.value, options);
  }

  //#endregion

  //#region Events

  /** Fires each time a new `value` is typed and committed. */
  calciteInputTextChange = createEvent();

  /** Fires each time a new `value` is typed. */
  calciteInputTextInput = createEvent();

  /** @private */
  calciteInternalInputTextBlur = createEvent<{ element: HTMLInputElement; value: string }>();

  /** @private */
  calciteInternalInputTextFocus = createEvent<{
    element: HTMLInputElement;
    value: string;
  }>();

  /** Fires when built-in inline editing is cancelled. */
  calciteInputTextInlineEditingCancel = createEvent({ cancelable: false });

  /** Fires when built-in inline editing is confirmed. */
  calciteInputTextInlineEditingConfirm = createEvent({ cancelable: false });

  /** Fires when built-in inline editing is enabled. */
  calciteInputTextInlineEditingEnableEditingChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0
    this.inlineEditableEl = this.el.closest("calcite-inline-editable") ?? undefined;
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }

    connectLabel(this);
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

  override disconnectedCallback(): void {
    disconnectLabel(this);
  }

  //#endregion

  //#region Private Methods

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

    if (this.selfManagedInlineEditing && this.editingEnabled && event.key === "Escape") {
      event.preventDefault();

      if (this.clearable && this.value?.length > 0) {
        this.clearInputTextValue(event);
        return;
      }

      this.useInlineEditing.cancelEditing();
      requestAnimationFrame(() => {
        this.enableInlineEditingButtonRef.value?.setFocus();
      });
      return;
    }

    if (
      this.isClearable &&
      event.key === "Escape" &&
      (!this.hasInlineEditingContext || this.inlineEditingEnabledInContext)
    ) {
      this.clearInputTextValue(event);
      event.preventDefault();
    }
    if (event.key === "Enter" && this.formSupport.active) {
      this.formSupport.requestSubmit();
      event.preventDefault();
    }
  }

  onLabelClick(): void {
    if (this.selfManagedInlineEditing && !this.editingEnabled) {
      this.useInlineEditing.enable();
      return;
    }

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
      element: this.childRef.value!,
      value: this.value,
    });

    this.emitChangeIfUserModified();
  }

  private clickHandler(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    const composedPath = event.composedPath();
    const clickedInlineEditingControls = composedPath.some(
      (element) =>
        element instanceof HTMLElement &&
        element.classList.contains(InlineEditingControlsCSS.container),
    );

    if (
      !composedPath.includes(this.inputWrapperRef.value!) ||
      composedPath.includes(this.actionWrapperRef.value!) ||
      clickedInlineEditingControls
    ) {
      return;
    }

    if (this.selfManagedInlineEditing && !this.editingEnabled) {
      event.preventDefault();
      this.useInlineEditing.enable();
      return;
    }

    this.setFocus();
  }

  private inputTextFocusHandler(): void {
    this.calciteInternalInputTextFocus.emit({
      element: this.childRef.value!,
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

  private setInputValue(newInputValue: string): void {
    if (!this.childRef.value) {
      return;
    }
    this.childRef.value.value = newInputValue;
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
    const dir = this.direction;
    const loader = (
      <div class={CSS.loader}>
        <calcite-progress label={this.messages.loading} type="indeterminate" />
      </div>
    );

    const clearButton = (
      <div
        class={CSS.clearButton}
        onClick={this.disabled || this.readOnly ? undefined : this.clearInputTextValue}
      >
        <ClearButton
          ariaLabel={this.messages.clear}
          disabled={this.disabled || this.readOnly}
          scale={this.scale}
          title={this.messages.clear}
        />
      </div>
    );

    const iconEl = (
      <div class={CSS.inputIcon}>
        <calcite-icon
          flipRtl={this.iconFlipRtl}
          icon={this.requestedIcon}
          scale={getIconScale(this.scale)}
        />
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
        class={{
          [CSS.editingEnabled]: this.inlineEditingEnabledInContext,
          [CSS.inlineChild]: this.hasInlineEditingContext,
          [CSS.inlineEditableChild]: !!this.inlineEditableEl, // `calcite-inline-editable` deprecated in v5.1.0, removal target v7.0.0
        }}
        defaultValue={this.defaultValue}
        disabled={this.disabled}
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
        ref={this.childRef}
        required={this.required}
        spellcheck={this.el.spellcheck}
        tabIndex={
          this.disabled || (this.hasInlineEditingContext && !this.inlineEditingEnabledInContext)
            ? -1
            : undefined
        }
        type="text"
        value={this.value}
      />
    );

    return (
      <this.interactiveContainer disabled={this.disabled}>
        {this.labelText && (
          <InternalLabel
            labelText={this.labelText}
            onClick={this.onLabelClick}
            required={this.required}
            tooltipText={this.messages.required}
          />
        )}
        <div
          class={{
            [CSS.inputWrapper]: true,
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.clearable]: this.isClearable,
            [CSS.hasSuffix]: this.suffixText,
            [CSS.hasPrefix]: this.prefixText,
          }}
          ref={this.inputWrapperRef}
        >
          <div class={CSS.wrapper}>
            {this.loading ? loader : null}
            {this.prefixText ? prefixText : null}
            {this.requestedIcon ? iconEl : null}
            {childEl}
            {this.isClearable ? clearButton : null}
            {this.suffixText ? suffixText : null}
          </div>
          {this.selfManagedInlineEditing && (
            <div class={CSS.inlineEditing}>
              <InlineEditingControls
                cancelEditingLabel={this.messages.cancelInlineEditing}
                confirmChangesLabel={this.messages.confirmInlineEditingChanges}
                editingEnabled={this.editingEnabled}
                enableEditingButtonRef={this.enableInlineEditingButtonRef}
                enableEditingLabel={this.messages.enableInlineEditing}
                loading={this.inlineEditingLoading}
                onCancelEditing={() => this.useInlineEditing.cancelEditing()}
                onConfirmChanges={() =>
                  this.useInlineEditing.confirm(this.inlineEditingAfterConfirm, (loading) => {
                    this.inlineEditingLoading = loading;
                  })
                }
                onEnableEditing={() => this.useInlineEditing.enable()}
                scale={this.scale}
                showControls={this.editingEnabled && this.inlineEditingControls}
              />
            </div>
          )}
          <div class={CSS.actionWrapper} ref={this.actionWrapperRef}>
            <slot name={SLOTS.action} />
          </div>
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
      </this.interactiveContainer>
    );
  }

  //#endregion
}
