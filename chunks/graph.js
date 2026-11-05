/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as O, L as Y, o as n, s as v, b as G, w as b, f as Z } from "./index.js";
import { g as j } from "./guid.js";
import { c as A } from "./observers.js";
function B(t, e, a) {
  const r = e[0] - t[0], o = a[0] - e[0], $ = e[1] - t[1], h = a[1] - e[1], c = $ / Number(r || o < 0 && 0), i = h / Number(o || r < 0 && 0), s = (c * o + i * r) / (r + o);
  return (Math.sign(c) + Math.sign(i)) * Math.min(Math.abs(c), Math.abs(i), 0.5 * Math.abs(s)) || 0;
}
function C(t, e, a) {
  const r = e[0] - t[0], o = e[1] - t[1];
  return r ? (3 * o / r - a) / 2 : a;
}
function P(t, e, a, r, o) {
  const [$, h] = t, [c, i] = e, s = (c - $) / 3, l = o([$ + s, h + s * a]).join(","), d = o([c - s, i - s * r]).join(","), p = o([c, i]).join(",");
  return `C ${l} ${d} ${p}`;
}
function H({ width: t, height: e, min: a, max: r }) {
  const o = r[0] - a[0], $ = r[1] - a[1];
  return (h) => {
    const c = (h[0] - a[0]) / o * t, i = e - (h[1] - a[1]) / $ * e;
    return [c, i];
  };
}
function I(t) {
  const [e, a] = t[0], r = [e, a], o = [e, a];
  return t.reduce(
    ({ min: $, max: h }, [c, i]) => ({
      min: [Math.min($[0], c), Math.min($[1], i)],
      max: [Math.max(h[0], c), Math.max(h[1], i)]
    }),
    { min: r, max: o }
  );
}
function R({ data: t, min: e, max: a, t: r }) {
  if (t.length < 3)
    return "";
  const [o, $] = r(t[0]), [h, c] = r(e), [i] = r(a);
  let s, l, d;
  const p = t.reduce((M, y, u) => {
    if (l = t[u - 2], d = t[u - 1], u > 1) {
      const g = B(l, d, y), f = s === void 0 ? C(l, d, g) : s, L = P(l, d, f, g, r);
      return s = g, `${M} ${L}`;
    }
    return M;
  }, `M ${h},${c} L ${h},${$} L ${o},${$}`), w = t[t.length - 1], k = P(d, w, s, C(d, w, s), r);
  return `${p} ${k} L ${i},${c} Z`;
}
const E = O`:host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:var(--calcite-space-none);display:block;block-size:100%;inline-size:100%;padding:var(--calcite-space-none)}.svg .graph-path--highlight{fill:var(--calcite-graph-highlight-fill-color, var(--calcite-color-brand));opacity:var(--calcite-opacity-half)}:host([hidden]){display:none}[hidden]{display:none}`, x = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight"
}, z = "calcite-graph", m = {
  host: (t) => `${z}-${t}`,
  linearGradient: (t) => `linear-gradient-${z}-${t}`,
  mask: (t, e) => `${z}-${t}${e}`
};
class N extends Y {
  constructor() {
    super(...arguments), this.graphId = j(), this.resizeObserver = A("resize", () => this.requestUpdate()), this.data = [];
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
    const { data: e, colorStops: a, el: r, highlightMax: o, highlightMin: $, min: h, max: c } = this, i = this.graphId, { clientHeight: s, clientWidth: l } = r;
    if (!e || e.length === 0)
      return G`<svg aria-hidden=true class=${v(x.svg)} height=${s ?? n} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? n}></svg>`;
    const { min: d, max: p } = I(e);
    let w = d, k = p;
    (h < d[0] || h > d[0]) && (w = [h, 0]), (c > p[0] || c < p[0]) && (k = [c, p[1]]);
    const M = H({ min: w, max: k, width: l, height: s }), y = R({ data: e, min: d, max: p, t: M }), u = a ? `url(#${m.linearGradient(i)})` : void 0;
    if ($ !== void 0 && o !== void 0) {
      const [g] = M([$, k[1]]), [f] = M([o, k[1]]);
      return G`<svg aria-hidden=true class=${v(x.svg)} height=${s ?? n} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? n}>${b`${a ? b`<defs><linearGradient id=${m.linearGradient(i) ?? n} x1=0 x2=1 y1=0 y2=0>${a.map(({ offset: L, color: X, opacity: S }) => b`<stop offset=${`${L * 100}%`} stop-color=${X ?? n} stop-opacity=${S ?? n} />`)}</linearGradient></defs>` : null}<mask height=100% id=${m.mask(i, 1) ?? n} width=100% x=0% y=0%><path d=${`
            M 0,0
            L ${g - 1},0
            L ${g - 1},${s}
            L 0,${s}
            Z
          `} fill=white /></mask><mask height=100% id=${m.mask(i, 2) ?? n} width=100% x=0% y=0%><path d=${`
            M ${g + 1},0
            L ${f - 1},0
            L ${f - 1},${s}
            L ${g + 1}, ${s}
            Z
          `} fill=white /></mask><mask height=100% id=${m.mask(i, 3) ?? n} width=100% x=0% y=0%><path d=${`
                M ${f + 1},0
                L ${l},0
                L ${l},${s}
                L ${f + 1}, ${s}
                Z
              `} fill=white /></mask><path class=${v(x.graphPath)} d=${y ?? n} fill=${u ?? n} mask=${`url(#${m.mask(i, 1)})`} /><path class=${v(x.graphPathHighlight)} d=${y ?? n} fill=${u ?? n} mask=${`url(#${m.mask(i, 2)})`} /><path class=${v(x.graphPath)} d=${y ?? n} fill=${u ?? n} mask=${`url(#${m.mask(i, 3)})`} />`}</svg>`;
    }
    return G`<svg aria-hidden=true class=${v(x.svg)} height=${s ?? n} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? n}>${b`${a ? b`<defs><linearGradient id=${m.linearGradient(i) ?? n} x1=0 x2=1 y1=0 y2=0>${a.map(({ offset: g, color: f, opacity: L }) => b`<stop offset=${`${g * 100}%`} stop-color=${f ?? n} stop-opacity=${L ?? n} />`)}</linearGradient></defs>` : null}<path class=${v(x.graphPath)} d=${y ?? n} fill=${u ?? n} />`}</svg>`;
  }
}
Z("calcite-graph", N);
export {
  N as Graph
};
