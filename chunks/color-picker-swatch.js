import { b as k, L as z, s as d, x as C, d as p, E as i, q as x } from "./index.js";
import { i as y } from "./keyed.js";
import { f as b, h as m } from "./utils4.js";
import { r as v } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  swatch: "swatch",
  noColorSwatch: "swatch--no-color",
  checker: "checker"
}, $ = {
  borderLight: "rgba(0, 0, 0, 0.3)",
  borderDark: "rgba(255, 255, 255, 0.15)"
}, g = 4, r = {
  squareSize: g,
  size: g * 2
}, S = {
  checker: "checker",
  shape: "shape"
}, q = k`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1)}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}.swatch--no-color line{stroke:var(--calcite-color-status-danger)}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends z {
  constructor() {
    super(...arguments), this.active = !1, this.scale = "m";
  }
  static {
    this.properties = { active: 7, color: 1, scale: 3 };
  }
  static {
    this.styles = q;
  }
  load() {
    this.handleColorChange(this.color);
  }
  willUpdate(e) {
    e.has("color") && this.handleColorChange(this.color);
  }
  handleColorChange(e) {
    this.internalColor = e ? b(e) : null;
  }
  render() {
    const e = !this.internalColor, o = {
      [a.swatch]: !0,
      [a.noColorSwatch]: e
    };
    return C`<svg class=${d(o)} xmlns=http://www.w3.org/2000/svg>${this.renderSwatch()}</svg>`;
  }
  renderSwatch() {
    const { active: e, el: o, internalColor: s } = this, c = e ? "100%" : "0", h = v(o) === "light" ? $.borderLight : $.borderDark, l = !s, t = {
      height: "100%",
      rx: c,
      stroke: h,
      strokeWidth: "2",
      width: "100%"
    };
    if (l)
      return p`<clipPath id=${S.shape}><rect height=100% rx=${c} width=100% /></clipPath>${this.renderSwatchRect({
        clipPath: `inset(0 round ${c})`,
        ...t
      })}<line clip-path=url(#shape) stroke-width=3 x1=100% x2=0 y1=0 y2=100% />`;
    const n = s.alpha(), f = m(s), u = m(s, n < 1);
    return p`<title>${u}</title><defs><pattern height=${r.size} id=${S.checker} patternUnits=userSpaceOnUse width=${r.size} x=0 y=0><rect class=${d(a.checker)} height=${r.squareSize} width=${r.squareSize} x=0 y=0 /><rect class=${d(a.checker)} height=${r.squareSize} width=${r.squareSize} x=${r.squareSize} y=${r.squareSize} /></pattern></defs>${this.renderSwatchRect({
      fill: "url(#checker)",
      rx: t.rx,
      height: t.height,
      width: t.width
    })}${this.renderSwatchRect({
      clipPath: n < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${c})`,
      fill: f,
      ...t
    })}${n < 1 ? this.renderSwatchRect({
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      fill: u,
      key: "opacity-fill",
      ...t
    }) : null}`;
  }
  renderSwatchRect({ clipPath: e, fill: o, height: s, key: c, rx: w, stroke: h, strokeWidth: l, width: t }) {
    return y(c, p`<rect clip-path=${e ?? i} fill=${o ?? i} height=${s ?? i} rx=${w ?? i} stroke=${h ?? i} stroke-width=${l ?? i} width=${t ?? i} />`);
  }
}
x("calcite-color-picker-swatch", E);
export {
  E as ColorPickerSwatch
};
