import { r as u, o as i } from "./index.js";
import { r as d, H as h, A as R, C as p, D as f } from "./blocks.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var s = {}, c;
function y() {
  if (c) return s;
  c = 1;
  var e = {}, t = d();
  if (e.NODE_ENV === "production")
    s.createRoot = t.createRoot, s.hydrateRoot = t.hydrateRoot;
  else {
    var r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    s.createRoot = function(n, o) {
      r.usingClientEntryPoint = !0;
      try {
        return t.createRoot(n, o);
      } finally {
        r.usingClientEntryPoint = !1;
      }
    }, s.hydrateRoot = function(n, o, a) {
      r.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(n, o, a);
      } finally {
        r.usingClientEntryPoint = !1;
      }
    };
  }
  return s;
}
var v = y(), l = /* @__PURE__ */ new Map();
function _() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var C = ({ callback: e, children: t }) => {
  let r = u.useRef();
  return u.useLayoutEffect(() => {
    r.current !== e && (r.current = e, e());
  }, [e]), t;
};
typeof Promise.withResolvers > "u" && (Promise.withResolvers = () => {
  let e = null, t = null;
  return { promise: new Promise((r, n) => {
    e = r, t = n;
  }), resolve: e, reject: t };
});
var g = async (e, t, r) => {
  let n = await D(t, r);
  if (_()) {
    n.render(e);
    return;
  }
  let { promise: o, resolve: a } = Promise.withResolvers();
  return n.render(u.createElement(C, { callback: a }, e)), o;
}, w = (e, t) => {
  let r = l.get(e);
  r && (r.unmount(), l.delete(e));
}, D = async (e, t) => {
  let r = l.get(e);
  return r || (r = v.createRoot(e, t), l.set(e, r)), r;
}, x = { code: p, a: R, ...h }, N = class extends u.Component {
  constructor() {
    super(...arguments), this.state = { hasError: !1 };
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch(e) {
    let { showException: t } = this.props;
    t(e);
  }
  render() {
    let { hasError: e } = this.state, { children: t } = this.props;
    return e ? null : i.createElement(i.Fragment, null, t);
  }
}, A = class {
  constructor() {
    this.render = async (e, t, r) => {
      let n = { ...x, ...t?.components }, o = f;
      return new Promise((a, m) => {
        import("./index3.js").then(({ MDXProvider: E }) => g(i.createElement(N, { showException: m, key: Math.random() }, i.createElement(E, { components: n }, i.createElement(o, { context: e, docsParameter: t }))), r)).then(() => a());
      });
    }, this.unmount = (e) => {
      w(e);
    };
  }
};
export {
  A as DocsRenderer,
  x as defaultComponents
};
