import { e as s, a as i, E as n, m as o } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
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
