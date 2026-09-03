/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as T, L as E, c as L, s as x, b as g, d as B } from "./index.js";
import { i as A } from "./keyed.js";
import { n as u, h, r as p, s as f, u as I, v as P, o as b, f as C, m as $, O as V, w as K } from "./utils4.js";
import { e as H, n as w } from "./ref.js";
import { u as z } from "./useSetFocus.js";
const d = {
  container: "container",
  hexInput: "hex-input",
  opacityInput: "opacity-input"
}, N = T`:host{display:block}.container{display:flex;inline-size:100%;flex-wrap:nowrap;align-items:center}.hex-input{--calcite-input-text-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-text-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-text-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-prefix-text-color: var(--calcite-color-picker-input-prefix-text-color)}.opacity-input{--calcite-input-number-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-number-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-number-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-suffix-text-color: var(--calcite-color-picker-input-suffix-text-color)}.hex-input{flex-grow:1;text-transform:uppercase}.opacity-input{inline-size:100px;margin-inline-start:-1px}:host([hidden]){display:none}[hidden]{display:none}`, m = C();
class U extends E {
  constructor() {
    super(...arguments), this.hexInputRef = H(), this.opacityInputRef = H(), this.focusSetter = z()(this), this.internalColor = m, this.alphaChannel = !1, this.allowEmpty = !1, this.hexLabel = "Hex", this.scale = "m", this.value = u(h(m, this.alphaChannel), this.alphaChannel, !0), this.calciteColorPickerHexInputChange = L({ cancelable: !1 });
  }
  static {
    this.properties = { internalColor: 16, alphaChannel: 5, allowEmpty: 5, hexLabel: 1, messages: 0, numberingSystem: 1, scale: 3, value: 3 };
  }
  static {
    this.styles = N;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.hexInputRef.value, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.previousDefinedValue = this.value;
    const { allowEmpty: t, alphaChannel: e, value: a } = this;
    if (a) {
      const n = u(a, e);
      p(n, e) && this.internalSetValue(n, n, !1);
      return;
    }
    t && this.internalSetValue(void 0, void 0, !1);
  }
  willUpdate(t) {
    t.has("value") && (this.hasUpdated || this.value !== u(h(m, this.alphaChannel), this.alphaChannel, !0)) && this.internalSetValue(this.value, t.get("value"), !1);
  }
  onHexInputBlur() {
    const t = this.hexInputRef.value, e = t.value, a = `#${e}`, { allowEmpty: n, internalColor: l } = this, o = n && !e, i = f(a);
    (I(a, !0) || I(a, !1)) && this.onHexInputChange(), !(o || p(a) && i) && (t.value = n && !l ? "" : this.formatHexForInternalInput(P(
      // always display hex input in RRGGBB format
      l.object()
    )));
  }
  onOpacityInputBlur() {
    const t = this.opacityInputRef.value, e = t.value, { allowEmpty: a, internalColor: n } = this;
    a && !e || (t.value = a && !n ? "" : this.formatOpacityForInternalInput(n));
  }
  onOpacityInputInput() {
    this.onOpacityInputChange();
  }
  onHexInputChange() {
    let e = this.hexInputRef.value.value;
    if (e) {
      const a = u(e, !1);
      if (p(a) && this.alphaChannel && this.internalColor) {
        const l = u(this.internalColor.hexa(), !0).slice(-2);
        e = `${a + l}`;
      }
    }
    this.internalSetValue(e, this.value);
  }
  onOpacityInputChange() {
    const t = this.opacityInputRef.value;
    let e;
    if (!t.value)
      e = t.value;
    else {
      const a = b(Number(t.value));
      e = this.internalColor?.alpha(a).hexa();
    }
    this.internalSetValue(e, this.value);
  }
  onInputFocus(t) {
    (t.type === "calciteInternalInputTextFocus" ? this.hexInputRef : this.opacityInputRef).value.selectText();
  }
  onHexInputInput() {
    const t = `#${this.hexInputRef.value.value}`, e = this.value;
    p(t, this.alphaChannel) && f(t, this.alphaChannel) && this.internalSetValue(t, e);
  }
  onInputKeyDown(t) {
    const { altKey: e, ctrlKey: a, metaKey: n, shiftKey: l } = t, { alphaChannel: o, hexInputRef: i, internalColor: s, value: c } = this, { key: r } = t, v = t.composedPath();
    if (r === "Tab" && I(c, this.alphaChannel) || r === "Enter") {
      v.includes(i.value) ? this.onHexInputChange() : this.onOpacityInputChange(), r === "Enter" && t.preventDefault();
      return;
    }
    const k = r === "ArrowDown" || r === "ArrowUp", y = this.value;
    if (k) {
      if (!c) {
        this.internalSetValue(this.previousDefinedValue, y), t.preventDefault();
        return;
      }
      const F = r === "ArrowUp" ? 1 : -1, O = l ? 10 : 1;
      this.internalSetValue(h(this.nudgeRGBChannels(s, O * F, v.includes(i.value) ? "rgb" : "a"), o), y), t.preventDefault();
      return;
    }
    const S = e || a || n, R = r.length === 1, D = K.test(r);
    R && !S && !D && t.preventDefault();
  }
  onHexInputPaste(t) {
    const e = t.clipboardData?.getData("text");
    p(e, this.alphaChannel) && f(e, this.alphaChannel) && (t.preventDefault(), this.hexInputRef.value.value = e.slice(1), this.internalSetValue(e, this.value));
  }
  internalSetValue(t, e, a = !0) {
    if (t) {
      const { alphaChannel: n } = this, l = u(t, n, n);
      if (p(l, n)) {
        const { internalColor: o } = this, i = C(l), s = u(h(i, n), n), c = !o || s !== u(h(o, n), n);
        this.internalColor = i, this.previousDefinedValue = s, this.value = s, c && a && this.calciteColorPickerHexInputChange.emit();
        return;
      }
    } else if (this.allowEmpty) {
      this.internalColor = void 0, this.value = void 0, a && this.calciteColorPickerHexInputChange.emit();
      return;
    }
    this.value = e;
  }
  formatHexForInternalInput(t) {
    return t ? t.replace("#", "").slice(0, 6) : "";
  }
  formatOpacityForInternalInput(t) {
    return t ? `${$(t.alpha())}` : "";
  }
  nudgeRGBChannels(t, e, a) {
    let n;
    const l = t.array(), o = l.slice(0, 3);
    if (a === "rgb")
      n = [
        ...o.map((s) => s + e),
        this.alphaChannel ? l[3] : void 0
      ];
    else {
      const i = b($(t.alpha()) + e);
      n = [...o, i];
    }
    return C(n);
  }
  render() {
    const { alphaChannel: t, hexLabel: e, internalColor: a, messages: n, scale: l, value: o } = this, i = this.formatHexForInternalInput(o), s = this.formatOpacityForInternalInput(a), c = l === "l" ? "m" : "s";
    return g`<div class=${x(d.container)}><calcite-input-text class=${x(d.hexInput)} .label=${n?.hex || e} .maxLength=${this.alphaChannel ? 8 : 6} @calciteInputTextChange=${this.onHexInputChange} @calciteInputTextInput=${this.onHexInputInput} @calciteInternalInputTextBlur=${this.onHexInputBlur} @calciteInternalInputTextFocus=${this.onInputFocus} @keydown=${this.onInputKeyDown} @paste=${this.onHexInputPaste} prefix-text=# .scale=${c} .value=${i} ${w(this.hexInputRef)}></calcite-input-text>${t ? A("opacity-input", g`<calcite-input-number class=${x(d.opacityInput)} .label=${n?.opacity} .max=${V.max} max-length=3 .min=${V.min} number-button-type=none .numberingSystem=${this.numberingSystem} @calciteInputNumberInput=${this.onOpacityInputInput} @calciteInternalInputNumberBlur=${this.onOpacityInputBlur} @calciteInternalInputNumberFocus=${this.onInputFocus} @keydown=${this.onInputKeyDown} .scale=${c} suffix-text=% .value=${s} ${w(this.opacityInputRef)}></calcite-input-number>`) : null}</div>`;
  }
}
B("calcite-color-picker-hex-input", U);
export {
  U as ColorPickerHexInput
};
