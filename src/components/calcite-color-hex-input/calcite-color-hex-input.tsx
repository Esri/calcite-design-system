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
} from "../calcite-color/utils";
import Color from "color";
import { CSS } from "./resources";
import { Scale, Theme } from "../../interfaces/common";
import { RGB } from "../../interfaces/Color";
import { focusElement, getElementDir } from "../../utils/dom";
import { TEXT } from "../calcite-color/resources";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-color-hex-input",
  styleUrl: "calcite-color-hex-input.scss",
  shadow: true
})
export class CalciteColorHexInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorHexInputElement;

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
   * Label used for the hex input.
   */
  @Prop() intlHex = TEXT.hex;

  /**
   * The component's scale.
   */
  @Prop({ reflect: true }) scale: Exclude<Scale, "xs" | "xl"> = "m";

  /**
   * The component's theme.
   */
  @Prop({ reflect: true }) theme: Theme = "light";

  /**
   * The hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = normalizeHex(DEFAULT_COLOR.hex());

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    const normalized = normalizeHex(value);

    if (isValidHex(normalized)) {
      const changed = normalized !== normalizeHex(this.internalColor.hex());
      this.internalColor = Color(normalized);
      this.value = normalized;
      if (changed) {
        this.calciteColorHexInputChange.emit();
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
  @Event() calciteColorHexInputChange: EventEmitter;

  private onCalciteInputBlur = (event: Event): void => {
    const node = event.currentTarget as HTMLCalciteInputElement;
    const hex = `#${node.value}`;

    if (isValidHex(hex) && isLonghandHex(hex)) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value = this.formatForInternalInput(rgbToHex((this.internalColor.object() as any) as RGB));
  };

  private onInputChange = (event: Event): void => {
    const node = event.currentTarget as HTMLCalciteInputElement;
    const hex = node.value;

    const color = hexToRGB(`#${hex}`);

    if (!color) {
      return;
    }

    this.value = normalizeHex(hex);
    this.calciteColorHexInputChange.emit();
  };

  private onInputKeyDown = (event: KeyboardEvent): void => {
    const { inputNode } = this;
    const { key, altKey, ctrlKey, metaKey } = event;

    const withModifiers = altKey || ctrlKey || metaKey;
    const exceededHexLength = inputNode.value.length >= 6;
    const hasTextSelection = getSelection().type === "Range";

    if (
      key.length === 1 &&
      !withModifiers &&
      !hasTextSelection &&
      (!hexChar.test(key) || exceededHexLength)
    ) {
      event.preventDefault();
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private inputNode: HTMLCalciteInputElement;

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
    const { el, intlHex, value } = this;
    const hexInputValue = this.formatForInternalInput(value);
    const elementDir = getElementDir(el);

    return (
      <div class={CSS.container}>
        <calcite-input
          aria-label={intlHex}
          class={CSS.input}
          dir={elementDir}
          onCalciteInputBlur={this.onCalciteInputBlur}
          onChange={this.onInputChange}
          onKeyDown={this.onInputKeyDown}
          prefixText="#"
          ref={(node) => (this.inputNode = node)}
          scale="s"
          value={hexInputValue}
        />
        <calcite-color-swatch active class={CSS.preview} color={`#${hexInputValue}`} scale="s" />
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.inputNode);
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
