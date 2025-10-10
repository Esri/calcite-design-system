import { b as h, L as m, c as n, x as s, s as g, q as f } from "./index.js";
import { S as i } from "./resources3.js";
import { s as x } from "./dom.js";
import { u as b } from "./useT9n.js";
import { u as $ } from "./useSetFocus.js";
import { I as v, S as c, C as y } from "./resources.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const A = h`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:flex;flex-direction:column;padding:0;background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0}.container{display:flex;flex-grow:1;flex-direction:column}:host([columns="1"]){--calcite-internal-action-group-columns: 1}:host([columns="2"]){--calcite-internal-action-group-columns: 2}:host([columns="3"]){--calcite-internal-action-group-columns: 3}:host([columns="4"]){--calcite-internal-action-group-columns: 4}:host([columns="5"]){--calcite-internal-action-group-columns: 5}:host([columns="6"]){--calcite-internal-action-group-columns: 6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)),auto);gap:var(--calcite-action-group-gap, 1px);padding:var(--calcite-action-group-gap, 1px)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-inline-end:var(--calcite-size-px)}:host([hidden]){display:none}[hidden]{display:none}`;
class S extends m {
  constructor() {
    super(...arguments), this.messages = b(), this.focusSetter = $()(this), this.hasMenuActions = !1, this.expanded = !1, this.layout = "vertical", this.menuOpen = !1, this.overlayPositioning = "absolute", this.scale = "m", this.calciteActionGroupCollapse = n({ cancelable: !1 }), this.calciteActionGroupExpand = n({ cancelable: !1 });
  }
  static {
    this.properties = { hasMenuActions: 16, columns: 11, expanded: 7, label: 1, layout: 3, menuFlipPlacements: 0, menuOpen: 7, menuPlacement: 3, messageOverrides: 0, overlayPositioning: 3, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = A;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  willUpdate(t) {
    t.has("expanded") && ((this.hasUpdated || this.expanded !== !1) && (this.menuOpen = !1), this.hasUpdated && (this.expanded ? this.calciteActionGroupExpand.emit() : this.calciteActionGroupCollapse.emit()));
  }
  setMenuOpen(t) {
    this.menuOpen = !!t.currentTarget.open;
  }
  handleMenuActionsSlotChange(t) {
    this.hasMenuActions = x(t);
  }
  renderMenu() {
    const { expanded: t, menuOpen: l, scale: e, layout: o, messages: a, overlayPositioning: r, hasMenuActions: u, menuFlipPlacements: p, menuPlacement: d } = this;
    return s`<calcite-action-menu .expanded=${t} .flipPlacements=${p ?? (o === "horizontal" ? ["top", "bottom"] : ["left", "right"])} .hidden=${!u} .label=${a.more} @calciteActionMenuOpen=${this.setMenuOpen} .open=${l} .overlayPositioning=${r} .placement=${d ?? (o === "horizontal" ? "bottom-start" : "leading-start")} .scale=${e}><calcite-action .aria=${{ expanded: t }} .icon=${v.menu} .scale=${e} slot=${i.trigger} .text=${a.more} .textEnabled=${t}></calcite-action><slot name=${c.menuActions} @slotchange=${this.handleMenuActionsSlotChange}></slot><slot name=${c.menuTooltip} slot=${i.tooltip}></slot></calcite-action-menu>`;
  }
  render() {
    return s`<div .ariaLabel=${this.label} class=${g(y.container)} role=group><slot></slot>${this.renderMenu()}</div>`;
  }
}
f("calcite-action-group", S);
export {
  S as ActionGroup
};
