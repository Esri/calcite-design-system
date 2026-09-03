/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
function b(d, r, { signal: o, edges: e } = {}) {
  let t, l = null;
  const a = e != null && e.includes("leading"), f = e == null || e.includes("trailing"), u = () => {
    l !== null && (d.apply(t, l), t = void 0, l = null);
  }, h = () => {
    f && u(), c();
  };
  let n = null;
  const s = () => {
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
    if (o?.aborted) return;
    t = this, l = p;
    const v = n == null;
    s(), a && v && u();
  };
  return i.schedule = s, i.cancel = c, i.flush = T, o?.addEventListener("abort", c, { once: !0 }), i;
}
export {
  b as d
};
