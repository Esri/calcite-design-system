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
import { Scale } from "../../interfaces/common";

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
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** True if the radio button is initially checked, defaults to false */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Is the radio button disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Is the radio button focused */
  @Prop({ reflect: true }) focused: boolean = false;

  /** The name of the radio button, required and must be unique to other radio button group instances.  Name is passed down from the radio button group */
  @Prop({ reflect: true }) name: string;

  /** specify if this radio button is required, defaults to false */
  @Prop({ reflect: true }) required: boolean = false;

  /** specify the scale of the radio button, defaults to m, passed down from radio button group */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** specify the theme of the radio button, defaults to light, passed down from radio button group */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** The value of the radio button, required */
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

  /** Fired when a radio button is clicked */
  @Event() calciteRadioButtonClick: EventEmitter;

  /** Fired when a radio button is focused */
  @Event() calciteRadioButtonFocus: EventEmitter;

  /** Fired when a radio button is blurred */
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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }

  componentWillLoad() {
    this.renderHiddenRadioInput();
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
    this.input.type = "radio";
    this.input.required = this.required;
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
        <label htmlFor={this.guid}>
          <slot>{this.value}</slot>
        </label>
      </Host>
    );
  }
}
