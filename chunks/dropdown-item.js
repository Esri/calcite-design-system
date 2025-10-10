import { b as g, L as k, c as s, s as i, x as n, z as l, A as I, q as D } from "./index.js";
import { e as x, n as y } from "./ref.js";
import { t as E } from "./dom.js";
import { g as r } from "./component.js";
import { u as $, I as C } from "./interactive.js";
import { u as S } from "./useSetFocus.js";
import { C as o, I as f } from "./resources9.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const q = g`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;flex-grow:1;align-items:center;outline-color:transparent}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-3));text-align:start;outline-color:transparent}.container a{outline:none;position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-3))}.dropdown-item-content{flex:1 1 auto;padding-block:.125rem}.dropdown-item-icon{position:relative;opacity:0;transition-timing-function:cubic-bezier(.4,0,.2,1);transform:scale(.9)}:host([scale=s]) .container{padding-block:.25rem;padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .dropdown-item-icon,:host([scale=s]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-block:.5rem;padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .dropdown-item-icon,:host([scale=m]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-block:.625rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .dropdown-item-icon,:host([scale=l]) .dropdown-item-icon--start{padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .dropdown-item-icon--end{padding-inline-start:var(--calcite-spacing-lg)}:host(:focus) .container{text-decoration-line:none;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:hover:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-hover, var(--calcite-color-foreground-2))}:host(:active:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-press, var(--calcite-color-foreground-3))}:host(:hover:not([disabled])) .container,:host(:active:not([disabled])) .container{text-decoration-line:none;color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .dropdown-link,:host(:active:not([disabled])) .dropdown-link{color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host([selected]) .container:not(.container--none-selection),:host([selected]) .dropdown-link{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host([selected]) .container:not(.container--none-selection) calcite-icon,:host([selected]) .dropdown-link calcite-icon{color:var(--calcite-dropdown-item-icon-color-press, var(--calcite-color-brand))}:host(:hover:not([disabled])) .dropdown-item-icon{color:var(--calcite-dropdown-item-icon-color-hover)}:host([selected]) .dropdown-item-icon{opacity:1}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class R extends k {
  constructor() {
    super(), this.childLinkRef = x(), this.focusSetter = S()(this), this.disabled = !1, this.scale = "m", this.selected = !1, this.selectionMode = "single", this.calciteDropdownItemSelect = s({ cancelable: !1 }), this.calciteInternalDropdownCloseRequest = s({ cancelable: !1 }), this.calciteInternalDropdownItemKeyEvent = s({ cancelable: !1 }), this.calciteInternalDropdownItemSelect = s({ cancelable: !1 }), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler), this.listenOn(document.body, "calciteInternalDropdownItemChange", this.updateActiveItemOnChange);
  }
  static {
    this.properties = { disabled: 7, href: 3, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], label: 1, rel: 3, scale: 3, selected: 7, selectionMode: 1, target: 3 };
  }
  static {
    this.styles = q;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.initialize();
  }
  load() {
    this.initialize();
  }
  updated() {
    $(this);
  }
  onClick() {
    this.emitRequestedItem();
  }
  keyDownHandler(e) {
    switch (e.key) {
      case " ":
      case "Enter":
        this.emitRequestedItem(), this.href && this.childLinkRef.value.click(), e.preventDefault();
        break;
      case "Escape":
        this.calciteInternalDropdownCloseRequest.emit(), e.preventDefault();
        break;
      case "Tab":
        this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: e });
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        e.preventDefault(), this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: e });
        break;
    }
  }
  updateActiveItemOnChange(e) {
    e.composedPath().includes(this.parentDropdownGroupEl) && (this.requestedDropdownGroup = e.detail.requestedDropdownGroup, this.requestedDropdownItem = e.detail.requestedDropdownItem, this.determineActiveItem()), e.stopPropagation();
  }
  initialize() {
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group"), this.selectionMode === "none" && (this.selected = !1);
  }
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multiple":
        this.el === this.requestedDropdownItem && (this.selected = !this.selected);
        break;
      case "single":
        this.el === this.requestedDropdownItem ? this.selected = !0 : this.requestedDropdownGroup === this.parentDropdownGroupEl && (this.selected = !1);
        break;
      case "none":
        this.selected = !1;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteDropdownItemSelect.emit(), this.calciteInternalDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.parentDropdownGroupEl
    });
  }
  render() {
    const { href: e, selectionMode: t, label: d, iconFlipRtl: c } = this, h = n`<calcite-icon class=${i(o.iconStart)} .flipRtl=${c === "start" || c === "both"} .icon=${this.iconStart} .scale=${r(this.scale)}></calcite-icon>`, a = n`<span class=${i(o.itemContent)}><slot></slot></span>`, p = n`<calcite-icon class=${i(o.iconEnd)} .flipRtl=${c === "end" || c === "both"} .icon=${this.iconEnd} .scale=${r(this.scale)}></calcite-icon>`, m = this.iconStart && this.iconEnd ? [h, a, p] : this.iconStart ? [h, a] : this.iconEnd ? [a, p] : a, w = e ? n`<a .ariaLabel=${d} class=${i(o.link)} href=${e ?? l} rel=${this.rel ?? l} tabindex=-1 target=${this.target ?? l} ${y(this.childLinkRef)}>${m}</a>` : m, b = e ? null : t === "single" ? "menuitemradio" : t === "multiple" ? "menuitemcheckbox" : "menuitem", v = t !== "none" ? E(this.selected) : null, { disabled: u } = this;
    return this.el.ariaChecked = v, this.el.ariaLabel = e ? "" : d, this.el.role = b, I(this.el, "tabIndex", u ? -1 : 0), C({ disabled: u, children: n`<div class=${i({
      [o.container]: !0,
      [o.containerNone]: t === "none"
    })}>${t !== "none" ? n`<calcite-icon class=${i(o.icon)} .icon=${t === "multiple" ? f.check : f.bulletPoint} .scale=${r(this.scale)}></calcite-icon>` : null}${w}</div>` });
  }
}
D("calcite-dropdown-item", R);
export {
  R as DropdownItem
};
