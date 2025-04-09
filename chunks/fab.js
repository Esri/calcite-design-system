import { c as b, L as p, s as h, o as u, x as w, d as x } from "./iframe.js";
import { e as f, n as v } from "./ref.js";
import { a as m } from "./dom.js";
import { u as g, I as y } from "./interactive.js";
import { c as $ } from "./component.js";
import { I as E, C as k } from "./resources9.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const F = b`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--calcite-fab-shadow-internal: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);box-shadow:var(--calcite-fab-shadow, var(--calcite-fab-shadow-internal));--calcite-button-background-color: var(--calcite-fab-background-color);--calcite-button-border-color: var(--calcite-fab-border-color);--calcite-button-corner-radius: var(--calcite-fab-corner-radius);--calcite-button-text-color: var(--calcite-fab-text-color);--calcite-button-loader-color: var(--calcite-fab-loader-color)}calcite-button:hover{--tw-shadow: var(--calcite-shadow-md);--tw-shadow-colored: var(--calcite-shadow-md);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}calcite-button:active{--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends p {
  constructor() {
    super(...arguments), this.buttonEl = f(), this.appearance = "solid", this.disabled = !1, this.icon = E.plus, this.iconFlipRtl = !1, this.kind = "brand", this.loading = !1, this.scale = "m", this.textEnabled = !1;
  }
  static {
    this.properties = { appearance: 3, disabled: 7, icon: 3, iconFlipRtl: 7, kind: 3, label: 1, loading: 7, scale: 3, text: 1, textEnabled: 7 };
  }
  static {
    this.styles = F;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await $(this), m(this.buttonEl.value);
  }
  // #endregion
  // #region Lifecycle
  updated() {
    g(this);
  }
  // #endregion
  // #region Rendering
  render() {
    const { appearance: o, kind: e, disabled: t, loading: s, scale: l, textEnabled: i, icon: c, label: a, text: n, iconFlipRtl: r } = this, d = i ? null : a || n || null;
    return y({ disabled: t, children: w`<calcite-button .appearance=${o === "solid" ? "solid" : "outline-fill"} class=${h(k.button)} .disabled=${t} .iconFlipRtl=${r ? "start" : null} .iconStart=${c} .kind=${e} .label=${a} .loading=${s} round .scale=${l} title=${d ?? u} type=button width=auto ${v(this.buttonEl)}>${this.textEnabled ? this.text : null}</calcite-button>` });
  }
}
x("calcite-fab", C);
export {
  C as Fab
};
