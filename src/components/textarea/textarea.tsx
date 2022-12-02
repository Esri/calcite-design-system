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
import { getSlotted, slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, ERROR_MESSAGES, SLOTS } from "./resources";
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

/**
 * @slot - A slot for adding text.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */
@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.scss",
  shadow: true
})
export class Textarea
  implements FormComponent, LabelableComponent, LocalizedComponent, LoadableComponent
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
  @Prop({ reflect: true }) autofocus: boolean;

  /** When `true`, disables the component. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Specifies the placeholder text for the input. */
  @Prop({ reflect: true }) placeholder: string;

  /** Whne `true`, the component's value can be read, but cannot be modified.  */
  @Prop({ reflect: true }) readonly: boolean;

  /** Specifies number or rows allowed. */
  @Prop({ reflect: true }) rows: number;

  /** Specifies number or columns allowed. */
  @Prop({ reflect: true }) cols: number;

  /** Specifies maximum number of characters allowed. */
  @Prop({ reflect: true }) maxlength: number;

  /** Specifies name of the component  */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of `textarea` component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies wrapping mechanism for the text.  */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /** When `true` , footer will be added to the component. */
  @Prop({ reflect: true }) footer = false;

  /** When `true`, disables the resizing handle. */
  @Prop({ reflect: true }) resizeDisabled: boolean;

  /** When `true`, disables resizing textarea horizantally. */
  @Prop({ reflect: true }) horizantalResizeDisabled: boolean;

  /** When `true`, disables resizing textarea vertically. */
  @Prop({ reflect: true }) verticalResizeDisabled: boolean;

  /** When `true`, marks this component as required in form. */
  @Prop({ reflect: true }) required: boolean;

  /** The label of the component */
  @Prop({ reflect: true }) label: string;

  /** When true, the `textarea` will be marked as invalid. */
  @Prop({ reflect: true }) invalid = false;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  @Watch("disabled")
  disabledHandler(value: boolean): void {
    if (value) {
      this.disableSlottedElements(value);
    }
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
    if (this.disabled) {
      this.disableSlottedElements(this.disabled);
    }
    connectLocalized(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    const hasFooter = this.leadingSlotHasElement || this.trailingSlotHasElement || !!this.maxlength;
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
            [CSS.footerSlotted]: this.trailingSlotHasElement && this.leadingSlotHasElement,
            [CSS.borderColor]: !hasFooter
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
        {this.footer && (
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
        )}
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

  @State() effectiveLocale: string;

  @State() trailingSlotHasElement: boolean;

  @State() leadingSlotHasElement: boolean;

  resizeObserver = createObserver("resize", () => {
    if (this.footer) {
      return this.setFooterWidth();
    }
  });

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
    this.trailingSlotHasElement = slotChangeHasAssignedElement(event);
  };

  footerLeadingSlotChangeHandler = (event: Event): void => {
    this.leadingSlotHasElement = slotChangeHasAssignedElement(event);
  };

  contentSlotChangeHandler = (): void => {
    if (!this.value) {
      const nodes = this.el.childNodes;
      nodes.forEach((el) => {
        if (el.nodeName === "#text") {
          this.value = el.nodeValue.trim();
        }
      });
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

  disableSlottedElements(disabled: boolean): void {
    const slottedEl = getSlotted(this.el, [SLOTS.footerLeading, SLOTS.footerTrailing], {
      all: true
    });
    slottedEl.forEach((el) => (el["disabled"] = disabled));
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.value?.length > this.maxlength) {
      input.setCustomValidity(ERROR_MESSAGES.overLimit);
    }
    if (this.invalid) {
      input.setCustomValidity(ERROR_MESSAGES.invalid);
    }
  }

  setFooterWidth(): void {
    const { left, right } = this.textareaEl.getBoundingClientRect();
    if (this.footerEl) {
      this.footerEl.style.width = `${right - left}px`;
    }
  }

  setTextareaEl = (el: HTMLTextAreaElement): void => {
    this.textareaEl = el;
    this.resizeObserver.observe(el);
  };
}
