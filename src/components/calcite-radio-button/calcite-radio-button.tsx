import {
  Component,
  Host,
  h,
  Listen,
  Prop,
  Element,
  Watch,
} from "@stencil/core";
import { guid } from "../../utils/guid";

@Component({
  tag: "calcite-radio-button",
  styleUrl: "calcite-radio-button.scss",
  shadow: true,
})
export class CalciteRadioButton {
  constructor() {
    this.check = this.check.bind(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties and Validators/Watchers
  //
  //--------------------------------------------------------------------------

  /** The checked state of the radio button. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  @Watch("checked")
  onCheckedChange(newChecked: boolean, oldChecked: boolean) {
    if (newChecked === true && oldChecked === false) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    if (newChecked !== this.input.checked) {
      this.input.checked = newChecked;
    }
  }

  /** The disabled state of the radio button. */
  @Prop({ reflect: true }) disabled?: boolean = false;
  @Watch("disabled")
  onDisabledChange(disabled: boolean) {
    this.input.disabled = disabled;
  }

  /** The focused state of the radio button. */
  @Prop({ mutable: true, reflect: true }) focused: boolean = false;
  @Watch("focused")
  onFocusedChange(focused: boolean) {
    if (focused) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true }) guid: string =
    this.el.id || `calcite-radio-button-${guid()}`;

  /** The name of the radio button.  <code>name</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
  @Prop({ reflect: true }) name!: string;

  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  @Prop({ reflect: true }) required: boolean = false;
  @Watch("required")
  onRequiredChange(required: boolean) {
    this.input.required = required;
  }

  /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";
  @Watch("scale")
  validateScale(newScale: string) {
    const scales = ["s", "m", "l"];
    if (!scales.includes(newScale)) this.scale = "m";
  }

  /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";
  @Watch("theme")
  validateTheme(newTheme: string) {
    const themes = ["light", "dark"];
    if (!themes.includes(newTheme)) this.theme = "light";
  }

  /** The value of the radio button. */
  @Prop() value!: string;

  //--------------------------------------------------------------------------
  //
  //  Private Properties & Methods
  //
  //--------------------------------------------------------------------------

  private input: HTMLInputElement;

  private checkFirstRadioButton = () => {
    const radioButtons = Array.from(
      document.querySelectorAll(`calcite-radio-button[name=${this.name}]`)
    );
    let firstCheckedRadioButton: HTMLCalciteRadioButtonElement;
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach((radioButton: HTMLCalciteRadioButtonElement) => {
        if (firstCheckedRadioButton) {
          radioButton.checked = false;
        } else if (radioButton.checked) {
          firstCheckedRadioButton = radioButton;
        }
        return radioButton;
      });
    }
  };

  private uncheckOtherRadioButtonsInGroup = () => {
    const otherRadioButtons = document.querySelectorAll(
      `calcite-radio-button[name=${this.name}]:not([guid="${this.guid}"])`
    );
    if (otherRadioButtons) {
      otherRadioButtons.forEach(
        (otherRadioButton: HTMLCalciteRadioButtonElement) => {
          if (otherRadioButton.checked) {
            otherRadioButton.checked = false;
          }
        }
      );
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  check() {
    if (!this.disabled) {
      this.uncheckOtherRadioButtonsInGroup();
      this.focused = true;
      this.checked = true;
    }
  }

  onInputBlur = () => {
    this.focused = false;
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.validateScale(this.scale);
    this.validateTheme(this.theme);
    this.renderHiddenRadioInput();
    this.checkFirstRadioButton();
  }

  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  private renderHiddenRadioInput() {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.input = this.el.ownerDocument.createElement("input");
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.id = this.guid;
    this.input.name = this.name;
    this.input.onfocus = this.check;
    this.input.onblur = this.onInputBlur;
    this.input.style.opacity = "0";
    this.input.style.position = "absolute";
    this.input.style.zIndex = "-1";
    this.input.value = this.value;
    this.input.required = this.required;
    this.input.type = "radio";
    // This renders the input as a sibling of calcite-radio-button because as it turns out
    // doing appendChild as hjorthhansen suggests doesn't really keep it out of the
    // shadow DOM as far as slot behavior goes.  This is required to render {this.value} as fallback slot content.
    this.el.insertAdjacentElement("afterend", this.input);
  }

  render() {
    return (
      <Host
        role="radio"
        aria-checked={this.checked}
        aria-disabled={this.disabled}
      >
        <div id="radio"></div>
        <calcite-label htmlFor={this.guid} scale={this.scale}>
          <slot>{this.value}</slot>
        </calcite-label>
      </Host>
    );
  }
}
