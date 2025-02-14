import { j as s, L as l, n, x as r, s as o, D as c, k as d } from "./iframe.js";
import { e as h, n as p } from "./ref.js";
import { f as a } from "./filter.js";
import { u, I as m } from "./interactive.js";
import { c as f } from "./component.js";
import { u as b } from "./useT9n.js";
import { d as v } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const g = {
  container: "container"
}, y = {
  search: "search"
}, x = s`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%}:host([scale=s]) .container{padding:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding:var(--calcite-spacing-md)}:host([scale=l]) .container{padding:var(--calcite-spacing-lg)}label{position:relative;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{margin-block-end:.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1);padding-inline-end:.25rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing),box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-color-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing),inset-inline-end var(--calcite-animation-timing),opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-color-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:.25rem}input[type=text]:focus~.search-icon{inset-inline-start:-1rem;opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-color-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}`;
class k extends l {
  constructor() {
    super(...arguments), this.filterDebounced = v((e, t = !1, i) => this.updateFiltered(a(this.items ?? [], e, this.filterProps), t, i), c.filter), this.textInput = h(), this._value = "", this.disabled = !1, this.filteredItems = [], this.items = [], this.messages = b(), this.scale = "m", this.calciteFilterChange = n({ cancelable: !1 });
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
      this.value = e, this.updateFiltered(a(this.items ?? [], e, this.filterProps), !1, t);
    });
  }
  /** Sets focus on the component. */
  async setFocus() {
    return await f(this), this.textInput.value?.setFocus();
  }
  // #endregion
  // #region Lifecycle
  async load() {
    this.updateFiltered(a(this.items ?? [], this.value, this.filterProps));
  }
  willUpdate(e) {
    (e.has("items") && (this.hasUpdated || this.items?.length > 0) || e.has("filterProps")) && this.filterDebounced(this.value);
  }
  updated() {
    u(this);
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
  updateFiltered(e, t = !1, i) {
    this.filteredItems = e, t && this.calciteFilterChange.emit(), i?.();
  }
  // #endregion
  // #region Rendering
  render() {
    const { disabled: e, scale: t } = this;
    return m({ disabled: e, children: r`<div class=${o(g.container)}><label><calcite-input clearable .disabled=${e} .icon=${y.search} .label=${this.label ?? this.messages.label} .messageOverrides=${{ clear: this.messages.clear }} @keydown=${this.keyDownHandler} @calciteInputInput=${this.inputHandler} .placeholder=${this.placeholder} .scale=${t} type=text .value=${this.value} ${p(this.textInput)}></calcite-input></label></div>` });
  }
}
d("calcite-filter", k);
export {
  k as Filter
};
