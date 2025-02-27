import "./entry-preview.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const { global: t } = __STORYBOOK_MODULE_GLOBAL__, { setDefaultProjectAnnotations: _, setProjectAnnotations: s } = __STORYBOOK_MODULE_PREVIEW_API__;
var { window: n } = t;
n.STORYBOOK_ENV = "web-components";
function d(e) {
  if (!e) return !1;
  if (typeof e == "string") return !0;
  throw new Error('Provided component needs to be a string. e.g. component: "my-element"');
}
function O(e) {
  if (!e) return !1;
  if (e.tags && Array.isArray(e.tags) || e.modules && Array.isArray(e.modules)) return !0;
  throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`);
}
function u(e) {
  t.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__ = e;
}
function l() {
  return t.__STORYBOOK_CUSTOM_ELEMENTS__ || t.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
}
var { window: r, EventSource: a } = t;
typeof module < "u" && module?.hot?.decline && (module.hot.decline(), new a("__webpack_hmr").addEventListener("message", function(e) {
  try {
    let { action: o } = JSON.parse(e.data);
    o === "built" && r.location.reload();
  } catch {
  }
}));
export {
  l as getCustomElements,
  d as isValidComponent,
  O as isValidMetaData,
  u as setCustomElementsManifest
};
