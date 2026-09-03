/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as u, L as h, I as p, s as f, b as v, d as m } from "./index.js";
import { e as y, n as x } from "./ref.js";
import { u as $ } from "./useSetFocus.js";
import { u as g } from "./useInteractive.js";
const S = {
  button: "button"
}, k = {
  plus: "plus"
}, w = u`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--calcite-fab-shadow-internal: var(--calcite-shadow-md);box-shadow:var(--calcite-fab-shadow, var(--calcite-fab-shadow-internal));--calcite-button-background-color: var(--calcite-fab-background-color);--calcite-button-border-color: var(--calcite-fab-border-color);--calcite-button-corner-radius: var(--calcite-fab-corner-radius);--calcite-button-text-color: var(--calcite-fab-text-color);--calcite-button-loader-color: var(--calcite-fab-loader-color)}:host([hidden]){display:none}[hidden]{display:none}`;
class i extends h {
  constructor() {
    super(...arguments), this.buttonRef = y(), this.focusSetter = $()(this), this.interactiveContainer = g(this), this.appearance = "solid", this.disabled = !1, this.icon = k.plus, this.iconFlipRtl = !1, this.kind = "brand", this.loading = !1, this.scale = "m", this.textEnabled = !1;
  }
  static {
    this.properties = { appearance: 3, disabled: 7, icon: 3, iconFlipRtl: 7, kind: 3, label: 1, loading: 7, scale: 3, text: 1, textEnabled: 7 };
  }
  static {
    this.styles = w;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.buttonRef.value, t);
  }
  render() {
    const { appearance: t, kind: o, disabled: e, loading: s, scale: l, textEnabled: c, icon: n, label: a, text: r, iconFlipRtl: d } = this, b = c ? void 0 : a || r || void 0;
    return this.interactiveContainer({ disabled: e, children: v`<calcite-button .appearance=${t === "solid" ? "solid" : "outline-fill"} class=${f(S.button)} .disabled=${e} .iconFlipRtl=${d ? "start" : void 0} .iconStart=${n} .kind=${o} .label=${a} .loading=${s} round .scale=${l} title=${b ?? p} type=button width=auto ${x(this.buttonRef)}>${this.textEnabled ? this.text : null}</calcite-button>` });
  }
}
m("calcite-fab", i);
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Fab: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  k as I,
  _ as f
};
