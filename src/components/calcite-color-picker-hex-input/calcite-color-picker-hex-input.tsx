import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import {
  createColor,
  hexChar,
  hexify,
  hexToRGB,
  isLonghandHex,
  isValidHex,
  normalizeAlpha,
  normalizeHex,
  rgbToHex
} from "../calcite-color-picker/utils";
import Color from "color";
import { CSS } from "./resources";
import { Scale } from "../interfaces";
import { RGB } from "../calcite-color-picker/interfaces";
import { focusElement, getElementDir } from "../../utils/dom";
import { TEXT } from "../calcite-color-picker/resources";
import { getKey } from "../../utils/key";

const DEFAULT_COLOR = createColor();

@Component({
  tag: "calcite-color-picker-hex-input",
  styleUrl: "calcite-color-picker-hex-input.scss",
  shadow: true
})
export class CalciteColorPickerHexInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerHexInputElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { allowEmpty, alphaSupport, value } = this;

    if (value) {
      const normalized = normalizeHex(value);

      if (isValidHex(normalized, alphaSupport)) {
        this.internalColor = createColor(normalized);
        this.value = normalized;
      }

      return;
    }

    if (allowEmpty) {
      this.internalColor = null;
      this.value = null;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, the input will process and display hex characters for the alpha channel.
   */
  @Prop() alphaSupport = false;

  /**
   * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
   *
   * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
   */
  @Prop() allowEmpty = false;

  /**
   * Label used for the hex input.
   * @default "Hex"
   */
  @Prop() intlHex = TEXT.hex;

  /**
   * Label used for the hex input when there is no color selected.
   * @default "No color"
   */
  @Prop() intlNoColor = TEXT.noColor;

  /**
   * The component's scale.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaSupport)
  );

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    if (value) {
      const normalized = normalizeHex(value);
      const { alphaSupport } = this;

      if (isValidHex(normalized, alphaSupport)) {
        const { internalColor } = this;
        const changed =
          !internalColor || normalized !== normalizeHex(hexify(internalColor, alphaSupport));
        this.internalColor = createColor(normalized);
        this.previousNonNullValue = normalized;
        this.value = normalized;

        if (changed) {
          this.calciteColorPickerHexInputChange.emit();
        }

        return;
      }
    } else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;
      this.calciteColorPickerHexInputChange.emit();

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
  @Event() calciteColorPickerHexInputChange: EventEmitter;

  private onCalciteInputBlur = (event: Event): void => {
    const node = event.currentTarget as HTMLCalciteInputElement;
    const inputValue = node.value;
    const hex = `#${inputValue}`;
    const { allowEmpty, alphaSupport, internalColor } = this;
    const willClearValue = allowEmpty && !inputValue;

    if (willClearValue || (isValidHex(hex, alphaSupport) && isLonghandHex(hex))) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      allowEmpty && !internalColor
        ? ""
        : this.formatForInternalInput(
            rgbToHex(
              alphaSupport
                ? normalizeAlpha(internalColor.object())
                : (internalColor.object() as any as RGB)
            )
          );
  };

  private onCalciteInputChange = (event: CustomEvent): void => {
    const node = event.currentTarget as HTMLCalciteInputElement;
    const inputValue = node.value;
    let value: this["value"];

    if (inputValue) {
      const hex = inputValue;
      const color = hexToRGB(`#${hex}`, this.alphaSupport);

      if (!color) {
        return;
      }

      value = normalizeHex(hex);
    } else if (this.allowEmpty) {
      value = null;
    }

    this.value = value;
    this.calciteColorPickerHexInputChange.emit();
  };

  // using @Listen as a workaround for VDOM listener not firing
  @Listen("keydown", { capture: true })
  protected onInputKeyDown(event: KeyboardEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { alphaSupport, el, inputNode, internalColor, value } = this;
    const key = getKey(event.key);
    const isNudgeKey = key === "ArrowDown" || key === "ArrowUp";

    if (isNudgeKey) {
      if (!value) {
        this.value = this.previousNonNullValue;
        event.preventDefault();
        return;
      }

      const direction = key === "ArrowUp" ? 1 : -1;
      const bump = shiftKey ? 10 : 1;

      this.value = normalizeHex(
        hexify(this.nudgeRGBChannels(internalColor, bump * direction), alphaSupport)
      );

      event.preventDefault();
      return;
    }

    const withModifiers = altKey || ctrlKey || metaKey;
    const exceededHexLength = inputNode.value.length >= (alphaSupport ? 8 : 6);
    const focusedElement = el.shadowRoot.activeElement as HTMLInputElement;
    const hasTextSelection =
      // can't use window.getSelection() because of FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=85686
      focusedElement.selectionStart != focusedElement.selectionEnd;
    const singleChar = key.length === 1;
    const validHexChar = hexChar.test(key);

    if (
      singleChar &&
      !withModifiers &&
      (!validHexChar || (!hasTextSelection && exceededHexLength))
    ) {
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private inputNode: HTMLCalciteInputElement;

  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  @State() internalColor: Color | null = DEFAULT_COLOR;

  private previousNonNullValue: string = this.value;

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
          class={CSS.input}
          dir={elementDir}
          label={intlHex}
          onCalciteInputBlur={this.onCalciteInputBlur}
          onChange={this.onCalciteInputChange}
          prefixText="#"
          ref={this.storeInputRef}
          scale={this.scale}
          value={hexInputValue}
        />
        {hexInputValue ? (
          <calcite-color-picker-swatch
            active
            class={CSS.preview}
            color={`#${hexInputValue}`}
            scale={this.scale}
          />
        ) : null}
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

  private storeInputRef = (node: HTMLCalciteInputElement): void => {
    this.inputNode = node;
  };

  private formatForInternalInput(hex: string): string {
    return hex ? hex.replace("#", "") : "";
  }

  private nudgeRGBChannels(color: Color, amount: number): Color {
    const channels = color.array().map((channel) => channel + amount);

    return Color.rgb(
      this.alphaSupport
        ? [
            ...channels,
            color.alpha() // only RGB channels are nudged
          ]
        : channels
    );
  }
}
