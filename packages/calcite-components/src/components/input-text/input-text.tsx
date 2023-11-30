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
import { getIconScale } from "../../utils/component";
import { getElementDir, getSlotted, setRequestedIcon } from "../../utils/dom";
import {
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot,
  submitForm,
} from "../../utils/form";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
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
import { createObserver } from "../../utils/observers";
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
import { InputTextMessages } from "./assets/input-text/t9n";
import { CSS, SLOTS } from "./resources";

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
    T9nComponent
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
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /**
   * When `true`, the component will not be visible.
   *
   * @mdn [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
   */
  @Prop({ reflect: true }) hidden = false;

  /**
   * Specifies an icon to display.
   *
   * @futureBreaking Remove boolean type as it is not supported.
   */
  @Prop({ reflect: true }) icon: string | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

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

  /** Specifies the `calcite-input-message` text to display under the component, primarily for form validation. */
  @Prop() messageText: string;

  /** Specifies the `calcite-input-message` icon to display under the component, primarily for form validation. */
  @Prop() messageIcon: string | boolean;

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

  /** keep track of the rendered child */
  private childEl?: HTMLInputElement;

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  private previousEmittedValue: string;

  private previousValue: string;

  private previousValueOrigin: SetValueOrigin = "initial";

  /** the computed icon to render */
  private requestedIcon?: string;

  mutationObserver = createObserver("mutation", () => this.setDisabledAction());

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
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);

    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);

    connectLabel(this);
    connectForm(this);
    this.mutationObserver?.observe(this.el, { childList: true });
    this.setDisabledAction();
    this.el.addEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);

    this.mutationObserver?.disconnect();
    this.el.removeEventListener("calciteInternalHiddenInputChange", this.hiddenInputChangeHandler);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    this.requestedIcon = setRequestedIcon({}, this.icon, "text");
    await setUpMessages(this);
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
    if (this.readOnly || this.disabled) {
      return;
    }
    if (this.isClearable && event.key === "Escape") {
      this.clearInputTextValue(event);
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

    const slottedActionEl = getSlotted(this.el, "action");
    if (event.target !== slottedActionEl) {
      this.setFocus();
    }
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

  onFormReset(): void {
    this.setValue({
      origin: "reset",
      value: this.defaultValue,
    });
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    if (this.minLength != null) {
      input.minLength = this.minLength;
    }

    if (this.maxLength != null) {
      input.maxLength = this.maxLength;
    }
  }

  hiddenInputChangeHandler = (event: Event): void => {
    if ((event.target as HTMLInputElement).name === this.name) {
      this.setValue({
        value: (event.target as HTMLInputElement).value,
        origin: "direct",
      });
    }
    event.stopPropagation();
  };

  private setChildElRef = (el) => {
    this.childEl = el;
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

    const messageEl = (
      <div class={CSS.messageContainer}>
        <calcite-input-message icon={this.messageIcon} scale={this.scale} status={this.status}>
          {this.messageText}
        </calcite-input-message>
      </div>
    );

    const childEl = (
      <input
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
        required={this.required ? true : null}
        tabIndex={this.disabled || (this.inlineEditableEl && !this.editingEnabled) ? -1 : null}
        type="text"
        value={this.value}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setChildElRef}
      />
    );

    return (
      <Host onClick={this.clickHandler} onKeyDown={this.keyDownHandler}>
        <div class={{ [CSS.inputWrapper]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
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
          {this.suffixText ? suffixText : null}
          <HiddenFormInputSlot component={this} />
        </div>
        {this.messageText ? messageEl : null}
      </Host>
    );
  }
}
