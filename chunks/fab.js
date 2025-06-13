import { a as b, L as p, s as u, o as h, x as f, c as x } from "./iframe.js";
import { e as m, n as y } from "./ref.js";
import { a as $ } from "./dom.js";
import { u as g, I as v } from "./interactive.js";
import { c as E } from "./component.js";
import { I as k, C as w } from "./resources9.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const F = b`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--calcite-fab-shadow-internal: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);box-shadow:var(--calcite-fab-shadow, var(--calcite-fab-shadow-internal));--calcite-button-background-color: var(--calcite-fab-background-color);--calcite-button-border-color: var(--calcite-fab-border-color);--calcite-button-corner-radius: var(--calcite-fab-corner-radius);--calcite-button-text-color: var(--calcite-fab-text-color);--calcite-button-loader-color: var(--calcite-fab-loader-color)}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends p {
  constructor() {
    super(...arguments), this.buttonEl = m(), this.appearance = "solid", this.disabled = !1, this.icon = k.plus, this.iconFlipRtl = !1, this.kind = "brand", this.loading = !1, this.scale = "m", this.textEnabled = !1;
  }
  static {
    this.properties = { appearance: 3, disabled: 7, icon: 3, iconFlipRtl: 7, kind: 3, label: 1, loading: 7, scale: 3, text: 1, textEnabled: 7 };
  }
  static {
    this.styles = F;
  }
  async setFocus() {
    await E(this), $(this.buttonEl.value);
  }
  updated() {
    g(this);
  }
  render() {
    const { appearance: e, kind: l, disabled: t, loading: o, scale: i, textEnabled: s, icon: c, label: a, text: n, iconFlipRtl: r } = this, d = s ? null : a || n || null;
    return v({ disabled: t, children: f`<calcite-button .appearance=${e === "solid" ? "solid" : "outline-fill"} class=${u(w.button)} .disabled=${t} .iconFlipRtl=${r ? "start" : null} .iconStart=${c} .kind=${l} .label=${a} .loading=${o} round .scale=${i} title=${d ?? h} type=button width=auto ${y(this.buttonEl)}>${this.textEnabled ? this.text : null}</calcite-button>` });
  }
}
x("calcite-fab", C);
export {
  C as Fab
};
