import { g as P } from "./guid.js";
import { C as y } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var N = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], h = /* @__PURE__ */ N.join(","), I = typeof Element > "u", f = I ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, b = !I && Element.prototype.getRootNode ? function(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
} : function(e) {
  return e?.ownerDocument;
}, v = function e(t, r) {
  var n;
  r === void 0 && (r = !0);
  var a = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), o = a === "" || a === "true", i = o || r && t && e(t.parentNode);
  return i;
}, L = function(t) {
  var r, n = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "contenteditable");
  return n === "" || n === "true";
}, x = function(t, r, n) {
  if (v(t))
    return [];
  var a = Array.prototype.slice.apply(t.querySelectorAll(h));
  return r && f.call(t, h) && a.unshift(t), a = a.filter(n), a;
}, A = function e(t, r, n) {
  for (var a = [], o = Array.from(t); o.length; ) {
    var i = o.shift();
    if (!v(i, !1))
      if (i.tagName === "SLOT") {
        var s = i.assignedElements(), l = s.length ? s : i.children, u = e(l, !0, n);
        n.flatten ? a.push.apply(a, u) : a.push({
          scopeParent: i,
          candidates: u
        });
      } else {
        var d = f.call(i, h);
        d && n.filter(i) && (r || !t.includes(i)) && a.push(i);
        var c = i.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(i), B = !v(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(i));
        if (c && B) {
          var T = e(c === !0 ? i.children : c.children, !0, n);
          n.flatten ? a.push.apply(a, T) : a.push({
            scopeParent: i,
            candidates: T
          });
        } else
          o.unshift.apply(o, i.children);
      }
  }
  return a;
}, F = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, R = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || L(t)) && !F(t) ? 0 : t.tabIndex;
}, q = function(t, r) {
  var n = R(t);
  return n < 0 && r && !F(t) ? 0 : n;
}, W = function(t, r) {
  return t.tabIndex === r.tabIndex ? t.documentOrder - r.documentOrder : t.tabIndex - r.tabIndex;
}, D = function(t) {
  return t.tagName === "INPUT";
}, $ = function(t) {
  return D(t) && t.type === "hidden";
}, G = function(t) {
  var r = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, U = function(t, r) {
  for (var n = 0; n < t.length; n++)
    if (t[n].checked && t[n].form === r)
      return t[n];
}, j = function(t) {
  if (!t.name)
    return !0;
  var r = t.form || b(t), n = function(s) {
    return r.querySelectorAll('input[type="radio"][name="' + s + '"]');
  }, a;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    a = n(window.CSS.escape(t.name));
  else
    try {
      a = n(t.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var o = U(a, t.form);
  return !o || o === t;
}, z = function(t) {
  return D(t) && t.type === "radio";
}, H = function(t) {
  return z(t) && !j(t);
}, X = function(t) {
  var r, n = t && b(t), a = (r = n) === null || r === void 0 ? void 0 : r.host, o = !1;
  if (n && n !== t) {
    var i, s, l;
    for (o = !!((i = a) !== null && i !== void 0 && (s = i.ownerDocument) !== null && s !== void 0 && s.contains(a) || t != null && (l = t.ownerDocument) !== null && l !== void 0 && l.contains(t)); !o && a; ) {
      var u, d, c;
      n = b(a), a = (u = n) === null || u === void 0 ? void 0 : u.host, o = !!((d = a) !== null && d !== void 0 && (c = d.ownerDocument) !== null && c !== void 0 && c.contains(a));
    }
  }
  return o;
}, w = function(t) {
  var r = t.getBoundingClientRect(), n = r.width, a = r.height;
  return n === 0 && a === 0;
}, V = function(t, r) {
  var n = r.displayCheck, a = r.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var o = f.call(t, "details>summary:first-of-type"), i = o ? t.parentElement : t;
  if (f.call(i, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof a == "function") {
      for (var s = t; t; ) {
        var l = t.parentElement, u = b(t);
        if (l && !l.shadowRoot && a(l) === !0)
          return w(t);
        t.assignedSlot ? t = t.assignedSlot : !l && u !== t.ownerDocument ? t = u.host : t = l;
      }
      t = s;
    }
    if (X(t))
      return !t.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return w(t);
  return !1;
}, Y = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var r = t.parentElement; r; ) {
      if (r.tagName === "FIELDSET" && r.disabled) {
        for (var n = 0; n < r.children.length; n++) {
          var a = r.children.item(n);
          if (a.tagName === "LEGEND")
            return f.call(r, "fieldset[disabled] *") ? !0 : !a.contains(t);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, g = function(t, r) {
  return !(r.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  v(r) || $(r) || V(r, t) || // For a details element with a summary, the summary element gets the focus
  G(r) || Y(r));
}, p = function(t, r) {
  return !(H(r) || R(r) < 0 || !g(t, r));
}, Z = function(t) {
  var r = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, K = function e(t) {
  var r = [], n = [];
  return t.forEach(function(a, o) {
    var i = !!a.scopeParent, s = i ? a.scopeParent : a, l = q(s, i), u = i ? e(a.candidates) : s;
    l === 0 ? i ? r.push.apply(r, u) : r.push(s) : n.push({
      documentOrder: o,
      tabIndex: l,
      item: a,
      isScope: i,
      content: u
    });
  }), n.sort(W).reduce(function(a, o) {
    return o.isScope ? a.push.apply(a, o.content) : a.push(o.content), a;
  }, []).concat(r);
}, J = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = A([t], r.includeContainer, {
    filter: p.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: Z
  }) : n = x(t, r.includeContainer, p.bind(null, r)), K(n);
}, Q = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = A([t], r.includeContainer, {
    filter: g.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = x(t, r.includeContainer, g.bind(null, r)), n;
}, yt = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return f.call(t, h) === !1 ? !1 : p(r, t);
}, _ = /* @__PURE__ */ N.concat("iframe").join(","), pt = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return f.call(t, _) === !1 ? !1 : g(r, t);
};
const O = {
  getShadowRoot: !0
};
function mt(e) {
  return e ? e.id = e.id || `${e.tagName.toLowerCase()}-${P()}` : "";
}
function St(e) {
  return Array.isArray(e) ? e : Array.from(e);
}
function Tt(e) {
  const t = S(
    e,
    `.${y.darkMode}, .${y.lightMode}, .${y.autoMode}`
  );
  return t?.classList.contains("calcite-mode-dark") || t?.classList.contains("calcite-mode-auto") && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function wt(e) {
  const n = S(e, "[dir]");
  return n ? n.getAttribute("dir") : "ltr";
}
function Et(e) {
  return e ? parseFloat(getComputedStyle(e).inlineSize) : 0;
}
function m(e) {
  return e.getRootNode();
}
function Ct(e) {
  const t = m(e);
  return "host" in t ? t : null;
}
function Nt(e, t) {
  if (!e)
    return 0;
  const n = document.createElement("canvas").getContext("2d");
  return n.font = t, n.measureText(e).width;
}
function M(e) {
  return e.host || null;
}
function tt(e, {
  selector: t,
  id: r
}) {
  if (!e)
    return null;
  e.assignedSlot && (e = e.assignedSlot);
  const n = m(e);
  return (r ? "getElementById" in n ? (
    /*
      Check to make sure 'getElementById' exists in cases where element is no longer connected to the DOM and getRootNode() returns the element.
      https://github.com/Esri/calcite-design-system/pull/4280
       */
    n.getElementById(r)
  ) : null : t ? n.querySelector(t) : null) || tt(M(n), { selector: t, id: r });
}
function S(e, t) {
  return e ? e.closest(t) || S(M(m(e)), t) : null;
}
function et(e) {
  return typeof e?.setFocus == "function";
}
async function rt(e, t = !1, r = "tabbable", n, a) {
  return e ? et(e) && n !== e ? e.setFocus(a) : (r === "tabbable" ? at : ot)(e, t, a) : void 0;
}
function nt(e, t) {
  if (e)
    return J(e, { ...O, includeContainer: t })[0] ?? e;
}
function at(e, t, r) {
  nt(e, t)?.focus(r);
}
function it(e, t) {
  if (e)
    return Q(e, { ...O, includeContainer: t })[0] ?? e;
}
function ot(e, t, r) {
  it(e, t)?.focus(r);
}
function It(e, t) {
  return Array.from(e.children).filter((r) => r.matches(t));
}
function ut(e, t) {
  return e.filter((r) => r.matches(t));
}
function xt(e, t, r) {
  if (typeof t == "string" && t !== "")
    return t;
  if (t === "" || t === !0)
    return e[r];
}
function At(e, t) {
  return !(t.left > e.right || t.right < e.left || t.top > e.bottom || t.bottom < e.top);
}
function Ft(e) {
  return (!!e).toString();
}
function Rt(e) {
  return ft(e) || lt(e);
}
function st(e) {
  return ct(e).filter((t) => t.nodeType === Node.TEXT_NODE).map((t) => t.textContent).join("").trim();
}
function Dt(e) {
  for (const t of e.childNodes)
    if (t.nodeType === Node.TEXT_NODE && t.textContent?.trim() !== "" || t.nodeType === Node.ELEMENT_NODE)
      return !0;
  return !1;
}
function lt(e) {
  return !!st(e);
}
function ct(e) {
  return e.currentTarget.assignedNodes({
    flatten: !0
  });
}
function ft(e) {
  return !!dt(e).length;
}
function dt(e, t) {
  return ht(e.currentTarget, t);
}
function ht(e, t) {
  const r = e.assignedElements({
    flatten: !0
  });
  return t ? ut(r, t) : r;
}
function Ot(e) {
  return !!(e.isPrimary && e.button === 0);
}
function Mt(e) {
  return e.detail === 0;
}
const kt = (e, t, r, n = !0, a = !0, o = !1) => {
  const i = e.indexOf(t), s = i === 0, l = i === e.length - 1;
  n && (r = r === "previous" && s ? "last" : r === "next" && l ? "first" : r);
  let u;
  return r === "previous" ? u = e[i - 1] || e[n ? e.length - 1 : i] : r === "next" ? u = e[i + 1] || e[n ? 0 : i] : r === "last" ? u = e[e.length - 1] : u = e[0], rt(u, a, "tabbable", o ? u : void 0), u;
};
function Bt(e, t) {
  if (e.parentNode !== t.parentNode)
    return !1;
  const r = Array.from(e.parentNode.children);
  return r.indexOf(e) < r.indexOf(t);
}
async function Pt(e, t) {
  return k(e, t, "animation");
}
async function Lt(e, t) {
  return k(e, t, "transition");
}
function E(e, t, r) {
  const n = t === "transition" ? "transitionProperty" : "animationName";
  return e.getAnimations().find((a) => a[n] === r);
}
async function k(e, t, r) {
  let n = E(e, r, t);
  if (n || (await bt(), n = E(e, r, t)), !!n)
    try {
      await n.finished;
    } catch {
    }
}
async function bt() {
  await new Promise((e) => requestAnimationFrame(() => e()));
}
function qt(e) {
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("vw") ? C(parseFloat(e), window.innerWidth) : e.endsWith("vh") ? C(parseFloat(e), window.innerHeight) : 0;
}
function C(e, t) {
  return e * t / 100;
}
export {
  pt as A,
  O as B,
  At as C,
  mt as D,
  Mt as E,
  It as F,
  ht as G,
  bt as H,
  Ct as I,
  wt as a,
  kt as b,
  S as c,
  dt as d,
  Ot as e,
  rt as f,
  m as g,
  Et as h,
  Bt as i,
  Nt as j,
  qt as k,
  nt as l,
  xt as m,
  St as n,
  Dt as o,
  Pt as p,
  tt as q,
  Tt as r,
  ft as s,
  Ft as t,
  Rt as u,
  J as v,
  Lt as w,
  Q as x,
  yt as y,
  R as z
};
