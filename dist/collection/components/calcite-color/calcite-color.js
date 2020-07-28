import { Component, Element, Event, h, Host, Method, Prop, State, Watch } from "@stencil/core";
import Color from "color";
import { CSS, DEFAULT_COLOR, DEFAULT_STORAGE_KEY_PREFIX, DIMENSIONS, HSV_LIMITS, RGB_LIMITS, TEXT } from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
import { colorEqual, CSSColorMode, normalizeHex, parseMode } from "./utils";
export class CalciteColor {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public properties
        //
        //--------------------------------------------------------------------------
        /**
         * Internal prop for advanced use-cases.
         *
         * @internal
         */
        this.color = DEFAULT_COLOR;
        /** Label used for the blue channel */
        this.intlB = TEXT.b;
        /** Label used for the blue channel description */
        this.intlBlue = TEXT.blue;
        /** Label used for the delete color button. */
        this.intlDeleteColor = TEXT.deleteColor;
        /** Label used for the green channel */
        this.intlG = TEXT.g;
        /** Label used for the green channel description */
        this.intlGreen = TEXT.green;
        /** Label used for the hue channel */
        this.intlH = TEXT.h;
        /** Label used for the HSV mode */
        this.intlHsv = TEXT.hsv;
        /** Label used for the hex input */
        this.intlHex = TEXT.hex;
        /** Label used for the hue channel description */
        this.intlHue = TEXT.hue;
        /** Label used for the red channel */
        this.intlR = TEXT.r;
        /** Label used for the red channel description */
        this.intlRed = TEXT.red;
        /** Label used for the RGB mode */
        this.intlRgb = TEXT.rgb;
        /** Label used for the saturation channel */
        this.intlS = TEXT.s;
        /** Label used for the saturation channel description */
        this.intlSaturation = TEXT.saturation;
        /** Label used for the save color button. */
        this.intlSaveColor = TEXT.saveColor;
        /** Label used for the saved colors section */
        this.intlSaved = TEXT.saved;
        /** Label used for the value channel */
        this.intlV = TEXT.v;
        /** Label used for the  */
        this.intlValue = TEXT.value;
        /**
         * The scale of the color picker.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
        /**
         * The color value.
         *
         * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
         * a RGB, HSL or HSV object.
         *
         * The type will be preserved as the color is updated.
         */
        this.value = normalizeHex(DEFAULT_COLOR.hex());
        this.hueThumbState = "idle";
        this.mode = CSSColorMode.HEX;
        this.sliderThumbState = "idle";
        this.colorFieldAndSliderInteractive = false;
        this.channelMode = "rgb";
        this.channels = this.toChannels(DEFAULT_COLOR);
        this.dimensions = DIMENSIONS.m;
        this.savedColors = [];
        this.handleTabActivate = (event) => {
            this.channelMode = event.currentTarget.getAttribute("data-color-mode");
            this.updateChannelsFromColor(this.color);
        };
        this.handleHexInputChange = (event) => {
            event.stopPropagation();
            const { color } = this;
            const input = event.target;
            const hex = input.value;
            if (hex !== normalizeHex(color.hex())) {
                this.color = Color(hex);
            }
        };
        this.handleSavedColorSelect = (event) => {
            const swatch = event.currentTarget;
            this.color = Color(swatch.color);
        };
        this.handleChannelInput = (event) => {
            const input = event.target;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const limit = this.channelMode === "rgb"
                ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
                : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
            const clamped = Math.max(0, Math.min(Number(input.value), limit));
            input.value = `${clamped}`;
        };
        this.handleChannelChange = (event) => {
            const input = event.target;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const channels = [...this.channels];
            channels[channelIndex] = Number(input.value);
            this.updateColorFromChannels(channels);
        };
        this.handleSavedColorKeyDown = (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                this.handleSavedColorSelect(event);
            }
        };
        this.handleColorFieldAndSliderMouseLeave = () => {
            this.colorFieldAndSliderInteractive = false;
        };
        this.handleColorFieldAndSliderMouseEnterOrMove = ({ offsetY }) => {
            const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
            this.colorFieldAndSliderInteractive = offsetY <= colorFieldHeight + sliderHeight;
        };
        this.renderChannelsTabTitle = (channelMode) => {
            const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
            const active = channelMode === activeChannelMode;
            const label = channelMode === "rgb" ? intlRgb : intlHsv;
            return (h("calcite-tab-title", { active: active, class: CSS.colorMode, "data-color-mode": channelMode, onCalciteTabsActivate: this.handleTabActivate }, label));
        };
        this.renderChannelsTab = (channelMode) => {
            const { channelMode: activeChannelMode, channels, intlB, intlBlue, intlG, intlGreen, intlH, intlHue, intlR, intlRed, intlS, intlSaturation, intlV, intlValue } = this;
            const active = channelMode === activeChannelMode;
            const isRgb = channelMode === "rgb";
            const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
            const channelAriaLabels = isRgb
                ? [intlRed, intlGreen, intlBlue]
                : [intlHue, intlSaturation, intlValue];
            return (h("calcite-tab", { active: active, class: CSS.control },
                h("div", { class: CSS.channels }, channels.map((channel, index) => this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index])))));
        };
        this.renderChannel = (value, index, label, ariaLabel) => (h("calcite-input", { "aria-label": ariaLabel, class: CSS.channel, "data-channel-index": index, numberButtonType: "none", onInput: this.handleChannelInput, onChange: this.handleChannelChange, prefixText: label, scale: "s", type: "number", value: value.toString() }));
        this.deleteColor = () => {
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
        this.saveColor = () => {
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
        this.initColorFieldAndSlider = (canvas) => {
            this.fieldAndSliderRenderingContext = canvas.getContext("2d");
            this.setCanvasContextSize(canvas, {
                width: this.dimensions.colorField.width,
                height: this.dimensions.colorField.height +
                    this.dimensions.slider.height +
                    this.getSliderCapSpacing() * 2
            });
            this.drawColorFieldAndSlider();
            const yWithin = (y) => {
                const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
                if (y <= colorFieldHeight) {
                    return "color-field";
                }
                if (y <= colorFieldHeight + sliderHeight) {
                    return "slider";
                }
                return "none";
            };
            const captureColor = (x, y) => {
                const { dimensions: { colorField: { height, width } } } = this;
                const saturation = Math.round((HSV_LIMITS.s / width) * x);
                const value = Math.round((HSV_LIMITS.v / height) * (height - y));
                this.color = this.color.hsv().saturationv(saturation).value(value);
            };
            canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
                const region = yWithin(offsetY);
                if (region === "color-field") {
                    this.hueThumbState = "drag";
                    captureColor(offsetX, offsetY);
                }
                else if (region === "slider") {
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
                    const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
                    const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / width));
                    const centerY = Math.round(height - color.value() / (HSV_LIMITS.v / height));
                    const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, radius);
                    let transitionedBetweenHoverAndIdle = false;
                    if (prevHueThumbState === "idle" && hoveringThumb) {
                        this.hueThumbState = "hover";
                        transitionedBetweenHoverAndIdle = true;
                    }
                    else if (prevHueThumbState === "hover" && !hoveringThumb) {
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
                }
                else if (region === "slider") {
                    const { dimensions: { slider: { height: sliderHeight, width: sliderWidth }, thumb: { radius: thumbRadius } } } = this;
                    const prevSliderThumbState = this.sliderThumbState;
                    const sliderThumbColor = this.color.hsv().saturationv(100).value(100);
                    const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / sliderWidth));
                    const sliderThumbCenterY = Math.round((sliderHeight + this.getSliderCapSpacing()) / 2);
                    const hoveringSliderThumb = this.containsPoint(offsetX, offsetY, sliderThumbCenterX, sliderThumbCenterY, thumbRadius);
                    let sliderThumbTransitionedBetweenHoverAndIdle = false;
                    if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
                        this.sliderThumbState = "hover";
                        sliderThumbTransitionedBetweenHoverAndIdle = true;
                    }
                    else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
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
            const captureSliderColor = (x) => {
                const { dimensions: { slider: { width } } } = this;
                const hue = (360 / width) * x;
                this.color = this.color.hue(hue);
            };
        };
    }
    handleColorChange(color) {
        this.drawColorFieldAndSlider();
        const value = this.toValue(color);
        this.updateChannelsFromColor(color);
        if (this.mode === "hex" && value === normalizeHex(color.hex()) && this.value === value) {
            return;
        }
        this.value = value;
    }
    handleScaleChange(scale = "m") {
        this.updateDimensions(scale);
    }
    handleValueChange(value, oldValue) {
        const nextMode = parseMode(value);
        if (!nextMode) {
            console.warn(`ignoring invalid color value: ${value}`);
            this.value = oldValue;
            return;
        }
        const modeChanged = this.mode !== nextMode;
        this.mode = nextMode;
        const color = Color(value);
        const colorChanged = !colorEqual(color, this.color);
        if (modeChanged || colorChanged) {
            if (nextMode === "hex" && color.hex() === this.color.hex()) {
                return;
            }
            this.color = color;
            this.calciteColorChange.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        focusElement(this.hexInputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
        if (this.storageId && localStorage.getItem(storageKey)) {
            this.savedColors = JSON.parse(localStorage.getItem(storageKey));
        }
        const valueAttr = this.el.getAttribute("value");
        if (valueAttr) {
            this.handleValueChange(valueAttr, this.value);
        }
        this.updateDimensions(this.scale);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const { color, intlDeleteColor, el, intlHex, intlSaved, intlSaveColor, savedColors, scale, theme } = this;
        const selectedColorInHex = color.hex();
        const hexInputScale = scale !== "s" ? "m" : scale;
        const { colorFieldAndSliderInteractive } = this;
        const elementDir = getElementDir(el);
        return (h(Host, null,
            h("canvas", { class: {
                    [CSS.colorFieldAndSlider]: true,
                    [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
                }, onMouseEnter: this.handleColorFieldAndSliderMouseEnterOrMove, onMouseLeave: this.handleColorFieldAndSliderMouseLeave, onMouseMove: this.handleColorFieldAndSliderMouseEnterOrMove, ref: this.initColorFieldAndSlider }),
            h("div", { class: { [CSS.controlSection]: true, [CSS.section]: true } },
                h("div", { class: CSS.hexOptions },
                    h("span", { class: {
                            [CSS.header]: true,
                            [CSS.headerHex]: true,
                            [CSS.underlinedHeader]: true
                        } }, intlHex),
                    h("calcite-color-hex-input", { class: CSS.control, onCalciteColorHexInputChange: this.handleHexInputChange, ref: (node) => (this.hexInputNode = node), scale: hexInputScale, value: selectedColorInHex, theme: theme, dir: elementDir })),
                h("calcite-tabs", { class: {
                        [CSS.colorModeContainer]: true,
                        [CSS.splitSection]: true
                    }, dir: elementDir },
                    h("calcite-tab-nav", { slot: "tab-nav" },
                        this.renderChannelsTabTitle("rgb"),
                        this.renderChannelsTabTitle("hsv")),
                    this.renderChannelsTab("rgb"),
                    this.renderChannelsTab("hsv"))),
            h("div", { class: { [CSS.savedColorsSection]: true, [CSS.section]: true } },
                h("div", { class: CSS.header },
                    h("label", null, intlSaved),
                    h("div", { class: CSS.savedColorsButtons },
                        h("calcite-button", { appearance: "transparent", "aria-label": intlDeleteColor, class: CSS.deleteColor, color: "dark", iconStart: "minus", onClick: this.deleteColor, scale: scale }),
                        h("calcite-button", { appearance: "transparent", "aria-label": intlSaveColor, class: CSS.saveColor, color: "dark", iconStart: "plus", onClick: this.saveColor, scale: scale }))),
                h("div", { class: CSS.savedColors }, [
                    ...savedColors.map((color) => (h("calcite-color-swatch", { class: CSS.savedColor, color: color, active: selectedColorInHex === color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0, theme: theme })))
                ]))));
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    toValue(color) {
        const { mode } = this;
        const hexMode = "hex";
        if (mode.includes(hexMode)) {
            return normalizeHex(color[hexMode]());
        }
        if (mode.includes("-css")) {
            return color[mode.replace("-css", "").replace("a", "")]().string();
        }
        const colorObject = color[mode]().object();
        if (mode.endsWith("a")) {
            // normalize alpha prop
            colorObject.a = colorObject.alpha;
            delete colorObject.alpha;
        }
        return colorObject;
    }
    getSliderCapSpacing() {
        const { dimensions: { slider: { height }, thumb: { radius } } } = this;
        return radius * 2 - height;
    }
    updateDimensions(scale = "m") {
        this.dimensions = DIMENSIONS[scale];
    }
    drawColorFieldAndSlider() {
        if (!this.fieldAndSliderRenderingContext) {
            return;
        }
        this.drawColorField();
        this.drawHueSlider();
    }
    drawColorField() {
        const context = this.fieldAndSliderRenderingContext;
        const { dimensions: { colorField: { height, width } } } = this;
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
    setCanvasContextSize(canvas, { height, width }) {
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;
        const context = canvas.getContext("2d");
        context.scale(devicePixelRatio, devicePixelRatio);
    }
    containsPoint(testPointX, testPointY, boundsX, boundsY, boundsRadius) {
        return (Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
            Math.pow(boundsRadius, 2));
    }
    drawActiveColorFieldColor() {
        const color = this.color.hsv();
        const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
        const x = color.saturationv() / (HSV_LIMITS.s / width);
        const y = height - color.value() / (HSV_LIMITS.v / height);
        this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.hueThumbState);
    }
    drawThumb(context, radius, x, y, color, state) {
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
    drawActiveHueSliderColor() {
        const color = this.color.hsv().saturationv(100).value(100);
        const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width }, thumb: { radius } } } = this;
        const x = color.hue() / (360 / width);
        const y = height / 2 + colorFieldHeight;
        this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.sliderThumbState);
    }
    drawHueSlider() {
        const context = this.fieldAndSliderRenderingContext;
        const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width } } } = this;
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
    updateColorFromChannels(channels) {
        this.color = Color(channels, this.channelMode);
    }
    updateChannelsFromColor(color) {
        this.channels = this.toChannels(color);
    }
    toChannels(color) {
        const { channelMode } = this;
        return color[channelMode]()
            .array()
            .map((value) => Math.floor(value));
    }
    static get is() { return "calcite-color"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-color.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-color.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "InternalColor",
                "resolved": "Color<ColorParam>",
                "references": {
                    "InternalColor": {
                        "location": "import",
                        "path": "../../interfaces/Color"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Internal prop for advanced use-cases."
            },
            "defaultValue": "DEFAULT_COLOR"
        },
        "intlB": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the blue channel"
            },
            "attribute": "intl-b",
            "reflect": false,
            "defaultValue": "TEXT.b"
        },
        "intlBlue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the blue channel description"
            },
            "attribute": "intl-blue",
            "reflect": false,
            "defaultValue": "TEXT.blue"
        },
        "intlDeleteColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the delete color button."
            },
            "attribute": "intl-delete-color",
            "reflect": false,
            "defaultValue": "TEXT.deleteColor"
        },
        "intlG": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the green channel"
            },
            "attribute": "intl-g",
            "reflect": false,
            "defaultValue": "TEXT.g"
        },
        "intlGreen": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the green channel description"
            },
            "attribute": "intl-green",
            "reflect": false,
            "defaultValue": "TEXT.green"
        },
        "intlH": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the hue channel"
            },
            "attribute": "intl-h",
            "reflect": false,
            "defaultValue": "TEXT.h"
        },
        "intlHsv": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the HSV mode"
            },
            "attribute": "intl-hsv",
            "reflect": false,
            "defaultValue": "TEXT.hsv"
        },
        "intlHex": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the hex input"
            },
            "attribute": "intl-hex",
            "reflect": false,
            "defaultValue": "TEXT.hex"
        },
        "intlHue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the hue channel description"
            },
            "attribute": "intl-hue",
            "reflect": false,
            "defaultValue": "TEXT.hue"
        },
        "intlR": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the red channel"
            },
            "attribute": "intl-r",
            "reflect": false,
            "defaultValue": "TEXT.r"
        },
        "intlRed": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the red channel description"
            },
            "attribute": "intl-red",
            "reflect": false,
            "defaultValue": "TEXT.red"
        },
        "intlRgb": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the RGB mode"
            },
            "attribute": "intl-rgb",
            "reflect": false,
            "defaultValue": "TEXT.rgb"
        },
        "intlS": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the saturation channel"
            },
            "attribute": "intl-s",
            "reflect": false,
            "defaultValue": "TEXT.s"
        },
        "intlSaturation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the saturation channel description"
            },
            "attribute": "intl-saturation",
            "reflect": false,
            "defaultValue": "TEXT.saturation"
        },
        "intlSaveColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the save color button."
            },
            "attribute": "intl-save-color",
            "reflect": false,
            "defaultValue": "TEXT.saveColor"
        },
        "intlSaved": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the saved colors section"
            },
            "attribute": "intl-saved",
            "reflect": false,
            "defaultValue": "TEXT.saved"
        },
        "intlV": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the value channel"
            },
            "attribute": "intl-v",
            "reflect": false,
            "defaultValue": "TEXT.v"
        },
        "intlValue": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Label used for the"
            },
            "attribute": "intl-value",
            "reflect": false,
            "defaultValue": "TEXT.value"
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Exclude<Scale, \"xs\" | \"xl\">",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "Exclude": {
                        "location": "global"
                    },
                    "Scale": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The scale of the color picker."
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "storageId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Storage ID for colors."
            },
            "attribute": "storage-id",
            "reflect": false
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Theme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "Theme": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's theme."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "ColorValue",
                "resolved": "HSL | HSL & ObjectWithAlpha | HSV | HSV & ObjectWithAlpha | RGB | RGB & ObjectWithAlpha | string",
                "references": {
                    "ColorValue": {
                        "location": "import",
                        "path": "../../interfaces/Color"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The color value.\n\nThis value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}\na RGB, HSL or HSV object.\n\nThe type will be preserved as the color is updated."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "normalizeHex(DEFAULT_COLOR.hex())"
        }
    }; }
    static get states() { return {
        "colorFieldAndSliderInteractive": {},
        "channelMode": {},
        "channels": {},
        "dimensions": {},
        "savedColors": {}
    }; }
    static get events() { return [{
            "method": "calciteColorChange",
            "name": "calciteColorChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets focus on the component.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "color",
            "methodName": "handleColorChange"
        }, {
            "propName": "scale",
            "methodName": "handleScaleChange"
        }, {
            "propName": "value",
            "methodName": "handleValueChange"
        }]; }
}
