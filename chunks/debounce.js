/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function g(s, r, { signal: o, edges: e } = {}) {
  let t, l = null;
  const a = e != null && e.includes("leading"), f = e == null || e.includes("trailing"), u = () => {
    l !== null && (s.apply(t, l), t = void 0, l = null);
  }, h = () => {
    f && u(), c();
  };
  let n = null;
  const d = () => {
    n != null && clearTimeout(n), n = setTimeout(() => {
      n = null, h();
    }, r);
  }, m = () => {
    n !== null && (clearTimeout(n), n = null);
  }, c = () => {
    m(), t = void 0, l = null;
  }, T = () => {
    u();
  }, i = function(...p) {
    if (o?.aborted)
      return;
    t = this, l = p;
    const b = n == null;
    d(), a && b && u();
  };
  return i.schedule = d, i.cancel = c, i.flush = T, o?.addEventListener("abort", c, { once: !0 }), i;
}
export {
  g as d
};
