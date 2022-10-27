import { Component, Host, h, Prop, Element, Fragment } from "@stencil/core";
import { connectForm, disconnectForm, FormComponent } from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
// import { FormComponent } from "../../utils/form";
import { CSS } from "./resources";
@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.css",
  shadow: true
})
export class Textarea implements FormComponent, LabelableComponent {
  @Element() el: HTMLCalciteTextareaElement;

  @Prop() autofocus: boolean;

  @Prop() disabled: boolean;

  @Prop() placeholder: string;

  @Prop() readonly: boolean;

  @Prop() rows: number;

  @Prop() cols: number;

  @Prop() maxlength: number;

  @Prop() minlength: number;

  @Prop() name: string;

  @Prop() size: "l" | "m" | "s";

  // @Prop() dir: "rtl" | "ltr";

  @Prop() wrap: "soft" | " hard";

  @Prop() autocomplete: boolean;

  @Prop() value: string;

  @Prop() footer = false;

  @Prop() disableResize: boolean;

  @Prop() required: boolean;

  @Prop() form: string;

  @Prop() label: string;

  formEl: HTMLFormElement;

  defaultValue: Textarea["value"];

  labelEl: HTMLCalciteLabelElement;

  textareaEl: HTMLTextAreaElement;

  onFormReset(): void {
    this.value = this.defaultValue;
  }

  onLabelClick(): void {
    this.textareaEl.focus();
  }

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
  }

  render() {
    const footerCount = (
      <span class={CSS.characterLimit}>
        {this.value?.length ?? 0}/ {this.maxlength}
      </span>
    );
    return (
      <Fragment>
        <textarea
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            "resize-disabled": this.disableResize
          }}
          cols={this.cols}
          disabled={this.disabled}
          form={this.form}
          maxlength={this.maxlength}
          minlength={this.minlength}
          name={this.name}
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
            <slot name={CSS.footerLeading} />
            {this.maxlength && footerCount}
            <slot name={CSS.footerTrailing} />
          </footer>
        )}
      </Fragment>
    );
  }
}
