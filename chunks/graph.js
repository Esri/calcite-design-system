/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as I, L as O, I as a, s as x, b as G, w as y, d as Y } from "./index.js";
import { g as Z } from "./guid.js";
import { c as j } from "./observers.js";
function A(t, e, i) {
  const r = e[0] - t[0], o = i[0] - e[0], $ = e[1] - t[1], c = i[1] - e[1], h = $ / Number(r || o < 0 && 0), n = c / Number(o || r < 0 && 0), s = (h * o + n * r) / (r + o);
  return (Math.sign(h) + Math.sign(n)) * Math.min(Math.abs(h), Math.abs(n), 0.5 * Math.abs(s)) || 0;
}
function C(t, e, i) {
  const r = e[0] - t[0], o = e[1] - t[1];
  return r ? (3 * o / r - i) / 2 : i;
}
function P(t, e, i, r, o) {
  const [$, c] = t, [h, n] = e, s = (h - $) / 3, l = o([$ + s, c + s * i]).join(","), d = o([h - s, n - s * r]).join(","), p = o([h, n]).join(",");
  return `C ${l} ${d} ${p}`;
}
function B({ width: t, height: e, min: i, max: r }) {
  const o = r[0] - i[0], $ = r[1] - i[1];
  return (c) => {
    const h = (c[0] - i[0]) / o * t, n = e - (c[1] - i[1]) / $ * e;
    return [h, n];
  };
}
function H(t) {
  const [e, i] = t[0], r = [e, i], o = [e, i];
  return t.reduce(
    ({ min: $, max: c }, [h, n]) => ({
      min: [Math.min($[0], h), Math.min($[1], n)],
      max: [Math.max(c[0], h), Math.max(c[1], n)]
    }),
    { min: r, max: o }
  );
}
function R({ data: t, min: e, max: i, t: r }) {
  if (t.length < 3)
    return "";
  const [o, $] = r(t[0]), [c, h] = r(e), [n] = r(i);
  let s, l, d;
  const p = t.reduce((M, b, u) => {
    if (l = t[u - 2], d = t[u - 1], u > 1) {
      const g = A(l, d, b), f = s === void 0 ? C(l, d, g) : s, L = P(l, d, f, g, r);
      return s = g, `${M} ${L}`;
    }
    return M;
  }, `M ${c},${h} L ${c},${$} L ${o},${$}`), w = t[t.length - 1], k = P(d, w, s, C(d, w, s), r);
  return `${p} ${k} L ${n},${h} Z`;
}
const E = I`:host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:0;display:block;block-size:100%;inline-size:100%;padding:0}.svg .graph-path--highlight{fill:var(--calcite-graph-highlight-fill-color, var(--calcite-color-brand));opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`, v = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight"
}, z = "calcite-graph", m = {
  host: (t) => `${z}-${t}`,
  linearGradient: (t) => `linear-gradient-${z}-${t}`,
  mask: (t, e) => `${z}-${t}${e}`
};
class N extends O {
  constructor() {
    super(...arguments), this.graphId = Z(), this.resizeObserver = j("resize", () => this.requestUpdate()), this.data = [];
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
    const { data: e, colorStops: i, el: r, highlightMax: o, highlightMin: $, min: c, max: h } = this, n = this.graphId, { clientHeight: s, clientWidth: l } = r;
    if (!e || e.length === 0)
      return G`<svg aria-hidden=true class=${x(v.svg)} height=${s ?? a} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? a}></svg>`;
    const { min: d, max: p } = H(e);
    let w = d, k = p;
    (c < d[0] || c > d[0]) && (w = [c, 0]), (h > p[0] || h < p[0]) && (k = [h, p[1]]);
    const M = B({ min: w, max: k, width: l, height: s }), b = R({ data: e, min: d, max: p, t: M }), u = i ? `url(#${m.linearGradient(n)})` : void 0;
    if ($ !== void 0 && o !== void 0) {
      const [g] = M([$, k[1]]), [f] = M([o, k[1]]);
      return G`<svg aria-hidden=true class=${x(v.svg)} height=${s ?? a} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? a}>${y`${i ? y`<defs><linearGradient id=${m.linearGradient(n) ?? a} x1=0 x2=1 y1=0 y2=0>${i.map(({ offset: L, color: X, opacity: S }) => y`<stop offset=${`${L * 100}%`} stop-color=${X ?? a} stop-opacity=${S ?? a} />`)}</linearGradient></defs>` : null}<mask height=100% id=${m.mask(n, 1) ?? a} width=100% x=0% y=0%><path d=${`
            M 0,0
            L ${g - 1},0
            L ${g - 1},${s}
            L 0,${s}
            Z
          `} fill=white /></mask><mask height=100% id=${m.mask(n, 2) ?? a} width=100% x=0% y=0%><path d=${`
            M ${g + 1},0
            L ${f - 1},0
            L ${f - 1},${s}
            L ${g + 1}, ${s}
            Z
          `} fill=white /></mask><mask height=100% id=${m.mask(n, 3) ?? a} width=100% x=0% y=0%><path d=${`
                M ${f + 1},0
                L ${l},0
                L ${l},${s}
                L ${f + 1}, ${s}
                Z
              `} fill=white /></mask><path class=${x(v.graphPath)} d=${b ?? a} fill=${u ?? a} mask=${`url(#${m.mask(n, 1)})`} /><path class=${x(v.graphPathHighlight)} d=${b ?? a} fill=${u ?? a} mask=${`url(#${m.mask(n, 2)})`} /><path class=${x(v.graphPath)} d=${b ?? a} fill=${u ?? a} mask=${`url(#${m.mask(n, 3)})`} />`}</svg>`;
    }
    return G`<svg aria-hidden=true class=${x(v.svg)} height=${s ?? a} preserveAspectRatio=none viewBox=${`0 0 ${l} ${s}`} width=${l ?? a}>${y`${i ? y`<defs><linearGradient id=${m.linearGradient(n) ?? a} x1=0 x2=1 y1=0 y2=0>${i.map(({ offset: g, color: f, opacity: L }) => y`<stop offset=${`${g * 100}%`} stop-color=${f ?? a} stop-opacity=${L ?? a} />`)}</linearGradient></defs>` : null}<path class=${x(v.graphPath)} d=${b ?? a} fill=${u ?? a} />`}</svg>`;
  }
}
Y("calcite-graph", N);
export {
  N as Graph
};
