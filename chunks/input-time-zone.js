import { b as R, L as E, c as g, u as V, E as x, x as v, s as _, q as k } from "./index.js";
import { c as D } from "./repeat.js";
import { i as U } from "./keyed.js";
import { e as N, n as q } from "./ref.js";
import { c as G, d as H } from "./label.js";
import { u as W, I as j } from "./interactive.js";
import { c as A, a as K, d as J, H as Q } from "./form.js";
import { u as X } from "./useT9n.js";
import { S as Y } from "./resources2.js";
import { u as ee } from "./useSetFocus.js";
import { b as te } from "./locale.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const oe = {
  offset: "offset"
}, se = {
  labelContent: "label-content"
}, ae = 60;
function $(t) {
  return t.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75").replace("−", "-");
}
function ie(t, e) {
  const o = S(t, "en-US", e).replace("GMT", "");
  return o === "" ? 0 : Number($(o)) * ae;
}
function ne() {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset() * -1;
}
function le() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
async function re(t) {
  if (t === "offset")
    return (o) => o;
  const { normalize: e } = await import("./time-zones.js");
  return e;
}
async function ce(t, e, o, s, a) {
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
  const l = a === "user" ? t : (
    // we use locales that will always yield a short offset that matches `standardTime`
    a === "utc" ? "fr" : "en-GB"
  ), u = s.getTime();
  if (o === "region") {
    const [{ groupByRegion: i }, { getCountry: c, global: n }] = await Promise.all([
      import("./index6.js"),
      import("./region.js")
    ]);
    return (await i()).map(({ label: m, tzs: f }) => (f.sort((h, d) => {
      const T = I(h, e), Z = I(d, e), b = "Etc/GMT";
      if (h.startsWith(b) && d.startsWith(b)) {
        const p = h.substring(b.length), F = d.substring(b.length), M = p === "" ? 0 : parseInt(p);
        return (F === "" ? 0 : parseInt(F)) - M;
      }
      return T.localeCompare(Z);
    }), {
      label: O(e, m),
      items: f.map((h) => {
        const d = $(
          S(h, l, u)
        ), T = I(h, e), Z = m === n ? (
          // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
          // in addition to the label we also add "Global" and "Etc" to allow searching for these items
          `${I(n, e)} Etc`
        ) : B(h), b = c(h), p = O(e, b);
        return {
          label: T,
          value: h,
          metadata: {
            country: p === T ? void 0 : p,
            filterValue: Z,
            offset: d
          }
        };
      })
    })).sort(
      (m, f) => m.label === n ? -1 : f.label === n ? 1 : m.label.localeCompare(f.label)
    );
  }
  const [{ groupByOffset: y }, { DateEngine: C }] = await Promise.all([
    import("./index7.js"),
    import("./index8.js")
  ]), L = await y({
    dateEngine: new C(),
    groupDateRange: 1,
    startDate: new Date(u).toISOString()
  }), z = new Intl.ListFormat(t, { style: "long", type: "conjunction" }), w = ["Factory", "Etc/UTC"];
  return L.forEach((i) => {
    const c = [];
    let n = 0;
    i.tzs.forEach((r, m) => {
      w.includes(r) && n++, c[m] = n;
    }), i.tzs = i.tzs.filter((r) => !w.includes(r)), i.labelTzIdx = i.labelTzIdx.map((r) => r - c[r]).filter((r) => r >= 0 && r < i.tzs.length);
  }), L.map(({ labelTzIdx: i, tzs: c }) => {
    const n = c[0], r = $(
      S(n, l, u)
    ), m = ie(n, u), f = i.map((d) => I(c[d], e));
    return {
      label: de(e, r, z.format(f)),
      value: m,
      metadata: {
        filterValue: c.map((d) => B(d))
      }
    };
  }).filter((i) => !!i).sort((i, c) => i.value - c.value);
}
function I(t, e) {
  return e[t] || he(t);
}
function me(t, e, o) {
  return o.timeZoneRegionLabel.replace("{city}", t).replace("{country}", O(o, e));
}
function O(t, e) {
  return t[e] || e;
}
function he(t) {
  return t.split("/").pop();
}
function B(t) {
  return t.replace(/_/g, " ");
}
function de(t, e, o) {
  return t.timeZoneLabel.replace("{offset}", e).replace("{cities}", o);
}
function S(t, e, o = Date.now()) {
  return t === "Factory" && (t = "Etc/GMT"), te(e, { timeZone: t, timeZoneName: "shortOffset" }).formatToParts(o).find(({ type: l }) => l === "timeZoneName").value;
}
function ue(t) {
  return t[0].items !== void 0;
}
function fe(t) {
  return ue(t) ? t.flatMap((e) => e.items) : t;
}
function P(t, e, o) {
  return o == null ? null : fe(t).find(
    (s) => (
      // intentional == to match string to number
      s[e] == o
    )
  );
}
const be = R`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}`;
class pe extends E {
  constructor() {
    super(...arguments), this.comboboxRef = N(), this.messages = X({ blocking: !0 }), this.focusSetter = ee()(this), this.clearable = !1, this.disabled = !1, this.maxItems = 0, this.mode = "offset", this.offsetStyle = "user", this.open = !1, this.overlayPositioning = "absolute", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    this.properties = { clearable: 7, disabled: 7, form: 3, labelText: 1, maxItems: 11, messageOverrides: 0, mode: 3, name: 3, offsetStyle: 3, open: 7, overlayPositioning: 3, readOnly: 7, referenceDate: 1, required: 7, scale: 3, status: 3, validationIcon: [3, { converter: V, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = be;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.comboboxRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), A(this), G(this);
  }
  async load() {
    this.normalizer = await re(this.mode), await this.updateTimeZoneItems();
    const e = this.value, o = this.normalizeValue(e);
    this.value = o || (e === "" ? o : void 0), this.updateTimeZoneSelection();
    const s = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : "";
    K(this, s), this.value = s;
  }
  willUpdate(e) {
    e.has("value") && this.hasUpdated && this.handleValueChange(this.value, e.get("value")), (e.has("messages") || e.has("mode") && (this.hasUpdated || this.mode !== "offset") || e.has("referenceDate")) && this.handleTimeZoneItemPropsChange(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openChanged();
  }
  updated() {
    W(this);
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
    this.comboboxRef.value && (this.comboboxRef.value.open = this.open);
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
  overrideSelectedLabelForRegion(e) {
    this.mode !== "region" || !this.selectedTimeZoneItem || (this.comboboxRef.value.selectedItems[0].textLabel = this.getItemLabel(this.selectedTimeZoneItem, e));
  }
  onComboboxBeforeClose(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(!1), this.calciteInputTimeZoneBeforeClose.emit();
  }
  onComboboxBeforeOpen(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(!0), this.calciteInputTimeZoneBeforeOpen.emit();
  }
  onComboboxChange(e) {
    e.stopPropagation();
    const s = e.target.selectedItems[0];
    if (!s) {
      this._value = "", this.selectedTimeZoneItem = null, this.calciteInputTimeZoneChange.emit();
      return;
    }
    const a = this.findTimeZoneItemByLabel(s.getAttribute("data-label")), l = `${a.value}`;
    this.value === l && a.label === this.selectedTimeZoneItem.label || (this._value = l, this.selectedTimeZoneItem = a, this.calciteInputTimeZoneChange.emit());
  }
  onComboboxClose(e) {
    e.stopPropagation(), this.open = !1, this.calciteInputTimeZoneClose.emit();
  }
  onComboboxOpen(e) {
    this.open = !0, e.stopPropagation(), this.calciteInputTimeZoneOpen.emit();
  }
  findTimeZoneItem(e) {
    return P(this.timeZoneItems, "value", e);
  }
  findTimeZoneItemByLabel(e) {
    return P(this.timeZoneItems, "label", e);
  }
  async updateTimeZoneItems() {
    this.timeZoneItems = await this.createTimeZoneItems();
  }
  updateTimeZoneSelection() {
    if (this.value === "" && this.clearable) {
      this.selectedTimeZoneItem = null;
      return;
    }
    const e = this.mode === "offset" ? ne() : le(), o = this.value === "" || !this.value ? e : this.value;
    this.selectedTimeZoneItem = this.findTimeZoneItem(o) || this.findTimeZoneItem(e);
  }
  async createTimeZoneItems() {
    return !this.messages._lang || !this.messages ? [] : ce(this.messages._lang, this.messages, this.mode, this.referenceDate instanceof Date ? this.referenceDate : new Date(this.referenceDate ?? Date.now()), this.offsetStyle);
  }
  normalizeValue(e) {
    return e = e === void 0 ? "" : e, e && this.normalizer(e);
  }
  getItemLabel(e, o = this.open) {
    const s = this.selectedTimeZoneItem === e, { label: a, metadata: l } = e;
    return !l.country || o || !s ? a : me(a, l.country, this.messages);
  }
  render() {
    return j({ disabled: this.disabled, children: v`<calcite-combobox .clearDisabled=${!this.clearable} .disabled=${this.disabled} .label=${this.messages.chooseTimeZone} .labelText=${this.labelText} lang=${this.messages._lang ?? x} .maxItems=${this.maxItems} @calciteComboboxBeforeClose=${this.onComboboxBeforeClose} @calciteComboboxBeforeOpen=${this.onComboboxBeforeOpen} @calciteComboboxChange=${this.onComboboxChange} @calciteComboboxClose=${this.onComboboxClose} @calciteComboboxOpen=${this.onComboboxOpen} .overlayPositioning=${this.overlayPositioning} .placeholder=${this.mode === "name" ? this.messages.namePlaceholder : this.mode === "offset" ? this.messages.offsetPlaceholder : this.messages.regionPlaceholder} placeholder-icon=search .readOnly=${this.readOnly} .required=${this.required} .scale=${this.scale} .selectionMode=${this.clearable ? "single" : "single-persist"} .status=${this.status} .validationIcon=${this.validationIcon} .validationMessage=${this.validationMessage} ${q(this.comboboxRef)}>${this.renderItems()}<slot name=${se.labelContent} slot=${Y.labelContent}></slot></calcite-combobox>${Q({ component: this })}` });
  }
  renderItems() {
    return this.mode === "region" ? this.renderRegionItems() : D(this.timeZoneItems, ({ label: e }) => e, (e) => {
      const o = this.selectedTimeZoneItem === e, { label: s, metadata: a, value: l } = e;
      return v`<calcite-combobox-item data-label=${s ?? x} .metadata=${a} .selected=${o} .textLabel=${s} .value=${l}></calcite-combobox-item>`;
    });
  }
  renderRegionItems() {
    return this.timeZoneItems.flatMap(({ label: e, items: o }) => U(e, v`<calcite-combobox-item-group .label=${e}>${D(o, ({ label: s }) => s, (s) => {
      const a = this.selectedTimeZoneItem === s, { label: l, metadata: u, value: y } = s, C = this.getItemLabel(s);
      return v`<calcite-combobox-item data-label=${l ?? x} .description=${u.country} .metadata=${u} .selected=${a} .textLabel=${C} .value=${y}><span class=${_(oe.offset)} slot=content-end>${u.offset}</span></calcite-combobox-item>`;
    })}</calcite-combobox-item-group>`));
  }
}
k("calcite-input-time-zone", pe);
export {
  pe as InputTimeZone
};
