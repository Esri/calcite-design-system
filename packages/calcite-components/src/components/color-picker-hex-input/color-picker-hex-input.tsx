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
  Watch,
} from "@stencil/core";
import {
  alphaToOpacity,
  hexChar,
  hexify,
  isLonghandHex,
  isValidHex,
  normalizeHex,
  opacityToAlpha,
  rgbToHex,
} from "../color-picker/utils";
import { CSS } from "./resources";
import { Scale } from "../interfaces";
import { Channels, RGB } from "../color-picker/interfaces";
import Color from "color";
import { focusElement } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { NumberingSystem } from "../../utils/locale";
import { OPACITY_LIMITS } from "../color-picker/resources";
import { ColorPickerMessages } from "../color-picker/assets/color-picker/t9n";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-color-picker-hex-input",
  styleUrl: "color-picker-hex-input.scss",
  shadow: true,
})
export class ColorPickerHexInput implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { allowEmpty, isClearable = allowEmpty, alphaChannel, value } = this;

    if (value) {
      const normalized = normalizeHex(value, alphaChannel);

      if (isValidHex(normalized, alphaChannel)) {
        this.internalSetValue(normalized, normalized, false);
      }

      return;
    }

    if (isClearable) {
      this.internalSetValue(null, null, false);
    }
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, an empty color (`null`) will be allowed as a `value`.
   *
   * When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`.
   *
   * @deprecated Use `clearable` instead.
   */
  @Prop() allowEmpty = false;

  /**
   * When `true`, the component will allow updates to the color's alpha value.
   */
  @Prop() alphaChannel = false;

  /**
   * When `true`, a clear button is displayed when the component has a value.
   */
  @Prop({ reflect: true }) clearable = false;

  /**
   * Specifies accessible label for the input field.
   *
   * @deprecated use `messages` instead
   */
  @Prop() hexLabel = "Hex";

  /**
   * Messages are passed by parent component for accessible labels.
   *
   * @internal
   */
  @Prop() messages: ColorPickerMessages;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop() numberingSystem?: NumberingSystem;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaChannel),
    this.alphaChannel,
    true,
  );

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    this.internalSetValue(value, oldValue, false);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the hex value changes.
   */
  @Event({ cancelable: false }) calciteColorPickerHexInputChange: EventEmitter<void>;

  private onHexInputBlur = (): void => {
    const node = this.hexInputNode;
    const inputValue = node.value;
    const hex = `#${inputValue}`;
    const { allowEmpty, isClearable = allowEmpty, internalColor } = this;
    const willClearValue = allowEmpty && !inputValue;
    const isLonghand = isLonghandHex(hex);

    // ensure modified pasted hex values are committed since we prevent default to remove the # char.
    this.onHexInputChange();

    if (willClearValue || (isValidHex(hex) && isLonghand)) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      isClearable && !internalColor
        ? ""
        : this.formatHexForInternalInput(
            rgbToHex(
              // always display hex input in RRGGBB format
              internalColor.object() as any as RGB,
            ),
          );
  };

  private onOpacityInputBlur = (): void => {
    const node = this.opacityInputNode;
    const inputValue = node.value;
    const { allowEmpty, isClearable = allowEmpty, internalColor } = this;
    const willClearValue = isClearable && !inputValue;

    if (willClearValue) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      isClearable && !internalColor ? "" : this.formatOpacityForInternalInput(internalColor);
  };

  private onHexInputChange = (): void => {
    const nodeValue = this.hexInputNode.value;
    let value = nodeValue;

    if (value) {
      const normalized = normalizeHex(value, false);
      const preserveExistingAlpha = isValidHex(normalized) && this.alphaChannel;
      if (preserveExistingAlpha && this.internalColor) {
        const alphaHex = normalizeHex(this.internalColor.hexa(), true).slice(-2);
        value = `${normalized + alphaHex}`;
      }
    }

    this.internalSetValue(value, this.value);
  };

  private onOpacityInputChange = (): void => {
    const node = this.opacityInputNode;
    let value: number | string;

    if (!node.value) {
      value = node.value;
    } else {
      const alpha = opacityToAlpha(Number(node.value));
      value = this.internalColor?.alpha(alpha).hexa();
    }

    this.internalSetValue(value, this.value);
  };

  protected onInputKeyDown = (event: KeyboardEvent): void => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { alphaChannel, hexInputNode, internalColor, value } = this;
    const { key } = event;
    const composedPath = event.composedPath();

    if (key === "Tab" || key === "Enter") {
      if (composedPath.includes(hexInputNode)) {
        this.onHexInputChange();
      } else {
        this.onOpacityInputChange();
      }

      if (key === "Enter") {
        event.preventDefault();
      }

      return;
    }

    const isNudgeKey = key === "ArrowDown" || key === "ArrowUp";
    const oldValue = this.value;

    if (isNudgeKey) {
      if (!value) {
        this.internalSetValue(this.previousNonNullValue, oldValue);
        event.preventDefault();
        return;
      }

      const direction = key === "ArrowUp" ? 1 : -1;
      const bump = shiftKey ? 10 : 1;

      this.internalSetValue(
        hexify(
          this.nudgeRGBChannels(
            internalColor,
            bump * direction,
            composedPath.includes(hexInputNode) ? "rgb" : "a",
          ),
          alphaChannel,
        ),
        oldValue,
      );

      event.preventDefault();
      return;
    }

    const withModifiers = altKey || ctrlKey || metaKey;
    const singleChar = key.length === 1;
    const validHexChar = hexChar.test(key);

    if (singleChar && !withModifiers && !validHexChar) {
      event.preventDefault();
    }
  };

  private onHexInputPaste = (event: ClipboardEvent): void => {
    const hex = event.clipboardData.getData("text");

    if (isValidHex(hex)) {
      event.preventDefault();
      this.hexInputNode.value = hex.slice(1);
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerHexInputElement;

  private hexInputNode: HTMLCalciteInputTextElement;

  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  @State() internalColor: Color | null = DEFAULT_COLOR;

  private opacityInputNode: HTMLCalciteInputNumberElement;

  private previousNonNullValue: string = this.value;

  get isClearable(): boolean {
    return this.clearable && this.value.length > 0;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const { alphaChannel, hexLabel, internalColor, isClearable, messages, scale, value } = this;
    const hexInputValue = this.formatHexForInternalInput(value);
    const opacityInputValue = this.formatOpacityForInternalInput(internalColor);
    const inputScale = scale === "l" ? "m" : "s";

    return (
      <div class={CSS.container}>
        <calcite-input-text
          class={CSS.hexInput}
          clearable={isClearable}
          label={messages?.hex || hexLabel}
          maxLength={6}
          onCalciteInputTextChange={this.onHexInputChange}
          onCalciteInternalInputTextBlur={this.onHexInputBlur}
          onKeyDown={this.onInputKeyDown}
          onPaste={this.onHexInputPaste}
          prefixText="#"
          scale={inputScale}
          value={hexInputValue}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.storeHexInputRef}
        />
        {alphaChannel ? (
          <calcite-input-number
            class={CSS.opacityInput}
            key="opacity-input"
            label={messages?.opacity}
            max={OPACITY_LIMITS.max}
            maxLength={3}
            min={OPACITY_LIMITS.min}
            numberButtonType="none"
            numberingSystem={this.numberingSystem}
            onCalciteInputNumberChange={this.onOpacityInputChange}
            onCalciteInternalInputNumberBlur={this.onOpacityInputBlur}
            onKeyDown={this.onInputKeyDown}
            scale={inputScale}
            suffixText="%"
            value={opacityInputValue}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.storeOpacityInputRef}
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
    await componentFocusable(this);

    return focusElement(this.hexInputNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private internalSetValue(value: string | null, oldValue: string | null, emit = true): void {
    const { allowEmpty, isClearable = allowEmpty } = this;

    if (value) {
      const { alphaChannel } = this;
      const normalized = normalizeHex(value, alphaChannel, alphaChannel);

      if (isValidHex(normalized, alphaChannel)) {
        const { internalColor: currentColor } = this;
        const nextColor = Color(normalized);
        const normalizedLonghand = normalizeHex(hexify(nextColor, alphaChannel), alphaChannel);

        const changed =
          !currentColor ||
          normalizedLonghand !== normalizeHex(hexify(currentColor, alphaChannel), alphaChannel);

        this.internalColor = nextColor;
        this.previousNonNullValue = normalizedLonghand;
        this.value = normalizedLonghand;

        if (changed && emit) {
          this.calciteColorPickerHexInputChange.emit();
        }

        return;
      }
    } else if (isClearable) {
      this.internalColor = null;
      this.value = null;

      if (emit) {
        this.calciteColorPickerHexInputChange.emit();
      }

      return;
    }

    this.value = oldValue;
  }

  private storeHexInputRef = (node: HTMLCalciteInputTextElement): void => {
    this.hexInputNode = node;
  };

  private storeOpacityInputRef = (node: HTMLCalciteInputNumberElement): void => {
    this.opacityInputNode = node;
  };

  private formatHexForInternalInput(hex: string): string {
    return hex ? hex.replace("#", "").slice(0, 6) : "";
  }

  private formatOpacityForInternalInput(color: Color): string {
    return color ? `${alphaToOpacity(color.alpha())}` : "";
  }

  private nudgeRGBChannels(color: Color, amount: number, context: "rgb" | "a"): Color {
    let nudgedChannels: Channels;
    const channels = color.array();
    const rgbChannels = channels.slice(0, 3);

    if (context === "rgb") {
      const nudgedRGBChannels = rgbChannels.map((channel) => channel + amount);
      nudgedChannels = [
        ...nudgedRGBChannels,
        this.alphaChannel ? channels[3] : undefined,
      ] as Channels;
    } else {
      const nudgedAlpha = opacityToAlpha(alphaToOpacity(color.alpha()) + amount);
      nudgedChannels = [...rgbChannels, nudgedAlpha] as Channels;
    }

    return Color(nudgedChannels);
  }
}
