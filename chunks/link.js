/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a, L as l, F as d, n as e, s as c, C as h, b as s, d as u } from "./index.js";
import { e as p, n as f } from "./ref.js";
import { u as k } from "./index2.js";
import { u as m } from "./useSetFocus.js";
import { u as b } from "./useInteractive.js";
import { i as v } from "./key.js";
const x = a`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a{cursor:pointer;font-family:inherit;text-decoration-line:none;outline-color:transparent;font-size:inherit;-webkit-appearance:none;color:var(--calcite-link-text-color, var(--calcite-color-text-link));line-height:inherit;white-space:initial}:host a:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.link--text{text-decoration-line:var(--calcite-internal-link-text-decoration-line, underline);text-decoration-color:color-mix(in srgb,currentColor 40%,transparent);text-decoration-thickness:var(--calcite-border-width-sm);text-underline-offset:.33em;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform,text-decoration-color;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host a:hover .link--text{text-decoration-color:currentColor}:host a:active .link--text{text-decoration-color:currentColor}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;margin-block-start:-.25em}:host .calcite-link--icon.icon-start{margin-inline-end:var(--calcite-space-2xs)}:host .calcite-link--icon.icon-end{margin-inline-start:var(--calcite-space-2xs)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`, o = {
  calciteLinkIcon: "calcite-link--icon",
  iconStart: "icon-start",
  iconEnd: "icon-end",
  text: "link--text"
};
class y extends l {
  constructor() {
    super(), this.anchorRef = p(), this.direction = k(), this.focusSetter = m()(this), this.interactiveContainer = b(this), this.keyDownHandler = (t) => {
      v(t.key) && (t.preventDefault(), this.el.click());
    }, this.anchorClickHandler = (t) => {
      t.isTrusted || t.stopPropagation();
    }, this.disabled = !1, this.download = !1, this.listen("click", this.clickHandler);
  }
  static {
    this.properties = { disabled: 7, download: [3, { converter: d }], href: 3, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, rel: 1, target: 1 };
  }
  static {
    this.styles = x;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.anchorRef.value, t);
  }
  clickHandler(t) {
    t.isTrusted || this.anchorRef.value?.click();
  }
  render() {
    const { download: t } = this, n = this.direction, i = !this.href;
    return this.el.role = "presentation", this.interactiveContainer({ disabled: this.disabled, children: s`<a class=${c({ [h.rtl]: n === "rtl" })} download=${(t === !0 || t === "" ? "" : t || void 0) ?? e} href=${(this.href || void 0) ?? e} @click=${this.anchorClickHandler} @keydown=${i ? this.keyDownHandler : void 0} rel=${this.rel ?? e} .role=${i ? "button" : void 0} tabindex=${(i ? 0 : void 0) ?? e} target=${(this.href ? this.target : void 0) ?? e} ${f(this.anchorRef)}>${s`${this.iconStart ? this.renderIcon("start") : null}<span class=${c(o.text)}><slot></slot></span>${this.iconEnd ? this.renderIcon("end") : null}`}</a>` });
  }
  renderIcon(t) {
    const n = t === "start", i = n ? this.iconStart : this.iconEnd, r = this.iconFlipRtl === "both" || this.iconFlipRtl === t;
    return s`<calcite-icon class=${c({
      [o.calciteLinkIcon]: !0,
      [n ? o.iconStart : o.iconEnd]: !0
    })} .flipRtl=${r} .icon=${i} scale=s></calcite-icon>`;
  }
}
u("calcite-link", y);
export {
  y as Link
};
