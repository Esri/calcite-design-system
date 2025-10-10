import { b, L as p, u as f, s as n, x as c, z as e, C as m, q as k } from "./index.js";
import { i as s, u as g } from "./static.js";
import { e as v, n as y } from "./ref.js";
import { a as $ } from "./dom.js";
import { u as x, I as S } from "./interactive.js";
import { u as E } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const z = b`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a,:host button{position:relative;display:flex;cursor:pointer;align-items:center;justify-content:center;border-radius:0;border-style:none;font-family:inherit;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none}:host a:hover,:host button:hover{text-decoration:none}:host a,:host button{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform,background-size;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent}:host a:focus,:host button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;margin-block-start:-.25em}:host .calcite-link--icon.icon-start{margin-inline-end:.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:.5rem}:host button,:host a{position:relative;display:inline;border-style:none;background-color:transparent;padding:0;color:var(--calcite-link-text-color, var(--calcite-color-text-link));line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor,currentColor),linear-gradient(var(--calcite-color-brand-underline),var(--calcite-color-brand-underline));background-position-x:0%,100%;background-position-y:min(1.5em,100%);background-repeat:no-repeat,no-repeat;background-size:0% 1px,100% 1px}:host button:hover,:host button:focus,:host a:hover,:host a:focus{background-size:100% 1px,100% 1px}:host button:active,:host a:active{background-size:100% 2px,100% 2px}:host button.calcite--rtl,:host a.calcite--rtl{background-position:100% 100%,100% 100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, o = {
  calciteLinkIcon: "calcite-link--icon",
  iconStart: "icon-start",
  iconEnd: "icon-end"
};
class R extends p {
  constructor() {
    super(), this.childRef = v(), this.focusSetter = E()(this), this.disabled = !1, this.download = !1, this.listen("click", this.clickHandler);
  }
  static {
    this.properties = { disabled: 7, download: [3, { converter: f }], href: 3, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], rel: 1, target: 1 };
  }
  static {
    this.styles = z;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.childRef.value, t);
  }
  updated() {
    x(this);
  }
  clickHandler(t) {
    this.disabled || t.isTrusted || this.childRef.value.click();
  }
  childElClickHandler(t) {
    t.isTrusted || t.stopPropagation();
  }
  render() {
    const { download: t, el: l } = this, r = $(l), i = this.href ? "a" : "button", d = c`<calcite-icon class=${n({ [o.calciteLinkIcon]: !0, [o.iconStart]: !0 })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} scale=s></calcite-icon>`, h = c`<calcite-icon class=${n({ [o.calciteLinkIcon]: !0, [o.iconEnd]: !0 })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} scale=s></calcite-icon>`, a = i === "button" ? s`button` : s`a`, u = i === "button" ? 0 : null;
    return this.el.role = "presentation", S({ disabled: this.disabled, children: g`<${a} class=${n({ [m.rtl]: r === "rtl" })} download=${(i === "a" ? t === !0 || t === "" ? "" : t || null : null) ?? e} href=${(i === "a" && this.href) ?? e} @click=${this.childElClickHandler} rel=${(i === "a" && this.rel) ?? e} tabindex=${u} target=${(i === "a" && this.target) ?? e} ${y(
      this.childRef
      /* using unknown to workaround Lumina dynamic ref type issue */
    )}>${c`${this.iconStart ? d : null}<slot></slot>${this.iconEnd ? h : null}`}</${a}>` });
  }
}
k("calcite-link", R);
export {
  R as Link
};
