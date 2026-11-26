/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as f, L as v, c as n, b as l, s as b, d as S } from "./index.js";
import { e as r, n as c } from "./ref.js";
import { S as h } from "./resources5.js";
import { b as u, s as M } from "./dom.js";
import { u as y } from "./useT9n.js";
import { i as d } from "./resources.js";
import { u as x } from "./useFocusable.js";
import { I as $, S as p, C } from "./resources4.js";
const E = f`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size-relative-base)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-group-gap: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=m]){--calcite-internal-action-group-gap: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]){--calcite-internal-action-group-gap: var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus))}:host{display:flex;flex-direction:column;padding:var(--calcite-space-none);background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0;gap:var(--calcite-internal-action-group-gap)}.container{display:flex;flex-direction:column;flex-grow:1;gap:inherit}:host([columns="1"]){--calcite-internal-action-group-columns: 1}:host([columns="2"]){--calcite-internal-action-group-columns: 2}:host([columns="3"]){--calcite-internal-action-group-columns: 3}:host([columns="4"]){--calcite-internal-action-group-columns: 4}:host([columns="5"]){--calcite-internal-action-group-columns: 5}:host([columns="6"]){--calcite-internal-action-group-columns: 6}:host(:first-child){padding-block-start:var(--calcite-space-none)}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;gap:var(--calcite-action-group-gap, var(--calcite-internal-action-group-gap));grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)),auto);padding:var(--calcite-action-group-gap, 1px)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-inline-end:var(--calcite-size-px)}:host([hidden]){display:none}[hidden]{display:none}`;
class O extends v {
  constructor() {
    super(), this.messages = y(), this._actions = [], this.focusSetter = x()(this).setFocus, this.defaultSlotRef = r(), this.menuActionsSlotRef = r(), this.menuActions = [], this.setActionMenuEl = (e) => {
      this.actionMenu = e;
    }, this._overflowActionsDisabled = !1, this.hasMenuActions = !1, this.expanded = !1, this.layout = "vertical", this.menuOpen = !1, this.overlayPositioning = "absolute", this.scale = "m", this.selectionMode = "none", this.topLayerDisabled = !1, this.selectedActions = [], this.calciteActionGroupChange = n({ cancelable: !1 }), this.calciteActionGroupCollapse = n({ cancelable: !1 }), this.calciteActionGroupExpand = n({ cancelable: !1 }), this.calciteInternalActionGroupActionsChange = n({ cancelable: !1 }), this.listen("click", this.handleActionClick);
  }
  static {
    this.properties = { hasMenuActions: 16, columns: 11, expanded: 7, label: 1, layout: 3, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, overflowActionsDisabled: 7, scale: 3, selectionMode: 3, topLayerDisabled: 7, actions: 32, actionMenu: 0, selectedActions: 0 };
  }
  static {
    this.shadowRootOptions = {
      mode: "open",
      delegatesFocus: !0
    };
  }
  static {
    this.styles = E;
  }
  get overflowActionsDisabled() {
    return (this.selectionMode || "none") === "none" ? this._overflowActionsDisabled : !0;
  }
  set overflowActionsDisabled(e) {
    this._overflowActionsDisabled = e;
  }
  get actions() {
    return this._actions;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    (this.hasUpdated || e.has("selectionMode")) && this.syncSelectionState(), e.has("expanded") && ((this.hasUpdated || this.expanded !== !1) && (this.menuOpen = !1), this.hasUpdated && (this.expanded ? this.calciteActionGroupExpand.emit() : this.calciteActionGroupCollapse.emit()));
  }
  updated(e) {
    e.get("selectionMode") !== void 0 && this.updateComplete.then(() => this.calciteInternalActionGroupActionsChange.emit());
  }
  setActiveAction(e, t) {
    const i = this.getSelectableActions();
    if (this.selectionMode === "multiple") {
      const s = !t.active;
      this.updateAction(t, s), this.updateSelectedActions(i.filter((o) => o.active)), this.calciteActionGroupChange.emit();
      return;
    }
    if (this.selectionMode === "single") {
      const s = !t.active;
      i.forEach((o, a) => this.updateAction(o, a === e && s)), this.updateSelectedActions(i.filter((o) => o.active)), this.calciteActionGroupChange.emit();
      return;
    }
    if (this.selectionMode === "single-persist") {
      i[e].active || (i.forEach((s, o) => this.updateAction(s, o === e)), this.updateSelectedActions([t]), this.calciteActionGroupChange.emit());
      return;
    }
    this.updateSelectedActions(i.filter((s) => s.active)), this.calciteActionGroupChange.emit();
  }
  setMenuOpen(e) {
    this.menuOpen = !!e.currentTarget.open;
  }
  syncSelectionState() {
    const e = this.getSelectableActions();
    if (this.selectionMode !== "none" ? this.setRoleOnActions() : this.clearActionAriaAttributes(), this.selectionMode === "single" || this.selectionMode === "single-persist") {
      const t = e.filter((i) => i.active);
      t.length > 1 && e.forEach((i) => this.updateAction(i, i === t.at(-1)));
    }
    this.updateSelectedActions(this.selectionMode === "none" ? [] : e.filter((t) => t.active));
  }
  syncActions() {
    const e = this.defaultSlotRef.value ? u(this.defaultSlotRef.value, "calcite-action") : [], t = this.menuActionsSlotRef.value ? u(this.menuActionsSlotRef.value, "calcite-action") : [];
    this._actions = [...e, ...t], this.syncSelectionState();
  }
  syncActionsAndEmitChange() {
    this.syncActions(), this.calciteInternalActionGroupActionsChange.emit();
  }
  handleDefaultSlotChange() {
    this.syncActionsAndEmitChange();
  }
  handleMenuActionsSlotChange(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter((i) => d(i));
    this.menuActions = t, this.hasMenuActions = M(e), this.syncActionsAndEmitChange();
  }
  handleActionClick(e) {
    const t = e.composedPath().find(d);
    if (!t || t.disabled || this.menuActions.includes(t))
      return;
    const i = this.getSelectableActions().indexOf(t);
    i === -1 || this.selectionMode === "none" || this.setActiveAction(i, t);
  }
  setRoleOnActions() {
    this.getSelectableActions().forEach((e) => {
      e.aria = {
        ...e.aria,
        role: this.selectionMode === "single" || this.selectionMode === "single-persist" ? "radio" : "checkbox"
      }, this.setActionAriaChecked(e, e.active);
    });
  }
  getSelectableActions() {
    return this.actions.filter((e) => !this.menuActions.includes(e));
  }
  setActionAriaChecked(e, t) {
    e.aria = {
      ...e.aria,
      checked: t ? "true" : "false"
    };
  }
  clearActionAriaAttributes() {
    this.selectionMode === "none" && this.getSelectableActions().forEach((e) => {
      e.aria && (e.aria.checked = void 0, e.aria.role = void 0, e.aria = { ...e.aria });
    });
  }
  updateAction(e, t) {
    e.active = t, this.setActionAriaChecked(e, t);
  }
  updateSelectedActions(e) {
    const t = this.selectedActions;
    t.length === e.length && t.every((s, o) => s === e[o]) || (this.selectedActions = e);
  }
  renderMenu() {
    const { expanded: e, menuOpen: t, scale: i, layout: s, messages: o, overlayPositioning: a, hasMenuActions: m, menuFlipPlacements: g, menuPlacement: A } = this;
    return l`<calcite-action-menu .expanded=${e} .flipPlacements=${g ?? (s === "horizontal" ? ["top", "bottom"] : ["left", "right"])} .hidden=${!m} .label=${o.more} @calciteActionMenuOpen=${this.setMenuOpen} .open=${t} .overlayPositioning=${a} .placement=${A ?? (s === "horizontal" ? "bottom-start" : "leading-start")} .scale=${i} .topLayerDisabled=${this.topLayerDisabled} ${c(this.setActionMenuEl)}><calcite-action .aria=${{ expanded: t, hasPopup: "menu" }} .icon=${$.menu} .scale=${i} slot=${h.trigger} .text=${o.more} .textEnabled=${e}></calcite-action><slot name=${p.menuActions} @slotchange=${this.handleMenuActionsSlotChange} ${c(this.menuActionsSlotRef)}></slot><slot name=${p.menuTooltip} slot=${h.tooltip}></slot></calcite-action-menu>`;
  }
  render() {
    return l`<div .ariaLabel=${this.label} class=${b(C.container)} .role=${this.selectionMode === "multiple" || this.selectionMode === "none" ? "group" : "radiogroup"}><slot @slotchange=${this.handleDefaultSlotChange} ${c(this.defaultSlotRef)}></slot>${this.renderMenu()}</div>`;
  }
}
S("calcite-action-group", O);
export {
  O as ActionGroup
};
