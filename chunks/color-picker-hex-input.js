import { b as E, L as D, c as L, s as x, x as g, q as N } from "./index.js";
import { i as B } from "./keyed.js";
import { f as m, n as c, h, r as p, s as f, u as I, v as A, o as b, m as $, O as k, w as P } from "./utils4.js";
import { e as V, n as H } from "./ref.js";
import { u as K } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const d = {
  container: "container",
  hexInput: "hex-input",
  opacityInput: "opacity-input"
}, z = E`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}.container{display:flex;inline-size:100%;flex-wrap:nowrap;align-items:center}.hex-input{--calcite-input-text-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-text-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-text-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-prefix-background-color: var(--calcite-color-picker-input-prefix-background-color);--calcite-input-prefix-text-color: var(--calcite-color-picker-input-prefix-text-color)}.opacity-input{--calcite-input-number-background-color: var(--calcite-color-picker-input-background-color);--calcite-input-number-border-color: var(--calcite-color-picker-input-border-color);--calcite-input-number-text-color: var(--calcite-color-picker-input-text-color);--calcite-input-suffix-background-color: var(--calcite-color-picker-input-suffix-background-color);--calcite-input-suffix-text-color: var(--calcite-color-picker-input-suffix-text-color)}.hex-input{flex-grow:1;text-transform:uppercase}.opacity-input{inline-size:100px;margin-inline-start:-1px}:host([hidden]){display:none}[hidden]{display:none}`, v = m();
class U extends D {
  constructor() {
    super(...arguments), this.hexInputRef = V(), this.opacityInputRef = V(), this.focusSetter = K()(this), this.internalColor = v, this.alphaChannel = !1, this.allowEmpty = !1, this.hexLabel = "Hex", this.scale = "m", this.value = c(h(v, this.alphaChannel), this.alphaChannel, !0), this.calciteColorPickerHexInputChange = L({ cancelable: !1 });
  }
  static {
    this.properties = { internalColor: 16, alphaChannel: 5, allowEmpty: 5, hexLabel: 1, messages: 0, numberingSystem: 1, scale: 3, value: 3 };
  }
  static {
    this.styles = z;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.hexInputRef.value, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.previousNonNullValue = this.value;
    const { allowEmpty: t, alphaChannel: e, value: a } = this;
    if (a) {
      const n = c(a, e);
      p(n, e) && this.internalSetValue(n, n, !1);
      return;
    }
    t && this.internalSetValue(void 0, void 0, !1);
  }
  willUpdate(t) {
    t.has("value") && (this.hasUpdated || this.value !== c(h(v, this.alphaChannel), this.alphaChannel, !0)) && this.internalSetValue(this.value, t.get("value"), !1);
  }
  onHexInputBlur() {
    const t = this.hexInputRef.value, e = t.value, a = `#${e}`, { allowEmpty: n, internalColor: l } = this, o = n && !e, i = f(a);
    (I(a, !0) || I(a, !1)) && this.onHexInputChange(), !(o || p(a) && i) && (t.value = n && !l ? "" : this.formatHexForInternalInput(A(
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
      const a = c(e, !1);
      if (p(a) && this.alphaChannel && this.internalColor) {
        const l = c(this.internalColor.hexa(), !0).slice(-2);
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
    const { altKey: e, ctrlKey: a, metaKey: n, shiftKey: l } = t, { alphaChannel: o, hexInputRef: i, internalColor: s, value: u } = this, { key: r } = t, C = t.composedPath();
    if (r === "Tab" && I(u, this.alphaChannel) || r === "Enter") {
      C.includes(i.value) ? this.onHexInputChange() : this.onOpacityInputChange(), r === "Enter" && t.preventDefault();
      return;
    }
    const w = r === "ArrowDown" || r === "ArrowUp", y = this.value;
    if (w) {
      if (!u) {
        this.internalSetValue(this.previousNonNullValue, y), t.preventDefault();
        return;
      }
      const O = r === "ArrowUp" ? 1 : -1, T = l ? 10 : 1;
      this.internalSetValue(h(this.nudgeRGBChannels(s, T * O, C.includes(i.value) ? "rgb" : "a"), o), y), t.preventDefault();
      return;
    }
    const S = e || a || n, R = r.length === 1, F = P.test(r);
    R && !S && !F && t.preventDefault();
  }
  onHexInputPaste(t) {
    const e = t.clipboardData.getData("text");
    p(e, this.alphaChannel) && f(e, this.alphaChannel) && (t.preventDefault(), this.hexInputRef.value.value = e.slice(1), this.internalSetValue(e, this.value));
  }
  internalSetValue(t, e, a = !0) {
    if (t) {
      const { alphaChannel: n } = this, l = c(t, n, n);
      if (p(l, n)) {
        const { internalColor: o } = this, i = m(l), s = c(h(i, n), n), u = !o || s !== c(h(o, n), n);
        this.internalColor = i, this.previousNonNullValue = s, this.value = s, u && a && this.calciteColorPickerHexInputChange.emit();
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
    return m(n);
  }
  render() {
    const { alphaChannel: t, hexLabel: e, internalColor: a, messages: n, scale: l, value: o } = this, i = this.formatHexForInternalInput(o), s = this.formatOpacityForInternalInput(a), u = l === "l" ? "m" : "s";
    return g`<div class=${x(d.container)}><calcite-input-text class=${x(d.hexInput)} .label=${n?.hex || e} .maxLength=${this.alphaChannel ? 8 : 6} @keydown=${this.onInputKeyDown} @paste=${this.onHexInputPaste} @calciteInputTextChange=${this.onHexInputChange} @calciteInputTextInput=${this.onHexInputInput} @calciteInternalInputTextBlur=${this.onHexInputBlur} @calciteInternalInputTextFocus=${this.onInputFocus} prefix-text=# .scale=${u} .value=${i} ${H(this.hexInputRef)}></calcite-input-text>${t ? B("opacity-input", g`<calcite-input-number class=${x(d.opacityInput)} .label=${n?.opacity} .max=${k.max} max-length=3 .min=${k.min} number-button-type=none .numberingSystem=${this.numberingSystem} @keydown=${this.onInputKeyDown} @calciteInputNumberInput=${this.onOpacityInputInput} @calciteInternalInputNumberBlur=${this.onOpacityInputBlur} @calciteInternalInputNumberFocus=${this.onInputFocus} .scale=${u} suffix-text=% .value=${s} ${H(this.opacityInputRef)}></calcite-input-number>`) : null}</div>`;
  }
}
N("calcite-color-picker-hex-input", U);
export {
  U as ColorPickerHexInput
};
