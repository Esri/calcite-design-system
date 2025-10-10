import { i as $, f as a, t as f, e as _, E as l } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const h = (t, s) => {
  const e = t._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(s, !1), h(i, s);
  return !0;
}, o = (t) => {
  let s, e;
  do {
    if ((s = t._$AM) === void 0) break;
    e = s._$AN, e.delete(t), t = s;
  } while (e?.size === 0);
}, d = (t) => {
  for (let s; s = t._$AM; t = s) {
    let e = s._$AN;
    if (e === void 0) s._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(t)) break;
    e.add(t), v(s);
  }
};
function A(t) {
  this._$AN !== void 0 ? (o(this), this._$AM = t, d(this)) : this._$AM = t;
}
function u(t, s = !1, e = 0) {
  const i = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (s) if (Array.isArray(i)) for (let n = e; n < i.length; n++) h(i[n], !1), o(i[n]);
  else i != null && (h(i, !1), o(i));
  else h(this, t);
}
const v = (t) => {
  t.type == f.CHILD && (t._$AP ??= u, t._$AQ ??= A);
};
class G extends $ {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(s, e, i) {
    super._$AT(s, e, i), d(this), this.isConnected = s._$AU;
  }
  _$AO(s, e = !0) {
    s !== this.isConnected && (this.isConnected = s, s ? this.reconnected?.() : this.disconnected?.()), e && (h(this, s), o(this));
  }
  setValue(s) {
    if (a(this._$Ct)) this._$Ct._$AI(s, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = s, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g = () => new p();
class p {
}
const c = /* @__PURE__ */ new WeakMap(), N = _(class extends G {
  render(t) {
    return l;
  }
  update(t, [s]) {
    const e = s !== this.G;
    return e && this.G !== void 0 && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = s, this.ht = t.options?.host, this.rt(this.ct = t.element)), l;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), typeof this.G == "function") {
      const s = this.ht ?? globalThis;
      let e = c.get(s);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), c.set(s, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, t), t !== void 0 && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    return typeof this.G == "function" ? c.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
export {
  g as e,
  N as n
};
