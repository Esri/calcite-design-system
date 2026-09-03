/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as g, c as f, b as n, s as r, F as w, I as u, d as x } from "./index.js";
import { i as l } from "./keyed.js";
import { e as h, n as v } from "./ref.js";
import { u as y } from "./index2.js";
import { b as k } from "./dom.js";
import { g as d } from "./component.js";
import { u as $ } from "./useT9n.js";
import { u as z } from "./useSetFocus.js";
import { C as t, I as o, S as I } from "./resources20.js";
const L = b`:host{--calcite-internal-menu-item-breadcrumb-icon-margin-inline-start: 0;--calcite-internal-menu-item-content-min-block-size: var(--calcite-size-xl);--calcite-internal-menu-item-dropdown-action-block-size: auto;--calcite-internal-menu-item-dropdown-action-divider-inset-block: var(--calcite-spacing-xxs);--calcite-internal-menu-item-dropdown-action-flex: initial;--calcite-internal-menu-item-font-size: var(--calcite-font-size-relative-md);--calcite-internal-menu-item-icon-spacing-start: var(--calcite-space-md);--calcite-internal-menu-item-icon-spacing-end: var(--calcite-space-md);--calcite-internal-menu-item-padding-inline: var(--calcite-space-lg);--calcite-internal-menu-item-border: 1px solid var(--calcite-menu-item-sub-menu-border-color, var(--calcite-color-border-3));position:relative;box-sizing:border-box;display:flex;align-items:center;flex-shrink:0}:host .container,:host .item-content,:host .content{min-block-size:var(--calcite-internal-menu-item-content-min-block-size)}:host([layout=vertical]){--calcite-internal-menu-item-breadcrumb-icon-margin-inline-start: auto;--calcite-internal-menu-item-padding-block: var(--calcite-space-md);--calcite-internal-menu-item-padding-inline: var(--calcite-space-md);inline-size:100%}:host(:not([layout=vertical])){block-size:100%}.container,.item-content{display:flex;block-size:100%;inline-size:100%;flex-direction:row;align-items:stretch}.item-content{background-color:var(--calcite-menu-background-color, var(--calcite-internal-menu-background-color, var(--calcite-color-foreground-1)))}.content{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;text-decoration:none;padding-block-start:var(--calcite-space-base);border-block-end:var(--calcite-space-base) solid var(--calcite-color-transparent);font-size:var(--calcite-internal-menu-item-font-size);line-height:var(--calcite-internal-menu-item-line-height, inherit);padding-inline:var(--calcite-internal-menu-item-padding-inline);background-color:var(--calcite-menu-background-color, var(--calcite-internal-menu-background-color, var(--calcite-color-foreground-1)));color:var(--calcite-menu-text-color, var(--calcite-internal-menu-text-color, var(--calcite-color-text-2)))}.content:hover{--calcite-internal-menu-background-color: var(--calcite-color-foreground-2)}.content:focus{border-block-end-width:4px;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));padding-block-start:var(--calcite-space-2xs);border-block-end-width:var(--calcite-space-2xs)}.content:active{--calcite-internal-menu-background-color: var(--calcite-color-foreground-3);--calcite-internal-menu-text-color: var(--calcite-color-text-1)}.content span{display:inline-flex}.content.layout--vertical{display:flex;inline-size:100%;justify-content:flex-start;padding-block:var(--calcite-internal-menu-item-padding-block);border-block-end:0;border-inline-end:var(--calcite-space-2xs) solid var(--calcite-color-transparent)}:host([scale=s]){--calcite-internal-menu-item-content-min-block-size: 2.25rem;--calcite-internal-menu-item-font-size: var(--calcite-font-size);--calcite-internal-menu-item-icon-spacing-start: var(--calcite-space-sm);--calcite-internal-menu-item-icon-spacing-end: var(--calcite-space-sm);--calcite-internal-menu-item-line-height: var(--calcite-space-lg);--calcite-internal-menu-item-padding-inline: var(--calcite-space-sm);min-block-size:var(--calcite-internal-menu-item-content-min-block-size)}:host([scale=s]:not([layout=vertical])){--calcite-internal-menu-item-dropdown-action-block-size: var(--calcite-space-2xl);--calcite-internal-menu-item-dropdown-action-divider-inset-block: var(--calcite-space-base);--calcite-internal-menu-item-dropdown-action-flex: 0 0 1.75rem}:host([scale=s]:not([layout=vertical])) .icon--dropdown{padding-inline-start:var(--calcite-space-xs)}:host([scale=s]:not([layout=vertical])) .dropdown-action{padding-block:0;padding-inline:0;padding-inline-start:var(--calcite-space-2xs)}:host([scale=s][layout=vertical]){--calcite-internal-menu-item-padding-block: var(--calcite-space-sm);--calcite-internal-menu-item-padding-inline: var(--calcite-space-sm)}:host([scale=s][layout=vertical]) .icon--end~.icon--dropdown{margin-inline-start:var(--calcite-space-sm);padding-inline-start:var(--calcite-space-xs)}:host([breadcrumb][scale=s]){--calcite-internal-menu-item-breadcrumb-icon-margin-inline-start: var(--calcite-space-xs)}:host([breadcrumb][scale=s]:not([layout=vertical])) .content{padding-inline-end:var(--calcite-space-sm)}:host(.is-child[scale=s][layout=vertical]) .parent--vertical{block-size:2.25rem}:host(.is-child[scale=s][layout=vertical]) .content{--calcite-internal-menu-item-content-min-block-size: 2.25rem}:host([scale=s][layout=vertical]):has(.dropdown-action){--calcite-internal-menu-item-dropdown-action-block-size: 2.25rem;--calcite-internal-menu-item-dropdown-action-divider-inset-block: var(--calcite-space-sm);--calcite-internal-menu-item-dropdown-action-flex: 0 0 var(--calcite-size-md)}:host([scale=s][layout=vertical]):has(.dropdown-action) .dropdown-action{align-items:center;box-sizing:border-box;padding-inline:var(--calcite-space-2xs)}:host([scale=s]) .dropdown-action,:host([scale=l]:not([layout=vertical])) .dropdown-action{margin-inline:0;margin-inline-start:var(--calcite-space-px)}:host([scale=s]) .dropdown-action:after,:host([scale=l]:not([layout=vertical])) .dropdown-action:after{inset-inline-start:calc(-1 * var(--calcite-space-px))}:host([scale=s][layout=vertical]) .content:not([href]){padding-inline-end:var(--calcite-space-2xs)}:host([scale=m][layout=vertical]) .content:not([href]){padding-inline-end:var(--calcite-space-sm)}:host([scale=l]){--calcite-internal-menu-item-content-min-block-size: var(--calcite-size-2xl);--calcite-internal-menu-item-font-size: var(--calcite-font-size-lg);--calcite-internal-menu-item-icon-spacing-start: var(--calcite-space-lg);--calcite-internal-menu-item-icon-spacing-end: var(--calcite-space-lg);--calcite-internal-menu-item-line-height: var(--calcite-space-2xl);--calcite-internal-menu-item-padding-inline: var(--calcite-space-lg);min-block-size:var(--calcite-internal-menu-item-content-min-block-size)}:host([scale=l]:not([layout=vertical])){--calcite-internal-menu-item-breadcrumb-icon-margin-inline-start: var(--calcite-space-sm-plus)}:host([scale=l]:not([layout=vertical])) .container,:host([scale=l]:not([layout=vertical])) .item-content,:host([scale=l]:not([layout=vertical])) .content{min-block-size:var(--calcite-size-2xl)}:host([scale=l]:not([layout=vertical])) .icon--dropdown{margin-inline-start:var(--calcite-space-sm-plus);padding-inline-start:0}:host([scale=l]:not([layout=vertical])) .dropdown-action{margin-inline-start:var(--calcite-space-xs)}:host([scale=l]:not([layout=vertical])) .dropdown-action:after{inset-inline-start:calc(-1 * var(--calcite-space-xs))}:host([scale=l][layout=vertical]){--calcite-internal-menu-item-padding-block: var(--calcite-space-lg);--calcite-internal-menu-item-padding-inline: var(--calcite-space-lg)}:host([scale=l][layout=vertical]) .content:has(.icon--end):has(.icon--dropdown) .icon--end~.icon--dropdown{margin-inline-start:var(--calcite-space-lg);padding-inline-start:var(--calcite-space-sm-plus)}:host([scale=l][layout=vertical]) .content:not([href]){padding-inline-end:var(--calcite-space-md)}:host([scale=l][layout=vertical]) .dropdown-action{margin-inline-end:0;padding-inline:var(--calcite-space-xs)}:host([scale=l]:not([layout=vertical])):has(.dropdown-action){--calcite-internal-menu-item-dropdown-action-block-size: var(--calcite-size-lg);--calcite-internal-menu-item-dropdown-action-divider-inset-block: var(--calcite-space-xs);--calcite-internal-menu-item-dropdown-action-flex: 0 0 3.125rem}:host([scale=l]:not([layout=vertical])):has(.dropdown-action) .content{padding-inline-end:var(--calcite-space-xl)}:host([scale=l]:not([layout=vertical])):has(.dropdown-action) .dropdown-action{box-sizing:border-box;padding-inline-start:var(--calcite-space-xs)}:host([scale=l][layout=vertical]):is([slot=submenu-item],.is-child) .parent--vertical{padding-inline-start:var(--calcite-size-md)}:host([active]) .content{--calcite-internal-menu-text-color: var(--calcite-color-text-1);border-color:var(--calcite-menu-item-accent-color, var(--calcite-color-brand))}:host([active]) .icon{--calcite-internal-menu-item-icon-color: var( --calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-brand)) )}:host([active][scale=l][layout=vertical]) .content{border-inline-end-color:var(--calcite-menu-item-accent-color, var(--calcite-color-brand))}:host(.is-child[layout=vertical]) .parent--vertical{box-sizing:border-box;padding-inline-start:var(--calcite-space-xl)}:host([slot=submenu-item]) .parent--vertical{padding-inline-start:1.5rem}:host([layout=vertical]) .text-container{flex:1}:host([scale=m][layout=vertical]) .text-container{flex:0 1 auto}.icon{color:var(--calcite-menu-text-color, var(--calcite-icon-color, var(--calcite-internal-menu-item-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-text-3)))))}.icon--start{margin-inline-end:var(--calcite-internal-menu-item-icon-spacing-start)}.icon--end{margin-inline-start:var(--calcite-internal-menu-item-icon-spacing-end)}:host([layout=vertical]) .icon--end{padding-inline-start:0;--calcite-internal-menu-item-icon-spacing-end: auto}:host([layout=vertical][scale=m]) .icon--end{padding-inline-start:.75rem}.icon--dropdown{position:relative;margin-inline-start:auto;margin-inline-end:0px;padding-inline-start:.5rem}:host([layout=vertical]) .icon--end~.icon--dropdown{margin-inline-start:.75rem}:host([layout=vertical]) .hover-href-icon{padding-inline-start:.5rem}:host([layout=vertical]) .hover-href-icon~.icon--end{--calcite-internal-menu-item-icon-spacing-start: var(--calcite-space-sm)}:host([layout=vertical]) .hover-href-icon~.icon--breadcrumb{margin-inline-start:.75rem}.icon--breadcrumb{margin-inline-start:var(--calcite-internal-menu-item-breadcrumb-icon-margin-inline-start);padding-inline-start:0;margin-inline-end:0px}:host([scale=m]) .icon--breadcrumb{padding-inline-start:.5rem}:host([breadcrumb][scale=l][layout=vertical]) .icon--breadcrumb{margin-inline-start:var(--calcite-space-sm-plus)}:host([layout=vertical]) .icon--breadcrumb~.icon--dropdown{margin-inline-start:.5rem}:host([layout=vertical]) .icon--end~.icon--breadcrumb{margin-inline-start:.5rem}:host([breadcrumb]) .content{padding-inline-end:.75rem}.dropdown-action{position:relative;align-self:center;--calcite-action-background-color: var(--calcite-menu-background-color);--calcite-action-text-color: var(--calcite-menu-text-color);block-size:var(--calcite-internal-menu-item-dropdown-action-block-size);flex:var(--calcite-internal-menu-item-dropdown-action-flex);margin-inline-start:var(--calcite-spacing-xxs)}.dropdown-action:after{position:absolute;display:block;inline-size:1px;content:"";inset-inline-start:calc(-1 * var(--calcite-spacing-xxs));inset-block:var(--calcite-internal-menu-item-dropdown-action-divider-inset-block);background-color:var(--calcite-color-border-3)}.dropdown-action:active{--calcite-action-background-color-press: var(--calcite-menu-background-color)}:host([layout=vertical]) .dropdown-action{margin-inline-end:var(--calcite-spacing-xxs)}.dropdown-menu-items{position:absolute;display:none;block-size:auto;min-inline-size:100%;flex-direction:column;overflow:visible;box-shadow:var(--calcite-shadow-md);border:var(--calcite-internal-menu-item-border);border-radius:var(--calcite-menu-item-sub-menu-corner-radius, var(--calcite-corner-radius));inset-block-start:100%;z-index:var(--calcite-z-index-dropdown)}.dropdown-menu-items.open{display:block}.dropdown-menu-items.nested{position:absolute;inset-block-start:-1px;transform:translate(calc(100% - 2px))}.parent--vertical{flex-direction:column}.dropdown--vertical.dropdown-menu-items{position:relative;box-shadow:none;inset-block-start:0;transform:none}.dropdown--vertical.dropdown-menu-items:last-of-type{border-inline:0}:host([layout=vertical]:last-of-type) .dropdown-menu-items{border-block-end:0}:host([layout=vertical]) .dropdown--vertical.dropdown-menu-items{border:none}:host([layout=vertical]) .dropdown--vertical.dropdown-menu-items:after{content:"";border-block-start:var(--calcite-internal-menu-item-border);position:absolute;inset-block-start:0;inset-inline:var(--calcite-space-md) 0}.dropdown-menu-items.nested.calcite--rtl{transform:translate(calc(-100% + 2px))}.dropdown--vertical.dropdown-menu-items.nested.calcite--rtl{transform:none}.hover-href-icon{position:relative;inset-inline-end:.25rem;margin-inline-start:auto;opacity:0;transition:all var(--calcite-internal-animation-timing-medium) ease-in-out}.content:focus .hover-href-icon,.content:hover .hover-href-icon{inset-inline-end:-.25rem;opacity:1}:host([hidden]){display:none}[hidden]{display:none}`;
class S extends g {
  constructor() {
    super(), this.anchorRef = h(), this.direction = y(), this.dropdownActionRef = h(), this.isFocused = !1, this.messages = $(), this.focusSetter = z()(this), this.hasSubmenu = !1, this.active = !1, this.breadcrumb = !1, this.isTopLevelItem = !1, this.open = !1, this.scale = "m", this.calciteMenuItemSelect = f(), this.listenOn(window, "click", this.handleClickOut), this.listen("focusout", this.handleFocusOut), this.listen("blur", this.blurHandler), this.listen("focus", this.focusHandler);
  }
  static {
    this.properties = { hasSubmenu: 16, submenuItems: 16, active: 7, breadcrumb: 7, href: 1, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, isTopLevelItem: 5, label: 1, layout: 3, messageOverrides: 0, open: 7, scale: 3, rel: 3, target: 3, text: 1, topLevelMenuLayout: 1 };
  }
  static {
    this.styles = L;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.anchorRef.value, e);
  }
  handleClickOut(e) {
    this.topLevelMenuLayout !== "vertical" && this.hasSubmenu && this.open && !e.composedPath().includes(this.el) && (this.open = !1);
  }
  handleFocusOut(e) {
    this.topLevelMenuLayout !== "vertical" && !this.el.contains(e.relatedTarget) && (this.open = !1);
  }
  blurHandler() {
    this.isFocused = !1;
  }
  clickHandler(e) {
    (this.href && e.target === this.dropdownActionRef.value || !this.href && this.hasSubmenu) && (this.open = !this.open), this.selectMenuItem(e);
  }
  focusHandler(e) {
    const i = e.target;
    this.isFocused = !0, i.open && !this.open && (i.open = !1);
  }
  handleMenuItemSlotChange(e) {
    this.submenuItems = k(e), this.submenuItems.forEach((i) => {
      i.topLevelMenuLayout || (i.topLevelMenuLayout = this.topLevelMenuLayout);
    }), this.hasSubmenu = this.submenuItems.length > 0;
  }
  async keyDownHandler(e) {
    const { hasSubmenu: i, href: a, layout: p, open: m } = this, c = e.key, s = e.target === this.dropdownActionRef.value;
    if (!e.defaultPrevented) {
      if (c === " " || c === "Enter")
        i && (!a || a && s) && (this.open = !m), !(a && s) && c !== "Enter" && this.selectMenuItem(e), (c === " " || a && s) && e.preventDefault();
      else if (c === "Escape") {
        if (m) {
          this.open = !1, e.preventDefault();
          return;
        }
      } else if (c === "ArrowDown" || c === "ArrowUp") {
        if ((s || !a) && i && !m && p === "horizontal") {
          this.open = !0, e.preventDefault();
          return;
        }
      } else if (c === "ArrowRight" && (s || !a) && i && !m && p === "vertical") {
        this.open = !0, e.preventDefault();
        return;
      }
    }
  }
  selectMenuItem(e) {
    e.target !== this.dropdownActionRef.value && this.calciteMenuItemSelect.emit();
  }
  renderIconStart() {
    return l(t.iconStart, n`<calcite-icon class=${`${t.icon} ${t.iconStart}`} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${d(this.scale)}></calcite-icon>`);
  }
  renderIconEnd() {
    return l(t.iconEnd, n`<calcite-icon class=${`${t.icon} ${t.iconEnd}`} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${d(this.scale)}></calcite-icon>`);
  }
  renderBreadcrumbIcon(e) {
    return l(t.iconBreadcrumb, n`<calcite-icon class=${`${t.icon} ${t.iconBreadcrumb}`} .icon=${e === "rtl" ? o.chevronLeft : o.chevronRight} .scale=${d(this.scale)}></calcite-icon>`);
  }
  renderDropdownIcon(e) {
    const i = e === "rtl" ? "chevron-left" : "chevron-right";
    return l(t.iconDropdown, n`<calcite-icon class=${`${t.icon} ${t.iconDropdown}`} .icon=${this.topLevelMenuLayout === "vertical" || this.isTopLevelItem ? this.open ? o.chevronUp : o.chevronDown : i} .scale=${d(this.scale)}></calcite-icon>`);
  }
  renderDropdownAction(e) {
    const i = e === "rtl" ? "chevron-left" : "chevron-right";
    return l(t.dropdownAction, n`<calcite-action .aria=${{ expanded: this.open }} class=${r(t.dropdownAction)} .icon=${this.topLevelMenuLayout === "vertical" || this.isTopLevelItem ? this.open ? o.chevronUp : o.chevronDown : i} @click=${this.clickHandler} @keydown=${this.keyDownHandler} .scale=${this.scale} .text=${this.messages.open} ${v(this.dropdownActionRef)}></calcite-action>`);
  }
  renderSubmenuItems(e) {
    return n`<calcite-menu class=${r({
      [t.dropdownMenuItems]: !0,
      [t.open]: this.open,
      [t.nested]: !this.isTopLevelItem,
      [w.rtl]: e === "rtl",
      [t.dropdownVertical]: this.topLevelMenuLayout === "vertical"
    })} .label=${this.messages.submenu} layout=vertical role=menu .scale=${this.scale}><slot name=${I.submenuItem} @slotchange=${this.handleMenuItemSlotChange}></slot></calcite-menu>`;
  }
  renderHrefIcon(e) {
    return l(t.hoverHrefIcon, n`<calcite-icon class=${r(t.hoverHrefIcon)} .icon=${e === "rtl" ? o.arrowLeft : o.arrowRight} .scale=${d(this.scale)}></calcite-icon>`);
  }
  renderItemContent(e) {
    const i = this.href && (this.topLevelMenuLayout === "vertical" || !this.isTopLevelItem), a = !this.href && this.hasSubmenu;
    return n`${this.iconStart && this.renderIconStart() || ""}<div class=${r(t.textContainer)}><span>${this.text}</span></div>${i && this.renderHrefIcon(e) || ""}${this.iconEnd && this.renderIconEnd() || ""}${this.breadcrumb ? this.renderBreadcrumbIcon(e) : null}${a ? this.renderDropdownIcon(e) : null}`;
  }
  render() {
    const e = this.direction;
    return n`<li class=${r({
      [t.container]: !0,
      [t.isParentVertical]: this.topLevelMenuLayout === "vertical"
    })} role=none><div class=${r(t.itemContent)}><a .ariaCurrent=${this.isFocused ? "page" : !1} .ariaExpanded=${this.open} .ariaHasPopup=${this.hasSubmenu} .ariaLabel=${this.label} class=${r({ [t.layoutVertical]: this.layout === "vertical", [t.content]: !0 })} href=${this.href ?? u} @click=${this.clickHandler} @keydown=${this.keyDownHandler} rel=${this.rel ?? u} role=menuitem .tabIndex=${this.isTopLevelItem ? 0 : -1} target=${this.target ?? u} ${v(this.anchorRef)}>${this.renderItemContent(e)}</a>${this.href && this.hasSubmenu ? this.renderDropdownAction(e) : null}</div>${this.renderSubmenuItems(e)}</li>`;
  }
}
x("calcite-menu-item", S);
export {
  S as MenuItem
};
