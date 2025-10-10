import { e as A, i as M, t as b, p as j, v as p, a as v, M as m, T as C, m as D } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (r, a, c) => {
  const h = /* @__PURE__ */ new Map();
  for (let e = a; e <= c; e++) h.set(r[e], e);
  return h;
}, H = A(class extends M {
  constructor(r) {
    if (super(r), r.type !== b.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(r, a, c) {
    let h;
    c === void 0 ? c = a : a !== void 0 && (h = a);
    const e = [], i = [];
    let l = 0;
    for (const u of r) e[l] = h ? h(u, l) : l, i[l] = c(u, l), l++;
    return { values: i, keys: e };
  }
  render(r, a, c) {
    return this.dt(r, a, c).values;
  }
  update(r, [a, c, h]) {
    const e = j(r), { values: i, keys: l } = this.dt(a, c, h);
    if (!Array.isArray(e)) return this.ut = l, i;
    const u = this.ut ??= [], f = [];
    let y, g, t = 0, n = e.length - 1, s = 0, o = i.length - 1;
    for (; t <= n && s <= o; ) if (e[t] === null) t++;
    else if (e[n] === null) n--;
    else if (u[t] === l[s]) f[s] = p(e[t], i[s]), t++, s++;
    else if (u[n] === l[o]) f[o] = p(e[n], i[o]), n--, o--;
    else if (u[t] === l[o]) f[o] = p(e[t], i[o]), v(r, f[o + 1], e[t]), t++, o--;
    else if (u[n] === l[s]) f[s] = p(e[n], i[s]), v(r, e[t], e[n]), n--, s++;
    else if (y === void 0 && (y = w(l, s, o), g = w(u, t, n)), y.has(u[t])) if (y.has(u[n])) {
      const d = g.get(l[s]), x = d !== void 0 ? e[d] : null;
      if (x === null) {
        const k = v(r, e[t]);
        p(k, i[s]), f[s] = k;
      } else f[s] = p(x, i[s]), v(r, e[t], x), e[d] = null;
      s++;
    } else m(e[n]), n--;
    else m(e[t]), t++;
    for (; s <= o; ) {
      const d = v(r, f[o + 1]);
      p(d, i[s]), f[s++] = d;
    }
    for (; t <= n; ) {
      const d = e[t++];
      d !== null && m(d);
    }
    return this.ut = l, D(r, f), C;
  }
});
export {
  H as c
};
