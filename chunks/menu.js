/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as r, L as u, b as h, f as m } from "./index.js";
import { b as c } from "./index2.js";
import { e as n, b as f, f as p } from "./dom.js";
import { u as d } from "./useT9n.js";
import { u as g } from "./useFocusable.js";
import { i as a } from "./resources20.js";
const y = r`:host{display:flex;line-height:var(--calcite-font-line-height-fixed-lg)}ul{display:inline-flex;align-items:center;block-size:100%;margin:var(--calcite-space-none);padding:var(--calcite-space-none)}:host([layout=vertical]) ul{display:flex;flex-direction:column;inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends u {
  constructor() {
    super(), this.attributeWatch = c(["role"], this.handleGlobalAttributesChanged), this.menuItems = [], this.messages = d(), this.focusSetter = g()(this), this.layout = "horizontal", this.scale = "m", this.listen("keydown", this.calciteInternalNavMenuItemKeyEvent);
  }
  static {
    this.properties = { label: 1, layout: 3, messageOverrides: 0, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = y;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.menuItems[0], t);
  }
  willUpdate(t) {
    (t.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || t.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.setMenuItemProperties(this.menuItems);
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate(), this.setMenuItemProperties(this.menuItems);
  }
  calciteInternalNavMenuItemKeyEvent(t) {
    if (t.defaultPrevented)
      return;
    const e = this.getMenuItemFromEvent(t);
    if (!e)
      return;
    const i = this.getSubmenuItems(e), o = i.length > 0, l = t.key;
    let s = !1;
    l === "ArrowDown" ? e.layout === "vertical" ? (n(this.menuItems, e, "next", !1, !1), s = !0) : e.open && o && (i[0].setFocus(), s = !0) : l === "ArrowUp" ? e.layout === "vertical" ? (n(this.menuItems, e, "previous", !1, !1), s = !0) : e.open && o && (i[i.length - 1].setFocus(), s = !0) : l === "ArrowRight" ? this.layout === "horizontal" ? (n(this.menuItems, e, "next", !1, !1), s = !0) : e.open && o && (i[0].setFocus(), s = !0) : l === "ArrowLeft" ? this.layout === "horizontal" ? (n(this.menuItems, e, "previous", !1, !1), s = !0) : a(e.parentElement) && (this.focusParentElement(e), s = !0) : l === "Escape" && a(e.parentElement) && (this.focusParentElement(e), s = !0), s && t.preventDefault();
  }
  getMenuItemFromEvent(t) {
    const e = t.composedPath().find(a);
    return e && this.menuItems.includes(e) ? e : void 0;
  }
  getSubmenuItems(t) {
    return Array.from(t.children).filter(a).filter((e) => e.matches('[slot="submenu-item"]'));
  }
  handleMenuSlotChange(t) {
    this.menuItems = f(t), this.setMenuItemProperties(this.menuItems);
  }
  focusParentElement(t) {
    const e = t.parentElement;
    e && (p(e), e.open = !1);
  }
  setMenuItemProperties(t) {
    t.forEach((e) => {
      e.layout = this.layout, e.scale = this.scale, this.getEffectiveRole() === "menubar" && (e.isTopLevelItem = !0, e.topLevelMenuLayout = this.layout);
    });
  }
  getEffectiveRole() {
    return this.el.role || "menubar";
  }
  render() {
    return h`<ul .ariaLabel=${this.label} .role=${this.getEffectiveRole()}><slot @slotchange=${this.handleMenuSlotChange}></slot></ul>`;
  }
}
m("calcite-menu", I);
export {
  I as Menu
};
