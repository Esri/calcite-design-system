import { b as l, L as o, x as n, q as u } from "./index.js";
import { u as r } from "./index2.js";
import { b as a, d as h, f as c } from "./dom.js";
import { u as m } from "./useT9n.js";
import { u as f } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const d = l`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex}ul{margin:0;display:inline-flex;block-size:100%;align-items:center;padding:0}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends o {
  constructor() {
    super(), this.attributeWatch = r(["role"], this.handleGlobalAttributesChanged), this.menuItems = [], this.messages = m(), this.focusSetter = f()(this), this.layout = "horizontal", this.listen("calciteInternalMenuItemKeyEvent", this.calciteInternalNavMenuItemKeyEvent);
  }
  static {
    this.properties = { label: 1, layout: 3, messageOverrides: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = d;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.menuItems[0], e);
  }
  willUpdate(e) {
    e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setMenuItemLayout(this.menuItems, this.layout);
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate(), this.setMenuItemLayout(this.menuItems, this.layout);
  }
  calciteInternalNavMenuItemKeyEvent(e) {
    const t = e.target, s = e.detail.children, i = e.detail.event.key;
    e.stopPropagation(), i === "ArrowDown" ? t.layout === "vertical" ? a(this.menuItems, t, "next", !1, !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowUp" ? this.layout === "vertical" ? a(this.menuItems, t, "previous", !1, !1) : e.detail.isSubmenuOpen && s[s.length - 1].setFocus() : i === "ArrowRight" ? this.layout === "horizontal" ? a(this.menuItems, t, "next", !1, !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowLeft" ? this.layout === "horizontal" ? a(this.menuItems, t, "previous", !1, !1) : e.detail.isSubmenuOpen && this.focusParentElement(e.target) : i === "Escape" && this.focusParentElement(e.target), e.preventDefault();
  }
  handleMenuSlotChange(e) {
    this.menuItems = h(e), this.setMenuItemLayout(this.menuItems, this.layout);
  }
  focusParentElement(e) {
    const t = e.parentElement;
    t && (c(t), t.open = !1);
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
    return n`<ul .ariaLabel=${this.label} .role=${this.getEffectiveRole()}><slot @slotchange=${this.handleMenuSlotChange}></slot></ul>`;
  }
}
u("calcite-menu", p);
export {
  p as Menu
};
