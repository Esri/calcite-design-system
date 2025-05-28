import { a as g, L as v, d as c, s as d, x as p, D as k, c as E } from "./iframe.js";
import { u as B, I as C } from "./interactive.js";
import { c as I } from "./observers.js";
import { d as S, c as x } from "./sortableComponent.js";
import { c as O } from "./component.js";
import { f as G, C as y } from "./dom.js";
import { g as T } from "./guid.js";
import { d as D } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
function b(n) {
  return n.tagName === "CALCITE-BLOCK";
}
const h = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text"
}, u = "calcite-block-group", m = "calcite-block", $ = g`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{position:relative}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
function P(n) {
  const e = n.assignedElements({ flatten: !0 }).filter((s) => s.matches(m));
  e.forEach((s) => {
    s.setPosition = e.indexOf(s) + 1, s.setSize = e.length;
  });
}
class w extends v {
  constructor() {
    super(), this.dragSelector = m, this.handleSelector = "calcite-sort-handle", this.mutationObserver = I("mutation", () => {
      this.updateBlockItems();
    }), this.updateBlockItems = D(() => {
      this.updateGroupItems();
      const { dragEnabled: e, el: s, moveToItems: a } = this;
      Array.from(this.el.querySelectorAll(m)).forEach((t) => {
        t.closest(u) === s && (t.moveToItems = a.filter((l) => l.element !== s && !t.contains(l.element)), t.dragHandle = e);
      }), this.setUpSorting();
    }, k.nextTick), this.moveToItems = [], this.disabled = !1, this.dragEnabled = !1, this.loading = !1, this.calciteBlockGroupDragEnd = c({ cancelable: !1 }), this.calciteBlockGroupDragStart = c({ cancelable: !1 }), this.calciteBlockGroupOrderChange = c({ cancelable: !1 }), this.calciteBlockGroupMoveHalt = c({ cancelable: !1 }), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove);
  }
  static {
    this.properties = { assistiveText: 16, moveToItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, group: 3, label: 1, loading: 7 };
  }
  static {
    this.styles = $;
  }
  async setFocus() {
    await O(this), G(this.el);
  }
  putFailed(e) {
    this.calciteBlockGroupMoveHalt.emit(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.updateBlockItems(), this.setUpSorting(), this.setParentBlockGroup();
  }
  willUpdate(e) {
    (e.has("group") || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1)) && this.updateBlockItems();
  }
  updated() {
    B(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), S(this);
  }
  updateGroupItems() {
    const { el: e, group: s } = this, a = y(e), o = s ? Array.from(a.querySelectorAll(`${u}[group="${s}"]`)).filter((t) => !t.disabled && t.dragEnabled) : [];
    this.moveToItems = o.map((t) => ({
      element: t,
      label: t.label ?? t.id,
      id: T()
    }));
  }
  handleCalciteInternalAssistiveTextChange(e) {
    this.assistiveText = e.detail.message, e.stopPropagation();
  }
  handleSortReorder(e) {
    this.parentBlockGroupEl || e.defaultPrevented || (e.preventDefault(), this.handleReorder(e));
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
    this.setParentBlockGroup(), this.updateBlockItems(), this.calciteBlockGroupOrderChange.emit(e);
  }
  setParentBlockGroup() {
    this.parentBlockGroupEl = this.el.parentElement?.closest(u);
  }
  handleDefaultSlotChange(e) {
    P(e.target);
  }
  handleMove(e) {
    const { moveTo: s } = e.detail, a = e.target, o = a?.parentElement, t = s.element, i = Array.from(o.children).filter(b).indexOf(a), r = 0;
    if (o) {
      if (o.canPull?.({
        toEl: t,
        fromEl: o,
        dragEl: a,
        newIndex: r,
        oldIndex: i
      }) === !1) {
        this.calciteBlockGroupMoveHalt.emit({ toEl: t, fromEl: o, dragEl: a, oldIndex: i, newIndex: r });
        return;
      }
      if (t.canPut?.({
        toEl: t,
        fromEl: o,
        dragEl: a,
        newIndex: r,
        oldIndex: i
      }) === !1) {
        t.putFailed({ toEl: t, fromEl: o, dragEl: a, oldIndex: i, newIndex: r });
        return;
      }
      a.sortHandleOpen = !1, this.disconnectObserver(), t.prepend(a), this.updateBlockItems(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
        dragEl: a,
        fromEl: o,
        toEl: t,
        newIndex: r,
        oldIndex: i
      });
    }
  }
  handleReorder(e) {
    const { reorder: s } = e.detail, a = e.target, o = a?.parentElement;
    if (!o)
      return;
    a.sortHandleOpen = !1;
    const t = Array.from(o.children).filter(b), l = t.length - 1, i = t.indexOf(a);
    let r = i;
    switch (s) {
      case "top":
        r = 0;
        break;
      case "bottom":
        r = l;
        break;
      case "up":
        r = i === 0 ? 0 : i - 1;
        break;
      case "down":
        r = i === l ? l : i + 1;
        break;
    }
    this.disconnectObserver();
    const f = s === "up" || s === "top" ? t[r] : t[r].nextSibling;
    o.insertBefore(a, f), this.updateBlockItems(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: a,
      fromEl: o,
      toEl: o,
      newIndex: r,
      oldIndex: i
    });
  }
  render() {
    const { loading: e, label: s } = this;
    return C({ disabled: this.disabled, children: p`<div class=${d(h.container)}>${this.dragEnabled ? p`<span aria-live=assertive class=${d(h.assistiveText)}>${this.assistiveText}</span>` : null}${e ? p`<calcite-scrim class=${d(h.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${e} .ariaLabel=${s || ""} class=${d(h.groupContainer)} role=group><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>` });
  }
}
E("calcite-block-group", w);
export {
  w as BlockGroup
};
