/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as r, L as u, b as h, d as m } from "./index.js";
import { b as f } from "./index2.js";
import { d as n, b as c, f as d } from "./dom.js";
import { u as p } from "./useT9n.js";
import { u as g } from "./useSetFocus.js";
import { i as a } from "./resources20.js";
const y = r`:host{display:flex;line-height:var(--calcite-font-line-height-fixed-lg)}ul{margin:0;display:inline-flex;block-size:100%;align-items:center;padding:0}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends u {
  constructor() {
    super(), this.attributeWatch = f(["role"], this.handleGlobalAttributesChanged), this.menuItems = [], this.messages = p(), this.focusSetter = g()(this), this.layout = "horizontal", this.scale = "m", this.listen("keydown", this.calciteInternalNavMenuItemKeyEvent);
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
    this.menuItems = c(t), this.setMenuItemProperties(this.menuItems);
  }
  focusParentElement(t) {
    const e = t.parentElement;
    e && (d(e), e.open = !1);
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
