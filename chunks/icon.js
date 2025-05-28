import { g as v, a as x, L as I, s as C, E as p, b as u, x as z, c as y } from "./iframe.js";
import { g as $, t as D } from "./dom.js";
import { c as k } from "./observers.js";
import { l as w } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const N = {
  flipRtl: "flip-rtl"
}, f = {}, d = {}, b = {
  s: 16,
  m: 24,
  l: 32
};
function m({ icon: e, scale: t }) {
  const s = b[t], i = L(e), n = i.charAt(i.length - 1) === "F";
  return `${n ? i.substring(0, i.length - 1) : i}${s}${n ? "F" : ""}`;
}
async function P(e) {
  const t = m(e), s = g(t);
  if (s)
    return s;
  d[t] || (d[t] = fetch(v(`./assets/icon/${t}.json`)).then((n) => n.json()).catch(() => (w.error(`${e.icon} (${e.scale}) icon failed to load`), "")));
  const i = await d[t];
  return f[t] = i, i;
}
function O(e) {
  return g(m(e));
}
function g(e) {
  return f[e];
}
function L(e) {
  const t = !isNaN(Number(e.charAt(0))), s = e.split("-");
  if (s.length > 0) {
    const n = /[a-z]/i;
    e = s.map((a, r) => a.replace(n, function(c, h) {
      return r === 0 && h === 0 ? c : c.toUpperCase();
    })).join("");
  }
  return t ? `i${e}` : e;
}
const U = x`:host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends I {
  constructor() {
    super(...arguments), this.visible = !1, this.flipRtl = !1, this.icon = null, this.preload = !1, this.scale = "m";
  }
  static {
    this.properties = { pathData: 16, visible: 16, flipRtl: 7, icon: 3, preload: 7, scale: 3, textLabel: 1 };
  }
  static {
    this.styles = U;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.preload) {
      this.visible = !0, this.loadIconPathData();
      return;
    }
    this.visible || this.waitUntilVisible(() => {
      this.visible = !0, this.loadIconPathData();
    });
  }
  willUpdate(t) {
    (t.has("icon") && (this.hasUpdated || this.icon !== null) || t.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.loadIconPathData();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.intersectionObserver?.disconnect(), this.intersectionObserver = null;
  }
  async loadIconPathData() {
    const { icon: t, scale: s, visible: i } = this;
    if (!t || !i)
      return;
    const n = { icon: t, scale: s }, a = O(n) || await P(n);
    t === this.icon && (this.pathData = a);
  }
  waitUntilVisible(t) {
    if (this.intersectionObserver = k("intersection", (s) => {
      s.forEach((i) => {
        i.isIntersecting && (this.intersectionObserver.disconnect(), this.intersectionObserver = null, t());
      });
    }, { rootMargin: "50px" }), !this.intersectionObserver) {
      t();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  render() {
    const { el: t, flipRtl: s, pathData: i, scale: n, textLabel: a } = this, r = $(t), l = b[n], c = !!a, h = [].concat(i || "");
    return this.el.ariaHidden = D(!c), this.el.ariaLabel = c ? a : null, this.el.role = c ? "img" : null, z`<svg aria-hidden=true class=${C({
      [N.flipRtl]: r === "rtl" && s,
      svg: !0
    })} fill=currentColor height=100% viewBox=${`0 0 ${l} ${l}`} width=100% xmlns=http://www.w3.org/2000/svg>${h.map((o) => typeof o == "string" ? u`<path d=${o ?? p} />` : u`<path d=${o.d ?? p} opacity=${("opacity" in o ? o.opacity : 1) ?? p} />`)}</svg>`;
  }
}
y("calcite-icon", E);
export {
  E as Icon
};
