/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as _, L as E, c as v, H as N, A as x, b as Z, s as k, d as q } from "./index.js";
import { c as F } from "./repeat.js";
import { i as G } from "./keyed.js";
import { e as A, n as W } from "./ref.js";
import { u as j } from "./useLabel.js";
import { u as H } from "./useT9n.js";
import { S as K } from "./resources13.js";
import { u as J } from "./useFocusable.js";
import { u as Q } from "./useInteractive.js";
import { u as X } from "./useForm.js";
import { g as Y } from "./locale.js";
const ee = {
  offset: "offset"
}, te = {
  labelContent: "label-content"
}, oe = 60;
function $(t) {
  return t.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75").replace("−", "-");
}
function se(t, e) {
  const o = S(t, "en-US", e).replace("GMT", "");
  return o === "" ? 0 : Number($(o)) * oe;
}
function ie() {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset() * -1;
}
function ae() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
async function ne(t) {
  if (t === "offset")
    return (o) => o;
  const { normalize: e } = await import("./time-zones.js");
  return e;
}
async function le(t, e, o, s, a) {
  const { timeZones: i } = await import("./time-zones.js"), u = i.indexOf("Factory");
  if (u !== -1 && i.splice(u, 1), o === "name") {
    const { groupByName: n } = await import("./index5.js");
    return (await n()).map(({ label: l }) => ({
      label: l,
      value: l,
      metadata: {
        filterValue: l
      }
    })).filter((l) => !!l).sort();
  }
  const I = a === "user" ? t : (
    // we use locales that will always yield a short offset that matches `standardTime`
    a === "utc" ? "fr" : "en-GB"
  ), b = s.getTime();
  if (o === "region") {
    const [{ groupByRegion: n }, { getCountry: c, global: l }] = await Promise.all([
      import("./index6.js"),
      import("./region.js")
    ]);
    return (await n()).map(({ label: m, tzs: f }) => (f.sort((h, d) => {
      const y = T(h, e), C = T(d, e), p = "Etc/GMT";
      if (h.startsWith(p) && d.startsWith(p)) {
        const g = h.substring(p.length), D = d.substring(p.length), V = g === "" ? 0 : parseInt(g, 10);
        return (D === "" ? 0 : parseInt(D, 10)) - V;
      }
      return y.localeCompare(C);
    }), {
      label: O(e, m),
      items: f.map((h) => {
        const d = $(
          S(h, I, b)
        ), y = T(h, e), C = m === l ? (
          // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
          // in addition to the label we also add "Global" and "Etc" to allow searching for these items
          `${T(l, e)} Etc`
        ) : B(h), p = c(h), g = O(e, p);
        return {
          label: y,
          value: h,
          metadata: {
            country: g === y ? void 0 : g,
            filterValue: C,
            offset: d
          }
        };
      })
    })).sort(
      (m, f) => m.label === l ? -1 : f.label === l ? 1 : m.label.localeCompare(f.label)
    );
  }
  const [{ groupByOffset: P }, { DateEngine: U }] = await Promise.all([
    import("./index7.js"),
    import("./index8.js")
  ]), L = await P({
    dateEngine: new U(),
    groupDateRange: 1,
    startDate: new Date(b).toISOString()
  }), M = new Intl.ListFormat(t, { style: "long", type: "conjunction" }), w = ["Etc/UTC"];
  return L.forEach((n) => {
    const c = [];
    let l = 0;
    n.tzs.forEach((r, m) => {
      w.includes(r) && l++, c[m] = l;
    }), n.tzs = n.tzs.filter((r) => !w.includes(r)), n.labelTzIdx = n.labelTzIdx.map((r) => r - c[r]).filter((r) => r >= 0 && r < n.tzs.length);
  }), L.map(({ labelTzIdx: n, tzs: c }) => {
    const l = c[0], r = $(
      S(l, I, b)
    ), m = se(l, b), f = n.map((d) => T(c[d], e));
    return {
      label: me(e, r, M.format(f)),
      value: m,
      metadata: {
        filterValue: c.map((d) => B(d))
      }
    };
  }).filter((n) => !!n).sort((n, c) => n.value - c.value);
}
function T(t, e) {
  return R(e, t) || ce(t);
}
function re(t, e, o) {
  return o.timeZoneRegionLabel.replace("{city}", t).replace("{country}", O(o, e));
}
function O(t, e) {
  return R(t, e) || e;
}
function R(t, e) {
  const o = t[e];
  return typeof o == "string" ? o : void 0;
}
function ce(t) {
  return t.split("/").pop() ?? "";
}
function B(t) {
  return t.replace(/_/g, " ");
}
function me(t, e, o) {
  return t.timeZoneLabel.replace("{offset}", e).replace("{cities}", o);
}
function S(t, e, o = Date.now()) {
  return Y(e, { timeZone: t, timeZoneName: "shortOffset" }).formatToParts(o).find(({ type: i }) => i === "timeZoneName").value;
}
function he(t) {
  return t[0].items !== void 0;
}
function ue(t) {
  return he(t) ? t.flatMap((e) => e.items) : t;
}
function z(t, e, o) {
  return o === void 0 || t === void 0 ? void 0 : ue(t).find(
    (s) => (
      // intentional == to match string to number
      s[e] == o
    )
  );
}
const de = _`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-combobox-corner-radius: var(--calcite-input-time-zone-corner-radius, var(--calcite-corner-radius))}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}`;
class fe extends E {
  constructor() {
    super(), this.comboboxRef = A(), this.formSupport = X({
      inputType: "text"
    })(this), this.messages = H({ blocking: !0 }), this.focusSetter = J()(this).setFocus, this.interactiveContainer = Q(this), this.#e = null, this.clearable = !1, this.disabled = !1, this.maxItems = 0, this.mode = "offset", this.offsetStyle = "user", this.open = !1, this.overlayPositioning = "absolute", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.topLayerDisabled = !1, this.calciteInputTimeZoneBeforeClose = v({ cancelable: !1 }), this.calciteInputTimeZoneBeforeOpen = v({ cancelable: !1 }), this.calciteInputTimeZoneChange = v({ cancelable: !1 }), this.calciteInputTimeZoneClose = v({ cancelable: !1 }), this.calciteInputTimeZoneOpen = v({ cancelable: !1 }), j(this);
  }
  static {
    this.properties = { selectedTimeZoneItem: 16, timeZoneItems: 16, clearable: 7, disabled: 7, form: 3, label: 1, labelText: 1, maxItems: 11, messageOverrides: 0, mode: 3, name: 3, offsetStyle: 3, open: 7, overlayPositioning: 3, placeholder: 1, readOnly: 7, referenceDate: 1, required: 7, scale: 3, status: 3, topLayerDisabled: 7, validationIcon: [3, { converter: N }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = {
      mode: "open",
      delegatesFocus: !0
    };
  }
  static {
    this.styles = de;
  }
  #e;
  get value() {
    return this._value;
  }
  set value(e) {
    this.#e = "internal", this._value = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.comboboxRef.value, e);
  }
  async load() {
    this.normalizer = await ne(this.mode), await this.updateTimeZoneItems();
    const e = this.value, o = this.normalizeValue(e);
    this.value = o || (e === "" ? o : void 0), this.updateTimeZoneSelection();
    const s = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : "";
    this.value = s;
  }
  willUpdate(e) {
    e.has("value") && this.hasUpdated && this.handleValueChange(this.value, e.get("value")), (e.has("messages") || e.has("mode") && (this.hasUpdated || this.mode !== "offset") || e.has("referenceDate")) && this.handleTimeZoneItemPropsChange(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openChanged();
  }
  loaded() {
    this.openChanged();
  }
  async handleTimeZoneItemPropsChange() {
    !this.timeZoneItems || !this.hasUpdated || (await this.updateTimeZoneItems(), this.updateTimeZoneSelection());
  }
  openChanged() {
    this.comboboxRef.value && (this.comboboxRef.value.open = this.open);
  }
  async handleValueChange(e, o) {
    const s = this.#e === "user";
    if (this.#e = null, s)
      return;
    const a = this.normalizeValue(e);
    if (!a) {
      if (this.clearable) {
        this._value = a, this.selectedTimeZoneItem = void 0;
        return;
      }
      this._value = o, this.selectedTimeZoneItem = this.findTimeZoneItem(o);
      return;
    }
    const i = this.findTimeZoneItem(a);
    if (!i) {
      this._value = o;
      return;
    }
    this._value = a, this.selectedTimeZoneItem = i;
  }
  onLabelClick() {
    this.setFocus();
  }
  overrideSelectedLabelForRegion(e) {
    this.mode !== "region" || !this.selectedTimeZoneItem || this.comboboxRef.value && (this.comboboxRef.value.selectedItems[0].heading = this.getItemLabel(this.selectedTimeZoneItem, e));
  }
  onComboboxBeforeClose(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(!1), this.calciteInputTimeZoneBeforeClose.emit();
  }
  onComboboxBeforeOpen(e) {
    e.stopPropagation(), this.overrideSelectedLabelForRegion(!0), this.calciteInputTimeZoneBeforeOpen.emit();
  }
  onComboboxChange(e) {
    e.stopPropagation();
    const s = e.target.selectedItems[0], a = this._value;
    if (!s) {
      this._value = "", this.requestUpdate("value", a), this.selectedTimeZoneItem = void 0, this.calciteInputTimeZoneChange.emit();
      return;
    }
    const i = this.findTimeZoneItemByLabel(s.getAttribute("data-label") ?? void 0), u = i?.value === void 0 ? void 0 : `${i?.value}`;
    this.value === u && i?.label === this.selectedTimeZoneItem?.label || (this._value = u, this.requestUpdate("value", a), this.selectedTimeZoneItem = i, this.#e = "user", this.calciteInputTimeZoneChange.emit());
  }
  onComboboxClose(e) {
    e.stopPropagation(), this.open = !1, this.calciteInputTimeZoneClose.emit();
  }
  onComboboxOpen(e) {
    this.open = !0, e.stopPropagation(), this.calciteInputTimeZoneOpen.emit();
  }
  findTimeZoneItem(e) {
    return z(this.timeZoneItems, "value", e);
  }
  findTimeZoneItemByLabel(e) {
    return z(this.timeZoneItems, "label", e);
  }
  async updateTimeZoneItems() {
    this.timeZoneItems = await this.createTimeZoneItems();
  }
  updateTimeZoneSelection() {
    if (this.value === "" && this.clearable) {
      this.selectedTimeZoneItem = void 0;
      return;
    }
    const e = this.mode === "offset" ? ie() : this.normalizeValue(ae()), o = this.value === "" || !this.value ? e : this.value;
    this.selectedTimeZoneItem = this.findTimeZoneItem(o) || this.findTimeZoneItem(e);
  }
  async createTimeZoneItems() {
    return !this.messages._lang || !this.messages ? [] : le(this.messages._lang, this.messages, this.mode, this.referenceDate instanceof Date ? this.referenceDate : new Date(this.referenceDate ?? Date.now()), this.offsetStyle);
  }
  normalizeValue(e) {
    return e = e === void 0 ? "" : e, e && this.normalizer(e);
  }
  getItemLabel(e, o = this.open) {
    const s = this.selectedTimeZoneItem === e, { label: a, metadata: i } = e;
    return !i.country || o || !s ? a : re(a, i.country, this.messages);
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: Z`<calcite-combobox .clearDisabled=${!this.clearable} .disabled=${this.disabled} .label=${this.label || this.messages.chooseTimeZone} .labelText=${this.labelText} lang=${this.messages._lang ?? x} .maxItems=${this.maxItems} @calciteComboboxBeforeClose=${this.onComboboxBeforeClose} @calciteComboboxBeforeOpen=${this.onComboboxBeforeOpen} @calciteComboboxChange=${this.onComboboxChange} @calciteComboboxClose=${this.onComboboxClose} @calciteComboboxOpen=${this.onComboboxOpen} .overlayPositioning=${this.overlayPositioning} .placeholder=${this.placeholder || this.messages[`${this.mode}Placeholder`]} placeholder-icon=search .readOnly=${this.readOnly} .required=${this.required} .scale=${this.scale} .selectionMode=${this.clearable ? "single" : "single-persist"} .status=${this.status} .topLayerDisabled=${this.topLayerDisabled} .validationIcon=${this.validationIcon} .validationMessage=${this.validationMessage} ${W(this.comboboxRef)}>${this.renderItems()}<slot name=${te.labelContent} slot=${K.labelContent}></slot></calcite-combobox>` });
  }
  renderItems() {
    return this.mode === "region" ? this.renderRegionItems() : F(this.timeZoneItems, ({ label: e }) => e, (e) => {
      const o = this.selectedTimeZoneItem === e, { label: s, metadata: a, value: i } = e;
      return Z`<calcite-combobox-item data-label=${s ?? x} .heading=${s} .metadata=${a} .selected=${o} .value=${i}></calcite-combobox-item>`;
    });
  }
  renderRegionItems() {
    return this.timeZoneItems.flatMap(({ label: e, items: o }) => G(e, Z`<calcite-combobox-item-group .label=${e}>${F(o, ({ label: s }) => s, (s) => {
      const a = this.selectedTimeZoneItem === s, { label: i, metadata: u, value: I } = s, b = this.getItemLabel(s);
      return Z`<calcite-combobox-item data-label=${i ?? x} .description=${u.country} .heading=${b} .metadata=${u} .selected=${a} .value=${I}><span class=${k(ee.offset)} slot=content-end>${u.offset}</span></calcite-combobox-item>`;
    })}</calcite-combobox-item-group>`));
  }
}
q("calcite-input-time-zone", fe);
export {
  fe as InputTimeZone
};
