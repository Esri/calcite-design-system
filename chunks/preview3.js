/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const { useChannel: u } = __STORYBOOK_MODULE_PREVIEW_API__;
var E = "storybook/html", _ = { CODE_UPDATE: `${E}/codeUpdate` }, d = (c, { parameters: { html: o = {} } = {} }) => {
  let m = u({});
  return setTimeout(() => {
    let n = o.root || "#storybook-root, #root", s = document.querySelector(n), e = s ? s.innerHTML : `${n} not found.`, { removeEmptyComments: l, removeComments: r, transform: a } = o;
    if (l && (e = e.replace(/<!--\s*-->/g, "")), r === !0 ? e = e.replace(/<!--[\S\s]*?-->/g, "") : r instanceof RegExp && (e = e.replace(/<!--([\S\s]*?)-->/g, (t, p) => r.test(p) ? "" : t)), typeof a == "function") try {
      e = a(e);
    } catch (t) {
      console.error(t);
    }
    m(_.CODE_UPDATE, { code: e, options: o });
  }, 0), c();
}, f = { decorators: [d] }, i = f;
export {
  i as default
};
