// @ts-strict-ignore
import Color, { type ColorInstance } from "color";
import { throttle } from "lodash-es";
import { PropertyValues } from "lit";
import { createEvent, h, JsxNode, LitElement, method, property, state } from "@arcgis/lumina";
import {
  Direction,
  focusFirstTabbable,
  getElementDir,
  isPrimaryPointerButton,
} from "../../utils/dom";
import { Dimensions, Scale } from "../interfaces";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { componentFocusable } from "../../utils/component";
import { NumberingSystem } from "../../utils/locale";
import { clamp, closeToRangeEdge, remap } from "../../utils/math";
import { useT9n } from "../../controllers/useT9n";
import type { InputNumber } from "../input-number/input-number";
import type { ColorPickerSwatch } from "../color-picker-swatch/color-picker-swatch";
import type { ColorPickerHexInput } from "../color-picker-hex-input/color-picker-hex-input";
import { createObserver } from "../../utils/observers";
import {
  alphaCompatible,
  alphaToOpacity,
  colorEqual,
  CSSColorMode,
  Format,
  getColorFieldDimensions,
  getSliderWidth,
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
  CSS,
  DEFAULT_COLOR,
  DEFAULT_STORAGE_KEY_PREFIX,
  HSV_LIMITS,
  HUE_LIMIT_CONSTRAINED,
  OPACITY_LIMITS,
  RGB_LIMITS,
  SCOPE_SIZE,
  STATIC_DIMENSIONS,
} from "./resources";
import { Channels, ColorMode, ColorValue, HSLA, HSVA, InternalColor, RGBA } from "./interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./color-picker.scss";
import { logger } from "../../utils/logger";

declare global {
  interface DeclareElements {
    "calcite-color-picker": ColorPicker;
  }
}

const throttleFor60FpsInMs = 16;

export class ColorPicker extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private activeCanvasInfo: {
    context: CanvasRenderingContext2D;
    bounds: DOMRect;
  };

  private dynamicDimensions:
    | {
        colorField: Dimensions;
        slider: Dimensions;
      }
    | undefined;

  private checkerPattern: HTMLCanvasElement;

  private _color: InternalColor | null = DEFAULT_COLOR;

  private colorFieldRenderingContext: CanvasRenderingContext2D;

  private colorFieldScopeNode: HTMLDivElement;

  private hueScopeNode: HTMLDivElement;

  private hueSliderRenderingContext: CanvasRenderingContext2D;

  private internalColorUpdateContext: "internal" | "initial" | "user-interaction" | null = null;

  private isActiveChannelInputEmpty: boolean = false;

  private isClearable: boolean;

  private mode: SupportedMode = CSSColorMode.HEX;

  private opacityScopeNode: HTMLDivElement;

  private opacitySliderRenderingContext: CanvasRenderingContext2D;

  private previousColor: InternalColor | null;

  private resizeObserver = createObserver("resize", (entries) => this.resizeCanvas(entries));

  private shiftKeyChannelAdjustment = 0;

  private upOrDownArrowKeyTracker: "down" | "up" | null = null;

  private _value: ColorValue | null;

  private _valueWasSet = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private captureColorFieldColor = (x: number, y: number, skipEqual = true): void => {
    const { width, height } = this.dynamicDimensions.colorField;
    const saturation = Math.round((HSV_LIMITS.s / width) * x);
    const value = Math.round((HSV_LIMITS.v / height) * (height - y));

    this.internalColorSet(
      this.baseColorFieldColor.hsv().saturationv(saturation).value(value),
      skipEqual,
    );
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
    throttleFor60FpsInMs,
  );

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

  private resizeCanvas = throttle((entries: ResizeObserverEntry[]): void => {
    if (!this.hasUpdated) {
      return;
    }

    const [first] = entries;
    const availableWidth = Math.floor(first.contentBoxSize[0].inlineSize);

    if (this.dynamicDimensions.colorField.width === availableWidth) {
      return;
    }

    this.updateDynamicDimensions(availableWidth);
    this.updateCanvasSize();
    this.drawColorControls();
  }, throttleFor60FpsInMs);

  private updateDynamicDimensions = (width: number): void => {
    const sliderDims = {
      width: getSliderWidth(width, this.staticDimensions, this.alphaChannel),
      height: this.staticDimensions.slider.height,
    };

    this.dynamicDimensions = {
      colorField: getColorFieldDimensions(width),
      slider: sliderDims,
    };
  };

  //#endregion

  //#region State Properties

  @state() channelMode: ColorMode = "rgb";

  @state() channels: Channels = this.toChannels(DEFAULT_COLOR);

  @state() colorFieldScopeLeft: number;

  @state() colorFieldScopeTop: number;

  @state() staticDimensions = STATIC_DIMENSIONS.m;

  @state() hueScopeLeft: number;

  @state() opacityScopeLeft: number;

  @state() savedColors: string[] = [];

  @state() scopeOrientation: "vertical" | "horizontal";

  //#endregion

  //#region Public Properties

  /**
   * When `true`, an empty color (`null`) will be allowed as a `value`.
   *
   * When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`.
   *
   * @deprecated Use `clearable` instead
   */
  @property({ reflect: true }) allowEmpty = false;

  /** When `true`, the component will allow updates to the color's alpha value. */
  @property() alphaChannel = false;

  /** When `true`, hides the RGB/HSV channel inputs. */
  @property() channelsDisabled = false;

  /**
   * When `true`, an empty color (`null`) will be allowed as a `value`.
   *
   * When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`.
   */
  @property({ reflect: true }) clearable = false;

  /**
   * Internal prop for advanced use-cases.
   *
   * @private
   */
  @property()
  get color(): InternalColor | null {
    return this._color;
  }
  set color(color: InternalColor | null) {
    const oldColor = this._color;
    this._color = color;
    this.handleColorChange(color, oldColor);
  }

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * The format of `value`.
   *
   * When `"auto"`, the format will be inferred from `value` when set.
   *
   * @default "auto"
   */
  @property({ reflect: true }) format: Format = "auto";

  /** When `true`, hides the hex input. */
  @property() hexDisabled = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /** When `true`, hides the saved colors section. */
  @property({ reflect: true }) savedDisabled = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the storage ID for colors. */
  @property({ reflect: true }) storageId: string;

  /**
   * The component's value, where the value can be a CSS color string, or a RGB, HSL or HSV object.
   *
   * The type will be preserved as the color is updated.
   *
   * @default
   *
   * @see [CSS Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color),
   * @see [ColorValue](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/components/color-picker/interfaces.ts#L10).
   */
  @property()
  get value(): ColorValue | null {
    return this._value;
  }
  set value(value: ColorValue | null) {
    const oldValue = this._value;
    this._value = value;
    this.handleValueChange(value, oldValue);
    this._valueWasSet = true;
  }

  //#endregion

  //#region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    focusFirstTabbable(this.el);
  }

  //#endregion

  //#region Events

  /** Fires when the color value has changed. */
  calciteColorPickerChange = createEvent({ cancelable: false });

  /**
   * Fires as the color value changes.
   *
   * Similar to the `calciteColorPickerChange` event with the exception of dragging. When dragging the color field or hue slider thumb, this event fires as the thumb is moved.
   */
  calciteColorPickerInput = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.handleChannelKeyUpOrDown, { capture: true });
    this.listen("keyup", this.handleChannelKeyUpOrDown, { capture: true });
  }

  connectedCallback(): void {
    this.observeResize();
  }

  async load(): Promise<void> {
    if (!this._valueWasSet) {
      this._value ??= normalizeHex(hexify(DEFAULT_COLOR, this.alphaChannel));
    }

    this.handleAllowEmptyOrClearableChange();

    const { isClearable, color, format, value } = this;
    const willSetNoColor = isClearable && !value;
    const parsedMode = parseMode(value);
    const valueIsCompatible =
      willSetNoColor || (format === "auto" && parsedMode) || format === parsedMode;
    const initialColor = willSetNoColor ? null : valueIsCompatible ? Color(value) : color;

    if (!valueIsCompatible) {
      this.showIncompatibleColorWarning(value, format);
    }
    this.setMode(format, false);
    this.internalColorSet(initialColor, false, "initial");

    this.updateStaticDimensions(this.scale);
    this.updateDynamicDimensions(STATIC_DIMENSIONS[this.scale].minWidth);

    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;

    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("allowEmpty") && (this.hasUpdated || this.allowEmpty !== false)) ||
      (changes.has("clearable") && (this.hasUpdated || this.clearable !== false))
    ) {
      this.handleAllowEmptyOrClearableChange();
    }

    if (changes.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== false)) {
      this.handleAlphaChannelChange(this.alphaChannel);
    }

    if (
      this.hasUpdated &&
      ((changes.has("alphaChannel") && this.alphaChannel !== false) ||
        (changes.has("staticDimensions") && this.staticDimensions !== STATIC_DIMENSIONS.m))
    ) {
      this.handleAlphaChannelDimensionsChange();
    }

    if (
      (changes.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== false)) ||
      (changes.has("format") && (this.hasUpdated || this.format !== "auto"))
    ) {
      this.handleFormatOrAlphaChannelChange();
    }

    if (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.handleScaleChange(this.scale);
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.handleAlphaChannelDimensionsChange();
  }

  override disconnectedCallback(): void {
    window.removeEventListener(
      "pointermove",
      this.globalPointerMoveHandler,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.removeEventListener(
      "pointerup",
      this.globalPointerUpHandler,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private get baseColorFieldColor(): ColorInstance {
    return this.color || this.previousColor || DEFAULT_COLOR;
  }

  private get effectiveSliderWidth(): number {
    return this.dynamicDimensions.slider.width;
  }

  private observeResize(): void {
    this.resizeObserver?.observe(this.el);
  }

  private handleAllowEmptyOrClearableChange(): void {
    this.isClearable = this.clearable || this.allowEmpty;
  }

  private handleAlphaChannelChange(alphaChannel: boolean): void {
    const { format } = this;

    if (alphaChannel && format !== "auto" && !alphaCompatible(format)) {
      logger.warn(
        `ignoring alphaChannel as the current format (${format}) does not support alpha`,
      );
      this.alphaChannel = false;
    }
  }

  private handleAlphaChannelDimensionsChange(): void {
    this.drawColorControls();
  }

  private handleColorChange(color: ColorInstance | null, oldColor: ColorInstance | null): void {
    this.drawColorControls();
    this.updateChannelsFromColor(color);
    this.previousColor = oldColor;
  }

  private handleFormatOrAlphaChannelChange(): void {
    this.setMode(this.format);
    this.internalColorSet(this.color, false, "internal");
  }

  private handleScaleChange(scale: Scale = "m"): void {
    this.updateStaticDimensions(scale);
    this.updateCanvasSize();
    this.drawColorControls();
  }

  private handleValueChange(value: ColorValue | null, oldValue: ColorValue | null): void {
    const { isClearable, format } = this;
    const checkMode = !isClearable || value;
    let modeChanged = false;

    if (checkMode) {
      const nextMode = parseMode(value);

      if (!nextMode || (format !== "auto" && nextMode !== format)) {
        this.showIncompatibleColorWarning(value, format);
        this._value = oldValue;
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
      isClearable && !value
        ? null
        : Color(
            value != null && typeof value === "object" && alphaCompatible(this.mode)
              ? normalizeColor(value as RGBA | HSVA | HSLA)
              : value,
          );
    const colorChanged = !colorEqual(color, this.color);

    if (modeChanged || colorChanged) {
      this.internalColorSet(
        color,
        (this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css"))) ||
          this.internalColorUpdateContext === "internal",
        "internal",
      );
    }
  }

  private handleTabActivate(event: Event): void {
    this.channelMode = (event.currentTarget as HTMLElement).getAttribute(
      "data-color-mode",
    ) as ColorMode;

    this.updateChannelsFromColor(this.color);
  }

  private handleColorFieldScopeKeyDown(event: KeyboardEvent): void {
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
        false,
      );
    }
  }

  private handleHueScopeKeyDown(event: KeyboardEvent): void {
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
  }

  private handleHexInputChange(event: Event): void {
    event.stopPropagation();
    const { isClearable, color } = this;
    const input = event.target as ColorPickerHexInput["el"];
    const hex = input.value;

    if (isClearable && !hex) {
      this.internalColorSet(null);
      return;
    }

    const normalizedHex = color && normalizeHex(hexify(color, alphaCompatible(this.mode)));

    if (hex !== normalizedHex) {
      this.internalColorSet(Color(hex));
    }
  }

  private handleSavedColorSelect(event: Event): void {
    const swatch = event.currentTarget as ColorPickerSwatch["el"];
    this.internalColorSet(Color(swatch.color));
  }

  private handleChannelInput(event: CustomEvent): void {
    const input = event.currentTarget as InputNumber["el"];
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const isAlphaChannel = channelIndex === 3;

    const limit = isAlphaChannel
      ? OPACITY_LIMITS.max
      : this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];

    let inputValue: string;

    if (!input.value) {
      inputValue = "";
      this.isActiveChannelInputEmpty = true;
      // reset this to allow typing in new value, when channel input is cleared after ArrowUp or ArrowDown have been pressed
      this.upOrDownArrowKeyTracker = null;
    } else {
      const value = Number(input.value);
      const adjustedValue = value + this.shiftKeyChannelAdjustment;
      const clamped = clamp(adjustedValue, 0, limit);

      inputValue = clamped.toString();
    }

    input.value = inputValue;

    if (inputValue !== "" && this.shiftKeyChannelAdjustment !== 0) {
      // we treat nudging as a change event since the input won't emit when modifying the value directly
      this.handleChannelChange(event);
    } else if (inputValue !== "") {
      this.handleChannelChange(event);
    }
  }

  private handleChannelBlur(event: CustomEvent): void {
    const input = event.currentTarget as InputNumber["el"];
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const channels = [...this.channels] as this["channels"];
    const restoreValueDueToEmptyInput = !input.value && !this.isClearable;

    if (restoreValueDueToEmptyInput) {
      input.value = channels[channelIndex]?.toString();
    }
  }

  private handleChannelFocus(event: Event): void {
    const input = event.currentTarget as InputNumber["el"];
    input.selectText();
  }

  // using @Listen as a workaround for VDOM listener not firing
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

    if (key === "ArrowUp") {
      this.upOrDownArrowKeyTracker = "up";
    }
    if (key === "ArrowDown") {
      this.upOrDownArrowKeyTracker = "down";
    }
  }

  private getChannelInputLimit(channelIndex: number): number {
    return this.channelMode === "rgb"
      ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
      : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
  }

  private handleChannelChange(event: CustomEvent): void {
    const input = event.currentTarget as InputNumber["el"];
    const channelIndex = Number(input.getAttribute("data-channel-index"));
    const channels = [...this.channels] as this["channels"];

    const shouldClearChannels = this.isClearable && !input.value;

    if (shouldClearChannels) {
      this.channels = [null, null, null, null];
      this.internalColorSet(null);
      return;
    }

    const isAlphaChannel = channelIndex === 3;

    if (this.isActiveChannelInputEmpty && this.upOrDownArrowKeyTracker) {
      input.value =
        this.upOrDownArrowKeyTracker === "up"
          ? (channels[channelIndex] + 1 <= this.getChannelInputLimit(channelIndex)
              ? channels[channelIndex] + 1
              : this.getChannelInputLimit(channelIndex)
            ).toString()
          : (channels[channelIndex] - 1 >= 0 ? channels[channelIndex] - 1 : 0).toString();
      this.isActiveChannelInputEmpty = false;
      this.upOrDownArrowKeyTracker = null;
    }
    const value = input.value ? Number(input.value) : channels[channelIndex];

    channels[channelIndex] = isAlphaChannel ? opacityToAlpha(value) : value;
    this.updateColorFromChannels(channels);
  }

  private handleSavedColorKeyDown(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.handleSavedColorSelect(event);
    }
  }

  private handleColorFieldPointerDown(event: PointerEvent): void {
    this.handleCanvasControlPointerDown(
      event,
      this.colorFieldRenderingContext,
      this.captureColorFieldColor,
      this.colorFieldScopeNode,
    );
  }

  private focusScope(focusEl: HTMLElement): void {
    requestAnimationFrame(() => {
      focusEl.focus();
    });
  }

  private handleHueSliderPointerDown(event: PointerEvent): void {
    this.handleCanvasControlPointerDown(
      event,
      this.hueSliderRenderingContext,
      this.captureHueSliderColor,
      this.hueScopeNode,
    );
  }

  private handleOpacitySliderPointerDown(event: PointerEvent): void {
    this.handleCanvasControlPointerDown(
      event,
      this.opacitySliderRenderingContext,
      this.captureOpacitySliderValue,
      this.opacityScopeNode,
    );
  }

  private handleCanvasControlPointerDown(
    event: PointerEvent,
    renderingContext: CanvasRenderingContext2D,
    captureValue: (offsetX: number, offsetY?: number) => void,
    scopeNode: HTMLElement,
  ): void {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    window.addEventListener(
      "pointermove",
      this.globalPointerMoveHandler,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.addEventListener("pointerup", this.globalPointerUpHandler, {
      once: true,
    }) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;

    this.activeCanvasInfo = {
      context: renderingContext,
      bounds: renderingContext.canvas.getBoundingClientRect(),
    };

    captureValue.call(this, event.offsetX, event.offsetY);
    this.focusScope(scopeNode);
  }

  private storeColorFieldScope(node: HTMLDivElement): void {
    this.colorFieldScopeNode = node;
  }

  private storeHueScope(node: HTMLDivElement): void {
    this.hueScopeNode = node;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  private showIncompatibleColorWarning(value: ColorValue, format: Format): void {
    logger.warn(
      `ignoring color value (${value}) as it is not compatible with the current format (${format})`,
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
        logger.warn(
          `setting format to (${alphaMode}) as the provided one (${mode}) does not support alpha`,
        );
      }

      return alphaMode;
    }

    if (!alphaChannel && isAlphaCompatible) {
      const nonAlphaMode = toNonAlphaMode(mode);

      if (warn) {
        logger.warn(
          `setting format to (${nonAlphaMode}) as the provided one (${mode}) does not support alpha`,
        );
      }

      return nonAlphaMode;
    }

    return mode;
  }

  private captureHueSliderColor(x: number): void {
    const hue = (HUE_LIMIT_CONSTRAINED / this.effectiveSliderWidth) * x;

    this.internalColorSet(this.baseColorFieldColor.hue(hue), false);
  }

  private captureOpacitySliderValue(x: number): void {
    const alpha = opacityToAlpha((OPACITY_LIMITS.max / this.effectiveSliderWidth) * x);

    this.internalColorSet(this.baseColorFieldColor.alpha(alpha), false);
  }

  private internalColorSet(
    color: ColorInstance | null,
    skipEqual = true,
    context: ColorPicker["internalColorUpdateContext"] = "user-interaction",
  ): void {
    if (skipEqual && colorEqual(color, this.color)) {
      return;
    }

    this.internalColorUpdateContext = context;
    this.color = color;
    this.value = this.toValue(color);
    this.internalColorUpdateContext = null;
  }

  private toValue(
    color: ColorInstance | null,
    format: SupportedMode = this.mode,
  ): ColorValue | null {
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
      staticDimensions: {
        slider: { height },
        thumb: { radius },
      },
    } = this;

    return radius * 2 - height;
  }

  private updateStaticDimensions(scale: Scale = "m"): void {
    this.staticDimensions = STATIC_DIMENSIONS[scale];
  }

  private deleteColor(): void {
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
  }

  private saveColor(): void {
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
  }

  private drawColorField(): void {
    const context = this.colorFieldRenderingContext;
    const { width, height } = this.dynamicDimensions.colorField;

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
    { height, width }: { height: number; width: number },
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

  private initColorField(canvas?: HTMLCanvasElement): void {
    if (!canvas) {
      return;
    }
    this.colorFieldRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("color-field");
    this.drawColorControls();
  }

  private initHueSlider(canvas?: HTMLCanvasElement): void {
    if (!canvas) {
      return;
    }
    this.hueSliderRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("hue-slider");
    this.drawHueSlider();
  }

  private initOpacitySlider(canvas: HTMLCanvasElement): void {
    if (!canvas) {
      return;
    }

    this.opacitySliderRenderingContext = canvas.getContext("2d");
    this.updateCanvasSize("opacity-slider");
    this.drawOpacitySlider();
  }

  private updateCanvasSize(
    context: "all" | "color-field" | "hue-slider" | "opacity-slider" = "all",
  ): void {
    const { dynamicDimensions, staticDimensions } = this;

    if (context === "all" || context === "color-field") {
      this.setCanvasContextSize(
        this.colorFieldRenderingContext?.canvas,
        dynamicDimensions.colorField,
      );
    }

    const adjustedSliderDimensions = {
      width: this.effectiveSliderWidth,
      height:
        staticDimensions.slider.height +
        (staticDimensions.thumb.radius - dynamicDimensions.slider.height / 2) * 2,
    };

    if (context === "all" || context === "hue-slider") {
      this.setCanvasContextSize(this.hueSliderRenderingContext?.canvas, adjustedSliderDimensions);
    }

    if (context === "all" || context === "opacity-slider") {
      this.setCanvasContextSize(
        this.opacitySliderRenderingContext?.canvas,
        adjustedSliderDimensions,
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
      staticDimensions: {
        thumb: { radius },
      },
    } = this;

    const { width, height } = this.dynamicDimensions.colorField;

    const x = hsvColor.saturationv() / (HSV_LIMITS.s / width);
    const y = height - hsvColor.value() / (HSV_LIMITS.v / height);

    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = x;
      this.colorFieldScopeTop = y;
    });

    this.drawThumb(this.colorFieldRenderingContext, radius, x, y, hsvColor, false);
  }

  private drawThumb(
    context: CanvasRenderingContext2D,
    radius: number,
    x: number,
    y: number,
    color: ColorInstance,
    applyAlpha: boolean,
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

    if (applyAlpha && color.alpha() < 1) {
      const pattern = context.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
      context.beginPath();
      context.arc(x, y, radius - 3, startAngle, endAngle);
      context.fillStyle = pattern;
      context.fill();
    }

    context.globalCompositeOperation = "source-atop";

    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
    const alpha = applyAlpha ? color.alpha() : 1;
    context.fillStyle = color.rgb().alpha(alpha).string();
    context.fill();

    context.globalCompositeOperation = "source-over";
  }

  private drawActiveHueSliderColor(): void {
    const { color } = this;

    if (!color) {
      return;
    }

    const hsvColor = color.hsv().saturationv(100).value(100);

    const {
      staticDimensions: {
        thumb: { radius },
      },
    } = this;

    const width = this.effectiveSliderWidth;
    const x = hsvColor.hue() / (HUE_LIMIT_CONSTRAINED / width);
    const y = radius;
    const sliderBoundX = this.getSliderBoundX(x, width, radius);

    requestAnimationFrame(() => {
      this.hueScopeLeft = sliderBoundX;
    });

    this.drawThumb(this.hueSliderRenderingContext, radius, sliderBoundX, y, hsvColor, false);
  }

  private drawHueSlider(): void {
    const context = this.hueSliderRenderingContext;
    const {
      staticDimensions: {
        slider: { height },
        thumb: { radius: thumbRadius },
      },
    } = this;

    const x = 0;
    const y = thumbRadius - height / 2;
    const width = this.effectiveSliderWidth;

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
      staticDimensions: {
        slider: { height },
        thumb: { radius: thumbRadius },
      },
    } = this;

    const x = 0;
    const y = thumbRadius - height / 2;
    const width = this.effectiveSliderWidth;

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
    y: number,
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
      staticDimensions: {
        thumb: { radius },
      },
    } = this;

    const width = this.effectiveSliderWidth;
    const x = alphaToOpacity(hsvColor.alpha()) / (OPACITY_LIMITS.max / width);
    const y = radius;
    const sliderBoundX = this.getSliderBoundX(x, width, radius);

    requestAnimationFrame(() => {
      this.opacityScopeLeft = sliderBoundX;
    });

    this.drawThumb(this.opacitySliderRenderingContext, radius, sliderBoundX, y, hsvColor, true);
  }

  private getSliderBoundX(x: number, width: number, radius: number): number {
    const closeToEdge = closeToRangeEdge(x, width, radius);

    return closeToEdge === 0
      ? x
      : closeToEdge === -1
        ? remap(x, 0, width, radius, radius * 2)
        : remap(x, 0, width, width - radius * 2, width - radius);
  }

  private storeOpacityScope(node: HTMLDivElement): void {
    this.opacityScopeNode = node;
  }

  private handleOpacityScopeKeyDown(event: KeyboardEvent): void {
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
  }

  private updateColorFromChannels(channels: this["channels"]): void {
    this.internalColorSet(Color(channels, this.channelMode));
  }

  private updateChannelsFromColor(color: ColorInstance | null): void {
    this.channels = color ? this.toChannels(color) : [null, null, null, null];
  }

  private toChannels(color: ColorInstance): Channels {
    const { channelMode } = this;
    const channels = color[channelMode]().round().array();

    if (channels.length === 3) {
      channels.push(1); // Color omits alpha when 1
    }

    return channels as Channels;
  }

  private getAdjustedScopePosition(left: number, top: number): [number, number] {
    return [left - SCOPE_SIZE / 2, top - SCOPE_SIZE / 2];
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const {
      channelsDisabled,
      color,
      colorFieldScopeLeft,
      colorFieldScopeTop,
      staticDimensions: {
        thumb: { radius: thumbRadius },
      },
      hexDisabled,
      hueScopeLeft,
      messages,
      alphaChannel,
      opacityScopeLeft,
      savedColors,
      savedDisabled,
      scale,
      scopeOrientation,
    } = this;

    const sliderWidth = this.effectiveSliderWidth;
    const selectedColorInHex = color ? hexify(color, alphaChannel) : null;
    const hueTop = thumbRadius;
    const hueLeft = hueScopeLeft ?? (sliderWidth * DEFAULT_COLOR.hue()) / HSV_LIMITS.h;
    const opacityTop = thumbRadius;
    const opacityLeft =
      opacityScopeLeft ??
      (sliderWidth * alphaToOpacity(DEFAULT_COLOR.alpha())) / OPACITY_LIMITS.max;
    const noColor = color === undefined;
    const vertical = scopeOrientation === "vertical";
    const [adjustedColorFieldScopeLeft, adjustedColorFieldScopeTop] = this.getAdjustedScopePosition(
      colorFieldScopeLeft,
      colorFieldScopeTop,
    );
    const [adjustedHueScopeLeft, adjustedHueScopeTop] = this.getAdjustedScopePosition(
      hueLeft,
      hueTop,
    );
    const [adjustedOpacityScopeLeft, adjustedOpacityScopeTop] = this.getAdjustedScopePosition(
      opacityLeft,
      opacityTop,
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          <div class={CSS.controlAndScope}>
            <canvas
              class={CSS.colorField}
              onPointerDown={this.handleColorFieldPointerDown}
              ref={this.initColorField}
            />
            <div
              ariaLabel={vertical ? messages.value : messages.saturation}
              ariaValueMax={vertical ? HSV_LIMITS.v : HSV_LIMITS.s}
              ariaValueMin="0"
              ariaValueNow={(vertical ? color?.saturationv() : color?.value()) || "0"}
              class={{ [CSS.scope]: true, [CSS.colorFieldScope]: true }}
              onKeyDown={this.handleColorFieldScopeKeyDown}
              ref={this.storeColorFieldScope}
              role="slider"
              style={{
                top: `${adjustedColorFieldScopeTop || 0}px`,
                left: `${adjustedColorFieldScopeLeft || 0}px`,
              }}
              tabIndex="0"
            />
          </div>
          <div class={CSS.previewAndSliders}>
            <calcite-color-picker-swatch
              class={CSS.preview}
              color={selectedColorInHex}
              scale={this.alphaChannel ? "l" : this.scale}
            />
            <div class={CSS.sliders}>
              <div class={CSS.controlAndScope}>
                <canvas
                  class={{ [CSS.slider]: true, [CSS.hueSlider]: true }}
                  onPointerDown={this.handleHueSliderPointerDown}
                  ref={this.initHueSlider}
                />
                <div
                  ariaLabel={messages.hue}
                  ariaValueMax={HSV_LIMITS.h}
                  ariaValueMin="0"
                  ariaValueNow={color?.round().hue() || DEFAULT_COLOR.round().hue()}
                  class={{ [CSS.scope]: true, [CSS.hueScope]: true }}
                  onKeyDown={this.handleHueScopeKeyDown}
                  ref={this.storeHueScope}
                  role="slider"
                  style={{
                    top: `${adjustedHueScopeTop}px`,
                    left: `${adjustedHueScopeLeft}px`,
                  }}
                  tabIndex="0"
                />
              </div>
              {alphaChannel ? (
                <div class={CSS.controlAndScope}>
                  <canvas
                    class={{ [CSS.slider]: true, [CSS.opacitySlider]: true }}
                    onPointerDown={this.handleOpacitySliderPointerDown}
                    ref={this.initOpacitySlider}
                  />
                  <div
                    ariaLabel={messages.opacity}
                    ariaValueMax={OPACITY_LIMITS.max}
                    ariaValueMin={OPACITY_LIMITS.min}
                    ariaValueNow={(color || DEFAULT_COLOR).round().alpha()}
                    class={{ [CSS.scope]: true, [CSS.opacityScope]: true }}
                    onKeyDown={this.handleOpacityScopeKeyDown}
                    ref={this.storeOpacityScope}
                    role="slider"
                    style={{
                      top: `${adjustedOpacityScopeTop}px`,
                      left: `${adjustedOpacityScopeLeft}px`,
                    }}
                    tabIndex="0"
                  />
                </div>
              ) : null}
            </div>
          </div>
          {hexDisabled && channelsDisabled ? null : (
            <div
              class={{
                [CSS.controlSection]: true,
                [CSS.section]: true,
              }}
            >
              <div class={CSS.hexAndChannelsGroup}>
                {hexDisabled ? null : (
                  <div class={CSS.hexOptions}>
                    <calcite-color-picker-hex-input
                      allowEmpty={this.isClearable}
                      alphaChannel={alphaChannel}
                      class={CSS.control}
                      messages={messages}
                      numberingSystem={this.numberingSystem}
                      oncalciteColorPickerHexInputChange={this.handleHexInputChange}
                      scale={scale}
                      value={selectedColorInHex}
                    />
                  </div>
                )}
                {channelsDisabled ? null : (
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
          {savedDisabled ? null : (
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
                  {savedColors.map((color) => (
                    <calcite-color-picker-swatch
                      class={CSS.savedColor}
                      color={color}
                      key={color}
                      onClick={this.handleSavedColorSelect}
                      onKeyDown={this.handleSavedColorKeyDown}
                      scale={scale}
                      tabIndex={0}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </InteractiveContainer>
    );
  }

  private renderChannelsTabTitle(channelMode: this["channelMode"]): JsxNode {
    const { channelMode: activeChannelMode, messages } = this;
    const selected = channelMode === activeChannelMode;
    const label = channelMode === "rgb" ? messages.rgb : messages.hsv;

    return (
      <calcite-tab-title
        class={CSS.colorMode}
        data-color-mode={channelMode}
        key={channelMode}
        oncalciteTabsActivate={this.handleTabActivate}
        selected={selected}
      >
        {label}
      </calcite-tab-title>
    );
  }

  private renderChannelsTab(channelMode: this["channelMode"]): JsxNode {
    const { isClearable, channelMode: activeChannelMode, channels, messages, alphaChannel } = this;
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
                isClearable && !channelValue ? channelValue : alphaToOpacity(channelValue);
            }

            /* the channel container is ltr, so we apply the host's direction */
            return this.renderChannel(
              channelValue,
              index,
              channelAriaLabels[index],
              direction,
              isAlphaChannel ? "%" : "",
            );
          })}
        </div>
      </calcite-tab>
    );
  }

  private renderChannel(
    value: number | null,
    index: number,
    ariaLabel: string,
    direction: Direction,
    suffix?: string,
  ): JsxNode {
    return (
      <calcite-input-number
        class={CSS.channel}
        data-channel-index={index}
        dir={direction}
        key={index}
        label={ariaLabel}
        lang={this.messages._lang}
        numberButtonType="none"
        numberingSystem={this.numberingSystem}
        onKeyDown={this.handleKeyDown}
        oncalciteInputNumberChange={this.handleChannelChange}
        oncalciteInputNumberInput={this.handleChannelInput}
        oncalciteInternalInputNumberBlur={this.handleChannelBlur}
        oncalciteInternalInputNumberFocus={this.handleChannelFocus}
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
  }

  //#endregion
}
