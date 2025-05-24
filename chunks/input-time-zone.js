import { a as M, L as R, d as g, h as V, E as Z, x as v, s as _, c as k } from "./iframe.js";
import { n as U } from "./ref.js";
import { c as L } from "./repeat.js";
import { i as N } from "./keyed.js";
import { c as G, d as H } from "./label.js";
import { u as q, I as W } from "./interactive.js";
import { c as j } from "./component.js";
import { c as A, a as K, d as J, H as Q } from "./form.js";
import { u as X } from "./useT9n.js";
import { b as Y } from "./locale.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const ee = {
  offset: "offset"
}, te = 60;
function x(t) {
  return t.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75").replace("−", "-");
}
function oe(t, e) {
  const o = O(t, "en-US", e).replace("GMT", "");
  return o === "" ? 0 : Number(x(o)) * te;
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
async function ne(t, e, o, s, n) {
  if (o === "name") {
    const { groupByName: a } = await import("./index6.js");
    return (await a()).map(({ label: i }) => ({
      label: i,
      value: i,
      metadata: {
        filterValue: i
      }
    })).filter((i) => !!i).sort();
  }
  const r = n === "user" ? t : (
    // we use locales that will always yield a short offset that matches `standardTime`
    n === "utc" ? "fr" : "en-GB"
  ), f = s.getTime();
  if (o === "region") {
    const [{ groupByRegion: a }, { getCountry: c, global: i }] = await Promise.all([
      import("./index7.js"),
      import("./region.js")
    ]);
    return (await a()).map(({ label: m, tzs: u }) => (u.sort((h, d) => {
      const T = I(h, e), C = I(d, e), p = "Etc/GMT";
      if (h.startsWith(p) && d.startsWith(p)) {
        const b = h.substring(p.length), F = d.substring(p.length), z = b === "" ? 0 : parseInt(b);
        return (F === "" ? 0 : parseInt(F)) - z;
      }
      return T.localeCompare(C);
    }), {
      label: $(e, m),
      items: u.map((h) => {
        const d = x(
          O(h, r, f)
        ), T = I(h, e), C = m === i ? (
          // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
          // in addition to the label we also add "Global" and "Etc" to allow searching for these items
          `${I(i, e)} Etc`
        ) : D(h), p = c(h), b = $(e, p);
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
      (m, u) => m.label === i ? -1 : u.label === i ? 1 : m.label.localeCompare(u.label)
    );
  }
  const [{ groupByOffset: y }, { DateEngine: E }] = await Promise.all([
    import("./index8.js"),
    import("./index9.js")
  ]), w = await y({
    dateEngine: new E(),
    groupDateRange: 1,
    startDate: new Date(f).toISOString()
  }), P = new Intl.ListFormat(t, { style: "long", type: "conjunction" }), S = ["Factory", "Etc/UTC"];
  return w.forEach((a) => {
    const c = [];
    let i = 0;
    a.tzs.forEach((l, m) => {
      S.includes(l) && i++, c[m] = i;
    }), a.tzs = a.tzs.filter((l) => !S.includes(l)), a.labelTzIdx = a.labelTzIdx.map((l) => l - c[l]).filter((l) => l >= 0 && l < a.tzs.length);
  }), w.map(({ labelTzIdx: a, tzs: c }) => {
    const i = c[0], l = x(
      O(i, r, f)
    ), m = oe(i, f), u = a.map((d) => I(c[d], e));
    return {
      label: ce(e, l, P.format(u)),
      value: m,
      metadata: {
        filterValue: c.map((d) => D(d))
      }
    };
  }).filter((a) => !!a).sort((a, c) => a.value - c.value);
}
function I(t, e) {
  return e[t] || re(t);
}
function le(t, e, o) {
  return o.timeZoneRegionLabel.replace("{city}", t).replace("{country}", $(o, e));
}
function $(t, e) {
  return t[e] || e;
}
function re(t) {
  return t.split("/").pop();
}
function D(t) {
  return t.replace(/_/g, " ");
}
function ce(t, e, o) {
  return t.timeZoneLabel.replace("{offset}", e).replace("{cities}", o);
}
function O(t, e, o = Date.now()) {
  return t === "Factory" && (t = "Etc/GMT"), Y(e, { timeZone: t, timeZoneName: "shortOffset" }).formatToParts(o).find(({ type: r }) => r === "timeZoneName").value;
}
function me(t) {
  return t[0].items !== void 0;
}
function he(t) {
  return me(t) ? t.flatMap((e) => e.items) : t;
}
function B(t, e, o) {
  return o == null ? null : he(t).find(
    (s) => (
      // intentional == to match string to number
      s[e] == o
    )
  );
}
const de = M`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}`;
class fe extends R {
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
    this.overrideSelectedLabelForRegion(this.open), this.openChanged();
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
    const n = this.findTimeZoneItem(s);
    if (!n) {
      this._value = o;
      return;
    }
    this._value = s, this.selectedTimeZoneItem = n, s !== e && (await this.updateComplete, this.overrideSelectedLabelForRegion(this.open));
  }
  onLabelClick() {
    this.setFocus();
  }
  setComboboxRef(e) {
    this.comboboxEl = e;
  }
  overrideSelectedLabelForRegion(e) {
    if (this.mode !== "region" || !this.selectedTimeZoneItem)
      return;
    const { label: o, metadata: s } = this.selectedTimeZoneItem;
    this.comboboxEl.selectedItems[0].textLabel = !s.country || e ? o : le(o, s.country, this.messages);
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
    const n = this.findTimeZoneItemByLabel(s.getAttribute("data-label")), r = `${n.value}`;
    this.value === r && n.label === this.selectedTimeZoneItem.label || (this._value = r, this.selectedTimeZoneItem = n, this.calciteInputTimeZoneChange.emit());
  }
  onComboboxClose(e) {
    e.stopPropagation(), this.open = !1, this.calciteInputTimeZoneClose.emit();
  }
  onComboboxOpen(e) {
    this.open = !0, e.stopPropagation(), this.calciteInputTimeZoneOpen.emit();
  }
  findTimeZoneItem(e) {
    return B(this.timeZoneItems, "value", e);
  }
  findTimeZoneItemByLabel(e) {
    return B(this.timeZoneItems, "label", e);
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
  render() {
    return W({ disabled: this.disabled, children: v`<calcite-combobox .clearDisabled=${!this.clearable} .disabled=${this.disabled} .label=${this.messages.chooseTimeZone} lang=${this.messages._lang ?? Z} .maxItems=${this.maxItems} @calciteComboboxBeforeClose=${this.onComboboxBeforeClose} @calciteComboboxBeforeOpen=${this.onComboboxBeforeOpen} @calciteComboboxChange=${this.onComboboxChange} @calciteComboboxClose=${this.onComboboxClose} @calciteComboboxOpen=${this.onComboboxOpen} .overlayPositioning=${this.overlayPositioning} .placeholder=${this.mode === "name" ? this.messages.namePlaceholder : this.mode === "offset" ? this.messages.offsetPlaceholder : this.messages.regionPlaceholder} placeholder-icon=search .readOnly=${this.readOnly} .scale=${this.scale} .selectionMode=${this.clearable ? "single" : "single-persist"} .status=${this.status} .validationIcon=${this.validationIcon} .validationMessage=${this.validationMessage} ${U(this.setComboboxRef)}>${this.renderItems()}</calcite-combobox>${Q({ component: this })}` });
  }
  renderItems() {
    return this.mode === "region" ? this.renderRegionItems() : L(this.timeZoneItems, ({ label: e }) => e, (e) => {
      const o = this.selectedTimeZoneItem === e, { label: s, metadata: n, value: r } = e;
      return v`<calcite-combobox-item data-label=${s ?? Z} .metadata=${n} .selected=${o} .textLabel=${s} .value=${r}></calcite-combobox-item>`;
    });
  }
  renderRegionItems() {
    return this.timeZoneItems.flatMap(({ label: e, items: o }) => N(e, v`<calcite-combobox-item-group .label=${e}>${L(o, ({ label: s }) => s, (s) => {
      const n = this.selectedTimeZoneItem === s, { label: r, metadata: f, value: y } = s;
      return v`<calcite-combobox-item data-label=${r ?? Z} .description=${f.country} .metadata=${f} .selected=${n} .textLabel=${r} .value=${y}><span class=${_(ee.offset)} slot=content-end>${f.offset}</span></calcite-combobox-item>`;
    })}</calcite-combobox-item-group>`));
  }
}
k("calcite-input-time-zone", fe);
export {
  fe as InputTimeZone
};
