/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as K, L as Q, c as L, l as F, b as S, A as J, s as G, d as X, P as Y } from "./index.js";
import { d as Z } from "./debounce.js";
import { e as v, n as M } from "./ref.js";
import { u as _ } from "./index2.js";
import { H as P, b as tt, a as et, e as z, j as u } from "./dom.js";
import { c as it } from "./observers.js";
import { t as at, E as ot } from "./ExpandToggle.js";
import { u as nt } from "./useT9n.js";
import { u as rt } from "./useCancelable.js";
import { i as st } from "./resources5.js";
import { u as ct } from "./useFocusable.js";
import { i as H } from "./resources.js";
import { S as x, i as g } from "./resources3.js";
import { i as m, S as U } from "./resources4.js";
import { S as W, C as b } from "./resources6.js";
const lt = ({
  bufferSize: l = 0,
  containerSize: t,
  itemSizes: e
}) => {
  const a = t - l;
  let i = e.length, r = 0;
  for (const [n, o] of e.entries())
    if (r = r + o, r > a) {
      i = n;
      break;
    } else
      continue;
  return i;
}, dt = ({
  bufferSize: l = 0,
  containerSize: t,
  itemSizes: e
}) => Math.max(e.length - lt({ bufferSize: l, itemSizes: e, containerSize: t }), 0), ht = (l) => l.flatMap((t) => g(t) ? t.actions : m(t) ? t.actions.filter((e) => e.slot === U.trigger) : t).filter((t) => !!t), pt = ({
  item: l,
  containerRect: t,
  horizontal: e,
  rtl: a
}) => {
  const i = l.getBoundingClientRect();
  return e ? i.top - t.top : a ? t.right - i.right : i.left - t.left;
}, ut = ({
  actionGroups: l,
  expanded: t,
  overflowCount: e
}) => {
  let a = e;
  [...l].reverse().forEach((i) => {
    let r = 0;
    const n = i.actions.filter((o) => o.parentElement === i).reverse();
    n.forEach((o) => {
      o.slot === x.menuActions && (o.removeAttribute("slot"), o.textEnabled = t);
    }), a > 0 && !i.overflowActionsDisabled && n.some((o) => (n.filter((c) => !c.slot).length > 1 && n.length > 2 && !o.closest("calcite-action-menu") && !o.overflowDisabled && (o.textEnabled = !0, o.setAttribute("slot", x.menuActions), r++, r > 1 && a--), a < 1)), i.manager.component.requestUpdate();
  });
}, gt = K`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-spacing-xxs));--calcite-internal-action-bar-padding: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-spacing-sm));--calcite-internal-action-bar-padding: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-space-sm-plus));--calcite-internal-action-bar-padding: var(--calcite-spacing-sm-plus)}:host{display:inline-flex;align-self:stretch;background:transparent;--calcite-internal-action-group-dividing-border-margin: calc(var(--calcite-spacing-base) + 1px)}.container{display:inline-flex;flex:1 1 auto;flex-direction:column;background-color:var(--calcite-action-bar-background-color, var(--calcite-color-foreground-1));gap:var(--calcite-internal-action-bar-gap);padding:var(--calcite-internal-action-bar-padding)}@keyframes in{0%{opacity:0}to{opacity:1}}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-corner-radius-round));box-shadow:var(--calcite-action-bar-shadow, var(--calcite-shadow-md))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;padding-block-end:var(--calcite-internal-action-bar-padding)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;border-inline-end-width:var(--calcite-border-width-sm);padding-inline-end:var(--calcite-internal-action-bar-padding)}.action-group--end{justify-content:flex-end}.line-overlay{position:absolute;inset:0;pointer-events:none}.line{position:absolute;--calcite-internal-action-bar-divider-inset: calc( var(--calcite-internal-action-group-dividing-border-margin) - var(--calcite-border-width-sm) )}:host([overflow-mode=wrap][layout=horizontal]) .container,:host([overflow-mode=wrap][layout=vertical]) .container{position:relative;flex-wrap:wrap;align-content:flex-start;--calcite-internal-action-bar-line-gap: calc( var(--calcite-internal-action-bar-padding) + var(--calcite-internal-action-bar-gap) )}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group[slot=actions-start]),:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group[slot=actions-start]){padding-inline-end:0;padding-block-end:0;border-inline-end-width:0;border-block-end-width:0}:host([overflow-mode=wrap][layout=horizontal]) .container{row-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=horizontal]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-inline-start:calc(-1 * var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-action-bar-padding) 0;border-inline-start-width:var(--calcite-border-width-sm);border-inline-end-width:0;border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=horizontal]) .line{inset-inline:var(--calcite-internal-action-bar-padding);block-size:var(--calcite-border-width-sm);inset-block-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to right,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups{overflow:hidden;padding-inline-start:0;column-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=horizontal]) .container.has-action-groups .action-group--start{padding-inline-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=wrap][layout=vertical]) .container{block-size:100%;min-block-size:0;column-gap:var(--calcite-internal-action-bar-line-gap)}:host([overflow-mode=wrap][layout=vertical]) ::slotted(calcite-action-group:not([slot=actions-start])){margin-block-start:calc(-1 * var(--calcite-border-width-sm));padding-block:var(--calcite-internal-action-bar-padding) 0;border-block-start-width:var(--calcite-border-width-sm);border-block-end-width:0;border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent calc(100% - var(--calcite-internal-action-group-dividing-border-margin)));border-image-slice:1}:host([overflow-mode=wrap][layout=vertical]) .line{inset-block:var(--calcite-internal-action-bar-padding);inline-size:var(--calcite-border-width-sm);inset-inline-start:calc(var(--calcite-internal-action-bar-line-offset, 0px) - var(--calcite-internal-action-bar-line-gap) / 2);background:linear-gradient(to bottom,transparent var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-bar-divider-inset),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-bar-divider-inset)),transparent calc(100% - var(--calcite-internal-action-bar-divider-inset)))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups{overflow:hidden;padding-block-start:0;row-gap:calc(var(--calcite-internal-action-bar-gap) + var(--calcite-border-width-sm))}:host([overflow-mode=wrap][layout=vertical]) .container.has-action-groups .action-group--start{padding-block-start:var(--calcite-internal-action-bar-padding)}:host([overflow-mode=none][layout=horizontal]) .container{overflow-x:auto}:host([overflow-mode=none][layout=vertical]) .container{overflow-y:auto}:host([hidden]){display:none}[hidden]{display:none}`;
class ft extends Q {
  constructor() {
    super(), this.actions = [], this.containerRef = v(), this.defaultSlotRef = v(), this.actionsStartSlotRef = v(), this.actionsEndSlotRef = v(), this.actionsStartGroupRef = v(), this.actionsEndGroupRef = v(), this.direction = _(), this.defaultSlotItems = [], this.actionGroups = [], this.actionMenus = [], this.actionsStart = [], this.actionsStartGroups = [], this.actionsEnd = [], this.actionsEndGroups = [], this.overflowPassId = 0, this.suppressedActionGroupActionsChange = /* @__PURE__ */ new WeakMap(), this.cancelable = rt()(this), this.resize = Z(({ width: t, height: e }) => {
      const { expanded: a, expandToggleDisabled: i, layout: r, expandPosition: n } = this;
      if (!this.containerRef.value)
        return;
      if (this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      if (this.overflowMode !== "collapse" || r === "vertical" && !e || r === "horizontal" && !t)
        return;
      this.updateGroups();
      const o = this.getItemSizes(), { actionGroups: s, actionsEnd: c, actionsEndGroups: d, actionsStart: C, actionsStartGroups: k, defaultSlotItems: T } = this, f = [
        ...k,
        ...s,
        ...d
      ], O = this.hasActionsEnd || !i && n === "end" ? 1 : 0, y = this.hasActionsStart || !i && n === "start" ? 1 : 0, D = T.length + O + y;
      let h = D;
      const A = getComputedStyle(this.containerRef.value);
      if (h += u(r === "horizontal" ? A.paddingInlineStart : A.paddingBlockStart) + u(r === "horizontal" ? A.paddingInlineEnd : A.paddingBlockEnd), f.length > 0) {
        const E = f.length - 1;
        f.forEach((w, I) => {
          const p = getComputedStyle(w), $ = u(p.gap), R = this.getVisibleActionGroupItemCount(w), N = Math.max(R - 1, 0);
          h += $ * N, I !== E && (h += u(r === "horizontal" ? p.paddingInlineEnd : p.paddingBlockEnd), h += u(r === "horizontal" ? p.borderInlineEndWidth : p.borderBlockEndWidth));
        });
      }
      const B = (E, w, I) => {
        if (!w || E.length < 1)
          return;
        const p = getComputedStyle(w), $ = u(p.gap), R = E.length + (I ? 1 : 0);
        h += $ * Math.max(R - 1, 0);
      }, q = !i && n === "start", V = !i && n === "end";
      B(C, this.actionsStartGroupRef.value, q), B(c, this.actionsEndGroupRef.value, V), D > 1 && (h += u(A.gap) * (D - 1));
      const j = dt({
        bufferSize: h,
        containerSize: r === "horizontal" ? t : e,
        itemSizes: o
      });
      this.runOverflowActions({
        actionGroups: f,
        expanded: a,
        overflowCount: j
      });
    }, Y.resize), this.resizeHandler = (t) => {
      if (this.usesWrap) {
        this.scheduleLineMeasure();
        return;
      }
      const { width: e, height: a } = t.contentRect, i = this.layout === "horizontal" ? "width" : "height", r = i === "width" ? e : a;
      this.lastOverflowAxisSize?.axis === i && this.lastOverflowAxisSize.size === r || (this.lastOverflowAxisSize = { axis: i, size: r }, this.resize({ width: e, height: a }));
    }, this.resizeObserver = it("resize", (t) => this.resizeHandlerEntries(t)), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionBarToggle.emit();
    }, this.messages = nt({ blocking: !0 }), this.focusSetter = ct()(this), this.setExpandToggleEl = (t) => {
      this.expandToggleEl = t;
    }, this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasActionGroups = !1, this.lineOffsets = [], this.floating = !1, this.expandToggleDisabled = !1, this.expanded = !1, this.expandPosition = "end", this.layout = "vertical", this.overflowMode = "collapse", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionBarCollapse = L({ cancelable: !1 }), this.calciteActionBarExpand = L({ cancelable: !1 }), this.calciteActionBarToggle = L({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler), this.listen("calciteInternalActionGroupActionsChange", this.handleActionGroupActionsChange), this.listen("calciteInternalActionMenuActionsChange", this.handleActionMenuActionsChange), this.listen("keydown", this.handleKeyDown);
  }
  static {
    this.properties = { expandTooltip: 16, hasActionsEnd: 16, hasActionsStart: 16, hasActionGroups: 16, lineOffsets: 16, actionsEndGroupLabel: 1, actionsStartGroupLabel: 1, floating: 7, expandToggleDisabled: 7, expandDisabled: 7, expanded: 7, expandPosition: 3, layout: 3, overflowMode: 3, messageOverrides: 0, overflowActionsDisabled: 7, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.styles = gt;
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
    const { layout: t, expandToggleEl: e } = this, a = t === "horizontal" ? "clientWidth" : "clientHeight", i = this.actions.map((o) => o[a] || 0);
    this.getTrackedActionGroups().flatMap((o) => P(o, "calcite-action-menu")).forEach((o) => {
      const s = o.actions.find((c) => c.slot === U.trigger);
      i.push((s ?? o)[a] || 0);
    }), e && i.push(e[a] || 0);
    const n = Math.max(...i, 0);
    return i.map((o) => o || n);
  }
  getVisibleActionGroupItemCount(t) {
    const e = t.actions.filter((n) => n.parentElement === t), a = P(t, "calcite-action-menu").length, i = e.filter((n) => n.slot !== x.menuActions).length + a, r = e.some((n) => n.slot === x.menuActions);
    return i + (r ? 1 : 0);
  }
  expandedHandler() {
    this.syncActionsState(!0), this.overflowActions();
  }
  overflowModeHandler() {
    this.overflowMode === "none" ? this.resizeObserver?.disconnect() : this.resizeObserver?.observe(this.el), this.overflowActions();
  }
  actionMenuOpenHandler(t) {
    const e = t.composedPath(), a = e.find((i) => g(i) || m(i));
    a && (g(a) && !a.menuOpen || m(a) && !a.open || (this.getTrackedActionGroups().forEach((i) => {
      e.includes(i) || (i.menuOpen = !1);
    }), this.getTrackedActionMenus().forEach((i) => {
      e.includes(i) || (i.open = !1);
    })));
  }
  runOverflowActions({ actionGroups: t, expanded: e, overflowCount: a }) {
    const i = ++this.overflowPassId, r = /* @__PURE__ */ new Map();
    t.forEach((n) => {
      const o = n.actions.filter((s) => s.parentElement === n);
      r.set(n, o.map((s) => s.slot ?? "").join("|"));
    }), ut({
      actionGroups: t,
      expanded: e,
      overflowCount: a
    }), t.forEach((n) => {
      const s = n.actions.filter((c) => c.parentElement === n).map((c) => c.slot ?? "").join("|");
      r.get(n) !== s && (this.suppressedActionGroupActionsChange.set(n, i), this.queueSuppressedActionGroupActionsChangeCleanup(n, i));
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
    e && !e.hidden && t.push(e), this.defaultSlotItems.forEach((i) => {
      i.hidden || t.push(i);
    });
    const a = this.actionsEndGroupRef.value;
    return a && !a.hidden && t.push(a), t;
  }
  updateLines() {
    const t = this.containerRef.value;
    if (!t || !this.usesWrap) {
      this.lineOffsets.length > 0 && (this.lineOffsets = []);
      return;
    }
    const e = this.layout === "horizontal", a = this.direction === "rtl", i = t.getBoundingClientRect(), r = this.getWrapItems(), n = [];
    let o = null;
    r.forEach((c) => {
      const d = pt({ item: c, containerRect: i, horizontal: e, rtl: a });
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
    const e = tt(t).filter(st);
    this.expandTooltip = e[0];
  }
  updateActions() {
    const t = new Set(this.actions);
    this.getTrackedActionMenus().forEach((e) => {
      e.actions.forEach((a) => t.add(a));
    }), t.forEach((e) => {
      e.selectionAppearance = this.selectionAppearance;
    });
  }
  syncActions() {
    this.actions = ht([
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
    this.syncActions(), this.updateActions(), t && at({
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
    return [...this.actionMenus, ...this.actionsStart, ...this.actionsEnd].filter((t) => m(t));
  }
  getAssignedActionBarItems(t) {
    return t ? et(t).filter((e) => H(e) || g(e) || m(e)) : [];
  }
  syncDefaultSlot() {
    this.defaultSlotItems = this.getAssignedActionBarItems(this.defaultSlotRef.value), this.actionGroups = this.defaultSlotItems.filter((t) => g(t)), this.actionMenus = this.defaultSlotItems.filter((t) => m(t)), this.updateGroups();
  }
  syncActionsStartSlot() {
    this.actionsStart = this.getAssignedActionBarItems(this.actionsStartSlotRef.value), this.actionsStartGroups = this.actionsStart.filter((t) => g(t)), this.hasActionsStart = this.actionsStart.length > 0, this.updateGroups();
  }
  syncActionsEndSlot() {
    this.actionsEnd = this.getAssignedActionBarItems(this.actionsEndSlotRef.value), this.actionsEndGroups = this.actionsEnd.filter((t) => g(t)), this.hasActionsEnd = this.actionsEnd.length > 0, this.updateGroups();
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
    return this.actions.filter((t) => !t.disabled && t.slot !== x.menuActions);
  }
  handleKeyDown(t) {
    const e = this.getNavigableActions(), a = document.activeElement;
    if (!(!H(a) || !e.includes(a)))
      switch (t.key) {
        case "ArrowRight":
        case "ArrowDown":
          z(e, a, "next", !0), t.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          z(e, a, "previous", !0), t.preventDefault();
          break;
        case "Home":
          z(e, a, "first", !0), t.preventDefault();
          break;
        case "End":
          z(e, a, "last", !0), t.preventDefault();
          break;
        case "Tab":
          this.setActionTabIndexes(a);
          break;
      }
  }
  setActionTabIndexes(t) {
    this.actions.forEach((e) => {
      const a = !e.disabled && e === t ? 0 : -1;
      a === 0 ? e.removeAttribute("tabindex") : e.tabIndex = a;
    });
  }
  renderExpandTooltipSlot() {
    return S`<slot name=${W.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>`;
  }
  renderExpandToggle() {
    const { el: t, expanded: e, toggleExpand: a, messages: i, position: r, scale: n } = this;
    return ot({ collapseLabel: i.collapseLabel, collapseText: i.collapse, direction: this.direction, el: t, expanded: e, expandLabel: i.expandLabel, expandText: i.expand, position: r, ref: this.setExpandToggleEl, scale: n, toggle: a, tooltip: this.expandTooltip });
  }
  renderActionsGroup(t) {
    const { expandToggleDisabled: e, scale: a, layout: i, overlayPositioning: r, expandPosition: n } = this, o = t === "start", s = !e && n === t, c = o ? this.hasActionsStart : this.hasActionsEnd, d = o ? W.actionsStart : W.actionsEnd, C = o ? this.handleActionsStartSlotChange : this.handleActionsEndSlotChange, k = o ? this.actionsStartGroupLabel : this.actionsEndGroupLabel, T = !s && !c, f = o ? this.actionsStartGroupRef : this.actionsEndGroupRef, O = o ? this.actionsStartSlotRef : this.actionsEndSlotRef, y = s ? this.renderExpandToggle() : null;
    return S`<calcite-action-group class=${G({
      [b.actionGroupStart]: o,
      [b.actionGroupEnd]: !o
    })} .hidden=${T} .label=${k} .layout=${i} .overlayPositioning=${r} .scale=${a} ${M(f)}>${o ? y : null}<slot name=${d ?? J} @slotchange=${C} ${M(O)}></slot>${s ? this.renderExpandTooltipSlot() : null}${o ? null : y}</calcite-action-group>`;
  }
  render() {
    const t = this.layout === "horizontal" ? "horizontal" : "vertical";
    return S`<div .ariaOrientation=${t} class=${G({
      [b.container]: !0,
      [b.hasActionGroups]: this.hasActionGroups
    })} role=toolbar ${M(this.containerRef)}>${this.renderActionsGroup("start")}<slot @slotchange=${this.handleDefaultSlotChange} ${M(this.defaultSlotRef)}></slot>${this.renderActionsGroup("end")}${this.usesWrap ? S`<div aria-hidden=true class=${G(b.lineOverlay)}>${this.lineOffsets.map((e) => S`<div class=${G(b.line)} style=${`--calcite-internal-action-bar-line-offset: ${e}px`}></div>`)}</div>` : null}</div>`;
  }
}
X("calcite-action-bar", ft);
export {
  ft as ActionBar
};
