/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as s, L as l, T as d, I as e, s as a, F as h, b as o, d as u } from "./index.js";
import { e as b, n as m } from "./ref.js";
import { u as p } from "./index2.js";
import { u as f } from "./useSetFocus.js";
import { u as k } from "./useInteractive.js";
import { i as v } from "./key.js";
const g = s`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a{cursor:pointer;font-family:inherit;text-decoration-line:none;outline-color:transparent;font-size:inherit;-webkit-appearance:none;color:var(--calcite-link-text-color, var(--calcite-color-text-link));line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor,currentColor),linear-gradient(var(--calcite-color-brand-underline),var(--calcite-color-brand-underline));background-position-x:0 100%;background-position-y:min(1.5em,100%);background-repeat:no-repeat;background-size:0% var(--calcite-border-width-sm),100% var(--calcite-border-width-sm)}:host a:hover,:host a:focus{background-size:100% var(--calcite-border-width-sm),100% var(--calcite-border-width-sm)}:host a:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host a:active{background-size:100% var(--calcite-border-width-md),100% var(--calcite-border-width-md)}:host a:active.calcite--rtl{background-position:100% 100%,100% 100%}:host a{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform,background-size;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;margin-block-start:-.25em}:host .calcite-link--icon.icon-start{margin-inline-end:.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:.5rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, r = {
  calciteLinkIcon: "calcite-link--icon",
  iconStart: "icon-start",
  iconEnd: "icon-end"
};
class y extends l {
  constructor() {
    super(), this.anchorRef = b(), this.direction = p(), this.focusSetter = f()(this), this.interactiveContainer = k(this), this.keyDownHandler = (i) => {
      v(i.key) && (i.preventDefault(), this.el.click());
    }, this.anchorClickHandler = (i) => {
      i.isTrusted || i.stopPropagation();
    }, this.disabled = !1, this.download = !1, this.listen("click", this.clickHandler);
  }
  static {
    this.properties = { disabled: 7, download: [3, { converter: d }], href: 3, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, rel: 1, target: 1 };
  }
  static {
    this.styles = g;
  }
  async setFocus(i) {
    return this.focusSetter(() => this.anchorRef.value, i);
  }
  clickHandler(i) {
    i.isTrusted || this.anchorRef.value?.click();
  }
  render() {
    const { download: i } = this, n = this.direction, t = !this.href;
    return this.el.role = "presentation", this.interactiveContainer({ disabled: this.disabled, children: o`<a class=${a({ [h.rtl]: n === "rtl" })} download=${(i === !0 || i === "" ? "" : i || void 0) ?? e} href=${(this.href || void 0) ?? e} @click=${this.anchorClickHandler} @keydown=${t ? this.keyDownHandler : void 0} rel=${this.rel ?? e} .role=${t ? "button" : void 0} tabindex=${(t ? 0 : void 0) ?? e} target=${(this.href ? this.target : void 0) ?? e} ${m(this.anchorRef)}>${o`${this.iconStart ? this.renderIcon("start") : null}<slot></slot>${this.iconEnd ? this.renderIcon("end") : null}`}</a>` });
  }
  renderIcon(i) {
    const n = i === "start", t = n ? this.iconStart : this.iconEnd, c = this.iconFlipRtl === "both" || this.iconFlipRtl === i;
    return o`<calcite-icon class=${a({
      [r.calciteLinkIcon]: !0,
      [n ? r.iconStart : r.iconEnd]: !0
    })} .flipRtl=${c} .icon=${t} scale=s></calcite-icon>`;
  }
}
u("calcite-link", y);
export {
  y as Link
};
