// @ts-strict-ignore
import Color, { type ColorInstance } from "color";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { Scale } from "../interfaces";
import { Channels, RGB } from "../color-picker/interfaces";
import {
  alphaToOpacity,
  hexChar,
  hexify,
  isLonghandHex,
  isShorthandHex,
  isValidHex,
  normalizeHex,
  opacityToAlpha,
  rgbToHex,
} from "../color-picker/utils";
import { NumberingSystem } from "../../utils/locale";
import { OPACITY_LIMITS } from "../color-picker/resources";
import type { InputNumber } from "../input-number/input-number";
import type { InputText } from "../input-text/input-text";
import type { ColorPicker } from "../color-picker/color-picker";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS } from "./resources";
import { styles } from "./color-picker-hex-input.scss";

declare global {
  interface DeclareElements {
    "calcite-color-picker-hex-input": ColorPickerHexInput;
  }
}

const DEFAULT_COLOR = Color();

export class ColorPickerHexInput extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private hexInputRef = createRef<InputText["el"]>();

  private opacityInputRef = createRef<InputNumber["el"]>();

  private previousNonNullValue: string;

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  /** The last valid/selected color. Used as a fallback if an invalid hex code is entered. */
  @state() internalColor: ColorInstance | undefined = DEFAULT_COLOR;

  // #endregion

  // #region Public Properties

  /** When `true`, the component will allow updates to the color's alpha value. */
  @property() alphaChannel = false;

  /**
   * When `true`, an empty color (`undefined`) will be allowed as a `value`.
   *
   * When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`.
   */
  @property() allowEmpty = false;

  /**
   * Specifies accessible label for the input field.
   *
   * @deprecated use `messages` instead
   */
  @property() hexLabel = "Hex";

  /**
   * Messages are passed by parent component for accessible labels.
   *
   * @private
   */
  @property() messages: ColorPicker["messages"]["_overrides"];

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem?: NumberingSystem;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** The hex value. */
  @property({ reflect: true }) value: string = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaChannel),
    this.alphaChannel,
    true,
  );

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.hexInputRef.value, options);
  }

  // #endregion

  // #region Events

  /** Emitted when the hex value changes. */
  calciteColorPickerHexInputChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.previousNonNullValue = this.value;
    const { allowEmpty, alphaChannel, value } = this;

    if (value) {
      const normalized = normalizeHex(value, alphaChannel);

      if (isValidHex(normalized, alphaChannel)) {
        this.internalSetValue(normalized, normalized, false);
      }

      return;
    }

    if (allowEmpty) {
      this.internalSetValue(undefined, undefined, false);
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      changes.has("value") &&
      (this.hasUpdated ||
        this.value !==
          normalizeHex(hexify(DEFAULT_COLOR, this.alphaChannel), this.alphaChannel, true))
    ) {
      this.internalSetValue(this.value, changes.get("value"), false);
    }
  }

  // #endregion

  // #region Private Methods

  private onHexInputBlur(): void {
    const node = this.hexInputRef.value;
    const inputValue = node.value;
    const hex = `#${inputValue}`;
    const { allowEmpty, internalColor } = this;
    const willClearValue = allowEmpty && !inputValue;
    const isLonghand = isLonghandHex(hex);
    const anyShorthand = isShorthandHex(hex, true) || isShorthandHex(hex, false);

    if (anyShorthand) {
      // ensure modified pasted hex values are committed since we prevent default to remove the # char.
      this.onHexInputChange();
    }

    if (willClearValue || (isValidHex(hex) && isLonghand)) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      allowEmpty && !internalColor
        ? ""
        : this.formatHexForInternalInput(
            rgbToHex(
              // always display hex input in RRGGBB format
              internalColor.object() as any as RGB,
            ),
          );
  }

  private onOpacityInputBlur(): void {
    const node = this.opacityInputRef.value;
    const inputValue = node.value;
    const { allowEmpty, internalColor } = this;
    const willClearValue = allowEmpty && !inputValue;

    if (willClearValue) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      allowEmpty && !internalColor ? "" : this.formatOpacityForInternalInput(internalColor);
  }

  private onOpacityInputInput(): void {
    this.onOpacityInputChange();
  }

  private onHexInputChange(): void {
    const nodeValue = this.hexInputRef.value.value;
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
  }

  private onOpacityInputChange(): void {
    const node = this.opacityInputRef.value;
    let value: number | string;

    if (!node.value) {
      value = node.value;
    } else {
      const alpha = opacityToAlpha(Number(node.value));
      value = this.internalColor?.alpha(alpha).hexa();
    }

    this.internalSetValue(value, this.value);
  }

  private onInputFocus(event: Event): void {
    const focusTarget =
      event.type === "calciteInternalInputTextFocus" ? this.hexInputRef : this.opacityInputRef;
    focusTarget.value.selectText();
  }

  private onHexInputInput(): void {
    const hexInputValue = `#${this.hexInputRef.value.value}`;
    const oldValue = this.value;

    if (
      isValidHex(hexInputValue, this.alphaChannel) &&
      isLonghandHex(hexInputValue, this.alphaChannel)
    ) {
      this.internalSetValue(hexInputValue, oldValue);
    }
  }

  protected onInputKeyDown(event: KeyboardEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { alphaChannel, hexInputRef, internalColor, value } = this;
    const { key } = event;
    const composedPath = event.composedPath();

    if ((key === "Tab" && isShorthandHex(value, this.alphaChannel)) || key === "Enter") {
      if (composedPath.includes(hexInputRef.value)) {
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
            composedPath.includes(hexInputRef.value) ? "rgb" : "a",
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
  }

  private onHexInputPaste(event: ClipboardEvent): void {
    const hex = event.clipboardData.getData("text");

    if (isValidHex(hex, this.alphaChannel) && isLonghandHex(hex, this.alphaChannel)) {
      event.preventDefault();
      this.hexInputRef.value.value = hex.slice(1);
      this.internalSetValue(hex, this.value);
    }
  }

  private internalSetValue(
    value: string | undefined,
    oldValue: string | undefined,
    emit = true,
  ): void {
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
    } else if (this.allowEmpty) {
      this.internalColor = undefined;
      this.value = undefined;

      if (emit) {
        this.calciteColorPickerHexInputChange.emit();
      }

      return;
    }

    this.value = oldValue;
  }

  private formatHexForInternalInput(hex: string): string {
    return hex ? hex.replace("#", "").slice(0, 6) : "";
  }

  private formatOpacityForInternalInput(color: ColorInstance): string {
    return color ? `${alphaToOpacity(color.alpha())}` : "";
  }

  private nudgeRGBChannels(
    color: ColorInstance,
    amount: number,
    context: "rgb" | "a",
  ): ColorInstance {
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

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { alphaChannel, hexLabel, internalColor, messages, scale, value } = this;
    const hexInputValue = this.formatHexForInternalInput(value);
    const opacityInputValue = this.formatOpacityForInternalInput(internalColor);
    const inputScale = scale === "l" ? "m" : "s";

    return (
      <div class={CSS.container}>
        <calcite-input-text
          class={CSS.hexInput}
          label={messages?.hex || hexLabel}
          maxLength={this.alphaChannel ? 8 : 6}
          onKeyDown={this.onInputKeyDown}
          onPaste={this.onHexInputPaste}
          oncalciteInputTextChange={this.onHexInputChange}
          oncalciteInputTextInput={this.onHexInputInput}
          oncalciteInternalInputTextBlur={this.onHexInputBlur}
          oncalciteInternalInputTextFocus={this.onInputFocus}
          prefixText="#"
          ref={this.hexInputRef}
          scale={inputScale}
          value={hexInputValue}
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
            onKeyDown={this.onInputKeyDown}
            oncalciteInputNumberInput={this.onOpacityInputInput}
            oncalciteInternalInputNumberBlur={this.onOpacityInputBlur}
            oncalciteInternalInputNumberFocus={this.onInputFocus}
            ref={this.opacityInputRef}
            scale={inputScale}
            suffixText="%"
            value={opacityInputValue}
          />
        ) : null}
      </div>
    );
  }

  // #endregion
}
