import { timeZones as I } from "./time-zones.js";
import { extractRegion as f, global as g } from "./region.js";
import "./index-p4VH55K1.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const M = /* @__PURE__ */ new Date(), T = M.toISOString(), v = 365, y = v, R = {
  groupDateRange: y,
  startDate: T
}, S = (t, r, e) => {
  const o = [];
  let n = e.create(t);
  for (let l = 0; l <= r; l++)
    n = e.increase(n), o.push(e.formatToIsoDateString(n));
  return o;
}, w = (t, r, e, o) => {
  const n = /* @__PURE__ */ new Map(), l = S(r, e, o);
  return t.map((c) => {
    const { label: s } = c, a = f(s), u = l.map((m) => {
      const d = `${m}-${s}`;
      let i = n.get(d);
      return i || (i = o.isoToTimeZone(m, s), n.set(d, i), i);
    });
    return {
      ...c,
      continent: a,
      isRegularContinent: a !== g,
      dates: u
    };
  });
}, J = (t, r, e) => t.length === r.length && t.every((o, n) => e.same(o, r[n])), Z = (t, r = 5) => {
  const e = t.filter(({ label: n }) => f(n) !== g);
  if (e.length === 0)
    return [0];
  const o = e.map((n) => t.indexOf(n));
  return x(o, r);
};
function x(t, r = 5) {
  const e = t.length;
  if (e <= r)
    return t;
  const o = Math.min(e - 2, r - 2), n = (e - 1) / (o + 1);
  return [
    t[0],
    ...Array.from({ length: o }, (l, c) => t[Math.round((c + 1) * n)]),
    t[e - 1]
  ];
}
async function G(t) {
  const { groupDateRange: r, startDate: e, dateEngine: o } = {
    ...R,
    ...t
  }, n = [];
  if (!o)
    throw new Error("dateEngine is required");
  const l = I.map((s) => ({ label: s })), c = w(l, e, r, o);
  for (const s of c) {
    const { label: a, continent: u, dates: m } = s;
    if (s.visited)
      continue;
    s.visited = !0;
    const d = {
      labelIdx: [],
      tzs: [{ label: a }]
    };
    for (const i of c.filter((p) => !p.visited)) {
      const { label: p, continent: b, isRegularContinent: h, dates: z } = i;
      if ((u === b || !h) && J(m, z, o)) {
        const D = { label: p };
        d.tzs.push(D), i.visited = !0;
      }
    }
    n.push(d);
  }
  return n.map((s) => (s.tzs = s.tzs.sort((a, u) => a.label.localeCompare(u.label)), {
    labelTzIdx: Z(s.tzs, 7),
    tzs: s.tzs.map((a) => a.label)
  })).sort((s, a) => a.tzs.length - s.tzs.length);
}
export {
  G as groupByOffset
};
