import { b as g, L as m, c as a, s as n, x as c, q as b } from "./index.js";
import { d as f } from "./dom.js";
import { t as y, E as v } from "./ExpandToggle.js";
import { c as A } from "./observers.js";
import { u as w } from "./useT9n.js";
import { u as E } from "./useSetFocus.js";
import { l as S } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const l = {
  actionGroupEnd: "action-group--end",
  container: "container"
}, T = {
  expandTooltip: "expand-tooltip"
}, G = g`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:block}@keyframes in{0%{opacity:0}to{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-action-pad-corner-radius, .125rem);background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width, auto)}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:1px}.container{display:inline-flex;flex-direction:column;overflow:hidden;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);gap:var(--calcite-action-pad-items-space, 0);border-radius:calc(var(--calcite-action-pad-corner-radius, .125rem) * 2);background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:1px}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends m {
  constructor() {
    super(), this.actions = [], this.mutationObserver = A("mutation", () => this.mutationObserverHandler()), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionPadToggle.emit();
    }, this.messages = w(), this.focusSetter = E()(this), this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionPadCollapse = a({ cancelable: !1 }), this.calciteActionPadExpand = a({ cancelable: !1 }), this.calciteActionPadToggle = a({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }
  static {
    this.properties = { expandTooltip: 16, actionsEndGroupLabel: 1, expandDisabled: 7, expanded: 7, layout: 3, messageOverrides: 0, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = G;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateActions(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  async load() {
    S.deprecated("component", {
      name: "action-pad",
      removalVersion: 4,
      suggested: "action-bar"
    });
  }
  willUpdate(t) {
    t.has("expanded") && this.hasUpdated && y({ el: this.el, expanded: this.expanded }), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups(), t.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionPadExpand.emit() : this.calciteActionPadCollapse.emit()), t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  actionMenuOpenHandler(t) {
    if (t.target.menuOpen) {
      const o = t.composedPath();
      this.actionGroups?.forEach((e) => {
        o.includes(e) || (e.menuOpen = !1);
      });
    }
  }
  updateGroups() {
    const t = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = t, this.setGroupLayout(t);
  }
  setGroupLayout(t) {
    t.forEach((o) => o.layout = this.layout);
  }
  handleDefaultSlotChange() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  handleTooltipSlotChange(t) {
    const o = f(t).filter((e) => e?.matches("calcite-tooltip"));
    this.expandTooltip = o[0];
  }
  updateActions() {
    this.actions.forEach((t) => {
      t.selectionAppearance = this.selectionAppearance;
    });
  }
  queryAndStoreActions() {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }
  mutationObserverHandler() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  renderBottomActionGroup() {
    const { expanded: t, expandDisabled: o, messages: e, el: r, position: d, toggleExpand: p, scale: i, layout: h, actionsEndGroupLabel: u, overlayPositioning: x } = this, s = o ? null : v({ collapseLabel: e.collapseLabel, collapseText: e.collapse, el: r, expandLabel: e.expandLabel, expandText: e.expand, expanded: t, position: d, scale: i, toggle: p, tooltip: this.expandTooltip });
    return s ? c`<calcite-action-group class=${n(l.actionGroupEnd)} .label=${u} .layout=${h} .overlayPositioning=${x} .scale=${i}><slot name=${T.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${s}</calcite-action-group>` : null;
  }
  render() {
    return c`<div class=${n(l.container)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
}
b("calcite-action-pad", C);
export {
  C as ActionPad
};
