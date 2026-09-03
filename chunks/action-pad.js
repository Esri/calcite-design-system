/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as x, c as n, l as f, s as l, b as r, d as v } from "./index.js";
import { u as y } from "./index2.js";
import { b as A, d as i } from "./dom.js";
import { l as k, E } from "./ExpandToggle.js";
import { c as T } from "./observers.js";
import { u as w } from "./useT9n.js";
import { i as S } from "./resources5.js";
import { i as G } from "./resources.js";
import { u as O } from "./useSetFocus.js";
const d = {
  actionGroupEnd: "action-group--end",
  container: "container"
}, C = {
  expandTooltip: "expand-tooltip"
}, D = b`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-pad-gap: var(--calcite-action-pad-items-space, var(--calcite-spacing-xxs));--calcite-internal-action-pad-padding: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-pad-gap: var(--calcite-action-pad-items-space, var(--calcite-spacing-sm));--calcite-internal-action-pad-padding: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-pad-gap: var(--calcite-action-pad-items-space, var(--calcite-space-sm-plus));--calcite-internal-action-pad-padding: var(--calcite-spacing-sm-plus)}:host{display:block}@keyframes in{0%{opacity:0}to{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-action-pad-corner-radius, .125rem);background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width, auto)}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:1px;padding-block-end:var(--calcite-internal-action-pad-padding)}.container{display:inline-flex;flex-direction:column;overflow:hidden;box-shadow:var(--calcite-shadow-md);border-radius:calc(var(--calcite-action-pad-corner-radius, .125rem) * 2);background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));gap:var(--calcite-internal-action-pad-gap);padding:var(--calcite-internal-action-pad-padding)}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:1px;padding-inline-end:var(--calcite-internal-action-pad-padding)}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends x {
  constructor() {
    super(), this.actions = [], this.direction = y(), this.mutationObserver = T("mutation", () => this.mutationObserverHandler()), this.toggleExpand = () => {
      this.expanded = !this.expanded, this.calciteActionPadToggle.emit();
    }, this.messages = w({ blocking: !0 }), this.focusSetter = O()(this), this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionPadCollapse = n({ cancelable: !1 }), this.calciteActionPadExpand = n({ cancelable: !1 }), this.calciteActionPadToggle = n({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler), this.listen("keydown", this.handleKeyDown);
  }
  static {
    this.properties = { expandTooltip: 16, actionsEndGroupLabel: 1, expandDisabled: 7, expanded: 7, layout: 3, messageOverrides: 0, overlayPositioning: 3, position: 3, scale: 3, selectionAppearance: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = D;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.updateActions(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  async load() {
    f.deprecated("component", {
      component: this,
      name: "action-pad",
      removalVersion: 5,
      suggested: "action-bar"
    });
  }
  willUpdate(t) {
    t.has("expanded") && this.hasUpdated && k({ el: this.el, expanded: this.expanded }), t.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups(), t.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionPadExpand.emit() : this.calciteActionPadCollapse.emit()), t.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  actionMenuOpenHandler(t) {
    if (t.target.menuOpen) {
      const e = t.composedPath();
      this.actionGroups?.forEach((a) => {
        e.includes(a) || (a.menuOpen = !1);
      });
    }
  }
  updateGroups() {
    const t = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = t, this.setGroupLayout(t);
  }
  setGroupLayout(t) {
    t.forEach((e) => e.layout = this.layout);
  }
  handleDefaultSlotChange() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  handleTooltipSlotChange(t) {
    const e = A(t).filter(S);
    this.expandTooltip = e[0];
  }
  handleKeyDown(t) {
    this.queryAndStoreActions();
    const e = this.actions.filter((o) => !o.disabled), a = document.activeElement;
    if (!(!G(a) || !e.includes(a)))
      switch (t.key) {
        case "ArrowRight":
        case "ArrowDown":
          i(e, a, "next", !0), t.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          i(e, a, "previous", !0), t.preventDefault();
          break;
        case "Home":
          i(e, a, "first", !0), t.preventDefault();
          break;
        case "End":
          i(e, a, "last", !0), t.preventDefault();
          break;
        case "Tab":
          this.updateTabIndexOfItems(a);
          break;
      }
  }
  updateActions() {
    this.actions.forEach((t) => {
      t.selectionAppearance = this.selectionAppearance;
    });
  }
  updateTabIndexOfItems(t) {
    this.actions.forEach((e) => {
      const a = !e.disabled && e === t ? 0 : -1;
      a === 0 ? e.removeAttribute("tabindex") : e.tabIndex = a;
    });
  }
  queryAndStoreActions() {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }
  mutationObserverHandler() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  renderBottomActionGroup() {
    const { expanded: t, expandDisabled: e, messages: a, el: o, position: p, toggleExpand: u, scale: s, layout: h, actionsEndGroupLabel: g, overlayPositioning: m } = this, c = e ? null : E({ collapseLabel: a.collapseLabel, collapseText: a.collapse, direction: this.direction, el: o, expanded: t, expandLabel: a.expandLabel, expandText: a.expand, position: p, scale: s, toggle: u, tooltip: this.expandTooltip });
    return c ? r`<calcite-action-group class=${l(d.actionGroupEnd)} .label=${g} .layout=${h} .overlayPositioning=${m} .scale=${s}><slot name=${C.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${c}</calcite-action-group>` : null;
  }
  render() {
    return r`<div class=${l(d.container)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
}
v("calcite-action-pad", L);
export {
  L as ActionPad
};
