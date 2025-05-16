import { a as v, L as w, d as A, s as p, x as u, D as y, c as z } from "./iframe.js";
import { f as E, s as f, d as C } from "./dom.js";
import { c as D } from "./component.js";
import { c as b } from "./observers.js";
import { q as S, t as O, E as T, o as G } from "./ExpandToggle.js";
import { u as H } from "./useT9n.js";
import { d as $ } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const k = ({
  bufferSize: r = 0,
  containerSize: t,
  itemSizes: o
}) => {
  const e = t - r;
  let i = o.length, a = 0;
  for (const [n, s] of o.entries())
    if (a = a + s, a > e) {
      i = n;
      break;
    } else
      continue;
  return i;
}, B = ({
  bufferSize: r = 0,
  containerSize: t,
  itemSizes: o
}) => Math.max(o.length - k({ bufferSize: r, itemSizes: o, containerSize: t }), 0), g = {
  container: "container",
  actionGroupEnd: "action-group--end"
}, h = {
  actionsEnd: "actions-end",
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
}, L = v`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-flex;align-self:stretch;background:transparent}.container{display:inline-flex;flex:1 1 auto;flex-direction:column;gap:var(--calcite-action-bar-items-space, 0);background-color:var(--calcite-action-bar-background-color, var(--calcite-color-foreground-1))}@keyframes in{0%{opacity:0}to{opacity:1}}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-corner-radius-round));--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--calcite-action-bar-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:var(--calcite-border-width-sm)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}`;
class M extends w {
  constructor() {
    super(), this.mutationObserver = b("mutation", () => this.mutationObserverHandler()), this.resize = $(({ width: t, height: o }) => {
      const { expanded: e, expandDisabled: i, layout: a, overflowActionsDisabled: n, actionGroups: s } = this;
      if (n || a === "vertical" && !o || a === "horizontal" && !t)
        return;
      const l = this.getItemSizes();
      this.updateGroups();
      const c = this.hasActionsEnd || this.hasBottomActions || !i ? s.length + 1 : s.length, d = B({
        bufferSize: c,
        // 1px border for each group
        containerSize: a === "horizontal" ? t : o,
        itemSizes: l
      });
      G({
        actionGroups: s,
        expanded: e,
        overflowCount: d
      });
    }, y.resize), this.resizeHandler = (t) => {
      const { width: o, height: e } = t.contentRect;
      this.resize({ width: o, height: e });
    }, this.resizeObserver = b("resize", (t) => this.resizeHandlerEntries(t)), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionBarToggle.emit();
    }, this.messages = H(), this.hasActionsEnd = !1, this.hasBottomActions = !1, this.floating = !1, this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.overflowActionsDisabled = !1, this.overlayPositioning = "absolute", this.scale = "m", this.calciteActionBarToggle = A({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }
  static {
    this.properties = { expandTooltip: 16, hasActionsEnd: 16, hasBottomActions: 16, actionsEndGroupLabel: 1, floating: 7, expandDisabled: 7, expanded: 7, layout: 3, messageOverrides: 0, overflowActionsDisabled: 7, overlayPositioning: 3, position: 3, scale: 3 };
  }
  static {
    this.styles = L;
  }
  async overflowActions() {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  async setFocus() {
    await D(this), E(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateGroups(), this.overflowActions(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
  }
  willUpdate(t) {
    t.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== !1) && this.overflowActions(), t.has("expanded") && this.hasUpdated && this.expandedHandler(), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups(), t.has("overflowActionsDisabled") && (this.hasUpdated || this.overflowActionsDisabled !== !1) && this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
  }
  loaded() {
    this.overflowActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect();
  }
  getItemSizes() {
    const { el: t, layout: o, expandToggleEl: e } = this, i = S(t);
    e && i.push(e);
    const a = o === "horizontal" ? "clientWidth" : "clientHeight", n = Math.max(...i.map((s) => s[a] || 0));
    return i.map((s) => s[a] || n);
  }
  expandedHandler() {
    const { el: t, expanded: o } = this;
    O({ el: t, expanded: o }), this.overflowActions();
  }
  overflowActionsDisabledHandler(t) {
    if (t) {
      this.resizeObserver?.disconnect();
      return;
    }
    this.resizeObserver?.observe(this.el), this.overflowActions();
  }
  actionMenuOpenHandler(t) {
    if (t.target.menuOpen) {
      const o = t.composedPath();
      this.actionGroups?.forEach((e) => {
        o.includes(e) || (e.menuOpen = !1);
      });
    }
  }
  mutationObserverHandler() {
    this.updateGroups(), this.overflowActions();
  }
  resizeHandlerEntries(t) {
    t.forEach(this.resizeHandler);
  }
  updateGroups() {
    const t = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = t, t.forEach((o) => {
      o.layout = this.layout, o.scale = this.scale;
    });
  }
  handleDefaultSlotChange() {
    this.updateGroups();
  }
  handleActionsEndSlotChange(t) {
    this.hasActionsEnd = f(t);
  }
  handleBottomActionsSlotChange(t) {
    this.hasBottomActions = f(t);
  }
  handleTooltipSlotChange(t) {
    const o = C(t).filter((e) => e?.matches("calcite-tooltip"));
    this.expandTooltip = o[0];
  }
  renderBottomActionGroup() {
    const { expanded: t, expandDisabled: o, el: e, position: i, toggleExpand: a, scale: n, layout: s, messages: l, actionsEndGroupLabel: c, overlayPositioning: d } = this, x = o ? null : T({ collapseLabel: l.collapseLabel, collapseText: l.collapse, el: e, expandLabel: l.expandLabel, expandText: l.expand, expanded: t, position: i, ref: (m) => this.expandToggleEl = m, scale: n, toggle: a, tooltip: this.expandTooltip });
    return u`<calcite-action-group class=${p(g.actionGroupEnd)} .hidden=${this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions)} .label=${c} .layout=${s} .overlayPositioning=${d} .scale=${n}><slot name=${h.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot><slot name=${h.bottomActions} @slotchange=${this.handleBottomActionsSlotChange}></slot><slot name=${h.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${x}</calcite-action-group>`;
  }
  render() {
    return u`<div class=${p(g.container)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
}
z("calcite-action-bar", M);
export {
  M as ActionBar
};
