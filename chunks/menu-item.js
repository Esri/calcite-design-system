import { h as b, L as f, k as m, x as o, s as r, C as g, y as u, j as y } from "./iframe.js";
import { i as l } from "./keyed.js";
import { e as p, n as v } from "./ref.js";
import { d as w, g as x } from "./dom.js";
import { c as $ } from "./component.js";
import { u as I } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const t = {
  container: "container",
  content: "content",
  dropdownVertical: "dropdown--vertical",
  dropdownMenuItems: "dropdown-menu-items",
  dropdownAction: "dropdown-action",
  layoutVertical: "layout--vertical",
  hoverHrefIcon: "hover-href-icon",
  icon: "icon",
  iconBreadcrumb: "icon--breadcrumb",
  iconDropdown: "icon--dropdown",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  isParentVertical: "parent--vertical",
  itemContent: "item-content",
  open: "open",
  nested: "nested",
  textContainer: "text-container"
}, k = b`:host{position:relative;box-sizing:border-box;display:flex;align-items:center;flex-shrink:0}:host .container,:host .item-content,:host .content{min-block-size:3rem}:host([layout=vertical]){inline-size:100%}:host(:not([layout=vertical])){block-size:100%}.container,.item-content{display:flex;block-size:100%;inline-size:100%;flex-direction:row;align-items:stretch}.content{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-items:center;justify-content:center;padding-inline:1rem;font-size:var(--calcite-font-size-0);outline:2px solid transparent;outline-offset:2px;text-decoration:none;padding-block-start:.125rem;border-block-end:.125rem solid var(--calcite-color-transparent);background-color:var(--calcite-menu-background-color, var(--calcite-internal-menu-background-color, var(--calcite-color-foreground-1)));color:var(--calcite-menu-text-color, var(--calcite-internal-menu-text-color, var(--calcite-color-text-2)))}.content:hover{border-block-end-color:var(--calcite-menu-item-accent-color, var(--calcite-color-border-2))}.content:focus{border-block-end-width:4px;outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));padding-block-start:.25rem;border-block-end-width:.25rem}.content:active{--calcite-internal-menu-background-color: var(--calcite-color-foreground-3);--calcite-internal-menu-text-color: var(--calcite-color-text-1)}.content span{display:inline-flex}.content.layout--vertical{display:flex;inline-size:100%;justify-content:flex-start;padding-block:1rem;border-block-end:0;border-inline-end:.25rem solid var(--calcite-color-transparent)}:host([layout=vertical]) .content{padding-inline:.75rem}:host([active]) .content{--calcite-internal-menu-text-color: var(--calcite-color-text-1);border-color:var(--calcite-menu-item-accent-color, var(--calcite-color-brand))}:host([active]) .icon{--calcite-internal-menu-item-icon-color: var(--calcite-color-brand)}.icon{color:var(--calcite-menu-text-color, var(--calcite-icon-color, var(--calcite-internal-menu-item-icon-color, var(--calcite-color-text-3))))}.icon--start{margin-inline-end:.75rem}.icon--end{margin-inline-start:.75rem}:host([layout=vertical]) .icon--end{margin-inline-start:auto;padding-inline-start:.75rem}.icon--dropdown{position:relative;margin-inline-start:auto;margin-inline-end:0px;padding-inline-start:.5rem}:host([layout=vertical]) .icon--end~.icon--dropdown{margin-inline-start:.75rem}:host([layout=vertical]) .hover-href-icon{padding-inline-start:.5rem}:host([layout=vertical]) .hover-href-icon~.icon--end{margin-inline-start:.5rem}:host([layout=vertical]) .hover-href-icon~.icon--breadcrumb{margin-inline-start:.75rem}.icon--breadcrumb{margin-inline-end:0px;padding-inline-start:.5rem}:host([layout=vertical]) .icon--breadcrumb{margin-inline-start:auto}:host([layout=vertical]) .icon--breadcrumb~.icon--dropdown{margin-inline-start:.5rem}:host([layout=vertical]) .icon--end~.icon--breadcrumb{margin-inline-start:.5rem}:host([breadcrumb]) .content{padding-inline-end:.75rem}calcite-action{position:relative;block-size:auto;border-inline-start:1px solid var(--calcite-color-foreground-1);--calcite-action-background-color: var(--calcite-menu-background-color);--calcite-action-text-color: var(--calcite-menu-text-color)}calcite-action:after{position:absolute;inset-inline-start:-1px;display:block;inline-size:1px;content:"";inset-block:.75rem;background-color:var(--calcite-color-border-3)}calcite-action:hover:after{block-size:100%;inset-block:0}calcite-action:active{--calcite-action-background-color-press: var(--calcite-menu-background-color)}.content:focus~calcite-action,.content:hover~calcite-action{--calcite-action-text-color: var(--calcite-menu-text-color, var(--calcite-color-text-1))}.content:focus~calcite-action:after,.content:hover~calcite-action:after{block-size:100%;inset-block:0}.dropdown-menu-items{position:absolute;display:none;block-size:auto;min-inline-size:100%;flex-direction:column;overflow:visible;border:1px solid var(--calcite-menu-item-sub-menu-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-menu-item-sub-menu-corner-radius, var(--calcite-corner-radius));inset-block-start:100%;z-index:var(--calcite-z-index-dropdown)}.dropdown-menu-items.open{display:block}.dropdown-menu-items.nested{position:absolute;inset-block-start:-1px;transform:translate(calc(100% - 2px))}.parent--vertical{flex-direction:column}.dropdown--vertical.dropdown-menu-items{position:relative;box-shadow:none;inset-block-start:0;transform:none}.dropdown--vertical.dropdown-menu-items:last-of-type{border-inline:0}:host([layout=vertical]:last-of-type) .dropdown-menu-items{border-block-end:0}:host([slot=submenu-item]) .parent--vertical{padding-inline-start:1.5rem}.dropdown-menu-items.nested.calcite--rtl{transform:translate(calc(-100% + 2px))}.dropdown--vertical.dropdown-menu-items.nested.calcite--rtl{transform:none}.hover-href-icon{position:relative;inset-inline-end:.25rem;margin-inline-start:auto;opacity:0;transition:all var(--calcite-internal-animation-timing-medium) ease-in-out}.content:focus .hover-href-icon,.content:hover .hover-href-icon{inset-inline-end:-.25rem;opacity:1}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends f {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.anchorEl = p(), this.dropdownActionEl = p(), this.hasSubmenu = !1, this.isTopLevelItem = !1, this.messages = I(), this.open = !1, this.calciteInternalMenuItemKeyEvent = m(), this.calciteMenuItemSelect = m(), this.listenOn(window, "click", this.handleClickOut), this.listen("focusout", this.handleFocusOut), this.listen("blur", this.blurHandler), this.listen("focus", this.focusHandler);
  }
  static {
    this.properties = { hasSubmenu: 16, submenuItems: 16, active: 7, breadcrumb: 7, href: 1, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, isTopLevelItem: 5, label: 1, layout: 3, messageOverrides: 0, open: 7, rel: 3, target: 3, text: 1, topLevelMenuLayout: 1 };
  }
  static {
    this.styles = k;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await $(this), this.anchorEl.value.focus();
  }
  // #endregion
  // #region Private Methods
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
    (this.href && e.target === this.dropdownActionEl.value || !this.href && this.hasSubmenu) && (this.open = !this.open), this.selectMenuItem(e);
  }
  focusHandler(e) {
    const n = e.target;
    this.isFocused = !0, n.open && !this.open && (n.open = !1);
  }
  handleMenuItemSlotChange(e) {
    this.submenuItems = w(e), this.submenuItems.forEach((n) => {
      n.topLevelMenuLayout || (n.topLevelMenuLayout = this.topLevelMenuLayout);
    }), this.hasSubmenu = this.submenuItems.length > 0;
  }
  async keyDownHandler(e) {
    const { hasSubmenu: n, href: c, layout: h, open: a, submenuItems: d } = this, i = e.key, s = e.target === this.dropdownActionEl.value;
    if (!e.defaultPrevented) {
      if (i === " " || i === "Enter")
        n && (!c || c && s) && (this.open = !a), !(c && s) && i !== "Enter" && this.selectMenuItem(e), (i === " " || c && s) && e.preventDefault();
      else if (i === "Escape") {
        if (a) {
          this.open = !1;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({ event: e }), e.preventDefault();
      } else if (i === "ArrowDown" || i === "ArrowUp") {
        if (e.preventDefault(), (s || !c) && n && !a && h === "horizontal") {
          this.open = !0;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({
          event: e,
          children: d,
          isSubmenuOpen: a && n
        });
      } else if (i === "ArrowLeft")
        e.preventDefault(), this.calciteInternalMenuItemKeyEvent.emit({
          event: e,
          children: d,
          isSubmenuOpen: !0
        });
      else if (i === "ArrowRight") {
        if (e.preventDefault(), (s || !c) && n && !a && h === "vertical") {
          this.open = !0;
          return;
        }
        this.calciteInternalMenuItemKeyEvent.emit({
          event: e,
          children: d,
          isSubmenuOpen: a && n
        });
      }
    }
  }
  selectMenuItem(e) {
    e.target !== this.dropdownActionEl.value && this.calciteMenuItemSelect.emit();
  }
  // #endregion
  // #region Rendering
  renderIconStart() {
    return l(t.iconStart, o`<calcite-icon class=${`${t.icon} ${t.iconStart}`} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} scale=s></calcite-icon>`);
  }
  renderIconEnd() {
    return l(t.iconEnd, o`<calcite-icon class=${`${t.icon} ${t.iconEnd}`} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} scale=s></calcite-icon>`);
  }
  renderBreadcrumbIcon(e) {
    return l(t.iconBreadcrumb, o`<calcite-icon class=${`${t.icon} ${t.iconBreadcrumb}`} .icon=${e === "rtl" ? "chevron-left" : "chevron-right"} scale=s></calcite-icon>`);
  }
  renderDropdownIcon(e) {
    const n = e === "rtl" ? "chevron-left" : "chevron-right";
    return l(t.iconDropdown, o`<calcite-icon class=${`${t.icon} ${t.iconDropdown}`} .icon=${this.topLevelMenuLayout === "vertical" || this.isTopLevelItem ? this.open ? "chevron-up" : "chevron-down" : n} scale=s></calcite-icon>`);
  }
  renderDropdownAction(e) {
    const n = e === "rtl" ? "chevron-left" : "chevron-right";
    return l(t.dropdownAction, o`<calcite-action class=${r(t.dropdownAction)} .icon=${this.topLevelMenuLayout === "vertical" || this.isTopLevelItem ? this.open ? "chevron-up" : "chevron-down" : n} @click=${this.clickHandler} @keydown=${this.keyDownHandler} .text=${this.messages.open} ${v(this.dropdownActionEl)}></calcite-action>`);
  }
  renderSubmenuItems(e) {
    return o`<calcite-menu class=${r({
      [t.dropdownMenuItems]: !0,
      [t.open]: this.open,
      [t.nested]: !this.isTopLevelItem,
      [g.rtl]: e === "rtl",
      [t.dropdownVertical]: this.topLevelMenuLayout === "vertical"
    })} .label=${this.messages.submenu} layout=vertical role=menu><slot name=submenu-item @slotchange=${this.handleMenuItemSlotChange}></slot></calcite-menu>`;
  }
  renderHrefIcon(e) {
    return l(t.hoverHrefIcon, o`<calcite-icon class=${r(t.hoverHrefIcon)} .icon=${e === "rtl" ? "arrow-left" : "arrow-right"} scale=s></calcite-icon>`);
  }
  renderItemContent(e) {
    const n = this.href && (this.topLevelMenuLayout === "vertical" || !this.isTopLevelItem);
    return o`${this.iconStart && this.renderIconStart() || ""}<div class=${r(t.textContainer)}><span>${this.text}</span></div>${n && this.renderHrefIcon(e) || ""}${this.iconEnd && this.renderIconEnd() || ""}${this.breadcrumb ? this.renderBreadcrumbIcon(e) : null}${!this.href && this.hasSubmenu ? this.renderDropdownIcon(e) : null}`;
  }
  render() {
    const e = x(this.el);
    return o`<li class=${r({
      [t.container]: !0,
      [t.isParentVertical]: this.topLevelMenuLayout === "vertical"
    })} role=none><div class=${r(t.itemContent)}><a .ariaCurrent=${this.isFocused ? "page" : !1} .ariaExpanded=${this.open} .ariaHasPopup=${this.hasSubmenu} .ariaLabel=${this.label} class=${r({ [t.layoutVertical]: this.layout === "vertical", [t.content]: !0 })} href=${this.href ?? u} @click=${this.clickHandler} @keydown=${this.keyDownHandler} rel=${this.rel ?? u} role=menuitem .tabIndex=${this.isTopLevelItem ? 0 : -1} target=${this.target ?? u} ${v(this.anchorEl)}>${this.renderItemContent(e)}</a>${this.href && this.hasSubmenu ? this.renderDropdownAction(e) : null}</div>${this.renderSubmenuItems(e)}</li>`;
  }
}
y("calcite-menu-item", L);
export {
  L as MenuItem
};
