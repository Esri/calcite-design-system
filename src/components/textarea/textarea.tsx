import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  VNode,
  Watch,
  Method,
  Host,
  State
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { CSS, SLOTS, RESIZE_TIMEOUT } from "./resources";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { TextareaMessages } from "./assets/textarea/t9n";
import { throttle } from "lodash-es";

/**
 * @slot - A slot for adding text.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Textarea
  implements FormComponent, LabelableComponent, LocalizedComponent, LoadableComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteTextareaElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, focuses the `textarea` element on page render. */
  @Prop({ reflect: true }) autofocus = false;

  /** When `true`, disables the component. */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies the placeholder text for the input. */
  @Prop() placeholder: string;

  /** Whne `true`, the component's value can be read, but cannot be modified.  */
  @Prop({ reflect: true }) readonly = false;

  /** Specifies number or rows allowed. */
  @Prop({ reflect: true }) rows: number;

  /** Specifies number or columns allowed. */
  @Prop({ reflect: true }) cols: number;

  /** Specifies maximum number of characters allowed. */
  @Prop() maxlength: number;

  /** Specifies name of the component  */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of `textarea` component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies wrapping mechanism for the text.  */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /** When `true`, disables the resizing handle. */
  @Prop({ reflect: true }) resizeDisabled = false;

  /** When `true`, disables resizing textarea horizantally. */
  @Prop({ reflect: true }) horizantalResizeDisabled = false;

  /** When `true`, disables resizing textarea vertically. */
  @Prop({ reflect: true }) verticalResizeDisabled = false;

  /** When `true`, marks this component as required in form. */
  @Prop({ reflect: true }) required = false;

  /** The label of the component */
  @Prop() label: string;

  /** When true, the `textarea` will be marked as invalid. */
  @Prop({ reflect: true }) invalid = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: TextareaMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<TextareaMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  @Watch("disabled")
  disabledHandler(value: boolean): void {
    this.disablePointerEvents(value, this.leadingSlotElements);
    this.disablePointerEvents(value, this.trailingSlotElements);
  }

  //--------------------------------------------------------------------------
  //
  //  Event Emitters
  //
  //--------------------------------------------------------------------------
  /**
   * Fires each time a new `value` is typed.
   */
  @Event({ cancelable: true }) calciteTextareaInput: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed and committed.
   */
  @Event({ cancelable: true }) calciteTextareaChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    const hasFooter =
      !!this.leadingSlotElements?.length || !!this.trailingSlotElements?.length || !!this.maxlength;
    return (
      <Host>
        <textarea
          aria-disabled={this.disabled}
          aria-invalid={this.invalid}
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            [CSS.resizeDisabled]: this.resizeDisabled,
            [CSS.resizeDisabledX]: this.horizantalResizeDisabled,
            [CSS.resizeDisabledY]: this.verticalResizeDisabled,
            [CSS.readonly]: this.readonly,
            [CSS.textareaInvalid]: this.invalid,
            [CSS.footerSlotted]:
              !!this.trailingSlotElements?.length && !!this.leadingSlotElements?.length,
            [CSS.borderColor]: !hasFooter,
            [CSS.blocksizeFull]: !hasFooter
          }}
          cols={this.cols}
          disabled={this.disabled}
          name={this.name}
          onChange={this.handleChange}
          onInput={this.handleInput}
          placeholder={this.placeholder}
          readonly={this.readonly}
          ref={this.setTextareaEl}
          required={this.required}
          rows={this.rows}
          value={this.value}
          wrap={this.wrap}
        />
        <span class="content">
          <slot onSlotchange={this.contentSlotChangeHandler} />
        </span>
        {
          <footer
            class={{
              [CSS.footer]: true,
              [CSS.readonly]: this.readonly,
              [CSS.hide]: !hasFooter
            }}
            key={CSS.footer}
            ref={(el) => (this.footerEl = el as HTMLElement)}
          >
            <slot name={SLOTS.footerLeading} onSlotchange={this.footerTrailingSlotChangeHandler} />
            {this.renderCharacterLimit()}
            <slot name={SLOTS.footerTrailing} onSlotchange={this.footerLeadingSlotChangeHandler} />
          </footer>
        }
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Set's focus on the `textarea`. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.textareaEl.focus();
  }

  /** Selects all text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    this.textareaEl.select();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  formEl: HTMLFormElement;

  defaultValue: Textarea["value"];

  labelEl: HTMLCalciteLabelElement;

  textareaEl: HTMLTextAreaElement;

  footerEl: HTMLElement;

  @State() effectiveLocale = "";

  @State() trailingSlotElements: Element[];

  @State() leadingSlotElements: Element[];

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: TextareaMessages;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onFormReset(): void {
    this.value = this.defaultValue;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  handleInput = (event: InputEvent): void => {
    this.value = event.target["value"];
    this.calciteTextareaInput.emit();
  };

  handleChange = (): void => {
    this.calciteTextareaChange.emit();
  };

  footerTrailingSlotChangeHandler = (event: Event): void => {
    this.trailingSlotElements = slotChangeGetAssignedElements(event);
    if (this.disabled) {
      this.disablePointerEvents(this.disabled, this.trailingSlotElements);
    }
  };

  footerLeadingSlotChangeHandler = (event: Event): void => {
    this.leadingSlotElements = slotChangeGetAssignedElements(event);
    if (this.disabled) {
      this.disablePointerEvents(this.disabled, this.leadingSlotElements);
    }
  };

  contentSlotChangeHandler = (): void => {
    if (!this.value) {
      this.value = this.el.textContent.trim();
    }
  };

  renderCharacterLimit = (): VNode => {
    return this.maxlength ? (
      <span class={CSS.characterLimit}>
        <span class={{ [CSS.characterOverlimit]: this.value?.length > this.maxlength }}>
          {this.getLocalizedCharacterLength()}
        </span>
        {"/"}
        {numberStringFormatter.localize(this.maxlength.toString())}
      </span>
    ) : null;
  };

  getLocalizedCharacterLength(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem
    };
    return numberStringFormatter.localize(this.value?.length.toString());
  }

  disablePointerEvents(disabled: boolean, slottedElements: Element[]): void {
    if (!!slottedElements?.length) {
      slottedElements.forEach((el: HTMLElement) => {
        el.style.pointerEvents = disabled ? "none" : "auto";
      });
    }
  }

  resizeObserver = createObserver("resize", () => {
    const { width: textareaWidth, height: textareaHeight } =
      this.textareaEl.getBoundingClientRect();
    const { width: elWidth, height: elHeight } = this.el.getBoundingClientRect();
    const footerHeight = this.footerEl?.getBoundingClientRect().height;

    if (this.footerEl) {
      this.footerEl.style.width = `${textareaWidth}px`;
    }

    if (
      (!!textareaWidth || !!textareaHeight) &&
      (elWidth !== textareaWidth || elHeight !== textareaHeight + (footerHeight || 0))
    ) {
      this.setHeightAndWidthToAuto();
    }
  });

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.value?.length > this.maxlength) {
      input.setCustomValidity(this.messages.overLimit);
    }
    if (this.invalid) {
      input.setCustomValidity(this.messages.invalid);
    }
  }

  setHeightAndWidthToAuto = throttle(
    (): void => {
      this.verticalResizeDisabled || (this.el.style.height = "auto");
      this.horizantalResizeDisabled || (this.el.style.width = "auto");
    },
    RESIZE_TIMEOUT,
    { leading: false, trailing: true }
  );

  setTextareaEl = (el: HTMLTextAreaElement): void => {
    this.textareaEl = el;
    this.resizeObserver.observe(el);
  };
}
