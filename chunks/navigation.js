/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as c, L as h, c as g, b as s, s as o, d as m } from "./index.js";
import { e as d, n as v } from "./ref.js";
import { s as n } from "./dom.js";
import { i as y } from "./resources21.js";
import { i as S } from "./resources22.js";
import { u } from "./useSetFocus.js";
import { c as p } from "./observers.js";
import { i as E } from "./resources2.js";
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
}, C = {
  hamburger: "hamburger"
}, r = E("calcite-navigation"), f = c`:host([hidden]){display:none}[hidden]{display:none}:host{display:block}:host([scale=s]){--calcite-internal-navigation-primary-height: 3rem;--calcite-internal-navigation-secondary-height: 2.25rem;--calcite-internal-navigation-tertiary-height: 2.25rem;--calcite-internal-navigation-navigation-action-margin-inline: 8px}:host([scale=m]){--calcite-internal-navigation-primary-height: 4rem;--calcite-internal-navigation-secondary-height: 3rem;--calcite-internal-navigation-tertiary-height: 3rem;--calcite-internal-navigation-navigation-action-margin-inline: var(--calcite-font-size-sm)}:host([scale=l]){--calcite-internal-navigation-primary-height: 4.75rem;--calcite-internal-navigation-secondary-height: 4rem;--calcite-internal-navigation-tertiary-height: 4rem;--calcite-internal-navigation-navigation-action-margin-inline: var(--calcite-font-size-md)}.container{display:flex;inline-size:100%;flex-direction:column;margin-block:0;margin-inline:auto;background-color:var(--calcite-navigation-background-color, var(--calcite-navigation-background, var(--calcite-color-foreground-1)))}.container.primary,.container.secondary,.container.tertiary{border-block-end:1px solid;border-block-end-color:var(--calcite-navigation-border-color, var(--calcite-color-border-3))}.user,.logo{display:flex}.hide{display:none}.primary{block-size:var(--calcite-internal-navigation-primary-height)}.secondary{block-size:var(--calcite-internal-navigation-secondary-height)}.tertiary{block-size:var(--calcite-internal-navigation-tertiary-height)}.container-content{margin-inline:auto;display:flex;block-size:100%;inline-size:100%;margin-block:0;inline-size:var(--calcite-navigation-width, 100%);max-inline-size:100%}.container-content.progress-bar{margin-block-start:.125rem}slot[name]{display:flex;flex-direction:row}slot[name=navigation-secondary]::slotted(calcite-navigation),slot[name=navigation-tertiary]::slotted(calcite-navigation){inline-size:100%}slot[name=content-start]::slotted(*),slot[name=content-center]::slotted(*),slot[name=content-end]::slotted(*){display:flex;flex-direction:row;align-items:center}slot[name=progress],slot[name=progress] calcite-progress{inset-block-start:0;inset-inline:0}slot[name=content-end]{margin-inline-start:auto}slot[name=content-start]{margin-inline-end:auto}slot[name=content-end],slot[name=logo]~slot[name=user],slot[name=user]:only-child{margin-inline-start:auto}slot[name=content-center]{margin-inline-start:auto;margin-inline-end:auto}slot[name=content-start]~slot[name=content-center]{margin-inline-start:0px}slot[name=content-start]~slot[name=content-end],slot[name=content-center]~slot[name=content-end],slot[name=content-center]~slot[name=user],slot[name=content-end]~slot[name=user]{margin:0}slot[name=navigation-action] calcite-action{align-self:center;margin-inline-start:var(--calcite-internal-navigation-navigation-action-margin-inline)}`;
class H extends h {
  constructor() {
    super(...arguments), this.navigationActionRef = d(), this.focusSetter = u()(this), this.mutationObserver = p("mutation", () => {
      this.updateNavigationLogo(), this.updateNavigationUser(), this.updateNestedNavigation();
    }), this.logoSlotHasElements = !1, this.navigationActionSlotHasElements = !1, this.primaryContentCenterSlotHasElements = !1, this.primaryContentEndSlotHasElements = !1, this.primaryContentStartSlotHasElements = !1, this.progressSlotHasElement = !1, this.secondarySlotHasElements = !1, this.tertiarySlotHasElements = !1, this.userSlotHasElements = !1, this.navigationAction = !1, this.scale = "m", this.calciteNavigationActionSelect = g({ cancelable: !1 });
  }
  static {
    this.properties = { logoSlotHasElements: 16, navigationActionSlotHasElements: 16, primaryContentCenterSlotHasElements: 16, primaryContentEndSlotHasElements: 16, primaryContentStartSlotHasElements: 16, progressSlotHasElement: 16, secondarySlotHasElements: 16, tertiarySlotHasElements: 16, userSlotHasElements: 16, label: 1, navigationAction: 7, scale: 3 };
  }
  static {
    this.styles = f;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.navigationActionRef.value, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0 }), this.updateNavigationLogo(), this.updateNavigationUser(), this.updateNestedNavigation();
  }
  updated(t) {
    (t.has("scale") || t.has("logoSlotHasElements") || t.has("userSlotHasElements") || t.has("secondarySlotHasElements") || t.has("tertiarySlotHasElements")) && (this.updateNavigationLogo(), this.updateNavigationUser(), this.updateNestedNavigation());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
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
  getOwnedNavigationElements(t, i) {
    const l = this.el.shadowRoot?.querySelector(`slot[name="${t}"]`);
    return l ? l.assignedElements({ flatten: !0 }).filter(i) : [];
  }
  updateNavigationLogo() {
    this.getOwnedNavigationElements(e.logo, y).forEach((t) => {
      t.scale = this.scale;
    });
  }
  updateNavigationUser() {
    this.getOwnedNavigationElements(e.user, S).forEach((t) => {
      t.scale = this.scale;
    });
  }
  updateNestedNavigation() {
    [
      ...this.getOwnedNavigationElements(e.navSecondary, r),
      ...this.getOwnedNavigationElements(e.navTertiary, r)
    ].forEach((i) => {
      i !== this.el && (i.scale = this.scale);
    });
  }
  renderMenuAction() {
    return s`<slot name=${e.navigationAction} @slotchange=${this.handleMenuActionSlotChange}>${this.navigationAction && s`<calcite-action .icon=${C.hamburger} @click=${this.actionClickHandler} .text=${this.label} ${v(this.navigationActionRef)}></calcite-action>` || ""}</slot>`;
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
m("calcite-navigation", H);
export {
  H as Navigation
};
