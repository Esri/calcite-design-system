import { s as r, d as I, x as c, b as y, L as A, c as h, E as d, q as x } from "./index.js";
import { e as z, n as C } from "./ref.js";
import { b as o, d as P } from "./dom.js";
import { c as E } from "./observers.js";
import { g as w } from "./guid.js";
import { u as $ } from "./useT9n.js";
import { i as m } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const p = {
  actionIcon: "action-icon",
  actionContainer: "action-container",
  stepBarContainer: "step-bar-container",
  singleView: "single-view"
}, u = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right"
}, k = "calcite-stepper-action", B = {
  position: (l, e) => `${k}-${l}-${e ? "start" : "end"}`
}, n = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--active",
  stepBarComplete: "step-bar--complete",
  stepBarDisabled: "step-bar--disabled",
  stepBarError: "step-bar--error",
  stepBarInActive: "step-bar--inactive"
}, R = ({ disabled: l, active: e, complete: t, error: i }) => c`<svg class=${r({
  [n.stepBar]: !0
})}>${I`<rect class=${r({
  [n.stepBarActive]: e,
  [n.stepBarComplete]: t,
  [n.stepBarDisabled]: l,
  [n.stepBarError]: i,
  [n.stepBarInActive]: !0
})} width=100% x=0 y=0 />`}</svg>`, L = y`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([scale=s]){--calcite-internal-stepper-item-spacing-unit-s: .25rem;--calcite-internal-stepper-action-block-size: 2.75rem;--calcite-internal-stepper-action-inline-size: 2rem;--calcite-internal-step-bar-gap: .25rem}:host([scale=m]){--calcite-internal-stepper-item-spacing-unit-s: .5rem;--calcite-internal-stepper-action-block-size: 3.25rem;--calcite-internal-stepper-action-inline-size: 2.5rem}:host([scale=l]){--calcite-internal-stepper-item-spacing-unit-s: .75rem;--calcite-internal-stepper-action-block-size: 4rem;--calcite-internal-stepper-action-inline-size: 3rem;--calcite-internal-step-bar-gap: .75rem}:host{display:flex}.container{position:relative;display:flex;inline-size:100%;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]) .container{flex:1 1 auto;flex-direction:column}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:grid;grid-template-areas:"items" "content";gap:.5rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s))}:host([layout=horizontal][scale=s]) .container,:host([layout=horizontal-single][scale=s]) .container{gap:.25rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s))}:host([layout=horizontal][scale=l]) .container,:host([layout=horizontal-single][scale=l]) .container{gap:.75rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s))}:host([layout=horizontal]) .container.single-view{display:flex;grid-template-columns:none}.action-icon{position:relative;display:flex;flex-grow:0;block-size:var(--calcite-internal-stepper-action-block-size);inline-size:var(--calcite-internal-stepper-action-inline-size)}.action-container{position:absolute;display:flex;justify-content:space-between;padding-block:.25rem;inline-size:100%}.step-bar{display:flex;block-size:100%;inline-size:100%}.step-bar-container{position:absolute;display:flex;align-items:flex-start;justify-content:space-between;block-size:.125rem;inline-size:100%;gap:var(--calcite-stepper-bar-gap, var(--calcite-internal-step-bar-gap, .5rem))}.step-bar--inactive{fill:var(--calcite-stepper-bar-inactive-fill-color, var(--calcite-color-border-3, #dfdfdf));fill-opacity:1;block-size:100%}.step-bar--active{fill:var(--calcite-stepper-bar-active-fill-color, var(--calcite-color-brand))}.step-bar--complete{fill:var(--calcite-stepper-bar-complete-fill-color, var(--calcite-color-brand));fill-opacity:.5}.step-bar--error{fill:var(--calcite-stepper-bar-error-fill-color, var(--calcite-color-status-danger))}.step-bar--disabled{opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`;
class M extends A {
  constructor() {
    super(), this.containerRef = z(), this.enabledItems = [], this.guid = w(), this.itemMap = /* @__PURE__ */ new Map(), this.items = [], this.multipleViewMode = !1, this.mutationObserver = E("mutation", () => this.updateItems()), this.messages = $(), this.icon = !1, this.layout = "horizontal", this.numbered = !1, this.scale = "m", this.selectedItem = null, this.calciteInternalStepperItemChange = h({
      cancelable: !1
    }), this.calciteStepperChange = h({ cancelable: !1 }), this.calciteStepperItemChange = h({ cancelable: !1 }), this.listen("calciteInternalStepperItemKeyEvent", this.calciteInternalStepperItemKeyEvent), this.listen("calciteInternalStepperItemRegister", this.registerItem), this.listen("calciteInternalStepperItemSelect", this.updateItem), this.listen("calciteStepperItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { currentActivePosition: 16, icon: 7, layout: 3, messageOverrides: 0, numbered: 7, numberingSystem: 3, scale: 3, selectedItem: 0 };
  }
  static {
    this.styles = L;
  }
  async endStep() {
    const e = this.getEnabledStepIndex(this.items.length - 1, "previous");
    typeof e == "number" && this.updateStep(e);
  }
  async goToStep(e) {
    const t = e - 1;
    this.currentActivePosition !== t && this.updateStep(t);
  }
  async nextStep() {
    const e = this.getEnabledStepIndex(this.currentActivePosition + 1, "next");
    typeof e == "number" && this.updateStep(e);
  }
  async prevStep() {
    const e = this.getEnabledStepIndex(this.currentActivePosition - 1, "previous");
    typeof e == "number" && this.updateStep(e);
  }
  async startStep() {
    const e = this.getEnabledStepIndex(0, "next");
    typeof e == "number" && this.updateStep(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0 }), this.updateItems();
  }
  willUpdate(e) {
    (e.has("icon") && (this.hasUpdated || this.icon !== !1) || e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("numbered") && (this.hasUpdated || this.numbered !== !1) || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && (this.updateItems(), this.determineActiveStepper()), e.has("numberingSystem") && this.setStepperItemNumberingSystem(), e.has("currentActivePosition") && requestAnimationFrame(() => {
      this.determineActiveStepper();
    });
  }
  loaded() {
    if (typeof this.currentActivePosition != "number") {
      const e = this.getFirstEnabledStepperPosition();
      e === 0 && (this.currentActivePosition = e), this.calciteInternalStepperItemChange.emit({
        position: e
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  calciteInternalStepperItemKeyEvent(e) {
    const t = e.detail.item, i = e.target;
    switch (t.key) {
      case "ArrowDown":
      case "ArrowRight":
        o(this.enabledItems, i, "next");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        o(this.enabledItems, i, "previous");
        break;
      case "Home":
        o(this.enabledItems, i, "first");
        break;
      case "End":
        o(this.enabledItems, i, "last");
        break;
    }
    e.stopPropagation();
  }
  registerItem(e) {
    const t = e.target, { content: i, position: a } = e.detail;
    this.itemMap.set(t, { position: a, content: i }), this.enabledItems = this.filterItems(), e.stopPropagation();
  }
  updateItem(e) {
    const { position: t } = e.detail;
    typeof t == "number" && (this.currentActivePosition = t, this.selectedItem = e.target), this.calciteInternalStepperItemChange.emit({
      position: t
    });
  }
  handleItemSelect() {
    this.emitItemSelect();
  }
  emitItemSelect() {
    this.calciteStepperItemChange.emit(), this.calciteStepperChange.emit();
  }
  updateItems() {
    this.el.querySelectorAll("calcite-stepper-item").forEach((e) => {
      e.icon = this.icon, e.numbered = this.numbered, e.layout = this.layout, e.scale = this.scale;
    });
  }
  determineActiveStepper() {
    const { items: e } = this;
    if (e.length < 2)
      return;
    const { currentActivePosition: t, layout: i } = this;
    this.multipleViewMode = i !== "horizontal-single", e.forEach((a, s) => {
      a.itemHidden = i === "horizontal-single" && s !== (t || 0);
    });
  }
  getEnabledStepIndex(e, t = "next") {
    const { items: i, currentActivePosition: a } = this;
    let s = e;
    for (; s >= 0 && s < i.length && i[s]?.disabled; )
      s = s + (t === "previous" ? -1 : 1);
    return s !== a && s < i.length && s >= 0 ? s : null;
  }
  updateStep(e) {
    this.currentActivePosition = e, this.calciteInternalStepperItemChange.emit({
      position: e
    });
  }
  filterItems() {
    return this.items.filter((e) => !e.disabled && !m(e));
  }
  setStepperItemNumberingSystem() {
    this.items.forEach((e) => {
      e.numberingSystem = this.numberingSystem;
    });
  }
  handleActionClick(e) {
    const t = this.currentActivePosition;
    e.target.getAttribute("data-position") === "start" ? this.prevStep() : this.nextStep(), typeof this.currentActivePosition == "number" && t !== this.currentActivePosition && !this.items[this.currentActivePosition].disabled && this.emitItemSelect();
  }
  getFirstEnabledStepperPosition() {
    const e = this.items.findIndex((t) => !t.disabled);
    return e > -1 ? e : 0;
  }
  handleDefaultSlotChange(e) {
    const t = P(e).filter((a) => a?.tagName === "CALCITE-STEPPER-ITEM" && !m(a));
    this.items = t;
    const i = Array(t.length).fill("1fr").join(" ");
    this.containerRef.value.style.gridTemplateAreas = i, this.containerRef.value.style.gridTemplateColumns = i, this.setStepperItemNumberingSystem();
  }
  render() {
    return this.el.ariaLabel = this.messages.label, this.el.role = "region", c`<div class=${r({ container: !0, [p.singleView]: this.layout === "horizontal-single" })} ${C(this.containerRef)}>${this.layout === "horizontal-single" && c`<div class=${r({ [p.stepBarContainer]: !0 })}>${this.items.map((e, t) => R({ active: t === this.currentActivePosition, complete: e.complete && t !== this.currentActivePosition && !e.error, disabled: e.disabled && t !== this.currentActivePosition, error: e.error && t !== this.currentActivePosition }))}</div>` || ""}${this.layout === "horizontal-single" && c`<div class=${r({ [p.actionContainer]: !0 })}>${this.renderAction("start")}${this.renderAction("end")}</div>` || ""}<slot @slotchange=${this.handleDefaultSlotChange}></slot></div>`;
  }
  renderAction(e) {
    const t = e === "start", i = t ? u.chevronLeft : u.chevronRight, { currentActivePosition: a, multipleViewMode: s, layout: b } = this, g = B.position(this.guid, t), f = t ? -1 : 1, v = t ? "previous" : "next", S = this.getEnabledStepIndex(a + f, v) === null;
    return b === "horizontal-single" && !s ? c`<calcite-action alignment=center appearance=transparent class=${r({
      [p.actionIcon]: !0
    })} compact data-position=${e ?? d} .disabled=${S} .icon=${i} icon-flip-rtl id=${g ?? d} @click=${this.handleActionClick} .scale=${this.scale} .text=${t ? this.messages.previousStep : this.messages.nextStep}></calcite-action>` : null;
  }
}
x("calcite-stepper", M);
export {
  M as Stepper
};
