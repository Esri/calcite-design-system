import { j as x, L as g, n as b, x as n, s, k as m } from "./iframe.js";
import { f, d as y } from "./dom.js";
import { c as v } from "./component.js";
import { t as w, E as T } from "./ExpandToggle.js";
import { c as G } from "./observers.js";
import { u as E } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const l = {
  actionGroupEnd: "action-group--end",
  container: "container"
}, k = {
  expandTooltip: "expand-tooltip"
}, C = x`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:block}@keyframes in{0%{opacity:0}to{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-action-pad-corner-radius, .125rem);background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width, auto)}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:1px}.container{display:inline-flex;flex-direction:column;overflow:hidden;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);gap:var(--calcite-action-pad-items-space, 0);border-radius:calc(var(--calcite-action-pad-corner-radius, .125rem) * 2);background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:1px}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends g {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.mutationObserver = G("mutation", () => this.updateGroups()), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionPadToggle.emit();
    }, this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.messages = E(), this.overlayPositioning = "absolute", this.scale = "m", this.calciteActionPadToggle = b({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }
  static {
    this.properties = { expandTooltip: 16, actionsEndGroupLabel: 1, expandDisabled: 7, expanded: 7, layout: 3, messageOverrides: 0, overlayPositioning: 3, position: 3, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = C;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await v(this), f(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  willUpdate(t) {
    t.has("expanded") && this.hasUpdated && w({ el: this.el, expanded: this.expanded }), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  actionMenuOpenHandler(t) {
    if (t.target.menuOpen) {
      const e = t.composedPath();
      this.actionGroups?.forEach((o) => {
        e.includes(o) || (o.menuOpen = !1);
      });
    }
  }
  updateGroups() {
    const t = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = t, this.setGroupLayout(t);
  }
  setGroupLayout(t) {
    t.forEach((e) => e.layout = this.layout);
  }
  handleDefaultSlotChange() {
    this.updateGroups();
  }
  handleTooltipSlotChange(t) {
    const e = y(t).filter((o) => o?.matches("calcite-tooltip"));
    this.expandTooltip = e[0];
  }
  // #endregion
  // #region Rendering
  renderBottomActionGroup() {
    const { expanded: t, expandDisabled: e, messages: o, el: c, position: r, toggleExpand: d, scale: a, layout: p, actionsEndGroupLabel: h, overlayPositioning: u } = this, i = e ? null : T({ collapseLabel: o.collapseLabel, collapseText: o.collapse, el: c, expandLabel: o.expandLabel, expandText: o.expand, expanded: t, position: r, scale: a, toggle: d, tooltip: this.expandTooltip });
    return i ? n`<calcite-action-group class=${s(l.actionGroupEnd)} .label=${h} .layout=${p} .overlayPositioning=${u} .scale=${a}><slot name=${k.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${i}</calcite-action-group>` : null;
  }
  render() {
    return n`<div class=${s(l.container)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
}
m("calcite-action-pad", L);
export {
  L as ActionPad
};
