import { e as s, i, E as n, m as o } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a = s(class extends i {
  constructor() {
    super(...arguments), this.key = n;
  }
  render(r, e) {
    return this.key = r, e;
  }
  update(r, [e, t]) {
    return e !== this.key && (o(r), this.key = e), t;
  }
});
export {
  a as i
};
