/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as m, L as b, n as h, s as o, b as c, o as f, d as g } from "./index.js";
import { x as v, r as d } from "./utils4.js";
const u = {
  thumbnail: "thumbnail",
  background: "background",
  initials: "initials",
  icon: "icon"
};
function p(i) {
  i = k(i);
  let e = 0;
  for (let a = 0; a < i.length; a++)
    e = i.charCodeAt(a) + ((e << 5) - e);
  let t = "#";
  for (let a = 0; a < 3; a++) {
    const s = e >> a * 8 & 255;
    t += ("00" + s.toString(16)).substr(-2);
  }
  return t;
}
function k(i) {
  const e = Math.floor(i.length / 2), t = i.split("").reverse().join("");
  return t.substring(e) + t.slice(0, e);
}
function x(i) {
  let { r: e, g: t, b: a } = i;
  e /= 255, t /= 255, a /= 255;
  const s = Math.max(e, t, a), n = Math.min(e, t, a), l = s - n;
  if (s === n)
    return 0;
  let r = (s + n) / 2;
  switch (s) {
    case e:
      r = (t - a) / l + (t < a ? 6 : 0);
      break;
    case t:
      r = (a - e) / l + 2;
      break;
    case a:
      r = (e - t) / l + 4;
      break;
  }
  return Math.round(r * 60);
}
function z(i) {
  return x(v(i));
}
const $ = m`:host{display:inline-block;overflow:hidden;border-radius:var(--calcite-avatar-corner-radius, 50%);color:var(--calcite-avatar-color, var(--calcite-color-text-2))}:host([scale=s]){block-size:1.5rem;inline-size:1.5rem;font-size:var(--calcite-font-size-relative-xs)}:host([scale=m]){block-size:2rem;inline-size:2rem;font-size:var(--calcite-font-size-relative-sm)}:host([scale=l]){block-size:2.75rem;inline-size:2.75rem;font-size:var(--calcite-font-size-relative-md)}.icon{display:flex}.background{display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;border-radius:var(--calcite-avatar-corner-radius, 50%)}.initials{font-weight:var(--calcite-font-weight-bold);text-transform:uppercase}.thumbnail{block-size:100%;inline-size:100%;border-radius:var(--calcite-avatar-corner-radius, 50%)}:host([hidden]){display:none}[hidden]{display:none}`;
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
      return c`<img alt=${(this.label || "") ?? h} class=${o(u.thumbnail)} @error=${() => this.thumbnailFailedToLoad = !0} src=${this.thumbnail ?? h}>`;
    const e = this.generateInitials(), t = this.generateFillColor();
    return c`<span .ariaLabel=${this.label || this.fullName} class=${o(u.background)} role=figure style=${f({ backgroundColor: t })}>${e ? c`<span aria-hidden=true class=${o(u.initials)}>${e}</span>` : c`<calcite-icon class=${o(u.icon)} icon=user .scale=${this.scale}></calcite-icon>`}</span>`;
  }
  generateFillColor() {
    const { userId: e, username: t, fullName: a } = this, s = e && `#${e.substr(e.length - 6)}`, n = t || a || "", l = s && d(s) ? s : p(n);
    if (!e && !n || !d(l))
      return "var(--calcite-avatar-background-color, var(--calcite-color-foreground-2))";
    const r = z(l);
    return `var(--calcite-avatar-background-color, light-dark(hsl(${r}, 60%, 90%), hsl(${r}, 60%, 20%)))`;
  }
  generateInitials() {
    const { fullName: e, username: t } = this;
    return e ? e.trim().split(" ").map((a) => a.substring(0, 1)).join("") : t ? t.substring(0, 2) : !1;
  }
  render() {
    return this.determineContent();
  }
}
g("calcite-avatar", y);
export {
  y as Avatar
};
