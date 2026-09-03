/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as g, L as v, P as E, c as h, s as p, b, d as B } from "./index.js";
import { d as x } from "./debounce.js";
import { c as I } from "./observers.js";
import { g as S, b as O } from "./dom.js";
import { g as C } from "./guid.js";
import { u as D } from "./useSetFocus.js";
import { u as G } from "./useCancelable.js";
import { u as A } from "./useInteractive.js";
import { u as y } from "./useSortable.js";
import { i as M } from "./resources2.js";
import { i as c } from "./resources10.js";
const u = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text"
}, m = "calcite-block-group", k = "calcite-block", P = M("calcite-block-group"), w = g`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{position:relative}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([slot=children]) slot::slotted(calcite-block){border-block-end-width:0}`;
function H(d) {
  d.forEach((e) => {
    e.setPosition = d.indexOf(e) + 1, e.setSize = d.length;
  });
}
class T extends v {
  constructor() {
    super(), this.dragSelector = k, this.handleSelector = "calcite-sort-handle", this.mutationObserver = I("mutation", () => {
      this.updateBlockItemsDebounced();
    }), this.blockAndGroups = [], this.cancelable = G()(this), this.focusSetter = D()(this), this.sortable = y()(this), this.updateBlockItemsDebounced = x(this.updateBlockItems, E.nextTick), this.interactiveContainer = A(this), this.sortHandleMenuItems = [], this.disabled = !1, this.dragEnabled = !1, this.loading = !1, this.scale = "m", this.expandMode = "multiple", this.sortDisabled = !1, this.calciteBlockGroupDragEnd = h({ cancelable: !1 }), this.calciteBlockGroupDragStart = h({ cancelable: !1 }), this.calciteBlockGroupMoveHalt = h({ cancelable: !1 }), this.calciteBlockGroupOrderChange = h({ cancelable: !1 }), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteBlockSortHandleBeforeOpen", this.updateBlockItemsDebounced), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteSortHandleAdd", this.handleSortAdd), this.listen("calciteInternalBlockChange", this.updateBlockChildrenExpanded);
  }
  static {
    this.properties = { assistiveText: 16, sortHandleMenuItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, group: 3, label: 1, loading: 7, scale: 3, expandMode: 3, sortDisabled: 7 };
  }
  static {
    this.styles = w;
  }
  emitOrderChangeEvent(e) {
    this.calciteBlockGroupOrderChange.emit(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.updateBlockItemsDebounced(), this.sortable.reset(), this.setParentBlockGroup(), this.cancelable.add(this.updateBlockItemsDebounced);
  }
  willUpdate(e) {
    (e.has("group") || e.has("canPull") && this.hasUpdated || e.has("canPut") && this.hasUpdated || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== !1)) && this.updateBlockItemsDebounced(), e.has("scale") && this.hasUpdated && this.updateBlockAndGroupScale();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver();
  }
  updateBlockItems() {
    this.updateGroupItems();
    const { dragEnabled: e, el: t, sortDisabled: s, sortHandleMenuItems: l } = this, a = Array.from(this.el.querySelectorAll(k)), n = t, r = Array.from(n.children).filter(c);
    a.forEach((o) => {
      o.closest(m) === t && (o.moveToItems = l.filter((i) => this.validateSortMenuItem({
        type: "move",
        fromEl: n,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: r.indexOf(o)
      })), o.addToItems = this.sortHandleMenuItems.filter((i) => this.validateSortMenuItem({
        type: "add",
        fromEl: n,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: r.indexOf(o)
      })), o.dragHandle = e, o.sortDisabled = s);
    }), this.sortable.reset();
  }
  updateGroupItems() {
    const { el: e, group: t } = this, s = S(e), l = t ? Array.from(s.querySelectorAll(`${m}[group="${t}"]`)).filter((a) => !a.disabled && a.dragEnabled) : [];
    this.sortHandleMenuItems = l.map((a) => ({
      element: a,
      label: a.label ?? a.id,
      id: C()
    }));
  }
  handleCalciteInternalAssistiveTextChange(e) {
    this.assistiveText = e.detail.message, e.stopPropagation();
  }
  handleSortReorder(e) {
    this.parentBlockGroupEl || e.defaultPrevented || (e.preventDefault(), this.handleReorder(e));
  }
  handleSortAdd(e) {
    this.parentBlockGroupEl || e.defaultPrevented || (e.preventDefault(), this.handleAdd(e));
  }
  handleSortMove(e) {
    this.parentBlockGroupEl || e.defaultPrevented || (e.preventDefault(), this.handleMove(e));
  }
  connectObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectObserver() {
    this.mutationObserver?.disconnect();
  }
  onGlobalDragStart() {
    this.disconnectObserver();
  }
  onGlobalDragEnd() {
    this.connectObserver();
  }
  onDragEnd(e) {
    this.calciteBlockGroupDragEnd.emit(e);
  }
  onDragStart(e) {
    e.dragEl.sortHandleOpen = !1, this.calciteBlockGroupDragStart.emit(e);
  }
  onDragSort(e) {
    this.setParentBlockGroup(), this.updateBlockItemsDebounced(), this.calciteBlockGroupOrderChange.emit(e);
  }
  setParentBlockGroup() {
    this.parentBlockGroupEl = this.el.parentElement?.closest(m) || void 0;
  }
  handleDefaultSlotChange(e) {
    const t = [];
    this.blockAndGroups = O(e).filter((s) => c(s) ? (t.push(s), !0) : P(s)), H(t), this.updateBlockAndGroupScale();
  }
  updateBlockAndGroupScale() {
    this.blockAndGroups.forEach((e) => {
      e.scale = this.scale;
    });
  }
  updateBlockChildrenExpanded(e) {
    const { el: t, parentElement: s } = e.detail;
    if (s === this.el) {
      e.stopPropagation();
      const l = this.blockAndGroups.filter((a) => c(a));
      switch (this.expandMode) {
        case "multiple":
          t.expanded = !t.expanded;
          break;
        case "single":
          t.expanded = !t.expanded, this.collapseAllBlockElements(l, t);
          break;
        case "single-persist":
          t.expanded ? t.expanded && l.forEach((a) => {
            a.contains(t) && a !== t && (t.expanded = !1);
          }) : (t.expanded = !0, this.collapseAllBlockElements(l, t));
          break;
      }
    }
  }
  collapseAllBlockElements(e, t) {
    e.forEach((s) => {
      s !== t && !s.contains(t) && (s.expanded = !1);
    });
  }
  validateSortMenuItem({ fromEl: e, toEl: t, dragEl: s, newIndex: l, oldIndex: a, type: n }) {
    if (!e || !t || t === e || s.contains(t))
      return !1;
    const r = e.canPull?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: l,
      oldIndex: a
    }) ?? !0, o = t.canPut?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: l,
      oldIndex: a
    }) ?? !0;
    return (n === "add" ? r === "clone" : r === !0) && o;
  }
  handleAdd(e) {
    const { addTo: t } = e.detail, s = e.target, l = s?.parentElement, a = t.element, r = Array.from(l.children).filter(c).indexOf(s), o = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl: l, toEl: a, dragEl: s, newIndex: o, oldIndex: r }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver();
    const i = s.cloneNode();
    a.prepend(i), this.updateBlockItemsDebounced(), this.connectObserver();
    const f = {
      dragEl: s,
      fromEl: l,
      toEl: a,
      newIndex: o,
      oldIndex: r
    };
    this.calciteBlockGroupOrderChange.emit(f), a.emitOrderChangeEvent(f);
  }
  handleMove(e) {
    const { moveTo: t } = e.detail, s = e.target, l = s?.parentElement, a = t.element, r = Array.from(l.children).filter(c).indexOf(s), o = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl: l, toEl: a, dragEl: s, newIndex: o, oldIndex: r }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver(), a.prepend(s), this.updateBlockItemsDebounced(), this.connectObserver();
    const i = {
      dragEl: s,
      fromEl: l,
      toEl: a,
      newIndex: o,
      oldIndex: r
    };
    this.calciteBlockGroupOrderChange.emit(i), a.emitOrderChangeEvent(i);
  }
  handleReorder(e) {
    const { reorder: t } = e.detail, s = e.target, l = s?.parentElement;
    if (!l)
      return;
    s.sortHandleOpen = !1;
    const a = Array.from(l.children).filter(c), n = a.length - 1, r = a.indexOf(s);
    let o = r;
    switch (t) {
      case "top":
        o = 0;
        break;
      case "bottom":
        o = n;
        break;
      case "up":
        o = r === 0 ? 0 : r - 1;
        break;
      case "down":
        o = r === n ? n : r + 1;
        break;
    }
    this.disconnectObserver();
    const i = t === "up" || t === "top" ? a[o] : a[o].nextSibling;
    l.insertBefore(s, i), this.updateBlockItemsDebounced(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: s,
      fromEl: l,
      toEl: l,
      newIndex: o,
      oldIndex: r
    });
  }
  render() {
    const { loading: e, label: t } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: b`<div class=${p(u.container)}>${this.dragEnabled ? b`<span aria-live=assertive class=${p(u.assistiveText)}>${this.assistiveText}</span>` : null}${e ? b`<calcite-scrim class=${p(u.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${e} .ariaLabel=${t || ""} class=${p(u.groupContainer)} role=group><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>` });
  }
}
B("calcite-block-group", T);
export {
  T as BlockGroup
};
