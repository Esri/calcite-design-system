import { h as l, L as n, u as o, x as u, j as r } from "./iframe.js";
import { f as h, b as a, d as m, a as c } from "./dom.js";
import { c as f } from "./component.js";
import { u as d } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const p = l`:host{display:flex}ul{margin:0;display:inline-flex;block-size:100%;align-items:center;padding:0}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends n {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.attributeWatch = o(["role"], this.handleGlobalAttributesChanged), this.menuItems = [], this.layout = "horizontal", this.messages = d(), this.listen("calciteInternalMenuItemKeyEvent", this.calciteInternalNavMenuItemKeyEvent);
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
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await f(this), h(this.menuItems[0]);
  }
  willUpdate(e) {
    e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setMenuItemLayout(this.menuItems, this.layout);
  }
  // #endregion
  // #region Private Methods
  handleGlobalAttributesChanged() {
    this.requestUpdate(), this.setMenuItemLayout(this.menuItems, this.layout);
  }
  calciteInternalNavMenuItemKeyEvent(e) {
    const t = e.target, s = e.detail.children, i = e.detail.event.key;
    e.stopPropagation(), i === "ArrowDown" ? t.layout === "vertical" ? a(this.menuItems, t, "next", !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowUp" ? this.layout === "vertical" ? a(this.menuItems, t, "previous", !1) : e.detail.isSubmenuOpen && s[s.length - 1].setFocus() : i === "ArrowRight" ? this.layout === "horizontal" ? a(this.menuItems, t, "next", !1) : e.detail.isSubmenuOpen && s[0].setFocus() : i === "ArrowLeft" ? this.layout === "horizontal" ? a(this.menuItems, t, "previous", !1) : e.detail.isSubmenuOpen && this.focusParentElement(e.target) : i === "Escape" && this.focusParentElement(e.target), e.preventDefault();
  }
  handleMenuSlotChange(e) {
    this.menuItems = m(e), this.setMenuItemLayout(this.menuItems, this.layout);
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
  // #endregion
  // #region Rendering
  render() {
    return u`<ul .ariaLabel=${this.label} .role=${this.getEffectiveRole()}><slot @slotchange=${this.handleMenuSlotChange}></slot></ul>`;
  }
}
r("calcite-menu", y);
export {
  y as Menu
};
