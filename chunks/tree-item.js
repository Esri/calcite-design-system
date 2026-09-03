/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as S, L as y, c as r, s as i, F as d, b as c, O as I, A as $, d as E } from "./index.js";
import { i as f } from "./keyed.js";
import { e as T, n as w } from "./ref.js";
import { u as M } from "./index2.js";
import { H as A, b as z, s as L } from "./dom.js";
import { t as m } from "./aria.js";
import { g as h } from "./component.js";
import { i as R } from "./resources2.js";
import { u as H } from "./useInteractive.js";
import { I as l, C as n, S as b } from "./resources33.js";
const P = R("calcite-tree"), U = S`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-internal-tree-item-spacing-unit: .25rem;--calcite-internal-tree-item-padding-block: .25rem;--calcite-internal-tree-item-children-container-padding: 1.25rem;--calcite-internal-tree-item-line-left-position: .75rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host(:is([scale=s],[scale=m])){--calcite-internal-tree-item-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-tree-item-spacing-unit: .5rem;--calcite-internal-tree-item-padding-block: .5rem;--calcite-internal-tree-item-children-container-padding: 1.5rem;--calcite-internal-tree-item-line-left-position: 1rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=l]){--calcite-internal-tree-item-action-spacing: var(--calcite-spacing-xs);--calcite-internal-tree-item-spacing-unit: .75rem;--calcite-internal-tree-item-padding-block: .625rem;--calcite-internal-tree-item-children-container-padding: 2.25rem;--calcite-internal-tree-item-line-left-position: 1.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host{display:block;max-inline-size:100%;cursor:pointer}:host .children-container ::slotted(*){padding-inline-start:var(--calcite-internal-tree-item-children-container-padding);overflow:hidden}.node-actions-container{display:flex}.node-actions-container .node-container,.node-actions-container .checkbox-container{gap:var(--calcite-internal-tree-item-spacing-unit)}.node-actions-container .node-container{padding-inline:var(--calcite-internal-tree-item-spacing-unit);padding-block:var(--calcite-internal-tree-item-padding-block)}.node-actions-container{color:var(--calcite-tree-text-color, var(--calcite-color-text-1))}.icon-start{--calcite-icon-color: var(--calcite-color-text-3)}:host([calcite-hydrated-hidden]){visibility:hidden!important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([lines]) .children-container:after{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-timing-function:ease-in-out;position:absolute;inset-block-start:0px;z-index:var(--calcite-z-index);inline-size:1px;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:var(--calcite-animation-timing);block-size:100%;inset-inline-start:var(--calcite-internal-tree-item-line-left-position);content:"";background-color:var(--calcite-color-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none!important}::slotted(*):hover{text-decoration:none!important}::slotted(a){inline-size:100%;text-decoration-line:none}:host{outline:2px solid transparent;outline-offset:2px}:host .node-container{outline-color:transparent}:host:focus .node-container,:host:active .node-container{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus:not([disabled])) .node-container{outline:2px solid transparent;outline-offset:2px;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus:not([disabled])) .checkbox{outline:2px solid transparent;outline-offset:2px}.actions-end{display:flex;flex-direction:row;align-items:center;align-self:stretch;gap:var(--calcite-internal-tree-item-action-spacing)}.checkbox-container{display:flex;align-items:center}.checkbox{line-height:0;color:var(--calcite-tree-selected-icon-color, var(--calcite-color-border-input))}.checkbox-label{pointer-events:none;display:flex;align-items:center}.children-container{display:grid;grid-template-rows:0fr;max-block-size:max-content;opacity:1;position:relative;transition:opacity var(--calcite-internal-animation-timing-slow) ease-in-out,grid-template-rows var(--calcite-internal-animation-timing-medium) ease-in-out}.item--expanded>.children-container{grid-template-rows:1fr;opacity:1;max-block-size:max-content}@starting-style{.item--expanded>.children-container{opacity:0;grid-template-rows:0fr}}.node-container{position:relative;display:flex;min-inline-size:0px;flex-grow:1;align-items:center}.node-container .selection-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;opacity:0;color:var(--calcite-color-border-1)}.node-container:hover .selection-icon,:host([selected]) .node-container:hover .selection-icon,:host(:focus:not([disabled])) .node-container .selection-icon{opacity:1}:host([selected]) .node-container,:host([selected]) .node-container:hover{--calcite-internal-tree-item-text-color: var(--calcite-tree-text-color-selected, var(--calcite-color-text-1));font-weight:var(--calcite-font-weight-medium);color:var(--calcite-internal-tree-item-text-color)}:host([selected]) .node-container .icon-start,:host([selected]) .node-container:hover .icon-start{--calcite-icon-color: var(--calcite-internal-tree-item-text-color)}:host([selected]) .node-container .selection-icon,:host([selected]) .node-container:hover .selection-icon{opacity:1;color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([has-children]) .node-container .selection-icon{display:none}.chevron{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;align-self:center;color:var(--calcite-color-text-3);flex:0 0 auto;transform:rotate(0)}.calcite--rtl .chevron{transform:rotate(180deg)}.item--expanded .node-container>.chevron{transform:rotate(90deg)}:host([selected]) .selection-icon{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([selected]) .checkbox{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([has-children][indeterminate]) .checkbox{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([hidden]){display:none}[hidden]{display:none}`;
class F extends y {
  constructor() {
    super(), this.actionSlotWrapperRef = T(), this.childTree = null, this.direction = M(), this.isSelectionMultiLike = !1, this.userChangedValue = !1, this.interactiveContainer = H(this), this.hasEndActions = !1, this.updateAfterInitialRender = !1, this.depth = -1, this.disabled = !1, this.expanded = !1, this.indeterminate = !1, this.lines = !1, this.parentExpanded = !1, this.selected = !1, this.calciteInternalTreeItemSelect = r({ cancelable: !1 }), this.calciteTreeItemCollapse = r({ cancelable: !1 }), this.calciteTreeItemExpand = r({ cancelable: !1 }), this.calciteTreeItemSelect = r({ cancelable: !1 }), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasEndActions: 16, updateAfterInitialRender: 16, depth: 11, disabled: 7, expanded: 7, hasChildren: 39, iconFlipRtl: 3, iconStart: 3, indeterminate: 7, label: 1, lines: 7, parentExpanded: 5, scale: 3, selected: 7, selectionMode: 3 };
  }
  static {
    this.styles = U;
  }
  get hasChildren() {
    return !!this.childTree;
  }
  connectedCallback() {
    super.connectedCallback(), this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item") ?? void 0;
  }
  load() {
    requestAnimationFrame(() => this.updateAfterInitialRender = !0);
  }
  willUpdate(e) {
    this.preWillUpdate(), e.has("expanded") && ((this.hasUpdated || this.expanded !== !1) && this.updateChildTree(), this.hasUpdated && (this.expanded ? this.calciteTreeItemExpand.emit() : this.calciteTreeItemCollapse.emit())), e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.handleSelectedChange(this.selected), e.has("selectionMode") && this.getSelectionMode();
  }
  loaded() {
    this.updateAncestorTree();
  }
  handleSelectedChange(e) {
    this.selectionMode === "ancestors" && !this.userChangedValue && (e && (this.indeterminate = !1), this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: !0,
      updateItem: !1
    })), this.userChangedValue && (this.calciteTreeItemSelect.emit(), this.userChangedValue = !1);
  }
  getSelectionMode() {
    this.isSelectionMultiLike = this.selectionMode === "multiple" || this.selectionMode === "multichildren";
  }
  onClick(e) {
    if (this.disabled || this.isActionEndEvent(e))
      return;
    const [t] = A(this.el, "a");
    if (t && e.composedPath()[0].tagName.toLowerCase() !== "a") {
      const a = t.target === "" ? "_self" : t.target;
      window.open(t.href, a);
    }
    this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: this.selectionMode === "ancestors" || this.isSelectionMultiLike,
      updateItem: !0
    }), this.userChangedValue = !0;
  }
  iconClickHandler(e) {
    e.stopPropagation(), this.expanded = !this.expanded;
  }
  childrenClickHandler(e) {
    e.stopPropagation();
  }
  keyDownHandler(e) {
    if (!(this.isActionEndEvent(e) || e.defaultPrevented))
      switch (e.key) {
        case " ":
          this.userChangedValue = !0, this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            updateItem: !0
          }), e.preventDefault();
          break;
        case "Enter": {
          const t = Array.from(this.el.children).find((a) => a.matches("a"));
          this.userChangedValue = !0, t ? (t.click(), this.selected = !0) : this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            updateItem: !0
          }), e.preventDefault();
        }
      }
  }
  updateChildTree() {
    const { childTree: e } = this;
    e && (e.parentExpanded = this.expanded);
  }
  handleChildrenSlotChange(e) {
    const t = z(e).find(P) ?? null;
    this.childTree = t, this.requestUpdate("hasChildren"), this.updateChildTree();
  }
  isActionEndEvent(e) {
    return e.composedPath().includes(this.actionSlotWrapperRef.value);
  }
  updateAncestorTree() {
    const e = this.parentTreeItem;
    if (!(this.selectionMode !== "ancestors" || !e)) {
      if (this.selected) {
        const t = this.el.parentElement;
        if (!t)
          return;
        const a = Array.from(t.children), s = a.filter((o) => o.selected);
        a.length === s.length ? (e.selected = !0, e.indeterminate = !1) : s.length > 0 && (e.indeterminate = !0), Array.from(this.el.querySelectorAll("calcite-tree-item:not([disabled])")).forEach((o) => {
          o.selected = !0, o.indeterminate = !1;
        });
      } else if (this.indeterminate) {
        const t = this.parentTreeItem;
        t.indeterminate = !0;
      }
    }
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = L(e);
  }
  preWillUpdate() {
    this.depth = 0;
    let e = this.el.closest("calcite-tree");
    if (!e)
      return;
    this.selectionMode = e.selectionMode, this.scale = e.scale || "m", this.lines = e.lines;
    let t;
    for (; e && (t = e.parentElement?.closest("calcite-tree") ?? null, t !== e); )
      e = t, this.depth = this.depth + 1;
  }
  getSelectionIcon() {
    const { selectionMode: e, hasChildren: t } = this;
    return e === "single" || e === "children" || e === "single-persist" ? l.bulletPoint : e === "multiple" || e === "multichildren" ? l.checkmark : e === "none" && !t ? l.blank : null;
  }
  render() {
    const e = this.direction === "rtl", t = this.getSelectionIcon(), a = this.hasChildren && this.indeterminate, s = this.hasChildren || this.selectionMode === "ancestors" ? c`<calcite-icon class=${i({
      [n.chevron]: !0,
      [d.rtl]: e
    })} .icon=${this.hasChildren ? l.chevronRight : l.blank} @click=${this.iconClickHandler} .scale=${h(this.scale)}></calcite-icon>` : null, p = f("default-slot", c`<slot></slot>`), o = this.selectionMode === "ancestors" ? c`<div class=${i(n.checkboxContainer)}><calcite-icon class=${i(n.checkbox)} .icon=${this.selected ? l.checkSquareF : a ? l.minusSquareF : l.square} .scale=${h(this.scale)}></calcite-icon></div>` : null, g = t ? c`<calcite-icon class=${i({
      [n.selectionIcon]: !0,
      [d.rtl]: e
    })} .icon=${t} .scale=${h(this.scale)}></calcite-icon>` : null, v = !(this.parentExpanded || this.depth === 1), u = this.updateAfterInitialRender && this.expanded, { hasEndActions: x } = this, k = f("actionsEndSlot", c`<slot name=${b.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot>`), C = c`<calcite-icon class=${i(n.iconStart)} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${h(this.scale)}></calcite-icon>`;
    return this.el.ariaChecked = this.selectionMode === "multiple" || this.selectionMode === "multichildren" || this.selectionMode === "ancestors" ? m(this.selected) : null, this.el.ariaExpanded = this.hasChildren ? m(u) : null, this.el.inert = v, this.el.ariaLive = "polite", this.el.ariaSelected = this.selectionMode === "single" || this.selectionMode === "children" || this.selectionMode === "single-persist" ? m(this.selected) : null, this.el.role = "treeitem", I(this.el, "tabIndex", this.disabled ? -1 : 0), this.interactiveContainer({ disabled: this.disabled, children: c`<div class=${i({ [n.itemExpanded]: u })}><div class=${i(n.nodeAndActionsContainer)}><div class=${i({
      [n.nodeContainer]: !0,
      [d.rtl]: e
    })} data-selection-mode=${this.selectionMode ?? $}>${s}${g}${o || null}${this.iconStart ? C : null}${o ? c`<label class=${i(n.checkboxLabel)}>${p}</label>` : p}</div><div class=${i(n.actionsEnd)} .hidden=${!x} ${w(this.actionSlotWrapperRef)}>${k}</div></div><div class=${i({
      [n.childrenContainer]: !0,
      [d.rtl]: e
    })} @click=${this.childrenClickHandler} .role=${this.hasChildren ? "group" : void 0}><slot name=${b.children} @slotchange=${this.handleChildrenSlotChange}></slot></div></div>` });
  }
}
E("calcite-tree-item", F);
export {
  F as TreeItem
};
