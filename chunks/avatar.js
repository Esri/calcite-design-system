/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as m, L as b, o as h, s as c, b as o, q as f, f as v } from "./index.js";
import { x as p, r as d } from "./utils4.js";
const u = {
  thumbnail: "thumbnail",
  background: "background",
  initials: "initials",
  icon: "icon"
};
function g(i) {
  i = x(i);
  let e = 0;
  for (let t = 0; t < i.length; t++)
    e = i.charCodeAt(t) + ((e << 5) - e);
  let a = "#";
  for (let t = 0; t < 3; t++) {
    const s = e >> t * 8 & 255;
    a += ("00" + s.toString(16)).substr(-2);
  }
  return a;
}
function x(i) {
  const e = Math.floor(i.length / 2), a = i.split("").reverse().join("");
  return a.substring(e) + a.slice(0, e);
}
function k(i) {
  let { r: e, g: a, b: t } = i;
  e /= 255, a /= 255, t /= 255;
  const s = Math.max(e, a, t), l = Math.min(e, a, t), n = s - l;
  if (s === l)
    return 0;
  let r = (s + l) / 2;
  switch (s) {
    case e:
      r = (a - t) / n + (a < t ? 6 : 0);
      break;
    case a:
      r = (t - e) / n + 2;
      break;
    case t:
      r = (e - a) / n + 4;
      break;
  }
  return Math.round(r * 60);
}
function z(i) {
  return k(p(i));
}
const $ = m`:host{display:inline-block;flex-shrink:0;overflow:hidden;border-radius:var(--calcite-avatar-corner-radius, 50%);color:var(--calcite-avatar-color, var(--calcite-color-text-2))}:host([scale=s]){font-size:var(--calcite-font-size-relative-xs);block-size:var(--calcite-space-2xl);inline-size:var(--calcite-space-2xl)}:host([scale=m]){font-size:var(--calcite-font-size-relative-sm);block-size:var(--calcite-space-3xl);inline-size:var(--calcite-space-3xl)}:host([scale=l]){font-size:var(--calcite-font-size-relative-md);block-size:var(--calcite-space-4xl);inline-size:var(--calcite-space-4xl)}.icon{display:flex}.background{display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;border-radius:var(--calcite-avatar-corner-radius, 50%)}.initials{font-weight:var(--calcite-font-weight-bold);text-transform:uppercase}.thumbnail{block-size:100%;inline-size:100%;border-radius:var(--calcite-avatar-corner-radius, 50%)}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends b {
  constructor() {
    super(...arguments), this.thumbnailFailedToLoad = !1, this.scale = "m";
  }
  static {
    this.properties = { thumbnailFailedToLoad: 16, fullName: 3, label: 1, scale: 3, thumbnail: 3, userId: 3, username: 3 };
  }
  static {
    this.styles = $;
  }
  determineContent() {
    if (this.thumbnail && !this.thumbnailFailedToLoad)
      return o`<img alt=${(this.label || "") ?? h} class=${c(u.thumbnail)} @error=${() => this.thumbnailFailedToLoad = !0} src=${this.thumbnail ?? h}>`;
    const e = this.generateInitials(), a = this.generateFillColor();
    return o`<span .ariaLabel=${this.label || this.fullName} class=${c(u.background)} role=figure style=${f({ backgroundColor: a })}>${e ? o`<span aria-hidden=true class=${c(u.initials)}>${e}</span>` : o`<calcite-icon class=${c(u.icon)} icon=user .scale=${this.scale}></calcite-icon>`}</span>`;
  }
  generateFillColor() {
    const { userId: e, username: a, fullName: t } = this, s = e && `#${e.substr(e.length - 6)}`, l = a || t || "", n = s && d(s) ? s : g(l);
    if (!e && !l || !d(n))
      return "var(--calcite-avatar-background-color, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)))";
    const r = z(n);
    return `var(--calcite-avatar-background-color, light-dark(hsl(${r}, 60%, 90%), hsl(${r}, 60%, 20%)))`;
  }
  generateInitials() {
    const { fullName: e, username: a } = this;
    return e ? e.trim().split(" ").map((t) => t.substring(0, 1)).join("") : a ? a.substring(0, 2) : !1;
  }
  render() {
    return this.determineContent();
  }
}
v("calcite-avatar", y);
export {
  y as Avatar
};
