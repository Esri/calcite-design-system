import { b as O, L as Y, s as b, z as c, x as C, d as m, q as Z } from "./index.js";
import { g as j } from "./guid.js";
import { c as H } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function I(t, s, e) {
  const i = s[0] - t[0], o = e[0] - s[0], l = s[1] - t[1], h = e[1] - s[1], r = l / (i || o < 0 && 0), n = h / (o || i < 0 && 0), a = (r * o + n * i) / (i + o);
  return (Math.sign(r) + Math.sign(n)) * Math.min(Math.abs(r), Math.abs(n), 0.5 * Math.abs(a)) || 0;
}
function P(t, s, e) {
  const i = s[0] - t[0], o = s[1] - t[1];
  return i ? (3 * o / i - e) / 2 : e;
}
function X(t, s, e, i, o) {
  const [l, h] = t, [r, n] = s, a = (r - l) / 3, $ = o([l + a, h + a * e]).join(","), d = o([r - a, n - a * i]).join(","), g = o([r, n]).join(",");
  return `C ${$} ${d} ${g}`;
}
function q({ width: t, height: s, min: e, max: i }) {
  const o = i[0] - e[0], l = i[1] - e[1];
  return (h) => {
    const r = (h[0] - e[0]) / o * t, n = s - (h[1] - e[1]) / l * s;
    return [r, n];
  };
}
function A(t) {
  const [s, e] = t[0], i = [s, e], o = [s, e];
  return t.reduce(
    ({ min: l, max: h }, [r, n]) => ({
      min: [Math.min(l[0], r), Math.min(l[1], n)],
      max: [Math.max(h[0], r), Math.max(h[1], n)]
    }),
    { min: i, max: o }
  );
}
function B({ data: t, min: s, max: e, t: i }) {
  if (t.length === 0)
    return "";
  const [o, l] = i(t[0]), [h, r] = i(s), [n] = i(e);
  let a, $, d;
  const g = t.reduce((v, k, p) => {
    if ($ = t[p - 2], d = t[p - 1], p > 1) {
      const u = I($, d, k), M = a === void 0 ? P($, d, u) : a, w = X($, d, M, u, i);
      return a = u, `${v} ${w}`;
    }
    return v;
  }, `M ${h},${r} L ${h},${l} L ${o},${l}`), L = t[t.length - 1], x = X(d, L, a, P(d, L, a), i);
  return `${g} ${x} L ${n},${r} Z`;
}
const E = O`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:0;display:block;block-size:100%;inline-size:100%;padding:0}.svg .graph-path--highlight{fill:var(--calcite-graph-highlight-fill-color, var(--calcite-color-brand));opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`, y = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight"
}, z = "calcite-graph", f = {
  host: (t) => `${z}-${t}`,
  linearGradient: (t) => `linear-gradient-${z}-${t}`,
  mask: (t, s) => `${z}-${t}${s}`
};
class R extends Y {
  constructor() {
    super(...arguments), this.graphId = j(), this.resizeObserver = H("resize", () => this.requestUpdate()), this.data = [];
  }
  static {
    this.properties = { colorStops: 0, data: 0, highlightMax: 9, highlightMin: 9, max: 11, min: 11 };
  }
  static {
    this.styles = E;
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  render() {
    const { data: s, colorStops: e, el: i, highlightMax: o, highlightMin: l, min: h, max: r } = this, n = this.graphId, { clientHeight: a, clientWidth: $ } = i;
    if (!s || s.length === 0)
      return C`<svg aria-hidden=true class=${b(y.svg)} height=${a ?? c} preserveAspectRatio=none viewBox=${`0 0 ${$} ${a}`} width=${$ ?? c}></svg>`;
    const { min: d, max: g } = A(s);
    let L = d, x = g;
    (h < d[0] || h > d[0]) && (L = [h, 0]), (r > g[0] || r < g[0]) && (x = [r, g[1]]);
    const v = q({ min: L, max: x, width: $, height: a }), [k] = v([l, x[1]]), [p] = v([o, x[1]]), u = B({ data: s, min: d, max: g, t: v }), M = e ? `url(#${f.linearGradient(n)})` : void 0;
    return C`<svg aria-hidden=true class=${b(y.svg)} height=${a ?? c} preserveAspectRatio=none viewBox=${`0 0 ${$} ${a}`} width=${$ ?? c}>${e ? m`<defs><linearGradient id=${f.linearGradient(n) ?? c} x1=0 x2=1 y1=0 y2=0>${e.map(({ offset: w, color: G, opacity: S }) => m`<stop offset=${`${w * 100}%`} stop-color=${G ?? c} stop-opacity=${S ?? c} />`)}</linearGradient></defs>` : null}${l !== void 0 ? [
      m`<mask height=100% id=${f.mask(n, 1) ?? c} width=100% x=0% y=0%><path d=${`
            M 0,0
            L ${k - 1},0
            L ${k - 1},${a}
            L 0,${a}
            Z
          `} fill=white /></mask>`,
      m`<mask height=100% id=${f.mask(n, 2) ?? c} width=100% x=0% y=0%><path d=${`
            M ${k + 1},0
            L ${p - 1},0
            L ${p - 1},${a}
            L ${k + 1}, ${a}
            Z
          `} fill=white /></mask>`,
      m`<mask height=100% id=${f.mask(n, 3) ?? c} width=100% x=0% y=0%><path d=${`
                M ${p + 1},0
                L ${$},0
                L ${$},${a}
                L ${p + 1}, ${a}
                Z
              `} fill=white /></mask>`,
      m`<path class=${b(y.graphPath)} d=${u ?? c} fill=${M ?? c} mask=${`url(#${f.mask(n, 1)})`} />`,
      m`<path class=${b(y.graphPathHighlight)} d=${u ?? c} fill=${M ?? c} mask=${`url(#${f.mask(n, 2)})`} />`,
      m`<path class=${b(y.graphPath)} d=${u ?? c} fill=${M ?? c} mask=${`url(#${f.mask(n, 3)})`} />`
    ] : m`<path class=${b(y.graphPath)} d=${u ?? c} fill=${M ?? c} />`}</svg>`;
  }
}
Z("calcite-graph", R);
export {
  R as Graph
};
