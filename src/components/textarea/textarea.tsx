import {
  Component,
  h,
  Prop,
  Element,
  Fragment,
  Event,
  EventEmitter,
  VNode,
  Watch
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent } from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { getSlotted } from "../../utils/dom";

import { CSS, SLOTS } from "./resources";
@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.css",
  shadow: true
})
export class Textarea implements FormComponent, LabelableComponent {
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
  @Prop() autofocus: boolean;

  /** When `true`, disables the component. */
  @Prop() disabled: boolean;

  /** Specifies the placeholder text for the input. */
  @Prop() placeholder: string;

  /** Whne `true`, the component's value can be read, but cannot be modified.  */
  @Prop() readonly: boolean;

  /** Specifies number or rows allowed. */
  @Prop() rows: number;

  /** Specifies number or columns allowed. */
  @Prop() cols: number;

  /** Specifies maximum number of characters allowed. */
  @Prop() maxlength: number;

  /** Specifies minimum number of characters allowed. */
  @Prop() minlength: number;

  /** Specifies name of the form the component is associated with. */
  @Prop() name: string;

  /** Specifies the size of `textarea` component. */
  @Prop() size: "l" | "m" | "s";

  /** Specifies wrapping mechanism for the text.  */
  @Prop() wrap: "soft" | " hard";

  // @Prop() autocomplete: boolean;

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /** When `true` , footer will be added to the component. */
  @Prop() footer = false;

  /** When `true`, disables the resizing handle. */
  @Prop() resizeDisabled: boolean;

  /** When `true`, marks this component as required in form. */
  @Prop() required: boolean;

  /** The id of the form `textarea` is associated with. */
  @Prop() form: string;

  /** The label of the component */
  @Prop() label: string;

  @Watch("disabled")
  disabledHandler(value: boolean): void {
    if (value) {
      this.disableSlottedElements();
    }
  }

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
      this.disableSlottedElements();
    }
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  render(): VNode {
    return (
      <Fragment>
        <textarea
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            [CSS.resizeDisabled]: this.resizeDisabled
          }}
          cols={this.cols}
          disabled={this.disabled}
          form={this.form}
          minlength={this.minlength}
          name={this.name}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onKeyDown={this.keyDownHandler}
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
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  formEl: HTMLFormElement;

  defaultValue: Textarea["value"];

  labelEl: HTMLCalciteLabelElement;

  textareaEl: HTMLTextAreaElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onFormReset(): void {
    this.value = this.defaultValue;
  }

  onLabelClick(): void {
    this.textareaEl.focus();
  }

  handleInput = (event: InputEvent): void => {
    this.value = event.target["value"];
    this.calciteTextareaInput.emit();
  };

  handleChange = (): void => {
    this.calciteTextareaChange.emit();
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    console.log(event.key);
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
        {this.value?.length ?? 0}/ {this.maxlength}
      </span>
    ) : null;
  }

  private disableSlottedElements(): void {
    console.log("disable slotted elements");
    const slottedEl = getSlotted(this.el, [SLOTS.footerLeading, SLOTS.footerTrailing], {
      all: true
    });
    slottedEl.forEach((el) => (el["disabled"] = true));
  }
}
