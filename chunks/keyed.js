import { a as t, b as i, E as n, m as a } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = t(class extends i {
  constructor() {
    super(...arguments), this.key = n;
  }
  render(r, e) {
    return this.key = r, e;
  }
  update(r, [e, s]) {
    return e !== this.key && (a(r), this.key = e), s;
  }
});
export {
  u as i
};
