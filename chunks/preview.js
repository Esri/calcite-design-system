/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
var a = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, r) => {
  let [t, s] = r;
  return s.excludeFromDocsStories && (e[t] = !0), e;
}, {}), o = { docs: { renderer: async () => {
  let { DocsRenderer: e } = await import("./DocsRenderer-CFRXHY34.js");
  return new e();
}, stories: { filter: (e) => (e.tags || []).filter((r) => a[r]).length === 0 && !e.parameters.docs?.disable } } };
export {
  o as parameters
};
