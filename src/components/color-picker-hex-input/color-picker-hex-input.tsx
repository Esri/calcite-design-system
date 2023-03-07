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
import Color from "color";
import { focusElement } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { NumberingSystem } from "../../utils/locale";
import { RGB } from "../color-picker/interfaces";
import { hexChar, isLonghandHex, isValidHex, normalizeHex, rgbToHex } from "../color-picker/utils";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-color-picker-hex-input",
  styleUrl: "color-picker-hex-input.scss",
  shadow: true
})
export class ColorPickerHexInput implements LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerHexInputElement;

  /**
   * Specifies accessible label for the input field.
   */
  @Prop() hexLabel = "Hex";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { allowEmpty, value } = this;

    if (value) {
      const normalized = normalizeHex(value);

      if (isValidHex(normalized)) {
        this.internalSetValue(normalized, normalized, false);
      }

      return;
    }

    if (allowEmpty) {
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
   * When `false`, an empty color (`null`) will be allowed as a `value`. Otherwise, a color value is enforced on the component.
   *
   * When `true`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`. When `false`, an empty color (`null`) will be allowed as a `value`.
   */
  @Prop() allowEmpty = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The Hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = normalizeHex(DEFAULT_COLOR.hex());

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop() numberingSystem?: NumberingSystem;

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

  private onCalciteInternalInputBlur = (): void => {
    const node = this.inputNode;
    const inputValue = node.value;
    const hex = `#${inputValue}`;
    const willClearValue = this.allowEmpty && !inputValue;

    if (willClearValue || (isValidHex(hex) && isLonghandHex(hex))) {
      return;
    }

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      this.allowEmpty && !this.internalColor
        ? ""
        : this.formatForInternalInput(rgbToHex(this.internalColor.object() as any as RGB));
  };

  private onInputChange = (): void => {
    this.internalSetValue(this.inputNode.value, this.value);
  };

  // using @Listen as a workaround for VDOM listener not firing
  @Listen("keydown", { capture: true })
  protected onInputKeyDown(event: KeyboardEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { internalColor, value } = this;
    const { key } = event;

    if (key === "Tab" || key === "Enter") {
      this.onInputChange();
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
        normalizeHex(this.nudgeRGBChannels(internalColor, bump * direction).hex()),
        oldValue
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

  private onPaste(event: ClipboardEvent): void {
    const hex = event.clipboardData.getData("text");

    if (isValidHex(hex)) {
      event.preventDefault();
      this.inputNode.value = hex.slice(1);
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
    const { value } = this;
    const hexInputValue = this.formatForInternalInput(value);
    return (
      <div class={CSS.container}>
        <calcite-input
          class={CSS.input}
          label={this.hexLabel}
          maxLength={6}
          numberingSystem={this.numberingSystem}
          onCalciteInputChange={this.onInputChange}
          onCalciteInternalInputBlur={this.onCalciteInternalInputBlur}
          onKeyDown={this.handleKeyDown}
          onPaste={this.onPaste}
          prefixText="#"
          scale={this.scale}
          value={hexInputValue}
          // eslint-disable-next-line react/jsx-sort-props
          ref={this.storeInputRef}
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
    await componentLoaded(this);

    focusElement(this.inputNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private internalSetValue(value: string | null, oldValue: string | null, emit = true): void {
    if (value) {
      const normalized = normalizeHex(value);

      if (isValidHex(normalized)) {
        const { internalColor } = this;
        const changed = !internalColor || normalized !== normalizeHex(internalColor.hex());
        this.internalColor = Color(normalized);
        this.previousNonNullValue = normalized;
        this.value = normalized;

        if (changed && emit) {
          this.calciteColorPickerHexInputChange.emit();
        }

        return;
      }
    } else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;

      if (emit) {
        this.calciteColorPickerHexInputChange.emit();
      }

      return;
    }

    this.value = oldValue;
  }

  private storeInputRef = (node: HTMLCalciteInputElement): void => {
    this.inputNode = node;
  };

  private formatForInternalInput(hex: string): string {
    return hex ? hex.replace("#", "") : "";
  }

  private nudgeRGBChannels(color: Color, amount: number): Color {
    return Color.rgb(color.array().map((channel) => channel + amount));
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
}
