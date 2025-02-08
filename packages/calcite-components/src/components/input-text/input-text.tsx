import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { getElementDir, setRequestedIcon, toAriaBoolean } from "../../utils/dom";
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
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { CSS_UTILITY } from "../../utils/resources";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { SetValueOrigin } from "../input/interfaces";
import { Alignment, Scale, Status } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { Validation } from "../functional/Validation";
import { syncHiddenFormInput, TextualInputComponent } from "../input/common/input";
import { IconNameOrString } from "../icon/interfaces";
import { CSS, IDS, SLOTS } from "./resources";
import { InputTextMessages } from "./assets/input-text/t9n";

/**
 * @slot action - A slot for positioning a button next to the component.
 */
@Component({
  tag: "calcite-input-text",
  styleUrl: "input-text.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class InputText
  implements
    LabelableComponent,
    FormComponent,
    InteractiveComponent,
    LoadableComponent,
    LocalizedComponent,
    TextualInputComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Global attributes
  //
  //--------------------------------------------------------------------------

  @Watch("autofocus")
  @Watch("enterkeyhint")
  @Watch("inputmode")
  handleGlobalAttributesChanged(): void {
    forceUpdate(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the text alignment of the component's value. */
  @Prop({ reflect: true }) alignment: Extract<"start" | "end", Alignment> = "start";

  /**
   * Adds global prop, missing from Stencil's `HTMLElement` type, see https://github.com/ionic-team/stencil/issues/5726
   *
   * @ignore
   */
  // eslint-disable-next-line @stencil-community/reserved-member-names
  @Prop() autofocus: boolean;

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

  /**
   * Adds support for kebab-cased attribute, removed in https://github.com/Esri/calcite-design-system/pull/9123
   *
   * @futureBreaking kebab-cased attribute will not be supported in a future release
   * @internal
   */
  // eslint-disable-next-line @stencil-community/reserved-member-names
  @Prop() enterKeyHint: string;

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @Prop({ reflect: true }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Adds support for kebab-cased attribute, removed in https://github.com/Esri/calcite-design-system/pull/9123
   *
   * @futureBreaking kebab-cased attribute will not be supported in a future release
   * @internal
   */
  // eslint-disable-next-line @stencil-community/reserved-member-names
  @Prop() inputMode: string;

  /** Accessible name for the component's button or hyperlink. */
  @Prop() label: string;

  /** When `true`, the component is in the loading state and `calcite-progress` is displayed. */
  @Prop({ reflect: true }) loading = false;

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
  @Prop({ reflect: true }) validationIcon: IconNameOrString | boolean;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated in form util when syncing hidden input
  @Prop({ mutable: true }) validity: MutableValidityState = {
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

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @Prop({ reflect: true }) name: string;

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
  @Prop({ mutable: true }) messages: InputTextMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<InputTextMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("value")
  valueWatcher(newValue: string, previousValue: string): void {
    if (!this.userChangedValue) {
      this.setValue({
        origin: "direct",
        previousValue,
        value: !newValue ? "" : newValue,
      });
    }
    this.userChangedValue = false;
  }

  @Watch("icon")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon({}, this.icon, "text");
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Properties
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteInputTextElement;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: InputText["value"];

  inlineEditableEl: HTMLCalciteInlineEditableElement;

  private inputWrapperEl: HTMLDivElement;

  private actionWrapperEl: HTMLDivElement;

  /** keep track of the rendered child */
  private childEl?: HTMLInputElement;

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  private previousEmittedValue: string;

  private previousValue: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: IconNameOrString;

  private userChangedValue = false;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: InputTextMessages;

  @State() slottedActionElDisabledInternally = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);

    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }

    connectLabel(this);
    connectForm(this);
    this.el.addEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.el.removeEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.requestedIcon = setRequestedIcon({}, this.icon, "text");
    await setUpMessages(this);

    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
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
  @Event() calciteInternalInputTextFocus: EventEmitter<{
    element: HTMLInputElement;
    value: string;
  }>;

  /**
   * @internal
   */
  @Event() calciteInternalInputTextBlur: EventEmitter<{ element: HTMLInputElement; value: string }>;

  /**
   * Fires each time a new value is typed.
   */
  @Event({ cancelable: true }) calciteInputTextInput: EventEmitter<void>;

  /**
   * Fires each time a new value is typed and committed.
   */
  @Event() calciteInputTextChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.childEl?.focus();
  }

  /** Selects the text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    this.childEl?.select();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyDownHandler = (event: KeyboardEvent): void => {
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
  };

  onLabelClick(): void {
    this.setFocus();
  }

  private clearInputTextValue = (nativeEvent: KeyboardEvent | MouseEvent): void => {
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: "",
    });
  };

  private emitChangeIfUserModified = (): void => {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputTextChange.emit();
      this.setPreviousEmittedValue(this.value);
    }
  };

  private inputTextBlurHandler = () => {
    this.calciteInternalInputTextBlur.emit({
      element: this.childEl,
      value: this.value,
    });

    this.emitChangeIfUserModified();
  };

  private clickHandler = (event: MouseEvent): void => {
    if (this.disabled) {
      return;
    }

    const composedPath = event.composedPath();

    if (
      !composedPath.includes(this.inputWrapperEl) ||
      composedPath.includes(this.actionWrapperEl)
    ) {
      return;
    }

    this.setFocus();
  };

  private inputTextFocusHandler = (): void => {
    this.calciteInternalInputTextFocus.emit({
      element: this.childEl,
      value: this.value,
    });
  };

  private inputTextInputHandler = (nativeEvent: InputEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.setValue({
      nativeEvent,
      origin: "user",
      value: (nativeEvent.target as HTMLInputElement).value,
    });
  };

  private inputTextKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "Enter") {
      this.emitChangeIfUserModified();
    }
  };

  syncHiddenFormInput(input: HTMLInputElement): void {
    syncHiddenFormInput("text", this, input);
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

  private setChildElRef = (el) => {
    this.childEl = el;
  };

  private setInputValue = (newInputValue: string): void => {
    if (!this.childEl) {
      return;
    }
    this.childEl.value = newInputValue;
  };

  private setPreviousEmittedValue = (value: string): void => {
    this.previousEmittedValue = value;
  };

  private setPreviousValue = (value: string): void => {
    this.previousValue = value;
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
  };

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
        aria-invalid={toAriaBoolean(this.status === "invalid")}
        aria-label={getLabelText(this)}
        autocomplete={this.autocomplete}
        autofocus={this.el.autofocus ? true : null}
        class={{
          [CSS.editingEnabled]: this.editingEnabled,
          [CSS.inlineChild]: !!this.inlineEditableEl,
        }}
        defaultValue={this.defaultValue}
        disabled={this.disabled ? true : null}
        enterKeyHint={this.el.enterKeyHint || this.el.getAttribute("enterkeyhint")}
        inputMode={this.el.inputMode || this.el.getAttribute("inputmode")}
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
        tabIndex={this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null}
        type="text"
        value={this.value}
      />
    );

    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <InteractiveContainer disabled={this.disabled}>
          <div
            class={{ [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
            ref={(el) => (this.inputWrapperEl = el)}
          >
            {this.prefixText ? prefixText : null}
            <div class={CSS.wrapper}>
              {childEl}
              {this.isClearable ? inputClearButton : null}
              {this.requestedIcon ? iconEl : null}
              {this.loading ? loader : null}
            </div>
            <div class={CSS.actionWrapper} ref={(el) => (this.actionWrapperEl = el)}>
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
      </Host>
    );
  }
}
