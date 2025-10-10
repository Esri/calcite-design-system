import { b as E, L as $, c as d, s as n, C as h, x as a, A as M, E as T, q as w } from "./index.js";
import { i as g } from "./keyed.js";
import { e as A, n as z } from "./ref.js";
import { F as P, d as q, s as R, a as L, t as u } from "./dom.js";
import { u as H, I as F } from "./interactive.js";
import { g as p } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  actionsEnd: "actions-end",
  bulletPointIcon: "bullet-point",
  checkbox: "checkbox",
  checkboxContainer: "checkbox-container",
  checkboxLabel: "checkbox-label",
  checkmarkIcon: "checkmark",
  chevron: "chevron",
  childrenContainer: "children-container",
  iconStart: "icon-start",
  itemExpanded: "item--expanded",
  nodeAndActionsContainer: "node-actions-container",
  nodeContainer: "node-container"
}, x = {
  actionsEnd: "actions-end",
  children: "children"
}, c = {
  blank: "blank",
  bulletPoint: "bullet-point",
  checkmark: "check",
  checkSquareF: "check-square-f",
  chevronRight: "chevron-right",
  minusSquareF: "minus-square-f",
  square: "square"
}, U = E`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-internal-tree-item-spacing-unit: .25rem;--calcite-internal-tree-item-padding-block: .25rem;--calcite-internal-tree-item-children-container-padding: 1.25rem;--calcite-internal-tree-item-line-left-position: .75rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-tree-item-spacing-unit: .5rem;--calcite-internal-tree-item-padding-block: .5rem;--calcite-internal-tree-item-children-container-padding: 1.5rem;--calcite-internal-tree-item-line-left-position: 1rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-tree-item-spacing-unit: .75rem;--calcite-internal-tree-item-padding-block: .625rem;--calcite-internal-tree-item-children-container-padding: 2.25rem;--calcite-internal-tree-item-line-left-position: 1.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{display:block;max-inline-size:100%;cursor:pointer}:host .children-container ::slotted(*){padding-inline-start:var(--calcite-internal-tree-item-children-container-padding)}.node-actions-container{display:flex}.node-actions-container .node-container,.node-actions-container .checkbox-container{gap:var(--calcite-internal-tree-item-spacing-unit)}.node-actions-container .node-container{padding-inline:var(--calcite-internal-tree-item-spacing-unit);padding-block:var(--calcite-internal-tree-item-padding-block)}.node-actions-container{color:var(--calcite-tree-text-color, var(--calcite-color-text-3))}:host([calcite-hydrated-hidden]){visibility:hidden!important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([lines]) .children-container:after{position:absolute;inset-block-start:0px;z-index:var(--calcite-z-index);inline-size:1px;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;block-size:100%;inset-inline-start:var(--calcite-internal-tree-item-line-left-position);content:"";background-color:var(--calcite-color-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none!important}::slotted(*):hover{text-decoration:none!important}::slotted(a){inline-size:100%;text-decoration-line:none}:host{outline:2px solid transparent;outline-offset:2px}:host .node-container{outline-color:transparent}:host:focus .node-container,:host:active .node-container{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus:not([disabled])) .node-container{outline:2px solid transparent;outline-offset:2px;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus:not([disabled])) .checkbox{outline:2px solid transparent;outline-offset:2px}.actions-end{display:flex;flex-direction:row;align-items:center;align-self:stretch}.checkbox-container{display:flex;align-items:center}.checkbox{line-height:0;color:var(--calcite-tree-selected-icon-color, var(--calcite-color-border-input))}.checkbox-label{pointer-events:none;display:flex;align-items:center}.children-container{position:relative;block-size:0px;transform-origin:top;overflow:hidden;opacity:0;transform:scaleY(0);transition:var(--calcite-animation-timing) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-animation-timing) cubic-bezier(.215,.44,.42,.88),all var(--calcite-animation-timing) ease-in-out}.item--expanded>.children-container{overflow:visible;opacity:1;transform:none;block-size:auto}.node-container{position:relative;display:flex;min-inline-size:0px;flex-grow:1;align-items:center}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-color-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected]) .node-container,:host([selected]) .node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-tree-text-color-selected, var(--calcite-color-text-1))}:host([selected]) .node-container .bullet-point,:host([selected]) .node-container .checkmark,:host([selected]) .node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark{opacity:1;color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([has-children]) .node-container .bullet-point,:host([has-children]) .node-container .checkmark{display:none}.chevron{position:relative;align-self:center;color:var(--calcite-color-text-3);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;flex:0 0 auto;transform:rotate(0)}.calcite--rtl .chevron{transform:rotate(180deg)}.item--expanded .node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([selected]) .checkbox{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([has-children][indeterminate]) .checkbox{color:var(--calcite-tree-selected-icon-color, var(--calcite-color-brand))}:host([hidden]){display:none}[hidden]{display:none}`;
class V extends $ {
  constructor() {
    super(), this.actionSlotWrapperRef = A(), this.userChangedValue = !1, this.hasEndActions = !1, this.updateAfterInitialRender = !1, this.depth = -1, this.disabled = !1, this.expanded = !1, this.indeterminate = !1, this.parentExpanded = !1, this.selected = !1, this.calciteInternalTreeItemSelect = d({ cancelable: !1 }), this.calciteTreeItemCollapse = d({ cancelable: !1 }), this.calciteTreeItemExpand = d({ cancelable: !1 }), this.calciteTreeItemSelect = d({ cancelable: !1 }), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasEndActions: 16, updateAfterInitialRender: 16, depth: 11, disabled: 7, expanded: 7, hasChildren: 39, iconFlipRtl: 3, iconStart: [3, { type: String }], indeterminate: 7, label: 1, lines: 7, parentExpanded: 5, scale: 3, selected: 7, selectionMode: 3 };
  }
  static {
    this.styles = U;
  }
  get hasChildren() {
    return !!this.childTree;
  }
  connectedCallback() {
    super.connectedCallback(), this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
  }
  load() {
    requestAnimationFrame(() => this.updateAfterInitialRender = !0);
  }
  willUpdate(e) {
    this.preWillUpdate(), e.has("expanded") && ((this.hasUpdated || this.expanded !== !1) && this.updateChildTree(), this.hasUpdated && (this.expanded ? this.calciteTreeItemExpand.emit() : this.calciteTreeItemCollapse.emit())), e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.handleSelectedChange(this.selected), e.has("selectionMode") && this.getSelectionMode();
  }
  updated() {
    H(this);
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
    const [t] = P(this.el, "a");
    if (t && e.composedPath()[0].tagName.toLowerCase() !== "a") {
      const o = t.target === "" ? "_self" : t.target;
      window.open(t.href, o);
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
          const t = Array.from(this.el.children).find((o) => o.matches("a"));
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
    const t = q(e).filter((o) => o.matches("calcite-tree"))[0];
    this.childTree = t, this.requestUpdate("hasChildren"), this.updateChildTree();
  }
  isActionEndEvent(e) {
    return e.composedPath().includes(this.actionSlotWrapperRef.value);
  }
  updateAncestorTree() {
    const e = this.parentTreeItem;
    if (!(this.selectionMode !== "ancestors" || !e)) {
      if (this.selected) {
        const t = this.el.parentElement, o = Array.from(t?.children), s = o.filter((l) => l.selected);
        o.length === s.length ? (e.selected = !0, e.indeterminate = !1) : s.length > 0 && (e.indeterminate = !0), Array.from(this.el.querySelectorAll("calcite-tree-item:not([disabled])")).forEach((l) => {
          l.selected = !0, l.indeterminate = !1;
        });
      } else if (this.indeterminate) {
        const t = this.parentTreeItem;
        t.indeterminate = !0;
      }
    }
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = R(e);
  }
  preWillUpdate() {
    this.depth = 0;
    let e = this.el.closest("calcite-tree");
    if (!e)
      return;
    this.selectionMode = e.selectionMode, this.scale = e.scale || "m", this.lines = e.lines;
    let t;
    for (; e && (t = e.parentElement?.closest("calcite-tree"), t !== e); )
      e = t, this.depth = this.depth + 1;
  }
  render() {
    const e = L(this.el) === "rtl", t = this.selectionMode === "single" || this.selectionMode === "children" || this.selectionMode === "single-persist", o = this.selectionMode === "multiple" || this.selectionMode === "multichildren", s = this.selectionMode === "none" && !this.hasChildren, f = this.hasChildren && this.indeterminate, l = this.hasChildren || this.selectionMode === "ancestors" ? a`<calcite-icon class=${n({
      [i.chevron]: !0,
      [h.rtl]: e
    })} data-test-id=icon .icon=${this.hasChildren ? c.chevronRight : c.blank} @click=${this.iconClickHandler} .scale=${p(this.scale)}></calcite-icon>` : null, b = g("default-slot", a`<slot></slot>`), m = this.selectionMode === "ancestors" ? a`<div class=${n(i.checkboxContainer)}><calcite-icon class=${n(i.checkbox)} .icon=${this.selected ? c.checkSquareF : f ? c.minusSquareF : c.square} .scale=${p(this.scale)}></calcite-icon></div>` : null, r = t ? c.bulletPoint : o ? c.checkmark : s ? c.blank : null, C = r ? a`<calcite-icon class=${n({
      [i.bulletPointIcon]: r === c.bulletPoint,
      [i.checkmarkIcon]: r === c.checkmark,
      [h.rtl]: e
    })} .icon=${r} .scale=${p(this.scale)}></calcite-icon>` : null, k = !(this.parentExpanded || this.depth === 1), v = this.updateAfterInitialRender && this.expanded, { hasEndActions: S } = this, I = g("actionsEndSlot", a`<slot name=${x.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot>`), y = a`<calcite-icon class=${n(i.iconStart)} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${p(this.scale)}></calcite-icon>`;
    return this.el.ariaChecked = this.selectionMode === "multiple" || this.selectionMode === "multichildren" || this.selectionMode === "ancestors" ? u(this.selected) : void 0, this.el.ariaExpanded = this.hasChildren ? u(v) : void 0, this.el.inert = k, this.el.ariaLive = "polite", this.el.ariaSelected = this.selectionMode === "single" || this.selectionMode === "children" || this.selectionMode === "single-persist" ? u(this.selected) : void 0, this.el.toggleAttribute("calcite-hydrated-hidden", k), this.el.role = "treeitem", M(this.el, "tabIndex", this.disabled ? -1 : 0), F({ disabled: this.disabled, children: a`<div class=${n({ [i.itemExpanded]: v })}><div class=${n(i.nodeAndActionsContainer)}><div class=${n({
      [i.nodeContainer]: !0,
      [h.rtl]: e
    })} data-selection-mode=${this.selectionMode ?? T}>${l}${C}${m || null}${this.iconStart ? y : null}${m ? a`<label class=${n(i.checkboxLabel)}>${b}</label>` : b}</div><div class=${n(i.actionsEnd)} .hidden=${!S} ${z(this.actionSlotWrapperRef)}>${I}</div></div><div class=${n({
      [i.childrenContainer]: !0,
      [h.rtl]: e
    })} data-test-id=calcite-tree-children @click=${this.childrenClickHandler} .role=${this.hasChildren ? "group" : void 0}><slot name=${x.children} @slotchange=${this.handleChildrenSlotChange}></slot></div></div>` });
  }
}
w("calcite-tree-item", V);
export {
  V as TreeItem
};
