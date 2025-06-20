import { a as f, L as k, s as d, x as z, E as r, b as p, c as C } from "./iframe.js";
import { i as x } from "./keyed.js";
import { b as y, h as m } from "./utils4.js";
import { r as b } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const a = {
  swatch: "swatch",
  noColorSwatch: "swatch--no-color",
  checker: "checker"
}, g = {
  borderLight: "rgba(0, 0, 0, 0.3)",
  borderDark: "rgba(255, 255, 255, 0.15)"
}, $ = 4, i = {
  squareSize: $,
  size: $ * 2
}, v = f`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1)}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}.swatch--no-color line{stroke:var(--calcite-color-status-danger)}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends k {
  constructor() {
    super(...arguments), this.active = !1, this.scale = "m";
  }
  static {
    this.properties = { active: 7, color: 1, scale: 3 };
  }
  static {
    this.styles = v;
  }
  load() {
    this.handleColorChange(this.color);
  }
  willUpdate(e) {
    e.has("color") && this.handleColorChange(this.color);
  }
  handleColorChange(e) {
    this.internalColor = e ? y(e) : null;
  }
  render() {
    const e = !this.internalColor, o = {
      [a.swatch]: !0,
      [a.noColorSwatch]: e
    };
    return z`<svg class=${d(o)} xmlns=http://www.w3.org/2000/svg>${this.renderSwatch()}</svg>`;
  }
  renderSwatch() {
    const { active: e, el: o, internalColor: s } = this, c = e ? "100%" : "0", l = b(o) === "light" ? g.borderLight : g.borderDark, h = !s, t = {
      height: "100%",
      rx: c,
      stroke: l,
      strokeWidth: "2",
      width: "100%"
    };
    if (h)
      return p`<clipPath id=shape><rect height=100% rx=${c ?? r} width=100% /></clipPath>${this.renderSwatchRect({
        clipPath: `inset(0 round ${c})`,
        ...t
      })}<line clip-path=url(#shape) stroke-width=3 x1=100% x2=0 y1=0 y2=100% />`;
    const n = s.alpha(), S = m(s), u = m(s, n < 1);
    return p`<title>${u}</title><defs><pattern height=${i.size} id=checker patternUnits=userSpaceOnUse width=${i.size} x=0 y=0><rect class=${d(a.checker)} height=${i.squareSize} width=${i.squareSize} x=0 y=0 /><rect class=${d(a.checker)} height=${i.squareSize} width=${i.squareSize} x=${i.squareSize} y=${i.squareSize} /></pattern></defs>${this.renderSwatchRect({
      fill: "url(#checker)",
      rx: t.rx,
      height: t.height,
      width: t.width
    })}${this.renderSwatchRect({
      clipPath: n < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${c})`,
      fill: S,
      ...t
    })}${n < 1 ? this.renderSwatchRect({
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      fill: u,
      key: "opacity-fill",
      ...t
    }) : null}`;
  }
  renderSwatchRect({ clipPath: e, fill: o, height: s, key: c, rx: w, stroke: l, strokeWidth: h, width: t }) {
    return x(c, p`<rect clip-path=${e ?? r} fill=${o ?? r} height=${s ?? r} rx=${w ?? r} stroke=${l ?? r} stroke-width=${h ?? r} width=${t ?? r} />`);
  }
}
C("calcite-color-picker-swatch", q);
export {
  q as ColorPickerSwatch
};
