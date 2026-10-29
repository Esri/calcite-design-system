/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { A as N, b as x, a as J, L as X, d as W, c as F, s as I, f as Y, D as Z } from "./index.js";
import { d as _ } from "./debounce.js";
import { n as k, e as S } from "./ref.js";
import { u as tt } from "./index2.js";
import { H as P, b as et, a as it, e as $, j as v } from "./dom.js";
import { c as at } from "./observers.js";
import { S as D, i as b } from "./resources4.js";
import { u as ot } from "./useT9n.js";
import { u as nt } from "./useCancelable.js";
import { i as rt } from "./resources3.js";
import { u as st } from "./useFocusable.js";
import { i as H } from "./resources.js";
import { i as y, S as q } from "./resources5.js";
import { S as B, C as w } from "./resources6.js";
const U = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function ct(s, t) {
  return t || s.closest("calcite-shell-panel")?.position || "start";
}
function lt({ actions: s, expandables: t, expanded: e }) {
  s.filter((i) => i.slot !== D.menuActions).forEach((i) => i.textEnabled = e), t.forEach((i) => i.expanded = e);
}
const dt = ({ tooltip: s, referenceElement: t, expanded: e, ref: i }) => (s && (s.referenceElement = !e && t ? t : void 0), i && i(t), t), ht = ({ collapseText: s, collapseLabel: t, direction: e, expanded: i, expandText: a, expandLabel: r, toggle: n, el: o, position: l, tooltip: c, ref: d, scale: E }) => {
  const G = e === "rtl", m = i ? s : a, u = i ? t : r, h = [U.chevronsLeft, U.chevronsRight];
  G && h.reverse();
  const g = ct(o, l) === "end", M = g ? h[1] : h[0], p = g ? h[0] : h[1];
  return x`<calcite-action .aria=${{ expanded: i }} .icon=${i ? M : p} id=expand-toggle .label=${u} @click=${n} .scale=${E} .text=${m} .textEnabled=${i} title=${(!i && !c ? m : void 0) ?? N} ${k((z) => dt({ tooltip: c, referenceElement: z, expanded: i, ref: d }))}></calcite-action>`;
}, pt = ({
  bufferSize: s = 0,
  containerSize: t,
  itemSizes: e
}) => {
  const i = t - s;
  let a = e.length, r = 0;
  for (const [n, o] of e.entries())
    if (r = r + o, r > i) {
      a = n;
      break;
    } else
      continue;
  return a;
}, ut = ({
  bufferSize: s = 0,
  containerSize: t,
  itemSizes: e
}) => Math.max(e.length - pt({ bufferSize: s, itemSizes: e, containerSize: t }), 0), gt = (s) => s.flatMap((t) => b(t) ? t.actions : y(t) ? t.actions.filter((e) => e.slot === q.trigger) : t).filter((t) => !!t), ft = ({
  item: s,
  containerRect: t,
  horizontal: e,
  rtl: i
}) => {
  const a = s.getBoundingClientRect();
  return e ? a.top - t.top : i ? t.right - a.right : a.left - t.left;
}, vt = ({
  actionGroups: s,
  expanded: t,
  overflowCount: e
}) => {
  let i = e;
  [...s].reverse().forEach((a) => {
    let r = 0;
    const n = a.actions.filter((o) => o.parentElement === a).reverse();
    n.forEach((o) => {
      o.slot === D.menuActions && (o.removeAttribute("slot"), o.textEnabled = t);
    }), i > 0 && !a.overflowActionsDisabled && n.some((o) => (n.filter((c) => !c.slot).length > 1 && n.length > 2 && !o.closest("calcite-action-menu") && !o.overflowDisabled && (o.textEnabled = !0, o.setAttribute("slot", D.menuActions), r++, r > 1 && i--), i < 1)), a.manager.component.requestUpdate();
  });
}, bt = J`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-bar-gap: var( --calcite-action-bar-items-space, var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs)) );--calcite-internal-action-bar-padding: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=m]){--calcite-internal-action-bar-gap: var( --calcite-action-bar-items-space, var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) );--calcite-internal-action-bar-padding: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-space-sm-plus));--calcite-internal-action-bar-padding: var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus))}:host{display:inline-flex;align-self:stretch;background:transparent;--calcite-internal-action-group-dividing-border-margin: calc( var(--calcite-theme-space-base, var(--calcite-spacing-base)) + 1px )}.container{display:inline-flex;flex:1 1 auto;flex-direction:column;background-color:var(--calcite-action-bar-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));gap:var(--calcite-internal-action-bar-gap);padding:var(--calcite-internal-action-bar-padding)}@keyframes in{0%{opacity:0}to{opacity:1}}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)));box-shadow:var(--calcite-action-bar-shadow, var(--calcite-shadow-md))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;padding-block-end:var(--calcite-internal-action-bar-padding)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;border-inline-end-width:var(--calcite-border-width-sm);padding-inline-end:var(--calcite-internal-action-bar-padding)}.action-group--end{justify-content:flex-end}.line-overlay{position:absolute;inset:0;pointer-events:none}.line{position:absolute;--calcite-internal-action-bar-divider-inset: calc( var(--calcite-internal-action-group-dividing-border-margin) - var(--calcite-border-width-sm) )}:host([overflow-mode=wrap][layout=horizontal]) .container,:host([overflow-mode=wrap][layout=vertical]) .container{position:relative;flex-wrap:wrap;align-content:flex-start;--calcite-internal-action-bar-line-gap: calc( var(--calcite-internal-action-bar-padding) + var(--calcite-internal-action-bar-gap) )}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group[slot=actions-start]),:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group[slot=actions-start]){padding-inline-end:0;padding-block-end:0;border-inline-end-width:0;border-block-end-width:0}:host([overflow-mode=wrap][layout=horizontal]) .container{row-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-inline-start:calc(-1 * var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-action-bar-padding) 0;border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:0;border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=horizontal]) .line{inset-inline:var(--calcite-internal-action-bar-padding);block-size:var(--calcite-border-width-sm);inset-block-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to right,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups{overflow:hidden;padding-inline-start:0;column-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups .action-group--start{padding-inline-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=wrap][layout=vertical]) .container{block-size:100%;min-block-size:0;column-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-block-start:calc(-1 * var(--calcite-border-width-sm));padding-block:var(--calcite-internal-action-bar-padding) 0;border-block-start-width:var(--calcite-border-width-sm);border-block-end-width:0;border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=vertical]) .line{inset-block:var(--calcite-internal-action-bar-padding);inline-size:var(--calcite-border-width-sm);inset-inline-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to bottom,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups{overflow:hidden;padding-block-start:0;row-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups .action-group--start{padding-block-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=none][layout=horizontal]) .container{overflow-x:auto}:host([overflow-mode=none][layout=vertical]) .container{overflow-y:auto}:host([hidden]){display:none}[hidden]{display:none}`;
class mt extends X {
  constructor() {
    super(), this.actions = [], this.containerRef = S(), this.defaultSlotRef = S(), this.actionsStartSlotRef = S(), this.actionsEndSlotRef = S(), this.actionsStartGroupRef = S(), this.actionsEndGroupRef = S(), this.direction = tt(), this.defaultSlotItems = [], this.actionGroups = [], this.actionMenus = [], this.actionsStart = [], this.actionsStartGroups = [], this.actionsEnd = [], this.actionsEndGroups = [], this.overflowPassId = 0, this.suppressedActionGroupActionsChange = /* @__PURE__ */ new WeakMap(), this.cancelable = nt()(this), this.resize = _(({ width: t, height: e }) => {
      const { expanded: i, expandToggleDisabled: a, layout: r, expandPosition: n } = this;
      if (!this.containerRef.value)
        return;
      if (this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      if (this.overflowMode !== "collapse" || r === "vertical" && !e || r === "horizontal" && !t)
        return;
      this.updateGroups();
      const o = this.getItemSizes(), { actionGroups: l, actionsEnd: c, actionsEndGroups: d, actionsStart: E, actionsStartGroups: G, defaultSlotItems: m } = this, u = [
        ...G,
        ...l,
        ...d
      ], h = this.hasActionsEnd || !a && n === "end" ? 1 : 0, g = this.hasActionsStart || !a && n === "start" ? 1 : 0, M = m.length + h + g;
      let p = M;
      const A = getComputedStyle(this.containerRef.value);
      if (p += v(r === "horizontal" ? A.paddingInlineStart : A.paddingBlockStart) + v(r === "horizontal" ? A.paddingInlineEnd : A.paddingBlockEnd), u.length > 0) {
        const T = u.length - 1;
        u.forEach((C, O) => {
          const f = getComputedStyle(C), R = v(f.gap), L = this.getActionGroupItemCount(C), Q = Math.max(L - 1, 0);
          p += R * Q, O !== T && (p += v(r === "horizontal" ? f.paddingInlineEnd : f.paddingBlockEnd), p += v(r === "horizontal" ? f.borderInlineEndWidth : f.borderBlockEndWidth));
        });
      }
      const z = (T, C, O) => {
        if (!C || T.length < 1)
          return;
        const f = getComputedStyle(C), R = v(f.gap), L = T.length + (O ? 1 : 0);
        p += R * Math.max(L - 1, 0);
      }, j = !a && n === "start", V = !a && n === "end";
      z(E, this.actionsStartGroupRef.value, j), z(c, this.actionsEndGroupRef.value, V), M > 1 && (p += v(A.gap) * (M - 1));
      const K = ut({
        bufferSize: p,
        containerSize: r === "horizontal" ? t : e,
        itemSizes: o
      });
      this.runOverflowActions({
        actionGroups: u,
        expanded: i,
        overflowCount: K
      });
    }, Z.resize), this.resizeHandler = (t) => {
      if (this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      const { width: e, height: i } = t.contentRect;
      this.resize({ width: e, height: i });
    }, this.resizeObserver = at("resize", (t) => this.resizeHandlerEntries(t)), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionBarToggle.emit();
    }, this.messages = ot({ blocking: !0 }), this.focusSetter = st()(this), this.setExpandToggleEl = (t) => {
      this.expandToggleEl = t;
    }, this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasActionGroups = !1, this.lineOffsets = [], this.floating = !1, this.expandToggleDisabled = !1, this.expanded = !1, this.expandPosition = "end", this.layout = "vertical", this.overflowMode = "collapse", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionBarCollapse = W({ cancelable: !1 }), this.calciteActionBarExpand = W({ cancelable: !1 }), this.calciteActionBarToggle = W({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler), this.listen("calciteInternalActionGroupActionsChange", this.handleActionGroupActionsChange), this.listen("calciteInternalActionMenuActionsChange", this.handleActionMenuActionsChange), this.listen("keydown", this.handleKeyDown);
  }
  static {
    this.properties = { expandTooltip: 16, hasActionsEnd: 16, hasActionsStart: 16, hasActionGroups: 16, lineOffsets: 16, actionsEndGroupLabel: 1, actionsStartGroupLabel: 1, floating: 7, expandToggleDisabled: 7, expandDisabled: 7, expanded: 7, expandPosition: 3, layout: 3, overflowMode: 3, messageOverrides: 0, overflowActionsDisabled: 7, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.styles = bt;
  }
  get usesWrap() {
    return this.overflowMode === "wrap" && this.layout !== "grid";
  }
  get expandDisabled() {
    return this.expandToggleDisabled;
  }
  set expandDisabled(t) {
    F.deprecated("property", {
      component: this,
      name: "expandDisabled",
      removalVersion: 6,
      suggested: "expandToggleDisabled"
    }), this.expandToggleDisabled = t;
  }
  get overflowActionsDisabled() {
    return this.overflowMode === "none";
  }
  set overflowActionsDisabled(t) {
    F.deprecated("property", {
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
    super.connectedCallback(), this.overflowModeHandler(), this.cancelable.add(this.resize);
  }
  willUpdate(t) {
    (t.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== !1) || t.has("expandToggleDisabled") && (this.hasUpdated || this.expandToggleDisabled !== !1) || t.has("expandPosition") && (this.hasUpdated || this.expandPosition !== "end")) && this.overflowActions(), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && (this.updateGroups(), this.overflowModeHandler(), this.usesWrap || this.updateLines()), t.has("overflowMode") && (this.hasUpdated || this.overflowMode !== "collapse") && (!this.usesWrap && this.lineMeasureFrame != null && (cancelAnimationFrame(this.lineMeasureFrame), this.lineMeasureFrame = void 0), this.usesWrap ? this.scheduleLineMeasure() : this.updateLines(), this.overflowModeHandler()), t.has("expanded") && this.hasUpdated && (this.expandedHandler(), this.expanded ? this.calciteActionBarExpand.emit() : this.calciteActionBarCollapse.emit()), t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
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
    const { layout: t, expandToggleEl: e } = this, i = t === "horizontal" ? "clientWidth" : "clientHeight", a = this.actions.map((o) => o[i] || 0);
    this.getTrackedActionGroups().flatMap((o) => P(o, "calcite-action-menu")).forEach((o) => {
      const l = o.actions.find((c) => c.slot === q.trigger);
      a.push((l ?? o)[i] || 0);
    }), e && a.push(e[i] || 0);
    const n = Math.max(...a, 0);
    return a.map((o) => o || n);
  }
  getActionGroupItemCount(t) {
    const e = t.actions.filter((a) => a.parentElement === t), i = P(t, "calcite-action-menu").length;
    return e.length + i;
  }
  expandedHandler() {
    this.syncActionsState(!0), this.overflowActions();
  }
  overflowModeHandler() {
    this.overflowMode === "none" ? this.resizeObserver?.disconnect() : this.resizeObserver?.observe(this.el), this.overflowActions();
  }
  actionMenuOpenHandler(t) {
    const e = t.composedPath(), i = e.find((a) => b(a) || y(a));
    i && (b(i) && !i.menuOpen || y(i) && !i.open || (this.getTrackedActionGroups().forEach((a) => {
      e.includes(a) || (a.menuOpen = !1);
    }), this.getTrackedActionMenus().forEach((a) => {
      e.includes(a) || (a.open = !1);
    })));
  }
  runOverflowActions({ actionGroups: t, expanded: e, overflowCount: i }) {
    const a = ++this.overflowPassId, r = /* @__PURE__ */ new Map();
    t.forEach((n) => {
      const o = n.actions.filter((l) => l.parentElement === n);
      r.set(n, o.map((l) => l.slot ?? "").join("|"));
    }), vt({
      actionGroups: t,
      expanded: e,
      overflowCount: i
    }), t.forEach((n) => {
      const l = n.actions.filter((c) => c.parentElement === n).map((c) => c.slot ?? "").join("|");
      r.get(n) !== l && (this.suppressedActionGroupActionsChange.set(n, a), this.queueSuppressedActionGroupActionsChangeCleanup(n, a));
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
    });
  }
  scheduleLineMeasure() {
    this.lineMeasureFrame != null && cancelAnimationFrame(this.lineMeasureFrame), this.lineMeasureFrame = requestAnimationFrame(() => {
      this.lineMeasureFrame = void 0, this.updateLines();
    });
  }
  getWrapItems() {
    const t = [], e = this.actionsStartGroupRef.value;
    e && !e.hidden && t.push(e), this.defaultSlotItems.forEach((a) => {
      a.hidden || t.push(a);
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
    const e = this.layout === "horizontal", i = this.direction === "rtl", a = t.getBoundingClientRect(), r = this.getWrapItems(), n = [];
    let o = null;
    r.forEach((c) => {
      const d = ft({ item: c, containerRect: a, horizontal: e, rtl: i });
      o !== null && Math.abs(d - o) > 1 && n.push(d), o = d;
    }), (n.length !== this.lineOffsets.length || n.some((c, d) => c !== this.lineOffsets[d])) && (this.lineOffsets = n);
  }
  handleDefaultSlotChange() {
    this.syncSlotAndActions(() => this.syncDefaultSlot()), this.usesWrap && this.scheduleLineMeasure();
  }
  handleActionsEndSlotChange() {
    this.syncSlotAndActions(() => this.syncActionsEndSlot());
  }
  handleActionsStartSlotChange() {
    this.syncSlotAndActions(() => this.syncActionsStartSlot());
  }
  handleTooltipSlotChange(t) {
    const e = et(t).filter(rt);
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
  syncActions() {
    this.actions = gt([
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
    this.syncActions(), this.updateActions(), t && lt({
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
    return [...this.actionMenus, ...this.actionsStart, ...this.actionsEnd].filter((t) => y(t));
  }
  getAssignedActionBarItems(t) {
    return t ? it(t).filter((e) => H(e) || b(e) || y(e)) : [];
  }
  syncDefaultSlot() {
    this.defaultSlotItems = this.getAssignedActionBarItems(this.defaultSlotRef.value), this.actionGroups = this.defaultSlotItems.filter((t) => b(t)), this.actionMenus = this.defaultSlotItems.filter((t) => y(t)), this.updateGroups();
  }
  syncActionsStartSlot() {
    this.actionsStart = this.getAssignedActionBarItems(this.actionsStartSlotRef.value), this.actionsStartGroups = this.actionsStart.filter((t) => b(t)), this.hasActionsStart = this.actionsStart.length > 0, this.updateGroups();
  }
  syncActionsEndSlot() {
    this.actionsEnd = this.getAssignedActionBarItems(this.actionsEndSlotRef.value), this.actionsEndGroups = this.actionsEnd.filter((t) => b(t)), this.hasActionsEnd = this.actionsEnd.length > 0, this.updateGroups();
  }
  handleActionGroupActionsChange(t) {
    const e = t.target;
    this.getTrackedActionGroups().includes(e) && (this.suppressedActionGroupActionsChange.has(e) || this.syncActionsAndOverflow());
  }
  handleActionMenuActionsChange(t) {
    const e = t.target;
    this.getTrackedActionMenus().includes(e) && this.syncActionsAndOverflow();
  }
  getNavigableActions() {
    return this.actions.filter((t) => !t.disabled && t.slot !== D.menuActions);
  }
  handleKeyDown(t) {
    const e = this.getNavigableActions(), i = document.activeElement;
    if (!(!H(i) || !e.includes(i)))
      switch (t.key) {
        case "ArrowRight":
        case "ArrowDown":
          $(e, i, "next", !0), t.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          $(e, i, "previous", !0), t.preventDefault();
          break;
        case "Home":
          $(e, i, "first", !0), t.preventDefault();
          break;
        case "End":
          $(e, i, "last", !0), t.preventDefault();
          break;
        case "Tab":
          this.setActionTabIndexes(i);
          break;
      }
  }
  setActionTabIndexes(t) {
    this.actions.forEach((e) => {
      const i = !e.disabled && e === t ? 0 : -1;
      i === 0 ? e.removeAttribute("tabindex") : e.tabIndex = i;
    });
  }
  renderExpandTooltipSlot() {
    return x`<slot name=${B.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>`;
  }
  renderExpandToggle() {
    const { el: t, expanded: e, toggleExpand: i, messages: a, position: r, scale: n } = this;
    return ht({ collapseLabel: a.collapseLabel, collapseText: a.collapse, direction: this.direction, el: t, expanded: e, expandLabel: a.expandLabel, expandText: a.expand, position: r, ref: this.setExpandToggleEl, scale: n, toggle: i, tooltip: this.expandTooltip });
  }
  renderActionsGroup(t) {
    const { expandToggleDisabled: e, scale: i, layout: a, overlayPositioning: r, expandPosition: n } = this, o = t === "start", l = !e && n === t, c = o ? this.hasActionsStart : this.hasActionsEnd, d = o ? B.actionsStart : B.actionsEnd, E = o ? this.handleActionsStartSlotChange : this.handleActionsEndSlotChange, G = o ? this.actionsStartGroupLabel : this.actionsEndGroupLabel, m = !l && !c, u = o ? this.actionsStartGroupRef : this.actionsEndGroupRef, h = o ? this.actionsStartSlotRef : this.actionsEndSlotRef, g = l ? this.renderExpandToggle() : null;
    return x`<calcite-action-group class=${I({
      [w.actionGroupStart]: o,
      [w.actionGroupEnd]: !o
    })} .hidden=${m} .label=${G} .layout=${a} .overlayPositioning=${r} .scale=${i} ${k(u)}>${o ? g : null}<slot name=${d ?? N} @slotchange=${E} ${k(h)}></slot>${l ? this.renderExpandTooltipSlot() : null}${o ? null : g}</calcite-action-group>`;
  }
  render() {
    const t = this.layout === "horizontal" ? "horizontal" : "vertical";
    return x`<div .ariaOrientation=${t} class=${I({
      [w.container]: !0,
      [w.hasActionGroups]: this.hasActionGroups
    })} role=toolbar ${k(this.containerRef)}>${this.renderActionsGroup("start")}<slot @slotchange=${this.handleDefaultSlotChange} ${k(this.defaultSlotRef)}></slot>${this.renderActionsGroup("end")}${this.usesWrap ? x`<div aria-hidden=true class=${I(w.lineOverlay)}>${this.lineOffsets.map((e) => x`<div class=${I(w.line)} style=${`--calcite-internal-action-bar-line-offset: ${e}px`}></div>`)}</div>` : null}</div>`;
  }
}
Y("calcite-action-bar", mt);
export {
  mt as ActionBar
};
