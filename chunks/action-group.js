/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as f, L as A, c as a, b as n, s as b, d as v } from "./index.js";
import { e as c, n as l } from "./ref.js";
import { S as r } from "./resources4.js";
import { a as h, s as y } from "./dom.js";
import { u as S } from "./useT9n.js";
import { i as x } from "./resources.js";
import { u as $ } from "./useSetFocus.js";
import { I as M, S as d, C } from "./resources3.js";
const E = f`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-group-gap: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-group-gap: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-group-gap: var(--calcite-spacing-sm-plus)}:host{display:flex;flex-direction:column;padding:0;background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0;gap:var(--calcite-internal-action-group-gap)}.container{display:flex;flex-grow:1;flex-direction:column;gap:inherit}:host([columns="1"]){--calcite-internal-action-group-columns: 1}:host([columns="2"]){--calcite-internal-action-group-columns: 2}:host([columns="3"]){--calcite-internal-action-group-columns: 3}:host([columns="4"]){--calcite-internal-action-group-columns: 4}:host([columns="5"]){--calcite-internal-action-group-columns: 5}:host([columns="6"]){--calcite-internal-action-group-columns: 6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;gap:var(--calcite-action-group-gap, var(--calcite-internal-action-group-gap));grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)),auto);padding:var(--calcite-action-group-gap, 1px)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-inline-end:var(--calcite-size-px)}:host([hidden]){display:none}[hidden]{display:none}`;
class O extends A {
  constructor() {
    super(), this.messages = S(), this._actions = [], this.focusSetter = $()(this), this.defaultSlotRef = c(), this.menuActionsSlotRef = c(), this.hasMenuActions = !1, this.expanded = !1, this.layout = "vertical", this.menuOpen = !1, this.overlayPositioning = "absolute", this.overflowActionsDisabled = !1, this.scale = "m", this.selectionMode = "none", this.topLayerDisabled = !1, this.selectedActions = [], this.calciteActionGroupCollapse = a({ cancelable: !1 }), this.calciteActionGroupExpand = a({ cancelable: !1 }), this.calciteActionGroupChange = a({ cancelable: !1 }), this.calciteInternalActionGroupActionsChange = a({ cancelable: !1 }), this.listen("click", this.handleActionClick);
  }
  static {
    this.properties = { hasMenuActions: 16, columns: 11, expanded: 7, label: 1, layout: 3, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, overflowActionsDisabled: 7, scale: 3, selectionMode: 3, topLayerDisabled: 7, actions: 32, selectedActions: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = E;
  }
  get actions() {
    return this._actions;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  willUpdate(t) {
    (this.hasUpdated || t.has("selectionMode")) && this.syncSelectionState(), t.has("expanded") && ((this.hasUpdated || this.expanded !== !1) && (this.menuOpen = !1), this.hasUpdated && (this.expanded ? this.calciteActionGroupExpand.emit() : this.calciteActionGroupCollapse.emit()));
  }
  setActiveAction(t, e) {
    const s = !e.active;
    switch (this.selectionMode) {
      case "multiple":
        this.updateAction(e, s);
        break;
      case "single":
        this.actions.forEach((i, o) => this.updateAction(i, o === t && s));
        break;
      case "single-persist":
        this.actions[t].active || (this.actions.forEach((i, o) => this.updateAction(i, o === t)), this.updateSelectedActions([e]), this.calciteActionGroupChange.emit());
        return;
      default:
        return;
    }
    this.updateSelectedActions(this.actions.filter((i) => i.active)), this.calciteActionGroupChange.emit();
  }
  setMenuOpen(t) {
    this.menuOpen = !!t.currentTarget.open;
  }
  syncSelectionState() {
    if (this.selectionMode !== "none" ? this.setRoleOnActions() : this.clearActionAriaAttributes(), this.selectionMode === "single" || this.selectionMode === "single-persist") {
      const t = this.actions.filter((e) => e.active);
      t.length > 1 && this.actions.forEach((e) => this.updateAction(e, e === t.at(-1)));
    }
    this.updateSelectedActions(this.selectionMode === "none" ? [] : this.actions.filter((t) => t.active));
  }
  syncActions() {
    const t = this.defaultSlotRef.value ? h(this.defaultSlotRef.value, "calcite-action") : [], e = this.menuActionsSlotRef.value ? h(this.menuActionsSlotRef.value, "calcite-action") : [];
    this._actions = [...t, ...e], this.syncSelectionState();
  }
  syncActionsAndEmitChange() {
    this.syncActions(), this.calciteInternalActionGroupActionsChange.emit();
  }
  handleDefaultSlotChange() {
    this.syncActionsAndEmitChange();
  }
  handleMenuActionsSlotChange(t) {
    this.hasMenuActions = y(t), this.syncActionsAndEmitChange();
  }
  handleActionClick(t) {
    const e = t.composedPath().find(x);
    if (!e || e.disabled)
      return;
    const s = this.actions.indexOf(e);
    s === -1 || this.selectionMode === "none" || this.setActiveAction(s, e);
  }
  setRoleOnActions() {
    this.actions.forEach((t) => {
      t.aria = {
        ...t.aria,
        role: this.selectionMode === "single" || this.selectionMode === "single-persist" ? "radio" : "checkbox"
      }, this.setActionAriaChecked(t, t.active);
    });
  }
  setActionAriaChecked(t, e) {
    t.aria = {
      ...t.aria,
      checked: e ? "true" : "false"
    };
  }
  clearActionAriaAttributes() {
    this.selectionMode === "none" && this.actions.forEach((t) => {
      t.aria && (t.aria.checked = void 0, t.aria.role = void 0, t.aria = { ...t.aria });
    });
  }
  updateAction(t, e) {
    t.active = e, this.setActionAriaChecked(t, e);
  }
  updateSelectedActions(t) {
    const e = this.selectedActions;
    e.length === t.length && e.every((i, o) => i === t[o]) || (this.selectedActions = t);
  }
  renderMenu() {
    const { expanded: t, menuOpen: e, scale: s, layout: i, messages: o, overlayPositioning: u, hasMenuActions: p, menuFlipPlacements: m, menuPlacement: g } = this;
    return n`<calcite-action-menu .expanded=${t} .flipPlacements=${m ?? (i === "horizontal" ? ["top", "bottom"] : ["left", "right"])} .hidden=${!p} .label=${o.more} @calciteActionMenuOpen=${this.setMenuOpen} .open=${e} .overlayPositioning=${u} .placement=${g ?? (i === "horizontal" ? "bottom-start" : "leading-start")} .scale=${s} .topLayerDisabled=${this.topLayerDisabled}><calcite-action .aria=${{ expanded: t }} .icon=${M.menu} .scale=${s} slot=${r.trigger} .text=${o.more} .textEnabled=${t}></calcite-action><slot name=${d.menuActions} @slotchange=${this.handleMenuActionsSlotChange} ${l(this.menuActionsSlotRef)}></slot><slot name=${d.menuTooltip} slot=${r.tooltip}></slot></calcite-action-menu>`;
  }
  render() {
    return n`<div .ariaLabel=${this.label} class=${b(C.container)} .role=${this.selectionMode === "multiple" || this.selectionMode === "none" ? "group" : "radiogroup"}><slot @slotchange=${this.handleDefaultSlotChange} ${l(this.defaultSlotRef)}></slot>${this.renderMenu()}</div>`;
  }
}
v("calcite-action-group", O);
export {
  O as ActionGroup
};
