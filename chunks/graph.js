import { a as S, L as O, s as b, o as $, x as w, b as p, c as Y } from "./iframe.js";
import { g as Z } from "./guid.js";
import { c as j } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
function G(e, s, a) {
  const i = s[0] - e[0], o = a[0] - s[0], h = s[1] - e[1], c = a[1] - s[1], r = h / (i || o < 0 && 0), n = c / (o || i < 0 && 0), t = (r * o + n * i) / (i + o);
  return (Math.sign(r) + Math.sign(n)) * Math.min(Math.abs(r), Math.abs(n), 0.5 * Math.abs(t)) || 0;
}
function z(e, s, a) {
  const i = s[0] - e[0], o = s[1] - e[1];
  return i ? (3 * o / i - a) / 2 : a;
}
function C(e, s, a, i, o) {
  const [h, c] = e, [r, n] = s, t = (r - h) / 3, l = o([h + t, c + t * a]).join(","), g = o([r - t, n - t * i]).join(","), d = o([r, n]).join(",");
  return `C ${l} ${g} ${d}`;
}
function H({ width: e, height: s, min: a, max: i }) {
  const o = i[0] - a[0], h = i[1] - a[1];
  return (c) => {
    const r = (c[0] - a[0]) / o * e, n = s - (c[1] - a[1]) / h * s;
    return [r, n];
  };
}
function A(e) {
  const [s, a] = e[0], i = [s, a], o = [s, a];
  return e.reduce(
    ({ min: h, max: c }, [r, n]) => ({
      min: [Math.min(h[0], r), Math.min(h[1], n)],
      max: [Math.max(c[0], r), Math.max(c[1], n)]
    }),
    { min: i, max: o }
  );
}
function B({ data: e, min: s, max: a, t: i }) {
  if (e.length === 0)
    return "";
  const [o, h] = i(e[0]), [c, r] = i(s), [n] = i(a);
  let t, l, g;
  const d = e.reduce((x, v, m) => {
    if (l = e[m - 2], g = e[m - 1], m > 1) {
      const u = G(l, g, v), M = t === void 0 ? z(l, g, u) : t, L = C(l, g, M, u, i);
      return t = u, `${x} ${L}`;
    }
    return x;
  }, `M ${c},${r} L ${c},${h} L ${o},${h}`), y = e[e.length - 1], f = C(g, y, t, z(g, y, t), i);
  return `${d} ${f} L ${n},${r} Z`;
}
const E = S`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:0;display:block;block-size:100%;inline-size:100%;padding:0}.svg .graph-path--highlight{fill:var(--calcite-graph-highlight-fill-color, var(--calcite-color-brand));opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`, k = {
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
    const { data: s, colorStops: a, el: i, highlightMax: o, highlightMin: h, min: c, max: r } = this, n = this.graphId, { clientHeight: t, clientWidth: l } = i;
    if (!s || s.length === 0)
      return w`<svg aria-hidden=true class=${b(k.svg)} height=${t ?? $} preserveAspectRatio=none viewBox=${`0 0 ${l} ${t}`} width=${l ?? $}></svg>`;
    const { min: g, max: d } = A(s);
    let y = g, f = d;
    (c < g[0] || c > g[0]) && (y = [c, 0]), (r > d[0] || r < d[0]) && (f = [r, d[1]]);
    const x = H({ min: y, max: f, width: l, height: t }), [v] = x([h, f[1]]), [m] = x([o, f[1]]), u = B({ data: s, min: g, max: d, t: x }), M = a ? `url(#linear-gradient-${n})` : void 0;
    return w`<svg aria-hidden=true class=${b(k.svg)} height=${t ?? $} preserveAspectRatio=none viewBox=${`0 0 ${l} ${t}`} width=${l ?? $}>${a ? p`<defs><linearGradient .id=${`linear-gradient-${n}`} x1=0 x2=1 y1=0 y2=0>${a.map(({ offset: L, color: P, opacity: X }) => p`<stop offset=${`${L * 100}%`} stop-color=${P ?? $} stop-opacity=${X ?? $} />`)}</linearGradient></defs>` : null}${h !== void 0 ? [
      p`<mask height=100% .id=${`${n}1`} width=100% x=0% y=0%><path d=${`
            M 0,0
            L ${v - 1},0
            L ${v - 1},${t}
            L 0,${t}
            Z
          `} fill=white /></mask>`,
      p`<mask height=100% .id=${`${n}2`} width=100% x=0% y=0%><path d=${`
            M ${v + 1},0
            L ${m - 1},0
            L ${m - 1},${t}
            L ${v + 1}, ${t}
            Z
          `} fill=white /></mask>`,
      p`<mask height=100% .id=${`${n}3`} width=100% x=0% y=0%><path d=${`
                M ${m + 1},0
                L ${l},0
                L ${l},${t}
                L ${m + 1}, ${t}
                Z
              `} fill=white /></mask>`,
      p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${M ?? $} mask=${`url(#${n}1)`} />`,
      p`<path class=${b(k.graphPathHighlight)} d=${u ?? $} fill=${M ?? $} mask=${`url(#${n}2)`} />`,
      p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${M ?? $} mask=${`url(#${n}3)`} />`
    ] : p`<path class=${b(k.graphPath)} d=${u ?? $} fill=${M ?? $} />`}</svg>`;
  }
}
Y("calcite-graph", I);
export {
  I as Graph
};
