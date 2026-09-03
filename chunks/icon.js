/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { g, l as x, a as I, L as y, s as C, A as h, w as p, b as z, d as $ } from "./index.js";
import { u as D } from "./index2.js";
import { t as k } from "./aria.js";
import { c as w } from "./observers.js";
const f = {
  flipRtl: "flip-rtl",
  svg: "svg"
}, u = {}, d = {}, b = {
  s: 16,
  m: 24,
  l: 32
};
function m({ icon: i, scale: t }) {
  const e = b[t], s = O(i), n = s.charAt(s.length - 1) === "F";
  return `${n ? s.substring(0, s.length - 1) : s}${e}${n ? "F" : ""}`;
}
async function N(i) {
  const t = m(i), e = v(t);
  if (e)
    return e;
  d[t] || (d[t] = fetch(g(`./assets/icon/${t}.json`)).then((n) => n.json()).catch(() => (x.error(`${i.icon} (${i.scale}) icon failed to load`), "")));
  const s = await d[t];
  return u[t] = s, s;
}
function P(i) {
  return v(m(i));
}
function v(i) {
  return u[i];
}
function O(i) {
  const t = !isNaN(Number(i.charAt(0))), e = i.split("-");
  if (e.length > 0) {
    const n = /[a-z]/i;
    i = e.map((o, c) => o.replace(n, function(l, a) {
      return c === 0 && a === 0 ? l : l.toUpperCase();
    })).join("");
  }
  return t ? `i${i}` : i;
}
const A = I`:host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
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
    const { icon: t, scale: e, visible: s } = this;
    if (!t || !s)
      return;
    const n = { icon: t, scale: e }, o = P(n) || await N(n);
    t === this.icon && (this.pathData = o);
  }
  waitUntilVisible(t) {
    if (this.intersectionObserver = w("intersection", (e) => {
      e.forEach((s) => {
        s.isIntersecting && (this.intersectionObserver?.disconnect(), this.intersectionObserver = void 0, t());
      });
    }, { rootMargin: "50px" }), !this.intersectionObserver) {
      t();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  render() {
    const { flipRtl: t, pathData: e, scale: s, textLabel: n } = this, o = this.direction, c = b[s], r = !!n, l = Array.isArray(e) ? e : [e ?? ""];
    return this.el.ariaHidden = k(!r), this.el.ariaLabel = r ? n : null, this.el.role = r ? "img" : null, z`<svg aria-hidden=true class=${C({
      [f.flipRtl]: o === "rtl" && t,
      [f.svg]: !0
    })} fill=currentColor height=100% viewBox=${`0 0 ${c} ${c}`} width=100% xmlns=http://www.w3.org/2000/svg>${l.map((a) => typeof a == "string" ? p`<path d=${a ?? h} />` : p`<path d=${a.d ?? h} opacity=${("opacity" in a ? a.opacity : 1) ?? h} />`)}</svg>`;
  }
}
$("calcite-icon", L);
export {
  L as Icon
};
