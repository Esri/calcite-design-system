import { a as h, L as u, h as b, x as e, s as p, o, C as f, c as m } from "./iframe.js";
import { n as g } from "./ref.js";
import { i as a, u as k } from "./static.js";
import { a as v, g as y } from "./dom.js";
import { u as x, I as $ } from "./interactive.js";
import { c as E } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const w = h`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a,:host button{position:relative;display:flex;cursor:pointer;align-items:center;justify-content:center;border-radius:0;border-style:none;font-family:inherit;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform,background-size;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host a:hover,:host button:hover{text-decoration:none}:host a,:host button{outline-color:transparent}:host a:focus,:host button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;margin-block-start:-.25em}:host .calcite-link--icon.icon-start{margin-inline-end:.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:.5rem}:host button,:host a{position:relative;display:inline;border-style:none;background-color:transparent;padding:0;color:var(--calcite-link-text-color, var(--calcite-color-text-link));line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor,currentColor),linear-gradient(var(--calcite-color-brand-underline),var(--calcite-color-brand-underline));background-position-x:0%,100%;background-position-y:min(1.5em,100%);background-repeat:no-repeat,no-repeat;background-size:0% 1px,100% 1px}:host button:hover,:host button:focus,:host a:hover,:host a:focus{background-size:100% 1px,100% 1px}:host button:active,:host a:active{background-size:100% 2px,100% 2px}:host button.calcite--rtl,:host a.calcite--rtl{background-position:100% 100%,100% 100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends u {
  constructor() {
    super(), this.disabled = !1, this.download = !1, this.listen("click", this.clickHandler);
  }
  static {
    this.properties = { disabled: 7, download: [3, { converter: b }], href: 3, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, rel: 1, target: 1 };
  }
  static {
    this.styles = w;
  }
  async setFocus() {
    await E(this), v(this.childEl);
  }
  updated() {
    x(this);
  }
  clickHandler(t) {
    this.disabled || t.isTrusted || this.childEl.click();
  }
  childElClickHandler(t) {
    t.isTrusted || t.stopPropagation();
  }
  storeTagRef(t) {
    this.childEl = t;
  }
  render() {
    const { download: t, el: c } = this, s = y(c), i = this.href ? "a" : "button", l = e`<calcite-icon class="calcite-link--icon icon-start" .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} scale=s></calcite-icon>`, r = e`<calcite-icon class="calcite-link--icon icon-end" .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} scale=s></calcite-icon>`, n = i === "button" ? a`button` : a`a`, d = i === "button" ? 0 : null;
    return this.el.role = "presentation", $({ disabled: this.disabled, children: k`<${n} class=${p({ [f.rtl]: s === "rtl" })} download=${(i === "a" ? t === !0 || t === "" ? "" : t || null : null) ?? o} href=${(i === "a" && this.href) ?? o} @click=${this.childElClickHandler} rel=${(i === "a" && this.rel) ?? o} tabindex=${d ?? o} target=${(i === "a" && this.target) ?? o} ${g(this.storeTagRef)}>${e`${this.iconStart ? l : null}<slot></slot>${this.iconEnd ? r : null}`}</${n}>` });
  }
}
m("calcite-link", z);
export {
  z as Link
};
