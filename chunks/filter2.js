import { b as c, L as s, c as l, s as r, x as o, D as n, q as d } from "./index.js";
import { e as u, n as p } from "./ref.js";
import { f as a } from "./filter.js";
import { u as h, I as f } from "./interactive.js";
import { u as v } from "./useCancelable.js";
import { u as b } from "./useT9n.js";
import { u as m } from "./useSetFocus.js";
import { d as g } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const y = {
  container: "container"
}, x = {
  search: "search"
}, k = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%}:host([scale=s]) .container{padding:var(--calcite-filter-content-space, var(--calcite-spacing-sm))}:host([scale=m]) .container{padding:var(--calcite-filter-content-space, var(--calcite-spacing-md))}:host([scale=l]) .container{padding:var(--calcite-filter-content-space, var(--calcite-spacing-lg))}label{position:relative;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}calcite-input{inline-size:100%;--calcite-input-background-color: var(--calcite-filter-input-background-color);--calcite-input-border-color: var(--calcite-filter-input-border-color);--calcite-input-corner-radius: var(--calcite-filter-input-corner-radius);--calcite-input-shadow: var(--calcite-filter-input-shadow);--calcite-input-icon-color: var(--calcite-filter-input-icon-color);--calcite-input-text-color: var(--calcite-filter-input-text-color);--calcite-input-placeholder-text-color: var(--calcite-filter-input-placeholder-text-color);--calcite-input-actions-background-color: var(--calcite-filter-input-actions-background-color);--calcite-input-actions-background-color-hover: var(--calcite-filter-input-actions-background-color-hover);--calcite-input-actions-background-color-press: var(--calcite-filter-input-actions-background-color-press);--calcite-input-actions-icon-color: var(--calcite-filter-input-actions-icon-color);--calcite-input-actions-icon-color-hover: var(--calcite-filter-input-actions-icon-color-hover);--calcite-input-actions-icon-color-press: var(--calcite-filter-input-actions-icon-color-press)}:host([hidden]){display:none}[hidden]{display:none}`;
class D extends s {
  constructor() {
    super(...arguments), this.cancelable = v()(this), this.filterDebounced = g((e, t = !1, i) => this.updateFiltered(a(this.items ?? [], e, this.filterProps), t, i), n.filter), this.textInputRef = u(), this._value = "", this.messages = b(), this.focusSetter = m()(this), this.disabled = !1, this.filteredItems = [], this.items = [], this.scale = "m", this.calciteFilterChange = l({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, filterProps: 0, filteredItems: 0, items: 0, label: 1, messageOverrides: 0, placeholder: 1, scale: 3, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = k;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueHandler(e));
  }
  async filter(e = this.value) {
    return new Promise((t) => {
      this.value = e, this.updateFiltered(a(this.items ?? [], e, this.filterProps), !1, t);
    });
  }
  async setFocus(e) {
    return this.focusSetter(() => this.textInputRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.cancelable.add(this.filterDebounced);
  }
  async load() {
    this.updateFiltered(a(this.items ?? [], this.value, this.filterProps));
  }
  willUpdate(e) {
    (e.has("items") && (this.hasUpdated || this.items?.length > 0) || e.has("filterProps")) && this.filterDebounced(this.value);
  }
  updated() {
    h(this);
  }
  valueHandler(e) {
    this.filterDebounced(e);
  }
  inputHandler(e) {
    const t = e.target;
    this.value = t.value, this.filterDebounced(t.value, !0);
  }
  keyDownHandler(e) {
    e.defaultPrevented || (e.key === "Escape" && (this.clear(), e.preventDefault()), e.key === "Enter" && e.preventDefault());
  }
  clear() {
    this.value = "", this.filterDebounced("", !0), this.setFocus();
  }
  updateFiltered(e, t = !1, i) {
    this.filteredItems = e, t && this.calciteFilterChange.emit(), i?.();
  }
  render() {
    const { disabled: e, scale: t } = this;
    return f({ disabled: e, children: o`<div class=${r(y.container)}><label><calcite-input clearable .disabled=${e} .icon=${x.search} .label=${this.label ?? this.messages.label} .messageOverrides=${{ clear: this.messages.clear }} @keydown=${this.keyDownHandler} @calciteInputInput=${this.inputHandler} .placeholder=${this.placeholder} .scale=${t} type=text .value=${this.value} ${p(this.textInputRef)}></calcite-input></label></div>` });
  }
}
d("calcite-filter", D);
export {
  D as Filter
};
