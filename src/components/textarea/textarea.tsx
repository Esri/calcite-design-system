import { Component, Host, h, Prop, Element } from "@stencil/core";
import { FormComponent } from "../../utils/form";
// import { FormComponent } from "../../utils/form";
import { CSS } from "./resources";
@Component({
  tag: "calcite-textarea",
  styleUrl: "textarea.css",
  shadow: true
})
export class Textarea {
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

  @Prop() defaultValue: string;

  render() {
    const footerCount = (
      <span class={CSS.characterLimit}>
        {this.value?.length ?? 0}/ {this.maxlength}
      </span>
    );
    return (
      <Host>
        <textarea
          autofocus={this.autofocus}
          // autocomplete={this.autocomplete}
          class="textarea"
          cols={this.cols}
          disabled={this.disabled}
          maxlength={this.maxlength}
          minlength={this.minlength}
          name={this.name}
          placeholder={this.placeholder}
          readonly={this.readonly}
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
      </Host>
    );
  }
}
