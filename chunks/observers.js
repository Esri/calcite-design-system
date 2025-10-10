import "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function c(r, t, n) {
  const e = o(r);
  return new e(t, n);
}
function o(r) {
  class t extends window.MutationObserver {
    constructor(e) {
      super(e), this.observedEntry = [], this.callback = e;
    }
    observe(e, s) {
      return this.observedEntry.push({ target: e, options: s }), super.observe(e, s);
    }
    unobserve(e) {
      const s = this.observedEntry.filter((i) => i.target !== e);
      this.observedEntry = [], this.callback(super.takeRecords(), this), this.disconnect(), s.forEach((i) => this.observe(i.target, i.options));
    }
  }
  return (function() {
    return r === "intersection" ? window.IntersectionObserver : r === "mutation" ? t : window.ResizeObserver;
  })();
}
function b(r, t, n, e) {
  if (r && (t && r.unobserve(t), !!n)) {
    if (r instanceof MutationObserver) {
      r.observe(n, e);
      return;
    }
    r.observe(n);
  }
}
export {
  c,
  b as u
};
