import { b as A, L as w, c as h, s as u, x as f, D as y, q as z } from "./index.js";
import { s as b, d as E } from "./dom.js";
import { c as g } from "./observers.js";
import { q as S, t as C, E as D, o as O } from "./ExpandToggle.js";
import { u as T } from "./useT9n.js";
import { u as B } from "./useCancelable.js";
import { u as G } from "./useSetFocus.js";
import { d as H } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const $ = ({
  bufferSize: r = 0,
  containerSize: t,
  itemSizes: e
}) => {
  const o = t - r;
  let s = e.length, a = 0;
  for (const [n, i] of e.entries())
    if (a = a + i, a > o) {
      s = n;
      break;
    } else
      continue;
  return s;
}, k = ({
  bufferSize: r = 0,
  containerSize: t,
  itemSizes: e
}) => Math.max(e.length - $({ bufferSize: r, itemSizes: e, containerSize: t }), 0), x = {
  container: "container",
  actionGroupEnd: "action-group--end"
}, p = {
  actionsEnd: "actions-end",
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
}, L = A`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-flex;align-self:stretch;background:transparent}.container{display:inline-flex;flex:1 1 auto;flex-direction:column;gap:var(--calcite-action-bar-items-space, 0);background-color:var(--calcite-action-bar-background-color, var(--calcite-color-foreground-1))}@keyframes in{0%{opacity:0}to{opacity:1}}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-corner-radius-round));--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--calcite-action-bar-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:var(--calcite-border-width-sm)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends w {
  constructor() {
    super(), this.actions = [], this.mutationObserver = g("mutation", () => this.mutationObserverHandler()), this.cancelable = B()(this), this.resize = H(({ width: t, height: e }) => {
      const { expanded: o, expandDisabled: s, layout: a, overflowActionsDisabled: n, actionGroups: i } = this;
      if (n || a === "vertical" && !e || a === "horizontal" && !t)
        return;
      const l = this.getItemSizes();
      this.updateGroups();
      const c = this.hasActionsEnd || this.hasBottomActions || !s ? i.length + 1 : i.length, d = k({
        bufferSize: c,
        // 1px border for each group
        containerSize: a === "horizontal" ? t : e,
        itemSizes: l
      });
      O({
        actionGroups: i,
        expanded: o,
        overflowCount: d
      });
    }, y.resize), this.resizeHandler = (t) => {
      const { width: e, height: o } = t.contentRect;
      this.resize({ width: e, height: o });
    }, this.resizeObserver = g("resize", (t) => this.resizeHandlerEntries(t)), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionBarToggle.emit();
    }, this.messages = T(), this.focusSetter = G()(this), this.hasActionsEnd = !1, this.hasBottomActions = !1, this.floating = !1, this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.overflowActionsDisabled = !1, this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionBarCollapse = h({ cancelable: !1 }), this.calciteActionBarExpand = h({ cancelable: !1 }), this.calciteActionBarToggle = h({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }
  static {
    this.properties = { expandTooltip: 16, hasActionsEnd: 16, hasBottomActions: 16, actionsEndGroupLabel: 1, floating: 7, expandDisabled: 7, expanded: 7, layout: 3, messageOverrides: 0, overflowActionsDisabled: 7, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.styles = L;
  }
  async overflowActions() {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateGroups(), this.overflowActions(), this.updateActions(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.overflowActionsDisabledHandler(this.overflowActionsDisabled), this.cancelable.add(this.resize);
  }
  willUpdate(t) {
    t.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== !1) && this.overflowActions(), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups(), t.has("overflowActionsDisabled") && (this.hasUpdated || this.overflowActionsDisabled !== !1) && this.overflowActionsDisabledHandler(this.overflowActionsDisabled), t.has("expanded") && this.hasUpdated && (this.expandedHandler(), this.expanded ? this.calciteActionBarExpand.emit() : this.calciteActionBarCollapse.emit()), t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
  }
  loaded() {
    this.overflowActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect();
  }
  getItemSizes() {
    const { el: t, layout: e, expandToggleEl: o } = this, s = S(t);
    o && s.push(o);
    const a = e === "horizontal" ? "clientWidth" : "clientHeight", n = Math.max(...s.map((i) => i[a] || 0));
    return s.map((i) => i[a] || n);
  }
  expandedHandler() {
    const { el: t, expanded: e } = this;
    C({ el: t, expanded: e }), this.overflowActions();
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
      const e = t.composedPath();
      this.actionGroups?.forEach((o) => {
        e.includes(o) || (o.menuOpen = !1);
      });
    }
  }
  mutationObserverHandler() {
    this.updateGroups(), this.overflowActions(), this.queryAndStoreActions(), this.updateActions();
  }
  resizeHandlerEntries(t) {
    t.forEach(this.resizeHandler);
  }
  updateGroups() {
    const t = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = t, t.forEach((e) => {
      e.layout = this.layout, e.scale = this.scale;
    });
  }
  handleDefaultSlotChange() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  handleActionsEndSlotChange(t) {
    this.hasActionsEnd = b(t);
  }
  handleBottomActionsSlotChange(t) {
    this.hasBottomActions = b(t);
  }
  handleTooltipSlotChange(t) {
    const e = E(t).filter((o) => o?.matches("calcite-tooltip"));
    this.expandTooltip = e[0];
  }
  updateActions() {
    this.actions.forEach((t) => {
      t.selectionAppearance = this.selectionAppearance;
    });
  }
  queryAndStoreActions() {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }
  renderBottomActionGroup() {
    const { expanded: t, expandDisabled: e, el: o, position: s, toggleExpand: a, scale: n, layout: i, messages: l, actionsEndGroupLabel: c, overlayPositioning: d } = this, m = e ? null : D({ collapseLabel: l.collapseLabel, collapseText: l.collapse, el: o, expandLabel: l.expandLabel, expandText: l.expand, expanded: t, position: s, ref: (v) => this.expandToggleEl = v, scale: n, toggle: a, tooltip: this.expandTooltip });
    return f`<calcite-action-group class=${u(x.actionGroupEnd)} .hidden=${this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions)} .label=${c} .layout=${i} .overlayPositioning=${d} .scale=${n}><slot name=${p.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot><slot name=${p.bottomActions} @slotchange=${this.handleBottomActionsSlotChange}></slot><slot name=${p.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${m}</calcite-action-group>`;
  }
  render() {
    return f`<div class=${u(x.container)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
}
z("calcite-action-bar", q);
export {
  q as ActionBar
};
