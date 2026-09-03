/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as y, L as S, c as b, O as E, b as T, d as A } from "./index.js";
import { f as C, n as p, b as M } from "./dom.js";
import { t as w } from "./aria.js";
import { i as x } from "./resources33.js";
function D(I) {
  return Array.from(I.querySelectorAll("calcite-tree-item:not([disabled])")).filter(
    (e) => {
      let s = e;
      for (; s !== I && s !== null; ) {
        const t = s.parentElement;
        if (!(!x(t) || !t.hasChildren || t.expanded))
          return !1;
        s = s.parentElement;
      }
      return !0;
    }
  );
}
const O = y`:host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}`;
class k extends S {
  constructor() {
    super(), this.items = [], this.child = !1, this.lines = !1, this.parentExpanded = !1, this.scale = "m", this.selectedItems = [], this.selectionMode = "single", this.calciteTreeSelect = b({ cancelable: !1 }), this.listen("focus", this.onFocus), this.listen("focusin", this.onFocusIn), this.listen("focusout", this.onFocusOut), this.listen("calciteInternalTreeItemSelect", this.onInternalTreeItemSelect), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { child: 7, lines: 7, parentExpanded: 5, scale: 3, selectedItems: 0, selectionMode: 3 };
  }
  static {
    this.styles = O;
  }
  willUpdate(e) {
    e.has("parentExpanded") && (this.hasUpdated || this.parentExpanded !== !1) && this.updateItems();
    const s = this.el.parentElement?.closest("calcite-tree") ?? void 0;
    this.lines = s ? s.lines : this.lines, this.scale = s ? s.scale : this.scale, this.selectionMode = s ? s.selectionMode : this.selectionMode, this.child = !!s;
  }
  onFocus() {
    if (!this.child) {
      const e = (this.el.querySelector("calcite-tree-item[selected]:not([disabled])") || this.el.querySelector("calcite-tree-item:not([disabled])")) ?? void 0;
      C(e, !0, "focusable");
    }
  }
  onFocusIn(e) {
    (e.relatedTarget === this.el || !this.el.contains(e.relatedTarget)) && this.el.removeAttribute("tabindex");
  }
  onFocusOut(e) {
    !this.el.contains(e.relatedTarget) && (this.el.tabIndex = this.getRootTabIndex());
  }
  onInternalTreeItemSelect(e) {
    if (this.child)
      return;
    const s = e.target, t = p(s.querySelectorAll("calcite-tree-item")), r = this.selectionMode === "none", n = r ? [] : this.getSelectedItems();
    if (e.preventDefault(), e.stopPropagation(), this.selectionMode === "ancestors") {
      this.updateAncestorTree(e, n);
      return;
    }
    const l = this.selectionMode !== null && (!s.hasChildren || s.hasChildren && (this.selectionMode === "children" || this.selectionMode === "multichildren")), c = this.selectionMode === "multichildren" && s.hasChildren, d = !r && e.detail.modifyCurrentSelection && (this.selectionMode === "multiple" || this.selectionMode === "multichildren"), g = !d && ((this.selectionMode === "single" || this.selectionMode === "multiple") && t.length <= 0 || this.selectionMode === "children" || this.selectionMode === "multichildren" || this.selectionMode === "single-persist" && !s.hasChildren), h = ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) && s.hasChildren, a = [];
    l && a.push(s), g && p(this.el.querySelectorAll("calcite-tree-item[selected]")).forEach((o) => {
      a.includes(o) || (o.selected = !1);
    }), h && ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) && (s.expanded = !s.expanded), c && t.forEach((i) => {
      i.selected = !1, i.hasChildren && (i.expanded = !1);
    }), d && window.getSelection().removeAllRanges(), d && s.selected ? a.forEach((i) => {
      i.disabled || (i.selected = !1);
    }) : r || a.forEach((i) => {
      i.disabled || (i.selected = this.selectionMode !== "single" || !i.selected);
    }), this.selectedItems = r ? [] : this.getSelectedItems(), this.selectionChanged(n) && this.calciteTreeSelect.emit(), e.stopPropagation();
  }
  keyDownHandler(e) {
    if (this.child)
      return;
    const s = this.el, t = e.target, r = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End", "Tab"];
    if (!(x(t) && this.el.contains(t)) || !r.includes(e.key))
      return;
    const n = D(s);
    if (e.key === "Tab") {
      n.forEach((l) => l.tabIndex = -1);
      return;
    }
    if (e.key === "ArrowDown") {
      const l = n.indexOf(t);
      n[l + 1]?.focus(), e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp") {
      const l = n.indexOf(t);
      n[l - 1]?.focus(), e.preventDefault();
      return;
    }
    if (e.key === "ArrowLeft") {
      if (t.hasChildren && t.expanded) {
        t.expanded = !1, e.preventDefault();
        return;
      }
      n.slice(0, n.indexOf(t)).reverse().find((d) => d.depth === t.depth - 1)?.focus(), e.preventDefault();
      return;
    }
    if (e.key === "ArrowRight") {
      if (!t.disabled && t.hasChildren)
        if (!t.expanded)
          t.expanded = !0, e.preventDefault();
        else {
          const l = n.indexOf(t);
          n[l + 1]?.focus(), e.preventDefault();
        }
      return;
    }
    if (e.key === "Home") {
      const l = n.shift();
      l && (l.focus(), e.preventDefault());
      return;
    }
    if (e.key === "End") {
      const l = n.pop();
      l && (l.focus(), e.preventDefault());
      return;
    }
  }
  updateAncestorTree(e, s) {
    const t = e.target, r = e.detail.updateItem;
    if (t.disabled || t.indeterminate && !r)
      return;
    const n = [];
    let l = t.parentElement.closest("calcite-tree-item");
    for (; l; )
      n.push(l), l = l.parentElement.closest("calcite-tree-item");
    const c = Array.from(t.querySelectorAll("calcite-tree-item:not([disabled])")), d = c.filter((i) => !i.hasChildren), g = c.filter((i) => i.hasChildren);
    let h;
    r ? h = t.hasChildren ? !(t.selected || t.indeterminate) : !t.selected : h = t.selected, d.forEach((i) => {
      i.selected = h, i.indeterminate = !1;
    });
    function a(i, o) {
      const u = i.filter((f) => f.selected), m = i.filter((f) => !f.selected);
      o.selected = u.length === i.length, o.indeterminate = u.length > 0 && m.length > 0;
    }
    g.reverse().forEach((i) => {
      const o = Array.from(i.querySelectorAll(":scope > calcite-tree > calcite-tree-item"));
      a(o, i);
    }), r && (t.hasChildren ? a(c, t) : (t.selected = h, t.indeterminate = !1)), n.forEach((i) => {
      const o = p(i.querySelectorAll("calcite-tree-item")), u = o.filter((f) => f.selected);
      if (u.length === 0) {
        i.selected = !1, i.indeterminate = !1;
        return;
      }
      const m = u.length < o.length;
      i.indeterminate = m, i.selected = !m;
    }), this.selectedItems = this.getSelectedItems(), r && this.selectionChanged(s) && this.calciteTreeSelect.emit();
  }
  getSelectedItems() {
    return p(this.el.querySelectorAll("calcite-tree-item")).filter((e) => e.selected);
  }
  selectionChanged(e) {
    return e.length !== this.selectedItems.length || this.selectedItems.some((s) => !e.includes(s));
  }
  updateItems() {
    this.items.forEach((e) => e.parentExpanded = this.parentExpanded);
  }
  handleDefaultSlotChange(e) {
    const s = M(e).filter(x);
    this.items = s, this.updateItems();
  }
  getRootTabIndex() {
    return this.child ? -1 : 0;
  }
  render() {
    return this.el.ariaMultiSelectable = this.child ? null : w(this.selectionMode === "multiple" || this.selectionMode === "multichildren"), this.el.role = this.child ? null : "tree", E(this.el, "tabIndex", this.getRootTabIndex()), T`<slot @slotchange=${this.handleDefaultSlotChange}></slot>`;
  }
}
A("calcite-tree", k);
export {
  k as Tree
};
