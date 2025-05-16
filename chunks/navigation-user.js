import { a as o, L as n, s as a, x as e, c as r } from "./iframe.js";
import { i } from "./keyed.js";
import { c as l } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const t = {
  textContainer: "text-container",
  fullName: "full-name",
  username: "username",
  button: "button"
}, c = o`:host{display:inline-flex;outline:2px solid transparent;outline-offset:2px}:host .button{margin:0;display:flex;cursor:pointer;align-items:center;justify-content:center;font-family:var(--calcite-font-family);font-size:var(--calcite-font-size-0);line-height:1.25rem;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border:none;background-color:var(--calcite-navigation-background-color, var(--calcite-internal-navigation-user-background-color, var(--calcite-color-transparent)));border-block-end:2px solid var(--calcite-color-transparent)}.text-container{margin-block-start:.125rem;display:flex;flex-direction:column;padding-inline:1rem;text-align:start}calcite-avatar{padding-inline:1rem;--calcite-avatar-corner-radius: var(--calcite-navigation-user-avatar-corner-radius);--calcite-avatar-color: var(--calcite-navigation-user-avatar-color)}calcite-avatar~.text-container{padding-inline-start:0px}.full-name{margin-inline-start:0px;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-navigation-user-full-name-text-color, var(--calcite-color-text-1))}.username{font-size:var(--calcite-font-size--1);color:var(--calcite-navigation-user-name-text-color, var(--calcite-color-text-2))}:host(:hover) .button,:host(:focus) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-2)}:host(:focus) .button{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:active) .button{--calcite-internal-navigation-user-background-color: var(--calcite-color-foreground-3)}:host([active]) .button{border-block-end-color:var(--calcite-navigation-accent-color, var(--calcite-color-brand))}:host([hidden]){display:none}[hidden]{display:none}`;
class s extends n {
  constructor() {
    super(...arguments), this.textDisabled = !1;
  }
  static {
    this.properties = { active: 7, fullName: 1, label: 1, textDisabled: 7, thumbnail: 1, userId: 1, username: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = c;
  }
  async setFocus() {
    await l(this), this.el.focus();
  }
  render() {
    return e`<button .ariaLabel=${this.label} class=${a(t.button)}><calcite-avatar .fullName=${this.fullName} .label=${this.label} .thumbnail=${this.thumbnail} .userId=${this.userId} .username=${this.username}></calcite-avatar>${(this.fullName || this.username) && !this.textDisabled && e`<div class=${a(t.textContainer)}>${this.fullName && i(t.fullName, e`<span class=${a(t.fullName)}>${this.fullName}</span>`) || ""}${this.username && i(t.username, e`<span class=${a(t.username)}>${this.username}</span>`) || ""}</div>` || ""}</button>`;
  }
}
r("calcite-navigation-user", s);
export {
  s as NavigationUser
};
