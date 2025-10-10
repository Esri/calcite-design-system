import { b, L as u, s as p, z as h, x as f, q as x } from "./index.js";
import { e as m, n as v } from "./ref.js";
import { u as y, I as g } from "./interactive.js";
import { u as $ } from "./useSetFocus.js";
import { I as k, C as S } from "./resources10.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const F = b`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--calcite-fab-shadow-internal: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);box-shadow:var(--calcite-fab-shadow, var(--calcite-fab-shadow-internal));--calcite-button-background-color: var(--calcite-fab-background-color);--calcite-button-border-color: var(--calcite-fab-border-color);--calcite-button-corner-radius: var(--calcite-fab-corner-radius);--calcite-button-text-color: var(--calcite-fab-text-color);--calcite-button-loader-color: var(--calcite-fab-loader-color)}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends u {
  constructor() {
    super(...arguments), this.buttonRef = m(), this.focusSetter = $()(this), this.appearance = "solid", this.disabled = !1, this.icon = k.plus, this.iconFlipRtl = !1, this.kind = "brand", this.loading = !1, this.scale = "m", this.textEnabled = !1;
  }
  static {
    this.properties = { appearance: 3, disabled: 7, icon: [3, { type: String }], iconFlipRtl: 7, kind: 3, label: 1, loading: 7, scale: 3, text: 1, textEnabled: 7 };
  }
  static {
    this.styles = F;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.buttonRef.value, t);
  }
  updated() {
    y(this);
  }
  render() {
    const { appearance: t, kind: o, disabled: a, loading: i, scale: l, textEnabled: s, icon: c, label: e, text: n, iconFlipRtl: r } = this, d = s ? null : e || n || null;
    return g({ disabled: a, children: f`<calcite-button .appearance=${t === "solid" ? "solid" : "outline-fill"} class=${p(S.button)} .disabled=${a} .iconFlipRtl=${r ? "start" : null} .iconStart=${c} .kind=${o} .label=${e} .loading=${i} round .scale=${l} title=${d ?? h} type=button width=auto ${v(this.buttonRef)}>${this.textEnabled ? this.text : null}</calcite-button>` });
  }
}
x("calcite-fab", R);
export {
  R as Fab
};
