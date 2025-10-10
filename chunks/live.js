import { e as s, i as T, t, f as l, T as n, E as f, m as p } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = s(class extends T {
  constructor(e) {
    if (super(e), e.type !== t.PROPERTY && e.type !== t.ATTRIBUTE && e.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!l(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [r]) {
    if (r === n || r === f) return r;
    const i = e.element, o = e.name;
    if (e.type === t.PROPERTY) {
      if (r === i[o]) return n;
    } else if (e.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!r === i.hasAttribute(o)) return n;
    } else if (e.type === t.ATTRIBUTE && i.getAttribute(o) === r + "") return n;
    return p(e), r;
  }
});
export {
  E as l
};
