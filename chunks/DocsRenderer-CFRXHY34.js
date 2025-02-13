import { r as a, e as n } from "./index10.js";
import { r as d, H as h, A as R, C as _, D as f } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
var l, v = {}, s = d;
if (v.NODE_ENV === "production")
  l = s.createRoot, s.hydrateRoot;
else {
  var m = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  l = function(e, t) {
    m.usingClientEntryPoint = !0;
    try {
      return s.createRoot(e, t);
    } finally {
      m.usingClientEntryPoint = !1;
    }
  };
}
var i = /* @__PURE__ */ new Map();
function y() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var C = ({ callback: e, children: t }) => {
  let r = a.useRef();
  return a.useLayoutEffect(() => {
    r.current !== e && (r.current = e, e());
  }, [e]), t;
};
typeof Promise.withResolvers > "u" && (Promise.withResolvers = () => {
  let e = null, t = null;
  return { promise: new Promise((r, o) => {
    e = r, t = o;
  }), resolve: e, reject: t };
});
var g = async (e, t, r) => {
  let o = await D(t, r);
  if (y()) {
    o.render(e);
    return;
  }
  let { promise: u, resolve: c } = Promise.withResolvers();
  return o.render(a.createElement(C, { callback: c }, e)), u;
}, w = (e, t) => {
  let r = i.get(e);
  r && (r.unmount(), i.delete(e));
}, D = async (e, t) => {
  let r = i.get(e);
  return r || (r = l(e, t), i.set(e, r)), r;
}, x = { code: _, a: R, ...h }, N = class extends a.Component {
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
    return e ? null : n.createElement(n.Fragment, null, t);
  }
}, O = class {
  constructor() {
    this.render = async (e, t, r) => {
      let o = { ...x, ...t?.components }, u = f;
      return new Promise((c, E) => {
        import("./index4.js").then(({ MDXProvider: p }) => g(n.createElement(N, { showException: E, key: Math.random() }, n.createElement(p, { components: o }, n.createElement(u, { context: e, docsParameter: t }))), r)).then(() => c());
      });
    }, this.unmount = (e) => {
      w(e);
    };
  }
};
export {
  O as DocsRenderer,
  x as defaultComponents
};
