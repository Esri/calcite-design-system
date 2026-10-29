/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as g, L as v, D as E, d as u, s as h, C as B, b as p, f as I } from "./index.js";
import { d as x } from "./debounce.js";
import { c as S } from "./observers.js";
import { g as O, b as C } from "./dom.js";
import { g as D } from "./guid.js";
import { u as G } from "./useFocusable.js";
import { u as A } from "./useCancelable.js";
import { u as y } from "./useInteractive.js";
import { u as M } from "./useSortable.js";
import { i as P } from "./resources2.js";
import { s as T } from "./screen-reader.js";
import { i as c } from "./resources10.js";
import { t as H } from "./aria.js";
const m = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim"
}, b = "calcite-block-group", k = "calcite-block", $ = P("calcite-block-group"), w = g`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{position:relative}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([slot=children]) slot::slotted(calcite-block){border-block-end-width:0}`;
function U(d) {
  d.forEach((e) => {
    e.setPosition = d.indexOf(e) + 1, e.setSize = d.length;
  });
}
class R extends v {
  constructor() {
    super(), this.dragSelector = k, this.handleSelector = "calcite-sort-handle", this.mutationObserver = S("mutation", () => {
      this.updateBlockItemsDebounced();
    }), this.blockAndGroups = [], this.cancelable = A()(this), this.focusSetter = G()(this), this.sortable = M()(this), this.updateBlockItemsDebounced = x(this.updateBlockItems, E.nextTick), this.interactiveContainer = y(this), this.sortHandleMenuItems = [], this.disabled = !1, this.dragEnabled = !1, this.loading = !1, this.scale = "m", this.expandMode = "multiple", this.sortDisabled = !1, this.calciteBlockGroupDragEnd = u({ cancelable: !1 }), this.calciteBlockGroupDragStart = u({ cancelable: !1 }), this.calciteBlockGroupOrderChange = u({ cancelable: !1 }), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteBlockSortHandleBeforeOpen", this.updateBlockItemsDebounced), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteSortHandleAdd", this.handleSortAdd), this.listen("calciteInternalBlockChange", this.updateBlockChildrenExpanded);
  }
  static {
    this.properties = { assistiveText: 16, sortHandleMenuItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, group: 3, label: 1, loading: 7, scale: 3, expandMode: 3, sortDisabled: 7 };
  }
  static {
    this.styles = [w, T];
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
    const { dragEnabled: e, el: t, sortDisabled: s, sortHandleMenuItems: r } = this, a = Array.from(this.el.querySelectorAll(k)), n = t, l = Array.from(n.children).filter(c);
    a.forEach((o) => {
      o.closest(b) === t && (o.moveToItems = r.filter((i) => this.validateSortMenuItem({
        type: "move",
        fromEl: n,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: l.indexOf(o)
      })), o.addToItems = this.sortHandleMenuItems.filter((i) => this.validateSortMenuItem({
        type: "add",
        fromEl: n,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: l.indexOf(o)
      })), o.dragHandle = e, o.sortDisabled = s);
    }), this.sortable.reset();
  }
  updateGroupItems() {
    const { el: e, group: t } = this, s = O(e), r = t ? Array.from(s.querySelectorAll(`${b}[group="${t}"]`)).filter((a) => !a.disabled && a.dragEnabled) : [];
    this.sortHandleMenuItems = r.map((a) => ({
      element: a,
      label: a.label ?? a.id,
      id: D()
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
    this.parentBlockGroupEl = this.el.parentElement?.closest(b) || void 0;
  }
  handleDefaultSlotChange(e) {
    const t = [];
    this.blockAndGroups = C(e).filter((s) => c(s) ? (t.push(s), !0) : $(s)), U(t), this.updateBlockAndGroupScale();
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
      const r = this.blockAndGroups.filter((a) => c(a));
      switch (this.expandMode) {
        case "multiple":
          t.expanded = !t.expanded;
          break;
        case "single":
          t.expanded = !t.expanded, this.collapseAllBlockElements(r, t);
          break;
        case "single-persist":
          t.expanded ? t.expanded && r.forEach((a) => {
            a.contains(t) && a !== t && (t.expanded = !1);
          }) : (t.expanded = !0, this.collapseAllBlockElements(r, t));
          break;
      }
    }
  }
  collapseAllBlockElements(e, t) {
    e.forEach((s) => {
      s !== t && !s.contains(t) && (s.expanded = !1);
    });
  }
  validateSortMenuItem({ fromEl: e, toEl: t, dragEl: s, newIndex: r, oldIndex: a, type: n }) {
    if (!e || !t || t === e || s.contains(t))
      return !1;
    const l = e.canPull?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: r,
      oldIndex: a
    }) ?? !0, o = t.canPut?.({
      toEl: t,
      fromEl: e,
      dragEl: s,
      newIndex: r,
      oldIndex: a
    }) ?? !0;
    return (n === "add" ? l === "clone" : l === !0) && o;
  }
  handleAdd(e) {
    const { addTo: t } = e.detail, s = e.target, r = s?.parentElement, a = t.element, l = Array.from(r.children).filter(c).indexOf(s), o = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl: r, toEl: a, dragEl: s, newIndex: o, oldIndex: l }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver();
    const i = s.cloneNode();
    a.prepend(i), this.updateBlockItemsDebounced(), this.connectObserver();
    const f = {
      dragEl: s,
      fromEl: r,
      toEl: a,
      newIndex: o,
      oldIndex: l
    };
    this.calciteBlockGroupOrderChange.emit(f), a.emitOrderChangeEvent(f);
  }
  handleMove(e) {
    const { moveTo: t } = e.detail, s = e.target, r = s?.parentElement, a = t.element, l = Array.from(r.children).filter(c).indexOf(s), o = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl: r, toEl: a, dragEl: s, newIndex: o, oldIndex: l }))
      return;
    s.sortHandleOpen = !1, this.disconnectObserver(), a.prepend(s), this.updateBlockItemsDebounced(), this.connectObserver();
    const i = {
      dragEl: s,
      fromEl: r,
      toEl: a,
      newIndex: o,
      oldIndex: l
    };
    this.calciteBlockGroupOrderChange.emit(i), a.emitOrderChangeEvent(i);
  }
  handleReorder(e) {
    const { reorder: t } = e.detail, s = e.target, r = s?.parentElement;
    if (!r)
      return;
    s.sortHandleOpen = !1;
    const a = Array.from(r.children).filter(c), n = a.length - 1, l = a.indexOf(s);
    let o = l;
    switch (t) {
      case "top":
        o = 0;
        break;
      case "bottom":
        o = n;
        break;
      case "up":
        o = l === 0 ? 0 : l - 1;
        break;
      case "down":
        o = l === n ? n : l + 1;
        break;
    }
    this.disconnectObserver();
    const i = t === "up" || t === "top" ? a[o] : a[o].nextSibling;
    r.insertBefore(s, i), this.updateBlockItemsDebounced(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: s,
      fromEl: r,
      toEl: r,
      newIndex: o,
      oldIndex: l
    });
  }
  render() {
    const { loading: e, label: t } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: p`<div class=${h(m.container)}>${this.dragEnabled ? p`<span aria-live=assertive class=${h(B.screenReaderText)}>${this.assistiveText}</span>` : null}${e ? p`<calcite-scrim class=${h(m.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${H(e, void 0)} .ariaLabel=${t || ""} class=${h(m.groupContainer)} role=group><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>` });
  }
}
I("calcite-block-group", R);
export {
  R as BlockGroup
};
