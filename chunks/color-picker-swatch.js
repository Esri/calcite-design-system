import { h as k, L as f, s as d, x as z, E as r, d as p, j as y } from "./iframe.js";
import { i as C } from "./keyed.js";
import { b as x, h as m } from "./utils4.js";
import { y as b } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const a = {
  swatch: "swatch",
  noColorSwatch: "swatch--no-color",
  checker: "checker"
}, $ = {
  borderLight: "rgba(0, 0, 0, 0.3)",
  borderDark: "rgba(255, 255, 255, 0.15)"
}, g = 4, i = {
  squareSize: g,
  size: g * 2
}, v = k`:host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1)}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}.swatch--no-color line{stroke:var(--calcite-color-status-danger)}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends f {
  constructor() {
    super(...arguments), this.active = !1, this.scale = "m";
  }
  static {
    this.properties = { active: 7, color: 1, scale: 3 };
  }
  static {
    this.styles = v;
  }
  // #endregion
  // #region Lifecycle
  load() {
    this.handleColorChange(this.color);
  }
  willUpdate(e) {
    e.has("color") && this.handleColorChange(this.color);
  }
  // #endregion
  // #region Private Methods
  handleColorChange(e) {
    this.internalColor = e ? x(e) : null;
  }
  // #endregion
  // #region Rendering
  render() {
    const e = !this.internalColor, c = {
      [a.swatch]: !0,
      [a.noColorSwatch]: e
    };
    return z`<svg class=${d(c)} xmlns=http://www.w3.org/2000/svg>${this.renderSwatch()}</svg>`;
  }
  renderSwatch() {
    const { active: e, el: c, internalColor: s } = this, o = e ? "100%" : "0", h = b(c) === "light" ? $.borderLight : $.borderDark, l = !s, t = {
      height: "100%",
      rx: o,
      stroke: h,
      strokeWidth: "2",
      width: "100%"
    };
    if (l)
      return p`<clipPath id=shape><rect height=100% rx=${o ?? r} width=100% /></clipPath>${this.renderSwatchRect({
        clipPath: `inset(0 round ${o})`,
        ...t
      })}<line clip-path=url(#shape) stroke-width=3 x1=100% x2=0 y1=0 y2=100% />`;
    const n = s.alpha(), S = m(s), u = m(s, n < 1);
    return p`<title>${u}</title><defs><pattern height=${i.size} id=checker patternUnits=userSpaceOnUse width=${i.size} x=0 y=0><rect class=${d(a.checker)} height=${i.squareSize} width=${i.squareSize} x=0 y=0 /><rect class=${d(a.checker)} height=${i.squareSize} width=${i.squareSize} x=${i.squareSize} y=${i.squareSize} /></pattern></defs>${this.renderSwatchRect({
      fill: "url(#checker)",
      rx: t.rx,
      height: t.height,
      width: t.width
    })}${this.renderSwatchRect({
      clipPath: n < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${o})`,
      fill: S,
      ...t
    })}${n < 1 ? this.renderSwatchRect({
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      fill: u,
      key: "opacity-fill",
      ...t
    }) : null}`;
  }
  renderSwatchRect({ clipPath: e, fill: c, height: s, key: o, rx: w, stroke: h, strokeWidth: l, width: t }) {
    return C(o, p`<rect clip-path=${e ?? r} fill=${c ?? r} height=${s ?? r} rx=${w ?? r} stroke=${h ?? r} stroke-width=${l ?? r} width=${t ?? r} />`);
  }
}
y("calcite-color-picker-swatch", q);
export {
  q as ColorPickerSwatch
};
