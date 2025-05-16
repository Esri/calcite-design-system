import { a as x, L as y, d as E, k as T, x as A, c as M } from "./iframe.js";
import { a as S, n as p, d as b, t as C } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
function g(h) {
  return h?.tagName === "CALCITE-TREE-ITEM";
}
function w(h) {
  return Array.from(h.querySelectorAll("calcite-tree-item:not([disabled])")).filter(
    (t) => {
      let e = t;
      for (; e !== h && e !== void 0; ) {
        const i = e.parentElement;
        if (!(!g(i) || !i.hasChildren || i.expanded))
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
  );
}
const D = x`:host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}`;
class k extends y {
  constructor() {
    super(), this.items = [], this.lines = !1, this.parentExpanded = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "single", this.calciteTreeSelect = E({ cancelable: !1 }), this.listen("focus", this.onFocus), this.listen("focusin", this.onFocusIn), this.listen("focusout", this.onFocusOut), this.listen("calciteInternalTreeItemSelect", this.onInternalTreeItemSelect), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { child: 7, lines: 7, parentExpanded: 5, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = D;
  }
  willUpdate(t) {
    t.has("parentExpanded") && (this.hasUpdated || this.parentExpanded !== !1) && this.updateItems();
    const e = this.el.parentElement?.closest("calcite-tree");
    this.lines = e ? e.lines : this.lines, this.scale = e ? e.scale : this.scale, this.selectionMode = e ? e.selectionMode : this.selectionMode, this.child = !!e;
  }
  onFocus() {
    if (!this.child) {
      const t = this.el.querySelector("calcite-tree-item[selected]:not([disabled])") || this.el.querySelector("calcite-tree-item:not([disabled])");
      S(t);
    }
  }
  onFocusIn(t) {
    (t.relatedTarget === this.el || !this.el.contains(t.relatedTarget)) && this.el.removeAttribute("tabindex");
  }
  onFocusOut(t) {
    !this.el.contains(t.relatedTarget) && (this.el.tabIndex = this.getRootTabIndex());
  }
  onInternalTreeItemSelect(t) {
    if (this.child)
      return;
    const e = t.target, i = p(e.querySelectorAll("calcite-tree-item"));
    if (t.preventDefault(), t.stopPropagation(), this.selectionMode === "ancestors") {
      this.updateAncestorTree(t);
      return;
    }
    const o = this.selectionMode === "none", n = this.selectionMode !== null && (!e.hasChildren || e.hasChildren && (this.selectionMode === "children" || this.selectionMode === "multichildren")), l = this.selectionMode === "multichildren" && e.hasChildren, c = !o && t.detail.modifyCurrentSelection && (this.selectionMode === "multiple" || this.selectionMode === "multichildren"), u = !c && ((this.selectionMode === "single" || this.selectionMode === "multiple") && i.length <= 0 || this.selectionMode === "children" || this.selectionMode === "multichildren" || this.selectionMode === "single-persist" && !e.hasChildren), a = ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) && e.hasChildren, d = [];
    n && d.push(e), u && p(this.el.querySelectorAll("calcite-tree-item[selected]")).forEach((r) => {
      d.includes(r) || (r.selected = !1);
    }), a && ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) && (e.expanded = !e.expanded), l && i.forEach((s) => {
      s.selected = !1, s.hasChildren && (s.expanded = !1);
    }), c && window.getSelection().removeAllRanges(), c && e.selected ? d.forEach((s) => {
      s.disabled || (s.selected = !1);
    }) : o || d.forEach((s) => {
      s.disabled || (s.selected = this.selectionMode !== "single" || !s.selected);
    }), this.selectedItems = o ? [] : p(this.el.querySelectorAll("calcite-tree-item")).filter((s) => s.selected), this.calciteTreeSelect.emit(), t.stopPropagation();
  }
  keyDownHandler(t) {
    if (this.child)
      return;
    const e = this.el, i = t.target, o = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End", "Tab"];
    if (!(g(i) && this.el.contains(i)) || !o.includes(t.key))
      return;
    const n = w(e);
    if (t.key === "Tab") {
      n.forEach((l) => l.tabIndex = -1);
      return;
    }
    if (t.key === "ArrowDown") {
      const l = n.indexOf(i);
      n[l + 1]?.focus(), t.preventDefault();
      return;
    }
    if (t.key === "ArrowUp") {
      const l = n.indexOf(i);
      n[l - 1]?.focus(), t.preventDefault();
      return;
    }
    if (t.key === "ArrowLeft") {
      if (i.hasChildren && i.expanded) {
        i.expanded = !1, t.preventDefault();
        return;
      }
      n.slice(0, n.indexOf(i)).reverse().find((u) => u.depth === i.depth - 1)?.focus(), t.preventDefault();
      return;
    }
    if (t.key === "ArrowRight") {
      if (!i.disabled && i.hasChildren)
        if (!i.expanded)
          i.expanded = !0, t.preventDefault();
        else {
          const l = n.indexOf(i);
          n[l + 1]?.focus(), t.preventDefault();
        }
      return;
    }
    if (t.key === "Home") {
      const l = n.shift();
      l && (l.focus(), t.preventDefault());
      return;
    }
    if (t.key === "End") {
      const l = n.pop();
      l && (l.focus(), t.preventDefault());
      return;
    }
  }
  updateAncestorTree(t) {
    const e = t.target, i = t.detail.updateItem;
    if (e.disabled || e.indeterminate && !i)
      return;
    const o = [];
    let n = e.parentElement.closest("calcite-tree-item");
    for (; n; )
      o.push(n), n = n.parentElement.closest("calcite-tree-item");
    const l = Array.from(e.querySelectorAll("calcite-tree-item:not([disabled])")), c = l.filter((s) => !s.hasChildren), u = l.filter((s) => s.hasChildren);
    let a;
    i ? a = e.hasChildren ? !(e.selected || e.indeterminate) : !e.selected : a = e.selected, c.forEach((s) => {
      s.selected = a, s.indeterminate = !1;
    });
    function d(s, r) {
      const f = s.filter((m) => m.selected), I = s.filter((m) => !m.selected);
      r.selected = f.length === s.length, r.indeterminate = f.length > 0 && I.length > 0;
    }
    u.reverse().forEach((s) => {
      const r = Array.from(s.querySelectorAll(":scope > calcite-tree > calcite-tree-item"));
      d(r, s);
    }), i && (e.hasChildren ? d(l, e) : (e.selected = a, e.indeterminate = !1)), o.forEach((s) => {
      const r = p(s.querySelectorAll("calcite-tree-item")), f = r.filter((m) => m.selected);
      if (f.length === 0) {
        s.selected = !1, s.indeterminate = !1;
        return;
      }
      const I = f.length < r.length;
      s.indeterminate = I, s.selected = !I;
    }), this.selectedItems = p(this.el.querySelectorAll("calcite-tree-item")).filter((s) => s.selected), i && this.calciteTreeSelect.emit();
  }
  updateItems() {
    this.items.forEach((t) => t.parentExpanded = this.parentExpanded);
  }
  handleDefaultSlotChange(t) {
    const e = b(t).filter((i) => i.matches("calcite-tree-item"));
    this.items = e, this.updateItems();
  }
  getRootTabIndex() {
    return this.child ? -1 : 0;
  }
  render() {
    return this.el.ariaMultiSelectable = this.child ? void 0 : C(this.selectionMode === "multiple" || this.selectionMode === "multichildren"), this.el.role = this.child ? void 0 : "tree", T(this.el, "tabIndex", this.getRootTabIndex()), A`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
  }
}
M("calcite-tree", k);
export {
  k as Tree
};
