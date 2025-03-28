/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
var o = Object.defineProperty, s = (e, r) => {
  for (var t in r) o(e, t, { get: r[t], enumerable: !0 });
}, i = {};
s(i, { parameters: () => p });
var n = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, r) => {
  let [t, a] = r;
  return a.excludeFromDocsStories && (e[t] = !0), e;
}, {}), p = { docs: { renderer: async () => {
  let { DocsRenderer: e } = await import("./DocsRenderer-CFRXHY34.js");
  return new e();
}, stories: { filter: (e) => (e.tags || []).filter((r) => n[r]).length === 0 && !e.parameters.docs?.disable } } };
export {
  p as parameters
};
