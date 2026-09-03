/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as w, c as m, s as o, b as n, I as s, O as x, d as k } from "./index.js";
import { e as I, n as D } from "./ref.js";
import { t as $ } from "./aria.js";
import { g as l } from "./component.js";
import { u as E } from "./useSetFocus.js";
import { u as y } from "./useInteractive.js";
import { C as t, I as C } from "./resources17.js";
const S = b`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;flex-grow:1;align-items:center;outline:2px solid transparent;outline-offset:2px}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-1));text-align:start}.container a{outline:none;position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-1))}.content{flex:1 1 auto}.icon{position:relative;opacity:0;transition-timing-function:cubic-bezier(.4,0,.2,1);transform:scale(.9)}.icon--start,.icon--end{--calcite-icon-color: var(--calcite-dropdown-item-text-color, var(--calcite-color-text-3))}:host([scale=s]) .container{padding-block:.25rem;padding-inline:.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) .icon,:host([scale=s]) .icon--start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .icon--end{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-block:.5rem;padding-inline:.75rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) .icon,:host([scale=m]) .icon--start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .icon--end{padding-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-block:var(--calcite-space-sm-plus);padding-inline:1rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .icon,:host([scale=l]) .icon--start{padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .icon--end{padding-inline-start:var(--calcite-spacing-lg)}:host(:focus) .container,:host([active-descendant]) .container{text-decoration-line:none;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:hover:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-hover, var(--calcite-color-foreground-2))}:host(:active:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-press, var(--calcite-color-foreground-3))}:host(:hover:not([disabled])) .container,:host(:active:not([disabled])) .container{text-decoration-line:none;color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .icon--start,:host(:hover:not([disabled])) .icon--end,:host(:active:not([disabled])) .icon--start,:host(:active:not([disabled])) .icon--end{--calcite-icon-color: var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .link,:host(:active:not([disabled])) .link{color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host([selected]) .container:not(.container--none-selection),:host([selected]) .link{font-weight:var(--calcite-font-weight-medium);--calcite-internal-dropdown-item-text-color: var( --calcite-dropdown-item-text-color-press, var(--calcite-color-text-1) );color:var(--calcite-internal-dropdown-item-text-color)}:host([selected]) .container:not(.container--none-selection) .icon,:host([selected]) .link .icon{--calcite-icon-color: var(--calcite-dropdown-item-icon-color-press, var(--calcite-color-brand))}:host([selected]) .container:not(.container--none-selection) .icon--start,:host([selected]) .container:not(.container--none-selection) .icon--end,:host([selected]) .link .icon--start,:host([selected]) .link .icon--end{--calcite-icon-color: var(--calcite-internal-dropdown-item-text-color)}:host(:hover:not([disabled])) .icon{--calcite-icon-color: var(--calcite-dropdown-item-icon-color-hover)}:host([selected]) .icon{opacity:1}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class q extends w {
  constructor() {
    super(), this.childLinkRef = I(), this.focusSetter = E()(this), this.interactiveContainer = y(this), this.disabled = !1, this.activeDescendant = !1, this.scale = "m", this.selected = !1, this.selectionMode = "single", this.calciteDropdownItemSelect = m({ cancelable: !1 }), this.calciteInternalDropdownItemSelect = m({ cancelable: !1 }), this.listen("click", this.onClick), this.listenOn(document.body, "calciteInternalDropdownItemChange", this.updateActiveItemOnChange);
  }
  static {
    this.properties = { disabled: 7, activeDescendant: 7, href: 3, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, label: 1, rel: 3, scale: 3, selected: 7, selectionMode: 1, target: 3 };
  }
  static {
    this.styles = S;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async activateItem() {
    if (!this.disabled) {
      if (this.href) {
        this.childLinkRef.value?.click();
        return;
      }
      this.emitRequestedItem();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.initialize();
  }
  load() {
    this.initialize();
  }
  onClick() {
    this.emitRequestedItem();
  }
  updateActiveItemOnChange(e) {
    this.parentDropdownGroupEl && e.composedPath().includes(this.parentDropdownGroupEl) && (this.requestedDropdownGroup = e.detail.requestedDropdownGroup, this.requestedDropdownItem = e.detail.requestedDropdownItem, this.determineActiveItem()), e.stopPropagation();
  }
  initialize() {
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group") ?? void 0, this.selectionMode === "none" && (this.selected = !1);
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
    const { href: e, selectionMode: i, label: r, iconFlipRtl: c } = this, d = n`<calcite-icon class=${o(t.iconStart)} .flipRtl=${c === "start" || c === "both"} .icon=${this.iconStart} .scale=${l(this.scale)}></calcite-icon>`, a = n`<span class=${o(t.itemContent)}><slot></slot></span>`, h = n`<calcite-icon class=${o(t.iconEnd)} .flipRtl=${c === "end" || c === "both"} .icon=${this.iconEnd} .scale=${l(this.scale)}></calcite-icon>`, p = this.iconStart && this.iconEnd ? [d, a, h] : this.iconStart ? [d, a] : this.iconEnd ? [a, h] : a, u = e ? n`<a .ariaLabel=${r} class=${o(t.link)} href=${e ?? s} rel=${this.rel ?? s} tabindex=-1 target=${this.target ?? s} ${D(this.childLinkRef)}>${p}</a>` : p, v = e ? null : i === "single" ? "menuitemradio" : i === "multiple" ? "menuitemcheckbox" : "menuitem", f = i !== "none" ? $(this.selected) : null, { disabled: g } = this;
    return this.el.ariaChecked = f, this.el.ariaLabel = e ? "" : r ?? null, this.el.role = v, x(this.el, "tabIndex", -1), this.interactiveContainer({ disabled: g, children: n`<div class=${o({
      [t.container]: !0,
      [t.containerNone]: i === "none"
    })}>${i !== "none" ? n`<calcite-icon class=${o(t.icon)} .icon=${C.check} .scale=${l(this.scale)}></calcite-icon>` : null}${u}</div>` });
  }
}
k("calcite-dropdown-item", q);
export {
  q as DropdownItem
};
