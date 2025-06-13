import { g as k } from "./guid.js";
import { C as y } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var C = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], h = /* @__PURE__ */ C.join(","), N = typeof Element > "u", f = N ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, v = !N && Element.prototype.getRootNode ? function(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
} : function(e) {
  return e?.ownerDocument;
}, g = function e(t, r) {
  var n;
  r === void 0 && (r = !0);
  var a = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), o = a === "" || a === "true", i = o || r && t && e(t.parentNode);
  return i;
}, B = function(t) {
  var r, n = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "contenteditable");
  return n === "" || n === "true";
}, I = function(t, r, n) {
  if (g(t))
    return [];
  var a = Array.prototype.slice.apply(t.querySelectorAll(h));
  return r && f.call(t, h) && a.unshift(t), a = a.filter(n), a;
}, A = function e(t, r, n) {
  for (var a = [], o = Array.from(t); o.length; ) {
    var i = o.shift();
    if (!g(i, !1))
      if (i.tagName === "SLOT") {
        var u = i.assignedElements(), s = u.length ? u : i.children, l = e(s, !0, n);
        n.flatten ? a.push.apply(a, l) : a.push({
          scopeParent: i,
          candidates: l
        });
      } else {
        var d = f.call(i, h);
        d && n.filter(i) && (r || !t.includes(i)) && a.push(i);
        var c = i.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(i), M = !g(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(i));
        if (c && M) {
          var w = e(c === !0 ? i.children : c.children, !0, n);
          n.flatten ? a.push.apply(a, w) : a.push({
            scopeParent: i,
            candidates: w
          });
        } else
          o.unshift.apply(o, i.children);
      }
  }
  return a;
}, x = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, R = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || B(t)) && !x(t) ? 0 : t.tabIndex;
}, L = function(t, r) {
  var n = R(t);
  return n < 0 && r && !x(t) ? 0 : n;
}, P = function(t, r) {
  return t.tabIndex === r.tabIndex ? t.documentOrder - r.documentOrder : t.tabIndex - r.tabIndex;
}, F = function(t) {
  return t.tagName === "INPUT";
}, q = function(t) {
  return F(t) && t.type === "hidden";
}, W = function(t) {
  var r = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, $ = function(t, r) {
  for (var n = 0; n < t.length; n++)
    if (t[n].checked && t[n].form === r)
      return t[n];
}, G = function(t) {
  if (!t.name)
    return !0;
  var r = t.form || v(t), n = function(u) {
    return r.querySelectorAll('input[type="radio"][name="' + u + '"]');
  }, a;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    a = n(window.CSS.escape(t.name));
  else
    try {
      a = n(t.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var o = $(a, t.form);
  return !o || o === t;
}, U = function(t) {
  return F(t) && t.type === "radio";
}, j = function(t) {
  return U(t) && !G(t);
}, z = function(t) {
  var r, n = t && v(t), a = (r = n) === null || r === void 0 ? void 0 : r.host, o = !1;
  if (n && n !== t) {
    var i, u, s;
    for (o = !!((i = a) !== null && i !== void 0 && (u = i.ownerDocument) !== null && u !== void 0 && u.contains(a) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !o && a; ) {
      var l, d, c;
      n = v(a), a = (l = n) === null || l === void 0 ? void 0 : l.host, o = !!((d = a) !== null && d !== void 0 && (c = d.ownerDocument) !== null && c !== void 0 && c.contains(a));
    }
  }
  return o;
}, T = function(t) {
  var r = t.getBoundingClientRect(), n = r.width, a = r.height;
  return n === 0 && a === 0;
}, H = function(t, r) {
  var n = r.displayCheck, a = r.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var o = f.call(t, "details>summary:first-of-type"), i = o ? t.parentElement : t;
  if (f.call(i, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof a == "function") {
      for (var u = t; t; ) {
        var s = t.parentElement, l = v(t);
        if (s && !s.shadowRoot && a(s) === !0)
          return T(t);
        t.assignedSlot ? t = t.assignedSlot : !s && l !== t.ownerDocument ? t = l.host : t = s;
      }
      t = u;
    }
    if (z(t))
      return !t.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return T(t);
  return !1;
}, X = function(t) {
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
}, b = function(t, r) {
  return !(r.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  g(r) || q(r) || H(r, t) || // For a details element with a summary, the summary element gets the focus
  W(r) || X(r));
}, m = function(t, r) {
  return !(j(r) || R(r) < 0 || !b(t, r));
}, V = function(t) {
  var r = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, Y = function e(t) {
  var r = [], n = [];
  return t.forEach(function(a, o) {
    var i = !!a.scopeParent, u = i ? a.scopeParent : a, s = L(u, i), l = i ? e(a.candidates) : u;
    s === 0 ? i ? r.push.apply(r, l) : r.push(u) : n.push({
      documentOrder: o,
      tabIndex: s,
      item: a,
      isScope: i,
      content: l
    });
  }), n.sort(P).reduce(function(a, o) {
    return o.isScope ? a.push.apply(a, o.content) : a.push(o.content), a;
  }, []).concat(r);
}, Z = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = A([t], r.includeContainer, {
    filter: m.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: V
  }) : n = I(t, r.includeContainer, m.bind(null, r)), Y(n);
}, dt = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = A([t], r.includeContainer, {
    filter: b.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = I(t, r.includeContainer, b.bind(null, r)), n;
}, ht = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return f.call(t, h) === !1 ? !1 : m(r, t);
}, K = /* @__PURE__ */ C.concat("iframe").join(","), vt = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return f.call(t, K) === !1 ? !1 : b(r, t);
};
const J = {
  getShadowRoot: !0
};
function gt(e) {
  return e ? e.id = e.id || `${e.tagName.toLowerCase()}-${k()}` : "";
}
function bt(e) {
  return Array.isArray(e) ? e : Array.from(e);
}
function yt(e) {
  const t = S(
    e,
    `.${y.darkMode}, .${y.lightMode}, .${y.autoMode}`
  );
  return t?.classList.contains("calcite-mode-dark") || t?.classList.contains("calcite-mode-auto") && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function mt(e) {
  const t = "dir", r = `[${t}]`, n = S(e, r);
  return n ? n.getAttribute(t) : "ltr";
}
function pt(e) {
  return e ? parseFloat(getComputedStyle(e).inlineSize) : 0;
}
function p(e) {
  return e.getRootNode();
}
function St(e) {
  const t = p(e);
  return "host" in t ? t : null;
}
function wt(e, t) {
  if (!e)
    return 0;
  const n = document.createElement("canvas").getContext("2d");
  return n.font = t, n.measureText(e).width;
}
function D(e) {
  return e.host || null;
}
function Q(e, {
  selector: t,
  id: r
}) {
  if (!e)
    return null;
  e.assignedSlot && (e = e.assignedSlot);
  const n = p(e);
  return (r ? "getElementById" in n ? (
    /*
      Check to make sure 'getElementById' exists in cases where element is no longer connected to the DOM and getRootNode() returns the element.
      https://github.com/Esri/calcite-design-system/pull/4280
       */
    n.getElementById(r)
  ) : null : t ? n.querySelector(t) : null) || Q(D(n), { selector: t, id: r });
}
function S(e, t) {
  return e ? e.closest(t) || S(D(p(e)), t) : null;
}
function _(e) {
  return typeof e?.setFocus == "function";
}
async function tt(e) {
  if (e)
    return _(e) ? e.setFocus() : e.focus();
}
function et(e) {
  if (e)
    return Z(e, J)[0] ?? e;
}
function Tt(e) {
  et(e)?.focus();
}
function Et(e, t) {
  return Array.from(e.children).filter((r) => r.matches(t));
}
function rt(e, t) {
  return e.filter((r) => r.matches(t));
}
function Ct(e, t, r) {
  if (typeof t == "string" && t !== "")
    return t;
  if (t === "" || t === !0)
    return e[r];
}
function Nt(e, t) {
  return !(t.left > e.right || t.right < e.left || t.top > e.bottom || t.bottom < e.top);
}
function It(e) {
  return (!!e).toString();
}
function At(e) {
  return ot(e) || at(e);
}
function nt(e) {
  return it(e).filter((t) => t.nodeType === Node.TEXT_NODE).map((t) => t.textContent).join("").trim();
}
function xt(e) {
  for (const t of e.childNodes)
    if (t.nodeType === Node.TEXT_NODE && t.textContent?.trim() !== "" || t.nodeType === Node.ELEMENT_NODE)
      return !0;
  return !1;
}
function at(e) {
  return !!nt(e);
}
function it(e) {
  return e.currentTarget.assignedNodes({
    flatten: !0
  });
}
function ot(e) {
  return !!ut(e).length;
}
function ut(e, t) {
  return st(e.target, t);
}
function st(e, t) {
  const r = e.assignedElements({
    flatten: !0
  });
  return t ? rt(r, t) : r;
}
function Rt(e) {
  return !!(e.isPrimary && e.button === 0);
}
function Ft(e) {
  return e.detail === 0;
}
const Dt = (e, t, r, n = !0) => {
  const a = e.indexOf(t), o = a === 0, i = a === e.length - 1;
  n && (r = r === "previous" && o ? "last" : r === "next" && i ? "first" : r);
  let u;
  return r === "previous" ? u = e[a - 1] || e[n ? e.length - 1 : a] : r === "next" ? u = e[a + 1] || e[n ? 0 : a] : r === "last" ? u = e[e.length - 1] : u = e[0], tt(u), u;
};
function Ot(e, t) {
  if (e.parentNode !== t.parentNode)
    return !1;
  const r = Array.from(e.parentNode.children);
  return r.indexOf(e) < r.indexOf(t);
}
async function Mt(e, t) {
  return O(e, t, "animation");
}
async function kt(e, t) {
  return O(e, t, "transition");
}
function E(e, t, r) {
  const n = t === "transition" ? "transitionProperty" : "animationName";
  return e.getAnimations().find((a) => a[n] === r);
}
async function O(e, t, r) {
  let n = E(e, r, t);
  if (n || (await lt(), n = E(e, r, t)), !!n)
    try {
      await n.finished;
    } catch {
    }
}
function lt() {
  return new Promise((e) => requestAnimationFrame(() => e()));
}
function Bt(e) {
  switch (!0) {
    case e.endsWith("px"):
      return parseFloat(e);
    case e.endsWith("vw"):
      return window.innerWidth / 100 * parseFloat(e);
    case e.endsWith("vh"):
      return window.innerHeight / 100 * parseFloat(e);
    default:
      return 0;
  }
}
export {
  vt as A,
  J as B,
  p as C,
  Nt as D,
  gt as E,
  Ft as F,
  Et as G,
  st as H,
  St as I,
  tt as a,
  Dt as b,
  S as c,
  ut as d,
  Rt as e,
  Tt as f,
  mt as g,
  pt as h,
  Ot as i,
  wt as j,
  Bt as k,
  et as l,
  Ct as m,
  bt as n,
  xt as o,
  Mt as p,
  Q as q,
  yt as r,
  ot as s,
  It as t,
  At as u,
  Z as v,
  kt as w,
  dt as x,
  ht as y,
  R as z
};
