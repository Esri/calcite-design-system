import { c as k, L as I, h as b, s as i, x as o, k as S, E as y, d as L } from "./iframe.js";
import { i as n } from "./keyed.js";
import { g as H } from "./guid.js";
import { u as M, I as R } from "./interactive.js";
import { e as T, i as E, f as q } from "./utils5.js";
import { w as D, g as m } from "./component.js";
import { u as F } from "./dom.js";
import { h as s } from "./text.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const t = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  iconCustom: "icon--custom",
  description: "description",
  icon: "icon",
  label: "label",
  scale: (r) => `scale--${r}`,
  shortText: "short-text",
  single: "label--single",
  textContainer: "text-container",
  heading: "heading"
}, u = {
  contentEnd: "content-end",
  contentStart: "content-start"
}, P = k`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-s: .25rem;--calcite-combobox-item-spacing-unit-l: .5rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-s: .375rem;--calcite-combobox-item-spacing-unit-l: .75rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-s: .625rem;--calcite-combobox-item-spacing-unit-l: 1rem;--calcite-combobox-item-selector-icon-size: 1.5rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size)}.container{--calcite-combobox-item-indent-value: calc( var(--calcite-combobox-item-spacing-unit-l) * var(--calcite-combobox-item-spacing-indent-multiplier) )}:host(:focus){--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;text-decoration-line:none;transition-timing-function:cubic-bezier(.4,0,.2,1);outline-color:transparent;word-wrap:break-word;word-break:break-word;justify-content:space-around;gap:var(--calcite-combobox-item-spacing-unit-l);padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline-end:var(--calcite-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-indent-value);color:var(--calcite-combobox-text-color, var(--calcite-color-text-3));transition-duration:var(--calcite-animation-timing)}:host([disabled]) .label{cursor:default}.label--active{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.label:hover{background-color:var(--calcite-combobox-item-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}.label:active{background-color:var(--calcite-combobox-item-background-color-active, var(--calcite-color-foreground-3))}:host([selected]) .label,.label:active{color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}:host([selected]) .label .description,:host([selected]) .label .short-text,.label:active .description,.label:active .short-text{color:var(--calcite-combobox-description-text-color-press, var(--calcite-color-text-2))}.icon{display:inline-flex;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-color-border-input)}:host([selected]) .icon{color:var(--calcite-combobox-selected-icon-color, var(--calcite-color-brand))}.icon--custom{margin-block-start:-1px}.center-content{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.description{font-size:var(--calcite-internal-combobox-item-description-font-size)}.short-text{white-space:nowrap}.heading{color:var(--calcite-combobox-heading-text-color, var(--calcite-color-text-1))}.description,.short-text{color:var(--calcite-combobox-description-text-color, var(--calcite-color-text-3))}:host([selected]) .heading{font-weight:var(--calcite-font-weight-medium)}.heading,.description,.short-text{line-height:var(--calcite-font-line-height-relative-snug)}:host([item-hidden]){display:none}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}`;
class _ extends I {
  constructor() {
    super(...arguments), this.hasContent = !1, this._selected = !1, this.active = !1, this.disabled = !1, this.guid = H(), this.iconFlipRtl = !1, this.scale = "m", this.selectionMode = "multiple", this.itemHidden = !1, this.calciteComboboxItemChange = b({ cancelable: !1 }), this.calciteInternalComboboxItemChange = b({ cancelable: !1 });
  }
  static {
    this.properties = { hasContent: 16, active: 7, ancestors: 0, description: 1, disabled: 7, filterDisabled: 7, filterTextMatchPattern: 2, guid: 3, heading: 1, icon: 3, iconFlipRtl: 7, label: 1, metadata: 0, scale: 1, selected: 7, selectionMode: 3, shortHeading: 1, textLabel: 3, value: 1, itemHidden: 7 };
  }
  static {
    this.styles = P;
  }
  /** When `true`, the component is selected. */
  get selected() {
    return this._selected;
  }
  set selected(e) {
    const c = this._selected;
    e !== c && (this._selected = e, this.emitItemChange());
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.ancestors = T(this.el);
  }
  load() {
    D(this, "value", "textLabel");
  }
  willUpdate(e) {
    this.hasUpdated && (e.has("disabled") || e.has("heading") || e.has("label") || e.has("textLabel")) && this.emitItemChange();
  }
  updated() {
    M(this);
  }
  // #endregion
  // #region Private Methods
  emitItemChange() {
    this.calciteInternalComboboxItemChange.emit();
  }
  handleDefaultSlotChange(e) {
    this.hasContent = F(e);
  }
  toggleSelected() {
    const e = this.selectionMode === "single-persist";
    this.disabled || e && this.selected || (this.selected = !this.selected, this.calciteComboboxItemChange.emit());
  }
  itemClickHandler() {
    this.toggleSelected();
  }
  // #endregion
  // #region Rendering
  renderIcon(e) {
    return this.icon ? n("icon", o`<calcite-icon class=${i({
      [t.iconCustom]: !!this.icon
    })} .flipRtl=${this.iconFlipRtl} .icon=${this.icon || e} .scale=${m(this.scale)}></calcite-icon>`) : null;
  }
  renderSelectIndicator(e) {
    return n("indicator", o`<calcite-icon class=${i({
      [t.icon]: !0
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} .scale=${m(this.scale)}></calcite-icon>`);
  }
  renderChildren() {
    return n("default-slot-container", o`<ul .hidden=${!this.hasContent}><slot @slotchange=${this.handleDefaultSlotChange}></slot></ul>`);
  }
  render() {
    const { disabled: e, heading: c, label: p, textLabel: g, value: x, filterTextMatchPattern: a, description: d, shortHeading: h } = this, l = E(this.selectionMode), v = e || l ? void 0 : "check-square-f", f = l ? this.selected ? "circle-inset-large" : "circle" : this.selected ? "check-square-f" : "square", C = c || g, $ = p || x, w = {
      [t.label]: !0,
      [t.active]: this.active,
      [t.single]: l
    }, z = q(this.el);
    return this.el.ariaHidden = "true", this.el.ariaLabel = $, R({ disabled: e, children: o`<div class=${i({
      [t.container]: !0,
      [t.scale(this.scale)]: !0
    })} style=${S({ "--calcite-combobox-item-spacing-indent-multiplier": `${z}` })}><li class=${i(w)} id=${this.guid ?? y} @click=${this.itemClickHandler}>${this.renderSelectIndicator(f)}<slot name=${u.contentStart}></slot>${this.renderIcon(v)}<div class=${i(t.centerContent)}><div class=${i(t.heading)}>${s({
      text: C,
      pattern: a
    })}</div>${d ? o`<div class=${i(t.description)}>${s({
      text: d,
      pattern: a
    })}</div>` : null}</div>${h ? o`<div class=${i(t.shortText)}>${s({
      text: h,
      pattern: a
    })}</div>` : null}<slot name=${u.contentEnd}></slot></li>${this.renderChildren()}</div>` });
  }
}
L("calcite-combobox-item", _);
export {
  _ as ComboboxItem
};
