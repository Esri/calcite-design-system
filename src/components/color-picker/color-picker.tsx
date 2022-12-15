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
import {
  ColorAppearance,
  ColorMode,
  ColorValue,
  HSLA,
  HSVA,
  InternalColor,
  RGBA
} from "./interfaces";
import { Scale } from "../interfaces";
import {
  CSS,
  DEFAULT_COLOR,
  DEFAULT_STORAGE_KEY_PREFIX,
  DIMENSIONS,
  HSV_LIMITS,
  RGB_LIMITS
} from "./resources";

import { Direction, focusElement, getElementDir, isPrimaryPointerButton } from "../../utils/dom";
import {
  alphaCompatible,
  alphaToOpacity,
  colorEqual,
  CSSColorMode,
  Format,
  hexify,
  normalizeAlpha,
  normalizeColor,
  normalizeHex,
  opacityToAlpha,
  parseMode,
  SupportedMode,
  toAlphaMode,
  toNonAlphaMode
} from "./utils";
import { throttle } from "lodash-es";

import { clamp } from "../../utils/math";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { Messages } from "./assets/color-picker/t9n";
import { isActivationKey } from "../../utils/key";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { NumberingSystem } from "../../utils/locale";
import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

const throttleFor60FpsInMs = 16;

@Component({
  tag: "calcite-color-picker",
  styleUrl: "color-picker.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class ColorPicker
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerElement;

  //--------------------------------------------------------------------------
  //
  //  Public properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `false`, an empty color (`null`) will be allowed as a `value`. Otherwise, a color value is enforced on the component.
   *
   * When `true`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`. When `false`, an empty color (`null`) will be allowed as a `value`.
   */
  @Prop({ reflect: true }) allowEmpty = false;

  /**
   * When true, the color picker will process and display alpha characters.
   */
  @Prop() alphaEnabled = false;

  @Watch("alphaEnabled")
  handleAlphaEnabledChange(alphaEnabled: boolean): void {
    const { format } = this;

    if (alphaEnabled && format !== "auto" && !alphaCompatible(format)) {
      console.warn(
        `ignoring alphaEnabled as the current format (${format}) does not support alpha`
      );
      this.alphaEnabled = false;
    }
  }

  /**
   * Specifies the appearance style of the component -
   *
   * `"solid"` (containing border) or `"minimal"` (no containing border).
   */
  @Prop({ reflect: true }) appearance: ColorAppearance = "solid";

  /**
   * Internal prop for advanced use-cases.
   *
   * @internal
   */
  @Prop({ mutable: true }) color: InternalColor | null = DEFAULT_COLOR;

  @Watch("color")
  handleColorChange(color: Color | null, oldColor: Color | null): void {
    this.drawColorFieldAndSlider();
    this.updateChannelsFromColor(color);
    this.previousColor = oldColor;
  }

  /** When true, hides the RGB/HSV channel inputs */
  @Prop() channelsDisabled = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The format of `value`.
   *
   * When `"auto"`, the format will be inferred from `value` when set.
   *
   * @default "auto"
   */
  @Prop({ reflect: true }) format: Format = "auto";

  @Watch("format")
  handleFormatChange(format: Format): void {
    this.setMode(format);
    this.internalColorSet(this.color, false, "internal");
  }

  /** When true, hides the hex input */
  @Prop() hexDisabled = false;

  /**
   * When `true`, hides the Hex input.
   *
   * @deprecated use `hexDisabled` instead
   */
  @Prop({ reflect: true }) hideHex = false;

  /**
   * When `true`, hides the RGB/HSV channel inputs.
   *
   * @deprecated use `channelsDisabled` instead
   */
  @Prop({ reflect: true }) hideChannels = false;

  /**
   * When `true`, hides the saved colors section.
   *
   * @deprecated use `savedDisabled` instead
   */
  @Prop({ reflect: true }) hideSaved = false;

  /**
   * Accessible name for the RGB section's blue channel.
   *
   * @default "B"
   */
  @Prop() intlB = TEXT.b;

  /**
   * Accessible name for the RGB section's blue channel description.
   *
   * @default "Blue"
   */
  @Prop() intlBlue = TEXT.blue;

  /**
   * Accessible name for the delete color button.
   *
   * @default "Delete color"
   */
  @Prop() intlDeleteColor = TEXT.deleteColor;

  /**
   * Accessible name for the RGB section's green channel.
   *
   * @default "G"
   */
  @Prop() intlG = TEXT.g;

  /**
   * Accessible name for the RGB section's green channel description.
   *
   * @default "Green"
   */
  @Prop() intlGreen = TEXT.green;

  /**
   * Accessible name for the HSV section's hue channel.
   *
   * @default "H"
   */
  @Prop() intlH = TEXT.h;

  /**
   * Accessible name for the HSV mode.
   *
   * @default "HSV"
   */
  @Prop() intlHsv = TEXT.hsv;

  /**
   * Accessible name for the Hex input.
   *
   * @default "Hex"
   */
  @Prop() intlHex = TEXT.hex;

  /**
   * Accessible name for the HSV section's hue channel description.
   *
   * @default "Hue"
   */
  @Prop() intlHue = TEXT.hue;

  /**
   * Accessible name for the Hex input when there is no color selected.
   *
   * @default "No color"
   */
  @Prop() intlNoColor = TEXT.noColor;

  /**
   * Label used for the opacity description.
   *
   * @default "Opacity"
   */
  @Prop() intlOpacity = TEXT.opacity;

  /**
   * Label used for the red channel
   * Accessible name for the RGB section's red channel.
   *
   * @default "R"
   */
  @Prop() intlR = TEXT.r;

  /**
   * Accessible name for the RGB section's red channel description.
   *
   * @default "Red"
   */
  @Prop() intlRed = TEXT.red;

  /**
   * Accessible name for the RGB mode.
   *
   * @default "RGB"
   */
  @Prop() intlRgb = TEXT.rgb;

  /**
   * Accessible name for the HSV section's saturation channel.
   *
   * @default "S"
   */
  @Prop() intlS = TEXT.s;

  /**
   * Accessible name for the HSV section's saturation channel description.
   *
   * @default "Saturation"
   */
  @Prop() intlSaturation = TEXT.saturation;

  /**
   * Accessible name for the save color button.
   *
   * @default "Save color"
   */
  @Prop() intlSaveColor = TEXT.saveColor;

  /**
   * Accessible name for the saved colors section.
   *
   * @default "Saved"
   */
  @Prop() intlSaved = TEXT.saved;

  /**
   * Accessible name for the HSV section's value channel.
   *
   * @default "V"
   */
  @Prop() intlV = TEXT.v;

  /**
   * Accessible name for the HSV section's value channel description.
   *
   * @default "Value"
   */
  @Prop() intlValue = TEXT.value;

  /** When true, hides the saved colors section */
  @Prop({ reflect: true }) savedDisabled = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  handleScaleChange(scale: Scale = "m"): void {
    this.updateDimensions(scale);
    this.updateCanvasSize(this.fieldAndSliderRenderingContext?.canvas);
  }

  /** Specifies the storage ID for colors. */
  @Prop({ reflect: true }) storageId: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /** Specifies the Unicode numeral system used by the component for localization. */
  @Prop({ reflect: true }) numberingSystem: NumberingSystem;

  /**
   * The component's value, where the value can be a CSS color string, or a RGB, HSL or HSV object.
   *
   * The type will be preserved as the color is updated.
   *
   * @default "#007ac2"
   * @see [CSS Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
   * @see [ColorValue](https://github.com/Esri/calcite-components/blob/master/src/components/color-picker/interfaces.ts#L10)
   */
  @Prop({ mutable: true }) value: ColorValue | null = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaEnabled)
  );

  @Watch("value")
  handleValueChange(value: ColorValue | null, oldValue: ColorValue | null): void {
    const { allowEmpty, format } = this;
    const checkMode = !allowEmpty || value;
    let modeChanged = false;

    if (checkMode) {
      const nextMode = parseMode(value);

      if (!nextMode || (format !== "auto" && nextMode !== format)) {
        this.showIncompatibleColorWarning(value, format);
        this.value = oldValue;
        return;
      }

      modeChanged = this.mode !== nextMode;
      this.setMode(nextMode, true, this.internalColorUpdateContext === null);
    }

    const dragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";

    if (this.internalColorUpdateContext === "initial") {
      return;
    }

    if (this.internalColorUpdateContext === "user-interaction") {
      this.calciteColorPickerInput.emit();

      if (!dragging) {
        this.calciteColorPickerChange.emit();
      }
      return;
    }

    const color =
      allowEmpty && !value
        ? null
        : Color(
            value != null && typeof value === "object" && alphaCompatible(this.mode)
              ? normalizeColor(value as RGBA | HSVA | HSLA)
              : value
          );
    const colorChanged = !colorEqual(color, this.color);

    if (modeChanged || colorChanged) {
      this.internalColorSet(color, true, "internal");
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

  private get baseColorFieldColor(): Color {
    return this.color || this.previousColor || DEFAULT_COLOR;
  }

  private activeColorFieldAndSliderRect: DOMRect;

  private colorFieldAndSliderHovered = false;

  private fieldAndSliderRenderingContext: CanvasRenderingContext2D;

  private colorFieldScopeNode: HTMLDivElement;

  private hueThumbState: "idle" | "hover" | "drag" = "idle";

  private hueScopeNode: HTMLDivElement;

  private internalColorUpdateContext: "internal" | "initial" | "user-interaction" | null = null;

  private previousColor: InternalColor | null;

  private mode: SupportedMode = CSSColorMode.HEX;

  private shiftKeyChannelAdjustment = 0;

  private sliderThumbState: "idle" | "hover" | "drag" = "idle";

  @State() defaultMessages: Messages;

  @State() colorFieldAndSliderInteractive = false;

  @State() channelMode: ColorMode = "rgb";

  @State() channels: [number, number, number] = this.toChannels(DEFAULT_COLOR);

  @State() dimensions = DIMENSIONS.m;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  @State() savedColors: string[] = [];

  @State() colorFieldScopeTop: number;

  @State() colorFieldScopeLeft: number;

  @State() scopeOrientation: "vertical" | "horizontal";

  @State() hueScopeLeft: number;

  @State() hueScopeTop: number;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the color value has changed.
   */
  @Event({ cancelable: false }) calciteColorPickerChange: EventEmitter<void>;

  /**
   * Fires as the color value changes.
   *
   * Similar to the `calciteColorPickerChange` event with the exception of dragging. When dragging the color field or hue slider thumb, this event fires as the thumb is moved.
   */
  @Event({ cancelable: false }) calciteColorPickerInput: EventEmitter<void>;

  private handleTabActivate = (event: Event): void => {
    this.channelMode = (event.currentTarget as HTMLElement).getAttribute(
      "data-color-mode"
    ) as ColorMode;

    this.updateChannelsFromColor(this.color);
  };

  private handleColorFieldScopeKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const arrowKeyToXYOffset = {
      ArrowUp: { x: 0, y: -10 },
      ArrowRight: { x: 10, y: 0 },
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 }
    };

    if (arrowKeyToXYOffset[key]) {
      event.preventDefault();
      this.scopeOrientation = key === "ArrowDown" || key === "ArrowUp" ? "vertical" : "horizontal";
      this.captureColorFieldColor(
        this.colorFieldScopeLeft + arrowKeyToXYOffset[key].x || 0,
        this.colorFieldScopeTop + arrowKeyToXYOffset[key].y || 0,
        false
      );
    }
  };

  private handleHueScopeKeyDown = (event: KeyboardEvent): void => {
    const modifier = event.shiftKey ? 10 : 1;
    const { key } = event;
    const arrowKeyToXOffset = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1
    };

    if (arrowKeyToXOffset[key]) {
      event.preventDefault();
      const delta = arrowKeyToXOffset[key] * modifier;
      const hue = this.baseColorFieldColor.hue();
      const color = this.baseColorFieldColor.hue(hue + delta);
      this.internalColorSet(color, false);
    }
  };

  private handleHexInputChange = (event: Event): void => {
    event.stopPropagation();
    const { allowEmpty, color } = this;
    const input = event.target as HTMLCalciteColorPickerHexInputElement;
    const hex = input.value;

    if (allowEmpty && !hex) {
      this.internalColorSet(null);
      return;
    }

    const normalizedHex = color && normalizeHex(hexify(color, alphaCompatible(this.mode)));

    if (hex !== normalizedHex) {
      this.internalColorSet(Color(hex));
    }
  };

  private handleSavedColorSelect = (event: Event): void => {
    const swatch = event.currentTarget as HTMLCalciteColorPickerSwatchElement;
    this.internalColorSet(Color(swatch.color));
  };

  private handleChannelInput = (event: CustomEvent): void => {
    const input = event.currentTarget as HTMLCalciteInputElement;
    const internalInput = event.detail.nativeEvent.target as HTMLInputElement;
    const channelIndex = Number(input.getAttribute("data-channel-index"));

    const limit =
      this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];

    let inputValue: string;

    if (this.allowEmpty && !input.value) {
      inputValue = "";
    } else {
      const value = Number(input.value) + this.shiftKeyChannelAdjustment;
      const clamped = clamp(value, 0, limit);

      inputValue = clamped.toString();
    }

    input.value = inputValue;
    internalInput.value = inputValue;
  };

  // using @Listen as a workaround for VDOM listener not firing
  @Listen("keydown", { capture: true })
  @Listen("keyup", { capture: true })
  protected handleChannelKeyUpOrDown(event: KeyboardEvent): void {
    this.shiftKeyChannelAdjustment = 0;
    const { key } = event;

    if (
      (key !== "ArrowUp" && key !== "ArrowDown") ||
      !event
        .composedPath()
        .some(
          (node: HTMLElement) =>
            node.classList?.contains(CSS.channel) ||
            node.classList?.contains(CSS.opacityInput) ||
            node.classList?.contains(CSS.opacitySlider)
        )
    ) {
      return;
    }

    const { shiftKey } = event;
    event.preventDefault();

    if (!this.color) {
      this.internalColorSet(this.previousColor);
      event.stopPropagation();
      return;
    }

    // this gets applied to the input's up/down arrow increment/decrement
    const complementaryBump = 9;

    this.shiftKeyChannelAdjustment =
      key === "ArrowUp" && shiftKey
        ? complementaryBump
        : key === "ArrowDown" && shiftKey
        ? -complementaryBump
        : 0;
  }

  private handleChannelChange = (event: CustomEvent): void => {
    const input = event.currentTarget as HTMLCalciteInputElement;
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const channels = [...this.channels] as this["channels"];

    const shouldClearChannels = this.allowEmpty && !input.value;

    if (shouldClearChannels) {
      this.channels = [null, null, null];
      this.internalColorSet(null);
      return;
    }

    channels[channelIndex] = Number(input.value);
    this.updateColorFromChannels(channels);
  };

  private handleOpacityInputChange = (event: CustomEvent): void => {
    const input = event.currentTarget as HTMLCalciteInputElement;
    const shouldClearInput = this.allowEmpty && !input.value;

    if (shouldClearInput) {
      this.value = "";
      this.internalColorSet(null);
      return;
    }

    const alpha = Number(input.value);

    if (!this.color) {
      this.internalColorSet(this.previousColor.alpha(opacityToAlpha(alpha)));
      event.stopPropagation();
      return;
    }

    this.color = this.color.alpha(opacityToAlpha(alpha));
  };

  private handleOpacityInputInput = (event: CustomEvent): void => {
    const input = event.currentTarget as HTMLCalciteInputElement;
    const internalInput = event.detail.nativeEvent.target as HTMLInputElement;
    const limit = 100;

    let inputValue: string;

    if (this.allowEmpty && !input.value) {
      inputValue = "";
    } else {
      const value = Number(input.value) + this.shiftKeyChannelAdjustment;
      const clamped = clamp(value, 0, limit);

      inputValue = clamped.toString();
    }

    input.value = inputValue;
    internalInput.value = inputValue;
  };

  private handleOpacitySliderInput = (event: CustomEvent): void => {
    const alpha =
      Number((event.currentTarget as HTMLCalciteInputElement).value) +
      this.shiftKeyChannelAdjustment;
    const clamped = clamp(alpha, 0, 100);

    if (!this.color) {
      this.internalColorSet(this.previousColor.alpha(opacityToAlpha(clamped)));
      event.stopPropagation();
      return;
    }

    this.color = this.color.alpha(opacityToAlpha(clamped));
  };

  private handleSavedColorKeyDown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.handleSavedColorSelect(event);
    }
  };

  private handleColorFieldAndSliderPointerLeave = (): void => {
    this.colorFieldAndSliderInteractive = false;
    this.colorFieldAndSliderHovered = false;

    if (this.sliderThumbState !== "drag" && this.hueThumbState !== "drag") {
      this.hueThumbState = "idle";
      this.sliderThumbState = "idle";
      this.drawColorFieldAndSlider();
    }
  };

  private handleColorFieldAndSliderPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const { offsetX, offsetY } = event;
    const region = this.getCanvasRegion(offsetY);

    if (region === "color-field") {
      this.hueThumbState = "drag";
      this.captureColorFieldColor(offsetX, offsetY);
      this.colorFieldScopeNode?.focus();
    } else if (region === "slider") {
      this.sliderThumbState = "drag";
      this.captureHueSliderColor(offsetX);
      this.hueScopeNode?.focus();
    }

    // prevent text selection outside of color field & slider area
    event.preventDefault();

    document.addEventListener("pointermove", this.globalPointerMoveHandler);
    document.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });

    this.activeColorFieldAndSliderRect =
      this.fieldAndSliderRenderingContext.canvas.getBoundingClientRect();
  };

  private globalPointerUpHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const previouslyDragging = this.sliderThumbState === "drag" || this.hueThumbState === "drag";

    this.hueThumbState = "idle";
    this.sliderThumbState = "idle";
    this.activeColorFieldAndSliderRect = null;
    this.drawColorFieldAndSlider();

    if (previouslyDragging) {
      this.calciteColorPickerChange.emit();
    }
  };

  private globalPointerMoveHandler = (event: PointerEvent): void => {
    const { el, dimensions } = this;
    const sliderThumbDragging = this.sliderThumbState === "drag";
    const hueThumbDragging = this.hueThumbState === "drag";

    if (!el.isConnected || (!sliderThumbDragging && !hueThumbDragging)) {
      return;
    }

    let samplingX: number;
    let samplingY: number;

    const colorFieldAndSliderRect = this.activeColorFieldAndSliderRect;
    const { clientX, clientY } = event;

    if (this.colorFieldAndSliderHovered) {
      samplingX = clientX - colorFieldAndSliderRect.x;
      samplingY = clientY - colorFieldAndSliderRect.y;
    } else {
      const colorFieldWidth = dimensions.colorField.width;
      const colorFieldHeight = dimensions.colorField.height;
      const hueSliderHeight = dimensions.slider.height;

      if (
        clientX < colorFieldAndSliderRect.x + colorFieldWidth &&
        clientX > colorFieldAndSliderRect.x
      ) {
        samplingX = clientX - colorFieldAndSliderRect.x;
      } else if (clientX < colorFieldAndSliderRect.x) {
        samplingX = 0;
      } else {
        samplingX = colorFieldWidth - 1;
      }

      if (
        clientY < colorFieldAndSliderRect.y + colorFieldHeight + hueSliderHeight &&
        clientY > colorFieldAndSliderRect.y
      ) {
        samplingY = clientY - colorFieldAndSliderRect.y;
      } else if (clientY < colorFieldAndSliderRect.y) {
        samplingY = 0;
      } else {
        samplingY = colorFieldHeight + hueSliderHeight;
      }
    }

    if (hueThumbDragging) {
      this.captureColorFieldColor(samplingX, samplingY, false);
    } else {
      this.captureHueSliderColor(samplingX);
    }
  };

  private handleColorFieldAndSliderPointerEnterOrMove = ({
    offsetX,
    offsetY
  }: PointerEvent): void => {
    const {
      dimensions: { colorField, slider, thumb }
    } = this;

    this.colorFieldAndSliderInteractive = offsetY <= colorField.height + slider.height;
    this.colorFieldAndSliderHovered = true;

    const region = this.getCanvasRegion(offsetY);

    if (region === "color-field") {
      const prevHueThumbState = this.hueThumbState;
      const color = this.baseColorFieldColor.hsv();

      const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / colorField.width));
      const centerY = Math.round(
        colorField.height - color.value() / (HSV_LIMITS.v / colorField.height)
      );

      const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, thumb.radius);

      let transitionedBetweenHoverAndIdle = false;

      if (prevHueThumbState === "idle" && hoveringThumb) {
        this.hueThumbState = "hover";
        transitionedBetweenHoverAndIdle = true;
      } else if (prevHueThumbState === "hover" && !hoveringThumb) {
        this.hueThumbState = "idle";
        transitionedBetweenHoverAndIdle = true;
      }

      if (this.hueThumbState !== "drag") {
        if (transitionedBetweenHoverAndIdle) {
          // refresh since we won't update color and thus no redraw
          this.drawColorFieldAndSlider();
        }
      }
    } else if (region === "slider") {
      const sliderThumbColor = this.baseColorFieldColor.hsv().saturationv(100).value(100);

      const prevSliderThumbState = this.sliderThumbState;
      const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / slider.width));
      const sliderThumbCenterY =
        Math.round((slider.height + this.getSliderCapSpacing()) / 2) + colorField.height;

      const hoveringSliderThumb = this.containsPoint(
        offsetX,
        offsetY,
        sliderThumbCenterX,
        sliderThumbCenterY,
        thumb.radius
      );

      let sliderThumbTransitionedBetweenHoverAndIdle = false;

      if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
        this.sliderThumbState = "hover";
        sliderThumbTransitionedBetweenHoverAndIdle = true;
      } else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
        this.sliderThumbState = "idle";
        sliderThumbTransitionedBetweenHoverAndIdle = true;
      }

      if (this.sliderThumbState !== "drag") {
        if (sliderThumbTransitionedBetweenHoverAndIdle) {
          // refresh since we won't update color and thus no redraw
          this.drawColorFieldAndSlider();
        }
      }
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);

    return focusElement(this.colorFieldScopeNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);

    const { allowEmpty, color, format, value } = this;

    const willSetNoColor = allowEmpty && !value;
    const parsedMode = parseMode(value);
    const valueIsCompatible =
      willSetNoColor || (format === "auto" && parsedMode) || format === parsedMode;
    const initialColor = willSetNoColor ? null : valueIsCompatible ? Color(value) : color;

    if (!valueIsCompatible) {
      this.showIncompatibleColorWarning(value, format);
    }

    this.setMode(format, false, false);
    this.internalColorSet(initialColor, false, "initial");

    this.updateDimensions(this.scale);

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }

    await setUpMessages(this);
  }

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    document.removeEventListener("pointermove", this.globalPointerMoveHandler);
    document.removeEventListener("pointerup", this.globalPointerUpHandler);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const {
      alphaEnabled,
      allowEmpty,
      channelsDisabled,
      color,
      intlDeleteColor,
      hexDisabled,
      hideHex,
      hideChannels,
      hideSaved,
      intlHex,
      intlSaved,
      intlSaveColor,
      savedColors,
      savedDisabled,
      scale
    } = this;
    const selectedColorInHex = color ? hexify(color, alphaEnabled) : null;
    const hexInputScale = scale === "l" ? "m" : "s";
    const {
      colorFieldAndSliderInteractive,
      colorFieldScopeTop,
      colorFieldScopeLeft,
      hueScopeLeft,
      hueScopeTop,
      scopeOrientation,
      dimensions: {
        colorField: { height: colorFieldHeight, width: colorFieldWidth },
        slider: { height: sliderHeight }
      }
    } = this;
    const hueTop = hueScopeTop ?? sliderHeight / 2 + colorFieldHeight;
    const hueLeft = hueScopeLeft ?? (colorFieldWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
    const noColor = color === null;
    const vertical = scopeOrientation === "vertical";
    const noHex = hexDisabled || hideHex;
    const noChannels = channelsDisabled || hideChannels;
    const noSaved = savedDisabled || hideSaved;

    return (
      <div class={CSS.container}>
        <div class={CSS.colorFieldAndSliderWrap}>
          <canvas
            class={{
              [CSS.colorFieldAndSlider]: true,
              [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
            }}
            onPointerDown={this.handleColorFieldAndSliderPointerDown}
            onPointerEnter={this.handleColorFieldAndSliderPointerEnterOrMove}
            onPointerLeave={this.handleColorFieldAndSliderPointerLeave}
            onPointerMove={this.handleColorFieldAndSliderPointerEnterOrMove}
            ref={this.initColorFieldAndSlider}
          />
          <div
            aria-label={vertical ? messages.value : messages.saturation}
            aria-valuemax={vertical ? HSV_LIMITS.v : HSV_LIMITS.s}
            aria-valuemin="0"
            aria-valuenow={(vertical ? color?.saturationv() : color?.value()) || "0"}
            class={{ [CSS.scope]: true, [CSS.colorFieldScope]: true }}
            onKeyDown={this.handleColorFieldScopeKeyDown}
            ref={this.storeColorFieldScope}
            role="slider"
            style={{ top: `${colorFieldScopeTop || 0}px`, left: `${colorFieldScopeLeft || 0}px` }}
            tabindex="0"
          />
          <div
            aria-label={messages.hue}
            aria-valuemax={HSV_LIMITS.h}
            aria-valuemin="0"
            aria-valuenow={color?.round().hue() || DEFAULT_COLOR.round().hue()}
            class={{ [CSS.scope]: true, [CSS.hueScope]: true }}
            onKeyDown={this.handleHueScopeKeyDown}
            ref={this.storeHueScope}
            role="slider"
            style={{ top: `${hueTop}px`, left: `${hueLeft}px` }}
            tabindex="0"
          />
        </div>
        {noHex && noChannels ? null : (
          <div
            class={{
              [CSS.controlSection]: true,
              [CSS.section]: true
            }}
          >
            <div class={CSS.hexAndChannelsGroup}>
              {noHex ? null : (
                <div class={CSS.hexOptions}>
                  <span
                    class={{
                      [CSS.header]: true,
                      [CSS.headerSpaced]: true
                    }}
                  >
                    {intlHex}
                  </span>
                  <calcite-color-picker-hex-input
                    allowEmpty={allowEmpty}
                    alphaEnabled={alphaEnabled}
                    class={CSS.control}
                    numberingSystem={this.numberingSystem}
                    onCalciteColorPickerHexInputChange={this.handleHexInputChange}
                    scale={hexInputScale}
                    value={selectedColorInHex}
                  />
                </div>
              )}
              {noChannels ? null : (
                <calcite-tabs
                  class={{
                    [CSS.colorModeContainer]: true,
                    [CSS.splitSection]: true
                  }}
                  scale={hexInputScale}
                >
                  <calcite-tab-nav slot="tab-nav">
                    {this.renderChannelsTabTitle("rgb")}
                    {this.renderChannelsTabTitle("hsv")}
                  </calcite-tab-nav>
                  {this.renderChannelsTab("rgb")}
                  {this.renderChannelsTab("hsv")}
                </calcite-tabs>
              )}
            </div>
            {alphaEnabled ? this.renderOpacitySection() : null}
        )}
        {noSaved ? null : (
          <div class={{ [CSS.savedColorsSection]: true, [CSS.section]: true }}>
            <div class={CSS.header}>
              <label>{messages.saved}</label>
              <div class={CSS.savedColorsButtons}>
                <calcite-button
                  appearance="transparent"
                  class={CSS.deleteColor}
                  color="neutral"
                  disabled={noColor}
                  iconStart="minus"
                  label={messages.deleteColor}
                  onClick={this.deleteColor}
                  scale={hexInputScale}
                  type="button"
                />
                <calcite-button
                  appearance="transparent"
                  class={CSS.saveColor}
                  color="neutral"
                  disabled={noColor}
                  iconStart="plus"
                  label={messages.saveColor}
                  onClick={this.saveColor}
                  scale={hexInputScale}
                  type="button"
                />
              </div>
            </div>
            {savedColors.length > 0 ? (
              <div class={CSS.savedColors}>
                {[
                  ...savedColors.map((color) => (
                    <calcite-color-picker-swatch
                      active={selectedColorInHex === color}
                      class={CSS.savedColor}
                      color={color}
                      key={color}
                      onClick={this.handleSavedColorSelect}
                      onKeyDown={this.handleSavedColorKeyDown}
                      scale={scale}
                      tabIndex={0}
                    />
                  ))
                ]}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  private renderOpacitySection(): VNode {
    const { color, intlOpacity, previousColor } = this;
    const sliderOpacity = alphaToOpacity((color ? color : previousColor).alpha()); // slider keeps previous alpha when null
    const inputOpacity = color ? alphaToOpacity(color.alpha()).toString() : undefined;

    return (
      <div class={CSS.hexOptions} key="opacity">
        <span
          class={{
            [CSS.header]: true,
            [CSS.headerSpaced]: true
          }}
        >
          {intlOpacity}
        </span>
        <div class={CSS.opacityControlGroup}>
          <calcite-slider
            aria-label={intlOpacity}
            class={CSS.opacitySlider}
            max={100}
            min={0}
            onCalciteSliderInput={this.handleOpacitySliderInput}
            step={1}
            value={sliderOpacity}
          />
          <calcite-input
            aria-label={intlOpacity}
            class={CSS.opacityInput}
            max={100}
            min={0}
            numberButtonType="none"
            onCalciteInputChange={this.handleOpacityInputChange}
            onCalciteInputInput={this.handleOpacityInputInput}
            scale={this.scale === "l" ? "m" : "s"}
            step={1}
            suffixText="%"
            type="number"
            value={inputOpacity}
          />
        </div>
      </div>
    );
  }

  private storeColorFieldScope = (node: HTMLDivElement): void => {
    this.colorFieldScopeNode = node;
  };

  private storeHueScope = (node: HTMLDivElement): void => {
    this.hueScopeNode = node;
  };

  private renderChannelsTabTitle = (channelMode: this["channelMode"]): VNode => {
    const { channelMode: activeChannelMode, messages } = this;
    const selected = channelMode === activeChannelMode;
    const label = channelMode === "rgb" ? messages.rgb : messages.hsv;

    return (
      <calcite-tab-title
        class={CSS.colorMode}
        data-color-mode={channelMode}
        key={channelMode}
        onCalciteTabsActivate={this.handleTabActivate}
        selected={selected}
      >
        {label}
      </calcite-tab-title>
    );
  };

  private renderChannelsTab = (channelMode: this["channelMode"]): VNode => {
    const { channelMode: activeChannelMode, channels, messages } = this;
    const selected = channelMode === activeChannelMode;
    const isRgb = channelMode === "rgb";
    const channelLabels = isRgb
      ? [messages.r, messages.g, messages.b]
      : [messages.h, messages.s, messages.v];
    const channelAriaLabels = isRgb
      ? [messages.red, messages.green, messages.blue]
      : [messages.hue, messages.saturation, messages.value];
    const direction = getElementDir(this.el);

    return (
      <calcite-tab class={CSS.control} key={channelMode} selected={selected}>
        {/* channel order should not be mirrored */}
        <div class={CSS.channels} dir="ltr">
          {channels.map((channel, index) =>
            /* the channel container is ltr, so we apply the host's direction */
            this.renderChannel(
              channel,
              index,
              channelLabels[index],
              channelAriaLabels[index],
              direction
            )
          )}
        </div>
      </calcite-tab>
    );
  };

  private renderChannel = (
    value: number | null,
    index: number,
    label: string,
    ariaLabel: string,
    direction: Direction
  ): VNode => (
    <calcite-input
      class={CSS.channel}
      data-channel-index={index}
      dir={direction}
      label={ariaLabel}
      lang={this.effectiveLocale}
      numberButtonType="none"
      numberingSystem={this.numberingSystem}
      onCalciteInputChange={this.handleChannelChange}
      onCalciteInputInput={this.handleChannelInput}
      onKeyDown={this.handleKeyDown}
      prefixText={label}
      scale={this.scale === "l" ? "m" : "s"}
      type="number"
      value={value?.toString()}
    />
  );

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  private showIncompatibleColorWarning(value: ColorValue, format: Format): void {
    console.warn(
      `ignoring color value (${value}) as it is not compatible with the current format (${format})`
    );
  }

  private setMode(format: ColorPicker["format"], _force = false, warn = true): void {
    const mode = format === "auto" ? this.mode : format;
    this.mode = this.ensureCompatibleMode(mode, warn);
  }

  private ensureCompatibleMode(mode: SupportedMode, warn): SupportedMode {
    const { alphaEnabled } = this;
    const isAlphaCompatible = alphaCompatible(mode);

    if (alphaEnabled && !isAlphaCompatible) {
      const alphaMode = toAlphaMode(mode);

      if (warn) {
        console.warn(
          `setting format to (${alphaMode}) as the provided one (${mode}) does not support alpha`
        );
      }

      return alphaMode;
    }

    if (!alphaEnabled && isAlphaCompatible) {
      const nonAlphaMode = toNonAlphaMode(mode);

      if (warn) {
        console.warn(
          `setting format to (${nonAlphaMode}) as the provided one (${mode}) does not support alpha`
        );
      }

      return nonAlphaMode;
    }

    return mode;
  }

  private captureHueSliderColor(x: number): void {
    const {
      dimensions: {
        slider: { width }
      }
    } = this;
    const hue = (360 / width) * x;

    this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
  }

  private getCanvasRegion(y: number): "color-field" | "slider" | "none" {
    const {
      dimensions: {
        colorField: { height: colorFieldHeight },
        slider: { height: sliderHeight }
      }
    } = this;

    if (y <= colorFieldHeight) {
      return "color-field";
    }

    if (y <= colorFieldHeight + sliderHeight) {
      return "slider";
    }

    return "none";
  }

  private internalColorSet(
    color: Color | null,
    skipEqual = true,
    context: ColorPicker["internalColorUpdateContext"] = "user-interaction"
  ): void {
    if (skipEqual && colorEqual(color, this.color)) {
      return;
    }

    this.internalColorUpdateContext = context;
    this.color = color;
    this.value = this.toValue(color);
    this.internalColorUpdateContext = null;
  }

  private toValue(color: Color | null, format: SupportedMode = this.mode): ColorValue | null {
    if (!color) {
      return null;
    }

    const hexMode = "hex";

    if (format.includes(hexMode)) {
      const hasAlpha = format === CSSColorMode.HEXA;
      return normalizeHex(hexify(color.round(), hasAlpha), hasAlpha);
    }

    if (format.includes("-css")) {
      return color[format.replace("-css", "").replace("a", "")]().round().string();
    }

    const colorObject =
      /* Color() does not support hsva, hsla nor rgba, so we use the non-alpha mode */
      color[toNonAlphaMode(format)]().round().object();

    if (format.endsWith("a")) {
      return normalizeAlpha(colorObject);
    }

    return colorObject;
  }

  private getSliderCapSpacing(): number {
    const {
      dimensions: {
        slider: { height },
        thumb: { radius }
      }
    } = this;

    return radius * 2 - height;
  }

  private updateDimensions(scale: Scale = "m"): void {
    this.dimensions = DIMENSIONS[scale];
  }

  private deleteColor = (): void => {
    const colorToDelete = hexify(this.color, this.alphaEnabled);
    const inStorage = this.savedColors.indexOf(colorToDelete) > -1;

    if (!inStorage) {
      return;
    }

    const savedColors = this.savedColors.filter((color) => color !== colorToDelete);

    this.savedColors = savedColors;

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId) {
      localStorage.setItem(storageKey, JSON.stringify(savedColors));
    }
  };

  private saveColor = (): void => {
    const colorToSave = hexify(this.color, this.alphaEnabled);
    const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;

    if (alreadySaved) {
      return;
    }

    const savedColors = [...this.savedColors, colorToSave];

    this.savedColors = savedColors;

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId) {
      localStorage.setItem(storageKey, JSON.stringify(savedColors));
    }
  };

  private drawColorFieldAndSlider = throttle((): void => {
    if (!this.fieldAndSliderRenderingContext) {
      return;
    }

    this.drawColorField();
    this.drawHueSlider();
  }, throttleFor60FpsInMs);

  private drawColorField(): void {
    const context = this.fieldAndSliderRenderingContext;
    const {
      dimensions: {
        colorField: { height, width }
      }
    } = this;

    context.fillStyle = this.baseColorFieldColor
      .hsv()
      .saturationv(100)
      .value(100)
      .alpha(1)
      .string();
    context.fillRect(0, 0, width, height);

    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);

    const blackGradient = context.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);

    this.drawActiveColorFieldColor();
  }

  private setCanvasContextSize(
    canvas: HTMLCanvasElement,
    { height, width }: { height: number; width: number }
  ): void {
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;

    const context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);
  }

  private captureColorFieldColor = (x: number, y: number, skipEqual = true): void => {
    const {
      dimensions: {
        colorField: { height, width }
      }
    } = this;
    const saturation = Math.round((HSV_LIMITS.s / width) * x);
    const value = Math.round((HSV_LIMITS.v / height) * (height - y));

    this.internalColorSet(
      this.baseColorFieldColor.hsv().saturationv(saturation).value(value),
      skipEqual
    );
  };

  private initColorFieldAndSlider = (canvas: HTMLCanvasElement): void => {
    this.fieldAndSliderRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize(canvas);
  };

  private updateCanvasSize(canvas: HTMLCanvasElement) {
    if (!canvas) {
      return;
    }

    this.setCanvasContextSize(canvas, {
      width: this.dimensions.colorField.width,
      height:
        this.dimensions.colorField.height +
        this.dimensions.slider.height +
        this.getSliderCapSpacing() * 2
    });

    this.drawColorFieldAndSlider();
  }

  private containsPoint(
    testPointX: number,
    testPointY: number,
    boundsX: number,
    boundsY: number,
    boundsRadius: number
  ): boolean {
    return (
      Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
      Math.pow(boundsRadius, 2)
    );
  }

  private drawActiveColorFieldColor(): void {
    const { color } = this;

    if (!color) {
      return;
    }

    const hsvColor = color.hsv();

    const {
      dimensions: {
        colorField: { height, width },
        thumb: { radius }
      }
    } = this;

    const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (HSV_LIMITS.v / height);

    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = x;
      this.colorFieldScopeTop = y;
    });

    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, hsvColor, this.hueThumbState);
  }

  private drawThumb(
    context: CanvasRenderingContext2D,
    radius: number,
    x: number,
    y: number,
    color: Color,
    state: "idle" | "hover" | "drag"
  ): void {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.shadowBlur = state === "hover" ? 32 : 16;
    context.shadowColor = `rgba(0, 0, 0, ${state === "drag" ? 0.32 : 0.16})`;
    context.fillStyle = "#fff";
    context.fill();

    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
    context.fillStyle = color.rgb().alpha(1).string();
    context.fill();
  }

  private drawActiveHueSliderColor(): void {
    const { color } = this;

    if (!color) {
      return;
    }

    const hsvColor = color.hsv().saturationv(100).value(100);

    const {
      dimensions: {
        colorField: { height: colorFieldHeight },
        slider: { height, width },
        thumb: { radius }
      }
    } = this;

    const x = hsvColor.hue() / (360 / width);
    const y = height / 2 + colorFieldHeight;

    requestAnimationFrame(() => {
      this.hueScopeLeft = x;
      this.hueScopeTop = y;
    });

    this.drawThumb(
      this.fieldAndSliderRenderingContext,
      radius,
      x,
      y,
      hsvColor,
      this.sliderThumbState
    );
  }

  private drawHueSlider(): void {
    const context = this.fieldAndSliderRenderingContext;
    const {
      dimensions: {
        colorField: { height: colorFieldHeight },
        slider: { height, width }
      }
    } = this;

    const gradient = context.createLinearGradient(0, 0, width, 0);

    const hueSliderColorStopKeywords = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"];

    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;

    hueSliderColorStopKeywords.forEach((keyword) => {
      gradient.addColorStop(currentOffset, Color(keyword).string());
      currentOffset += offset;
    });

    context.fillStyle = gradient;
    context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
    context.fillRect(0, colorFieldHeight, width, height);

    this.drawActiveHueSliderColor();
  }

  private updateColorFromChannels(channels: this["channels"]): void {
    this.internalColorSet(
      Color(
        this.alphaEnabled && this.color ? [...channels, this.color.alpha()] : channels,
        this.channelMode
      )
    );
  }

  private updateChannelsFromColor(color: Color | null): void {
    this.channels = color ? this.toChannels(color) : [null, null, null];
  }

  private toChannels(color: Color): [number, number, number] {
    const { channelMode } = this;

    return color[channelMode]()
      .array()
      .slice(0, 3) // drop any alpha channel value since we have a slider for that
      .map((value) => Math.floor(value)) as [number, number, number];
  }
}
