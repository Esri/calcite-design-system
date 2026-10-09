/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as x, c as n, l as f, s as l, b as r, d as v } from "./index.js";
import { u as y } from "./index2.js";
import { b as A, e as i } from "./dom.js";
import { l as k, E } from "./ExpandToggle.js";
import { c as T } from "./observers.js";
import { u as w } from "./useT9n.js";
import { i as G } from "./resources5.js";
import { i as O } from "./resources.js";
import { u as S } from "./useFocusable.js";
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
    }, this.messages = w({ blocking: !0 }), this.focusSetter = S()(this), this.expandDisabled = !1, this.expanded = !1, this.layout = "vertical", this.overlayPositioning = "absolute", this.scale = "m", this.selectionAppearance = "neutral", this.calciteActionPadCollapse = n({ cancelable: !1 }), this.calciteActionPadExpand = n({ cancelable: !1 }), this.calciteActionPadToggle = n({ cancelable: !1 }), this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler), this.listen("keydown", this.handleKeyDown);
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
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
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
  willUpdate(e) {
    e.has("expanded") && this.hasUpdated && k({ el: this.el, expanded: this.expanded }), e.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.updateGroups(), e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteActionPadExpand.emit() : this.calciteActionPadCollapse.emit()), e.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral") && this.updateActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  actionMenuOpenHandler(e) {
    if (e.target.menuOpen) {
      const t = e.composedPath();
      this.actionGroups?.forEach((a) => {
        t.includes(a) || (a.menuOpen = !1);
      });
    }
  }
  updateGroups() {
    const e = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = e, this.setGroupLayout(e);
  }
  setGroupLayout(e) {
    e.forEach((t) => t.layout = this.layout);
  }
  handleDefaultSlotChange() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  handleTooltipSlotChange(e) {
    const t = A(e).filter(G);
    this.expandTooltip = t[0];
  }
  handleKeyDown(e) {
    this.queryAndStoreActions();
    const t = this.actions.filter((o) => !o.disabled), a = document.activeElement;
    if (!(!O(a) || !t.includes(a)))
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          i(t, a, "next", !0), e.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          i(t, a, "previous", !0), e.preventDefault();
          break;
        case "Home":
          i(t, a, "first", !0), e.preventDefault();
          break;
        case "End":
          i(t, a, "last", !0), e.preventDefault();
          break;
        case "Tab":
          this.updateTabIndexOfItems(a);
          break;
      }
  }
  updateActions() {
    this.actions.forEach((e) => {
      e.selectionAppearance = this.selectionAppearance;
    });
  }
  updateTabIndexOfItems(e) {
    this.actions.forEach((t) => {
      const a = !t.disabled && t === e ? 0 : -1;
      a === 0 ? t.removeAttribute("tabindex") : t.tabIndex = a;
    });
  }
  queryAndStoreActions() {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }
  mutationObserverHandler() {
    this.updateGroups(), this.queryAndStoreActions(), this.updateActions();
  }
  renderBottomActionGroup() {
    const { expanded: e, expandDisabled: t, messages: a, el: o, position: p, toggleExpand: u, scale: s, layout: h, actionsEndGroupLabel: g, overlayPositioning: m } = this, c = t ? null : E({ collapseLabel: a.collapseLabel, collapseText: a.collapse, direction: this.direction, el: o, expanded: e, expandLabel: a.expandLabel, expandText: a.expand, position: p, scale: s, toggle: u, tooltip: this.expandTooltip });
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
