import { a as s, b as T, t, f as l, T as n, E as a, m as f } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = s(class extends T {
  constructor(e) {
    if (super(e), e.type !== t.PROPERTY && e.type !== t.ATTRIBUTE && e.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!l(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [r]) {
    if (r === n || r === a) return r;
    const i = e.element, o = e.name;
    if (e.type === t.PROPERTY) {
      if (r === i[o]) return n;
    } else if (e.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!r === i.hasAttribute(o)) return n;
    } else if (e.type === t.ATTRIBUTE && i.getAttribute(o) === r + "") return n;
    return f(e), r;
  }
});
export {
  u as l
};
