/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { g, o as x, a as I, L as y, s as z, A as l, w as p, b as C, d as $ } from "./index.js";
import { u as D } from "./index2.js";
import { t as w } from "./aria.js";
import { c as N } from "./observers.js";
const f = {
  flipRtl: "flip-rtl",
  svg: "svg"
}, u = {}, h = {}, m = {
  s: 16,
  m: 24,
  l: 32
};
function b({ icon: s, scale: t }) {
  const e = m[t], i = O(s), n = i.charAt(i.length - 1) === "F";
  return `${n ? i.substring(0, i.length - 1) : i}${e}${n ? "F" : ""}`;
}
async function k(s) {
  const t = b(s), e = v(t);
  if (e)
    return e;
  h[t] || (h[t] = fetch(g(`./assets/icon/${t}.json`)).then((n) => n.json()).catch(() => (x.error(`${s.icon} (${s.scale}) icon failed to load`), "")));
  const i = await h[t];
  return u[t] = i, i;
}
function P(s) {
  return v(b(s));
}
function v(s) {
  return u[s];
}
function O(s) {
  const t = !isNaN(Number(s.charAt(0))), e = /[a-z]/i, i = s.split("-").map(
    (n, a) => n.replace(e, (o, c) => a === 0 && c === 0 ? o : o.toUpperCase())
  ).join("");
  return t ? `i${i}` : i;
}
const A = I`:host{color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor));display:inline-flex}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends y {
  constructor() {
    super(...arguments), this.direction = D(), this.visible = !1, this.flipRtl = !1, this.preload = !1, this.scale = "m";
  }
  static {
    this.properties = { pathData: 16, visible: 16, flipRtl: 7, icon: 3, preload: 7, scale: 3, textLabel: 1 };
  }
  static {
    this.styles = A;
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
    (t.has("icon") && (this.hasUpdated || this.icon !== void 0) || t.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.loadIconPathData();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.intersectionObserver?.disconnect(), this.intersectionObserver = void 0;
  }
  async loadIconPathData() {
    const { icon: t, scale: e, visible: i } = this;
    if (!t || !i)
      return;
    const n = { icon: t, scale: e }, a = P(n) || await k(n);
    t === this.icon && (this.pathData = a);
  }
  waitUntilVisible(t) {
    if (this.intersectionObserver = N("intersection", (e) => {
      e.forEach((i) => {
        i.isIntersecting && (this.intersectionObserver?.disconnect(), this.intersectionObserver = void 0, t());
      });
    }, { rootMargin: "50px" }), !this.intersectionObserver) {
      t();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  render() {
    const { flipRtl: t, pathData: e, scale: i, textLabel: n } = this, a = this.direction, o = m[i], c = !!n, d = Array.isArray(e) ? e : [e ?? ""];
    return this.el.ariaHidden = w(!c), this.el.ariaLabel = c ? n : null, this.el.role = c ? "img" : null, C`<svg aria-hidden=true class=${z({
      [f.flipRtl]: a === "rtl" && t,
      [f.svg]: !0
    })} fill=currentColor height=100% viewBox=${`0 0 ${o} ${o}`} width=100% xmlns=http://www.w3.org/2000/svg>${d.map((r) => typeof r == "string" ? p`<path d=${r ?? l} />` : p`<path d=${r.d ?? l} opacity=${("opacity" in r ? r.opacity : 1) ?? l} />`)}</svg>`;
  }
}
$("calcite-icon", L);
export {
  L as Icon
};
