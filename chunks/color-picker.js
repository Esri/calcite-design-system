import { h as se, L as le, k as E, s as c, o as $, x as u, E as x, j as ne } from "./iframe.js";
import { n as v } from "./ref.js";
import { c as re } from "./repeat.js";
import { i as I } from "./keyed.js";
import { D as g, C as K, S as A, g as ce, a as he, n as O, h as S, p as H, b, c as P, d as D, e as de, f as U, O as y, R as k, H as p, i as n, o as j, t as pe, j as W, k as N, l as ue, m as R, q as _ } from "./utils4.js";
import { e as B, f as Ce, g as fe } from "./dom.js";
import { u as me, I as ge } from "./interactive.js";
import { i as ve } from "./key.js";
import { c as Se } from "./component.js";
import { c as be, r as V, a as ye } from "./math.js";
import { u as we } from "./useT9n.js";
import { c as $e } from "./observers.js";
import { t as X } from "./throttle.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const xe = se`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal);inline-size:var(--calcite-internal-color-picker-min-width);min-inline-size:var(--calcite-internal-color-picker-min-width)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-color-picker-min-width: 200px;--calcite-color-picker-spacing: 8px}:host([scale=s]) .saved-colors{gap:.25rem;grid-template-columns:repeat(auto-fill,20px)}:host([scale=m]){--calcite-internal-color-picker-min-width: 240px;--calcite-color-picker-spacing: 12px}:host([scale=l]){--calcite-internal-color-picker-min-width: 304px;--calcite-color-picker-spacing: 16px;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill,32px)}:host([scale=l]) .control-section{display:flex;flex-direction:column;flex-wrap:wrap;align-items:baseline}:host([scale=l]) .color-hex-options{inline-size:100%;display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around}:host([scale=l]) .color-mode-container{flex-shrink:3}.container{background-color:var(--calcite-color-foreground-1);display:flex;flex-direction:column;block-size:min-content;border:1px solid var(--calcite-color-border-1)}.control-and-scope{position:relative;display:flex;cursor:pointer;touch-action:none}.color-field,.control-and-scope{-webkit-user-select:none;user-select:none}.scope{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);block-size:1px;inline-size:1px;border-radius:9999px;background-color:transparent;font-size:var(--calcite-font-size--1);outline-color:transparent}.scope:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));outline-offset:6px}.hex-and-channels-group{display:flex;inline-size:100%;flex-direction:column;flex-wrap:wrap}.section{padding-block:0 var(--calcite-color-picker-spacing);padding-inline:var(--calcite-color-picker-spacing)}.section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}.sliders{display:flex;flex-direction:column;justify-content:space-between;margin-inline-start:var(--calcite-color-picker-spacing);gap:var(--calcite-spacing-xxs)}.preview-and-sliders{display:flex;align-items:center;padding:var(--calcite-color-picker-spacing)}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;color:var(--calcite-color-text-1)}.color-mode-container{padding-block-start:var(--calcite-color-picker-spacing)}.channels{display:flex}.channel{flex-grow:1}.channel[data-channel-index="3"]{margin-inline-start:-1px;min-inline-size:81px}:host([scale=s]) .channel[data-channel-index="3"]{min-inline-size:68px}:host([scale=l]) .channel[data-channel-index="3"]{min-inline-size:88px}.saved-colors{display:grid;gap:.5rem;padding-block-start:var(--calcite-color-picker-spacing);grid-template-columns:repeat(auto-fill,24px)}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-color-brand);outline-offset:2px}.saved-color:hover{transition:outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;outline:2px solid var(--calcite-color-border-2);outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}`, q = 16;
class Ae extends le {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this._color = g, this.internalColorUpdateContext = null, this.isActiveChannelInputEmpty = !1, this.mode = K.HEX, this.resizeObserver = $e("resize", (e) => this.resizeCanvas(e)), this.shiftKeyChannelAdjustment = 0, this.upOrDownArrowKeyTracker = null, this._valueWasSet = !1, this.channelMode = "rgb", this.channels = this.toChannels(g), this.staticDimensions = A.m, this.savedColors = [], this.allowEmpty = !1, this.alphaChannel = !1, this.channelsDisabled = !1, this.clearable = !1, this.disabled = !1, this.format = "auto", this.hexDisabled = !1, this.messages = we({ blocking: !0 }), this.savedDisabled = !1, this.scale = "m", this.calciteColorPickerChange = E({ cancelable: !1 }), this.calciteColorPickerInput = E({ cancelable: !1 }), this.captureColorFieldColor = (e, t, i = !0) => {
      const { width: o, height: a } = this.dynamicDimensions.colorField, s = Math.round(p.s / o * e), l = Math.round(p.v / a * (a - t));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(s).value(l), i);
    }, this.drawColorControls = X((e = "all") => {
      (e === "all" || e === "color-field") && this.colorFieldRenderingContext && this.drawColorField(), (e === "all" || e === "hue-slider") && this.hueSliderRenderingContext && this.drawHueSlider(), this.alphaChannel && (e === "all" || e === "opacity-slider") && this.opacitySliderRenderingContext && this.drawOpacitySlider();
    }, q), this.globalPointerMoveHandler = (e) => {
      const { activeCanvasInfo: t, el: i } = this;
      if (!i.isConnected || !t)
        return;
      const { context: o, bounds: a } = t;
      let s, l;
      const { clientX: r, clientY: h } = e;
      o.canvas.matches(":hover") ? (s = r - a.x, l = h - a.y) : (r < a.x + a.width && r > a.x ? s = r - a.x : r < a.x ? s = 0 : s = a.width, h < a.y + a.height && h > a.y ? l = h - a.y : h < a.y ? l = 0 : l = a.height), o === this.colorFieldRenderingContext ? this.captureColorFieldColor(s, l, !1) : o === this.hueSliderRenderingContext ? this.captureHueSliderColor(s) : o === this.opacitySliderRenderingContext && this.captureOpacitySliderValue(s);
    }, this.globalPointerUpHandler = (e) => {
      if (!B(e))
        return;
      const t = this.activeCanvasInfo;
      this.activeCanvasInfo = null, this.drawColorControls(), t && this.calciteColorPickerChange.emit();
    }, this.resizeCanvas = X((e) => {
      if (!this.hasUpdated)
        return;
      const [t] = e, i = Math.floor(t.contentBoxSize[0].inlineSize);
      this.dynamicDimensions.colorField.width !== i && (this.updateDynamicDimensions(i), this.updateCanvasSize(), this.drawColorControls());
    }, q), this.updateDynamicDimensions = (e) => {
      const t = {
        width: ce(e, this.staticDimensions, this.alphaChannel),
        height: this.staticDimensions.slider.height
      };
      this.dynamicDimensions = {
        colorField: he(e),
        slider: t
      };
    }, this.listen("keydown", this.handleChannelKeyUpOrDown, { capture: !0 }), this.listen("keyup", this.handleChannelKeyUpOrDown, { capture: !0 });
  }
  static {
    this.properties = { channelMode: 16, channels: 16, colorFieldScopeLeft: 16, colorFieldScopeTop: 16, staticDimensions: 16, hueScopeLeft: 16, opacityScopeLeft: 16, savedColors: 16, scopeOrientation: 16, allowEmpty: 7, alphaChannel: 5, channelsDisabled: 5, clearable: 7, color: 0, disabled: 7, format: 3, hexDisabled: 5, messageOverrides: 0, numberingSystem: 3, savedDisabled: 7, scale: 3, storageId: 3, value: 1 };
  }
  static {
    this.styles = xe;
  }
  get baseColorFieldColor() {
    return this.color || this.previousColor || g;
  }
  get effectiveSliderWidth() {
    return this.dynamicDimensions.slider.width;
  }
  /**
   * Internal prop for advanced use-cases.
   *
   * @private
   */
  get color() {
    return this._color;
  }
  set color(e) {
    const t = this._color;
    this._color = e, this.handleColorChange(e, t);
  }
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
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    this._value = e, this.handleValueChange(e, t), this._valueWasSet = !0;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await Se(this), Ce(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), this.observeResize();
  }
  async load() {
    this._valueWasSet || (this._value ??= O(S(g, this.alphaChannel))), this.handleAllowEmptyOrClearableChange();
    const { isClearable: e, color: t, format: i, value: o } = this, a = e && !o, s = H(o), l = a || i === "auto" && s || i === s, r = a ? null : l ? b(o) : t;
    l || this.showIncompatibleColorWarning(o, i), this.setMode(i, !1), this.internalColorSet(r, !1, "initial"), this.updateStaticDimensions(this.scale), this.updateDynamicDimensions(A[this.scale].minWidth);
    const h = `${P}${this.storageId}`;
    this.storageId && localStorage.getItem(h) && (this.savedColors = JSON.parse(localStorage.getItem(h)));
  }
  willUpdate(e) {
    (e.has("allowEmpty") && (this.hasUpdated || this.allowEmpty !== !1) || e.has("clearable") && (this.hasUpdated || this.clearable !== !1)) && this.handleAllowEmptyOrClearableChange(), e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) && this.handleAlphaChannelChange(this.alphaChannel), this.hasUpdated && (e.has("alphaChannel") && this.alphaChannel !== !1 || e.has("staticDimensions") && this.staticDimensions !== A.m) && this.handleAlphaChannelDimensionsChange(), (e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) || e.has("format") && (this.hasUpdated || this.format !== "auto")) && this.handleFormatOrAlphaChannelChange(), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handleScaleChange(this.scale);
  }
  updated() {
    me(this);
  }
  loaded() {
    this.handleAlphaChannelDimensionsChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointermove", this.globalPointerMoveHandler), window.removeEventListener("pointerup", this.globalPointerUpHandler), this.resizeObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  observeResize() {
    this.resizeObserver?.observe(this.el);
  }
  handleAllowEmptyOrClearableChange() {
    this.isClearable = this.clearable || this.allowEmpty;
  }
  handleAlphaChannelChange(e) {
    const { format: t } = this;
    e && t !== "auto" && !D(t) && (console.warn(`ignoring alphaChannel as the current format (${t}) does not support alpha`), this.alphaChannel = !1);
  }
  handleAlphaChannelDimensionsChange() {
    this.drawColorControls();
  }
  handleColorChange(e, t) {
    this.drawColorControls(), this.updateChannelsFromColor(e), this.previousColor = t;
  }
  handleFormatOrAlphaChannelChange() {
    this.setMode(this.format), this.internalColorSet(this.color, !1, "internal");
  }
  handleScaleChange(e = "m") {
    this.updateStaticDimensions(e), this.updateCanvasSize(), this.drawColorControls();
  }
  handleValueChange(e, t) {
    const { isClearable: i, format: o } = this, a = !i || e;
    let s = !1;
    if (a) {
      const d = H(e);
      if (!d || o !== "auto" && d !== o) {
        this.showIncompatibleColorWarning(e, o), this._value = t;
        return;
      }
      s = this.mode !== d, this.setMode(d, this.internalColorUpdateContext === null);
    }
    const l = this.activeCanvasInfo;
    if (this.internalColorUpdateContext === "initial")
      return;
    if (this.internalColorUpdateContext === "user-interaction") {
      this.calciteColorPickerInput.emit(), l || this.calciteColorPickerChange.emit();
      return;
    }
    const r = i && !e ? null : b(e != null && typeof e == "object" && D(this.mode) ? de(e) : e), h = !U(r, this.color);
    (s || h) && this.internalColorSet(r, this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css")) || this.internalColorUpdateContext === "internal", "internal");
  }
  handleTabActivate(e) {
    this.channelMode = e.currentTarget.getAttribute("data-color-mode"), this.updateChannelsFromColor(this.color);
  }
  handleColorFieldScopeKeyDown(e) {
    const { key: t } = e, i = {
      ArrowUp: { x: 0, y: -10 },
      ArrowRight: { x: 10, y: 0 },
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 }
    };
    i[t] && (e.preventDefault(), this.scopeOrientation = t === "ArrowDown" || t === "ArrowUp" ? "vertical" : "horizontal", this.captureColorFieldColor(this.colorFieldScopeLeft + i[t].x || 0, this.colorFieldScopeTop + i[t].y || 0, !1));
  }
  handleHueScopeKeyDown(e) {
    const t = e.shiftKey ? 10 : 1, { key: i } = e, o = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1
    };
    if (o[i]) {
      e.preventDefault();
      const a = o[i] * t, s = this.baseColorFieldColor.hue(), l = this.baseColorFieldColor.hue(s + a);
      this.internalColorSet(l, !1);
    }
  }
  handleHexInputChange(e) {
    e.stopPropagation();
    const { isClearable: t, color: i } = this, a = e.target.value;
    if (t && !a) {
      this.internalColorSet(null);
      return;
    }
    const s = i && O(S(i, D(this.mode)));
    a !== s && this.internalColorSet(b(a));
  }
  handleSavedColorSelect(e) {
    const t = e.currentTarget;
    this.internalColorSet(b(t.color));
  }
  handleChannelInput(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), a = i === 3 ? y.max : this.channelMode === "rgb" ? k[Object.keys(k)[i]] : p[Object.keys(p)[i]];
    let s;
    if (!t.value)
      s = "", this.isActiveChannelInputEmpty = !0, this.upOrDownArrowKeyTracker = null;
    else {
      const r = Number(t.value) + this.shiftKeyChannelAdjustment;
      s = be(r, 0, a).toString();
    }
    t.value = s, s !== "" && this.shiftKeyChannelAdjustment !== 0 ? this.handleChannelChange(e) : s !== "" && this.handleChannelChange(e);
  }
  handleChannelBlur(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), o = [...this.channels];
    !t.value && !this.isClearable && (t.value = o[i]?.toString());
  }
  handleChannelFocus(e) {
    e.currentTarget.selectText();
  }
  // using @Listen as a workaround for VDOM listener not firing
  handleChannelKeyUpOrDown(e) {
    this.shiftKeyChannelAdjustment = 0;
    const { key: t } = e;
    if (t !== "ArrowUp" && t !== "ArrowDown" || !e.composedPath().some((a) => a.classList?.contains(n.channel)))
      return;
    const { shiftKey: i } = e;
    if (e.preventDefault(), !this.color) {
      this.internalColorSet(this.previousColor), e.stopPropagation();
      return;
    }
    const o = 9;
    this.shiftKeyChannelAdjustment = t === "ArrowUp" && i ? o : t === "ArrowDown" && i ? -9 : 0, t === "ArrowUp" && (this.upOrDownArrowKeyTracker = "up"), t === "ArrowDown" && (this.upOrDownArrowKeyTracker = "down");
  }
  getChannelInputLimit(e) {
    return this.channelMode === "rgb" ? k[Object.keys(k)[e]] : p[Object.keys(p)[e]];
  }
  handleChannelChange(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), o = [...this.channels];
    if (this.isClearable && !t.value) {
      this.channels = [null, null, null, null], this.internalColorSet(null);
      return;
    }
    const s = i === 3;
    this.isActiveChannelInputEmpty && this.upOrDownArrowKeyTracker && (t.value = this.upOrDownArrowKeyTracker === "up" ? (o[i] + 1 <= this.getChannelInputLimit(i) ? o[i] + 1 : this.getChannelInputLimit(i)).toString() : (o[i] - 1 >= 0 ? o[i] - 1 : 0).toString(), this.isActiveChannelInputEmpty = !1, this.upOrDownArrowKeyTracker = null);
    const l = t.value ? Number(t.value) : o[i];
    o[i] = s ? j(l) : l, this.updateColorFromChannels(o);
  }
  handleSavedColorKeyDown(e) {
    ve(e.key) && (e.preventDefault(), this.handleSavedColorSelect(e));
  }
  handleColorFieldPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.colorFieldRenderingContext, this.captureColorFieldColor, this.colorFieldScopeNode);
  }
  focusScope(e) {
    requestAnimationFrame(() => {
      e.focus();
    });
  }
  handleHueSliderPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.hueSliderRenderingContext, this.captureHueSliderColor, this.hueScopeNode);
  }
  handleOpacitySliderPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.opacitySliderRenderingContext, this.captureOpacitySliderValue, this.opacityScopeNode);
  }
  handleCanvasControlPointerDown(e, t, i, o) {
    B(e) && (window.addEventListener("pointermove", this.globalPointerMoveHandler), window.addEventListener("pointerup", this.globalPointerUpHandler, {
      once: !0
    }), this.activeCanvasInfo = {
      context: t,
      bounds: t.canvas.getBoundingClientRect()
    }, i.call(this, e.offsetX, e.offsetY), this.focusScope(o));
  }
  storeColorFieldScope(e) {
    this.colorFieldScopeNode = e;
  }
  storeHueScope(e) {
    this.hueScopeNode = e;
  }
  handleKeyDown(e) {
    e.key === "Enter" && e.preventDefault();
  }
  showIncompatibleColorWarning(e, t) {
    console.warn(`ignoring color value (${e}) as it is not compatible with the current format (${t})`);
  }
  setMode(e, t = !0) {
    const i = e === "auto" ? this.mode : e;
    this.mode = this.ensureCompatibleMode(i, t);
  }
  ensureCompatibleMode(e, t) {
    const { alphaChannel: i } = this, o = D(e);
    if (i && !o) {
      const a = pe(e);
      return t && console.warn(`setting format to (${a}) as the provided one (${e}) does not support alpha`), a;
    }
    if (!i && o) {
      const a = W(e);
      return t && console.warn(`setting format to (${a}) as the provided one (${e}) does not support alpha`), a;
    }
    return e;
  }
  captureHueSliderColor(e) {
    const t = N / this.effectiveSliderWidth * e;
    this.internalColorSet(this.baseColorFieldColor.hue(t), !1);
  }
  captureOpacitySliderValue(e) {
    const t = j(y.max / this.effectiveSliderWidth * e);
    this.internalColorSet(this.baseColorFieldColor.alpha(t), !1);
  }
  internalColorSet(e, t = !0, i = "user-interaction") {
    t && U(e, this.color) || (this.internalColorUpdateContext = i, this.color = e, this.value = this.toValue(e), this.internalColorUpdateContext = null);
  }
  toValue(e, t = this.mode) {
    if (!e)
      return null;
    if (t.includes("hex")) {
      const a = t === K.HEXA;
      return O(S(e.round(), a), a);
    }
    if (t.includes("-css")) {
      const a = e[t.replace("-css", "").replace("a", "")]().round().string();
      if ((t.endsWith("a") || t.endsWith("a-css")) && e.alpha() === 1) {
        const l = a.slice(0, 3), r = a.slice(4, -1);
        return `${l}a(${r}, ${e.alpha()})`;
      }
      return a;
    }
    const o = (
      /* Color() does not support hsva, hsla nor rgba, so we use the non-alpha mode */
      e[W(t)]().round().object()
    );
    return t.endsWith("a") ? ue(o) : o;
  }
  getSliderCapSpacing() {
    const { staticDimensions: { slider: { height: e }, thumb: { radius: t } } } = this;
    return t * 2 - e;
  }
  updateStaticDimensions(e = "m") {
    this.staticDimensions = A[e];
  }
  deleteColor() {
    const e = S(this.color, this.alphaChannel);
    if (!(this.savedColors.indexOf(e) > -1))
      return;
    const i = this.savedColors.filter((a) => a !== e);
    this.savedColors = i;
    const o = `${P}${this.storageId}`;
    this.storageId && localStorage.setItem(o, JSON.stringify(i));
  }
  saveColor() {
    const e = S(this.color, this.alphaChannel);
    if (this.savedColors.indexOf(e) > -1)
      return;
    const i = [...this.savedColors, e];
    this.savedColors = i;
    const o = `${P}${this.storageId}`;
    this.storageId && localStorage.setItem(o, JSON.stringify(i));
  }
  drawColorField() {
    const e = this.colorFieldRenderingContext, { width: t, height: i } = this.dynamicDimensions.colorField;
    e.fillStyle = this.baseColorFieldColor.hsv().saturationv(100).value(100).alpha(1).string(), e.fillRect(0, 0, t, i);
    const o = e.createLinearGradient(0, 0, t, 0);
    o.addColorStop(0, "rgba(255,255,255,1)"), o.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = o, e.fillRect(0, 0, t, i);
    const a = e.createLinearGradient(0, 0, 0, i);
    a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(1, "rgba(0,0,0,1)"), e.fillStyle = a, e.fillRect(0, 0, t, i), this.drawActiveColorFieldColor();
  }
  setCanvasContextSize(e, { height: t, width: i }) {
    if (!e)
      return;
    const o = window.devicePixelRatio || 1;
    e.width = i * o, e.height = t * o, e.style.height = `${t}px`, e.style.width = `${i}px`, e.getContext("2d").scale(o, o);
  }
  initColorField(e) {
    e && (this.colorFieldRenderingContext = e.getContext("2d"), this.updateCanvasSize("color-field"), this.drawColorControls());
  }
  initHueSlider(e) {
    e && (this.hueSliderRenderingContext = e.getContext("2d"), this.updateCanvasSize("hue-slider"), this.drawHueSlider());
  }
  initOpacitySlider(e) {
    e && (this.opacitySliderRenderingContext = e.getContext("2d"), this.updateCanvasSize("opacity-slider"), this.drawOpacitySlider());
  }
  updateCanvasSize(e = "all") {
    const { dynamicDimensions: t, staticDimensions: i } = this;
    (e === "all" || e === "color-field") && this.setCanvasContextSize(this.colorFieldRenderingContext?.canvas, t.colorField);
    const o = {
      width: this.effectiveSliderWidth,
      height: i.slider.height + (i.thumb.radius - t.slider.height / 2) * 2
    };
    (e === "all" || e === "hue-slider") && this.setCanvasContextSize(this.hueSliderRenderingContext?.canvas, o), (e === "all" || e === "opacity-slider") && this.setCanvasContextSize(this.opacitySliderRenderingContext?.canvas, o);
  }
  drawActiveColorFieldColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e.hsv(), { staticDimensions: { thumb: { radius: i } } } = this, { width: o, height: a } = this.dynamicDimensions.colorField, s = t.saturationv() / (p.s / o), l = a - t.value() / (p.v / a);
    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = s, this.colorFieldScopeTop = l;
    }), this.drawThumb(this.colorFieldRenderingContext, i, s, l, t, !1);
  }
  drawThumb(e, t, i, o, a, s) {
    const r = 2 * Math.PI, h = 1;
    if (e.beginPath(), e.arc(i, o, t, 0, r), e.fillStyle = "#fff", e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = h, e.stroke(), s && a.alpha() < 1) {
      const C = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
      e.beginPath(), e.arc(i, o, t - 3, 0, r), e.fillStyle = C, e.fill();
    }
    e.globalCompositeOperation = "source-atop", e.beginPath(), e.arc(i, o, t - 3, 0, r);
    const d = s ? a.alpha() : 1;
    e.fillStyle = a.rgb().alpha(d).string(), e.fill(), e.globalCompositeOperation = "source-over";
  }
  drawActiveHueSliderColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e.hsv().saturationv(100).value(100), { staticDimensions: { thumb: { radius: i } } } = this, o = this.effectiveSliderWidth, a = t.hue() / (N / o), s = i, l = this.getSliderBoundX(a, o, i);
    requestAnimationFrame(() => {
      this.hueScopeLeft = l;
    }), this.drawThumb(this.hueSliderRenderingContext, i, l, s, t, !1);
  }
  drawHueSlider() {
    const e = this.hueSliderRenderingContext, { staticDimensions: { slider: { height: t }, thumb: { radius: i } } } = this, o = 0, a = i - t / 2, s = this.effectiveSliderWidth, l = e.createLinearGradient(0, 0, s, 0), r = [
      "red",
      "yellow",
      "lime",
      "cyan",
      "blue",
      "magenta",
      "#ff0004"
    ], h = 1 / (r.length - 1);
    let d = 0;
    r.forEach((C) => {
      l.addColorStop(d, b(C).string()), d += h;
    }), e.clearRect(0, 0, s, t + this.getSliderCapSpacing() * 2), this.drawSliderPath(e, t, s, o, a), e.fillStyle = l, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveHueSliderColor();
  }
  drawOpacitySlider() {
    const e = this.opacitySliderRenderingContext, { baseColorFieldColor: t, staticDimensions: { slider: { height: i }, thumb: { radius: o } } } = this, a = 0, s = o - i / 2, l = this.effectiveSliderWidth;
    e.clearRect(0, 0, l, i + this.getSliderCapSpacing() * 2);
    const r = e.createLinearGradient(0, s, l, 0), h = t.rgb().alpha(0), d = t.rgb().alpha(0.5), C = t.rgb().alpha(1);
    r.addColorStop(0, h.string()), r.addColorStop(0.5, d.string()), r.addColorStop(1, C.string()), this.drawSliderPath(e, i, l, a, s);
    const f = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
    e.fillStyle = f, e.fill(), e.fillStyle = r, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveOpacitySliderColor();
  }
  drawSliderPath(e, t, i, o, a) {
    const s = t / 2 + 1;
    e.beginPath(), e.moveTo(o + s, a), e.lineTo(o + i - s, a), e.quadraticCurveTo(o + i, a, o + i, a + s), e.lineTo(o + i, a + t - s), e.quadraticCurveTo(o + i, a + t, o + i - s, a + t), e.lineTo(o + s, a + t), e.quadraticCurveTo(o, a + t, o, a + t - s), e.lineTo(o, a + s), e.quadraticCurveTo(o, a, o + s, a), e.closePath();
  }
  getCheckeredBackgroundPattern() {
    if (this.checkerPattern)
      return this.checkerPattern;
    const e = document.createElement("canvas");
    e.width = 10, e.height = 10;
    const t = e.getContext("2d");
    return t.fillStyle = "#ccc", t.fillRect(0, 0, 10, 10), t.fillStyle = "#fff", t.fillRect(0, 0, 5, 5), t.fillRect(5, 5, 5, 5), this.checkerPattern = e, e;
  }
  drawActiveOpacitySliderColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e, { staticDimensions: { thumb: { radius: i } } } = this, o = this.effectiveSliderWidth, a = R(t.alpha()) / (y.max / o), s = i, l = this.getSliderBoundX(a, o, i);
    requestAnimationFrame(() => {
      this.opacityScopeLeft = l;
    }), this.drawThumb(this.opacitySliderRenderingContext, i, l, s, t, !0);
  }
  getSliderBoundX(e, t, i) {
    const o = ye(e, t, i);
    return o === 0 ? e : o === -1 ? V(e, 0, t, i, i * 2) : V(e, 0, t, t - i * 2, t - i);
  }
  storeOpacityScope(e) {
    this.opacityScopeNode = e;
  }
  handleOpacityScopeKeyDown(e) {
    const t = e.shiftKey ? 10 : 1, { key: i } = e, o = {
      ArrowUp: 0.01,
      ArrowRight: 0.01,
      ArrowDown: -0.01,
      ArrowLeft: -0.01
    };
    if (o[i]) {
      e.preventDefault();
      const a = o[i] * t, s = this.baseColorFieldColor.alpha(), l = this.baseColorFieldColor.alpha(s + a);
      this.internalColorSet(l, !1);
    }
  }
  updateColorFromChannels(e) {
    this.internalColorSet(b(e, this.channelMode));
  }
  updateChannelsFromColor(e) {
    this.channels = e ? this.toChannels(e) : [null, null, null, null];
  }
  toChannels(e) {
    const { channelMode: t } = this, i = e[t]().array().map((o, a) => a === 3 ? o : Math.floor(o));
    return i.length === 3 && i.push(1), i;
  }
  getAdjustedScopePosition(e, t) {
    return [e - _ / 2, t - _ / 2];
  }
  // #endregion
  // #region Rendering
  render() {
    const { channelsDisabled: e, color: t, colorFieldScopeLeft: i, colorFieldScopeTop: o, staticDimensions: { thumb: { radius: a } }, hexDisabled: s, hueScopeLeft: l, messages: r, alphaChannel: h, opacityScopeLeft: d, savedColors: C, savedDisabled: f, scale: m, scopeOrientation: w } = this, M = this.effectiveSliderWidth, L = t ? S(t, h) : null, G = a, Y = l ?? M * g.hue() / p.h, J = a, Z = d ?? M * R(g.alpha()) / y.max, z = t === void 0, F = w === "vertical", [Q, ee] = this.getAdjustedScopePosition(i, o), [te, ie] = this.getAdjustedScopePosition(Y, G), [oe, ae] = this.getAdjustedScopePosition(Z, J);
    return ge({ disabled: this.disabled, children: u`<div class=${c(n.container)}><div class=${c(n.controlAndScope)}><canvas class=${c(n.colorField)} @pointerdown=${this.handleColorFieldPointerDown} ${v(this.initColorField)}></canvas><div .ariaLabel=${F ? r.value : r.saturation} .ariaValueMax=${F ? p.v : p.s} aria-valuemin=0 .ariaValueNow=${(F ? t?.saturationv() : t?.value()) || "0"} class=${c({ [n.scope]: !0, [n.colorFieldScope]: !0 })} @keydown=${this.handleColorFieldScopeKeyDown} role=slider style=${$({
      top: `${ee || 0}px`,
      left: `${Q || 0}px`
    })} tabindex=0 ${v(this.storeColorFieldScope)}></div></div><div class=${c(n.previewAndSliders)}><calcite-color-picker-swatch class=${c(n.preview)} .color=${L} .scale=${this.alphaChannel ? "l" : this.scale}></calcite-color-picker-swatch><div class=${c(n.sliders)}><div class=${c(n.controlAndScope)}><canvas class=${c({ [n.slider]: !0, [n.hueSlider]: !0 })} @pointerdown=${this.handleHueSliderPointerDown} ${v(this.initHueSlider)}></canvas><div .ariaLabel=${r.hue} .ariaValueMax=${p.h} aria-valuemin=0 .ariaValueNow=${t?.round().hue() || g.round().hue()} class=${c({ [n.scope]: !0, [n.hueScope]: !0 })} @keydown=${this.handleHueScopeKeyDown} role=slider style=${$({
      top: `${ie}px`,
      left: `${te}px`
    })} tabindex=0 ${v(this.storeHueScope)}></div></div>${h ? u`<div class=${c(n.controlAndScope)}><canvas class=${c({ [n.slider]: !0, [n.opacitySlider]: !0 })} @pointerdown=${this.handleOpacitySliderPointerDown} ${v(this.initOpacitySlider)}></canvas><div .ariaLabel=${r.opacity} .ariaValueMax=${y.max} .ariaValueMin=${y.min} .ariaValueNow=${(t || g).round().alpha()} class=${c({ [n.scope]: !0, [n.opacityScope]: !0 })} @keydown=${this.handleOpacityScopeKeyDown} role=slider style=${$({
      top: `${ae}px`,
      left: `${oe}px`
    })} tabindex=0 ${v(this.storeOpacityScope)}></div></div>` : null}</div></div>${s && e ? null : u`<div class=${c({
      [n.controlSection]: !0,
      [n.section]: !0
    })}><div class=${c(n.hexAndChannelsGroup)}>${s ? null : u`<div class=${c(n.hexOptions)}><calcite-color-picker-hex-input .allowEmpty=${this.isClearable} .alphaChannel=${h} class=${c(n.control)} .messages=${r} .numberingSystem=${this.numberingSystem} @calciteColorPickerHexInputChange=${this.handleHexInputChange} .scale=${m} .value=${L}></calcite-color-picker-hex-input></div>`}${e ? null : u`<calcite-tabs class=${c({
      [n.colorModeContainer]: !0,
      [n.splitSection]: !0
    })} .scale=${m === "l" ? "m" : "s"}><calcite-tab-nav slot=title-group>${this.renderChannelsTabTitle("rgb")}${this.renderChannelsTabTitle("hsv")}</calcite-tab-nav>${this.renderChannelsTab("rgb")}${this.renderChannelsTab("hsv")}</calcite-tabs>`}</div></div>`}${f ? null : u`<div class=${c({ [n.savedColorsSection]: !0, [n.section]: !0 })}><div class=${c(n.header)}><label>${r.saved}</label><div class=${c(n.savedColorsButtons)}><calcite-button appearance=transparent class=${c(n.deleteColor)} .disabled=${z} icon-start=minus kind=neutral .label=${r.deleteColor} @click=${this.deleteColor} .scale=${m} type=button></calcite-button><calcite-button appearance=transparent class=${c(n.saveColor)} .disabled=${z} icon-start=plus kind=neutral .label=${r.saveColor} @click=${this.saveColor} .scale=${m} type=button></calcite-button></div></div>${C.length > 0 ? u`<div class=${c(n.savedColors)}>${re(C, (T) => T, (T) => u`<calcite-color-picker-swatch class=${c(n.savedColor)} .color=${T} @click=${this.handleSavedColorSelect} @keydown=${this.handleSavedColorKeyDown} .scale=${m} tabindex=0></calcite-color-picker-swatch>`)}</div>` : null}</div>`}</div>` });
  }
  renderChannelsTabTitle(e) {
    const { channelMode: t, messages: i } = this, o = e === t, a = e === "rgb" ? i.rgb : i.hsv;
    return I(e, u`<calcite-tab-title class=${c(n.colorMode)} data-color-mode=${e ?? x} @calciteTabsActivate=${this.handleTabActivate} .selected=${o}>${a}</calcite-tab-title>`);
  }
  renderChannelsTab(e) {
    const { isClearable: t, channelMode: i, channels: o, messages: a, alphaChannel: s } = this, l = e === i, h = e === "rgb" ? [a.red, a.green, a.blue] : [a.hue, a.saturation, a.value], d = fe(this.el), C = s ? o : o.slice(0, 3);
    return I(e, u`<calcite-tab class=${c(n.control)} .selected=${l}><div class=${c(n.channels)} dir=ltr>${C.map((f, m) => {
      const w = m === 3;
      return w && (f = t && !f ? f : R(f)), this.renderChannel(f, m, h[m], d, w ? "%" : "");
    })}</div></calcite-tab>`);
  }
  renderChannel(e, t, i, o, a) {
    return I(t, u`<calcite-input-number class=${c(n.channel)} data-channel-index=${t ?? x} dir=${o ?? x} .label=${i} lang=${this.messages._lang ?? x} number-button-type=none .numberingSystem=${this.numberingSystem} @keydown=${this.handleKeyDown} @calciteInputNumberChange=${this.handleChannelChange} @calciteInputNumberInput=${this.handleChannelInput} @calciteInternalInputNumberBlur=${this.handleChannelBlur} @calciteInternalInputNumberFocus=${this.handleChannelFocus} .scale=${this.scale === "l" ? "m" : "s"} style=${$({
      marginLeft: t > 0 && !(this.scale === "s" && this.alphaChannel && t === 3) ? "-1px" : ""
    })} .suffixText=${a} .value=${e?.toString()}></calcite-input-number>`);
  }
}
ne("calcite-color-picker", Ae);
export {
  Ae as ColorPicker
};
