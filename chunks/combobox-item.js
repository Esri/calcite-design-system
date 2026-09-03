/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as S, L as z, c as g, s as i, b as c, A as y, J as I, d as H } from "./index.js";
import { i as s } from "./keyed.js";
import { g as M } from "./guid.js";
import { d as T, i as A, e as L } from "./utils.js";
import { g as u } from "./component.js";
import { u as R } from "./dom.js";
import { h as r } from "./text.js";
import { u as _ } from "./useInteractive.js";
const t = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  iconCustom: "icon--custom",
  description: "description",
  icon: "icon",
  label: "label",
  containerHighlightSelected: "container--highlight-selected",
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
}, D = "--calcite-combobox-item-spacing-indent-multiplier", E = S`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);--calcite-internal-combobox-item-spacing-unit-s: .25rem;--calcite-internal-combobox-item-spacing-unit-l: .5rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);--calcite-internal-combobox-item-spacing-unit-s: .375rem;--calcite-internal-combobox-item-spacing-unit-l: .75rem;--calcite-combobox-item-selector-icon-size: 1rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);--calcite-internal-combobox-item-spacing-unit-s: var(--calcite-space-sm-plus);--calcite-internal-combobox-item-spacing-unit-l: 1rem;--calcite-combobox-item-selector-icon-size: 1.5rem;--calcite-internal-combobox-item-description-font-size: var(--calcite-font-size)}.container{--calcite-combobox-item-indent-value: calc( var(--calcite-internal-combobox-item-spacing-unit-l) * var(--calcite-combobox-item-spacing-indent-multiplier) )}:host(:focus){--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;text-decoration-line:none;transition-timing-function:cubic-bezier(.4,0,.2,1);outline-color:transparent;overflow-wrap:break-word;word-break:break-word;justify-content:space-around;gap:var(--calcite-internal-combobox-item-spacing-unit-l);padding-block:var(--calcite-internal-combobox-item-spacing-unit-s);padding-inline-end:var(--calcite-internal-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-indent-value);color:var(--calcite-combobox-text-color, var(--calcite-color-text-3));transition-duration:var(--calcite-animation-timing)}:host([disabled]) .label{cursor:default}.label--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.label:hover{background-color:var(--calcite-combobox-item-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}.label:active{background-color:var(--calcite-combobox-item-background-color-active, var(--calcite-color-foreground-3))}:host([selected]) .label,.label:active{color:var(--calcite-combobox-text-color-hover, var(--calcite-color-text-1))}:host([selected]) .label .description,:host([selected]) .label .short-text,.label:active .description,.label:active .short-text{color:var(--calcite-combobox-description-text-color-press, var(--calcite-color-text-2))}.icon{display:inline-flex;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-color-border-input)}:host([selected]) .icon,:host([indeterminate]) .icon{color:var(--calcite-combobox-selected-icon-color, var(--calcite-color-brand))}.icon--custom{margin-block-start:-1px}.center-content{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.description{font-size:var(--calcite-internal-combobox-item-description-font-size)}.short-text{white-space:nowrap}.heading{color:var(--calcite-combobox-heading-text-color, var(--calcite-color-text-1))}.description,.short-text{color:var(--calcite-combobox-description-text-color, var(--calcite-color-text-3))}:host([selected]) .heading{font-weight:var(--calcite-font-weight-medium)}.heading,.description,.short-text{line-height:var(--calcite-font-line-height-relative-snug)}.container--highlight-selected{background-color:var(--calcite-color-surface-highlight)}:host([item-hidden]){display:none}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}`;
class F extends z {
  constructor() {
    super(...arguments), this._selected = !1, this.interactiveContainer = _(this), this.hasContent = !1, this.active = !1, this.disabled = !1, this.filterDisabled = !1, this.guid = M(), this.iconFlipRtl = !1, this.scale = "m", this.selectionMode = "multiple", this.selectionAppearance = "icon", this.itemHidden = !1, this.indeterminate = !1, this.calciteComboboxItemChange = g({ cancelable: !1 }), this.calciteInternalComboboxItemChange = g({ cancelable: !1 });
  }
  static {
    this.properties = { hasContent: 16, active: 7, ancestors: 0, description: 1, disabled: 7, filterDisabled: 7, filterTextMatchPattern: 3, guid: 3, heading: 1, icon: 3, iconFlipRtl: 7, label: 1, metadata: 0, scale: 1, selected: 7, selectionMode: 3, selectionAppearance: 3, shortHeading: 1, value: 3, itemHidden: 7, indeterminate: 7 };
  }
  static {
    this.styles = E;
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    const a = this._selected;
    e !== a && (this._selected = e, this.emitItemChange());
  }
  get value() {
    return this._value ?? this.heading;
  }
  set value(e) {
    this._value = e ?? this.heading;
  }
  toggleSelection() {
    const e = this.selectionMode === "single-persist";
    this.disabled || e && this.selected || (this.selected = !this.selected, this.calciteComboboxItemChange.emit());
  }
  connectedCallback() {
    super.connectedCallback(), this.ancestors = T(this.el);
  }
  willUpdate(e) {
    this.hasUpdated && (e.has("disabled") || e.has("heading") || e.has("label")) && this.emitItemChange();
  }
  emitItemChange() {
    this.calciteInternalComboboxItemChange.emit();
  }
  handleDefaultSlotChange(e) {
    this.hasContent = R(e);
  }
  itemClickHandler() {
    this.toggleSelection();
  }
  renderIcon(e) {
    return this.icon ? s("icon", c`<calcite-icon class=${i({
      [t.iconCustom]: !!this.icon
    })} .flipRtl=${this.iconFlipRtl} .icon=${this.icon || e} .scale=${u(this.scale)}></calcite-icon>`) : null;
  }
  renderSelectIndicator(e) {
    return this.selectionAppearance === "highlight" ? null : s("indicator", c`<calcite-icon class=${i({
      [t.icon]: !0
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} .scale=${u(this.scale)}></calcite-icon>`);
  }
  renderChildren() {
    return s("default-slot-container", c`<ul .hidden=${!this.hasContent}><slot @slotchange=${this.handleDefaultSlotChange}></slot></ul>`);
  }
  render() {
    const { disabled: e, heading: a, label: v, value: h, filterTextMatchPattern: n, description: m, shortHeading: b } = this, l = A(this.selectionMode), f = e || l ? void 0 : o.checked, x = l ? this.selected ? o.selectedSingle : o.circle : this.indeterminate ? o.indeterminate : this.selected ? o.checked : o.unchecked, C = v || h || a, $ = a || h, w = {
      [t.label]: !0,
      [t.active]: this.active,
      [t.single]: l,
      [t.containerHighlightSelected]: this.selected && this.selectionAppearance === "highlight"
    }, k = L(this.el);
    return this.el.ariaHidden = "true", this.el.ariaLabel = C, this.interactiveContainer({ disabled: e, children: c`<div class=${i({
      [t.container]: !0,
      [t.scale(this.scale)]: !0
    })} style=${I({ [D]: `${k}` })}><li class=${i(w)} id=${this.guid ?? y} @click=${this.itemClickHandler}>${this.renderSelectIndicator(x)}<slot name=${p.contentStart}></slot>${this.renderIcon(f)}<div class=${i(t.centerContent)}><div class=${i(t.heading)}>${r({
      text: $,
      pattern: n
    })}</div>${m ? c`<div class=${i(t.description)}>${r({
      text: m,
      pattern: n
    })}</div>` : null}</div>${b ? c`<div class=${i(t.shortText)}>${r({
      text: b,
      pattern: n
    })}</div>` : null}<slot name=${p.contentEnd}></slot></li>${this.renderChildren()}</div>` });
  }
}
H("calcite-combobox-item", F);
export {
  F as ComboboxItem
};
