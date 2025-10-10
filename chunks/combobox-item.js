import { b as z, L as I, c as b, s as i, x as c, w as y, E as L, q as M } from "./index.js";
import { i as s } from "./keyed.js";
import { g as H } from "./guid.js";
import { u as R, I as T } from "./interactive.js";
import { c as E, i as q, d as D } from "./utils.js";
import { w as F, g as u } from "./component.js";
import { u as P } from "./dom.js";
import { h as r } from "./text.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  iconCustom: "icon--custom",
  description: "description",
  icon: "icon",
  label: "label",
  scale: (d) => `scale--${d}`,
  shortText: "short-text",
  single: "label--single",
  textContainer: "text-container",
  heading: "heading"
}, o = {
  checked: "check-square-f",
  circle: "circle",
  indeterminate: "minus-square-f",
  selectedSingle: "circle-inset-large",
  unchecked: "square"
}, p = {
  contentEnd: "content-end",
  contentStart: "content-start"
}, _ = "--calcite-combobox-item-spacing-indent-multiplier", O = z`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-combobox-item-spacing-unit-s: .25rem;--calcite-internal-combobox-item-spacing-unit-l: .5rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-combobox-item-spacing-unit-s: .375rem;--calcite-internal-combobox-item-spacing-unit-l: .75rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-combobox-item-spacing-unit-s: .625rem;--calcite-internal-combobox-item-spacing-unit-l: 1rem;--calcite-combobox-item-selector-icon-size: 1.5rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size)}.container{--calcite-combobox-item-indent-value: calc( var(--calcite-internal-combobox-item-spacing-unit-l) * var(--calcite-combobox-item-spacing-indent-multiplier) )}:host(:focus){--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;text-decoration-line:none;transition-timing-function:cubic-bezier(.4,0,.2,1);outline-color:transparent;word-wrap:break-word;word-break:break-word;justify-content:space-around;gap:var(--calcite-internal-combobox-item-spacing-unit-l);padding-block:var(--calcite-internal-combobox-item-spacing-unit-s);padding-inline-end:var(--calcite-internal-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-indent-value);color:var(--calcite-combobox-text-color, var(--calcite-color-text-3));transition-duration:var(--calcite-animation-timing)}:host([disabled]) .label{cursor:default}.label--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.label:hover{background-color:var(--calcite-combobox-item-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}.label:active{background-color:var(--calcite-combobox-item-background-color-active, var(--calcite-color-foreground-3))}:host([selected]) .label,.label:active{color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}:host([selected]) .label .description,:host([selected]) .label .short-text,.label:active .description,.label:active .short-text{color:var(--calcite-combobox-description-text-color-press, var(--calcite-color-text-2))}.icon{display:inline-flex;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-color-border-input)}:host([selected]) .icon,:host([indeterminate]) .icon{color:var(--calcite-combobox-selected-icon-color, var(--calcite-color-brand))}.icon--custom{margin-block-start:-1px}.center-content{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.description{font-size:var(--calcite-internal-combobox-item-description-font-size)}.short-text{white-space:nowrap}.heading{color:var(--calcite-combobox-heading-text-color, var(--calcite-color-text-1))}.description,.short-text{color:var(--calcite-combobox-description-text-color, var(--calcite-color-text-3))}:host([selected]) .heading{font-weight:var(--calcite-font-weight-medium)}.heading,.description,.short-text{line-height:var(--calcite-font-line-height-relative-snug)}:host([item-hidden]){display:none}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}`;
class U extends I {
  constructor() {
    super(...arguments), this._selected = !1, this.hasContent = !1, this.active = !1, this.disabled = !1, this.guid = H(), this.iconFlipRtl = !1, this.scale = "m", this.selectionMode = "multiple", this.itemHidden = !1, this.indeterminate = !1, this.calciteComboboxItemChange = b({ cancelable: !1 }), this.calciteInternalComboboxItemChange = b({ cancelable: !1 });
  }
  static {
    this.properties = { hasContent: 16, active: 7, ancestors: 0, description: 1, disabled: 7, filterDisabled: 7, filterTextMatchPattern: 2, guid: 3, heading: 1, icon: [3, { type: String }], iconFlipRtl: 7, label: 1, metadata: 0, scale: 1, selected: 7, selectionMode: 3, shortHeading: 1, textLabel: 3, value: 1, itemHidden: 7, indeterminate: 7 };
  }
  static {
    this.styles = O;
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    const a = this._selected;
    e !== a && (this._selected = e, this.emitItemChange());
  }
  connectedCallback() {
    super.connectedCallback(), this.ancestors = E(this.el);
  }
  load() {
    F(this, "value", "textLabel");
  }
  willUpdate(e) {
    this.hasUpdated && (e.has("disabled") || e.has("heading") || e.has("label") || e.has("textLabel")) && this.emitItemChange();
  }
  updated() {
    R(this);
  }
  emitItemChange() {
    this.calciteInternalComboboxItemChange.emit();
  }
  handleDefaultSlotChange(e) {
    this.hasContent = P(e);
  }
  toggleSelected() {
    const e = this.selectionMode === "single-persist";
    this.disabled || e && this.selected || (this.selected = !this.selected, this.calciteComboboxItemChange.emit());
  }
  itemClickHandler() {
    this.toggleSelected();
  }
  renderIcon(e) {
    return this.icon ? s("icon", c`<calcite-icon class=${i({
      [t.iconCustom]: !!this.icon
    })} .flipRtl=${this.iconFlipRtl} .icon=${this.icon || e} .scale=${u(this.scale)}></calcite-icon>`) : null;
  }
  renderSelectIndicator(e) {
    return s("indicator", c`<calcite-icon class=${i({
      [t.icon]: !0
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} .scale=${u(this.scale)}></calcite-icon>`);
  }
  renderChildren() {
    return s("default-slot-container", c`<ul .hidden=${!this.hasContent}><slot @slotchange=${this.handleDefaultSlotChange}></slot></ul>`);
  }
  render() {
    const { disabled: e, heading: a, label: g, textLabel: v, value: x, filterTextMatchPattern: l, description: h, shortHeading: m } = this, n = q(this.selectionMode), f = e || n ? void 0 : o.checked, C = n ? this.selected ? o.selectedSingle : o.circle : this.indeterminate ? o.indeterminate : this.selected ? o.checked : o.unchecked, $ = a || v, w = g || x, k = {
      [t.label]: !0,
      [t.active]: this.active,
      [t.single]: n
    }, S = D(this.el);
    return this.el.ariaHidden = "true", this.el.ariaLabel = w, T({ disabled: e, children: c`<div class=${i({
      [t.container]: !0,
      [t.scale(this.scale)]: !0
    })} style=${y({ [_]: `${S}` })}><li class=${i(k)} id=${this.guid ?? L} @click=${this.itemClickHandler}>${this.renderSelectIndicator(C)}<slot name=${p.contentStart}></slot>${this.renderIcon(f)}<div class=${i(t.centerContent)}><div class=${i(t.heading)}>${r({
      text: $,
      pattern: l
    })}</div>${h ? c`<div class=${i(t.description)}>${r({
      text: h,
      pattern: l
    })}</div>` : null}</div>${m ? c`<div class=${i(t.shortText)}>${r({
      text: m,
      pattern: l
    })}</div>` : null}<slot name=${p.contentEnd}></slot></li>${this.renderChildren()}</div>` });
  }
}
M("calcite-combobox-item", U);
export {
  U as ComboboxItem
};
