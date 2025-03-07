import { g as v, d as x, L as I, i as C, s as z, E as p, c as u, x as y, h as $ } from "./iframe.js";
import { g as D, t as k } from "./dom.js";
import { c as w } from "./observers.js";
import { l as N } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const P = {
  flipRtl: "flip-rtl"
}, f = {}, d = {}, b = {
  s: 16,
  m: 24,
  l: 32
};
function m({ icon: e, scale: t }) {
  const s = b[t], i = U(e), n = i.charAt(i.length - 1) === "F";
  return `${n ? i.substring(0, i.length - 1) : i}${s}${n ? "F" : ""}`;
}
async function O(e) {
  const t = m(e), s = g(t);
  if (s)
    return s;
  d[t] || (d[t] = fetch(v(`./assets/icon/${t}.json`)).then((n) => n.json()).catch(() => (N.error(`${e.icon} (${e.scale}) icon failed to load`), "")));
  const i = await d[t];
  return f[t] = i, i;
}
function L(e) {
  return g(m(e));
}
function g(e) {
  return f[e];
}
function U(e) {
  const t = !isNaN(Number(e.charAt(0))), s = e.split("-");
  if (s.length > 0) {
    const n = /[a-z]/i;
    e = s.map((a, r) => a.replace(n, function(c, h) {
      return r === 0 && h === 0 ? c : c.toUpperCase();
    })).join("");
  }
  return t ? `i${e}` : e;
}
const E = x`:host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends I {
  constructor() {
    super(...arguments), this.visible = !1, this.flipRtl = !1, this.icon = null, this.preload = !1, this.scale = "m";
  }
  static {
    this.properties = { pathData: 16, visible: 16, flipRtl: 7, icon: 3, preload: 7, scale: 3, textLabel: 1 };
  }
  static {
    this.styles = E;
  }
  // #endregion
  // #region Lifecycle
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
  // #endregion
  // #region Private Methods
  async loadIconPathData() {
    const { icon: t, scale: s, visible: i } = this;
    if (!C() || !t || !i)
      return;
    const n = { icon: t, scale: s }, a = L(n) || await O(n);
    t === this.icon && (this.pathData = a);
  }
  waitUntilVisible(t) {
    if (this.intersectionObserver = w("intersection", (s) => {
      s.forEach((i) => {
        i.isIntersecting && (this.intersectionObserver.disconnect(), this.intersectionObserver = null, t());
      });
    }, { rootMargin: "50px" }), !this.intersectionObserver) {
      t();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  // #endregion
  // #region Rendering
  render() {
    const { el: t, flipRtl: s, pathData: i, scale: n, textLabel: a } = this, r = D(t), l = b[n], c = !!a, h = [].concat(i || "");
    return this.el.ariaHidden = k(!c), this.el.ariaLabel = c ? a : null, this.el.role = c ? "img" : null, y`<svg aria-hidden=true class=${z({
      [P.flipRtl]: r === "rtl" && s,
      svg: !0
    })} fill=currentColor height=100% viewBox=${`0 0 ${l} ${l}`} width=100% xmlns=http://www.w3.org/2000/svg>${h.map((o) => typeof o == "string" ? u`<path d=${o ?? p} />` : u`<path d=${o.d ?? p} opacity=${("opacity" in o ? o.opacity : 1) ?? p} />`)}</svg>`;
  }
}
$("calcite-icon", R);
export {
  R as Icon
};
