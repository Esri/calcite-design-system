import { o as e } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {}, c = e.createContext(o);
function u(n) {
  const t = e.useContext(c);
  return e.useMemo(
    function() {
      return typeof n == "function" ? n(t) : { ...t, ...n };
    },
    [t, n]
  );
}
function m(n) {
  let t;
  return n.disableParentContext ? t = typeof n.components == "function" ? n.components(o) : n.components || o : t = u(n.components), e.createElement(
    c.Provider,
    { value: t },
    n.children
  );
}
export {
  m as MDXProvider,
  u as useMDXComponents
};
