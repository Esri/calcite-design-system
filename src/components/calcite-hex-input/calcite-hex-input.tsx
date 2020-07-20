import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import {
  hexChar,
  hexToRGB,
  isLonghandHex,
  isValidHex,
  normalizeHex,
  rgbToHex
} from "../calcite-color-picker/utils";
import Color from "color";
import { CSS } from "./resources";
import { Theme } from "../../interfaces/common";
import { IconScale } from "../../interfaces/Icon";
import { RGB } from "../../interfaces/ColorPicker";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-hex-input",
  styleUrl: "calcite-hex-input.scss",
  shadow: true
})
export class CalciteHexInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteHexInputElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    const normalized = normalizeHex(this.value);

    if (isValidHex(normalized)) {
      this.internalColor = Color(normalized);
      this.value = normalized;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The component's scale.
   * @private
   * @todo use Scale once this uses calcite-input
   */
  @Prop({
    reflect: true
  })
  scale: IconScale = "m";

  /**
   * The component's theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  /**
   * The hex value.
   */
  @Prop({
    mutable: true,
    reflect: true
  })
  value: string = normalizeHex(DEFAULT_COLOR.hex());

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    const normalized = normalizeHex(value);

    if (isValidHex(normalized)) {
      const changed = normalized !== normalizeHex(this.internalColor.hex());
      this.internalColor = Color(normalized);
      this.value = normalized;
      if (changed) {
        this.calciteHexInputChange.emit();
      }
      return;
    }

    this.value = oldValue;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the hex value changes.
   */
  @Event() calciteHexInputChange: EventEmitter;

  private onInputBlur = (event: FocusEvent): void => {
    const node = event.currentTarget as HTMLInputElement;
    const hex = `#${node.value}`;

    if (isValidHex(hex) && isLonghandHex(hex)) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value = this.formatForInternalInput(rgbToHex((this.internalColor.object() as any) as RGB));
  };

  private onInputChange = (event): void => {
    const node = event.currentTarget as HTMLInputElement;
    const hex = node.value;

    const color = hexToRGB(`#${hex}`);

    if (!color) {
      return;
    }

    this.value = normalizeHex(hex);
    this.calciteHexInputChange.emit();
  };

  private onInputKeyDown(event: KeyboardEvent): void {
    const { key, altKey, ctrlKey, metaKey } = event;

    const withModifiers = altKey || ctrlKey || metaKey;

    if (key.length === 1 && !withModifiers && !hexChar.test(key)) {
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private inputNode: HTMLInputElement;

  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  @State() internalColor: Color = DEFAULT_COLOR;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const hexInputValue = this.formatForInternalInput(this.value);

    return (
      <div class={CSS.container}>
        <input
          ref={(node) => (this.inputNode = node)}
          class={CSS.input}
          value={hexInputValue}
          maxLength={6}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onKeyDown={this.onInputKeyDown}
        />
        <calcite-icon
          class={CSS.preview}
          scale={this.scale}
          icon="circle-f"
          style={{ color: `#${hexInputValue}` }}
        />
        <span class={CSS.hash}>#</span>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Focuses the input. */
  @Method()
  async setFocus(): Promise<void> {
    this.inputNode?.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private formatForInternalInput(hex: string): string {
    return hex.replace("#", "");
  }
}
