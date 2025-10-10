/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = ["date", "datetime-local", "month", "number", "range", "time", "week"], x = ["email", "password", "search", "tel", "text", "url"], u = ["email", "password", "search", "tel", "text", "textarea", "url"];
function a(e, n, t, c) {
  const s = t.toLowerCase(), i = e[t];
  c && i != null ? n.setAttribute(s, `${i}`) : n.removeAttribute(s);
}
function m(e, n, t) {
  t.type = e === "textarea" ? "text" : e;
  const c = r.includes(e), s = n;
  a(s, t, "min", c), a(s, t, "max", c), a(s, t, "step", c);
  const i = u.includes(e), o = n;
  a(o, t, "minLength", i), a(o, t, "maxLength", i);
  const l = x.includes(e);
  a(o, t, "pattern", l);
}
export {
  m as s
};
