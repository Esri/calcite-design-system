import { d as l, L as r, j as c, x as s, s as o, h as m } from "./iframe.js";
import { e as h, n as g } from "./ref.js";
import { s as n } from "./dom.js";
import { c as d } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const a = {
  container: "container",
  containerContent: "container-content",
  hasProgress: "progress-bar",
  hide: "hide",
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary"
}, e = {
  logo: "logo",
  user: "user",
  progress: "progress",
  navigationAction: "navigation-action",
  contentStart: "content-start",
  contentEnd: "content-end",
  contentCenter: "content-center",
  navSecondary: "navigation-secondary",
  navTertiary: "navigation-tertiary"
}, S = {
  hamburger: "hamburger"
}, y = l`:host([hidden]){display:none}[hidden]{display:none}.container{display:flex;inline-size:100%;flex-direction:column;margin-block:0;margin-inline:auto;background-color:var(--calcite-navigation-background-color, var(--calcite-navigation-background, var(--calcite-color-foreground-1)))}.container.primary,.container.secondary,.container.tertiary{border-block-end:1px solid;border-block-end-color:var(--calcite-navigation-border-color, var(--calcite-color-border-3))}.user,.logo{display:flex}.hide{display:none}.primary{block-size:4rem}.secondary,.tertiary{block-size:3rem}.container-content{margin-inline:auto;display:flex;block-size:100%;inline-size:100%;margin-block:0;inline-size:var(--calcite-navigation-width, 100%);max-inline-size:100%}.container-content.progress-bar{margin-block-start:.125rem}slot[name]{display:flex;flex-direction:row}slot[name=navigation-secondary]::slotted(calcite-navigation),slot[name=navigation-tertiary]::slotted(calcite-navigation){inline-size:100%}slot[name=content-start]::slotted(*),slot[name=content-center]::slotted(*),slot[name=content-end]::slotted(*){display:flex;flex-direction:row;align-items:center}slot[name=progress],slot[name=progress] calcite-progress{inset-block-start:0;inset-inline:0}slot[name=content-end]{margin-inline-start:auto}slot[name=content-start]{margin-inline-end:auto}slot[name=content-end],slot[name=logo]~slot[name=user],slot[name=user]:only-child{margin-inline-start:auto}slot[name=content-center]{margin-inline-start:auto;margin-inline-end:auto}slot[name=content-start]~slot[name=content-center]{margin-inline-start:0px}slot[name=content-start]~slot[name=content-end],slot[name=content-center]~slot[name=content-end],slot[name=content-center]~slot[name=user],slot[name=content-end]~slot[name=user]{margin:0}`;
class v extends r {
  constructor() {
    super(...arguments), this.navigationActionEl = h(), this.navigationAction = !1, this.calciteNavigationActionSelect = c({ cancelable: !1 });
  }
  static {
    this.properties = { logoSlotHasElements: 16, navigationActionSlotHasElements: 16, primaryContentCenterSlotHasElements: 16, primaryContentEndSlotHasElements: 16, primaryContentStartSlotHasElements: 16, progressSlotHasElement: 16, secondarySlotHasElements: 16, tertiarySlotHasElements: 16, userSlotHasElements: 16, label: 1, navigationAction: 7 };
  }
  static {
    this.styles = y;
  }
  // #endregion
  // #region Public Methods
  /** When `navigationAction` is `true`, sets focus on the component's action element. */
  async setFocus() {
    return await d(this), this.navigationActionEl.value?.setFocus();
  }
  // #endregion
  // #region Private Methods
  actionClickHandler() {
    this.calciteNavigationActionSelect.emit();
  }
  handleUserSlotChange(t) {
    this.isPrimaryLevel() && (this.userSlotHasElements = n(t));
  }
  handleLogoSlotChange(t) {
    this.isPrimaryLevel() && (this.logoSlotHasElements = n(t));
  }
  handleContentStartSlotChange(t) {
    this.isPrimaryLevel() && (this.primaryContentStartSlotHasElements = n(t));
  }
  handleContentEndSlotChange(t) {
    this.isPrimaryLevel() && (this.primaryContentEndSlotHasElements = n(t));
  }
  handleContentCenterSlotChange(t) {
    this.isPrimaryLevel() && (this.primaryContentCenterSlotHasElements = n(t));
  }
  handleSecondarySlotChange(t) {
    this.secondarySlotHasElements = n(t);
  }
  handleTertiarySlotChange(t) {
    this.tertiarySlotHasElements = n(t);
  }
  handleMenuActionSlotChange(t) {
    this.isPrimaryLevel() && (this.navigationActionSlotHasElements = n(t), this.navigationActionSlotHasElements && (this.navigationAction = !1));
  }
  handleProgressSlotChange(t) {
    this.isPrimaryLevel() && (this.progressSlotHasElement = n(t));
  }
  isPrimaryLevel() {
    return this.el.slot !== e.navSecondary && this.el.slot !== e.navTertiary;
  }
  // #endregion
  // #region Rendering
  renderMenuAction() {
    return s`<slot name=${e.navigationAction} @slotchange=${this.handleMenuActionSlotChange}>${this.navigationAction && s`<calcite-action .icon=${S.hamburger} @click=${this.actionClickHandler} .text=${this.label} ${g(this.navigationActionEl)}></calcite-action>` || ""}</slot>`;
  }
  render() {
    const t = this.logoSlotHasElements || this.userSlotHasElements || this.navigationActionSlotHasElements || this.primaryContentCenterSlotHasElements || this.primaryContentEndSlotHasElements || this.primaryContentStartSlotHasElements || this.navigationAction, i = this.el.slot;
    return s`<div class=${o({
      [a.container]: !0,
      [a.secondary]: i === e.navSecondary,
      [a.tertiary]: i === e.navTertiary,
      [a.primary]: t
    })}><div class=${o({ [a.hide]: !this.progressSlotHasElement, [e.progress]: !0 })}><slot name=${e.progress} @slotchange=${this.handleProgressSlotChange}></slot></div><div class=${o({ [a.containerContent]: !0, [a.hasProgress]: this.progressSlotHasElement })}>${this.renderMenuAction()}<div class=${o({ [a.hide]: !this.logoSlotHasElements, [e.logo]: !0 })}><slot name=${e.logo} @slotchange=${this.handleLogoSlotChange}></slot></div><slot name=${e.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot><slot name=${e.contentCenter} @slotchange=${this.handleContentCenterSlotChange}></slot><slot name=${e.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot><div class=${o({ [a.hide]: !this.userSlotHasElements, [e.user]: !0 })}><slot name=${e.user} @slotchange=${this.handleUserSlotChange}></slot></div></div></div><slot name=${e.navSecondary} @slotchange=${this.handleSecondarySlotChange}></slot><slot name=${e.navTertiary} @slotchange=${this.handleTertiarySlotChange}></slot>`;
  }
}
m("calcite-navigation", v);
export {
  v as Navigation
};
