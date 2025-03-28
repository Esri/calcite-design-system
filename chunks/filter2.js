import { d as a, L as l, j as r, s as n, x as o, D as c, h as d } from "./iframe.js";
import { e as h, n as u } from "./ref.js";
import { f as i } from "./filter.js";
import { u as p, I as f } from "./interactive.js";
import { c as m } from "./component.js";
import { u as b } from "./useT9n.js";
import { d as v } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const g = {
  container: "container"
}, y = {
  search: "search"
}, x = a`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%}:host([scale=s]) .container{padding:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding:var(--calcite-spacing-md)}:host([scale=l]) .container{padding:var(--calcite-spacing-lg)}label{position:relative;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}calcite-input{inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}`;
class D extends l {
  constructor() {
    super(...arguments), this.filterDebounced = v((e, t = !1, s) => this.updateFiltered(i(this.items ?? [], e, this.filterProps), t, s), c.filter), this.textInput = h(), this._value = "", this.disabled = !1, this.filteredItems = [], this.items = [], this.messages = b(), this.scale = "m", this.calciteFilterChange = r({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, filterProps: 0, filteredItems: 0, items: 0, label: 1, messageOverrides: 0, placeholder: 1, scale: 3, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = x;
  }
  /** The component's value. */
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueHandler(e));
  }
  // #endregion
  // #region Public Methods
  /**
   * Performs a filter on the component.
   *
   * This method can be useful because filtering is delayed and asynchronous.
   *
   * @param {string} value - The filter text value.
   * @returns {Promise<void>}
   */
  async filter(e = this.value) {
    return new Promise((t) => {
      this.value = e, this.updateFiltered(i(this.items ?? [], e, this.filterProps), !1, t);
    });
  }
  /** Sets focus on the component. */
  async setFocus() {
    return await m(this), this.textInput.value?.setFocus();
  }
  // #endregion
  // #region Lifecycle
  async load() {
    this.updateFiltered(i(this.items ?? [], this.value, this.filterProps));
  }
  willUpdate(e) {
    (e.has("items") && (this.hasUpdated || this.items?.length > 0) || e.has("filterProps")) && this.filterDebounced(this.value);
  }
  updated() {
    p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.filterDebounced.cancel();
  }
  // #endregion
  // #region Private Methods
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
  updateFiltered(e, t = !1, s) {
    this.filteredItems = e, t && this.calciteFilterChange.emit(), s?.();
  }
  // #endregion
  // #region Rendering
  render() {
    const { disabled: e, scale: t } = this;
    return f({ disabled: e, children: o`<div class=${n(g.container)}><label><calcite-input clearable .disabled=${e} .icon=${y.search} .label=${this.label ?? this.messages.label} .messageOverrides=${{ clear: this.messages.clear }} @keydown=${this.keyDownHandler} @calciteInputInput=${this.inputHandler} .placeholder=${this.placeholder} .scale=${t} type=text .value=${this.value} ${u(this.textInput)}></calcite-input></label></div>` });
  }
}
d("calcite-filter", D);
export {
  D as Filter
};
