/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as l, L as r, s as e, b as t, d as c } from "./index.js";
import { i } from "./keyed.js";
import { u as s } from "./useSetFocus.js";
import { C as a } from "./resources22.js";
const o = l`:host([scale=s]){--calcite-internal-navigation-user-padding-inline: var(--calcite-space-md);--calcite-internal-navigation-user-full-name-font-size: var(--calcite-font-size-relative-base);--calcite-internal-navigation-user-username-font-size: var(--calcite-font-size-relative-sm);--calcite-internal-navigation-user-full-name-line-height: var(--calcite-space-lg);--calcite-internal-navigation-user-username-line-height: var(--calcite-space-lg)}:host([scale=m]){--calcite-internal-navigation-user-padding-inline: var(--calcite-space-lg);--calcite-internal-navigation-user-full-name-font-size: var(--calcite-font-size-relative-md);--calcite-internal-navigation-user-username-font-size: var(--calcite-font-size-relative-base);--calcite-internal-navigation-user-full-name-line-height: var(--calcite-space-xl);--calcite-internal-navigation-user-username-line-height: var(--calcite-space-lg)}:host([scale=l]){--calcite-internal-navigation-user-padding-inline: var(--calcite-space-xl);--calcite-internal-navigation-user-full-name-font-size: var(--calcite-font-size-relative-xl);--calcite-internal-navigation-user-username-font-size: var(--calcite-font-size-relative-lg);--calcite-internal-navigation-user-full-name-line-height: var(--calcite-space-2xl);--calcite-internal-navigation-user-username-line-height: var(--calcite-space-2xl)}:host{display:inline-flex;outline:2px solid transparent;outline-offset:2px}:host .button{margin:0;display:flex;cursor:pointer;align-items:center;justify-content:center;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);outline-color:transparent;font-family:inherit;border:none;padding-inline:0;background-color:var(--calcite-navigation-background-color, var(--calcite-internal-navigation-user-background-color, var(--calcite-color-transparent)));border-block-end:2px solid var(--calcite-color-transparent)}.text-container{margin-block-start:.125rem;display:flex;flex-direction:column;text-align:start;padding-inline:var(--calcite-internal-navigation-user-padding-inline)}calcite-avatar{--calcite-avatar-corner-radius: var(--calcite-navigation-user-avatar-corner-radius);--calcite-avatar-color: var(--calcite-navigation-user-avatar-color);padding-inline:var(--calcite-internal-navigation-user-padding-inline)}calcite-avatar~.text-container{padding-inline-start:0px}.full-name{margin-inline-start:0px;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-navigation-user-full-name-text-color, var(--calcite-color-text-1));font-size:var(--calcite-internal-navigation-user-full-name-font-size);padding-block-start:var(--calcite-space-2xs);line-height:var(--calcite-internal-navigation-user-full-name-line-height)}.standalone{padding-block-start:0}.username{font-size:var(--calcite-internal-navigation-user-username-font-size);color:var(--calcite-navigation-user-name-text-color, var(--calcite-color-text-2));line-height:var(--calcite-internal-navigation-user-username-line-height)}:host(:hover) .button,:host(:focus) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-2)}:host(:focus) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:active) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-3)}:host([active]) .button{border-block-end-color:var(--calcite-navigation-accent-color, var(--calcite-color-brand))}:host([hidden]){display:none}[hidden]{display:none}`;
class u extends r {
  constructor() {
    super(...arguments), this.focusSetter = s()(this), this.active = !1, this.textDisabled = !1, this.scale = "m";
  }
  static {
    this.properties = { active: 7, fullName: 1, label: 1, textDisabled: 7, scale: 3, thumbnail: 1, userId: 1, username: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = o;
  }
  async setFocus(n) {
    return this.focusSetter(() => this.el, n);
  }
  render() {
    return t`<button .ariaLabel=${this.label} class=${e(a.button)}><calcite-avatar .fullName=${this.fullName} .label=${this.label} .scale=${this.scale} .thumbnail=${this.thumbnail} .userId=${this.userId} .username=${this.username}></calcite-avatar>${(this.fullName || this.username) && !this.textDisabled && t`<div class=${e(a.textContainer)}>${this.fullName && i(a.fullName, t`<span class=${e({
      [a.fullName]: !0,
      [a.standalone]: !this.username
    })}>${this.fullName}</span>`) || ""}${this.username && i(a.username, t`<span class=${e(a.username)}>${this.username}</span>`) || ""}</div>` || ""}</button>`;
  }
}
c("calcite-navigation-user", u);
export {
  u as NavigationUser
};
