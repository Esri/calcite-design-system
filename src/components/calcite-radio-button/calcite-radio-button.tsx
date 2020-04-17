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
  @Element() el: HTMLElement;

  @Prop({ reflect: true }) checked: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) focused: boolean = false;
  @Prop({ reflect: true }) name: string;
  @Prop({ reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "m";
  @Prop() value: string;

  private input: HTMLInputElement;
  guid: string = this.el.id || `calcite-radio-button-${guid()}`;

  @Event() calciteRadioButtonClick: EventEmitter;
  @Event() calciteRadioButtonFocus: EventEmitter;
  @Event() calciteRadioButtonBlur: EventEmitter;

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

  @Watch("checked")
  onCheckedChange(newValue: boolean) {
    this.input.checked = newValue;
  }

  @Watch("focused")
  onFocusedChange(focused: boolean) {
    if (focused) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  onInputFocus = () => {
    this.calciteRadioButtonFocus.emit();
  };

  onInputBlur = () => {
    this.calciteRadioButtonBlur.emit();
  };

  componentWillLoad() {
    this.renderHiddenRadioInput();
  }

  renderHiddenRadioInput() {
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
    this.el.appendChild(this.input);
  }

  render() {
    return (
      <Host role="radio" aria-checked={this.checked}>
        <div id="radio"></div>
        <label htmlFor={this.guid}>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
