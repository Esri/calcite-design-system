import { s as r, c as f, x as l, d as S, L as v, j as p, E as m, h as I } from "./iframe.js";
import { n as y } from "./ref.js";
import { b as o, d as A } from "./dom.js";
import { c as x } from "./observers.js";
import { g as z } from "./guid.js";
import { u as C } from "./useT9n.js";
import { i as d } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const c = {
  actionIcon: "action-icon",
  actionContainer: "action-container",
  stepBarContainer: "step-bar-container",
  singleView: "single-view"
}, a = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--active",
  stepBarComplete: "step-bar--complete",
  stepBarDisabled: "step-bar--disabled",
  stepBarError: "step-bar--error",
  stepBarInActive: "step-bar--inactive"
}, E = ({ disabled: h, active: e, complete: t, error: i }) => l`<svg class=${r({
  [a.stepBar]: !0
})}>${f`<rect class=${r({
  [a.stepBarActive]: e,
  [a.stepBarComplete]: t,
  [a.stepBarDisabled]: h,
  [a.stepBarError]: i,
  [a.stepBarInActive]: !0
})} width=100% x=0 y=0 />`}</svg>`, P = S`:host([scale=s]){--calcite-internal-stepper-item-spacing-unit-s: .25rem;--calcite-internal-stepper-action-block-size: 2.75rem;--calcite-internal-stepper-action-inline-size: 2rem;--calcite-internal-step-bar-gap: .25rem}:host([scale=m]){--calcite-internal-stepper-item-spacing-unit-s: .5rem;--calcite-internal-stepper-action-block-size: 3.25rem;--calcite-internal-stepper-action-inline-size: 2.5rem}:host([scale=l]){--calcite-internal-stepper-item-spacing-unit-s: .75rem;--calcite-internal-stepper-action-block-size: 4rem;--calcite-internal-stepper-action-inline-size: 3rem;--calcite-internal-step-bar-gap: .75rem}:host{display:flex}.container{position:relative;display:flex;inline-size:100%;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]) .container{flex:1 1 auto;flex-direction:column}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:grid;grid-template-areas:"items" "content";gap:.5rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=s]) .container,:host([layout=horizontal-single][scale=s]) .container{gap:.25rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=l]) .container,:host([layout=horizontal-single][scale=l]) .container{gap:.75rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal]) .container.single-view{display:flex;grid-template-columns:none}.action-icon{position:relative;display:flex;flex-grow:0;block-size:var(--calcite-internal-stepper-action-block-size);inline-size:var(--calcite-internal-stepper-action-inline-size)}.action-container{position:absolute;display:flex;justify-content:space-between;padding-block:.25rem;inline-size:100%}.step-bar{display:flex;block-size:100%;inline-size:100%}.step-bar-container{position:absolute;display:flex;align-items:flex-start;justify-content:space-between;block-size:.125rem;inline-size:100%;gap:var(--calcite-internal-step-bar-gap, .5rem)}.step-bar--inactive{fill:var(--calcite-color-border-3, #dfdfdf);fill-opacity:1;block-size:100%}.step-bar--active{fill:var(--calcite-color-brand)}.step-bar--complete{fill:var(--calcite-color-brand);fill-opacity:.5}.step-bar--error{fill:var(--calcite-color-status-danger)}.step-bar--disabled{opacity:.5}:host([hidden]){display:none}[hidden]{display:none}`;
class w extends v {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.enabledItems = [], this.guid = `calcite-stepper-action-${z()}`, this.itemMap = /* @__PURE__ */ new Map(), this.items = [], this.multipleViewMode = !1, this.mutationObserver = x("mutation", () => this.updateItems()), this.icon = !1, this.layout = "horizontal", this.messages = C(), this.numbered = !1, this.scale = "m", this.selectedItem = null, this.calciteInternalStepperItemChange = p({
      cancelable: !1
    }), this.calciteStepperChange = p({ cancelable: !1 }), this.calciteStepperItemChange = p({ cancelable: !1 }), this.listen("calciteInternalStepperItemKeyEvent", this.calciteInternalStepperItemKeyEvent), this.listen("calciteInternalStepperItemRegister", this.registerItem), this.listen("calciteInternalStepperItemSelect", this.updateItem), this.listen("calciteStepperItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { currentActivePosition: 16, icon: 7, layout: 3, messageOverrides: 0, numbered: 7, numberingSystem: 3, scale: 3, selectedItem: 0 };
  }
  static {
    this.styles = P;
  }
  // #endregion
  // #region Public Methods
  /** Set the last `calcite-stepper-item` as active. */
  async endStep() {
    const e = this.getEnabledStepIndex(this.items.length - 1, "previous");
    typeof e == "number" && this.updateStep(e);
  }
  /**
   * Set a specified `calcite-stepper-item` as active.
   *
   * @param step
   */
  async goToStep(e) {
    const t = e - 1;
    this.currentActivePosition !== t && this.updateStep(t);
  }
  /** Set the next `calcite-stepper-item` as active. */
  async nextStep() {
    const e = this.getEnabledStepIndex(this.currentActivePosition + 1, "next");
    typeof e == "number" && this.updateStep(e);
  }
  /** Set the previous `calcite-stepper-item` as active. */
  async prevStep() {
    const e = this.getEnabledStepIndex(this.currentActivePosition - 1, "previous");
    typeof e == "number" && this.updateStep(e);
  }
  /** Set the first `calcite-stepper-item` as active. */
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
  // #endregion
  // #region Private Methods
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
    const t = e.target, { content: i, position: s } = e.detail;
    this.itemMap.set(t, { position: s, content: i }), this.enabledItems = this.filterItems(), e.stopPropagation();
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
    this.multipleViewMode = i !== "horizontal-single", e.forEach((s, n) => {
      s.itemHidden = i === "horizontal-single" && n !== (t || 0);
    });
  }
  getEnabledStepIndex(e, t = "next") {
    const { items: i, currentActivePosition: s } = this;
    let n = e;
    for (; i[n]?.disabled && this.layout !== "horizontal-single"; )
      n = n + (t === "previous" ? -1 : 1);
    return n !== s && n < i.length && n >= 0 ? n : null;
  }
  updateStep(e) {
    this.currentActivePosition = e, this.calciteInternalStepperItemChange.emit({
      position: e
    });
  }
  filterItems() {
    return this.items.filter((e) => !e.disabled && !d(e));
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
  setContainerEl(e) {
    this.containerEl = e;
  }
  handleDefaultSlotChange(e) {
    const t = A(e).filter((s) => s?.tagName === "CALCITE-STEPPER-ITEM" && !d(s));
    this.items = t;
    const i = Array(t.length).fill("1fr").join(" ");
    this.containerEl.style.gridTemplateAreas = i, this.containerEl.style.gridTemplateColumns = i, this.setStepperItemNumberingSystem();
  }
  // #endregion
  // #region Rendering
  render() {
    return this.el.ariaLabel = this.messages.label, this.el.role = "region", l`<div class=${r({ container: !0, [c.singleView]: this.layout === "horizontal-single" })} ${y(this.setContainerEl)}>${this.layout === "horizontal-single" && l`<div class=${r({ [c.stepBarContainer]: !0 })}>${this.items.map((e, t) => E({ active: t === this.currentActivePosition, complete: e.complete && t !== this.currentActivePosition && !e.error, disabled: e.disabled && t !== this.currentActivePosition, error: e.error && t !== this.currentActivePosition }))}</div>` || ""}${this.layout === "horizontal-single" && l`<div class=${r({ [c.actionContainer]: !0 })}>${this.renderAction("start")}${this.renderAction("end")}</div>` || ""}<slot @slotchange=${this.handleDefaultSlotChange}></slot></div>`;
  }
  renderAction(e) {
    const t = e === "start", i = t ? "chevron-left" : "chevron-right", { currentActivePosition: s, multipleViewMode: n, layout: u } = this, b = this.items.length, g = `${this.guid}-${t ? "start" : "end"}`;
    return u === "horizontal-single" && !n ? l`<calcite-action alignment=center appearance=transparent class=${r({
      [c.actionIcon]: !0
    })} compact data-position=${e ?? m} .disabled=${s === 0 && t || s === b - 1 && !t} .icon=${i} icon-flip-rtl id=${g ?? m} @click=${this.handleActionClick} .scale=${this.scale} .text=${t ? this.messages.previousStep : this.messages.nextStep}></calcite-action>` : null;
  }
}
I("calcite-stepper", w);
export {
  w as Stepper
};
