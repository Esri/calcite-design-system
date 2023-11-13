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
  Watch,
} from "@stencil/core";

import Color from "color";
import { Channels, ColorMode, ColorValue, HSLA, HSVA, InternalColor, RGBA } from "./interfaces";
import { throttle } from "lodash-es";
import { Direction, getElementDir, isPrimaryPointerButton } from "../../utils/dom";
import { Scale } from "../interfaces";
import {
  CSS,
  DEFAULT_COLOR,
  DEFAULT_STORAGE_KEY_PREFIX,
  DIMENSIONS,
  HSV_LIMITS,
  HUE_LIMIT_CONSTRAINED,
  OPACITY_LIMITS,
  RGB_LIMITS,
  SCOPE_SIZE,
} from "./resources";
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
  toNonAlphaMode,
} from "./utils";

import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
} from "../../utils/locale";
import { clamp, closeToRangeEdge, remap } from "../../utils/math";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ColorPickerMessages } from "./assets/color-picker/t9n";

const throttleFor60FpsInMs = 16;

@Component({
  tag: "calcite-color-picker",
  styleUrl: "color-picker.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class ColorPicker
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, an empty color (`null`) will be allowed as a `value`. When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`.
   */
  @Prop({ reflect: true }) allowEmpty = false;

  /**
   * When true, the component will allow updates to the color's alpha value.
   */
  @Prop() alphaChannel = false;

  @Watch("alphaChannel")
  handleAlphaChannelChange(alphaChannel: boolean): void {
    const { format } = this;

    if (alphaChannel && format !== "auto" && !alphaCompatible(format)) {
      console.warn(
        `ignoring alphaChannel as the current format (${format}) does not support alpha`
      );
      this.alphaChannel = false;
    }
  }

  /** When true, hides the RGB/HSV channel inputs */
  @Prop() channelsDisabled = false;

  /**
   * Internal prop for advanced use-cases.
   *
   * @internal
   */
  @Prop({ mutable: true }) color: InternalColor | null = DEFAULT_COLOR;

  @Watch("color")
  handleColorChange(color: Color | null, oldColor: Color | null): void {
    this.drawColorControls();
    this.updateChannelsFromColor(color);
    this.previousColor = oldColor;
  }

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

  @Watch("alphaChannel")
  @Watch("format")
  handleFormatOrAlphaChannelChange(): void {
    this.setMode(this.format);
    this.internalColorSet(this.color, false, "internal");
  }

  /**
   * When `true`, hides the RGB/HSV channel inputs.
   *
   * @deprecated use `channelsDisabled` instead
   */
  @Prop({ reflect: true }) hideChannels = false;

  /** When true, hides the hex input */
  @Prop() hexDisabled = false;

  /**
   * When `true`, hides the hex input.
   *
   * @deprecated use `hexDisabled` instead
   */
  @Prop({ reflect: true }) hideHex = false;

  /**
   * When `true`, hides the saved colors section.
   *
   * @deprecated use `savedDisabled` instead
   */
  @Prop({ reflect: true }) hideSaved = false;

  /** When true, hides the saved colors section */
  @Prop({ reflect: true }) savedDisabled = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  handleScaleChange(scale: Scale = "m"): void {
    this.updateDimensions(scale);
    this.updateCanvasSize("all");
    this.drawColorControls();
  }

  /** Specifies the storage ID for colors. */
  @Prop({ reflect: true }) storageId: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ColorPickerMessages>;

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
   * @see [ColorValue](https://github.com/Esri/calcite-design-system/blob/main/src/components/color-picker/interfaces.ts#L10)
   */
  @Prop({ mutable: true }) value: ColorValue | null = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaChannel)
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
      this.setMode(nextMode, this.internalColorUpdateContext === null);
    }

    const dragging = this.activeCanvasInfo;

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
      this.internalColorSet(
        color,
        this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css")),
        "internal"
      );
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerElement;

  private activeCanvasInfo: {
    context: CanvasRenderingContext2D;
    bounds: DOMRect;
  };

  private get baseColorFieldColor(): Color {
    return this.color || this.previousColor || DEFAULT_COLOR;
  }

  private checkerPattern: HTMLCanvasElement;

  private colorFieldRenderingContext: CanvasRenderingContext2D;

  private colorFieldScopeNode: HTMLDivElement;

  private hueSliderRenderingContext: CanvasRenderingContext2D;

  private hueScopeNode: HTMLDivElement;

  private internalColorUpdateContext: "internal" | "initial" | "user-interaction" | null = null;

  private mode: SupportedMode = CSSColorMode.HEX;

  private opacityScopeNode: HTMLDivElement;

  private opacitySliderRenderingContext: CanvasRenderingContext2D;

  private previousColor: InternalColor | null;

  private shiftKeyChannelAdjustment = 0;

  @State() defaultMessages: ColorPickerMessages;

  @State() channelMode: ColorMode = "rgb";

  @State() channels: Channels = this.toChannels(DEFAULT_COLOR);

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
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ColorPickerMessages;

  @State() savedColors: string[] = [];

  @State() colorFieldScopeTop: number;

  @State() colorFieldScopeLeft: number;

  @State() hueScopeLeft: number;

  @State() opacityScopeLeft: number;

  @State() scopeOrientation: "vertical" | "horizontal";

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
      ArrowLeft: { x: -10, y: 0 },
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
      ArrowLeft: -1,
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
    const input = event.currentTarget as HTMLCalciteInputNumberElement;
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const isAlphaChannel = channelIndex === 3;

    const limit = isAlphaChannel
      ? OPACITY_LIMITS.max
      : this.channelMode === "rgb"
      ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
      : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];

    let inputValue: string;

    if (this.allowEmpty && !input.value) {
      inputValue = "";
    } else {
      const value = Number(input.value);
      const adjustedValue = value + this.shiftKeyChannelAdjustment;
      const clamped = clamp(adjustedValue, 0, limit);

      inputValue = clamped.toString();
    }

    input.value = inputValue;
  };

  // using @Listen as a workaround for VDOM listener not firing
  @Listen("keydown", { capture: true })
  @Listen("keyup", { capture: true })
  protected handleChannelKeyUpOrDown(event: KeyboardEvent): void {
    this.shiftKeyChannelAdjustment = 0;
    const { key } = event;

    if (
      (key !== "ArrowUp" && key !== "ArrowDown") ||
      !event.composedPath().some((node: HTMLElement) => node.classList?.contains(CSS.channel))
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
    const input = event.currentTarget as HTMLCalciteInputNumberElement;
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const channels = [...this.channels] as this["channels"];

    const shouldClearChannels = this.allowEmpty && !input.value;

    if (shouldClearChannels) {
      this.channels = [null, null, null, null];
      this.internalColorSet(null);
      return;
    }

    const isAlphaChannel = channelIndex === 3;
    const value = Number(input.value);

    channels[channelIndex] = isAlphaChannel ? opacityToAlpha(value) : value;
    this.updateColorFromChannels(channels);
  };

  private handleSavedColorKeyDown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.handleSavedColorSelect(event);
    }
  };

  private handleColorFieldPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const { offsetX, offsetY } = event;

    document.addEventListener("pointermove", this.globalPointerMoveHandler);
    document.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });

    this.activeCanvasInfo = {
      context: this.colorFieldRenderingContext,
      bounds: this.colorFieldRenderingContext.canvas.getBoundingClientRect(),
    };
    this.captureColorFieldColor(offsetX, offsetY);
    this.colorFieldScopeNode.focus();
  };

  private handleHueSliderPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const { offsetX } = event;

    document.addEventListener("pointermove", this.globalPointerMoveHandler);
    document.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });

    this.activeCanvasInfo = {
      context: this.hueSliderRenderingContext,
      bounds: this.hueSliderRenderingContext.canvas.getBoundingClientRect(),
    };
    this.captureHueSliderColor(offsetX);
    this.hueScopeNode.focus();
  };

  private handleOpacitySliderPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const { offsetX } = event;

    document.addEventListener("pointermove", this.globalPointerMoveHandler);
    document.addEventListener("pointerup", this.globalPointerUpHandler, { once: true });

    this.activeCanvasInfo = {
      context: this.opacitySliderRenderingContext,
      bounds: this.opacitySliderRenderingContext.canvas.getBoundingClientRect(),
    };
    this.captureOpacitySliderValue(offsetX);
    this.opacityScopeNode.focus();
  };

  private globalPointerUpHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const previouslyDragging = this.activeCanvasInfo;
    this.activeCanvasInfo = null;
    this.drawColorControls();

    if (previouslyDragging) {
      this.calciteColorPickerChange.emit();
    }
  };

  private globalPointerMoveHandler = (event: PointerEvent): void => {
    const { activeCanvasInfo, el } = this;

    if (!el.isConnected || !activeCanvasInfo) {
      return;
    }

    const { context, bounds } = activeCanvasInfo;

    let samplingX: number;
    let samplingY: number;

    const { clientX, clientY } = event;

    if (context.canvas.matches(":hover")) {
      samplingX = clientX - bounds.x;
      samplingY = clientY - bounds.y;
    } else {
      // snap x and y to the closest edge

      if (clientX < bounds.x + bounds.width && clientX > bounds.x) {
        samplingX = clientX - bounds.x;
      } else if (clientX < bounds.x) {
        samplingX = 0;
      } else {
        samplingX = bounds.width;
      }

      if (clientY < bounds.y + bounds.height && clientY > bounds.y) {
        samplingY = clientY - bounds.y;
      } else if (clientY < bounds.y) {
        samplingY = 0;
      } else {
        samplingY = bounds.height;
      }
    }

    if (context === this.colorFieldRenderingContext) {
      this.captureColorFieldColor(samplingX, samplingY, false);
    } else if (context === this.hueSliderRenderingContext) {
      this.captureHueSliderColor(samplingX);
    } else if (context === this.opacitySliderRenderingContext) {
      this.captureOpacitySliderValue(samplingX);
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
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

    this.setMode(format, false);
    this.internalColorSet(initialColor, false, "initial");

    this.updateDimensions(this.scale);

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }

    await setUpMessages(this);
  }

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    document.removeEventListener("pointermove", this.globalPointerMoveHandler);
    document.removeEventListener("pointerup", this.globalPointerUpHandler);
    disconnectInteractive(this);
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
      allowEmpty,
      channelsDisabled,
      color,
      colorFieldScopeLeft,
      colorFieldScopeTop,
      dimensions: {
        slider: { width: sliderWidth },
        thumb: { radius: thumbRadius },
      },
      hexDisabled,
      hideChannels,
      hideHex,
      hideSaved,
      hueScopeLeft,
      messages,
      alphaChannel,
      opacityScopeLeft,
      savedColors,
      savedDisabled,
      scale,
      scopeOrientation,
    } = this;
    const selectedColorInHex = color ? hexify(color, alphaChannel) : null;
    const hueTop = thumbRadius;
    const hueLeft = hueScopeLeft ?? (sliderWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
    const opacityTop = thumbRadius;
    const opacityLeft =
      opacityScopeLeft ??
      (sliderWidth * alphaToOpacity(DEFAULT_COLOR.alpha())) / OPACITY_LIMITS.max;
    const noColor = color === null;
    const vertical = scopeOrientation === "vertical";
    const noHex = hexDisabled || hideHex;
    const noChannels = channelsDisabled || hideChannels;
    const noSaved = savedDisabled || hideSaved;
    const [adjustedColorFieldScopeLeft, adjustedColorFieldScopeTop] = this.getAdjustedScopePosition(
      colorFieldScopeLeft,
      colorFieldScopeTop
    );
    const [adjustedHueScopeLeft, adjustedHueScopeTop] = this.getAdjustedScopePosition(
      hueLeft,
      hueTop
    );
    const [adjustedOpacityScopeLeft, adjustedOpacityScopeTop] = this.getAdjustedScopePosition(
      opacityLeft,
      opacityTop
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          <div class={CSS.controlAndScope}>
            <canvas
              class={CSS.colorField}
              onPointerDown={this.handleColorFieldPointerDown}
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.initColorField}
            />
            <div
              aria-label={vertical ? messages.value : messages.saturation}
              aria-valuemax={vertical ? HSV_LIMITS.v : HSV_LIMITS.s}
              aria-valuemin="0"
              aria-valuenow={(vertical ? color?.saturationv() : color?.value()) || "0"}
              class={{ [CSS.scope]: true, [CSS.colorFieldScope]: true }}
              onKeyDown={this.handleColorFieldScopeKeyDown}
              role="slider"
              style={{
                top: `${adjustedColorFieldScopeTop || 0}px`,
                left: `${adjustedColorFieldScopeLeft || 0}px`,
              }}
              tabindex="0"
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.storeColorFieldScope}
            />
          </div>
          <div class={CSS.previewAndSliders}>
            <calcite-color-picker-swatch class={CSS.preview} color={selectedColorInHex} scale="l" />
            <div class={CSS.sliders}>
              <div class={CSS.controlAndScope}>
                <canvas
                  class={{ [CSS.slider]: true, [CSS.hueSlider]: true }}
                  onPointerDown={this.handleHueSliderPointerDown}
                  // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                  ref={this.initHueSlider}
                />
                <div
                  aria-label={messages.hue}
                  aria-valuemax={HSV_LIMITS.h}
                  aria-valuemin="0"
                  aria-valuenow={color?.round().hue() || DEFAULT_COLOR.round().hue()}
                  class={{ [CSS.scope]: true, [CSS.hueScope]: true }}
                  onKeyDown={this.handleHueScopeKeyDown}
                  role="slider"
                  style={{
                    top: `${adjustedHueScopeTop}px`,
                    left: `${adjustedHueScopeLeft}px`,
                  }}
                  tabindex="0"
                  // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                  ref={this.storeHueScope}
                />
              </div>
              {alphaChannel ? (
                <div class={CSS.controlAndScope}>
                  <canvas
                    class={{ [CSS.slider]: true, [CSS.opacitySlider]: true }}
                    onPointerDown={this.handleOpacitySliderPointerDown}
                    // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                    ref={this.initOpacitySlider}
                  />
                  <div
                    aria-label={messages.opacity}
                    aria-valuemax={OPACITY_LIMITS.max}
                    aria-valuemin={OPACITY_LIMITS.min}
                    aria-valuenow={(color || DEFAULT_COLOR).round().alpha()}
                    class={{ [CSS.scope]: true, [CSS.opacityScope]: true }}
                    onKeyDown={this.handleOpacityScopeKeyDown}
                    role="slider"
                    style={{
                      top: `${adjustedOpacityScopeTop}px`,
                      left: `${adjustedOpacityScopeLeft}px`,
                    }}
                    tabindex="0"
                    // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                    ref={this.storeOpacityScope}
                  />
                </div>
              ) : null}
            </div>
          </div>
          {noHex && noChannels ? null : (
            <div
              class={{
                [CSS.controlSection]: true,
                [CSS.section]: true,
              }}
            >
              <div class={CSS.hexAndChannelsGroup}>
                {noHex ? null : (
                  <div class={CSS.hexOptions}>
                    <calcite-color-picker-hex-input
                      allowEmpty={allowEmpty}
                      alphaChannel={alphaChannel}
                      class={CSS.control}
                      messages={messages}
                      numberingSystem={this.numberingSystem}
                      onCalciteColorPickerHexInputChange={this.handleHexInputChange}
                      scale={scale}
                      value={selectedColorInHex}
                    />
                  </div>
                )}
                {noChannels ? null : (
                  <calcite-tabs
                    class={{
                      [CSS.colorModeContainer]: true,
                      [CSS.splitSection]: true,
                    }}
                    scale={scale === "l" ? "m" : "s"}
                  >
                    <calcite-tab-nav slot="title-group">
                      {this.renderChannelsTabTitle("rgb")}
                      {this.renderChannelsTabTitle("hsv")}
                    </calcite-tab-nav>
                    {this.renderChannelsTab("rgb")}
                    {this.renderChannelsTab("hsv")}
                  </calcite-tabs>
                )}
              </div>
            </div>
          )}
          {noSaved ? null : (
            <div class={{ [CSS.savedColorsSection]: true, [CSS.section]: true }}>
              <div class={CSS.header}>
                <label>{messages.saved}</label>
                <div class={CSS.savedColorsButtons}>
                  <calcite-button
                    appearance="transparent"
                    class={CSS.deleteColor}
                    disabled={noColor}
                    iconStart="minus"
                    kind="neutral"
                    label={messages.deleteColor}
                    onClick={this.deleteColor}
                    scale={scale}
                    type="button"
                  />
                  <calcite-button
                    appearance="transparent"
                    class={CSS.saveColor}
                    disabled={noColor}
                    iconStart="plus"
                    kind="neutral"
                    label={messages.saveColor}
                    onClick={this.saveColor}
                    scale={scale}
                    type="button"
                  />
                </div>
              </div>
              {savedColors.length > 0 ? (
                <div class={CSS.savedColors}>
                  {[
                    ...savedColors.map((color) => (
                      <calcite-color-picker-swatch
                        class={CSS.savedColor}
                        color={color}
                        key={color}
                        onClick={this.handleSavedColorSelect}
                        onKeyDown={this.handleSavedColorKeyDown}
                        scale={scale}
                        tabIndex={0}
                      />
                    )),
                  ]}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </InteractiveContainer>
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
    const { allowEmpty, channelMode: activeChannelMode, channels, messages, alphaChannel } = this;
    const selected = channelMode === activeChannelMode;
    const isRgb = channelMode === "rgb";
    const channelAriaLabels = isRgb
      ? [messages.red, messages.green, messages.blue]
      : [messages.hue, messages.saturation, messages.value];
    const direction = getElementDir(this.el);
    const channelsToRender = alphaChannel ? channels : channels.slice(0, 3);

    return (
      <calcite-tab class={CSS.control} key={channelMode} selected={selected}>
        {/* channel order should not be mirrored */}
        <div class={CSS.channels} dir="ltr">
          {channelsToRender.map((channelValue, index) => {
            const isAlphaChannel = index === 3;

            if (isAlphaChannel) {
              channelValue =
                allowEmpty && !channelValue ? channelValue : alphaToOpacity(channelValue);
            }

            /* the channel container is ltr, so we apply the host's direction */
            return this.renderChannel(
              channelValue,
              index,
              channelAriaLabels[index],
              direction,
              isAlphaChannel ? "%" : ""
            );
          })}
        </div>
      </calcite-tab>
    );
  };

  private renderChannel = (
    value: number | null,
    index: number,
    ariaLabel: string,
    direction: Direction,
    suffix?: string
  ): VNode => {
    return (
      <calcite-input-number
        class={CSS.channel}
        data-channel-index={index}
        dir={direction}
        key={index}
        label={ariaLabel}
        lang={this.effectiveLocale}
        numberButtonType="none"
        numberingSystem={this.numberingSystem}
        onCalciteInputNumberChange={this.handleChannelChange}
        onCalciteInputNumberInput={this.handleChannelInput}
        onKeyDown={this.handleKeyDown}
        scale={this.scale === "l" ? "m" : "s"}
        // workaround to ensure input borders overlap as desired
        // this is because the build transforms margin-left to its
        // logical-prop, which is undesired as channels are always ltr
        style={{
          marginLeft:
            index > 0 && !(this.scale === "s" && this.alphaChannel && index === 3) ? "-1px" : "",
        }}
        suffixText={suffix}
        value={value?.toString()}
      />
    );
  };

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

  private setMode(format: ColorPicker["format"], warn = true): void {
    const mode = format === "auto" ? this.mode : format;
    this.mode = this.ensureCompatibleMode(mode, warn);
  }

  private ensureCompatibleMode(mode: SupportedMode, warn): SupportedMode {
    const { alphaChannel } = this;
    const isAlphaCompatible = alphaCompatible(mode);

    if (alphaChannel && !isAlphaCompatible) {
      const alphaMode = toAlphaMode(mode);

      if (warn) {
        console.warn(
          `setting format to (${alphaMode}) as the provided one (${mode}) does not support alpha`
        );
      }

      return alphaMode;
    }

    if (!alphaChannel && isAlphaCompatible) {
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
        slider: { width },
      },
    } = this;
    const hue = (HUE_LIMIT_CONSTRAINED / width) * x;

    this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
  }

  private captureOpacitySliderValue(x: number): void {
    const {
      dimensions: {
        slider: { width },
      },
    } = this;
    const alpha = opacityToAlpha((OPACITY_LIMITS.max / width) * x);

    this.internalColorSet(this.baseColorFieldColor.alpha(alpha), false);
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
      const value = color[format.replace("-css", "").replace("a", "")]().round().string();

      // Color omits alpha values when alpha is 1
      const needToInjectAlpha =
        (format.endsWith("a") || format.endsWith("a-css")) && color.alpha() === 1;
      if (needToInjectAlpha) {
        const model = value.slice(0, 3);
        const values = value.slice(4, -1);
        return `${model}a(${values}, ${color.alpha()})`;
      }

      return value;
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
        thumb: { radius },
      },
    } = this;

    return radius * 2 - height;
  }

  private updateDimensions(scale: Scale = "m"): void {
    this.dimensions = DIMENSIONS[scale];
  }

  private deleteColor = (): void => {
    const colorToDelete = hexify(this.color, this.alphaChannel);
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
    const colorToSave = hexify(this.color, this.alphaChannel);
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

  private drawColorControls = throttle(
    (type: "all" | "color-field" | "hue-slider" | "opacity-slider" = "all"): void => {
      if ((type === "all" || type === "color-field") && this.colorFieldRenderingContext) {
        this.drawColorField();
      }

      if ((type === "all" || type === "hue-slider") && this.hueSliderRenderingContext) {
        this.drawHueSlider();
      }

      if (
        this.alphaChannel &&
        (type === "all" || type === "opacity-slider") &&
        this.opacitySliderRenderingContext
      ) {
        this.drawOpacitySlider();
      }
    },
    throttleFor60FpsInMs
  );

  private drawColorField(): void {
    const context = this.colorFieldRenderingContext;
    const {
      dimensions: {
        colorField: { height, width },
      },
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
    if (!canvas) {
      return;
    }

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
        colorField: { height, width },
      },
    } = this;
    const saturation = Math.round((HSV_LIMITS.s / width) * x);
    const value = Math.round((HSV_LIMITS.v / height) * (height - y));

    this.internalColorSet(
      this.baseColorFieldColor.hsv().saturationv(saturation).value(value),
      skipEqual
    );
  };

  private initColorField = (canvas: HTMLCanvasElement): void => {
    this.colorFieldRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("color-field");
    this.drawColorControls();
  };

  private initHueSlider = (canvas: HTMLCanvasElement): void => {
    this.hueSliderRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("hue-slider");
    this.drawHueSlider();
  };

  private initOpacitySlider = (canvas: HTMLCanvasElement): void => {
    if (!canvas) {
      return;
    }

    this.opacitySliderRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("opacity-slider");
    this.drawOpacitySlider();
  };

  private updateCanvasSize(
    context: "all" | "color-field" | "hue-slider" | "opacity-slider" = "all"
  ): void {
    const { dimensions } = this;

    if (context === "all" || context === "color-field") {
      this.setCanvasContextSize(this.colorFieldRenderingContext?.canvas, dimensions.colorField);
    }

    const adjustedSliderDimensions = {
      width: dimensions.slider.width,
      height:
        dimensions.slider.height + (dimensions.thumb.radius - dimensions.slider.height / 2) * 2,
    };

    if (context === "all" || context === "hue-slider") {
      this.setCanvasContextSize(this.hueSliderRenderingContext?.canvas, adjustedSliderDimensions);
    }

    if (context === "all" || context === "opacity-slider") {
      this.setCanvasContextSize(
        this.opacitySliderRenderingContext?.canvas,
        adjustedSliderDimensions
      );
    }
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
        thumb: { radius },
      },
    } = this;

    const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (HSV_LIMITS.v / height);

    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = x;
      this.colorFieldScopeTop = y;
    });

    this.drawThumb(this.colorFieldRenderingContext, radius, x, y, hsvColor);
  }

  private drawThumb(
    context: CanvasRenderingContext2D,
    radius: number,
    x: number,
    y: number,
    color: Color
  ): void {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    const outlineWidth = 1;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.fillStyle = "#fff";
    context.fill();
    context.strokeStyle = "rgba(0,0,0,0.3)";
    context.lineWidth = outlineWidth;
    context.stroke();

    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
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
        slider: { width },
        thumb: { radius },
      },
    } = this;

    const x = hsvColor.hue() / (HUE_LIMIT_CONSTRAINED / width);
    const y = radius;
    const sliderBoundX = this.getSliderBoundX(x, width, radius);

    requestAnimationFrame(() => {
      this.hueScopeLeft = sliderBoundX;
    });

    this.drawThumb(this.hueSliderRenderingContext, radius, sliderBoundX, y, hsvColor);
  }

  private drawHueSlider(): void {
    const context = this.hueSliderRenderingContext;
    const {
      dimensions: {
        slider: { height, width },
        thumb: { radius: thumbRadius },
      },
    } = this;

    const x = 0;
    const y = thumbRadius - height / 2;

    const gradient = context.createLinearGradient(0, 0, width, 0);

    const hueSliderColorStopKeywords = [
      "red",
      "yellow",
      "lime",
      "cyan",
      "blue",
      "magenta",
      "#ff0004" /* 1 unit less than #ff0 to avoid duplicate values within range */,
    ];

    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;

    hueSliderColorStopKeywords.forEach((keyword) => {
      gradient.addColorStop(currentOffset, Color(keyword).string());
      currentOffset += offset;
    });

    context.clearRect(0, 0, width, height + this.getSliderCapSpacing() * 2);

    this.drawSliderPath(context, height, width, x, y);

    context.fillStyle = gradient;
    context.fill();

    context.strokeStyle = "rgba(0,0,0,0.3)";
    context.lineWidth = 1;
    context.stroke();

    this.drawActiveHueSliderColor();
  }

  private drawOpacitySlider(): void {
    const context = this.opacitySliderRenderingContext;
    const {
      baseColorFieldColor: previousColor,
      dimensions: {
        slider: { height, width },
        thumb: { radius: thumbRadius },
      },
    } = this;

    const x = 0;
    const y = thumbRadius - height / 2;

    context.clearRect(0, 0, width, height + this.getSliderCapSpacing() * 2);

    const gradient = context.createLinearGradient(0, y, width, 0);
    const startColor = previousColor.rgb().alpha(0);
    const midColor = previousColor.rgb().alpha(0.5);
    const endColor = previousColor.rgb().alpha(1);

    gradient.addColorStop(0, startColor.string());
    gradient.addColorStop(0.5, midColor.string());
    gradient.addColorStop(1, endColor.string());

    this.drawSliderPath(context, height, width, x, y);

    const pattern = context.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
    context.fillStyle = pattern;
    context.fill();

    context.fillStyle = gradient;
    context.fill();

    context.strokeStyle = "rgba(0,0,0,0.3)";
    context.lineWidth = 1;
    context.stroke();

    this.drawActiveOpacitySliderColor();
  }

  private drawSliderPath(
    context: CanvasRenderingContext2D,
    height: number,
    width: number,
    x: number,
    y: number
  ): void {
    const radius = height / 2 + 1;
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  private getCheckeredBackgroundPattern(): HTMLCanvasElement {
    if (this.checkerPattern) {
      return this.checkerPattern;
    }

    const pattern = document.createElement("canvas");
    pattern.width = 10;
    pattern.height = 10;
    const patternContext = pattern.getContext("2d");

    patternContext.fillStyle = "#ccc";
    patternContext.fillRect(0, 0, 10, 10);
    patternContext.fillStyle = "#fff";
    patternContext.fillRect(0, 0, 5, 5);
    patternContext.fillRect(5, 5, 5, 5);

    this.checkerPattern = pattern;

    return pattern;
  }

  private drawActiveOpacitySliderColor(): void {
    const { color } = this;

    if (!color) {
      return;
    }

    const hsvColor = color;

    const {
      dimensions: {
        slider: { width },
        thumb: { radius },
      },
    } = this;

    const x = alphaToOpacity(hsvColor.alpha()) / (OPACITY_LIMITS.max / width);
    const y = radius;
    const sliderBoundX = this.getSliderBoundX(x, width, radius);

    requestAnimationFrame(() => {
      this.opacityScopeLeft = sliderBoundX;
    });

    this.drawThumb(this.opacitySliderRenderingContext, radius, sliderBoundX, y, hsvColor);
  }

  private getSliderBoundX(x: number, width: number, radius: number): number {
    const closeToEdge = closeToRangeEdge(x, width, radius);

    return closeToEdge === 0
      ? x
      : closeToEdge === -1
      ? remap(x, 0, width, radius, radius * 2)
      : remap(x, 0, width, width - radius * 2, width - radius);
  }

  private storeOpacityScope = (node: HTMLDivElement): void => {
    this.opacityScopeNode = node;
  };

  private handleOpacityScopeKeyDown = (event: KeyboardEvent): void => {
    const modifier = event.shiftKey ? 10 : 1;
    const { key } = event;
    const arrowKeyToXOffset = {
      ArrowUp: 0.01,
      ArrowRight: 0.01,
      ArrowDown: -0.01,
      ArrowLeft: -0.01,
    };

    if (arrowKeyToXOffset[key]) {
      event.preventDefault();
      const delta = arrowKeyToXOffset[key] * modifier;
      const alpha = this.baseColorFieldColor.alpha();
      const color = this.baseColorFieldColor.alpha(alpha + delta);
      this.internalColorSet(color, false);
    }
  };

  private updateColorFromChannels(channels: this["channels"]): void {
    this.internalColorSet(Color(channels, this.channelMode));
  }

  private updateChannelsFromColor(color: Color | null): void {
    this.channels = color ? this.toChannels(color) : [null, null, null, null];
  }

  private toChannels(color: Color): Channels {
    const { channelMode } = this;

    const channels = color[channelMode]()
      .array()
      .map((value, index) => {
        const isAlpha = index === 3;
        return isAlpha ? value : Math.floor(value);
      });

    if (channels.length === 3) {
      channels.push(1); // Color omits alpha when 1
    }

    return channels as Channels;
  }

  private getAdjustedScopePosition(left: number, top: number): [number, number] {
    return [left - SCOPE_SIZE / 2, top - SCOPE_SIZE / 2];
  }
}
