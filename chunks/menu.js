import { a as l, L as n, x as o, c as u } from "./iframe.js";
import { a as r, u as h } from "./useT9n.js";
import { f as m, b as a, d as c, a as f } from "./dom.js";
import { c as d } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const p = l`:host{display:flex}ul{margin:0;display:inline-flex;block-size:100%;align-items:center;padding:0}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends n {
  constructor() {
    super(), this.attributeWatch = r(["role"], this.handleGlobalAttributesChanged), this.menuItems = [], this.messages = h(), this.layout = "horizontal", this.listen("calciteInternalMenuItemKeyEvent", this.calciteInternalNavMenuItemKeyEvent);
  }
  static {
    this.properties = { label: 1, layout: 3, messageOverrides: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = p;
  }
  async setFocus() {
    await d(this), m(this.menuItems[0]);
  }
  willUpdate(e) {
    e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setMenuItemLayout(this.menuItems, this.layout);
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate(), this.setMenuItemLayout(this.menuItems, this.layout);
  }
  calciteInternalNavMenuItemKeyEvent(e) {
    const t = e.target, s = e.detail.children, i = e.detail.event.key;
    e.stopPropagation(), i === "ArrowDown" ? t.layout === "vertical" ? a(this.menuItems, t, "next", !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowUp" ? this.layout === "vertical" ? a(this.menuItems, t, "previous", !1) : e.detail.isSubmenuOpen && s[s.length - 1].setFocus() : i === "ArrowRight" ? this.layout === "horizontal" ? a(this.menuItems, t, "next", !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowLeft" ? this.layout === "horizontal" ? a(this.menuItems, t, "previous", !1) : e.detail.isSubmenuOpen && this.focusParentElement(e.target) : i === "Escape" && this.focusParentElement(e.target), e.preventDefault();
  }
  handleMenuSlotChange(e) {
    this.menuItems = c(e), this.setMenuItemLayout(this.menuItems, this.layout);
  }
  focusParentElement(e) {
    const t = e.parentElement;
    t && (f(t), t.open = !1);
  }
  setMenuItemLayout(e, t) {
    e.forEach((s) => {
      s.layout = t, this.getEffectiveRole() === "menubar" && (s.isTopLevelItem = !0, s.topLevelMenuLayout = this.layout);
    });
  }
  getEffectiveRole() {
    return this.el.role || "menubar";
  }
  render() {
    return o`<ul .ariaLabel=${this.label} .role=${this.getEffectiveRole()}><slot @slotchange=${this.handleMenuSlotChange}></slot></ul>`;
  }
}
u("calcite-menu", y);
export {
  y as Menu
};
