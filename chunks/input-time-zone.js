/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as U, L as _, c as g, T as V, A as $, b as I, s as E, d as N } from "./index.js";
import { c as F } from "./repeat.js";
import { i as k } from "./keyed.js";
import { e as q, n as G } from "./ref.js";
import { u as A } from "./useLabel.js";
import { u as W } from "./useT9n.js";
import { S as j } from "./resources13.js";
import { u as K } from "./useSetFocus.js";
import { u as H } from "./useInteractive.js";
import { u as J } from "./useForm.js";
import { g as Q } from "./locale.js";
const X = {
  offset: "offset"
}, Y = {
  labelContent: "label-content"
}, ee = 60;
function x(t) {
  return t.replace(":15", ".25").replace(":30", ".5").replace(":45", ".75").replace("−", "-");
}
function te(t, e) {
  const o = S(t, "en-US", e).replace("GMT", "");
  return o === "" ? 0 : Number(x(o)) * ee;
}
function oe() {
  return (/* @__PURE__ */ new Date()).getTimezoneOffset() * -1;
}
function se() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
async function ie(t) {
  if (t === "offset")
    return (o) => o;
  const { normalize: e } = await import("./time-zones.js");
  return e;
}
async function ae(t, e, o, s, a) {
  if (o === "name") {
    const { groupByName: n } = await import("./index5.js");
    return (await n()).map(({ label: l }) => ({
      label: l,
      value: l,
      metadata: {
        filterValue: l
      }
    })).filter((l) => !!l).sort();
  }
  const i = a === "user" ? t : (
    // we use locales that will always yield a short offset that matches `standardTime`
    a === "utc" ? "fr" : "en-GB"
  ), c = s.getTime();
  if (o === "region") {
    const [{ groupByRegion: n }, { getCountry: m, global: l }] = await Promise.all([
      import("./index6.js"),
      import("./region.js")
    ]);
    return (await n()).map(({ label: h, tzs: f }) => (f.sort((u, d) => {
      const T = v(u, e), C = v(d, e), b = "Etc/GMT";
      if (u.startsWith(b) && d.startsWith(b)) {
        const p = u.substring(b.length), w = d.substring(b.length), M = p === "" ? 0 : parseInt(p, 10);
        return (w === "" ? 0 : parseInt(w, 10)) - M;
      }
      return T.localeCompare(C);
    }), {
      label: O(e, h),
      items: f.map((u) => {
        const d = x(
          S(u, i, c)
        ), T = v(u, e), C = h === l ? (
          // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
          // in addition to the label we also add "Global" and "Etc" to allow searching for these items
          `${v(l, e)} Etc`
        ) : B(u), b = m(u), p = O(e, b);
        return {
          label: T,
          value: u,
          metadata: {
            country: p === T ? void 0 : p,
            filterValue: C,
            offset: d
          }
        };
      })
    })).sort(
      (h, f) => h.label === l ? -1 : f.label === l ? 1 : h.label.localeCompare(f.label)
    );
  }
  const [{ groupByOffset: y }, { DateEngine: Z }] = await Promise.all([
    import("./index7.js"),
    import("./index8.js")
  ]), L = await y({
    dateEngine: new Z(),
    groupDateRange: 1,
    startDate: new Date(c).toISOString()
  }), P = new Intl.ListFormat(t, { style: "long", type: "conjunction" }), D = ["Factory", "Etc/UTC"];
  return L.forEach((n) => {
    const m = [];
    let l = 0;
    n.tzs.forEach((r, h) => {
      D.includes(r) && l++, m[h] = l;
    }), n.tzs = n.tzs.filter((r) => !D.includes(r)), n.labelTzIdx = n.labelTzIdx.map((r) => r - m[r]).filter((r) => r >= 0 && r < n.tzs.length);
  }), L.map(({ labelTzIdx: n, tzs: m }) => {
    const l = m[0], r = x(
      S(l, i, c)
    ), h = te(l, c), f = n.map((d) => v(m[d], e));
    return {
      label: re(e, r, P.format(f)),
      value: h,
      metadata: {
        filterValue: m.map((d) => B(d))
      }
    };
  }).filter((n) => !!n).sort((n, m) => n.value - m.value);
}
function v(t, e) {
  return z(e, t) || le(t);
}
function ne(t, e, o) {
  return o.timeZoneRegionLabel.replace("{city}", t).replace("{country}", O(o, e));
}
function O(t, e) {
  return z(t, e) || e;
}
function z(t, e) {
  const o = t[e];
  return typeof o == "string" ? o : void 0;
}
function le(t) {
  return t.split("/").pop() ?? "";
}
function B(t) {
  return t.replace(/_/g, " ");
}
function re(t, e, o) {
  return t.timeZoneLabel.replace("{offset}", e).replace("{cities}", o);
}
function S(t, e, o = Date.now()) {
  return t === "Factory" && (t = "Etc/GMT"), Q(e, { timeZone: t, timeZoneName: "shortOffset" }).formatToParts(o).find(({ type: i }) => i === "timeZoneName").value;
}
function ce(t) {
  return t[0].items !== void 0;
}
function me(t) {
  return ce(t) ? t.flatMap((e) => e.items) : t;
}
function R(t, e, o) {
  return o === void 0 || t === void 0 ? void 0 : me(t).find(
    (s) => (
      // intentional == to match string to number
      s[e] == o
    )
  );
}
const he = U`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;--calcite-combobox-corner-radius: var(--calcite-input-time-zone-corner-radius, var(--calcite-corner-radius))}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class ue extends _ {
  constructor() {
    super(), this.comboboxRef = q(), this.formSupport = J({
      inputType: "text"
    })(this), this.messages = W({ blocking: !0 }), this.focusSetter = K()(this), this.interactiveContainer = H(this), this.#e = null, this.clearable = !1, this.disabled = !1, this.maxItems = 0, this.mode = "offset", this.offsetStyle = "user", this.open = !1, this.overlayPositioning = "absolute", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.topLayerDisabled = !1, this.calciteInputTimeZoneBeforeClose = g({ cancelable: !1 }), this.calciteInputTimeZoneBeforeOpen = g({ cancelable: !1 }), this.calciteInputTimeZoneChange = g({ cancelable: !1 }), this.calciteInputTimeZoneClose = g({ cancelable: !1 }), this.calciteInputTimeZoneOpen = g({ cancelable: !1 }), A(this);
  }
  static {
    this.properties = { selectedTimeZoneItem: 16, timeZoneItems: 16, clearable: 7, disabled: 7, form: 3, labelText: 1, maxItems: 11, messageOverrides: 0, mode: 3, name: 3, offsetStyle: 3, open: 7, overlayPositioning: 3, placeholder: 1, readOnly: 7, referenceDate: 1, required: 7, scale: 3, status: 3, topLayerDisabled: 7, validationIcon: [3, { converter: V }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = he;
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
    this.normalizer = await ie(this.mode), await this.updateTimeZoneItems();
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
    const i = this.findTimeZoneItemByLabel(s.getAttribute("data-label") ?? void 0), c = i?.value === void 0 ? void 0 : `${i?.value}`;
    this.value === c && i?.label === this.selectedTimeZoneItem?.label || (this._value = c, this.requestUpdate("value", a), this.selectedTimeZoneItem = i, this.#e = "user", this.calciteInputTimeZoneChange.emit());
  }
  onComboboxClose(e) {
    e.stopPropagation(), this.open = !1, this.calciteInputTimeZoneClose.emit();
  }
  onComboboxOpen(e) {
    this.open = !0, e.stopPropagation(), this.calciteInputTimeZoneOpen.emit();
  }
  findTimeZoneItem(e) {
    return R(this.timeZoneItems, "value", e);
  }
  findTimeZoneItemByLabel(e) {
    return R(this.timeZoneItems, "label", e);
  }
  async updateTimeZoneItems() {
    this.timeZoneItems = await this.createTimeZoneItems();
  }
  updateTimeZoneSelection() {
    if (this.value === "" && this.clearable) {
      this.selectedTimeZoneItem = void 0;
      return;
    }
    const e = this.mode === "offset" ? oe() : se(), o = this.value === "" || !this.value ? e : this.value;
    this.selectedTimeZoneItem = this.findTimeZoneItem(o) || this.findTimeZoneItem(e);
  }
  async createTimeZoneItems() {
    return !this.messages._lang || !this.messages ? [] : ae(this.messages._lang, this.messages, this.mode, this.referenceDate instanceof Date ? this.referenceDate : new Date(this.referenceDate ?? Date.now()), this.offsetStyle);
  }
  normalizeValue(e) {
    return e = e === void 0 ? "" : e, e && this.normalizer(e);
  }
  getItemLabel(e, o = this.open) {
    const s = this.selectedTimeZoneItem === e, { label: a, metadata: i } = e;
    return !i.country || o || !s ? a : ne(a, i.country, this.messages);
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: I`<calcite-combobox .clearDisabled=${!this.clearable} .disabled=${this.disabled} .label=${this.messages.chooseTimeZone} .labelText=${this.labelText} lang=${this.messages._lang ?? $} .maxItems=${this.maxItems} @calciteComboboxBeforeClose=${this.onComboboxBeforeClose} @calciteComboboxBeforeOpen=${this.onComboboxBeforeOpen} @calciteComboboxChange=${this.onComboboxChange} @calciteComboboxClose=${this.onComboboxClose} @calciteComboboxOpen=${this.onComboboxOpen} .overlayPositioning=${this.overlayPositioning} .placeholder=${this.placeholder || this.messages[`${this.mode}Placeholder`]} placeholder-icon=search .readOnly=${this.readOnly} .required=${this.required} .scale=${this.scale} .selectionMode=${this.clearable ? "single" : "single-persist"} .status=${this.status} .topLayerDisabled=${this.topLayerDisabled} .validationIcon=${this.validationIcon} .validationMessage=${this.validationMessage} ${G(this.comboboxRef)}>${this.renderItems()}<slot name=${Y.labelContent} slot=${j.labelContent}></slot></calcite-combobox>` });
  }
  renderItems() {
    return this.mode === "region" ? this.renderRegionItems() : F(this.timeZoneItems, ({ label: e }) => e, (e) => {
      const o = this.selectedTimeZoneItem === e, { label: s, metadata: a, value: i } = e;
      return I`<calcite-combobox-item data-label=${s ?? $} .heading=${s} .metadata=${a} .selected=${o} .value=${i}></calcite-combobox-item>`;
    });
  }
  renderRegionItems() {
    return this.timeZoneItems.flatMap(({ label: e, items: o }) => k(e, I`<calcite-combobox-item-group .label=${e}>${F(o, ({ label: s }) => s, (s) => {
      const a = this.selectedTimeZoneItem === s, { label: i, metadata: c, value: y } = s, Z = this.getItemLabel(s);
      return I`<calcite-combobox-item data-label=${i ?? $} .description=${c.country} .heading=${Z} .metadata=${c} .selected=${a} .value=${y}><span class=${E(X.offset)} slot=content-end>${c.offset}</span></calcite-combobox-item>`;
    })}</calcite-combobox-item-group>`));
  }
}
N("calcite-input-time-zone", ue);
export {
  ue as InputTimeZone
};
