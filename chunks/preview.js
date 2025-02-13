/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const { addons: m } = __STORYBOOK_MODULE_PREVIEW_API__, { global: S } = __STORYBOOK_MODULE_GLOBAL__;
var n = "storybook/a11y", U = `${n}/result`, y = `${n}/request`, L = `${n}/running`, g = `${n}/error`, A = `${n}/manual`, t = { RESULT: U, REQUEST: y, RUNNING: L, ERROR: g, MANUAL: A }, { document: T } = S, a = m.getChannel(), l = !1, s, E = { config: {}, options: {} }, d = async (r, o) => {
  o?.manual || await i(r, o ?? E);
}, i = async (r, o = E) => {
  s = r;
  try {
    if (!l) {
      l = !0, a.emit(t.RUNNING);
      let { default: e } = await import("./axe.js").then((f) => f.a), { element: c = "#storybook-root", config: R, options: O = {} } = o, u = T.querySelector(c);
      if (!u) return;
      e.reset(), R && e.configure(R);
      let _ = await e.run(u, O), N = JSON.parse(JSON.stringify(_));
      s === r ? a.emit(t.RESULT, N) : (l = !1, i(s));
    }
  } catch (e) {
    a.emit(t.ERROR, e);
  } finally {
    l = !1;
  }
};
a.on(t.REQUEST, d);
a.on(t.MANUAL, i);
