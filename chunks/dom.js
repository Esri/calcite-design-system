/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
var N = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "area[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"], b = /* @__PURE__ */ N.join(","), x = typeof Element > "u", d = x ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, v = !x && Element.prototype.getRootNode ? function(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
} : function(e) {
  return e?.ownerDocument;
}, g = function(t, r) {
  var n;
  r === void 0 && (r = !0);
  var i = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), o = i === "" || i === "true", a = o || r && t && // closest does not exist on shadow roots, so we fall back to a manual
  // lookup upward, in case it is not defined.
  (typeof t.closest == "function" ? t.closest("[inert]") : g(t.parentNode));
  return a;
}, M = function(t) {
  var r, n = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "contenteditable");
  return n === "" || n === "true";
}, I = function(t, r, n) {
  if (g(t))
    return [];
  var i = Array.prototype.slice.apply(t.querySelectorAll(b));
  return r && d.call(t, b) && i.unshift(t), i = i.filter(n), i;
}, y = function(t, r, n) {
  for (var i = [], o = Array.from(t); o.length; ) {
    var a = o.shift();
    if (!g(a, !1))
      if (a.tagName === "SLOT") {
        var s = a.assignedElements(), c = s.length ? s : a.children, u = y(c, !0, n);
        n.flatten ? i.push.apply(i, u) : i.push({
          scopeParent: a,
          candidates: u
        });
      } else {
        var f = d.call(a, b);
        f && n.filter(a) && (r || !t.includes(a)) && i.push(a);
        var l = a.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(a), h = !g(l, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
        if (l && h) {
          var w = y(l === !0 ? a.children : l.children, !0, n);
          n.flatten ? i.push.apply(i, w) : i.push({
            scopeParent: a,
            candidates: w
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
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || M(t)) && !A(t) ? 0 : t.tabIndex;
}, B = function(t, r) {
  var n = F(t);
  return n < 0 && r && !A(t) ? 0 : n;
}, q = function(t, r) {
  return t.tabIndex === r.tabIndex ? t.documentOrder - r.documentOrder : t.tabIndex - r.tabIndex;
}, R = function(t) {
  return t.tagName === "INPUT";
}, L = function(t) {
  return R(t) && t.type === "hidden";
}, W = function(t) {
  var r = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, G = function(t, r) {
  for (var n = 0; n < t.length; n++)
    if (t[n].checked && t[n].form === r)
      return t[n];
}, U = function(t) {
  if (!t.name)
    return !0;
  var r = t.form || v(t), n = function(s) {
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
  var o = G(i, t.form);
  return !o || o === t;
}, j = function(t) {
  return R(t) && t.type === "radio";
}, V = function(t) {
  return j(t) && !U(t);
}, z = function(t) {
  var r, n = t && v(t), i = (r = n) === null || r === void 0 ? void 0 : r.host, o = !1;
  if (n && n !== t) {
    var a, s, c;
    for (o = !!((a = i) !== null && a !== void 0 && (s = a.ownerDocument) !== null && s !== void 0 && s.contains(i) || t != null && (c = t.ownerDocument) !== null && c !== void 0 && c.contains(t)); !o && i; ) {
      var u, f, l;
      n = v(i), i = (u = n) === null || u === void 0 ? void 0 : u.host, o = !!((f = i) !== null && f !== void 0 && (l = f.ownerDocument) !== null && l !== void 0 && l.contains(i));
    }
  }
  return o;
}, T = function(t) {
  var r = t.getBoundingClientRect(), n = r.width, i = r.height;
  return n === 0 && i === 0;
}, H = function(t, r) {
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
  var c = d.call(t, "details>summary:first-of-type"), u = c ? t.parentElement : t;
  if (d.call(u, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || // full-native can run this branch when it falls through in case
  // Element#checkVisibility is unsupported
  n === "full-native" || n === "legacy-full") {
    if (typeof i == "function") {
      for (var f = t; t; ) {
        var l = t.parentElement, h = v(t);
        if (l && !l.shadowRoot && i(l) === !0)
          return T(t);
        t.assignedSlot ? t = t.assignedSlot : !l && h !== t.ownerDocument ? t = h.host : t = l;
      }
      t = f;
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
          var i = r.children.item(n);
          if (i.tagName === "LEGEND")
            return d.call(r, "fieldset[disabled] *") ? !0 : !i.contains(t);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, p = function(t, r) {
  return !(r.disabled || L(r) || H(r, t) || // For a details element with a summary, the summary element gets the focus
  W(r) || X(r));
}, S = function(t, r) {
  return !(V(r) || F(r) < 0 || !p(t, r));
}, Z = function(t) {
  var r = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, D = function(t) {
  var r = [], n = [];
  return t.forEach(function(i, o) {
    var a = !!i.scopeParent, s = a ? i.scopeParent : i, c = B(s, a), u = a ? D(i.candidates) : s;
    c === 0 ? a ? r.push.apply(r, u) : r.push(s) : n.push({
      documentOrder: o,
      tabIndex: c,
      item: i,
      isScope: a,
      content: u
    });
  }), n.sort(q).reduce(function(i, o) {
    return o.isScope ? i.push.apply(i, o.content) : i.push(o.content), i;
  }, []).concat(r);
}, K = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = y([t], r.includeContainer, {
    filter: S.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: Z
  }) : n = I(t, r.includeContainer, S.bind(null, r)), D(n);
}, Y = function(t, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = y([t], r.includeContainer, {
    filter: p.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = I(t, r.includeContainer, p.bind(null, r)), n;
}, ht = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return d.call(t, b) === !1 ? !1 : S(r, t);
}, $ = /* @__PURE__ */ N.concat("iframe:not([inert]):not([inert] *)").join(","), bt = function(t, r) {
  if (r = r || {}, !t)
    throw new Error("No node provided");
  return d.call(t, $) === !1 ? !1 : p(r, t);
};
const O = {
  getShadowRoot: !0
};
function vt(e) {
  return Array.isArray(e) ? e : Array.from(e);
}
function gt(e) {
  const t = window.getComputedStyle(e).colorScheme.split(" "), r = t.includes("dark"), n = t.includes("light");
  return r !== n ? r ? "dark" : "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function yt(e) {
  return e ? parseFloat(getComputedStyle(e).inlineSize) : 0;
}
function m(e) {
  return e.getRootNode();
}
function pt(e) {
  const t = m(e);
  return "host" in t ? t : null;
}
function St(e, t) {
  if (!e)
    return 0;
  const n = document.createElement("canvas").getContext("2d");
  return n.font = t, n.measureText(e).width;
}
function k(e) {
  return e.host || null;
}
function J(e, {
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
  const o = k(n);
  return o ? J(o, { selector: t, id: r }) : null;
}
function Q(e, t) {
  if (!e)
    return null;
  const r = e.closest(t);
  if (r)
    return r;
  const n = k(m(e));
  return n ? Q(n, t) : null;
}
function _(e) {
  return typeof e?.setFocus == "function";
}
async function tt(e, t = !1, r = "tabbable", n, i) {
  return e ? _(e) && n !== e ? e.setFocus(i) : (r === "tabbable" ? rt : it)(e, t, i) : void 0;
}
function et(e, t) {
  if (e)
    return K(e, { ...O, includeContainer: t })[0] ?? e;
}
function rt(e, t, r) {
  et(e, t)?.focus(r);
}
function nt(e, t) {
  if (e)
    return Y(e, { ...O, includeContainer: t })[0] ?? e;
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
function wt(e, t, r) {
  if (typeof t == "string" && t !== "")
    return t;
  if (t === "" || t === !0)
    return e[r];
}
function Tt(e, t) {
  return !(t.left > e.right || t.right < e.left || t.top > e.bottom || t.bottom < e.top);
}
function Ct(e) {
  return lt(e) || ut(e);
}
function ot(e) {
  return st(e).filter((t) => t.nodeType === Node.TEXT_NODE).map((t) => t.textContent).join("").trim();
}
function Et(e) {
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
  return !!ct(e).length;
}
function ct(e, t) {
  return ft(e.currentTarget, t);
}
function ft(e, t) {
  const r = e.assignedElements({
    flatten: !0
  });
  return t ? at(r, t) : r;
}
function Nt(e) {
  return !!(e.isPrimary && e.button === 0);
}
function xt(e) {
  return e.detail === 0;
}
const It = (e, t, r, n = !0, i = !0, o = !1) => {
  const a = e.indexOf(t), s = a === 0, c = a === e.length - 1;
  n && (r = r === "previous" && s ? "last" : r === "next" && c ? "first" : r);
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
  return P(e, t, "animation");
}
async function Rt(e, t) {
  return P(e, t, "transition");
}
function C(e, t, r) {
  return e.getAnimations().find(
    (n) => t === "transition" ? "transitionProperty" in n && n.transitionProperty === r : "animationName" in n && n.animationName === r
  );
}
async function P(e, t, r) {
  let n = C(e, r, t);
  if (n || (await dt(), n = C(e, r, t)), !!n)
    try {
      await n.finished;
    } catch {
    }
}
async function dt() {
  await new Promise((e) => requestAnimationFrame(() => e()));
}
function Dt(e) {
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("vw") ? E(parseFloat(e), window.innerWidth) : e.endsWith("vh") ? E(parseFloat(e), window.innerHeight) : 0;
}
function E(e, t) {
  return e * t / 100;
}
export {
  Ft as A,
  gt as B,
  yt as C,
  St as D,
  dt as E,
  Tt as F,
  mt as G,
  _ as H,
  ft as a,
  It as b,
  Q as c,
  ct as d,
  Nt as e,
  tt as f,
  m as g,
  Dt as h,
  At as i,
  Y as j,
  ht as k,
  F as l,
  bt as m,
  vt as n,
  O as o,
  pt as p,
  J as q,
  xt as r,
  lt as s,
  K as t,
  Ct as u,
  et as v,
  Rt as w,
  ut as x,
  Et as y,
  wt as z
};
