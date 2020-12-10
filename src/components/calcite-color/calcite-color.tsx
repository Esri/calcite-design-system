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

import Color from "color";
import { ColorMode, ColorValue, InternalColor } from "../../interfaces/Color";
import { Scale, Theme } from "../../interfaces/common";
import {
  CSS,
  DEFAULT_COLOR,
  DEFAULT_STORAGE_KEY_PREFIX,
  DIMENSIONS,
  HSV_LIMITS,
  RGB_LIMITS,
  TEXT
} from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
import { colorEqual, CSSColorMode, normalizeHex, parseMode, SupportedMode } from "./utils";
import { throttle } from "lodash-es";
import { getKey } from "../../utils/key";

const throttleFor60FpsInMs = 16;
const defaultColor = normalizeHex(DEFAULT_COLOR.hex());

@Component({
  tag: "calcite-color",
  styleUrl: "calcite-color.scss",
  shadow: true
})
export class CalciteColor {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteColorElement;

  //--------------------------------------------------------------------------
  //
  //  Public properties
  //
  //--------------------------------------------------------------------------

  /** specify the appearance - default (containing border), or minimal (no containing border) */
  @Prop({ reflect: true }) appearance: "default" | "minimal" = "default";

  /**
   * Internal prop for advanced use-cases.
   *
   * @internal
   */
  @Prop() color: InternalColor = DEFAULT_COLOR;

  @Watch("color")
  handleColorChange(color: Color): void {
    this.drawColorFieldAndSlider();
    this.updateChannelsFromColor(color);

    if (this.colorUpdateLocked) {
      return;
    }

    const value = this.toValue(color);

    this.value = value;
  }

  /** When true, hides the hex input */
  @Prop() hideHex = false;

  /** When true, hides the RGB/HSV channel inputs */
  @Prop() hideChannels = false;

  /** When true, hides the saved colors section */
  @Prop() hideSaved = false;

  /** Label used for the blue channel */
  @Prop() intlB = TEXT.b;

  /** Label used for the blue channel description */
  @Prop() intlBlue = TEXT.blue;

  /** Label used for the delete color button. */
  @Prop() intlDeleteColor = TEXT.deleteColor;

  /** Label used for the green channel */
  @Prop() intlG = TEXT.g;

  /** Label used for the green channel description */
  @Prop() intlGreen = TEXT.green;

  /** Label used for the hue channel */
  @Prop() intlH = TEXT.h;

  /** Label used for the HSV mode */
  @Prop() intlHsv = TEXT.hsv;

  /** Label used for the hex input */
  @Prop() intlHex = TEXT.hex;

  /** Label used for the hue channel description */
  @Prop() intlHue = TEXT.hue;

  /** Label used for the red channel */
  @Prop() intlR = TEXT.r;

  /** Label used for the red channel description */
  @Prop() intlRed = TEXT.red;

  /** Label used for the RGB mode */
  @Prop() intlRgb = TEXT.rgb;

  /** Label used for the saturation channel */
  @Prop() intlS = TEXT.s;

  /** Label used for the saturation channel description */
  @Prop() intlSaturation = TEXT.saturation;

  /** Label used for the save color button. */
  @Prop() intlSaveColor = TEXT.saveColor;

  /** Label used for the saved colors section */
  @Prop() intlSaved = TEXT.saved;

  /** Label used for the value channel */
  @Prop() intlV = TEXT.v;

  /** Label used for the  */
  @Prop() intlValue = TEXT.value;

  /**
   * The scale of the color picker.
   */
  @Prop({
    reflect: true
  })
  scale: Exclude<Scale, "xs" | "xl"> = "m";

  @Watch("scale")
  handleScaleChange(scale: Exclude<Scale, "xs" | "xl"> = "m"): void {
    this.updateDimensions(scale);
  }

  /**
   * Storage ID for colors.
   */
  @Prop() storageId: string;

  /**
   * The component's theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  /**
   * The color value.
   *
   * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
   * a RGB, HSL or HSV object.
   *
   * The type will be preserved as the color is updated.
   */
  @Prop({
    mutable: true
  })
  value: ColorValue = defaultColor;

  @Watch("value")
  handleValueChange(value: ColorValue, oldValue: ColorValue): void {
    const nextMode = parseMode(value);

    if (!nextMode) {
      console.warn(`ignoring invalid color value: ${value}`);
      this.value = oldValue;
      return;
    }

    const modeChanged = this.mode !== nextMode;
    this.mode = nextMode;

    if (this.colorUpdateLocked) {
      this.calciteColorChange.emit();
      return;
    }

    const color = Color(value);
    const colorChanged = !colorEqual(color, this.color);

    if (modeChanged || colorChanged) {
      this.color = color;
      this.calciteColorChange.emit();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Internal State/Props
  //
  //--------------------------------------------------------------------------

  private colorUpdateLocked = false;

  private fieldAndSliderRenderingContext: CanvasRenderingContext2D;

  private hexInputNode: HTMLCalciteColorHexInputElement;

  private hueThumbState: "idle" | "hover" | "drag" = "idle";

  private mode: SupportedMode = CSSColorMode.HEX;

  private shiftKeyChannelAdjustment = 0;

  private sliderThumbState: "idle" | "hover" | "drag" = "idle";

  @State() colorFieldAndSliderInteractive = false;

  @State() channelMode: ColorMode = "rgb";

  @State() channels: [number, number, number] = this.toChannels(DEFAULT_COLOR);

  @State() dimensions = DIMENSIONS.m;

  @State() savedColors: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event()
  calciteColorChange: EventEmitter;

  private handleTabActivate = (event: Event): void => {
    this.channelMode = (event.currentTarget as HTMLElement).getAttribute(
      "data-color-mode"
    ) as ColorMode;

    this.updateChannelsFromColor(this.color);
  };

  private handleHexInputChange = (event: Event): void => {
    event.stopPropagation();
    const { color } = this;
    const input = event.target as HTMLCalciteColorHexInputElement;
    const hex = input.value;

    if (hex !== normalizeHex(color.hex())) {
      this.internalColorSet(Color(hex));
    }
  };

  private handleSavedColorSelect = (event: Event): void => {
    const swatch = event.currentTarget as HTMLCalciteColorSwatchElement;
    this.internalColorSet(Color(swatch.color));
  };

  private handleChannelInput = (event: CustomEvent): void => {
    const input = event.currentTarget as HTMLCalciteInputElement;
    const internalInput = event.target as HTMLInputElement;
    const channelIndex = Number(internalInput.getAttribute("data-channel-index"));

    const limit =
      this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];

    const value = Number(internalInput.value) + this.shiftKeyChannelAdjustment;
    const clamped = Math.max(0, Math.min(value, limit));

    // need to update both calcite-input and its internal input to keep them in sync
    input.value = `${clamped}`;
    internalInput.value = `${clamped}`;
  };

  private handleChannelKeyUpOrDown = ({ key, shiftKey }: KeyboardEvent): void => {
    key = getKey(key);

    // this gets applied to the input's up/down arrow increment/decrement
    const complementaryBump = 9;

    this.shiftKeyChannelAdjustment =
      key === "ArrowUp" && shiftKey
        ? complementaryBump
        : key === "ArrowDown" && shiftKey
        ? -complementaryBump
        : 0;
  };

  private handleChannelChange = (event: KeyboardEvent): void => {
    const input = event.target as HTMLInputElement;
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const channels = [...this.channels] as this["channels"];
    channels[channelIndex] = Number(input.value);
    this.updateColorFromChannels(channels);
  };

  private handleSavedColorKeyDown = (event: KeyboardEvent): void => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.handleSavedColorSelect(event);
    }
  };

  private handleColorFieldAndSliderMouseLeave = (): void => {
    this.colorFieldAndSliderInteractive = false;
  };

  private handleColorFieldAndSliderMouseEnterOrMove = ({ offsetY }: MouseEvent): void => {
    const {
      dimensions: {
        colorField: { height: colorFieldHeight },
        slider: { height: sliderHeight }
      }
    } = this;

    this.colorFieldAndSliderInteractive = offsetY <= colorFieldHeight + sliderHeight;
  };

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.hexInputNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }

    this.handleValueChange(this.value, defaultColor);
    this.updateDimensions(this.scale);
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const {
      color,
      intlDeleteColor,
      el,
      hideHex,
      hideChannels,
      hideSaved,
      intlHex,
      intlSaved,
      intlSaveColor,
      savedColors,
      scale,
      theme
    } = this;
    const selectedColorInHex = color.hex();
    const hexInputScale = scale !== "s" ? "m" : scale;
    const { colorFieldAndSliderInteractive } = this;
    const elementDir = getElementDir(el);

    return (
      <div class={CSS.container}>
        <canvas
          class={{
            [CSS.colorFieldAndSlider]: true,
            [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
          }}
          onMouseEnter={this.handleColorFieldAndSliderMouseEnterOrMove}
          onMouseLeave={this.handleColorFieldAndSliderMouseLeave}
          onMouseMove={this.handleColorFieldAndSliderMouseEnterOrMove}
          ref={this.initColorFieldAndSlider}
        />
        {hideHex && hideChannels ? null : (
          <div class={{ [CSS.controlSection]: true, [CSS.section]: true }}>
            {hideHex ? null : (
              <div class={CSS.hexOptions}>
                <span
                  class={{
                    [CSS.header]: true,
                    [CSS.headerHex]: true,
                    [CSS.underlinedHeader]: true
                  }}
                >
                  {intlHex}
                </span>
                <calcite-color-hex-input
                  class={CSS.control}
                  dir={elementDir}
                  onCalciteColorHexInputChange={this.handleHexInputChange}
                  ref={(node) => (this.hexInputNode = node)}
                  scale={hexInputScale}
                  theme={theme}
                  value={selectedColorInHex}
                />
              </div>
            )}
            {hideChannels ? null : (
              <calcite-tabs
                class={{
                  [CSS.colorModeContainer]: true,
                  [CSS.splitSection]: true
                }}
                dir={elementDir}
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
        )}
        {hideSaved ? null : (
          <div class={{ [CSS.savedColorsSection]: true, [CSS.section]: true }}>
            <div class={CSS.header}>
              <label>{intlSaved}</label>
              <div class={CSS.savedColorsButtons}>
                <calcite-button
                  appearance="transparent"
                  aria-label={intlDeleteColor}
                  class={CSS.deleteColor}
                  color="dark"
                  iconStart="minus"
                  onClick={this.deleteColor}
                  scale={scale}
                  theme={theme}
                />
                <calcite-button
                  appearance="transparent"
                  aria-label={intlSaveColor}
                  class={CSS.saveColor}
                  color="dark"
                  iconStart="plus"
                  onClick={this.saveColor}
                  scale={scale}
                  theme={theme}
                />
              </div>
            </div>
            {savedColors.length > 0 ? (
              <div class={CSS.savedColors}>
                {[
                  ...savedColors.map((color) => (
                    <calcite-color-swatch
                      active={selectedColorInHex === color}
                      class={CSS.savedColor}
                      color={color}
                      key={color}
                      onClick={this.handleSavedColorSelect}
                      onKeyDown={this.handleSavedColorKeyDown}
                      scale={scale}
                      tabIndex={0}
                      theme={theme}
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

  private renderChannelsTabTitle = (channelMode: this["channelMode"]): VNode => {
    const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
    const active = channelMode === activeChannelMode;
    const label = channelMode === "rgb" ? intlRgb : intlHsv;

    return (
      <calcite-tab-title
        active={active}
        class={CSS.colorMode}
        data-color-mode={channelMode}
        onCalciteTabsActivate={this.handleTabActivate}
      >
        {label}
      </calcite-tab-title>
    );
  };

  private renderChannelsTab = (channelMode: this["channelMode"]): VNode => {
    const {
      channelMode: activeChannelMode,
      channels,
      intlB,
      intlBlue,
      intlG,
      intlGreen,
      intlH,
      intlHue,
      intlR,
      intlRed,
      intlS,
      intlSaturation,
      intlV,
      intlValue
    } = this;

    const active = channelMode === activeChannelMode;
    const isRgb = channelMode === "rgb";
    const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
    const channelAriaLabels = isRgb
      ? [intlRed, intlGreen, intlBlue]
      : [intlHue, intlSaturation, intlValue];

    return (
      <calcite-tab active={active} class={CSS.control}>
        <div class={CSS.channels}>
          {channels.map((channel, index) =>
            this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index])
          )}
        </div>
      </calcite-tab>
    );
  };

  private renderChannel = (
    value: number,
    index: number,
    label: string,
    ariaLabel: string
  ): VNode => (
    <calcite-input
      aria-label={ariaLabel}
      class={CSS.channel}
      data-channel-index={index}
      numberButtonType="none"
      onChange={this.handleChannelChange}
      onInput={this.handleChannelInput}
      onKeyDown={this.handleChannelKeyUpOrDown}
      onKeyUp={this.handleChannelKeyUpOrDown}
      prefixText={label}
      scale="s"
      type="number"
      value={value.toString()}
    />
  );

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private internalColorSet(color: Color): void {
    if (colorEqual(color, this.color)) {
      return;
    }

    this.colorUpdateLocked = true;
    this.color = color;
    this.value = this.toValue(color);
    this.colorUpdateLocked = false;
  }

  private toValue(color: Color): ColorValue {
    const { mode } = this;
    const hexMode = "hex";

    if (mode.includes(hexMode)) {
      return normalizeHex(color[hexMode]());
    }

    if (mode.includes("-css")) {
      return color[mode.replace("-css", "").replace("a", "")]().string();
    }

    const colorObject = color[mode]().round().object();

    if (mode.endsWith("a")) {
      // normalize alpha prop
      colorObject.a = colorObject.alpha;
      delete colorObject.alpha;
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

  private updateDimensions(scale: Exclude<Scale, "xs" | "xl"> = "m"): void {
    this.dimensions = DIMENSIONS[scale];
  }

  private deleteColor = (): void => {
    const colorToDelete = this.color.hex();
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
    const colorToSave = this.color.hex();
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

    context.fillStyle = this.color.hsv().saturationv(100).value(100).string();
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

  private initColorFieldAndSlider = (canvas: HTMLCanvasElement): void => {
    this.fieldAndSliderRenderingContext = canvas.getContext("2d");
    this.setCanvasContextSize(canvas, {
      width: this.dimensions.colorField.width,
      height:
        this.dimensions.colorField.height +
        this.dimensions.slider.height +
        this.getSliderCapSpacing() * 2
    });

    this.drawColorFieldAndSlider();

    const yWithin = (y: number): "color-field" | "slider" | "none" => {
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
    };

    const captureColor = (x: number, y: number): void => {
      const {
        dimensions: {
          colorField: { height, width }
        }
      } = this;
      const saturation = Math.round((HSV_LIMITS.s / width) * x);
      const value = Math.round((HSV_LIMITS.v / height) * (height - y));

      this.internalColorSet(this.color.hsv().saturationv(saturation).value(value));
    };

    canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
      const region = yWithin(offsetY);

      if (region === "color-field") {
        this.hueThumbState = "drag";
        captureColor(offsetX, offsetY);
      } else if (region === "slider") {
        this.sliderThumbState = "drag";
        captureSliderColor(offsetX);
      }
    });

    canvas.addEventListener("mouseout", () => {
      this.hueThumbState = "idle";
      this.sliderThumbState = "idle";

      this.drawColorFieldAndSlider();
    });

    canvas.addEventListener("mouseup", () => {
      this.hueThumbState = "hover";
      this.sliderThumbState = "hover";

      this.drawColorFieldAndSlider();
    });

    canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      const region = yWithin(offsetY);

      if (region === "color-field") {
        const prevHueThumbState = this.hueThumbState;
        const color = this.color.hsv();

        const {
          dimensions: {
            colorField: { height, width },
            thumb: { radius }
          }
        } = this;
        const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / width));
        const centerY = Math.round(height - color.value() / (HSV_LIMITS.v / height));

        const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, radius);

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

          return;
        }

        captureColor(offsetX, offsetY);
      } else if (region === "slider") {
        const {
          dimensions: {
            slider: { height: sliderHeight, width: sliderWidth },
            thumb: { radius: thumbRadius }
          }
        } = this;

        const prevSliderThumbState = this.sliderThumbState;
        const sliderThumbColor = this.color.hsv().saturationv(100).value(100);
        const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / sliderWidth));
        const sliderThumbCenterY = Math.round((sliderHeight + this.getSliderCapSpacing()) / 2);

        const hoveringSliderThumb = this.containsPoint(
          offsetX,
          offsetY,
          sliderThumbCenterX,
          sliderThumbCenterY,
          thumbRadius
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

          return;
        }

        captureSliderColor(offsetX);
      }
    });

    const captureSliderColor = (x: number): void => {
      const {
        dimensions: {
          slider: { width }
        }
      } = this;
      const hue = (360 / width) * x;

      this.internalColorSet(this.color.hue(hue));
    };
  };

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
    const color = this.color.hsv();

    const {
      dimensions: {
        colorField: { height, width },
        thumb: { radius }
      }
    } = this;

    const x = color.saturationv() / (HSV_LIMITS.s / width);
    const y = height - color.value() / (HSV_LIMITS.v / height);

    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.hueThumbState);
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
    context.fillStyle = color.rgb().string();
    context.fill();
  }

  private drawActiveHueSliderColor(): void {
    const color = this.color.hsv().saturationv(100).value(100);

    const {
      dimensions: {
        colorField: { height: colorFieldHeight },
        slider: { height, width },
        thumb: { radius }
      }
    } = this;

    const x = color.hue() / (360 / width);
    const y = height / 2 + colorFieldHeight;

    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.sliderThumbState);
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
    this.internalColorSet(Color(channels, this.channelMode));
  }

  private updateChannelsFromColor(color: Color): void {
    this.channels = this.toChannels(color);
  }

  private toChannels(color: Color): [number, number, number] {
    const { channelMode } = this;

    return color[channelMode]()
      .array()
      .map((value) => Math.floor(value)) as [number, number, number];
  }
}
