import { b as ce, L as he, c as K, s as h, w as $, x as u, E as x, q as de } from "./index.js";
import { c as ue } from "./repeat.js";
import { i as I } from "./keyed.js";
import { D as m, C as H, g as pe, a as Ce, S as k, n as O, h as g, p as U, c as j, b as R, d as P, e as W, f as D, O as b, R as A, H as p, i as n, o as _, t as fe, j as N, k as B, l as ve, m as L, q as V, I as X } from "./utils4.js";
import { e as M, n as S } from "./ref.js";
import { e as q, a as me } from "./dom.js";
import { u as ge, I as be } from "./interactive.js";
import { i as Se } from "./key.js";
import { c as we, r as G, a as ye } from "./math.js";
import { u as $e } from "./useT9n.js";
import { u as xe } from "./useCancelable.js";
import { c as ke } from "./observers.js";
import { u as De } from "./useSetFocus.js";
import { t as Y } from "./throttle.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const Ae = ce`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal);inline-size:var(--calcite-internal-color-picker-min-width);min-inline-size:var(--calcite-internal-color-picker-min-width)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-color-picker-min-width: 200px;--calcite-color-picker-spacing: var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-color-picker-min-width: 240px;--calcite-color-picker-spacing: var(--calcite-spacing-md)}:host([scale=l]){--calcite-internal-color-picker-min-width: 304px;--calcite-color-picker-spacing: var(--calcite-spacing-lg);font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}:host([scale=l]) .control-section{display:flex;flex-direction:column;flex-wrap:wrap;align-items:baseline}:host([scale=l]) .color-hex-options{inline-size:100%;display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around}:host([scale=l]) .color-mode-container{flex-shrink:3}calcite-input-number{--calcite-input-number-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-number-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-number-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-prefix-background-color: var(--calcite-color-picker-input-prefix-background-color);--calcite-input-prefix-text-color: var(--calcite-color-picker-input-prefix-text-color);--calcite-input-suffix-background-color: var(--calcite-color-picker-input-suffix-background-color);--calcite-input-suffix-text-color: var(--calcite-color-picker-input-suffix-text-color)}calcite-button{--calcite-button-text-color: var(--calcite-color-picker-action-text-color);--calcite-button-text-color-press: var(--calcite-color-picker-action-text-color-press)}calcite-button:hover,calcite-button:focus{--calcite-button-text-color: var(--calcite-color-picker-action-text-color-hover)}calcite-button:active{--calcite-button-text-color: var(--calcite-color-picker-action-text-color-press)}calcite-tabs{--calcite-tab-border-color: var(--calcite-color-picker-tab-border-color);--calcite-tab-text-color: var(--calcite-color-picker-tab-text-color);--calcite-tab-accent-color-press: var(--calcite-color-picker-tab-accent-color);--calcite-swatch-corner-radius: var(--calcite-color-picker-swatch-corner-radius)}calcite-tab-title:hover{--calcite-color-text-1: var(--calcite-color-picker-tab-text-color-hover)}calcite-swatch{--calcite-swatch-corner-radius: var(--calcite-color-picker-swatch-corner-radius)}.container{display:flex;flex-direction:column;block-size:min-content;border:1px solid var(--calcite-color-picker-border-color, var(--calcite-color-border-3));background-color:var(--calcite-color-picker-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius-none));box-shadow:var(--calcite-color-picker-shadow, var(--calcite-shadow-none))}.control-and-scope{position:relative;display:flex;cursor:pointer;touch-action:none}.color-field,.control-and-scope{-webkit-user-select:none;user-select:none;border-radius:var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius-none)) var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius-none)) var(--calcite-corner-radius-none) var(--calcite-corner-radius-none)}.scope{pointer-events:none;position:absolute;z-index:var(--calcite-z-index);block-size:1px;inline-size:1px;border-radius:9999px;background-color:transparent;font-size:var(--calcite-font-size--1);outline-color:transparent}.scope:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));outline-offset:6px}.hex-and-channels-group{display:flex;inline-size:100%;flex-direction:column;flex-wrap:wrap}.section{padding-block:0 var(--calcite-color-picker-spacing);padding-inline:var(--calcite-color-picker-spacing)}.section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}.sliders{display:flex;flex-direction:column;justify-content:space-between;margin-inline-start:var(--calcite-color-picker-spacing);gap:var(--calcite-spacing-xxs)}.preview-and-sliders{display:flex;align-items:center;padding:var(--calcite-color-picker-spacing)}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;color:var(--calcite-color-picker-text-color, var(--calcite-color-text-1))}.color-mode-container{padding-block-start:var(--calcite-color-picker-spacing)}.channels{display:flex}.channel{flex-grow:1}.channel[data-channel-index="3"]{margin-inline-start:-1px;min-inline-size:81px}:host([scale=s]) .channel[data-channel-index="3"]{min-inline-size:68px}:host([scale=l]) .channel[data-channel-index="3"]{min-inline-size:88px}.saved-colors-buttons{display:flex}.swatch-group{margin-block-start:var(--calcite-color-picker-spacing)}:host([hidden]){display:none}[hidden]{display:none}`, J = 16;
class Fe extends he {
  constructor() {
    super(), this._color = m, this.colorFieldScopeRef = M(), this.hueScopeRef = M(), this.internalColorUpdateContext = null, this.isActiveChannelInputEmpty = !1, this.mode = H.HEX, this.opacityScopeRef = M(), this.resizeObserver = ke("resize", (e) => this.resizeCanvas(e)), this.shiftKeyChannelAdjustment = 0, this.upOrDownArrowKeyTracker = null, this._valueWasSet = !1, this.messages = $e({ blocking: !0 }), this.captureColorFieldColor = (e, t, i = !0) => {
      const { width: a, height: o } = this.dynamicDimensions.colorField, l = Math.round(p.s / a * e), s = Math.round(p.v / o * (o - t));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(l).value(s), i);
    }, this.cancelable = xe()(this), this.drawColorControls = Y((e = "all") => {
      (e === "all" || e === "color-field") && this.colorFieldRenderingContext && this.drawColorField(), (e === "all" || e === "hue-slider") && this.hueSliderRenderingContext && this.drawHueSlider(), this.alphaChannel && (e === "all" || e === "opacity-slider") && this.opacitySliderRenderingContext && this.drawOpacitySlider();
    }, J), this.globalPointerMoveHandler = (e) => {
      const { activeCanvasInfo: t, el: i } = this;
      if (!i.isConnected || !t)
        return;
      const { context: a, bounds: o } = t;
      let l, s;
      const { clientX: r, clientY: c } = e;
      a.canvas.matches(":hover") ? (l = r - o.x, s = c - o.y) : (r < o.x + o.width && r > o.x ? l = r - o.x : r < o.x ? l = 0 : l = o.width, c < o.y + o.height && c > o.y ? s = c - o.y : c < o.y ? s = 0 : s = o.height), a === this.colorFieldRenderingContext ? this.captureColorFieldColor(l, s, !1) : a === this.hueSliderRenderingContext ? this.captureHueSliderColor(l) : a === this.opacitySliderRenderingContext && this.captureOpacitySliderValue(l);
    }, this.globalPointerUpHandler = (e) => {
      if (!q(e))
        return;
      const t = this.activeCanvasInfo;
      this.activeCanvasInfo = null, this.drawColorControls(), t && this.calciteColorPickerChange.emit();
    }, this.resizeCanvas = Y((e) => {
      if (!this.hasUpdated)
        return;
      const [t] = e, i = Math.floor(t.contentBoxSize[0].inlineSize);
      this.dynamicDimensions.colorField.width !== i && (this.updateDynamicDimensions(i), this.updateCanvasSize(), this.drawColorControls());
    }, J), this.updateDynamicDimensions = (e) => {
      const t = {
        width: pe(e, this.staticDimensions, this.alphaChannel),
        height: this.staticDimensions.slider.height
      };
      this.dynamicDimensions = {
        colorField: Ce(e),
        slider: t
      };
    }, this.focusSetter = De()(this), this.channelMode = "rgb", this.channels = this.toChannels(m), this.staticDimensions = k.m, this.savedColors = [], this.allowEmpty = !1, this.alphaChannel = !1, this.channelsDisabled = !1, this.clearable = !1, this.disabled = !1, this.fieldDisabled = !1, this.format = "auto", this.hexDisabled = !1, this.savedDisabled = !1, this.scale = "m", this.calciteColorPickerChange = K({ cancelable: !1 }), this.calciteColorPickerInput = K({ cancelable: !1 }), this.listen("keydown", this.handleChannelKeyUpOrDown, { capture: !0 }), this.listen("keyup", this.handleChannelKeyUpOrDown, { capture: !0 });
  }
  static {
    this.properties = { channelMode: 16, channels: 16, colorFieldScopeLeft: 16, colorFieldScopeTop: 16, staticDimensions: 16, hueScopeLeft: 16, opacityScopeLeft: 16, savedColors: 16, scopeOrientation: 16, allowEmpty: 7, alphaChannel: 5, channelsDisabled: 5, clearable: 7, color: 0, disabled: 7, fieldDisabled: 7, format: 3, hexDisabled: 5, messageOverrides: 0, numberingSystem: 3, savedDisabled: 7, scale: 3, storageId: 3, value: 1 };
  }
  static {
    this.styles = Ae;
  }
  get color() {
    return this._color;
  }
  set color(e) {
    const t = this._color;
    this._color = e, this.handleColorChange(e, t);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    this._value = e, this.handleValueChange(e, t), this._valueWasSet = !0;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.observeResize(), this.cancelable.add([this.drawColorControls, this.resizeCanvas]);
  }
  async load() {
    this._valueWasSet || (this._value ??= O(g(m, this.alphaChannel))), this.handleAllowEmptyOrClearableChange();
    const { isClearable: e, color: t, format: i, value: a } = this, o = e && !a, l = U(a), s = o || i === "auto" && l || i === l, r = s ? j(a, e, l) : t;
    s || this.showIncompatibleColorWarning(a, i), this.setMode(i, !1), this.internalColorSet(r, !1, "initial"), this.updateStaticDimensions(this.scale), this.updateDynamicDimensions(k[this.scale].minWidth);
    const c = `${R}${this.storageId}`;
    this.storageId && localStorage.getItem(c) && (this.savedColors = JSON.parse(localStorage.getItem(c)));
  }
  willUpdate(e) {
    (e.has("allowEmpty") && (this.hasUpdated || this.allowEmpty !== !1) || e.has("clearable") && (this.hasUpdated || this.clearable !== !1)) && this.handleAllowEmptyOrClearableChange(), e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) && this.handleAlphaChannelChange(this.alphaChannel), this.hasUpdated && (e.has("alphaChannel") && this.alphaChannel !== !1 || e.has("staticDimensions") && this.staticDimensions !== k.m) && this.handleAlphaChannelDimensionsChange(), (e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) || e.has("format") && (this.hasUpdated || this.format !== "auto")) && this.handleFormatOrAlphaChannelChange(), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handleScaleChange(this.scale);
  }
  updated() {
    ge(this);
  }
  loaded() {
    this.handleAlphaChannelDimensionsChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointermove", this.globalPointerMoveHandler), window.removeEventListener("pointerup", this.globalPointerUpHandler), this.resizeObserver?.disconnect();
  }
  get baseColorFieldColor() {
    return this.color || this.previousColor || m;
  }
  get effectiveSliderWidth() {
    return this.dynamicDimensions.slider.width;
  }
  observeResize() {
    this.resizeObserver?.observe(this.el);
  }
  handleAllowEmptyOrClearableChange() {
    this.isClearable = this.clearable || this.allowEmpty;
  }
  handleAlphaChannelChange(e) {
    const { format: t } = this;
    e && t !== "auto" && !P(t) && (console.warn(`ignoring alphaChannel as the current format (${t}) does not support alpha`), this.alphaChannel = !1);
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
    const { isClearable: i, format: a } = this, o = !i || e;
    let l = !1;
    if (o) {
      const d = U(e);
      if (!d || a !== "auto" && d !== a) {
        this.showIncompatibleColorWarning(e, a), this._value = t;
        return;
      }
      l = this.mode !== d, this.setMode(d, this.internalColorUpdateContext === null);
    }
    const s = this.activeCanvasInfo;
    if (this.internalColorUpdateContext === "initial")
      return;
    if (this.internalColorUpdateContext === "user-interaction") {
      this.calciteColorPickerInput.emit(), s || this.calciteColorPickerChange.emit();
      return;
    }
    const r = j(e, i, this.mode), c = !W(r, this.color);
    (l || c) && this.internalColorSet(r, this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css")) || this.internalColorUpdateContext === "internal", "internal");
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
    const t = e.shiftKey ? 10 : 1, { key: i } = e, a = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1
    };
    if (a[i]) {
      e.preventDefault();
      const o = a[i] * t, l = this.baseColorFieldColor.hue(), s = this.baseColorFieldColor.hue(l + o);
      this.internalColorSet(s, !1);
    }
  }
  handleHexInputChange(e) {
    e.stopPropagation();
    const { isClearable: t, color: i } = this, o = e.target.value;
    if (t && !o) {
      this.internalColorSet(null);
      return;
    }
    const l = i && O(g(i, P(this.mode)));
    o !== l && this.internalColorSet(D(o));
  }
  handleSavedColorSelect(e) {
    const t = e.currentTarget;
    this.internalColorSet(D(t.color));
  }
  handleChannelInput(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), o = i === 3 ? b.max : this.channelMode === "rgb" ? A[Object.keys(A)[i]] : p[Object.keys(p)[i]];
    let l;
    if (!t.value)
      l = "", this.isActiveChannelInputEmpty = !0, this.upOrDownArrowKeyTracker = null;
    else {
      const r = Number(t.value) + this.shiftKeyChannelAdjustment;
      l = we(r, 0, o).toString();
    }
    t.value = l, l !== "" && this.shiftKeyChannelAdjustment !== 0 ? this.handleChannelChange(e) : l !== "" && this.handleChannelChange(e);
  }
  handleChannelBlur(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), a = [...this.channels];
    !t.value && !this.isClearable && (t.value = a[i]?.toString());
  }
  handleChannelFocus(e) {
    e.currentTarget.selectText();
  }
  handleChannelKeyUpOrDown(e) {
    this.shiftKeyChannelAdjustment = 0;
    const { key: t } = e;
    if (t !== "ArrowUp" && t !== "ArrowDown" || !e.composedPath().some((o) => o.classList?.contains(n.channel)))
      return;
    const { shiftKey: i } = e;
    if (e.preventDefault(), !this.color) {
      this.internalColorSet(this.previousColor), e.stopPropagation();
      return;
    }
    const a = 9;
    this.shiftKeyChannelAdjustment = t === "ArrowUp" && i ? a : t === "ArrowDown" && i ? -a : 0, t === "ArrowUp" && (this.upOrDownArrowKeyTracker = "up"), t === "ArrowDown" && (this.upOrDownArrowKeyTracker = "down");
  }
  getChannelInputLimit(e) {
    return this.channelMode === "rgb" ? A[Object.keys(A)[e]] : p[Object.keys(p)[e]];
  }
  handleChannelChange(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), a = [...this.channels];
    if (this.isClearable && !t.value) {
      this.channels = [null, null, null, null], this.internalColorSet(null);
      return;
    }
    const l = i === 3;
    this.isActiveChannelInputEmpty && this.upOrDownArrowKeyTracker && (t.value = this.upOrDownArrowKeyTracker === "up" ? (a[i] + 1 <= this.getChannelInputLimit(i) ? a[i] + 1 : this.getChannelInputLimit(i)).toString() : (a[i] - 1 >= 0 ? a[i] - 1 : 0).toString(), this.isActiveChannelInputEmpty = !1, this.upOrDownArrowKeyTracker = null);
    const s = t.value ? Number(t.value) : a[i];
    a[i] = l ? _(s) : s, this.updateColorFromChannels(a);
  }
  handleSavedColorKeyDown(e) {
    Se(e.key) && (e.preventDefault(), this.handleSavedColorSelect(e));
  }
  handleColorFieldPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.colorFieldRenderingContext, this.captureColorFieldColor, this.colorFieldScopeRef.value);
  }
  focusScope(e) {
    requestAnimationFrame(() => {
      e.focus();
    });
  }
  handleHueSliderPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.hueSliderRenderingContext, this.captureHueSliderColor, this.hueScopeRef.value);
  }
  handleOpacitySliderPointerDown(e) {
    this.handleCanvasControlPointerDown(e, this.opacitySliderRenderingContext, this.captureOpacitySliderValue, this.opacityScopeRef.value);
  }
  handleCanvasControlPointerDown(e, t, i, a) {
    q(e) && (window.addEventListener("pointermove", this.globalPointerMoveHandler), window.addEventListener("pointerup", this.globalPointerUpHandler, {
      once: !0
    }), this.activeCanvasInfo = {
      context: t,
      bounds: t.canvas.getBoundingClientRect()
    }, i.call(this, e.offsetX, e.offsetY), this.focusScope(a));
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
    const { alphaChannel: i } = this, a = P(e);
    if (i && !a) {
      const o = fe(e);
      return t && console.warn(`setting format to (${o}) as the provided one (${e}) does not support alpha`), o;
    }
    if (!i && a) {
      const o = N(e);
      return t && console.warn(`setting format to (${o}) as the provided one (${e}) does not support alpha`), o;
    }
    return e;
  }
  captureHueSliderColor(e) {
    const t = B / this.effectiveSliderWidth * e;
    this.internalColorSet(this.baseColorFieldColor.hue(t), !1);
  }
  captureOpacitySliderValue(e) {
    const t = _(b.max / this.effectiveSliderWidth * e);
    this.internalColorSet(this.baseColorFieldColor.alpha(t), !1);
  }
  internalColorSet(e, t = !0, i = "user-interaction") {
    t && W(e, this.color) || (this.internalColorUpdateContext = i, this.color = e, this.value = this.toValue(e), this.internalColorUpdateContext = null);
  }
  toValue(e, t = this.mode) {
    if (!e)
      return null;
    if (t.includes("hex")) {
      const o = t === H.HEXA;
      return O(g(e.round(), o), o);
    }
    if (t.includes("-css")) {
      const o = e[t.replace("-css", "").replace("a", "")]().round().string();
      if ((t.endsWith("a") || t.endsWith("a-css")) && e.alpha() === 1) {
        const s = o.slice(0, 3), r = o.slice(4, -1);
        return `${s}a(${r}, ${e.alpha()})`;
      }
      return o;
    }
    const a = (
      /* Color() does not support hsva, hsla nor rgba, so we use the non-alpha mode */
      e[N(t)]().round().object()
    );
    return t.endsWith("a") ? ve(a) : a;
  }
  getSliderCapSpacing() {
    const { staticDimensions: { slider: { height: e }, thumb: { radius: t } } } = this;
    return t * 2 - e;
  }
  updateStaticDimensions(e = "m") {
    this.staticDimensions = k[e];
  }
  deleteColor() {
    const e = g(this.color, this.alphaChannel);
    if (!(this.savedColors.indexOf(e) > -1))
      return;
    const i = this.savedColors.filter((o) => o !== e);
    this.savedColors = i;
    const a = `${R}${this.storageId}`;
    this.storageId && localStorage.setItem(a, JSON.stringify(i));
  }
  saveColor() {
    const e = g(this.color, this.alphaChannel);
    if (this.savedColors.indexOf(e) > -1)
      return;
    const i = [...this.savedColors, e];
    this.savedColors = i;
    const a = `${R}${this.storageId}`;
    this.storageId && localStorage.setItem(a, JSON.stringify(i));
  }
  drawColorField() {
    const e = this.colorFieldRenderingContext, { width: t, height: i } = this.dynamicDimensions.colorField;
    e.fillStyle = this.baseColorFieldColor.hsv().saturationv(100).value(100).alpha(1).string(), e.fillRect(0, 0, t, i);
    const a = e.createLinearGradient(0, 0, t, 0);
    a.addColorStop(0, "rgba(255,255,255,1)"), a.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = a, e.fillRect(0, 0, t, i);
    const o = e.createLinearGradient(0, 0, 0, i);
    o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(1, "rgba(0,0,0,1)"), e.fillStyle = o, e.fillRect(0, 0, t, i), this.drawActiveColorFieldColor();
  }
  setCanvasContextSize(e, { height: t, width: i }) {
    if (!e)
      return;
    const a = window.devicePixelRatio || 1;
    e.width = i * a, e.height = t * a, e.style.height = `${t}px`, e.style.width = `${i}px`, e.getContext("2d").scale(a, a);
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
    const a = {
      width: this.effectiveSliderWidth,
      height: i.slider.height + (i.thumb.radius - t.slider.height / 2) * 2
    };
    (e === "all" || e === "hue-slider") && this.setCanvasContextSize(this.hueSliderRenderingContext?.canvas, a), (e === "all" || e === "opacity-slider") && this.setCanvasContextSize(this.opacitySliderRenderingContext?.canvas, a);
  }
  drawActiveColorFieldColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e.hsv(), { staticDimensions: { thumb: { radius: i } } } = this, { width: a, height: o } = this.dynamicDimensions.colorField, l = t.saturationv() / (p.s / a), s = o - t.value() / (p.v / o);
    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = l, this.colorFieldScopeTop = s;
    }), this.drawThumb(this.colorFieldRenderingContext, i, l, s, t, !1);
  }
  drawThumb(e, t, i, a, o, l) {
    const r = 2 * Math.PI, c = 1;
    if (e.beginPath(), e.arc(i, a, t, 0, r), e.fillStyle = "#fff", e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = c, e.stroke(), l && o.alpha() < 1) {
      const f = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
      e.beginPath(), e.arc(i, a, t - 3, 0, r), e.fillStyle = f, e.fill();
    }
    e.globalCompositeOperation = "source-atop", e.beginPath(), e.arc(i, a, t - 3, 0, r);
    const d = l ? o.alpha() : 1;
    e.fillStyle = o.rgb().alpha(d).string(), e.fill(), e.globalCompositeOperation = "source-over";
  }
  drawActiveHueSliderColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e.hsv().saturationv(100).value(100), { staticDimensions: { thumb: { radius: i } } } = this, a = this.effectiveSliderWidth, o = t.hue() / (B / a), l = i, s = this.getSliderBoundX(o, a, i);
    requestAnimationFrame(() => {
      this.hueScopeLeft = s;
    }), this.drawThumb(this.hueSliderRenderingContext, i, s, l, t, !1);
  }
  drawHueSlider() {
    const e = this.hueSliderRenderingContext, { staticDimensions: { slider: { height: t }, thumb: { radius: i } } } = this, a = 0, o = i - t / 2, l = this.effectiveSliderWidth, s = e.createLinearGradient(0, 0, l, 0), r = [
      "red",
      "yellow",
      "lime",
      "cyan",
      "blue",
      "magenta",
      "#ff0004"
    ], c = 1 / (r.length - 1);
    let d = 0;
    r.forEach((f) => {
      s.addColorStop(d, D(f).string()), d += c;
    }), e.clearRect(0, 0, l, t + this.getSliderCapSpacing() * 2), this.drawSliderPath(e, t, l, a, o), e.fillStyle = s, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveHueSliderColor();
  }
  drawOpacitySlider() {
    const e = this.opacitySliderRenderingContext, { baseColorFieldColor: t, staticDimensions: { slider: { height: i }, thumb: { radius: a } } } = this, o = 0, l = a - i / 2, s = this.effectiveSliderWidth;
    e.clearRect(0, 0, s, i + this.getSliderCapSpacing() * 2);
    const r = e.createLinearGradient(0, l, s, 0), c = t.rgb().alpha(0), d = t.rgb().alpha(0.5), f = t.rgb().alpha(1);
    r.addColorStop(0, c.string()), r.addColorStop(0.5, d.string()), r.addColorStop(1, f.string()), this.drawSliderPath(e, i, s, o, l);
    const C = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
    e.fillStyle = C, e.fill(), e.fillStyle = r, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveOpacitySliderColor();
  }
  drawSliderPath(e, t, i, a, o) {
    const l = t / 2 + 1;
    e.beginPath(), e.moveTo(a + l, o), e.lineTo(a + i - l, o), e.quadraticCurveTo(a + i, o, a + i, o + l), e.lineTo(a + i, o + t - l), e.quadraticCurveTo(a + i, o + t, a + i - l, o + t), e.lineTo(a + l, o + t), e.quadraticCurveTo(a, o + t, a, o + t - l), e.lineTo(a, o + l), e.quadraticCurveTo(a, o, a + l, o), e.closePath();
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
    const t = e, { staticDimensions: { thumb: { radius: i } } } = this, a = this.effectiveSliderWidth, o = L(t.alpha()) / (b.max / a), l = i, s = this.getSliderBoundX(o, a, i);
    requestAnimationFrame(() => {
      this.opacityScopeLeft = s;
    }), this.drawThumb(this.opacitySliderRenderingContext, i, s, l, t, !0);
  }
  getSliderBoundX(e, t, i) {
    const a = ye(e, t, i);
    return a === 0 ? e : a === -1 ? G(e, 0, t, i, i * 2) : G(e, 0, t, t - i * 2, t - i);
  }
  handleOpacityScopeKeyDown(e) {
    const t = e.shiftKey ? 10 : 1, { key: i } = e, a = {
      ArrowUp: 0.01,
      ArrowRight: 0.01,
      ArrowDown: -0.01,
      ArrowLeft: -0.01
    };
    if (a[i]) {
      e.preventDefault();
      const o = a[i] * t, l = this.baseColorFieldColor.alpha(), s = this.baseColorFieldColor.alpha(l + o);
      this.internalColorSet(s, !1);
    }
  }
  updateColorFromChannels(e) {
    this.internalColorSet(D(e, this.channelMode));
  }
  updateChannelsFromColor(e) {
    this.channels = e ? this.toChannels(e) : [null, null, null, null];
  }
  toChannels(e) {
    const { channelMode: t } = this, i = e[t]().round().array();
    return i.length === 3 && i.push(1), i;
  }
  getAdjustedScopePosition(e, t) {
    return [e - V / 2, t - V / 2];
  }
  render() {
    const { channelsDisabled: e, color: t, colorFieldScopeLeft: i, colorFieldScopeTop: a, staticDimensions: { thumb: { radius: o } }, fieldDisabled: l, hexDisabled: s, hueScopeLeft: r, messages: c, alphaChannel: d, opacityScopeLeft: f, savedColors: C, savedDisabled: w, scale: v, scopeOrientation: Z } = this, z = this.effectiveSliderWidth, F = t ? g(t, d) : null, Q = o, ee = r ?? z * m.hue() / p.h, te = o, ie = f ?? z * L(m.alpha()) / b.max, E = t === void 0, T = Z === "vertical", [ae, oe] = this.getAdjustedScopePosition(i, a), [le, se] = this.getAdjustedScopePosition(ee, Q), [ne, re] = this.getAdjustedScopePosition(ie, te);
    return be({ disabled: this.disabled, children: u`<div class=${h(n.container)}>${l ? null : u`<div class=${h(n.controlAndScope)}><canvas class=${h(n.colorField)} @pointerdown=${this.handleColorFieldPointerDown} ${S(this.initColorField)}></canvas><div .ariaLabel=${T ? c.value : c.saturation} .ariaValueMax=${T ? p.v : p.s} aria-valuemin=0 .ariaValueNow=${(T ? t?.saturationv() : t?.value()) || "0"} class=${h({ [n.scope]: !0, [n.colorFieldScope]: !0 })} @keydown=${this.handleColorFieldScopeKeyDown} role=slider style=${$({
      top: `${oe || 0}px`,
      left: `${ae || 0}px`
    })} tabindex=0 ${S(this.colorFieldScopeRef)}></div></div>`}<div class=${h(n.previewAndSliders)}><calcite-swatch class=${h(n.preview)} .color=${F} .label=${F} .scale=${this.alphaChannel ? "l" : this.scale}></calcite-swatch><div class=${h(n.sliders)}><div class=${h(n.controlAndScope)}><canvas class=${h({ [n.slider]: !0, [n.hueSlider]: !0 })} @pointerdown=${this.handleHueSliderPointerDown} ${S(this.initHueSlider)}></canvas><div .ariaLabel=${c.hue} .ariaValueMax=${p.h} aria-valuemin=0 .ariaValueNow=${t?.round().hue() || m.round().hue()} class=${h({ [n.scope]: !0, [n.hueScope]: !0 })} @keydown=${this.handleHueScopeKeyDown} role=slider style=${$({
      top: `${se}px`,
      left: `${le}px`
    })} tabindex=0 ${S(this.hueScopeRef)}></div></div>${d ? u`<div class=${h(n.controlAndScope)}><canvas class=${h({ [n.slider]: !0, [n.opacitySlider]: !0 })} @pointerdown=${this.handleOpacitySliderPointerDown} ${S(this.initOpacitySlider)}></canvas><div .ariaLabel=${c.opacity} .ariaValueMax=${b.max} .ariaValueMin=${b.min} .ariaValueNow=${(t || m).round().alpha()} class=${h({ [n.scope]: !0, [n.opacityScope]: !0 })} @keydown=${this.handleOpacityScopeKeyDown} role=slider style=${$({
      top: `${re}px`,
      left: `${ne}px`
    })} tabindex=0 ${S(this.opacityScopeRef)}></div></div>` : null}</div></div>${s && e ? null : u`<div class=${h({
      [n.controlSection]: !0,
      [n.section]: !0
    })}><div class=${h(n.hexAndChannelsGroup)}>${s ? null : u`<div class=${h(n.hexOptions)}><calcite-color-picker-hex-input .allowEmpty=${this.isClearable} .alphaChannel=${d} class=${h(n.control)} .messages=${c} .numberingSystem=${this.numberingSystem} @calciteColorPickerHexInputChange=${this.handleHexInputChange} .scale=${v} .value=${F}></calcite-color-picker-hex-input></div>`}${e ? null : u`<calcite-tabs class=${h({
      [n.colorModeContainer]: !0,
      [n.splitSection]: !0
    })} .scale=${v === "l" ? "m" : "s"}><calcite-tab-nav slot=title-group>${this.renderChannelsTabTitle("rgb")}${this.renderChannelsTabTitle("hsv")}</calcite-tab-nav>${this.renderChannelsTab("rgb")}${this.renderChannelsTab("hsv")}</calcite-tabs>`}</div></div>`}${w ? null : u`<div class=${h({ [n.savedColorsSection]: !0, [n.section]: !0 })}><div class=${h(n.header)}><label>${c.saved}</label><div class=${h(n.savedColorsButtons)}><calcite-button appearance=transparent class=${h(n.deleteColor)} .disabled=${E} .iconStart=${X.minus} kind=neutral .label=${c.deleteColor} @click=${this.deleteColor} .scale=${v} type=button></calcite-button><calcite-button appearance=transparent class=${h(n.saveColor)} .disabled=${E} .iconStart=${X.plus} kind=neutral .label=${c.saveColor} @click=${this.saveColor} .scale=${v} type=button></calcite-button></div></div>${C.length > 0 ? u`<calcite-swatch-group class=${h(n.swatchGroup)} .label=${c.saved} .scale=${v} selection-mode=none>${ue(C, (y) => y, (y) => u`<calcite-swatch class=${h(n.savedColor)} .color=${y} .label=${y} @click=${this.handleSavedColorSelect} @keydown=${this.handleSavedColorKeyDown} .scale=${v} tabindex=0></calcite-swatch>`)}</calcite-swatch-group>` : null}</div>`}</div>` });
  }
  renderChannelsTabTitle(e) {
    const { channelMode: t, messages: i } = this, a = e === t, o = e === "rgb" ? i.rgb : i.hsv;
    return I(e, u`<calcite-tab-title class=${h(n.colorMode)} data-color-mode=${e ?? x} @calciteTabsActivate=${this.handleTabActivate} .selected=${a}>${o}</calcite-tab-title>`);
  }
  renderChannelsTab(e) {
    const { isClearable: t, channelMode: i, channels: a, messages: o, alphaChannel: l } = this, s = e === i, c = e === "rgb" ? [o.red, o.green, o.blue] : [o.hue, o.saturation, o.value], d = me(this.el), f = l ? a : a.slice(0, 3);
    return I(e, u`<calcite-tab class=${h(n.control)} .selected=${s}><div class=${h(n.channels)} dir=ltr>${f.map((C, w) => {
      const v = w === 3;
      return v && (C = t && !C ? C : L(C)), this.renderChannel(C, w, c[w], d, v ? "%" : "");
    })}</div></calcite-tab>`);
  }
  renderChannel(e, t, i, a, o) {
    return I(t, u`<calcite-input-number class=${h(n.channel)} data-channel-index=${t ?? x} dir=${a ?? x} .label=${i} lang=${this.messages._lang ?? x} number-button-type=none .numberingSystem=${this.numberingSystem} @keydown=${this.handleKeyDown} @calciteInputNumberChange=${this.handleChannelChange} @calciteInputNumberInput=${this.handleChannelInput} @calciteInternalInputNumberBlur=${this.handleChannelBlur} @calciteInternalInputNumberFocus=${this.handleChannelFocus} .scale=${this.scale === "l" ? "m" : "s"} style=${$({
      marginLeft: t > 0 && !(this.scale === "s" && this.alphaChannel && t === 3) ? "-1px" : ""
    })} .suffixText=${o} .value=${e?.toString()}></calcite-input-number>`);
  }
}
de("calcite-color-picker", Fe);
export {
  Fe as ColorPicker
};
