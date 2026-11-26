/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { A as H, b as E, a as V, L as _, c as L, o as Q, s as O, d as J, D as X } from "./index.js";
import { d as Y } from "./debounce.js";
import { n as C, e as y } from "./ref.js";
import { u as Z } from "./index2.js";
import { G as F, d as tt, b as et, k as b } from "./dom.js";
import { c as it } from "./observers.js";
import { S as w, i as g } from "./resources4.js";
import { u as nt } from "./useT9n.js";
import { u as at } from "./useCancelable.js";
import { i as ot } from "./resources3.js";
import { u as st } from "./useFocusable.js";
import { i as f } from "./resources.js";
import { i as A, S as P } from "./resources5.js";
import { S as B, C as S } from "./resources6.js";
const W = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function rt(l, t) {
  return t || l.closest("calcite-shell-panel")?.position || "start";
}
function ct({ actions: l, expandables: t, expanded: e }) {
  l.filter((i) => i.slot !== w.menuActions).forEach((i) => i.textEnabled = e), t.forEach((i) => i.expanded = e);
}
const lt = ({ tooltip: l, referenceElement: t, expanded: e, ref: i }) => (l && (l.referenceElement = !e && t ? t : void 0), i && i(t), t), dt = ({ collapseText: l, collapseLabel: t, direction: e, expanded: i, expandText: n, expandLabel: o, toggle: s, el: a, position: c, tooltip: r, ref: d, scale: M }) => {
  const G = e === "rtl", I = i ? l : n, p = i ? t : o, h = [W.chevronsLeft, W.chevronsRight];
  G && h.reverse();
  const v = rt(a, c) === "end", T = v ? h[1] : h[0], u = v ? h[0] : h[1];
  return E`<calcite-action .aria=${{ expanded: i }} .icon=${i ? T : u} id=expand-toggle .label=${p} @click=${s} .scale=${M} .text=${I} .textEnabled=${i} title=${(!i && !r ? I : void 0) ?? H} ${C((N) => lt({ tooltip: r, referenceElement: N, expanded: i, ref: d }))}></calcite-action>`;
}, ht = ({
  bufferSize: l = 0,
  containerSize: t,
  itemSizes: e
}) => {
  const i = t - l;
  let n = e.length, o = 0;
  for (const [s, a] of e.entries())
    if (o = o + a, o > i) {
      n = s;
      break;
    } else
      continue;
  return n;
}, ut = ({
  bufferSize: l = 0,
  containerSize: t,
  itemSizes: e
}) => Math.max(e.length - ht({ bufferSize: l, itemSizes: e, containerSize: t }), 0), pt = (l) => l.flatMap((t) => g(t) ? t.actions : A(t) ? t.actions.filter((e) => e.slot === P.trigger) : t).filter((t) => !!t), ft = ({
  item: l,
  containerRect: t,
  horizontal: e,
  rtl: i
}) => {
  const n = l.getBoundingClientRect();
  return e ? n.top - t.top : i ? t.right - n.right : n.left - t.left;
}, gt = ({
  actionGroups: l,
  expanded: t,
  overflowCount: e
}) => {
  let i = e;
  [...l].reverse().forEach((n) => {
    let o = 0;
    const s = n.actions.filter((a) => a.parentElement === n).reverse();
    s.forEach((a) => {
      a.slot === w.menuActions && (a.removeAttribute("slot"), a.textEnabled = t);
    }), i > 0 && !n.overflowActionsDisabled && s.some((a) => (s.filter((r) => !r.slot).length > 1 && s.length > 2 && !a.closest("calcite-action-menu") && !a.overflowDisabled && (a.textEnabled = !0, a.setAttribute("slot", w.menuActions), o++, o > 1 && i--), i < 1)), n.manager.component.requestUpdate();
  });
}, vt = V`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size-relative-base)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-bar-gap: var( --calcite-action-bar-items-space, var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs)) );--calcite-internal-action-bar-padding: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=m]){--calcite-internal-action-bar-gap: var( --calcite-action-bar-items-space, var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) );--calcite-internal-action-bar-padding: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-space-sm-plus));--calcite-internal-action-bar-padding: var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus))}:host{display:inline-flex;align-self:stretch;background:transparent;--calcite-internal-action-group-dividing-border-margin: calc( var(--calcite-theme-space-base, var(--calcite-spacing-base)) + 1px )}.container{display:inline-flex;flex-direction:column;flex:1 1 auto;background-color:var(--calcite-action-bar-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));gap:var(--calcite-internal-action-bar-gap);padding:var(--calcite-internal-action-bar-padding)}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));box-shadow:var(--calcite-action-bar-shadow, var(--calcite-shadow-md))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;padding-block-end:var(--calcite-internal-action-bar-padding)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;border-inline-end-width:var(--calcite-border-width-sm);padding-inline-end:var(--calcite-internal-action-bar-padding)}.action-group--end{justify-content:flex-end}.line-overlay{position:absolute;inset:0;pointer-events:none}.line{position:absolute;--calcite-internal-action-bar-divider-inset: calc( var(--calcite-internal-action-group-dividing-border-margin) - var(--calcite-border-width-sm) )}:host([overflow-mode=wrap][layout=horizontal]) .container,:host([overflow-mode=wrap][layout=vertical]) .container{position:relative;flex-wrap:wrap;align-content:flex-start;--calcite-internal-action-bar-line-gap: calc( var(--calcite-internal-action-bar-padding) + var(--calcite-internal-action-bar-gap) )}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group[slot=actions-start]),:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group[slot=actions-start]){padding-inline-end:0;padding-block-end:0;border-inline-end-width:0;border-block-end-width:0}:host([overflow-mode=wrap][layout=horizontal]) .container{row-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-inline-start:calc(-1 * var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-action-bar-padding) 0;border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:0;border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=horizontal]) .line{inset-inline:var(--calcite-internal-action-bar-padding);block-size:var(--calcite-border-width-sm);inset-block-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to right,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups{overflow:hidden;padding-inline-start:0;column-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups .action-group--start{padding-inline-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=wrap][layout=vertical]) .container{block-size:100%;min-block-size:0;column-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-block-start:calc(-1 * var(--calcite-border-width-sm));padding-block:var(--calcite-internal-action-bar-padding) 0;border-block-start-width:var(--calcite-border-width-sm);border-block-end-width:0;border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=vertical]) .line{inset-block:var(--calcite-internal-action-bar-padding);inline-size:var(--calcite-border-width-sm);inset-inline-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to bottom,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups{overflow:hidden;padding-block-start:0;row-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups .action-group--start{padding-block-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=none][layout=horizontal]) .container{overflow-x:auto}:host([overflow-mode=none][layout=vertical]) .container{overflow-y:auto}:host([hidden]){display:none}[hidden]{display:none}`;
class mt extends _ {
  constructor() {
    super(), this.actions = [], this.navigationItems = [], this.containerRef = y(), this.defaultSlotRef = y(), this.actionsStartSlotRef = y(), this.actionsEndSlotRef = y(), this.actionsStartGroupRef = y(), this.actionsEndGroupRef = y(), this.direction = Z(), this.defaultSlotItems = [], this.actionGroups = [], this.actionMenus = [], this.actionsStart = [], this.actionsStartGroups = [], this.actionsEnd = [], this.actionsEndGroups = [], this.automaticallyOverflowedActions = [], this.authoredMenuActions = [], this.overflowPassId = 0, this.suppressedActionGroupActionsChange = /* @__PURE__ */ new WeakMap(), this.cancelable = at()(this), this.resize = Y(({ width: t, height: e }) => {
      const { expanded: i, expandToggleDisabled: n, layout: o, expandPosition: s } = this;
      if (!this.el.isConnected || !this.containerRef.value)
        return;
      if (this.updateGroups(), this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      if (this.overflowMode !== "collapse" || o === "vertical" && !e || o === "horizontal" && !t)
        return;
      const a = this.getItemSizes(), { actionGroups: c, actionsEnd: r, actionsEndGroups: d, actionsStart: M, actionsStartGroups: G, defaultSlotItems: I } = this, p = [
        ...G,
        ...c,
        ...d
      ], h = this.hasActionsEnd || !n && s === "end" ? 1 : 0, v = this.hasActionsStart || !n && s === "start" ? 1 : 0, T = I.length + h + v;
      let u = T;
      const x = getComputedStyle(this.containerRef.value);
      if (u += b(o === "horizontal" ? x.paddingInlineStart : x.paddingBlockStart) + b(o === "horizontal" ? x.paddingInlineEnd : x.paddingBlockEnd), p.length > 0) {
        const z = p.length - 1;
        p.forEach((k, D) => {
          const m = getComputedStyle(k), R = b(m.gap), $ = this.getActionGroupItemCount(k), j = Math.max($ - 1, 0);
          u += R * j, D !== z && (u += b(o === "horizontal" ? m.paddingInlineEnd : m.paddingBlockEnd), u += b(o === "horizontal" ? m.borderInlineEndWidth : m.borderBlockEndWidth));
        });
      }
      const N = (z, k, D) => {
        if (!k || z.length < 1)
          return;
        const m = getComputedStyle(k), R = b(m.gap), $ = z.length + (D ? 1 : 0);
        u += R * Math.max($ - 1, 0);
      }, U = !n && s === "start", q = !n && s === "end";
      N(M, this.actionsStartGroupRef.value, U), N(r, this.actionsEndGroupRef.value, q), T > 1 && (u += b(x.gap) * (T - 1));
      const K = ut({
        bufferSize: u,
        containerSize: o === "horizontal" ? t : e,
        itemSizes: a
      });
      this.runOverflowActions({
        actionGroups: p,
        expanded: i,
        overflowCount: K
      });
    }, X.resize), this.resizeHandler = (t) => {
      if (this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      const { width: e, height: i } = t.target && t.target !== this.el ? { width: this.el.clientWidth, height: this.el.clientHeight } : t.contentRect, n = this.layout === "horizontal" ? "width" : "height", o = n === "width" ? e : i;
      this.lastOverflowAxisSize?.axis === n && this.lastOverflowAxisSize.size === o || (this.lastOverflowAxisSize = { axis: n, size: o }, this.resize({ width: e, height: i }));
    }, this.resizeObserver = it("resize", (t) => this.resizeHandlerEntries(t)), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionBarToggle.emit();
    }, this.messages = nt({ blocking: !0 }), this.focusSetter = st()(this).setFocus, this.setExpandToggleEl = (t) => {
      this.expandToggleEl = t, this.syncNavigationItemTabIndexes();
    }, this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasActionGroups = !1, this.lineOffsets = [], this.floating = !1, this.expandToggleDisabled = !1, this.expanded = !1, this.expandPosition = "end", this.layout = "vertical", this.overflowMode = "collapse", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionBarCollapse = L({ cancelable: !1 }), this.calciteActionBarExpand = L({ cancelable: !1 }), this.calciteActionBarToggle = L({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler), this.listen("calciteInternalActionGroupActionsChange", this.handleActionGroupActionsChange), this.listen("calciteInternalActionMenuActionsChange", this.handleActionMenuActionsChange), this.listen("click", this.handleFocusIn), this.listen("keydown", this.handleKeyDown), this.listen("focusin", this.handleFocusIn);
  }
  static {
    this.properties = { expandTooltip: 16, hasActionsEnd: 16, hasActionsStart: 16, hasActionGroups: 16, lineOffsets: 16, actionsEndGroupLabel: 1, actionsStartGroupLabel: 1, floating: 7, expandToggleDisabled: 7, expanded: 7, expandPosition: 3, layout: 3, overflowMode: 3, messageOverrides: 0, overflowActionsDisabled: 7, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.styles = vt;
  }
  get usesWrap() {
    return this.overflowMode === "wrap" && this.layout !== "grid";
  }
  get overflowActionsDisabled() {
    return this.overflowMode === "none";
  }
  set overflowActionsDisabled(t) {
    Q.deprecated("property", {
      component: this,
      name: "overflowActionsDisabled",
      removalVersion: 7,
      suggested: 'overflowMode="none"'
    }), this.overflowMode = t ? "none" : "collapse";
  }
  async overflowActions() {
    if (this.overflowMode !== "collapse") {
      this.usesWrap && this.scheduleLineMeasure();
      return;
    }
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateGroups(), this.updateNavigationItems(), this.syncNavigationItemTabIndexes(), this.overflowActions(), this.updateActions(), this.overflowActionsDisabledHandler(this.overflowActionsDisabled), this.overflowModeHandler(), this.cancelable.add(this.resize);
  }
  willUpdate(t) {
    (t.has("expandToggleDisabled") && (this.hasUpdated || this.expandToggleDisabled !== !1) || t.has("expandPosition") && (this.hasUpdated || this.expandPosition !== "end")) && this.overflowActions(), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && (this.updateGroups(), this.overflowModeHandler(), this.usesWrap || this.updateLines()), t.has("overflowActionsDisabled") && (this.hasUpdated || this.overflowActionsDisabled !== !1) && this.overflowActionsDisabledHandler(this.overflowActionsDisabled), t.has("overflowMode") && (this.hasUpdated || this.overflowMode !== "collapse") && (!this.usesWrap && this.lineMeasureFrame != null && (cancelAnimationFrame(this.lineMeasureFrame), this.lineMeasureFrame = void 0), this.usesWrap ? this.scheduleLineMeasure() : this.updateLines(), this.overflowModeHandler()), t.has("expanded") && this.hasUpdated && (this.expandedHandler(), this.expanded ? this.calciteActionBarExpand.emit() : this.calciteActionBarCollapse.emit()), t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
  }
  updated() {
    this.usesWrap && this.lineMeasureFrame == null && this.scheduleLineMeasure();
  }
  loaded() {
    this.syncDefaultSlot(), this.syncActionsStartSlot(), this.syncActionsEndSlot(), this.syncActionsState(), this.overflowActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.lineMeasureFrame != null && (cancelAnimationFrame(this.lineMeasureFrame), this.lineMeasureFrame = void 0);
  }
  getItemSizes() {
    const { layout: t, expandToggleEl: e } = this, i = t === "horizontal" ? "clientWidth" : "clientHeight", n = this.actions.map((a) => a[i] || 0);
    this.getTrackedActionGroups().flatMap((a) => F(a, "calcite-action-menu")).forEach((a) => {
      const c = (a.actions ?? []).find((r) => r.slot === P.trigger);
      n.push((c ?? a)[i] || 0);
    }), e && n.push(e[i] || 0);
    const s = Math.max(...n, 0);
    return n.map((a) => a || s);
  }
  getActionGroupItemCount(t) {
    const e = t.actions.filter((n) => n.parentElement === t), i = F(t, "calcite-action-menu").length;
    return e.length + i;
  }
  expandedHandler() {
    this.syncActionsState(!0), this.overflowActions();
  }
  overflowModeHandler() {
    this.overflowMode === "none" ? this.resizeObserver?.disconnect() : this.resizeObserver?.observe(this.el), this.overflowActions();
  }
  overflowActionsDisabledHandler(t) {
    if (t) {
      this.resizeObserver?.disconnect();
      return;
    }
    this.resizeObserver?.observe(this.el), this.containerRef.value && this.resizeObserver?.observe(this.containerRef.value), this.overflowActions();
  }
  actionMenuOpenHandler(t) {
    const e = t.composedPath(), i = e.find((n) => g(n) || A(n));
    i && (g(i) && !i.menuOpen || A(i) && !i.open || (this.getTrackedActionGroups().forEach((n) => {
      e.includes(n) || (n.menuOpen = !1);
    }), this.getTrackedActionMenus().forEach((n) => {
      e.includes(n) || (n.open = !1);
    }), this.updateActions()));
  }
  runOverflowActions({ actionGroups: t, expanded: e, overflowCount: i }) {
    const n = ++this.overflowPassId, o = t.flatMap((a) => a.actions.filter((c) => c.parentElement === a));
    this.automaticallyOverflowedActions = this.automaticallyOverflowedActions.filter((a) => o.includes(a)), this.authoredMenuActions = this.authoredMenuActions.filter((a) => o.includes(a) && a.slot === w.menuActions), o.forEach((a) => {
      a.slot === w.menuActions && !this.automaticallyOverflowedActions.includes(a) && !this.authoredMenuActions.includes(a) && this.authoredMenuActions.push(a);
    });
    const s = /* @__PURE__ */ new Map();
    t.forEach((a) => {
      const c = a.actions.filter((r) => r.parentElement === a);
      s.set(a, c.map((r) => r.slot ?? "").join("|"));
    }), gt({
      actionGroups: t,
      expanded: e,
      overflowCount: i
    }), this.authoredMenuActions.forEach((a) => {
      a.slot = w.menuActions, a.textEnabled = !0;
    }), this.automaticallyOverflowedActions = o.filter((a) => a.slot === w.menuActions && !this.authoredMenuActions.includes(a)), t.forEach((a) => {
      const r = a.actions.filter((d) => d.parentElement === a).map((d) => d.slot ?? "").join("|");
      s.get(a) !== r && (this.suppressedActionGroupActionsChange.set(a, n), this.queueSuppressedActionGroupActionsChangeCleanup(a, n));
    });
  }
  queueSuppressedActionGroupActionsChangeCleanup(t, e) {
    queueMicrotask(() => {
      this.suppressedActionGroupActionsChange.get(t) === e && this.suppressedActionGroupActionsChange.delete(t);
    });
  }
  resizeHandlerEntries(t) {
    t.forEach(this.resizeHandler);
  }
  getSectionWrapperGroups() {
    return [this.actionsStartGroupRef.value, this.actionsEndGroupRef.value].filter((t) => !!t);
  }
  updateGroups() {
    const t = [
      ...this.actionGroups,
      ...this.actionsStartGroups,
      ...this.actionsEndGroups,
      ...this.getSectionWrapperGroups()
    ];
    this.hasActionGroups = this.actionGroups.length > 0, t.forEach((e) => {
      e.layout = this.layout, e.scale = this.scale;
    }), this.syncNavItems();
  }
  syncNavItems() {
    this.el.isConnected && (this.updateNavigationItems(), this.syncNavigationItemTabIndexes(), this.updateActions());
  }
  scheduleLineMeasure() {
    this.lineMeasureFrame != null && cancelAnimationFrame(this.lineMeasureFrame), this.lineMeasureFrame = requestAnimationFrame(() => {
      this.lineMeasureFrame = void 0, this.updateLines();
    });
  }
  getWrapItems() {
    const t = [], e = this.actionsStartGroupRef.value;
    e && !e.hidden && t.push(e), this.defaultSlotItems.forEach((n) => {
      n.hidden || t.push(n);
    });
    const i = this.actionsEndGroupRef.value;
    return i && !i.hidden && t.push(i), t;
  }
  updateLines() {
    const t = this.containerRef.value;
    if (!t || !this.usesWrap) {
      this.lineOffsets.length > 0 && (this.lineOffsets = []);
      return;
    }
    const e = this.layout === "horizontal", i = this.direction === "rtl", n = t.getBoundingClientRect(), o = this.getWrapItems(), s = [];
    let a = null;
    o.forEach((r) => {
      const d = ft({
        item: r,
        containerRect: n,
        horizontal: e,
        rtl: i
      });
      a !== null && Math.abs(d - a) > 1 && s.push(d), a = d;
    }), (s.length !== this.lineOffsets.length || s.some((r, d) => r !== this.lineOffsets[d])) && (this.lineOffsets = s);
  }
  handleDefaultSlotChange() {
    this.syncSlotAndActions(() => this.syncDefaultSlot()), this.updateGroups(), this.updateNavigationItems(), this.syncNavigationItemTabIndexes(), this.updateActions(), this.usesWrap && this.scheduleLineMeasure();
  }
  handleActionsEndSlotChange() {
    this.syncSlotAndActions(() => this.syncActionsEndSlot()), this.syncNavigationItemTabIndexes();
  }
  handleActionsStartSlotChange() {
    this.syncSlotAndActions(() => this.syncActionsStartSlot()), this.syncNavigationItemTabIndexes();
  }
  handleTooltipSlotChange(t) {
    const e = tt(t).filter(ot);
    this.expandTooltip = e[0];
  }
  updateActions() {
    const t = new Set(this.actions);
    this.getTrackedActionMenus().forEach((e) => {
      e.actions.forEach((i) => t.add(i));
    }), t.forEach((e) => {
      e.selectionAppearance = this.selectionAppearance;
    });
  }
  updateNavigationItems() {
    const t = [
      ...this.getNavigationItems(this.actionsStart),
      ...this.getNavigationItems(this.defaultSlotItems),
      ...this.getNavigationItems(this.actionsEnd)
    ], { expandToggleEl: e } = this;
    this.navigationItems = e && this.isNavigableAction(e) ? this.expandPosition === "start" ? [e, ...t] : [...t, e] : t;
  }
  getNavigationItems(t) {
    return t.flatMap((e) => f(e) ? this.isNavigableAction(e) ? [e] : [] : A(e) ? this.isNavigableActionMenu(e) ? [e] : [] : this.getActionGroupNavigationItems(e));
  }
  getActionGroupNavigationItems(t) {
    if (t.hasAttribute("hidden"))
      return [];
    const e = (t.actions ?? []).filter((s) => this.isNavigableAction(s)), i = F(t, "calcite-action-menu").filter((s) => this.isNavigableActionMenu(s)), n = [...e, ...i].sort((s, a) => s === a ? 0 : s.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1), { actionMenu: o } = t;
    return o && this.isNavigableActionMenu(o) && !n.includes(o) && n.push(o), n;
  }
  isNavigableAction(t) {
    return !t.disabled && !t.hidden && !t.inert && t.slot !== "menu-actions" && !t.closest("calcite-action-menu");
  }
  isNavigableActionMenu(t) {
    const e = t.menuButtonEl ?? t.actions?.find((i) => i.slot === P.trigger);
    return !t.hidden && !t.inert && !e?.disabled && !e?.hidden && !e?.inert;
  }
  syncActions() {
    this.actions = pt([
      ...this.actionsStart,
      ...this.defaultSlotItems,
      ...this.actionsEnd
    ]);
  }
  syncActionsAndOverflow() {
    this.syncActionsState(), this.overflowActions();
  }
  syncSlotAndActions(t) {
    t(), this.syncActionsAndOverflow();
  }
  syncActionsState(t = !1) {
    this.syncActions(), this.updateActions(), t && ct({
      actions: this.actions,
      expandables: [
        ...this.getTrackedActionGroups(),
        ...this.getTrackedActionMenus(),
        ...this.getSectionWrapperGroups()
      ],
      expanded: this.expanded
    });
  }
  getTrackedActionGroups() {
    return [...this.actionGroups, ...this.actionsStartGroups, ...this.actionsEndGroups];
  }
  getTrackedActionMenus() {
    return [...this.actionMenus, ...this.actionsStart, ...this.actionsEnd].filter((t) => A(t));
  }
  getAssignedActionBarItems(t) {
    return t ? et(t).filter((e) => f(e) || g(e) || A(e)) : [];
  }
  syncDefaultSlot() {
    this.defaultSlotItems = this.getAssignedActionBarItems(this.defaultSlotRef.value), this.actionGroups = this.defaultSlotItems.filter((t) => g(t)), this.actionMenus = this.defaultSlotItems.filter((t) => A(t)), this.updateGroups();
  }
  syncActionsStartSlot() {
    this.actionsStart = this.getAssignedActionBarItems(this.actionsStartSlotRef.value), this.actionsStartGroups = this.actionsStart.filter((t) => g(t)), this.hasActionsStart = this.actionsStart.length > 0, this.updateGroups();
  }
  syncActionsEndSlot() {
    this.actionsEnd = this.getAssignedActionBarItems(this.actionsEndSlotRef.value), this.actionsEndGroups = this.actionsEnd.filter((t) => g(t)), this.hasActionsEnd = this.actionsEnd.length > 0, this.updateGroups();
  }
  handleActionGroupActionsChange(t) {
    const e = t.target;
    this.getTrackedActionGroups().includes(e) && (this.suppressedActionGroupActionsChange.has(e) || (this.syncActionsAndOverflow(), this.syncNavigationItemTabIndexes()));
  }
  handleActionMenuActionsChange(t) {
    const e = t.target;
    this.getTrackedActionMenus().includes(e) && (this.syncActionsAndOverflow(), this.syncNavigationItemTabIndexes());
  }
  handleKeyDown(t) {
    if ((this.getEventActionMenu(t) || this.getOpenActionMenu())?.open)
      return t.key === "Escape", void 0;
    if (t.defaultPrevented)
      return;
    this.updateNavigationItems();
    const i = this.getNavigationItemFromEvent(t);
    if (!i || !this.navigationItems.length)
      return;
    if (this.layout === "grid" && ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(t.key)) {
      const r = t.key === "ArrowDown" || t.key === "ArrowRight" ? "next" : "previous";
      this.focusNavigationItem(r, i), t.preventDefault();
      return;
    }
    const n = this.layout !== "horizontal", o = t.composedPath().find(g), s = n ? "ArrowRight" : "ArrowDown", a = n ? "ArrowLeft" : "ArrowUp", c = i.matches("calcite-action-menu") && !i.open;
    if ((o?.selectionMode === "multiple" || o?.selectionMode === "none") && (t.key === s || t.key === a) && !c) {
      t.preventDefault();
      return;
    }
    if (!this.handleSecondaryArrowActionMenuOpen(t, i, n))
      switch (t.key) {
        case "ArrowDown":
          n ? (this.focusNavigationItem("next", i), t.preventDefault()) : this.focusActionGroupItem("next", i, o) && t.preventDefault();
          break;
        case "ArrowUp":
          n ? (this.focusNavigationItem("previous", i), t.preventDefault()) : this.focusActionGroupItem("previous", i, o) && t.preventDefault();
          break;
        case "ArrowRight":
          n ? this.focusActionGroupItem("next", i, o) && t.preventDefault() : (this.focusNavigationItem("next", i), t.preventDefault());
          break;
        case "ArrowLeft":
          n ? this.focusActionGroupItem("previous", i, o) && t.preventDefault() : (this.focusNavigationItem("previous", i), t.preventDefault());
          break;
        case "Home":
          this.focusNavigationItem("first", i), t.preventDefault();
          break;
        case "End":
          this.focusNavigationItem("last", i), t.preventDefault();
          break;
        case "Tab":
          t.composedPath().some((r) => f(r) && r.aria?.role === "menuitem") || this.setNavigationItemTabIndexes(i);
          break;
      }
  }
  handleSecondaryArrowActionMenuOpen(t, e, i) {
    if (!e.matches("calcite-action-menu") || e.open)
      return !1;
    const n = i ? "ArrowRight" : "ArrowDown", o = i ? "ArrowLeft" : "ArrowUp";
    return t.key !== n && t.key !== o ? !1 : (t.preventDefault(), this.openActionMenuAndFocusBoundaryItem(e, t.key === n ? "first" : "last"), !0);
  }
  openActionMenuAndFocusBoundaryItem(t, e) {
    t.open = !0, this.focusActionMenuBoundaryItem(t, e);
  }
  async focusActionMenuBoundaryItem(t, e) {
    if (await t.componentOnReady(), !t.open)
      return;
    const i = t.actions.filter((o) => o.aria?.role === "menuitem" && !o.disabled && !o.hidden && !o.inert);
    await (e === "first" ? i[0] : i[i.length - 1])?.setFocus({ preventScroll: !0 });
  }
  handleFocusIn(t) {
    this.updateNavigationItems();
    const e = this.getNavigationItemFromEvent(t);
    if (t instanceof MouseEvent) {
      t.detail > 0 && e && f(e) && this.setNavigationItemTabIndexes(e);
      return;
    }
    const i = this.getEventActionMenu(t) || this.getOpenActionMenu();
    if (!i?.open) {
      if (e?.matches("calcite-action-menu") && i) {
        this.syncClosedActionMenu(i);
        return;
      }
      this.syncNavigationItemTabIndexes(e ?? void 0);
    }
  }
  focusNavigationItem(t, e) {
    const { navigationItems: i } = this, n = i.indexOf(e);
    if (n === -1)
      return;
    let o = n;
    t === "first" ? o = 0 : t === "last" ? o = i.length - 1 : t === "next" ? o = (n + 1) % i.length : o = (n - 1 + i.length) % i.length;
    const s = i[o];
    s && s !== e && s.setFocus(), this.syncNavigationItemTabIndexes(s);
  }
  focusActionGroupItem(t, e, i) {
    if (!f(e) || !i || i.selectionMode === "multiple" || i.selectionMode === "none")
      return !1;
    const n = this.navigationItems.filter((c) => f(c) && i.actions.includes(c)), o = n.indexOf(e);
    if (n.length < 2 || o === -1)
      return !1;
    const s = t === "next" ? (o + 1) % n.length : (o - 1 + n.length) % n.length, a = n[s];
    return !a || a === e ? !1 : (a.setFocus(), this.syncNavigationItemTabIndexes(a), !0);
  }
  getCurrentNavigationItem() {
    const { activeElement: t } = document;
    if (t instanceof HTMLElement) {
      const i = t.matches("calcite-action, calcite-action-menu") ? t : t.closest("calcite-action, calcite-action-menu");
      if (i && this.navigationItems.includes(i))
        return i;
      const n = t.closest("calcite-action-menu");
      if (n) {
        const o = this.navigationItems.find((s) => s === n);
        if (o)
          return o;
      }
    }
    const e = this.getCurrentFocusItem();
    return e || this.getDefaultNavigationItem();
  }
  getCurrentFocusItem() {
    const { currentFocusItem: t } = this;
    return t ? this.navigationItems.find((e) => e === t) : void 0;
  }
  getDefaultNavigationItem() {
    return this.navigationItems.find((t) => f(t) && t !== this.expandToggleEl) || this.navigationItems[0];
  }
  getEventActionMenu(t) {
    const e = t.composedPath().find((n) => n instanceof HTMLElement && n.matches("calcite-action-menu"));
    if (e)
      return e;
    const i = t.target;
    if (i instanceof HTMLElement) {
      const n = i.closest("calcite-action-menu");
      if (n)
        return n;
    }
    return null;
  }
  getOpenActionMenu() {
    return this.navigationItems.find((t) => t.matches("calcite-action-menu") && t.open);
  }
  syncClosedActionMenu(t) {
    this.updateNavigationItems();
    const e = this.navigationItems.find((i) => i === t);
    e && this.setNavigationItemTabIndexes(e);
  }
  getNavigationItemFromEvent(t) {
    for (const e of t.composedPath()) {
      if (!(e instanceof HTMLElement) || !e.matches("calcite-action, calcite-action-menu"))
        continue;
      const i = this.navigationItems.find((o) => o === e);
      if (i)
        return i;
      const n = e.closest("calcite-action-menu");
      if (n) {
        const o = this.navigationItems.find((s) => s === n);
        if (o)
          return o;
      }
    }
    return null;
  }
  syncNavigationItemTabIndexes(t) {
    this.updateNavigationItems();
    const i = (t ? this.navigationItems.find((n) => n === t) : void 0) || this.getCurrentNavigationItem();
    i && (this.setNavigationItemTabIndexes(i), this.updateActions());
  }
  setNavigationItemTabIndexes(t) {
    t.matches(":focus-within") && (this.currentFocusItem = t), this.navigationItems.forEach((e) => {
      const i = e === t;
      if (f(e)) {
        i && !e.disabled && !e.hidden ? e.removeAttribute("tabindex") : e.tabIndex = -1;
        return;
      }
      i ? e.removeAttribute("tabindex") : e.tabIndex = -1;
      const { menuButtonEl: n } = e;
      n && (i && !e.open ? n.removeAttribute("tabindex") : n.tabIndex = -1);
    });
  }
  renderExpandTooltipSlot() {
    return E`<slot name=${B.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>`;
  }
  renderExpandToggle() {
    const { el: t, expanded: e, toggleExpand: i, messages: n, position: o, scale: s } = this;
    return dt({ collapseLabel: n.collapseLabel, collapseText: n.collapse, direction: this.direction, el: t, expanded: e, expandLabel: n.expandLabel, expandText: n.expand, position: o, ref: this.setExpandToggleEl, scale: s, toggle: i, tooltip: this.expandTooltip });
  }
  renderActionsGroup(t) {
    const { expandToggleDisabled: e, scale: i, layout: n, overlayPositioning: o, expandPosition: s } = this, a = t === "start", c = !e && s === t, r = a ? this.hasActionsStart : this.hasActionsEnd, d = a ? B.actionsStart : B.actionsEnd, M = a ? this.handleActionsStartSlotChange : this.handleActionsEndSlotChange, G = a ? this.actionsStartGroupLabel : this.actionsEndGroupLabel, I = !c && !r && !(a ? this.hasActionsStart : this.hasActionsEnd), p = a ? this.actionsStartGroupRef : this.actionsEndGroupRef, h = a ? this.actionsStartSlotRef : this.actionsEndSlotRef, v = c ? this.renderExpandToggle() : null;
    return E`<calcite-action-group class=${O({
      [S.actionGroupStart]: a,
      [S.actionGroupEnd]: !a
    })} .hidden=${I} .label=${G} .layout=${n} .overlayPositioning=${o} .scale=${i} ${C(p)}>${a ? v : null}<slot name=${d ?? H} @slotchange=${M} ${C(h)}></slot>${c ? this.renderExpandTooltipSlot() : null}${a ? null : v}</calcite-action-group>`;
  }
  render() {
    const t = this.layout === "horizontal" ? "horizontal" : "vertical";
    return E`<div .ariaOrientation=${t} class=${O({
      [S.container]: !0,
      [S.hasActionGroups]: this.hasActionGroups
    })} role=toolbar ${C(this.containerRef)}>${this.renderActionsGroup("start")}<slot @slotchange=${this.handleDefaultSlotChange} ${C(this.defaultSlotRef)}></slot>${this.renderActionsGroup("end")}${this.usesWrap ? E`<div aria-hidden=true class=${O(S.lineOverlay)}>${this.lineOffsets.map((e) => E`<div class=${O(S.line)} style=${`--calcite-internal-action-bar-line-offset: ${e}px`}></div>`)}</div>` : null}</div>`;
  }
}
J("calcite-action-bar", mt);
export {
  mt as ActionBar
};
