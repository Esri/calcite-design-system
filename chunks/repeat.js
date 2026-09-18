/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { e as w, i as A, t as E, M, u as p, v, h as $, E as b, p as j } from "./index.js";
const m = (r, c, a) => {
  const h = /* @__PURE__ */ new Map();
  for (let e = c; e <= a; e++) h.set(r[e], e);
  return h;
}, D = w(class extends A {
  constructor(r) {
    if (super(r), r.type !== E.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(r, c, a) {
    let h;
    a === void 0 ? a = c : c !== void 0 && (h = c);
    const e = [], i = [];
    let l = 0;
    for (const u of r) e[l] = h ? h(u, l) : l, i[l] = a(u, l), l++;
    return { values: i, keys: e };
  }
  render(r, c, a) {
    return this.dt(r, c, a).values;
  }
  update(r, [c, a, h]) {
    const e = M(r), { values: i, keys: l } = this.dt(c, a, h);
    if (!Array.isArray(e)) return this.ut = l, i;
    const u = this.ut ??= [], f = [];
    let y, g, t = 0, n = e.length - 1, s = 0, o = i.length - 1;
    for (; t <= n && s <= o; ) if (e[t] === null) t++;
    else if (e[n] === null) n--;
    else if (u[t] === l[s]) f[s] = p(e[t], i[s]), t++, s++;
    else if (u[n] === l[o]) f[o] = p(e[n], i[o]), n--, o--;
    else if (u[t] === l[o]) f[o] = p(e[t], i[o]), v(r, f[o + 1], e[t]), t++, o--;
    else if (u[n] === l[s]) f[s] = p(e[n], i[s]), v(r, e[t], e[n]), n--, s++;
    else if (y === void 0 && (y = m(l, s, o), g = m(u, t, n)), y.has(u[t])) if (y.has(u[n])) {
      const d = g.get(l[s]), x = d !== void 0 ? e[d] : null;
      if (x === null) {
        const k = v(r, e[t]);
        p(k, i[s]), f[s] = k;
      } else f[s] = p(x, i[s]), v(r, e[t], x), e[d] = null;
      s++;
    } else $(e[n]), n--;
    else $(e[t]), t++;
    for (; s <= o; ) {
      const d = v(r, f[o + 1]);
      p(d, i[s]), f[s++] = d;
    }
    for (; t <= n; ) {
      const d = e[t++];
      d !== null && $(d);
    }
    return this.ut = l, j(r, f), b;
  }
});
export {
  D as c
};
