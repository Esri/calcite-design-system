import {
  Component,
  Host,
  h,
  Listen,
  Prop,
  Event,
  EventEmitter,
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
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties and Validators
  //
  //--------------------------------------------------------------------------

  /** The checked state of the radio button. */
  @Prop({ reflect: true }) checked: boolean = false;

  /** The disabled state of the radio button. */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** The focused state of the radio button. */
  @Prop({ reflect: true }) focused: boolean = false;

  /** The name of the radio button.  <code>name</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
  @Prop({ reflect: true }) name!: string;

  /** Requires that a value is selected for the radio button group before the parent form will submit. */
  @Prop({ reflect: true }) required: boolean = false;

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
  //  Private Properties
  //
  //--------------------------------------------------------------------------

  private input: HTMLInputElement;
  private guid: string = this.el.id || `calcite-radio-button-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when a radio button is clicked. */
  @Event() calciteRadioButtonClick: EventEmitter;

  /** Fired when a radio button is focused. */
  @Event() calciteRadioButtonFocus: EventEmitter;

  /** Fired when a radio button is blurred. */
  @Event() calciteRadioButtonBlur: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  onClick(event: MouseEvent): void {
    if (
      !this.disabled &&
      (event.currentTarget as HTMLCalciteRadioButtonElement).localName ===
      "calcite-radio-button"
    ) {
      this.calciteRadioButtonClick.emit();
    }
  }

  onInputFocus = () => {
    this.calciteRadioButtonFocus.emit();
  };

  onInputBlur = () => {
    this.calciteRadioButtonBlur.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Property Watchers
  //
  //--------------------------------------------------------------------------

  @Watch("checked")
  onCheckedChange(newValue: boolean) {
    this.input.checked = newValue;
  }

  @Watch("disabled")
  onDisabledChange(newValue: boolean) {
    this.input.disabled = newValue;
  }

  @Watch("focused")
  onFocusedChange(focused: boolean) {
    if (focused) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  @Watch("required")
  onRequiredChange(newValue: boolean) {
    this.input.required = newValue;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    this.validateScale(this.scale);
    this.validateTheme(this.theme);
    this.renderHiddenRadioInput();
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
    this.input.onblur = this.onInputBlur;
    this.input.onfocus = this.onInputFocus;
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
