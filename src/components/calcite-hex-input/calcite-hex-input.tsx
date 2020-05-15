import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import {
  hexChar,
  hexToRGB,
  isLonghandHex,
  isValidHex,
  normalizeHex,
  RGB,
  rgbToHex,
} from "../calcite-color-picker/utils";
import Color from "color";
import { CSS } from "./resources";
import { Theme } from "../../interfaces/common";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-hex-input",
  styleUrl: "calcite-hex-input.scss",
  shadow: true,
})
export class HexInput {
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
   * The component's theme.
   */
  @Prop({
    reflect: true,
  })
  theme: Theme = "light";

  /**
   * The hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = DEFAULT_COLOR.hex();

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    const normalized = normalizeHex(value);

    if (isValidHex(normalized)) {
      const changed = normalized !== this.internalColor.hex().toLowerCase();
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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  @State() internalColor: Color = DEFAULT_COLOR;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    const hexInputValue = this.formatForInternalInput(this.value);

    return (
      <div class={CSS.container}>
        <input
          class={CSS.input}
          value={hexInputValue}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          onChange={this.onHexChange}
          maxLength={6}
        />
        <calcite-icon
          class={CSS.preview}
          scale="m"
          icon="circle-f"
          style={{ color: `#${hexInputValue}` }}
        />
        <span class={CSS.hash}>#</span>
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onHexChange = (event: CustomEvent): void => {
    const node = event.currentTarget as HTMLInputElement;
    const hex = node.value;

    const color = hexToRGB(`#${hex}`);

    if (!color) {
      return;
    }

    this.value = normalizeHex(hex);
    this.calciteHexInputChange.emit();
  };

  onKeyDown = (event: KeyboardEvent): void => {
    const { key, altKey, ctrlKey, metaKey } = event;

    const withModifiers = altKey || ctrlKey || metaKey;

    if (key.length === 1 && !withModifiers && !hexChar.test(key)) {
      event.preventDefault();
    }
  };

  onBlur = (event: FocusEvent): void => {
    const node = event.currentTarget as HTMLInputElement;
    const hex = `#${node.value}`;

    if (isValidHex(hex) && isLonghandHex(hex)) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value = this.formatForInternalInput(
      rgbToHex((this.internalColor.object() as any) as RGB)
    );
  };

  formatForInternalInput(hex: string): string {
    return hex.replace("#", "");
  }
}
