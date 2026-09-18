/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as A } from "./index2.js";
import { H as T } from "./dom.js";
import { O as w } from "./index.js";
const q = (a) => (
  //#endregion kebabToPascal
  a.split("-").map(S).join("")
), S = (a) => (
  //#endregion capitalize
  a.charAt(0).toUpperCase() + a.slice(1)
), j = (a) => (
  //#endregion uncapitalize
  a.charAt(0).toLowerCase() + a.slice(1)
), E = ["date", "datetime-local", "month", "number", "range", "time", "week"], x = ["email", "password", "search", "tel", "text", "url"], L = ["email", "password", "search", "tel", "text", "textarea", "url"];
function o(a, e, i, s) {
  const r = i.toLowerCase(), n = a[i];
  s && n != null ? e.setAttribute(r, `${n}`) : e.removeAttribute(r);
}
function N(a, e, i) {
  i.type = a;
  const s = E.includes(a), r = e;
  o(r, i, "min", s), o(r, i, "max", s), o(r, i, "step", s);
  const n = L.includes(a), u = e;
  o(u, i, "minLength", n), o(u, i, "maxLength", n);
  const f = x.includes(a);
  o(u, i, "pattern", f);
}
function O(a) {
  const e = a === "textarea" ? "text" : a;
  return E.includes(e) || x.includes(e) || L.includes(e);
}
const U = ["text", "email", "search", "hidden", "tel", "url"], F = Object.freeze({ validity: {}, validationMessage: "" }), R = [
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
function z({
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
        ), I = f.some((l) => l.required), m = f.some((l) => l.checked), c = f.filter((l) => l !== a.el), v = I && !m;
        e.required = !!v;
        const C = M(e.validity), t = e.validationMessage;
        c?.length > 0 && c.forEach((l) => {
          v !== l.validity?.valueMissing && l.setValidity && l.setValidity(C, t);
        });
      }
    }
    return b(e, i) ? F : {
      validity: M(e.validity),
      validationMessage: e.validationMessage
    };
  }
  if (U.includes(e.type))
    return b(e, i.join(",")) ? F : {
      validity: M(e.validity),
      validationMessage: e.validationMessage
    };
  const s = {}, r = [];
  for (const n of i)
    b(e, n) || (Object.assign(s, M(e.validity)), e.validationMessage && r.push(e.validationMessage));
  return {
    validity: s,
    validationMessage: r.join("; ")
  };
}
function b(a, e) {
  if (a.type === "file") {
    a.value = "";
    const i = !e || e instanceof FileList && e.length === 0;
    return !a.required || !i;
  }
  return a.value = e == null ? "" : String(e), a.validity.valid;
}
function M(a) {
  const e = {};
  for (const i of R)
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
  return `${j(q(a))}${D.includes(a) ? "Input" : "Change"}`;
}
function $(a) {
  return "form" in a && "name" in a && T(a);
}
function H(a, { status: e, message: i, icon: s }) {
  "status" in a && (a.status = e), "validationIcon" in a && typeof a.validationIcon != "string" && (a.validationIcon = s), "validationMessage" in a && !a.validationMessage && (a.validationMessage = i);
}
function k(a, e) {
  "status" in a && (a.status = "idle"), "validationIcon" in a && (!a.validationIcon || a.validationIcon === !0) && (a.validationIcon = !1), "validationMessage" in a && a.validationMessage === e && (a.validationMessage = "");
}
function G(a, e) {
  const { disabled: i, name: s, required: r } = a;
  e.disabled = i, e.name = s || "", e.required = !!r, y(a) ? e.checked = a.checked : K(a, e) && N(e.type, a, e);
}
function y(a) {
  return "checked" in a;
}
function K(a, e) {
  return a && O(e.type);
}
function W(a) {
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
const Y = (a) => A((e, i) => {
  let s = "", r, n = null, u = a.inputType;
  u && (r = document.createElement("input"));
  function f(t) {
    if (t.defaultPrevented)
      return;
    t.preventDefault();
    const l = t.currentTarget;
    W(l);
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
    H(e, {
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
    e.hasUpdated || (e.defaultValue = e.value, y(e) && (e.defaultChecked = e.checked)), (t.has("name") || t.has("value") || y(e) && t.has("checked")) && e.elementInternals.setFormValue(C()), e.hasUpdated && c();
  }), i.onLoaded(() => c());
  function c() {
    const { disabled: t, elementInternals: l } = e;
    let d = {}, h = "";
    t || (r && (r.type = u, G(e, r), { validity: d, validationMessage: h } = z({ component: e, input: r, value: v() })), s && (d = { ...d, customError: !0 }, h = s)), l.setValidity(d, h), "validity" in e && w(() => {
      e.validity = l.validity;
    });
  }
  function v() {
    return a.getValue ? a.getValue() : e.value;
  }
  function C() {
    const t = v();
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
  H as d,
  Y as u
};
