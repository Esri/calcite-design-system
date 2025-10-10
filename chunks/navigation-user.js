import { b as r, L as n, s as a, x as e, q as c } from "./index.js";
import { i } from "./keyed.js";
import { u as l } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  textContainer: "text-container",
  fullName: "full-name",
  username: "username",
  button: "button"
}, s = r`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:inline-flex;outline:2px solid transparent;outline-offset:2px}:host .button{margin:0;display:flex;cursor:pointer;align-items:center;justify-content:center;font-family:var(--calcite-font-family);font-size:var(--calcite-font-size-0);line-height:1.25rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;border:none;background-color:var(--calcite-navigation-background-color, var(--calcite-internal-navigation-user-background-color, var(--calcite-color-transparent)));border-block-end:2px solid var(--calcite-color-transparent)}.text-container{margin-block-start:.125rem;display:flex;flex-direction:column;padding-inline:1rem;text-align:start}calcite-avatar{padding-inline:1rem;--calcite-avatar-corner-radius: var(--calcite-navigation-user-avatar-corner-radius);--calcite-avatar-color: var(--calcite-navigation-user-avatar-color)}calcite-avatar~.text-container{padding-inline-start:0px}.full-name{margin-inline-start:0px;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-navigation-user-full-name-text-color, var(--calcite-color-text-1))}.username{font-size:var(--calcite-font-size--1);color:var(--calcite-navigation-user-name-text-color, var(--calcite-color-text-2))}:host(:hover) .button,:host(:focus) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-2)}:host(:focus) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:active) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-3)}:host([active]) .button{border-block-end-color:var(--calcite-navigation-accent-color, var(--calcite-color-brand))}:host([hidden]){display:none}[hidden]{display:none}`;
class u extends n {
  constructor() {
    super(...arguments), this.focusSetter = l()(this), this.textDisabled = !1;
  }
  static {
    this.properties = { active: 7, fullName: 1, label: 1, textDisabled: 7, thumbnail: 1, userId: 1, username: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = s;
  }
  async setFocus(o) {
    return this.focusSetter(() => this.el, o);
  }
  render() {
    return e`<button .ariaLabel=${this.label} class=${a(t.button)}><calcite-avatar .fullName=${this.fullName} .label=${this.label} .thumbnail=${this.thumbnail} .userId=${this.userId} .username=${this.username}></calcite-avatar>${(this.fullName || this.username) && !this.textDisabled && e`<div class=${a(t.textContainer)}>${this.fullName && i(t.fullName, e`<span class=${a(t.fullName)}>${this.fullName}</span>`) || ""}${this.username && i(t.username, e`<span class=${a(t.username)}>${this.username}</span>`) || ""}</div>` || ""}</button>`;
  }
}
c("calcite-navigation-user", u);
export {
  u as NavigationUser
};
