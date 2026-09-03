/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as d, i as h, H as R, k as p, C as f, D as _, u as v } from "./blocks.js";
import { f as u, R as i } from "./index.js";
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MDXProvider: d,
  useMDXComponents: v
}, Symbol.toStringTag, { value: "Module" }));
var s = {}, c;
function C() {
  if (c) return s;
  c = 1;
  var e = {}, t = h();
  if (e.NODE_ENV === "production")
    s.createRoot = t.createRoot, s.hydrateRoot = t.hydrateRoot;
  else {
    var r = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    s.createRoot = function(o, n) {
      r.usingClientEntryPoint = !0;
      try {
        return t.createRoot(o, n);
      } finally {
        r.usingClientEntryPoint = !1;
      }
    }, s.hydrateRoot = function(o, n, a) {
      r.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(o, n, a);
      } finally {
        r.usingClientEntryPoint = !1;
      }
    };
  }
  return s;
}
var g = C(), l = /* @__PURE__ */ new Map();
function D() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var P = ({
  callback: e,
  children: t
}) => {
  let r = u.useRef();
  return u.useLayoutEffect(() => {
    r.current !== e && (r.current = e, e());
  }, [e]), t;
};
typeof Promise.withResolvers > "u" && (Promise.withResolvers = () => {
  let e = null, t = null;
  return { promise: new Promise((r, o) => {
    e = r, t = o;
  }), resolve: e, reject: t };
});
var w = async (e, t, r) => {
  let o = await M(t, r);
  if (D()) {
    o.render(e);
    return;
  }
  let { promise: n, resolve: a } = Promise.withResolvers();
  return o.render(u.createElement(P, { callback: a }, e)), n;
}, x = (e, t) => {
  let r = l.get(e);
  r && (r.unmount(), l.delete(e));
}, M = async (e, t) => {
  let r = l.get(e);
  return r || (r = g.createRoot(e, t), l.set(e, r)), r;
}, N = {
  code: f,
  a: p,
  ...R
}, O = class extends u.Component {
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
      let o = {
        ...N,
        ...t?.components
      }, n = _;
      return new Promise((a, m) => {
        Promise.resolve().then(() => y).then(
          ({ MDXProvider: E }) => (
            // We use a `key={}` here to reset the `hasError` state each time we render ErrorBoundary
            w(
              i.createElement(O, { showException: m, key: Math.random() }, i.createElement(E, { components: o }, i.createElement(n, { context: e, docsParameter: t }))),
              r
            )
          )
        ).then(() => a());
      });
    }, this.unmount = (e) => {
      x(e);
    };
  }
};
export {
  A as DocsRenderer,
  N as defaultComponents
};
