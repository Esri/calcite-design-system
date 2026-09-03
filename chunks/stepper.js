/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as r, w as I, b as l, a as S, L as y, c as h, A as d, d as A } from "./index.js";
import { e as x, n as z } from "./ref.js";
import { d as c, b as P } from "./dom.js";
import { c as w } from "./observers.js";
import { g as C } from "./guid.js";
import { u as $ } from "./useT9n.js";
import { i as k } from "./resources26.js";
const p = {
  actionIcon: "action-icon",
  actionContainer: "action-container",
  stepBarContainer: "step-bar-container",
  singleView: "single-view"
}, u = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right"
}, E = "calcite-stepper-action", B = {
  position: (o, e) => `${E}-${o}-${e ? "start" : "end"}`
}, a = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--active",
  stepBarComplete: "step-bar--complete",
  stepBarDisabled: "step-bar--disabled",
  stepBarError: "step-bar--error",
  stepBarInActive: "step-bar--inactive"
}, D = ({ disabled: o, active: e, complete: t, error: i }) => l`<svg class=${r({
  [a.stepBar]: !0
})}>${I`<rect class=${r({
  [a.stepBarActive]: e,
  [a.stepBarComplete]: t,
  [a.stepBarDisabled]: o,
  [a.stepBarError]: i,
  [a.stepBarInActive]: !0
})} width=100% x=0 y=0 />`}</svg>`, U = S`:host([scale=s]){--calcite-internal-stepper-item-spacing-unit-s: .25rem;--calcite-internal-stepper-action-block-size: 2.75rem;--calcite-internal-stepper-action-inline-size: 2rem;--calcite-internal-step-bar-gap: .25rem}:host([scale=m]){--calcite-internal-stepper-item-spacing-unit-s: .5rem;--calcite-internal-stepper-action-block-size: 3.25rem;--calcite-internal-stepper-action-inline-size: 2.5rem}:host([scale=l]){--calcite-internal-stepper-item-spacing-unit-s: .75rem;--calcite-internal-stepper-action-block-size: 4rem;--calcite-internal-stepper-action-inline-size: 3rem;--calcite-internal-step-bar-gap: .75rem}:host{display:flex}.container{position:relative;display:flex;inline-size:100%;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]) .container{flex:1 1 auto;flex-direction:column}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:grid;grid-template-areas:"items" "content";gap:.5rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s));grid-template-rows:auto 1fr}:host([layout=horizontal][scale=s]) .container,:host([layout=horizontal-single][scale=s]) .container{gap:.25rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s))}:host([layout=horizontal][scale=l]) .container,:host([layout=horizontal-single][scale=l]) .container{gap:.75rem var(--calcite-stepper-bar-gap, var(--calcite-internal-stepper-item-spacing-unit-s))}:host([layout=horizontal]) .container.single-view{display:flex;grid-template-columns:none}.action-icon{position:relative;display:flex;flex-grow:0;block-size:var(--calcite-internal-stepper-action-block-size);inline-size:var(--calcite-internal-stepper-action-inline-size)}.action-container{position:absolute;display:flex;justify-content:space-between;padding-block:.25rem;inline-size:100%}.step-bar{display:flex;block-size:100%;inline-size:100%}.step-bar-container{position:absolute;display:flex;align-items:flex-start;justify-content:space-between;block-size:.125rem;inline-size:100%;gap:var(--calcite-stepper-bar-gap, var(--calcite-internal-step-bar-gap, .5rem))}.step-bar--inactive{fill:var(--calcite-stepper-bar-inactive-fill-color, var(--calcite-color-border-3, #dfdfdf));fill-opacity:1;block-size:100%}.step-bar--active{fill:var(--calcite-stepper-bar-active-fill-color, var(--calcite-color-brand))}.step-bar--complete{fill:var(--calcite-stepper-bar-complete-fill-color, var(--calcite-color-brand));fill-opacity:.5}.step-bar--error{fill:var(--calcite-stepper-bar-error-fill-color, var(--calcite-color-status-danger))}.step-bar--disabled{opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`;
class L extends y {
  constructor() {
    super(), this.containerRef = x(), this.visibleItems = [], this.focusableItems = [], this.guid = C(), this.items = [], this.multipleViewMode = !1, this.mutationObserver = w("mutation", () => this.updateItems()), this.messages = $(), this.currentActivePosition = -1, this.icon = !1, this.layout = "horizontal", this.numbered = !1, this.scale = "m", this.selectedItem = null, this.calciteInternalStepperItemChange = h({
      cancelable: !1
    }), this.calciteStepperChange = h({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("calciteInternalStepperItemUpdate", (e) => {
      e.stopPropagation(), this.updateItems();
    }), this.listen("calciteInternalStepperItemSelect", this.updateItem), this.listen("calciteStepperItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { currentActivePosition: 16, icon: 7, layout: 3, messageOverrides: 0, numbered: 7, numberingSystem: 3, scale: 3, selectedItem: 0 };
  }
  static {
    this.styles = U;
  }
  async endStep() {
    const e = this.getEnabledStepIndex(this.visibleItems.length - 1, "previous");
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
    (e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("icon") && (this.hasUpdated || this.icon !== !1) || e.has("numbered") && (this.hasUpdated || this.numbered !== !1) || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("numberingSystem") && (this.hasUpdated || this.numberingSystem !== void 0)) && this.updateItems(), e.has("currentActivePosition") && requestAnimationFrame(() => {
      this.determineActiveStepper();
    });
  }
  loaded() {
    if (this.currentActivePosition === -1) {
      const e = this.getFirstEnabledStepperPosition();
      this.currentActivePosition = e, this.calciteInternalStepperItemChange.emit({
        position: e
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  keyDownHandler(e) {
    if (e.defaultPrevented || !e.composedPath().includes(this.el))
      return;
    const t = this.items.find((i) => i === e.target);
    if (!(!t || t.disabled))
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          c(this.focusableItems, t, "next"), e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          c(this.focusableItems, t, "previous"), e.preventDefault();
          break;
        case "Home":
          c(this.focusableItems, t, "first"), e.preventDefault();
          break;
        case "End":
          c(this.focusableItems, t, "last"), e.preventDefault();
          break;
      }
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
    this.calciteStepperChange.emit();
  }
  updateItems() {
    this.visibleItems = this.items.filter((e) => !e.hidden), this.determineActiveStepper(), this.focusableItems = this.visibleItems.filter((e) => !e.disabled && !e.itemHidden), this.items.forEach((e) => {
      e.icon = this.icon, e.numbered = this.numbered, e.layout = this.layout, e.scale = this.scale, e.numberingSystem = this.numberingSystem;
    });
  }
  determineActiveStepper() {
    const { visibleItems: e } = this;
    if (e.length < 2)
      return;
    const { currentActivePosition: t, layout: i } = this;
    this.multipleViewMode = i !== "horizontal-single", e.forEach((n, s) => {
      n.itemHidden = i === "horizontal-single" && s !== t;
    });
  }
  getEnabledStepIndex(e, t = "next") {
    const { visibleItems: i, currentActivePosition: n } = this;
    let s = e;
    for (; s >= 0 && s < i.length && i[s]?.disabled; )
      s = s + (t === "previous" ? -1 : 1);
    return s !== n && s < i.length && s >= 0 ? s : null;
  }
  updateStep(e) {
    this.currentActivePosition = e, this.calciteInternalStepperItemChange.emit({
      position: e
    });
  }
  handleActionClick(e) {
    const t = this.currentActivePosition;
    e.target.getAttribute("data-position") === "start" ? this.prevStep() : this.nextStep(), typeof this.currentActivePosition == "number" && t !== this.currentActivePosition && this.visibleItems[this.currentActivePosition] && !this.visibleItems[this.currentActivePosition].disabled && this.emitItemSelect();
  }
  getFirstEnabledStepperPosition() {
    const e = this.visibleItems.findIndex((t) => !t.disabled);
    return e > -1 ? e : 0;
  }
  handleDefaultSlotChange(e) {
    this.items = P(e).filter((n) => k(n)), this.updateItems();
    const t = Array(this.visibleItems.length).fill("1fr").join(" "), i = this.containerRef.value;
    i.style.gridTemplateAreas = t, i.style.gridTemplateColumns = t;
  }
  render() {
    return this.el.ariaLabel = this.messages.label ?? null, this.el.role = "region", l`<div class=${r({ container: !0, [p.singleView]: this.layout === "horizontal-single" })} ${z(this.containerRef)}>${this.layout === "horizontal-single" && l`<div class=${r({ [p.stepBarContainer]: !0 })}>${this.visibleItems.map((e, t) => D({ active: t === this.currentActivePosition, complete: e.complete && t !== this.currentActivePosition && !e.error, disabled: e.disabled && t !== this.currentActivePosition, error: e.error && t !== this.currentActivePosition }))}</div>` || ""}${this.layout === "horizontal-single" && l`<div class=${r({ [p.actionContainer]: !0 })}>${this.renderAction("start")}${this.renderAction("end")}</div>` || ""}<slot @slotchange=${this.handleDefaultSlotChange}></slot></div>`;
  }
  renderAction(e) {
    const t = e === "start", i = t ? u.chevronLeft : u.chevronRight, { currentActivePosition: n, multipleViewMode: s, layout: m } = this, b = B.position(this.guid, t), f = t ? -1 : 1, v = t ? "previous" : "next", g = this.getEnabledStepIndex(n + f, v) === null;
    return m === "horizontal-single" && !s ? l`<calcite-action alignment=center class=${r({
      [p.actionIcon]: !0
    })} compact data-position=${e ?? d} .disabled=${g} .icon=${i} icon-flip-rtl id=${b ?? d} @click=${this.handleActionClick} .scale=${this.scale} .text=${t ? this.messages.previousStep : this.messages.nextStep}></calcite-action>` : null;
  }
}
A("calcite-stepper", L);
export {
  L as Stepper
};
