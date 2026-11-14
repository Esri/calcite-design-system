/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as he, L as de, d as H, c as $, s as h, q as x, b as C, A as k, f as pe } from "./index.js";
import { c as ue } from "./repeat.js";
import { i as I } from "./keyed.js";
import { D as m, C as E, g as Ce, a as fe, S as D, n as O, h as g, p as j, c as U, b as R, d as P, e as W, f as A, O as b, R as N, H as f, i as n, o as _, t as ve, j as V, k as B, l as me, m as z, q as X, I as q } from "./utils4.js";
import { t as G } from "./throttle.js";
import { e as L, n as S } from "./ref.js";
import { u as ge } from "./index2.js";
import { j as Y } from "./dom.js";
import { i as be } from "./key.js";
import { r as J, c as Se, a as we } from "./math.js";
import { u as ye } from "./useT9n.js";
import { u as $e } from "./useCancelable.js";
import { c as xe } from "./observers.js";
import { u as ke } from "./useFocusable.js";
import { u as De } from "./useInteractive.js";
const Ae = he`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);display:inline-block;font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));inline-size:var(--calcite-internal-color-picker-min-width);min-inline-size:var(--calcite-internal-color-picker-min-width)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-color-picker-min-width: 200px;--calcite-color-picker-spacing: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]){--calcite-internal-color-picker-min-width: 240px;--calcite-color-picker-spacing: var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]){--calcite-internal-color-picker-min-width: 304px;--calcite-color-picker-spacing: var(--calcite-theme-space-lg, var(--calcite-spacing-lg));font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=l]) .section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}:host([scale=l]) .control-section{display:flex;flex-direction:column;flex-wrap:wrap;align-items:baseline}:host([scale=l]) .color-hex-options{inline-size:100%;display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around}:host([scale=l]) .color-mode-container{flex-shrink:3}calcite-input-number{--calcite-input-number-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-number-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-number-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-prefix-text-color: var(--calcite-color-picker-input-prefix-text-color);--calcite-input-suffix-text-color: var(--calcite-color-picker-input-suffix-text-color)}calcite-button{--calcite-button-text-color: var(--calcite-color-picker-action-text-color);--calcite-button-text-color-press: var(--calcite-color-picker-action-text-color-press)}calcite-button:hover,calcite-button:focus{--calcite-button-text-color: var(--calcite-color-picker-action-text-color-hover)}calcite-button:active{--calcite-button-text-color: var(--calcite-color-picker-action-text-color-press)}calcite-tabs{--calcite-tab-border-color: var(--calcite-color-picker-tab-border-color);--calcite-tab-text-color: var(--calcite-color-picker-tab-text-color);--calcite-tab-accent-color-press: var(--calcite-color-picker-tab-accent-color);--calcite-swatch-corner-radius: var(--calcite-color-picker-swatch-corner-radius)}calcite-tab-title:hover{--calcite-color-text-1: var(--calcite-color-picker-tab-text-color-hover)}calcite-swatch{--calcite-swatch-corner-radius: var(--calcite-color-picker-swatch-corner-radius)}.container{display:flex;flex-direction:column;block-size:min-content;border:1px solid var(--calcite-color-picker-border-color, var(--calcite-color-border-3));background-color:var(--calcite-color-picker-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));border-radius:var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius));box-shadow:var(--calcite-color-picker-shadow, var(--calcite-shadow-none))}.control-and-scope{display:flex;position:relative;cursor:pointer;touch-action:none}.color-field,.control-and-scope{-webkit-user-select:none;user-select:none;border-radius:var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius)) var(--calcite-color-picker-corner-radius, var(--calcite-corner-radius)) var(--calcite-corner-radius-none) var(--calcite-corner-radius-none)}.scope{font-size:var(--calcite-font-size-relative-base);outline-color:transparent;position:absolute;z-index:var(--calcite-z-index);border-radius:var(--calcite-corner-radius-pill);background-color:transparent;inline-size:var(--calcite-size-px);block-size:var(--calcite-size-px);pointer-events:none}.scope:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)));outline-offset:6px}.hex-and-channels-group{display:flex;flex-direction:column;flex-wrap:wrap;inline-size:100%}.section{padding-block:0 var(--calcite-color-picker-spacing);padding-inline:var(--calcite-color-picker-spacing)}.section:first-of-type{padding-block-start:var(--calcite-color-picker-spacing)}.sliders{display:flex;flex-direction:column;justify-content:space-between;margin-inline-start:var(--calcite-color-picker-spacing);gap:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.preview-and-sliders{display:flex;align-items:center;padding:var(--calcite-color-picker-spacing)}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;color:var(--calcite-color-picker-text-color, var(--calcite-color-text-1))}.color-mode-container{padding-block-start:var(--calcite-color-picker-spacing)}.channels{display:flex}.channel{flex-grow:1}.channel[data-channel-index="3"]{margin-inline-start:-1px;min-inline-size:81px}:host([scale=s]) .channel[data-channel-index="3"]{min-inline-size:68px}:host([scale=l]) .channel[data-channel-index="3"]{min-inline-size:88px}.saved-colors-buttons{display:flex}.swatch-group{margin-block-start:var(--calcite-color-picker-spacing)}:host([hidden]){display:none}[hidden]{display:none}`, Z = 16;
class Fe extends de {
  constructor() {
    super(), this._color = m, this.colorFieldScopeRef = L(), this.direction = ge(), this.hueScopeRef = L(), this.isActiveChannelInputEmpty = !1, this.mode = E.HEX, this.opacityScopeRef = L(), this.resizeObserver = xe("resize", (e) => this.resizeCanvas(e)), this.shiftKeyChannelAdjustment = 0, this._valueWasSet = !1, this.messages = ye({ blocking: !0 }), this.captureColorFieldColor = (e, t, i = !0) => {
      const { width: o, height: a } = this.dynamicDimensions.colorField, s = Math.round(f.s / o * e), l = Math.round(f.v / a * (a - t));
      this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(s).value(l), i);
    }, this.cancelable = $e()(this), this.drawColorControls = G((e = "all") => {
      (e === "all" || e === "color-field") && this.colorFieldRenderingContext && this.drawColorField(), (e === "all" || e === "hue-slider") && this.hueSliderRenderingContext && this.drawHueSlider(), this.alphaChannel && (e === "all" || e === "opacity-slider") && this.opacitySliderRenderingContext && this.drawOpacitySlider();
    }, Z), this.globalPointerMoveHandler = (e) => {
      const { activeCanvasInfo: t, el: i } = this;
      if (!i.isConnected || !t)
        return;
      const { context: o, bounds: a } = t;
      let s, l;
      const { clientX: c, clientY: r } = e;
      o.canvas.matches(":hover") ? (s = c - a.x, l = r - a.y) : (c < a.x + a.width && c > a.x ? s = c - a.x : c < a.x ? s = 0 : s = a.width, r < a.y + a.height && r > a.y ? l = r - a.y : r < a.y ? l = 0 : l = a.height), o === this.colorFieldRenderingContext ? this.captureColorFieldColor(s, l, !1) : o === this.hueSliderRenderingContext ? this.captureHueSliderColor(s) : o === this.opacitySliderRenderingContext && this.captureOpacitySliderValue(s);
    }, this.globalPointerUpHandler = (e) => {
      if (!Y(e))
        return;
      const t = this.activeCanvasInfo;
      this.activeCanvasInfo = void 0, this.drawColorControls(), t && this.calciteColorPickerChange.emit();
    }, this.resizeCanvas = G((e) => {
      if (!this.hasUpdated)
        return;
      const [t] = e, i = Math.floor(t.contentBoxSize[0].inlineSize);
      this.dynamicDimensions.colorField.width !== i && (this.updateDynamicDimensions(i), this.updateCanvasSize(), this.drawColorControls());
    }, Z), this.updateDynamicDimensions = (e) => {
      const t = {
        width: Ce(e, this.staticDimensions, this.alphaChannel),
        height: this.staticDimensions.slider.height
      };
      this.dynamicDimensions = {
        colorField: fe(e),
        slider: t
      };
    }, this.focusSetter = ke()(this).setFocus, this.interactiveContainer = De(this), this.channelMode = "rgb", this.channels = this.toChannels(m), this.staticDimensions = D.m, this.savedColors = [], this.alphaChannel = !1, this.channelsDisabled = !1, this.clearable = !1, this.disabled = !1, this.fieldDisabled = !1, this.format = "auto", this.hexDisabled = !1, this.savedDisabled = !1, this.scale = "m", this.calciteColorPickerChange = H({ cancelable: !1 }), this.calciteColorPickerInput = H({ cancelable: !1 }), this.listen("keydown", this.handleChannelKeyUpOrDown, { capture: !0 }), this.listen("keyup", this.handleChannelKeyUpOrDown, { capture: !0 });
  }
  static {
    this.properties = { channelMode: 16, channels: 16, colorFieldScopeLeft: 16, colorFieldScopeTop: 16, staticDimensions: 16, hueScopeLeft: 16, opacityScopeLeft: 16, savedColors: 16, scopeOrientation: 16, alphaChannel: 5, channelsDisabled: 5, clearable: 7, color: 0, disabled: 7, fieldDisabled: 7, format: 3, hexDisabled: 5, messageOverrides: 0, numberingSystem: 3, savedDisabled: 7, scale: 3, storageId: 3, value: 1 };
  }
  static {
    this.styles = Ae;
  }
  get baseColorFieldColor() {
    return this.color || this.previousColor || m;
  }
  get effectiveSliderWidth() {
    return this.dynamicDimensions.slider.width;
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
    const t = this._value, i = e || void 0;
    this._value = i, this.handleValueChange(i, t), this._valueWasSet = !0;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.observeResize(), this.cancelable.add([this.drawColorControls, this.resizeCanvas]);
  }
  async load() {
    this._valueWasSet || (this._value ??= O(g(m, this.alphaChannel)));
    const { clearable: e, color: t, format: i } = this, o = this.value, a = e && !o, s = j(o), l = a || i === "auto" && s || i === s, c = l ? U(o, e, s) : t;
    l || this.showIncompatibleColorWarning(o, i), this.setMode(i, !1), this.internalColorSet(c, !1, "initial"), this.updateStaticDimensions(this.scale), this.updateDynamicDimensions(D[this.scale].minWidth);
    const r = `${R}${this.storageId}`;
    if (this.storageId) {
      const d = localStorage.getItem(r);
      d && (this.savedColors = JSON.parse(d));
    }
  }
  willUpdate(e) {
    e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) && this.handleAlphaChannelChange(this.alphaChannel), this.hasUpdated && (e.has("alphaChannel") && this.alphaChannel !== !1 || e.has("staticDimensions") && this.staticDimensions !== D.m) && this.handleAlphaChannelDimensionsChange(), (e.has("alphaChannel") && (this.hasUpdated || this.alphaChannel !== !1) || e.has("format") && (this.hasUpdated || this.format !== "auto")) && this.handleFormatOrAlphaChannelChange(), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handleScaleChange(this.scale);
  }
  loaded() {
    this.handleAlphaChannelDimensionsChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointermove", this.globalPointerMoveHandler), window.removeEventListener("pointerup", this.globalPointerUpHandler), this.resizeObserver?.disconnect();
  }
  observeResize() {
    this.resizeObserver?.observe(this.el);
  }
  handleAlphaChannelChange(e) {
    const { format: t } = this;
    e && t !== "auto" && !P(t) && ($.warn(`ignoring alphaChannel as the current format (${t}) does not support alpha`), this.alphaChannel = !1);
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
    const { clearable: i, format: o } = this, a = !i || e;
    let s = !1;
    if (a) {
      const d = j(e);
      if (!d || o !== "auto" && d !== o) {
        this.showIncompatibleColorWarning(e, o), this._value = t;
        return;
      }
      s = this.mode !== d, this.setMode(d, this.internalColorUpdateContext === void 0);
    }
    const l = this.activeCanvasInfo;
    if (this.internalColorUpdateContext === "initial")
      return;
    if (this.internalColorUpdateContext === "user-interaction") {
      this.calciteColorPickerInput.emit(), l || this.calciteColorPickerChange.emit();
      return;
    }
    const c = U(e, i, this.mode), r = !W(c, this.color);
    (s || r) && this.internalColorSet(c, this.alphaChannel && !(this.mode.endsWith("a") || this.mode.endsWith("a-css")) || this.internalColorUpdateContext === "internal", "internal");
  }
  handleTabActivate(e) {
    this.channelMode = e.currentTarget.getAttribute("data-color-mode"), this.updateChannelsFromColor(this.color);
  }
  handleColorFieldScopeKeyDown(e) {
    const { key: t } = e, o = {
      ArrowUp: { x: 0, y: -10 },
      ArrowRight: { x: 10, y: 0 },
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 }
    }[t];
    o && (e.preventDefault(), this.scopeOrientation = t === "ArrowDown" || t === "ArrowUp" ? "vertical" : "horizontal", this.captureColorFieldColor(this.colorFieldScopeLeft === void 0 ? 0 : this.colorFieldScopeLeft + o.x, this.colorFieldScopeTop === void 0 ? 0 : this.colorFieldScopeTop + o.y, !1));
  }
  handleHueScopeKeyDown(e) {
    const t = e.shiftKey ? 10 : 1, { key: i } = e, a = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1
    }[i];
    if (a) {
      e.preventDefault();
      const s = a * t, l = this.baseColorFieldColor.hue(), c = this.baseColorFieldColor.hue(l + s);
      this.internalColorSet(c, !1);
    }
  }
  handleHexInputChange(e) {
    e.stopPropagation();
    const { clearable: t, color: i } = this, a = e.target.value;
    if (t && !a) {
      this.internalColorSet(void 0);
      return;
    }
    const s = i && O(g(i, P(this.mode)));
    a !== s && this.internalColorSet(A(a));
  }
  handleSavedColorSelect(e) {
    const t = e.currentTarget;
    this.internalColorSet(A(t.color));
  }
  handleChannelInput(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), a = i === 3 ? b.max : this.channelMode === "rgb" ? Object.values(N)[i] : Object.values(f)[i];
    let s;
    if (!t.value)
      s = "", this.isActiveChannelInputEmpty = !0, this.upOrDownArrowKeyTracker = void 0;
    else {
      const c = Number(t.value) + this.shiftKeyChannelAdjustment;
      s = Se(c, 0, a).toString();
    }
    t.value = s, s !== "" && this.shiftKeyChannelAdjustment !== 0 ? this.handleChannelChange(e) : s !== "" && this.handleChannelChange(e);
  }
  handleChannelBlur(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index")), o = [...this.channels];
    !t.value && !this.clearable && (t.value = o[i]?.toString() ?? "");
  }
  handleChannelFocus(e) {
    e.currentTarget.selectText();
  }
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
    this.shiftKeyChannelAdjustment = t === "ArrowUp" && i ? o : t === "ArrowDown" && i ? -o : 0, t === "ArrowUp" && (this.upOrDownArrowKeyTracker = "up"), t === "ArrowDown" && (this.upOrDownArrowKeyTracker = "down");
  }
  getChannelInputLimit(e) {
    return this.channelMode === "rgb" ? Object.values(N)[e] : Object.values(f)[e];
  }
  handleChannelChange(e) {
    const t = e.currentTarget, i = Number(t.getAttribute("data-channel-index"));
    if (this.clearable && !t.value) {
      this.channels = [void 0, void 0, void 0, void 0], this.internalColorSet(void 0);
      return;
    }
    const a = [...this.channels], s = i === 3;
    this.isActiveChannelInputEmpty && this.upOrDownArrowKeyTracker && (t.value = this.upOrDownArrowKeyTracker === "up" ? (a[i] + 1 <= this.getChannelInputLimit(i) ? a[i] + 1 : this.getChannelInputLimit(i)).toString() : (a[i] - 1 >= 0 ? a[i] - 1 : 0).toString(), this.isActiveChannelInputEmpty = !1, this.upOrDownArrowKeyTracker = void 0);
    const l = t.value ? Number(t.value) : a[i];
    a[i] = s ? _(l) : l, this.updateColorFromChannels(a);
  }
  handleSavedColorKeyDown(e) {
    be(e.key) && (e.preventDefault(), this.handleSavedColorSelect(e));
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
  handleCanvasControlPointerDown(e, t, i, o) {
    Y(e) && (window.addEventListener("pointermove", this.globalPointerMoveHandler), window.addEventListener("pointerup", this.globalPointerUpHandler, {
      once: !0
    }), this.activeCanvasInfo = {
      context: t,
      bounds: t.canvas.getBoundingClientRect()
    }, i.call(this, e.offsetX, e.offsetY), this.focusScope(o));
  }
  handleKeyDown(e) {
    e.key === "Enter" && e.preventDefault();
  }
  showIncompatibleColorWarning(e, t) {
    $.warn(`ignoring color value (${e}) as it is not compatible with the current format (${t})`);
  }
  setMode(e, t = !0) {
    const i = e === "auto" ? this.mode : e;
    this.mode = this.ensureCompatibleMode(i, t);
  }
  ensureCompatibleMode(e, t) {
    const { alphaChannel: i } = this, o = P(e);
    if (i && !o) {
      const a = ve(e);
      return t && $.warn(`setting format to (${a}) as the provided one (${e}) does not support alpha`), a;
    }
    if (!i && o) {
      const a = V(e);
      return t && $.warn(`setting format to (${a}) as the provided one (${e}) does not support alpha`), a;
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
    t && W(e, this.color) || (this.internalColorUpdateContext = i, this.color = e, this.value = this.toValue(e), this.internalColorUpdateContext = void 0);
  }
  toValue(e, t = this.mode) {
    if (!e)
      return;
    if (t.includes("hex")) {
      const r = t === E.HEXA;
      return O(g(e.round(), r), r);
    }
    if (t.includes("-css")) {
      const r = (t.startsWith("rgb") ? e.rgb() : e.hsl()).round().string();
      if ((t.endsWith("a") || t.endsWith("a-css")) && e.alpha() === 1) {
        const p = r.slice(0, 3), u = r.slice(4, -1);
        return `${p}a(${u}, ${e.alpha()})`;
      }
      return r;
    }
    const o = V(t), s = /* Color() does not support hsva, hsla nor rgba, so we use the non-alpha mode */ (o === "rgb" ? e.rgb() : o === "hsl" ? e.hsl() : e.hsv()).round().object();
    if (t.endsWith("a"))
      return me(s);
    if (o === "rgb") {
      const { r, g: d, b: p } = s;
      return {
        r,
        g: d,
        b: p
      };
    }
    const { h: l, s: c } = s;
    return o === "hsl" ? {
      h: l,
      s: c,
      l: s.l
    } : {
      h: l,
      s: c,
      v: s.v
    };
  }
  getSliderCapSpacing() {
    const { staticDimensions: { slider: { height: e }, thumb: { radius: t } } } = this;
    return t * 2 - e;
  }
  updateStaticDimensions(e = "m") {
    this.staticDimensions = D[e];
  }
  deleteColor() {
    const e = g(this.color, this.alphaChannel);
    if (!(this.savedColors.indexOf(e) > -1))
      return;
    const i = this.savedColors.filter((a) => a !== e);
    this.savedColors = i;
    const o = `${R}${this.storageId}`;
    this.storageId && localStorage.setItem(o, JSON.stringify(i));
  }
  saveColor() {
    const e = g(this.color, this.alphaChannel);
    if (this.savedColors.indexOf(e) > -1)
      return;
    const i = [...this.savedColors, e];
    this.savedColors = i;
    const o = `${R}${this.storageId}`;
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
    const t = e.hsv(), { staticDimensions: { thumb: { radius: i } } } = this, { width: o, height: a } = this.dynamicDimensions.colorField, s = t.saturationv() / (f.s / o), l = a - t.value() / (f.v / a);
    requestAnimationFrame(() => {
      this.colorFieldScopeLeft = s, this.colorFieldScopeTop = l;
    }), this.drawThumb(this.colorFieldRenderingContext, i, s, l, t, !1);
  }
  drawThumb(e, t, i, o, a, s) {
    const c = 2 * Math.PI, r = 1;
    if (e.beginPath(), e.arc(i, o, t, 0, c), e.fillStyle = "#fff", e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = r, e.stroke(), s && a.alpha() < 1) {
      const p = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
      e.beginPath(), e.arc(i, o, t - 3, 0, c), e.fillStyle = p, e.fill();
    }
    e.globalCompositeOperation = "source-atop", e.beginPath(), e.arc(i, o, t - 3, 0, c);
    const d = s ? a.alpha() : 1;
    e.fillStyle = a.rgb().alpha(d).string(), e.fill(), e.globalCompositeOperation = "source-over";
  }
  drawActiveHueSliderColor() {
    const { color: e } = this;
    if (!e)
      return;
    const t = e.hsv().saturationv(100).value(100), { staticDimensions: { thumb: { radius: i } } } = this, o = this.effectiveSliderWidth, a = t.hue() / (B / o), s = i, l = this.getSliderBoundX(a, o, i);
    requestAnimationFrame(() => {
      this.hueScopeLeft = l;
    }), this.drawThumb(this.hueSliderRenderingContext, i, l, s, t, !1);
  }
  drawHueSlider() {
    const e = this.hueSliderRenderingContext, { staticDimensions: { slider: { height: t }, thumb: { radius: i } } } = this, o = 0, a = i - t / 2, s = this.effectiveSliderWidth, l = e.createLinearGradient(0, 0, s, 0), c = [
      "red",
      "yellow",
      "lime",
      "cyan",
      "blue",
      "magenta",
      "#ff0004"
    ], r = 1 / (c.length - 1);
    let d = 0;
    c.forEach((p) => {
      l.addColorStop(d, A(p).string()), d += r;
    }), e.clearRect(0, 0, s, t + this.getSliderCapSpacing() * 2), this.drawSliderPath(e, t, s, o, a), e.fillStyle = l, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveHueSliderColor();
  }
  drawOpacitySlider() {
    const e = this.opacitySliderRenderingContext, { baseColorFieldColor: t, staticDimensions: { slider: { height: i }, thumb: { radius: o } } } = this, a = 0, s = o - i / 2, l = this.effectiveSliderWidth;
    e.clearRect(0, 0, l, i + this.getSliderCapSpacing() * 2);
    const c = e.createLinearGradient(0, s, l, 0), r = t.rgb().alpha(0), d = t.rgb().alpha(0.5), p = t.rgb().alpha(1);
    c.addColorStop(0, r.string()), c.addColorStop(0.5, d.string()), c.addColorStop(1, p.string()), this.drawSliderPath(e, i, l, a, s);
    const u = e.createPattern(this.getCheckeredBackgroundPattern(), "repeat");
    e.fillStyle = u, e.fill(), e.fillStyle = c, e.fill(), e.strokeStyle = "rgba(0,0,0,0.3)", e.lineWidth = 1, e.stroke(), this.drawActiveOpacitySliderColor();
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
    const t = e, { staticDimensions: { thumb: { radius: i } } } = this, o = this.effectiveSliderWidth, a = z(t.alpha()) / (b.max / o), s = i, l = this.getSliderBoundX(a, o, i);
    requestAnimationFrame(() => {
      this.opacityScopeLeft = l;
    }), this.drawThumb(this.opacitySliderRenderingContext, i, l, s, t, !0);
  }
  getSliderBoundX(e, t, i) {
    const o = we(e, t, i);
    return o === 0 ? e : o === -1 ? J(e, 0, t, i, i * 2) : J(e, 0, t, t - i * 2, t - i);
  }
  handleOpacityScopeKeyDown(e) {
    const t = e.shiftKey ? 10 : 1, { key: i } = e, a = {
      ArrowUp: 0.01,
      ArrowRight: 0.01,
      ArrowDown: -0.01,
      ArrowLeft: -0.01
    }[i];
    if (a) {
      e.preventDefault();
      const s = a * t, l = this.baseColorFieldColor.alpha(), c = this.baseColorFieldColor.alpha(l + s);
      this.internalColorSet(c, !1);
    }
  }
  updateColorFromChannels(e) {
    this.internalColorSet(A(e, this.channelMode));
  }
  updateChannelsFromColor(e) {
    this.channels = e ? this.toChannels(e) : [void 0, void 0, void 0, void 0];
  }
  toChannels(e) {
    const { channelMode: t } = this, i = (t === "rgb" ? e.rgb() : e.hsv()).round().array();
    return i.length === 3 && i.push(1), i;
  }
  getAdjustedScopePosition(e, t) {
    return [
      e === void 0 ? NaN : e - X / 2,
      t === void 0 ? NaN : t - X / 2
    ];
  }
  render() {
    const { channelsDisabled: e, color: t, colorFieldScopeLeft: i, colorFieldScopeTop: o, staticDimensions: { thumb: { radius: a } }, fieldDisabled: s, hexDisabled: l, hueScopeLeft: c, messages: r, alphaChannel: d, opacityScopeLeft: p, savedColors: u, savedDisabled: w, scale: v, scopeOrientation: Q } = this, M = this.effectiveSliderWidth, F = t ? g(t, d) : void 0, ee = a, te = c ?? M * m.hue() / f.h, ie = a, ae = p ?? M * z(m.alpha()) / b.max, K = t === void 0, T = Q === "vertical", [oe, se] = this.getAdjustedScopePosition(i, o), [le, ne] = this.getAdjustedScopePosition(te, ee), [re, ce] = this.getAdjustedScopePosition(ae, ie);
    return this.interactiveContainer({ disabled: this.disabled, children: C`<div class=${h(n.container)}>${s ? null : C`<div class=${h(n.controlAndScope)}><canvas class=${h(n.colorField)} @pointerdown=${this.handleColorFieldPointerDown} ${S(this.initColorField)}></canvas><div .ariaLabel=${T ? r.value : r.saturation} .ariaValueMax=${T ? f.v : f.s} aria-valuemin=0 .ariaValueNow=${(T ? t?.saturationv() : t?.value()) || "0"} class=${h({ [n.scope]: !0, [n.colorFieldScope]: !0 })} @keydown=${this.handleColorFieldScopeKeyDown} role=slider style=${x({
      top: `${se || 0}px`,
      left: `${oe || 0}px`
    })} tabindex=0 ${S(this.colorFieldScopeRef)}></div></div>`}<div class=${h(n.previewAndSliders)}><calcite-swatch class=${h(n.preview)} .color=${F} .label=${F} .scale=${this.alphaChannel ? "l" : this.scale}></calcite-swatch><div class=${h(n.sliders)}><div class=${h(n.controlAndScope)}><canvas class=${h({ [n.slider]: !0, [n.hueSlider]: !0 })} @pointerdown=${this.handleHueSliderPointerDown} ${S(this.initHueSlider)}></canvas><div .ariaLabel=${r.hue} .ariaValueMax=${f.h} aria-valuemin=0 .ariaValueNow=${t?.round().hue() || m.round().hue()} class=${h({ [n.scope]: !0, [n.hueScope]: !0 })} @keydown=${this.handleHueScopeKeyDown} role=slider style=${x({
      top: `${ne}px`,
      left: `${le}px`
    })} tabindex=0 ${S(this.hueScopeRef)}></div></div>${d ? C`<div class=${h(n.controlAndScope)}><canvas class=${h({ [n.slider]: !0, [n.opacitySlider]: !0 })} @pointerdown=${this.handleOpacitySliderPointerDown} ${S(this.initOpacitySlider)}></canvas><div .ariaLabel=${r.opacity} .ariaValueMax=${b.max} .ariaValueMin=${b.min} .ariaValueNow=${(t || m).round().alpha()} class=${h({ [n.scope]: !0, [n.opacityScope]: !0 })} @keydown=${this.handleOpacityScopeKeyDown} role=slider style=${x({
      top: `${ce}px`,
      left: `${re}px`
    })} tabindex=0 ${S(this.opacityScopeRef)}></div></div>` : null}</div></div>${l && e ? null : C`<div class=${h({
      [n.controlSection]: !0,
      [n.section]: !0
    })}><div class=${h(n.hexAndChannelsGroup)}>${l ? null : C`<div class=${h(n.hexOptions)}><calcite-color-picker-hex-input .allowEmpty=${this.clearable} .alphaChannel=${d} class=${h(n.control)} .messages=${r} .numberingSystem=${this.numberingSystem} @calciteColorPickerHexInputChange=${this.handleHexInputChange} .scale=${v} .value=${F}></calcite-color-picker-hex-input></div>`}${e ? null : C`<calcite-tabs class=${h({
      [n.colorModeContainer]: !0,
      [n.splitSection]: !0
    })} .scale=${v === "l" ? "m" : "s"}><calcite-tab-nav slot=title-group>${this.renderChannelsTabTitle("rgb")}${this.renderChannelsTabTitle("hsv")}</calcite-tab-nav>${this.renderChannelsTab("rgb")}${this.renderChannelsTab("hsv")}</calcite-tabs>`}</div></div>`}${w ? null : C`<div class=${h({ [n.savedColorsSection]: !0, [n.section]: !0 })}><div class=${h(n.header)}><label>${r.saved}</label><div class=${h(n.savedColorsButtons)}><calcite-button appearance=transparent class=${h(n.deleteColor)} .disabled=${K} .iconStart=${q.minus} kind=neutral .label=${r.deleteColor} @click=${this.deleteColor} .scale=${v} type=button></calcite-button><calcite-button appearance=transparent class=${h(n.saveColor)} .disabled=${K} .iconStart=${q.plus} kind=neutral .label=${r.saveColor} @click=${this.saveColor} .scale=${v} type=button></calcite-button></div></div>${u.length > 0 ? C`<calcite-swatch-group class=${h(n.swatchGroup)} .label=${r.saved} .scale=${v} selection-mode=none>${ue(u, (y) => y, (y) => C`<calcite-swatch class=${h(n.savedColor)} .color=${y} .label=${y} @click=${this.handleSavedColorSelect} @keydown=${this.handleSavedColorKeyDown} .scale=${v} tabindex=0></calcite-swatch>`)}</calcite-swatch-group>` : null}</div>`}</div>` });
  }
  renderChannelsTabTitle(e) {
    const { channelMode: t, messages: i } = this, o = e === t, a = e === "rgb" ? i.rgb : i.hsv;
    return I(e, C`<calcite-tab-title class=${h(n.colorMode)} data-color-mode=${e ?? k} @calciteTabsActivate=${this.handleTabActivate} .selected=${o}>${a}</calcite-tab-title>`);
  }
  renderChannelsTab(e) {
    const { clearable: t, channelMode: i, channels: o, messages: a, alphaChannel: s } = this, l = e === i, r = e === "rgb" ? [a.red, a.green, a.blue] : [a.hue, a.saturation, a.value], d = this.direction, p = s ? o : o.slice(0, 3);
    return I(e, C`<calcite-tab class=${h(n.control)} .selected=${l}><div class=${h(n.channels)} dir=ltr>${p.map((u, w) => {
      const v = w === 3;
      return v && (u = // channels can only be undefined when clearable
      t && !u ? u : z(u)), this.renderChannel(u, w, r[w], d, v ? "%" : "");
    })}</div></calcite-tab>`);
  }
  renderChannel(e, t, i, o, a) {
    return I(t, C`<calcite-input-number class=${h(n.channel)} data-channel-index=${t ?? k} dir=${o ?? k} .label=${i} lang=${this.messages._lang ?? k} number-button-type=none .numberingSystem=${this.numberingSystem} @calciteInputNumberChange=${this.handleChannelChange} @calciteInputNumberInput=${this.handleChannelInput} @calciteInternalInputNumberBlur=${this.handleChannelBlur} @calciteInternalInputNumberFocus=${this.handleChannelFocus} @keydown=${this.handleKeyDown} .scale=${this.scale === "l" ? "m" : "s"} style=${x({
      marginLeft: t > 0 && !(this.scale === "s" && this.alphaChannel && t === 3) ? "-1px" : ""
    })} .suffixText=${a} .value=${e?.toString()}></calcite-input-number>`);
  }
}
pe("calcite-color-picker", Fe);
export {
  Fe as ColorPicker
};
