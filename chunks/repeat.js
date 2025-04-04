import { e as $, i as A, t as M, p as b, v as p, r as v, M as m, T as j, m as C } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (s, c, a) => {
  const h = /* @__PURE__ */ new Map();
  for (let e = c; e <= a; e++) h.set(s[e], e);
  return h;
}, E = $(class extends A {
  constructor(s) {
    if (super(s), s.type !== M.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(s, c, a) {
    let h;
    a === void 0 ? a = c : c !== void 0 && (h = c);
    const e = [], i = [];
    let l = 0;
    for (const u of s) e[l] = h ? h(u, l) : l, i[l] = a(u, l), l++;
    return { values: i, keys: e };
  }
  render(s, c, a) {
    return this.dt(s, c, a).values;
  }
  update(s, [c, a, h]) {
    const e = b(s), { values: i, keys: l } = this.dt(c, a, h);
    if (!Array.isArray(e)) return this.ut = l, i;
    const u = this.ut ??= [], f = [];
    let y, g, t = 0, n = e.length - 1, r = 0, o = i.length - 1;
    for (; t <= n && r <= o; ) if (e[t] === null) t++;
    else if (e[n] === null) n--;
    else if (u[t] === l[r]) f[r] = p(e[t], i[r]), t++, r++;
    else if (u[n] === l[o]) f[o] = p(e[n], i[o]), n--, o--;
    else if (u[t] === l[o]) f[o] = p(e[t], i[o]), v(s, f[o + 1], e[t]), t++, o--;
    else if (u[n] === l[r]) f[r] = p(e[n], i[r]), v(s, e[t], e[n]), n--, r++;
    else if (y === void 0 && (y = w(l, r, o), g = w(u, t, n)), y.has(u[t])) if (y.has(u[n])) {
      const d = g.get(l[r]), x = d !== void 0 ? e[d] : null;
      if (x === null) {
        const k = v(s, e[t]);
        p(k, i[r]), f[r] = k;
      } else f[r] = p(x, i[r]), v(s, e[t], x), e[d] = null;
      r++;
    } else m(e[n]), n--;
    else m(e[t]), t++;
    for (; r <= o; ) {
      const d = v(s, f[o + 1]);
      p(d, i[r]), f[r++] = d;
    }
    for (; t <= n; ) {
      const d = e[t++];
      d !== null && m(d);
    }
    return this.ut = l, C(s, f), j;
  }
});
export {
  E as c
};
