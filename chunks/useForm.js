/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as A } from "./index2.js";
import { y as T, U as q, V as w } from "./index.js";
import { A as S } from "./dom.js";
const E = ["date", "datetime-local", "month", "number", "range", "time", "week"], x = ["email", "password", "search", "tel", "text", "url"], L = ["email", "password", "search", "tel", "text", "textarea", "url"];
function v(a, e, i, s) {
  const r = i.toLowerCase(), n = a[i];
  s && n != null ? e.setAttribute(r, `${n}`) : e.removeAttribute(r);
}
function N(a, e, i) {
  i.type = a;
  const s = E.includes(a), r = e;
  v(r, i, "min", s), v(r, i, "max", s), v(r, i, "step", s);
  const n = L.includes(a), u = e;
  v(u, i, "minLength", n), v(u, i, "maxLength", n);
  const f = x.includes(a);
  v(u, i, "pattern", f);
}
function j(a) {
  const e = a === "textarea" ? "text" : a;
  return E.includes(e) || x.includes(e) || L.includes(e);
}
const U = ["text", "email", "search", "hidden", "tel", "url"], F = Object.freeze({ validity: {}, validationMessage: "" }), O = [
  "badInput",
  "customError",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing"
];
function R({
  component: a,
  input: e,
  value: i
}) {
  if (!Array.isArray(i)) {
    if (a && e.type === "radio") {
      const n = a.elementInternals.form?.elements.namedItem(a.name);
      if (n) {
        const f = ("length" in n ? Array.from(n) : [n]).filter(
          (l) => l.tagName === a.el.tagName
        ), I = f.some((l) => l.required), m = f.some((l) => l.checked), c = f.filter((l) => l !== a.el), o = I && !m;
        e.required = !!o;
        const b = M(e.validity), t = e.validationMessage;
        c?.length > 0 && c.forEach((l) => {
          o !== l.validity?.valueMissing && l.setValidity && l.setValidity(b, t);
        });
      }
    }
    return C(e, i) ? F : {
      validity: M(e.validity),
      validationMessage: e.validationMessage
    };
  }
  if (U.includes(e.type))
    return C(e, i.join(",")) ? F : {
      validity: M(e.validity),
      validationMessage: e.validationMessage
    };
  const s = {}, r = [];
  for (const n of i)
    C(e, n) || (Object.assign(s, M(e.validity)), e.validationMessage && r.push(e.validationMessage));
  return {
    validity: s,
    validationMessage: r.join("; ")
  };
}
function C(a, e) {
  if (a.type === "file") {
    a.value = "";
    const i = !e || e instanceof FileList && e.length === 0;
    return !a.required || !i;
  }
  return a.value = e == null ? "" : String(e), a.validity.valid;
}
function M(a) {
  const e = {};
  for (const i of O)
    a[i] && (e[i] = !0);
  return e;
}
const D = [
  "calcite-input",
  "calcite-input-number",
  "calcite-input-text",
  "calcite-text-area"
];
function P(a) {
  return `${q(w(a))}${D.includes(a) ? "Input" : "Change"}`;
}
function $(a) {
  return "form" in a && "name" in a && S(a);
}
function z(a, { status: e, message: i, icon: s }) {
  "status" in a && (a.status = e), "validationIcon" in a && typeof a.validationIcon != "string" && (a.validationIcon = s), "validationMessage" in a && !a.validationMessage && (a.validationMessage = i);
}
function k(a, e) {
  "status" in a && (a.status = "idle"), "validationIcon" in a && (!a.validationIcon || a.validationIcon === !0) && (a.validationIcon = !1), "validationMessage" in a && a.validationMessage === e && (a.validationMessage = "");
}
function G(a, e) {
  const { disabled: i, name: s, required: r } = a;
  e.disabled = i, e.name = s || "", e.required = !!r, y(a) ? e.checked = a.checked : H(a, e) && N(e.type, a, e);
}
function y(a) {
  return "checked" in a;
}
function H(a, e) {
  return a && j(e.type);
}
function K(a) {
  const e = Array.from(a.elements);
  requestAnimationFrame(() => {
    const i = e.filter(
      (s) => s.matches("[status=invalid]") && $(s)
    );
    for (const s of i)
      if (s.validationMessage) {
        s.setFocus();
        break;
      }
  });
}
const X = (a) => A((e, i) => {
  let s = "", r, n = null, u = a.inputType;
  u && (r = document.createElement("input"));
  function f(t) {
    if (t.defaultPrevented)
      return;
    t.preventDefault();
    const l = t.currentTarget;
    K(l);
  }
  function I() {
    "status" in e && (e.status = "idle"), "validationIcon" in e && (e.validationIcon = !1), "validationMessage" in e && (e.validationMessage = ""), y(e) && (e.checked = e.defaultChecked), e.value = e.defaultValue;
  }
  e.listen("luminaFormResetCallback", () => {
    I();
  }), e.listen("luminaFormAssociatedCallback", ({ detail: [t] }) => {
    t ? t.addEventListener("invalid", f, { capture: !0 }) : n?.removeEventListener("invalid", f, { capture: !0 }), n = t;
  });
  function m() {
    const t = s || r?.validationMessage || "";
    z(e, {
      message: t,
      icon: !0,
      status: "invalid"
    }), e.el.dispatchEvent(
      // allows users to set custom validation messages
      new CustomEvent("calciteInvalid", { bubbles: !0, composed: !0 })
    );
    const l = P(e.el.tagName.toLowerCase());
    e.listen(
      l,
      () => {
        if (k(e, t), r?.type === "radio") {
          const d = e.elementInternals.form?.elements.namedItem(e.name);
          if (d) {
            const V = ("length" in d ? Array.from(d) : [d]).filter(
              (g) => g.tagName === e.el.tagName
            ).filter((g) => g !== e.el);
            V?.length > 0 && V.forEach((g) => {
              k(g);
            });
          }
        }
      },
      { once: !0 }
    );
  }
  i.onConnected(() => {
    e.el.addEventListener("invalid", m);
  }), i.onDisconnected(() => {
    e.el.removeEventListener("invalid", m);
  }), i.onUpdate((t) => {
    e.hasUpdated || (e.defaultValue = e.value, y(e) && (e.defaultChecked = e.checked)), (t.has("name") || t.has("value") || y(e) && t.has("checked")) && e.elementInternals.setFormValue(b()), e.hasUpdated && c();
  }), i.onLoaded(() => c());
  function c() {
    const { disabled: t, elementInternals: l } = e;
    let d = {}, h = "";
    t || (r && (r.type = u, G(e, r), { validity: d, validationMessage: h } = R({ component: e, input: r, value: o() })), s && (d = { ...d, customError: !0 }, h = s)), l.setValidity(d, h), "validity" in e && T(() => {
      e.validity = l.validity;
    });
  }
  function o() {
    return a.getValue ? a.getValue() : e.value;
  }
  function b() {
    const t = o();
    if (Array.isArray(t) || t instanceof FileList) {
      const l = new FormData();
      for (const d of t)
        l.append(e.name, d);
      return l;
    }
    return y(e) ? e.checked ? t || "on" : null : t;
  }
  return {
    get active() {
      return !!e.elementInternals.form;
    },
    overrideDefaultValue: (t) => {
      e.defaultValue = t;
    },
    overrideInputType: (t) => {
      u = t, c();
    },
    requestSubmit: () => {
      e.elementInternals.form?.requestSubmit();
    },
    setCustomValidity: (t) => {
      s = t, c();
    }
  };
});
export {
  k as c,
  z as d,
  X as u
};
