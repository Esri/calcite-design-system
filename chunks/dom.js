/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
var N = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "area[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"], b = /* @__PURE__ */ N.join(","), x = typeof Element > "u", c = x ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, I = !x && Element.prototype.getRootNode ? function(e) {
  return e == null || e.getRootNode == null ? void 0 : e.getRootNode();
} : function(e) {
  return e?.ownerDocument;
}, h = function(t, r) {
  r === void 0 && (r = !0);
  var n = t == null || t.getAttribute == null ? void 0 : t.getAttribute("inert"), i = n === "" || n === "true", o = i || r && t && // closest does not exist on shadow roots, so we fall back to a manual
  // lookup upward, in case it is not defined.
  (typeof t.closest == "function" ? t.closest("[inert]") : h(t.parentNode));
  return o;
}, H = function(t) {
  var r, n = t == null || t.getAttribute == null || (r = t.getAttribute("contenteditable")) == null ? void 0 : r.toLowerCase();
  return n === "" || n === "true" || n === "plaintext-only";
}, R = function(t, r, n) {
  if (h(t))
    return [];
  var i = Array.prototype.slice.apply(t.querySelectorAll(b));
  return r && c.call(t, b) && i.unshift(t), i = i.filter(n), i;
}, g = function(t, r, n) {
  for (var i = [], o = Array.from(t); o.length; ) {
    var a = o.shift();
    if (!h(a, !1))
      if (a.tagName === "SLOT") {
        var s = a.assignedElements(), f = s.length ? s : a.children, u = g(f, !0, n);
        n.flatten ? i.push.apply(i, u) : i.push({
          scopeParent: a,
          candidates: u
        });
      } else {
        var y = c.call(a, b);
        y && n.filter(a) && (r || !t.includes(a)) && i.push(a);
        var l = a.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(a), d = !h(l, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
        if (l && d) {
          var T = g(l === !0 ? a.children : l.children, !0, n);
          n.flatten ? i.push.apply(i, T) : i.push({
            scopeParent: a,
            candidates: T
          });
        } else
          o.unshift.apply(o, a.children);
      }
  }
  return i;
}, A = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, F = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || H(t)) && !A(t) ? 0 : t.tabIndex;
}, L = function(t, r) {
  var n = F(t);
  return n < 0 && r && !A(t) ? 0 : n;
}, M = function(t, r) {
  return t.tabIndex === r.tabIndex ? t.documentOrder - r.documentOrder : t.tabIndex - r.tabIndex;
}, D = function(t) {
  return t.tagName === "INPUT";
}, q = function(t) {
  return D(t) && t.type === "hidden";
}, W = function(t) {
  var r = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, _ = function(t, r) {
  for (var n = 0; n < t.length; n++)
    if (t[n].checked && t[n].form === r)
      return t[n];
}, G = function(t) {
  if (!t.name)
    return !0;
  var r = t.form || I(t), n = function(s) {
    return r.querySelectorAll('input[type="radio"][name="' + s + '"]');
  }, i;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    i = n(window.CSS.escape(t.name));
  else
    try {
      i = n(t.name);
    } catch (a) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message), !1;
    }
  var o = _(i, t.form);
  return !o || o === t;
}, U = function(t) {
  return D(t) && t.type === "radio";
}, V = function(t) {
  return U(t) && !G(t);
}, w = function(t) {
  var r = t.getBoundingClientRect(), n = r.width, i = r.height;
  return n === 0 && i === 0;
}, $ = function(t, r) {
  var n = r.displayCheck, i = r.getShadowRoot;
  if (n === "full-native" && "checkVisibility" in t) {
    var o = t.checkVisibility({
      // Checking opacity might be desirable for some use cases, but natively,
      // opacity zero elements _are_ focusable and tabbable.
      checkOpacity: !1,
      opacityProperty: !1,
      contentVisibilityAuto: !0,
      visibilityProperty: !0,
      // This is an alias for `visibilityProperty`. Contemporary browsers
      // support both. However, this alias has wider browser support (Chrome
      // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
      // we include it anyway.
      checkVisibilityCSS: !0
    });
    return !o;
  }
  var a = getComputedStyle(t), s = a.visibility;
  if (s === "hidden" || s === "collapse")
    return !0;
  var f = c.call(t, "details>summary:first-of-type"), u = f ? t.parentElement : t;
  if (c.call(u, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || // full-native can run this branch when it falls through in case
  // Element#checkVisibility is unsupported
  n === "full-native" || n === "legacy-full") {
    if (typeof i == "function") {
      for (var y = t; t; ) {
        var l = t.parentElement, d = I(t);
        if (l && !l.shadowRoot && i(l) === !0)
          return w(t);
        t.assignedSlot ? t = t.assignedSlot : !l && d !== t.ownerDocument ? t = d.host : t = l;
      }
      t = y;
    }
    if (t.isConnected)
      return !t.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return w(t);
  return !1;
}, j = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var r = t.parentElement; r; ) {
      if (r.tagName === "FIELDSET" && r.disabled) {
        for (var n = 0; n < r.children.length; n++) {
          var i = r.children.item(n);
          if (i.tagName === "LEGEND")
            return c.call(r, "fieldset[disabled] *") ? !0 : !i.contains(t);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, v = function(t, r) {
  return !(r.disabled || q(r) || $(r, t) || // For a details element with a summary, the summary element gets the focus
  W(r) || j(r));
}, p = function(t, r) {
  return !(V(r) || F(r) < 0 || !v(t, r));
}, z = function(t) {
  var r = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, O = function(t) {
  var r = [], n = [];
  return t.forEach(function(i, o) {
    var a = !!i.scopeParent, s = a ? i.scopeParent : i, f = L(s, a), u = a ? O(i.candidates) : s;
    f === 0 ? a ? r.push.apply(r, u) : r.push(s) : n.push({
      documentOrder: o,
      tabIndex: f,
      item: i,
      isScope: a,
      content: u
    });
  }), n.sort(M).reduce(function(i, o) {
    return o.isScope ? i.push.apply(i, o.content) : i.push(o.content), i;
  }, []).concat(r);
}, X = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = g([t], r.includeContainer, {
    filter: p.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: z
  }) : n = R(t, r.includeContainer, p.bind(null, r)), O(n);
}, k = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = g([t], r.includeContainer, {
    filter: v.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = R(t, r.includeContainer, v.bind(null, r)), n;
}, bt = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return c.call(t, b) === !1 ? !1 : p(r, t);
}, K = /* @__PURE__ */ N.concat("iframe:not([inert]):not([inert] *)").join(","), ht = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return c.call(t, K) === !1 ? !1 : v(r, t);
};
const S = {
  getShadowRoot: !0
};
function gt(e) {
  return Array.isArray(e) ? e : Array.from(e);
}
function vt(e) {
  return e ? parseFloat(getComputedStyle(e).inlineSize) : 0;
}
function m(e) {
  return e.getRootNode();
}
function yt(e) {
  const t = m(e);
  return "host" in t ? t : null;
}
function pt(e, t, r) {
  if (!e)
    return 0;
  const i = document.createElement("canvas").getContext("2d");
  return i.font = t, i.letterSpacing = r || "normal", i.measureText(e).width;
}
function P(e) {
  return e.host || null;
}
function Z(e, {
  selector: t,
  id: r
}) {
  if (!e)
    return null;
  e.assignedSlot && (e = e.assignedSlot);
  const n = m(e), i = r ? "getElementById" in n ? (
    /*
      Check to make sure 'getElementById' exists in cases where element is no longer connected to the DOM and getRootNode() returns the element.
      https://github.com/Esri/calcite-design-system/pull/4280
       */
    n.getElementById(r)
  ) : null : t ? n.querySelector(t) : null;
  if (i)
    return i;
  const o = P(n);
  return o ? Z(o, { selector: t, id: r }) : null;
}
function J(e, t) {
  if (!e)
    return null;
  const r = e.closest(t);
  if (r)
    return r;
  const n = P(m(e));
  return n ? J(n, t) : null;
}
function Y(e) {
  return e instanceof HTMLElement || e instanceof SVGElement;
}
function St(e) {
  return e ? k(e, { ...S, includeContainer: !0 }).filter(Y) : [];
}
function Q(e) {
  return typeof e?.setFocus == "function";
}
async function tt(e, t = !1, r = "tabbable", n, i) {
  return e ? Q(e) && n !== e ? e.setFocus(i) : (r === "tabbable" ? rt : it)(e, t, i) : void 0;
}
function et(e, t) {
  if (e)
    return X(e, { ...S, includeContainer: t })[0] ?? e;
}
function rt(e, t, r) {
  et(e, t)?.focus(r);
}
function nt(e, t) {
  if (e)
    return k(e, { ...S, includeContainer: t })[0] ?? e;
}
function it(e, t, r) {
  nt(e, t)?.focus(r);
}
function mt(e, t) {
  return Array.from(e.children).filter((r) => r.matches(t));
}
function at(e, t) {
  return e.filter((r) => r.matches(t));
}
function Tt(e, t, r) {
  if (typeof t == "string" && t !== "")
    return t;
  if (t === "" || t === !0)
    return e[r];
}
function wt(e, t) {
  return !(t.left > e.right || t.right < e.left || t.top > e.bottom || t.bottom < e.top);
}
function Et(e, t) {
  return e.left <= t.right && t.left <= e.right;
}
function Ct(e) {
  return lt(e) || ut(e);
}
function ot(e) {
  return st(e).filter((t) => t.nodeType === Node.TEXT_NODE).map((t) => t.textContent).join("").trim();
}
function Nt(e) {
  for (const t of e.childNodes)
    if (t.nodeType === Node.TEXT_NODE && t.textContent?.trim() !== "" || t.nodeType === Node.ELEMENT_NODE)
      return !0;
  return !1;
}
function ut(e) {
  return !!ot(e);
}
function st(e) {
  return e.currentTarget.assignedNodes({
    flatten: !0
  });
}
function lt(e) {
  return !!ft(e).length;
}
function ft(e, t) {
  return ct(e.currentTarget, t);
}
function ct(e, t) {
  const r = e.assignedElements({
    flatten: !0
  });
  return t ? at(r, t) : r;
}
function xt(e) {
  return !!(e.isPrimary && e.button === 0);
}
function It(e) {
  return e.detail === 0;
}
const Rt = (e, t, r, n = !0, i = !0, o = !1) => {
  const a = e.indexOf(t), s = a === 0, f = a === e.length - 1;
  n && (r = r === "previous" && s ? "last" : r === "next" && f ? "first" : r);
  let u;
  return r === "previous" ? u = e[a - 1] || e[n ? e.length - 1 : a] : r === "next" ? u = e[a + 1] || e[n ? 0 : a] : r === "last" ? u = e[e.length - 1] : u = e[0], tt(u, i, "tabbable", o ? u : void 0), u;
};
function At(e, t) {
  if (!e.parentNode || !t.parentNode || e.parentNode !== t.parentNode)
    return !1;
  const r = Array.from(e.parentNode.children);
  return r.indexOf(e) < r.indexOf(t);
}
async function Ft(e, t) {
  return B(e, t, "animation");
}
async function Dt(e, t) {
  return B(e, t, "transition");
}
function E(e, t, r) {
  return e.getAnimations().find(
    (n) => t === "transition" ? "transitionProperty" in n && n.transitionProperty === r : "animationName" in n && n.animationName === r
  );
}
async function B(e, t, r) {
  let n = E(e, r, t);
  if (n || (await dt(), n = E(e, r, t)), !!n)
    try {
      await n.finished;
    } catch {
    }
}
async function dt() {
  await new Promise((e) => requestAnimationFrame(() => e()));
}
function Ot(e) {
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("vw") ? C(parseFloat(e), window.innerWidth) : e.endsWith("vh") ? C(parseFloat(e), window.innerHeight) : 0;
}
function C(e, t) {
  return e * t / 100;
}
function kt(e) {
  return e.assignedNodes({ flatten: !0 }).filter((t) => t.nodeType === Node.TEXT_NODE) ?? [];
}
export {
  Tt as A,
  Q as B,
  Ft as C,
  vt as D,
  pt as E,
  wt as F,
  mt as G,
  kt as H,
  ot as I,
  Y as J,
  dt as K,
  Et as L,
  m as a,
  ct as b,
  J as c,
  ft as d,
  ut as e,
  tt as f,
  St as g,
  Rt as h,
  At as i,
  xt as j,
  Ot as k,
  k as l,
  bt as m,
  gt as n,
  F as o,
  ht as p,
  Z as q,
  S as r,
  lt as s,
  X as t,
  yt as u,
  It as v,
  Dt as w,
  Ct as x,
  et as y,
  Nt as z
};
