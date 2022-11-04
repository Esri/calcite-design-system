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
import { getSlotted } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.scss",
  shadow: true
})
export class Textarea implements FormComponent, LabelableComponent, LocalizedComponent {
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

  /** Specifies minimum number of characters allowed. */
  @Prop({ reflect: true }) minlength: number;

  /** Specifies name of the component  */
  @Prop({ reflect: true }) name: string;

  /** Specifies the size of `textarea` component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** Specifies wrapping mechanism for the text.  */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  // @Prop() autocomplete: boolean;

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /** When `true` , footer will be added to the component. */
  @Prop({ reflect: true }) footer = false;

  /** When `true`, disables the resizing handle. */
  @Prop({ reflect: true }) resizeDisabled: boolean;

  /** When `true`, marks this component as required in form. */
  @Prop({ reflect: true }) required: boolean;

  /** The id of the form `textarea` is associated with. */
  @Prop({ reflect: true }) form: string;

  /** The label of the component */
  @Prop({ reflect: true }) label: string;

  /**
   * When `true`, the component will not be visible.
   *
   * @mdn [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
   */
  @Prop({ reflect: true }) hidden = false;

  @Watch("disabled")
  disabledHandler(value: boolean): void {
    if (value) {
      this.disableSlottedElements(value);
    }
  }

  @Prop() numberingSystem?: NumberingSystem;

  //--------------------------------------------------------------------------
  //
  //  Event Emitters
  //
  //--------------------------------------------------------------------------
  @Event({ cancelable: true }) calciteTextareaInput: EventEmitter<void>;

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

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
  }

  // componentDidrender(): void {}

  render(): VNode {
    return (
      <Host>
        <textarea
          aria-disabled={this.disabled}
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            [CSS.resizeDisabled]: this.resizeDisabled
          }}
          cols={this.cols}
          disabled={this.disabled}
          form={this.form}
          hidden={this.hidden}
          minlength={this.minlength}
          name={this.name}
          onChange={this.handleChange}
          onInput={this.handleInput}
          placeholder={this.placeholder}
          readonly={this.readonly}
          ref={(el) => (this.textareaEl = el as HTMLTextAreaElement)}
          required={this.required}
          rows={this.rows}
          value={this.value}
          wrap={this.wrap}
        />
        {this.footer && (
          <footer class={CSS.footer}>
            {this.renderFooterLeading()}
            {this.renderCharacterLimit()}
            {this.renderFooterTrailing()}
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

  @State() effectiveLocale: string;

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

  renderFooterLeading(): VNode {
    return getSlotted(this.el, SLOTS.footerLeading) ? <slot name={SLOTS.footerLeading} /> : null;
  }

  renderFooterTrailing(): VNode {
    return getSlotted(this.el, SLOTS.footerTrailing) ? <slot name={SLOTS.footerTrailing} /> : null;
  }

  renderCharacterLimit(): VNode {
    return this.maxlength ? (
      <span class={CSS.characterLimit}>
        {this.getLocalizedCharacterLength()}/
        {numberStringFormatter.localize(this.maxlength.toString())}
      </span>
    ) : null;
  }

  private getLocalizedCharacterLength(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem
    };
    return numberStringFormatter.localize(this.value?.length.toString());
  }

  private disableSlottedElements(disabled: boolean): void {
    const slottedEl = getSlotted(this.el, [SLOTS.footerLeading, SLOTS.footerTrailing], {
      all: true
    });
    slottedEl.forEach((el) => (el["disabled"] = disabled));
  }

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.value?.length > this.maxlength) {
      input.setCustomValidity("Over the character limit");
    }
    if (this.value?.length < this.minlength) {
      input.setCustomValidity("Under the character limit");
    }
  }
}
