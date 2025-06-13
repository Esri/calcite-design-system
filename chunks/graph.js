import { a as S, L as O, s as b, o as $, x as w, b as p, c as Y } from "./iframe.js";
import { g as Z } from "./guid.js";
import { c as j } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
function G(e, s, a) {
  const n = s[0] - e[0], h = a[0] - s[0], c = s[1] - e[1], o = a[1] - s[1], r = c / (n || h < 0 && 0), i = o / (h || n < 0 && 0), t = (r * h + i * n) / (n + h);
  return (Math.sign(r) + Math.sign(i)) * Math.min(Math.abs(r), Math.abs(i), 0.5 * Math.abs(t)) || 0;
}
function z(e, s, a) {
  const n = s[0] - e[0], h = s[1] - e[1];
  return n ? (3 * h / n - a) / 2 : a;
}
function C(e, s, a, n, h) {
  const [c, o] = e, [r, i] = s, t = (r - c) / 3, l = h([c + t, o + t * a]).join(","), g = h([r - t, i - t * n]).join(","), d = h([r, i]).join(",");
  return `C ${l} ${g} ${d}`;
}
function H({ width: e, height: s, min: a, max: n }) {
  const h = n[0] - a[0], c = n[1] - a[1];
  return (o) => {
    const r = (o[0] - a[0]) / h * e, i = s - (o[1] - a[1]) / c * s;
    return [r, i];
  };
}
function A(e) {
  const [s, a] = e[0], n = [s, a], h = [s, a];
  return e.reduce(
    ({ min: c, max: o }, [r, i]) => ({
      min: [Math.min(c[0], r), Math.min(c[1], i)],
      max: [Math.max(o[0], r), Math.max(o[1], i)]
    }),
    { min: n, max: h }
  );
}
function B({ data: e, min: s, max: a, t: n }) {
  if (e.length === 0)
    return "";
  const [h, c] = n(e[0]), [o, r] = n(s), [i] = n(a);
  let t, l, g;
  const d = e.reduce((x, M, m) => {
    if (l = e[m - 2], g = e[m - 1], m > 1) {
      const u = G(l, g, M), v = t === void 0 ? z(l, g, u) : t, L = C(l, g, v, u, n);
      return t = u, `${x} ${L}`;
    }
    return x;
  }, `M ${o},${r} L ${o},${c} L ${h},${c}`), y = e[e.length - 1], f = C(g, y, t, z(g, y, t), n);
  return `${d} ${f} L ${i},${r} Z`;
}
const E = S`:host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:0;display:block;block-size:100%;inline-size:100%;padding:0}.svg .graph-path--highlight{fill:var(--calcite-graph-highlight-fill-color, var(--calcite-color-brand));opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`, k = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight"
};
class I extends O {
  constructor() {
    super(...arguments), this.graphId = `calcite-graph-${Z()}`, this.resizeObserver = j("resize", () => this.requestUpdate()), this.data = [];
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
    const { data: s, colorStops: a, el: n, highlightMax: h, highlightMin: c, min: o, max: r } = this, i = this.graphId, { clientHeight: t, clientWidth: l } = n;
    if (!s || s.length === 0)
      return w`<svg aria-hidden=true class=${b(k.svg)} height=${t ?? $} preserveAspectRatio=none viewBox=${`0 0 ${l} ${t}`} width=${l ?? $}></svg>`;
    const { min: g, max: d } = A(s);
    let y = g, f = d;
    (o < g[0] || o > g[0]) && (y = [o, 0]), (r > d[0] || r < d[0]) && (f = [r, d[1]]);
    const x = H({ min: y, max: f, width: l, height: t }), [M] = x([c, f[1]]), [m] = x([h, f[1]]), u = B({ data: s, min: g, max: d, t: x }), v = a ? `url(#linear-gradient-${i})` : void 0;
    return w`<svg aria-hidden=true class=${b(k.svg)} height=${t ?? $} preserveAspectRatio=none viewBox=${`0 0 ${l} ${t}`} width=${l ?? $}>${a ? p`<defs><linearGradient .id=${`linear-gradient-${i}`} x1=0 x2=1 y1=0 y2=0>${a.map(({ offset: L, color: P, opacity: X }) => p`<stop offset=${`${L * 100}%`} stop-color=${P ?? $} stop-opacity=${X ?? $} />`)}</linearGradient></defs>` : null}${c !== void 0 ? [
      p`<mask height=100% .id=${`${i}1`} width=100% x=0% y=0%><path d=${`
            M 0,0
            L ${M - 1},0
            L ${M - 1},${t}
            L 0,${t}
            Z
          `} fill=white /></mask>`,
      p`<mask height=100% .id=${`${i}2`} width=100% x=0% y=0%><path d=${`
            M ${M + 1},0
            L ${m - 1},0
            L ${m - 1},${t}
            L ${M + 1}, ${t}
            Z
          `} fill=white /></mask>`,
      p`<mask height=100% .id=${`${i}3`} width=100% x=0% y=0%><path d=${`
                M ${m + 1},0
                L ${l},0
                L ${l},${t}
                L ${m + 1}, ${t}
                Z
              `} fill=white /></mask>`,
      p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${v ?? $} mask=${`url(#${i}1)`} />`,
      p`<path class=${b(k.graphPathHighlight)} d=${u ?? $} fill=${v ?? $} mask=${`url(#${i}2)`} />`,
      p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${v ?? $} mask=${`url(#${i}3)`} />`
    ] : p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${v ?? $} />`}</svg>`;
  }
}
Y("calcite-graph", I);
export {
  I as Graph
};
