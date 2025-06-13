import { a as M, L as R, d as g, h as V, E as x, x as v, s as _, c as k } from "./iframe.js";
import { n as U } from "./ref.js";
import { c as D } from "./repeat.js";
import { i as N } from "./keyed.js";
import { c as G, d as H } from "./label.js";
import { u as q, I as W } from "./interactive.js";
import { c as j } from "./component.js";
import { c as A, a as K, d as J, H as Q } from "./form.js";
import { u as X } from "./useT9n.js";
import { b as Y } from "./locale.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const ee = {
  offset: "offset"
}, te = 60;
function $(t) {
  return t.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75").replace("−", "-");
}
function oe(t, e) {
  const o = w(t, "en-US", e).replace("GMT", "");
  return o === "" ? 0 : Number($(o)) * te;
}
function se() {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset() * -1;
}
function ae() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
async function ie(t) {
  if (t === "offset")
    return (o) => o;
  const { normalize: e } = await import("./time-zones.js");
  return e;
}
async function ne(t, e, o, s, a) {
  if (o === "name") {
    const { groupByName: i } = await import("./index5.js");
    return (await i()).map(({ label: n }) => ({
      label: n,
      value: n,
      metadata: {
        filterValue: n
      }
    })).filter((n) => !!n).sort();
  }
  const r = a === "user" ? t : (
    // we use locales that will always yield a short offset that matches `standardTime`
    a === "utc" ? "fr" : "en-GB"
  ), u = s.getTime();
  if (o === "region") {
    const [{ groupByRegion: i }, { getCountry: c, global: n }] = await Promise.all([
      import("./index6.js"),
      import("./region.js")
    ]);
    return (await i()).map(({ label: m, tzs: f }) => (f.sort((h, d) => {
      const T = I(h, e), C = I(d, e), p = "Etc/GMT";
      if (h.startsWith(p) && d.startsWith(p)) {
        const b = h.substring(p.length), F = d.substring(p.length), z = b === "" ? 0 : parseInt(b);
        return (F === "" ? 0 : parseInt(F)) - z;
      }
      return T.localeCompare(C);
    }), {
      label: O(e, m),
      items: f.map((h) => {
        const d = $(
          w(h, r, u)
        ), T = I(h, e), C = m === n ? (
          // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
          // in addition to the label we also add "Global" and "Etc" to allow searching for these items
          `${I(n, e)} Etc`
        ) : B(h), p = c(h), b = O(e, p);
        return {
          label: T,
          value: h,
          metadata: {
            country: b === T ? void 0 : b,
            filterValue: C,
            offset: d
          }
        };
      })
    })).sort(
      (m, f) => m.label === n ? -1 : f.label === n ? 1 : m.label.localeCompare(f.label)
    );
  }
  const [{ groupByOffset: y }, { DateEngine: Z }] = await Promise.all([
    import("./index7.js"),
    import("./index8.js")
  ]), L = await y({
    dateEngine: new Z(),
    groupDateRange: 1,
    startDate: new Date(u).toISOString()
  }), P = new Intl.ListFormat(t, { style: "long", type: "conjunction" }), S = ["Factory", "Etc/UTC"];
  return L.forEach((i) => {
    const c = [];
    let n = 0;
    i.tzs.forEach((l, m) => {
      S.includes(l) && n++, c[m] = n;
    }), i.tzs = i.tzs.filter((l) => !S.includes(l)), i.labelTzIdx = i.labelTzIdx.map((l) => l - c[l]).filter((l) => l >= 0 && l < i.tzs.length);
  }), L.map(({ labelTzIdx: i, tzs: c }) => {
    const n = c[0], l = $(
      w(n, r, u)
    ), m = oe(n, u), f = i.map((d) => I(c[d], e));
    return {
      label: ce(e, l, P.format(f)),
      value: m,
      metadata: {
        filterValue: c.map((d) => B(d))
      }
    };
  }).filter((i) => !!i).sort((i, c) => i.value - c.value);
}
function I(t, e) {
  return e[t] || re(t);
}
function le(t, e, o) {
  return o.timeZoneRegionLabel.replace("{city}", t).replace("{country}", O(o, e));
}
function O(t, e) {
  return t[e] || e;
}
function re(t) {
  return t.split("/").pop();
}
function B(t) {
  return t.replace(/_/g, " ");
}
function ce(t, e, o) {
  return t.timeZoneLabel.replace("{offset}", e).replace("{cities}", o);
}
function w(t, e, o = Date.now()) {
  return t === "Factory" && (t = "Etc/GMT"), Y(e, { timeZone: t, timeZoneName: "shortOffset" }).formatToParts(o).find(({ type: r }) => r === "timeZoneName").value;
}
function me(t) {
  return t[0].items !== void 0;
}
function he(t) {
  return me(t) ? t.flatMap((e) => e.items) : t;
}
function E(t, e, o) {
  return o == null ? null : he(t).find(
    (s) => (
      // intentional == to match string to number
      s[e] == o
    )
  );
}
const de = M`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}`;
class ue extends R {
  constructor() {
    super(...arguments), this.messages = X({ blocking: !0 }), this.clearable = !1, this.disabled = !1, this.maxItems = 0, this.mode = "offset", this.offsetStyle = "user", this.open = !1, this.overlayPositioning = "absolute", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.calciteInputTimeZoneBeforeClose = g({ cancelable: !1 }), this.calciteInputTimeZoneBeforeOpen = g({ cancelable: !1 }), this.calciteInputTimeZoneChange = g({ cancelable: !1 }), this.calciteInputTimeZoneClose = g({ cancelable: !1 }), this.calciteInputTimeZoneOpen = g({ cancelable: !1 });
  }
  static {
    this.properties = { clearable: 7, disabled: 7, form: 3, maxItems: 11, messageOverrides: 0, mode: 3, name: 3, offsetStyle: 3, open: 7, overlayPositioning: 3, readOnly: 7, referenceDate: 1, required: 7, scale: 3, status: 3, validationIcon: [3, { converter: V }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = de;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value = e;
  }
  async setFocus() {
    await j(this), await this.comboboxEl.setFocus();
  }
  connectedCallback() {
    super.connectedCallback(), A(this), G(this);
  }
  async load() {
    this.normalizer = await ie(this.mode), await this.updateTimeZoneItems();
    const e = this.value, o = this.normalizeValue(e);
    this.value = o || (e === "" ? o : void 0), this.updateTimeZoneSelection();
    const s = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : "";
    K(this, s), this.value = s;
  }
  willUpdate(e) {
    e.has("value") && this.hasUpdated && this.handleValueChange(this.value, e.get("value")), (e.has("messages") || e.has("mode") && (this.hasUpdated || this.mode !== "offset") || e.has("referenceDate")) && this.handleTimeZoneItemPropsChange(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openChanged();
  }
  updated() {
    q(this);
  }
  loaded() {
    this.openChanged();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), J(this), H(this);
  }
  async handleTimeZoneItemPropsChange() {
    !this.timeZoneItems || !this.hasUpdated || (await this.updateTimeZoneItems(), this.updateTimeZoneSelection());
  }
  openChanged() {
    this.comboboxEl && (this.comboboxEl.open = this.open);
  }
  async handleValueChange(e, o) {
    const s = this.normalizeValue(e);
    if (!s) {
      if (this.clearable) {
        this._value = s, this.selectedTimeZoneItem = null;
        return;
      }
      this._value = o, this.selectedTimeZoneItem = this.findTimeZoneItem(o);
      return;
    }
    const a = this.findTimeZoneItem(s);
    if (!a) {
      this._value = o;
      return;
    }
    this._value = s, this.selectedTimeZoneItem = a;
  }
  onLabelClick() {
    this.setFocus();
  }
  setComboboxRef(e) {
    this.comboboxEl = e;
  }
  overrideSelectedLabelForRegion() {
    this.mode !== "region" || !this.selectedTimeZoneItem || (this.comboboxEl.selectedItems[0].textLabel = this.getItemLabel(this.selectedTimeZoneItem));
  }
  onComboboxBeforeClose(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(), this.calciteInputTimeZoneBeforeClose.emit();
  }
  onComboboxBeforeOpen(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(), this.calciteInputTimeZoneBeforeOpen.emit();
  }
  onComboboxChange(e) {
    e.stopPropagation();
    const s = e.target.selectedItems[0];
    if (!s) {
      this._value = "", this.selectedTimeZoneItem = null, this.calciteInputTimeZoneChange.emit();
      return;
    }
    const a = this.findTimeZoneItemByLabel(s.getAttribute("data-label")), r = `${a.value}`;
    this.value === r && a.label === this.selectedTimeZoneItem.label || (this._value = r, this.selectedTimeZoneItem = a, this.calciteInputTimeZoneChange.emit());
  }
  onComboboxClose(e) {
    e.stopPropagation(), this.open = !1, this.calciteInputTimeZoneClose.emit();
  }
  onComboboxOpen(e) {
    this.open = !0, e.stopPropagation(), this.calciteInputTimeZoneOpen.emit();
  }
  findTimeZoneItem(e) {
    return E(this.timeZoneItems, "value", e);
  }
  findTimeZoneItemByLabel(e) {
    return E(this.timeZoneItems, "label", e);
  }
  async updateTimeZoneItems() {
    this.timeZoneItems = await this.createTimeZoneItems();
  }
  updateTimeZoneSelection() {
    if (this.value === "" && this.clearable) {
      this.selectedTimeZoneItem = null;
      return;
    }
    const e = this.mode === "offset" ? se() : ae(), o = this.value === "" || !this.value ? e : this.value;
    this.selectedTimeZoneItem = this.findTimeZoneItem(o) || this.findTimeZoneItem(e);
  }
  async createTimeZoneItems() {
    return !this.messages._lang || !this.messages ? [] : ne(this.messages._lang, this.messages, this.mode, this.referenceDate instanceof Date ? this.referenceDate : new Date(this.referenceDate ?? Date.now()), this.offsetStyle);
  }
  normalizeValue(e) {
    return e = e === void 0 ? "" : e, e && this.normalizer(e);
  }
  getItemLabel(e) {
    const o = this.selectedTimeZoneItem === e, { label: s, metadata: a } = e;
    return !this.open && e.metadata.country && o ? le(s, a.country, this.messages) : s;
  }
  render() {
    return W({ disabled: this.disabled, children: v`<calcite-combobox .clearDisabled=${!this.clearable} .disabled=${this.disabled} .label=${this.messages.chooseTimeZone} lang=${this.messages._lang ?? x} .maxItems=${this.maxItems} @calciteComboboxBeforeClose=${this.onComboboxBeforeClose} @calciteComboboxBeforeOpen=${this.onComboboxBeforeOpen} @calciteComboboxChange=${this.onComboboxChange} @calciteComboboxClose=${this.onComboboxClose} @calciteComboboxOpen=${this.onComboboxOpen} .overlayPositioning=${this.overlayPositioning} .placeholder=${this.mode === "name" ? this.messages.namePlaceholder : this.mode === "offset" ? this.messages.offsetPlaceholder : this.messages.regionPlaceholder} placeholder-icon=search .readOnly=${this.readOnly} .scale=${this.scale} .selectionMode=${this.clearable ? "single" : "single-persist"} .status=${this.status} .validationIcon=${this.validationIcon} .validationMessage=${this.validationMessage} ${U(this.setComboboxRef)}>${this.renderItems()}</calcite-combobox>${Q({ component: this })}` });
  }
  renderItems() {
    return this.mode === "region" ? this.renderRegionItems() : D(this.timeZoneItems, ({ label: e }) => e, (e) => {
      const o = this.selectedTimeZoneItem === e, { label: s, metadata: a, value: r } = e;
      return v`<calcite-combobox-item data-label=${s ?? x} .metadata=${a} .selected=${o} .textLabel=${s} .value=${r}></calcite-combobox-item>`;
    });
  }
  renderRegionItems() {
    return this.timeZoneItems.flatMap(({ label: e, items: o }) => N(e, v`<calcite-combobox-item-group .label=${e}>${D(o, ({ label: s }) => s, (s) => {
      const a = this.selectedTimeZoneItem === s, { label: r, metadata: u, value: y } = s, Z = this.getItemLabel(s);
      return v`<calcite-combobox-item data-label=${r ?? x} .description=${u.country} .metadata=${u} .selected=${a} .textLabel=${Z} .value=${y}><span class=${_(ee.offset)} slot=content-end>${u.offset}</span></calcite-combobox-item>`;
    })}</calcite-combobox-item-group>`));
  }
}
k("calcite-input-time-zone", ue);
export {
  ue as InputTimeZone
};
