import { d as f, L as v, j as p, s as c, x as u, D as k, h as E } from "./iframe.js";
import { u as I, I as C } from "./interactive.js";
import { c as B } from "./observers.js";
import { d as S, c as x } from "./sortableComponent.js";
import { c as O } from "./component.js";
import { f as y, C as G } from "./dom.js";
import { g as T } from "./guid.js";
import { d as D } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
function m(l) {
  return l.tagName === "CALCITE-BLOCK";
}
const d = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text"
}, b = "calcite-block-group", g = "calcite-block", $ = f`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{position:relative}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
function w(l) {
  const e = l.assignedElements({ flatten: !0 }).filter((s) => s.matches(g));
  e.forEach((s) => {
    s.setPosition = e.indexOf(s) + 1, s.setSize = e.length;
  });
}
class A extends v {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.dragSelector = g, this.handleSelector = "calcite-sort-handle", this.mutationObserver = B("mutation", () => {
      this.updateBlockItems();
    }), this.updateBlockItems = D(() => {
      this.updateGroupItems();
      const { dragEnabled: e, el: s, moveToItems: a } = this;
      Array.from(this.el.querySelectorAll(g)).forEach((t) => {
        t.closest(b) === s && (t.moveToItems = a.filter((n) => n.element !== s && !t.contains(n.element)), t.dragHandle = e);
      }), this.setUpSorting();
    }, k.nextTick), this.moveToItems = [], this.disabled = !1, this.dragEnabled = !1, this.loading = !1, this.calciteBlockGroupDragEnd = p({ cancelable: !1 }), this.calciteBlockGroupDragStart = p({ cancelable: !1 }), this.calciteBlockGroupOrderChange = p({ cancelable: !1 }), this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange), this.listen("calciteSortHandleReorder", this.handleSortReorder), this.listen("calciteSortHandleMove", this.handleSortMove);
  }
  static {
    this.properties = { assistiveText: 16, moveToItems: 16, canPull: 0, canPut: 0, disabled: 7, dragEnabled: 7, group: 3, label: 1, loading: 7 };
  }
  static {
    this.styles = $;
  }
  // #endregion
  // #region Public Methods
  /**
   * Sets focus on the component's first focusable element.
   *
   * @returns {Promise<void>}
   */
  async setFocus() {
    await O(this), y(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), this.connectObserver(), this.updateBlockItems(), this.setUpSorting(), this.setParentBlockGroup();
  }
  willUpdate(e) {
    (e.has("group") || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1)) && this.updateBlockItems();
  }
  updated() {
    I(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disconnectObserver(), S(this);
  }
  // #endregion
  // #region Private Methods
  updateGroupItems() {
    const { el: e, group: s } = this, a = G(e), o = s ? Array.from(a.querySelectorAll(`${b}[group="${s}"]`)).filter((t) => !t.disabled && t.dragEnabled) : [];
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
    this.parentBlockGroupEl || this.handleReorder(e);
  }
  handleSortMove(e) {
    this.parentBlockGroupEl || this.handleMove(e);
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
    this.parentBlockGroupEl = this.el.parentElement?.closest(b);
  }
  handleDefaultSlotChange(e) {
    w(e.target);
  }
  handleMove(e) {
    const { moveTo: s } = e.detail, a = e.target, o = a?.parentElement, t = s.element, r = Array.from(o.children).filter(m).indexOf(a);
    if (!o)
      return;
    a.sortHandleOpen = !1, this.disconnectObserver(), t.prepend(a);
    const h = Array.from(t.children).filter(m).indexOf(a);
    this.updateBlockItems(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: a,
      fromEl: o,
      toEl: t,
      newIndex: h,
      oldIndex: r
    });
  }
  handleReorder(e) {
    const { reorder: s } = e.detail, a = e.target, o = a?.parentElement;
    if (!o)
      return;
    a.sortHandleOpen = !1;
    const t = Array.from(o.children).filter(m), n = t.length - 1, r = t.indexOf(a);
    let i = r;
    switch (s) {
      case "top":
        i = 0;
        break;
      case "bottom":
        i = n;
        break;
      case "up":
        i = r === 0 ? 0 : r - 1;
        break;
      case "down":
        i = r === n ? n : r + 1;
        break;
    }
    this.disconnectObserver();
    const h = s === "up" || s === "top" ? t[i] : t[i].nextSibling;
    o.insertBefore(a, h), this.updateBlockItems(), this.connectObserver(), this.calciteBlockGroupOrderChange.emit({
      dragEl: a,
      fromEl: o,
      toEl: o,
      newIndex: i,
      oldIndex: r
    });
  }
  // #endregion
  // #region Rendering
  render() {
    const { loading: e, label: s } = this;
    return C({ disabled: this.disabled, children: u`<div class=${c(d.container)}>${this.dragEnabled ? u`<span aria-live=assertive class=${c(d.assistiveText)}>${this.assistiveText}</span>` : null}${e ? u`<calcite-scrim class=${c(d.scrim)} .loading=${e}></calcite-scrim>` : null}<div .ariaBusy=${e} .ariaLabel=${s || ""} class=${c(d.groupContainer)} role=group><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>` });
  }
}
E("calcite-block-group", A);
export {
  A as BlockGroup
};
