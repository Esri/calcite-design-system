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
  @Prop() name: string;
  @Prop({ reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" = "m";
  @Prop() value: string;

  private input: HTMLInputElement;

  @Event() onRadioButtonClick: EventEmitter;
  @Event() onRadioButtonFocus: EventEmitter;
  @Event() onRadioButtonBlur: EventEmitter;

  @Listen("click")
  onClick(event: MouseEvent): void {
    if (
      !this.disabled &&
      (event.currentTarget as HTMLCalciteRadioButtonElement).localName ===
        "calcite-radio-button"
    ) {
      this.onRadioButtonClick.emit();
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
    this.onRadioButtonFocus.emit();
  };

  onInputBlur = () => {
    this.onRadioButtonBlur.emit();
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
    this.input.id = `${this.name}.${this.value}`;
    this.input.name = this.name;
    this.input.onblur = this.onInputBlur;
    this.input.onfocus = this.onInputFocus;
    // this.input.style.opacity = "0";
    this.input.style.position = "absolute";
    this.input.style.zIndex = "-1";
    this.input.value = this.value;
    this.input.type = "radio";
    this.el.appendChild(this.input);
  }

  render() {
    const id = `${this.name}.${this.value}`;
    return (
      <Host role="radio" aria-checked={this.checked}>
        <div id="radio"></div>
        <label htmlFor={id}>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
