import { b as n, L as r, s as a, x as i, q as c } from "./index.js";
import { i as l } from "./keyed.js";
import { d } from "./dom.js";
import { l as h } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = {
  actionBarContainer: "action-bar-container",
  content: "content"
}, p = {
  actionBar: "action-bar"
}, m = n`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{z-index:var(--calcite-z-index);display:flex;flex:1 1 auto;overflow:hidden;background-color:transparent}.content{margin:0;display:flex;block-size:100%;inline-size:100%;overflow:hidden;flex:1 0 0}.action-bar-container{display:flex}:host([detached]){margin-inline:.5rem;margin-block:.5rem 1.5rem}@keyframes in-up{0%{opacity:0;transform:translate3D(0,5px,0)}to{opacity:1;transform:translateZ(0)}}:host([detached]){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:.25rem;border-width:0px;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([position=end]){align-self:flex-end}:host([position=start]){align-self:flex-start}:host([height-scale=s]){block-size:33.333333%}:host([height-scale=m]){block-size:70%}:host([height-scale=l]){block-size:100%}:host([height-scale=l][detached]){block-size:calc(100% - 2rem)}::slotted(calcite-panel){block-size:100%;inline-size:100%}::slotted(calcite-action-bar),::slotted(calcite-action-bar[position=end]){border-inline-end:1px solid;border-color:var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends r {
  constructor() {
    super(...arguments), this.detached = !1, this.heightScale = "s", this.position = "end";
  }
  static {
    this.properties = { actionBar: 16, detached: 7, heightScale: 3, position: 3 };
  }
  static {
    this.styles = m;
  }
  load() {
    h.deprecated("component", {
      name: "shell-center-row",
      removalVersion: 4,
      suggested: "shell-panel"
    });
  }
  loaded() {
    this.actionBar?.position === "end" && this.requestUpdate();
  }
  handleActionBarSlotChange(o) {
    this.actionBar = d(o).filter((t) => t.matches("calcite-action-bar"))[0];
  }
  render() {
    const { actionBar: o } = this, t = i`<div class=${a(s.content)}><slot></slot></div>`, e = [l("action-bar", i`<div class=${a(s.actionBarContainer)} .hidden=${!this.actionBar}><slot name=${p.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`), t];
    return o?.position === "end" && e.reverse(), e;
  }
}
c("calcite-shell-center-row", x);
export {
  x as ShellCenterRow
};
