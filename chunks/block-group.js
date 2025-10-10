import { b as v, L as k, c as d, s as h, x as f, D as I, q as E } from "./index.js";
import { u as S, I as B } from "./interactive.js";
import { c as O } from "./observers.js";
import { d as D, c as x } from "./sortableComponent.js";
import { g as C, d as G } from "./dom.js";
import { g as y } from "./guid.js";
import { u as A } from "./useSetFocus.js";
import { u as M } from "./useCancelable.js";
import { d as P } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function u(c) {
  return c.tagName === "CALCITE-BLOCK";
}
const p = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text"
}, m = "calcite-block-group", b = "calcite-block", H = v`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{position:relative}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
function T(c) {
  c.forEach((e) => {
    e.setPosition = c.indexOf(e) + 1, e.setSize = c.length;
  });
}
class w extends k {
  constructor() {
    super(), this.dragSelector = b, this.handleSelector = "calcite-sort-handle", this.mutationObserver = O("mutation", () => {
      this.updateBlockItemsDebounced();
    }), this.blockAndGroups = [], this.cancelable = M()(this), this.focusSetter = A()(this), this.updateBlockItemsDebounced = P(this.updateBlockItems, I.nextTick), this.sortHandleMenuItems = [], this.disabled = !1, this.dragEnabled = !1, this.loading = !1, this.scale = "m", this.sortDisabled = !1, this.calciteBlockGroupDragEnd = d({ cancelable: !1 }), this.calciteBlockGroupDragStart = d({ cancelable: !1 }), this.calciteBlockGroupOrderChange = d({ cancelable: !1 }), this.calciteBlockGroupMoveHalt = d({ cancelable: !1 }), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteBlockSortHandleBeforeOpen", this.updateBlockItemsDebounced), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove), this.listen("calciteSortHandleAdd", this.handleSortAdd);
  }
  static {
    this.properties = { assistiveText: 16, sortHandleMenuItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, group: 3, label: 1, loading: 7, scale: 3, sortDisabled: 7 };
  }
  static {
    this.styles = H;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  emitOrderChangeEvent(e) {
    this.calciteBlockGroupOrderChange.emit(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.updateBlockItemsDebounced(), this.setUpSorting(), this.setParentBlockGroup(), this.cancelable.add(this.updateBlockItemsDebounced);
  }
  willUpdate(e) {
    (e.has("group") || e.has("canPull") && this.hasUpdated || e.has("canPut") && this.hasUpdated || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== !1)) && this.updateBlockItemsDebounced(), e.has("scale") && this.hasUpdated && this.updateBlockAndGroupScale();
  }
  updated() {
    S(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), D(this);
  }
  updateBlockItems() {
    this.updateGroupItems();
    const { dragEnabled: e, el: a, sortDisabled: t, sortHandleMenuItems: r } = this, s = Array.from(this.el.querySelectorAll(b)), l = a, n = Array.from(l.children).filter(u);
    s.forEach((o) => {
      o.closest(m) === a && (o.moveToItems = r.filter((i) => this.validateSortMenuItem({
        type: "move",
        fromEl: l,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: n.indexOf(o)
      })), o.addToItems = this.sortHandleMenuItems.filter((i) => this.validateSortMenuItem({
        type: "add",
        fromEl: l,
        toEl: i.element,
        dragEl: o,
        newIndex: 0,
        oldIndex: n.indexOf(o)
      })), o.dragHandle = e, o.sortDisabled = t);
    }), this.setUpSorting();
  }
  updateGroupItems() {
    const { el: e, group: a } = this, t = C(e), r = a ? Array.from(t.querySelectorAll(`${m}[group="${a}"]`)).filter((s) => !s.disabled && s.dragEnabled) : [];
    this.sortHandleMenuItems = r.map((s) => ({
      element: s,
      label: s.label ?? s.id,
      id: y()
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
  setUpSorting() {
    const { dragEnabled: e } = this;
    e && x(this);
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
    this.parentBlockGroupEl = this.el.parentElement?.closest(m);
  }
  handleDefaultSlotChange(e) {
    const a = [];
    this.blockAndGroups = G(e).filter((t) => (t.matches(b) && a.push(t), t.matches(b) || t.matches(m))), T(a), this.updateBlockAndGroupScale();
  }
  updateBlockAndGroupScale() {
    this.blockAndGroups.forEach((e) => {
      e.scale = this.scale;
    });
  }
  validateSortMenuItem({ fromEl: e, toEl: a, dragEl: t, newIndex: r, oldIndex: s, type: l }) {
    if (!e || !a || a === e || t.contains(a))
      return !1;
    const n = e.canPull?.({
      toEl: a,
      fromEl: e,
      dragEl: t,
      newIndex: r,
      oldIndex: s
    }) ?? !0, o = a.canPut?.({
      toEl: a,
      fromEl: e,
      dragEl: t,
      newIndex: r,
      oldIndex: s
    }) ?? !0;
    return (l === "add" ? n === "clone" : n === !0) && o;
  }
  handleAdd(e) {
    const { addTo: a } = e.detail, t = e.target, r = t?.parentElement, s = a.element, n = Array.from(r.children).filter(u).indexOf(t), o = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl: r, toEl: s, dragEl: t, newIndex: o, oldIndex: n }))
      return;
    t.sortHandleOpen = !1, this.disconnectObserver();
    const i = t.cloneNode();
    s.prepend(i), this.updateBlockItemsDebounced(), this.connectObserver();
    const g = {
      dragEl: t,
      fromEl: r,
      toEl: s,
      newIndex: o,
      oldIndex: n
    };
    this.calciteBlockGroupOrderChange.emit(g), s.emitOrderChangeEvent(g);
  }
  handleMove(e) {
    const { moveTo: a } = e.detail, t = e.target, r = t?.parentElement, s = a.element, n = Array.from(r.children).filter(u).indexOf(t), o = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl: r, toEl: s, dragEl: t, newIndex: o, oldIndex: n }))
      return;
    t.sortHandleOpen = !1, this.disconnectObserver(), s.prepend(t), this.updateBlockItemsDebounced(), this.connectObserver();
    const i = {
      dragEl: t,
      fromEl: r,
      toEl: s,
      newIndex: o,
      oldIndex: n
    };
    this.calciteBlockGroupOrderChange.emit(i), s.emitOrderChangeEvent(i);
  }
  handleReorder(e) {
    const { reorder: a } = e.detail, t = e.target, r = t?.parentElement;
    if (!r)
      return;
    t.sortHandleOpen = !1;
    const s = Array.from(r.children).filter(u), l = s.length - 1, n = s.indexOf(t);
    let o = n;
    switch (a) {
      case "top":
        o = 0;
        break;
      case "bottom":
        o = l;
        break;
      case "up":
        o = n === 0 ? 0 : n - 1;
        break;
      case "down":
        o = n === l ? l : n + 1;
        break;
    }
    this.disconnectObserver();
    const i = a === "up" || a === "top" ? s[o] : s[o].nextSibling;
    r.insertBefore(t, i), this.updateBlockItemsDebounced(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: t,
      fromEl: r,
      toEl: r,
      newIndex: o,
      oldIndex: n
    });
  }
  render() {
    const { loading: e, label: a } = this;
    return B({ disabled: this.disabled, children: f`<div class=${h(p.container)}>${this.dragEnabled ? f`<span aria-live=assertive class=${h(p.assistiveText)}>${this.assistiveText}</span>` : null}${e ? f`<calcite-scrim class=${h(p.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${e} .ariaLabel=${a || ""} class=${h(p.groupContainer)} role=group><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>` });
  }
}
E("calcite-block-group", w);
export {
  w as BlockGroup
};
