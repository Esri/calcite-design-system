import { h as l, L as n, k as o, q as c, s as t, E as d, x as r, j as p } from "./iframe.js";
import { e as h, n as m } from "./ref.js";
import { u, I as b } from "./interactive.js";
import { n as s } from "./locale.js";
import { c as g, i as v } from "./component.js";
import { u as f } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const i = {
  container: "container",
  stepperItemContent: "stepper-item-content",
  stepperItemDescription: "stepper-item-description",
  stepperItemHeader: "stepper-item-header",
  stepperItemHeading: "stepper-item-heading",
  stepperItemHeaderText: "stepper-item-header-text",
  stepperItemNumber: "stepper-item-number",
  visuallyHidden: "visually-hidden"
}, y = l`:host([layout=horizontal][disabled]) .stepper-item-header,:host([layout=horizontal-single][disabled]) .stepper-item-header,:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([layout=horizontal][disabled]) .stepper-item-header *,:host([layout=horizontal-single][disabled]) .stepper-item-header *,:host([disabled]) *,:host([layout=horizontal][disabled]) .stepper-item-header ::slotted(*),:host([layout=horizontal-single][disabled]) .stepper-item-header ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-stepper-item-spacing-unit-s: .25rem;--calcite-stepper-item-spacing-unit-m: .75rem;--calcite-stepper-item-spacing-unit-l: 1rem;--calcite-internal-stepper-action-inline-size: 2rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-inline-end:.25rem}:host([scale=s]) .stepper-item-description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-stepper-item-spacing-unit-s: .5rem;--calcite-stepper-item-spacing-unit-m: 1rem;--calcite-stepper-item-spacing-unit-l: 1.25rem;--calcite-internal-stepper-action-inline-size: 2.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-inline-end:.5rem}:host([scale=m]) .stepper-item-description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-stepper-item-spacing-unit-s: .75rem;--calcite-stepper-item-spacing-unit-m: 1.25rem;--calcite-stepper-item-spacing-unit-l: 1.5rem;--calcite-internal-stepper-action-inline-size: 3rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;margin-inline-end:.75rem}:host([scale=l]) .stepper-item-description{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{position:relative;display:flex;flex-grow:1;flex-direction:column;align-self:flex-start;margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host .container{position:relative;display:flex;flex-grow:1;cursor:pointer;flex-direction:column;border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-color-border-3);color:var(--calcite-color-text-3);text-decoration-line:none;outline:2px solid transparent;outline-offset:2px}:host .container:active{background-color:var(--calcite-color-foreground-3)}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host .stepper-item-header{display:flex;cursor:pointer;align-items:flex-start}:host .stepper-item-header:active{background-color:var(--calcite-color-foreground-3)}:host .stepper-item-content,:host .stepper-item-header{padding-block:var(--calcite-stepper-item-spacing-unit-l);padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host .stepper-item-header *{display:inline-flex;align-items:center}:host .stepper-item-content{display:none;inline-size:100%;flex-direction:column;font-size:var(--calcite-font-size--2);line-height:1.375}:host .stepper-item-icon{margin-inline-end:var(--calcite-stepper-item-spacing-unit-m);margin-block-start:1px;display:inline-flex;block-size:.75rem;flex-shrink:0;align-self:flex-start;color:var(--calcite-color-text-3);opacity:var(--calcite-opacity-disabled)}:host .stepper-item-header-text{flex-direction:column;text-align:initial;margin-inline-end:auto}:host .stepper-item-heading,:host .stepper-item-description{display:flex;inline-size:100%}:host .stepper-item-heading{margin-block-end:.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}:host .stepper-item-description{color:var(--calcite-color-text-3)}:host .stepper-item-number{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-3);margin-inline-end:var(--calcite-stepper-item-spacing-unit-m)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([complete]) .container{border-color:#007ac280}:host([complete]) .container .stepper-item-icon{color:var(--calcite-color-brand)}:host([error]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([error]) .container .stepper-item-number{color:var(--calcite-color-status-danger)}:host([error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-color-status-danger)}:host(:hover:not([disabled]):not([selected])) .container,:host(:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-color-brand)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-heading,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-heading{color:var(--calcite-color-text-1)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-description,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-description{color:var(--calcite-color-text-2)}:host([error]:hover:not([disabled]):not([selected])) .container,:host([error]:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-color-status-danger-hover)}:host([selected]) .container{border-block-start-color:var(--calcite-color-brand)}:host([selected]) .container .stepper-item-heading{color:var(--calcite-color-text-1)}:host([selected]) .container .stepper-item-description{color:var(--calcite-color-text-2)}:host([selected]) .container .stepper-item-number{color:var(--calcite-color-brand)}:host([selected]) .container .stepper-item-icon{color:var(--calcite-color-brand);opacity:1}:host([selected]) .container .stepper-item-content{display:flex}:host([layout=vertical]){inline-size:100%}:host([layout=vertical]) .container{margin-inline:0px;margin-block-start:0px;flex:1 1 auto;border-block-start-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;border-inline-start-width:2px;padding-inline-start:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .container .stepper-item-icon{order:3;margin-block:1px 0px;padding-inline-start:var(--calcite-stepper-item-spacing-unit-s);margin-inline-start:auto}:host([layout=vertical]) .container .stepper-item-header{padding-inline-end:0px}:host([layout=vertical]) .container .stepper-item-content{padding:0}:host([layout=vertical][complete]) .container{border-color:#007ac280}:host([layout=vertical][complete]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][complete]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-color-brand)}:host([layout=vertical][error]) .container{border-color:var(--calcite-color-status-danger)}:host([layout=vertical][selected]) .container{border-color:var(--calcite-color-brand)}:host([layout=vertical][selected]) .container .stepper-item-content:not(:empty){margin-block-end:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical]:focus:not([disabled]):not([selected])) .container{border-color:#007ac280}:host([layout=vertical][error]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][error]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-color-status-danger-hover)}:host([layout=horizontal]),:host([layout=horizontal-single]){display:contents}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:contents}:host([layout=horizontal]) .stepper-item-header,:host([layout=horizontal-single]) .stepper-item-header{border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-color-border-3);outline-color:transparent;grid-row:items}:host([layout=horizontal]) .stepper-item-header:focus,:host([layout=horizontal-single]) .stepper-item-header:focus{transition-duration:0s;outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([layout=horizontal]) .stepper-item-content,:host([layout=horizontal-single]) .stepper-item-content{cursor:auto;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);padding-block:0;padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host([layout=horizontal-single]) .stepper-item-header{grid-area:1/1/1/-1}:host([layout=horizontal]) .stepper-item-content,:host([layout=horizontal-single]) .stepper-item-content{grid-area:2/1/2/-1}:host([layout=horizontal][complete]) .stepper-item-header,:host([layout=horizontal-single][complete]) .stepper-item-header{border-color:#007ac280}:host([layout=horizontal][complete]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][complete]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][complete]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][complete]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-color-brand)}:host([layout=horizontal][error]) .stepper-item-header,:host([layout=horizontal-single][error]) .stepper-item-header{border-color:var(--calcite-color-status-danger)}:host([layout=horizontal][selected]) .stepper-item-header,:host([layout=horizontal-single][selected]) .stepper-item-header{border-color:var(--calcite-color-brand)}:host([layout=horizontal]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:#007ac280}:host([layout=horizontal][error]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][error]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][error]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][error]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-color-status-danger-hover)}@media (forced-colors: active){:host .container{outline-width:0;outline-offset:0}:host(:focus),:host(:focus-visible){outline-color:canvasText}:host([selected]) .container{border-block-start-color:highlight}:host([selected]) .container .stepper-item-number{color:highlight}:host([selected]) .container .stepper-item-icon{color:highlight}:host([layout=vertical][selected]) .container{border-color:highlight}}:host([layout=horizontal-single]) .stepper-item-header{margin-inline-end:0px;box-sizing:border-box;border-style:none;inline-size:100%;padding-inline:calc(var(--calcite-internal-stepper-action-inline-size) + .5rem)}:host([layout=horizontal-single][error]) .container .stepper-item-number{color:var(--calcite-color-status-danger)}:host([layout=horizontal-single][error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-color-status-danger)}:host([layout=horizontal-single][error][selected]),:host([layout=horizontal-single][complete][selected]) .container{color:var(--calcite-color-text-3)}:host([layout=horizontal-single][error][selected]) .stepper-item-heading,:host([layout=horizontal-single][complete][selected]) .container .stepper-item-heading{color:var(--calcite-color-text-2)}:host([layout=horizontal-single][complete][selected]) .container .stepper-item-icon{opacity:var(--calcite-opacity-disabled)}:host([layout=horizontal-single][complete][selected]) .container .stepper-item-number{color:var(--calcite-color-text-3)}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([item-hidden]){display:none}`;
class z extends n {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.headerEl = h(), this.complete = !1, this.disabled = !1, this.error = !1, this.icon = !1, this.iconFlipRtl = !1, this.itemHidden = !1, this.messages = f(), this.numbered = !1, this.scale = "m", this.selected = !1, this.calciteInternalStepperItemKeyEvent = o({
      cancelable: !1
    }), this.calciteInternalStepperItemRegister = o({ cancelable: !1 }), this.calciteInternalStepperItemSelect = o({ cancelable: !1 }), this.calciteStepperItemSelect = o({ cancelable: !1 }), this.listenOn(document.body, "calciteInternalStepperItemChange", this.updateActiveItemOnChange), this.listen("click", this.handleItemClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { complete: 7, description: 1, disabled: 7, error: 7, heading: 1, icon: 5, iconFlipRtl: 7, itemHidden: 7, layout: 3, messageOverrides: 0, numbered: 5, numberingSystem: 1, scale: 3, selected: 7 };
  }
  static {
    this.styles = y;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await g(this), (this.layout === "vertical" ? this.el : this.headerEl.value)?.focus();
  }
  async load() {
    this.parentStepperEl = this.el.parentElement, this.itemPosition = this.getItemPosition(), this.registerStepperItem(), this.selected && this.emitRequestedItem();
  }
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.selectedHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.registerStepperItem(), e.has("messages") && this.effectiveLocaleWatcher(this.messages._lang);
  }
  updated() {
    u(this), c(this.el, "tabindex", this.disabled || this.layout === "horizontal" ? null : 0);
  }
  // #endregion
  // #region Private Methods
  selectedHandler() {
    this.selected && this.emitRequestedItem();
  }
  // watch for removal of disabled to register step
  effectiveLocaleWatcher(e) {
    s.numberFormatOptions = {
      locale: e,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    };
  }
  updateActiveItemOnChange(e) {
    (e.target === this.parentStepperEl || e.composedPath().includes(this.parentStepperEl)) && (this.selectedPosition = e.detail.position, this.determineSelectedItem());
  }
  keyDownHandler(e) {
    if (!this.disabled && e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.emitUserRequestedItem(), e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Home":
        case "End":
          this.calciteInternalStepperItemKeyEvent.emit({ item: e }), e.preventDefault();
          break;
      }
  }
  determineSelectedItem() {
    this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
  }
  registerStepperItem() {
    this.calciteInternalStepperItemRegister.emit({
      position: this.itemPosition
    });
  }
  handleItemClick(e) {
    this.disabled || v(this.el) || this.layout === "horizontal" && e.composedPath().some((a) => a.classList?.contains("stepper-item-content")) || this.emitUserRequestedItem();
  }
  emitUserRequestedItem() {
    this.emitRequestedItem(), this.disabled || this.calciteStepperItemSelect.emit();
  }
  emitRequestedItem() {
    if (!this.disabled) {
      const e = this.itemPosition;
      this.calciteInternalStepperItemSelect.emit({
        position: e
      });
    }
  }
  getItemPosition() {
    return Array.from(this.parentStepperEl?.querySelectorAll("calcite-stepper-item:not([hidden]):not([item-hidden])")).indexOf(this.el);
  }
  // #endregion
  // #region Rendering
  render() {
    this.el.ariaCurrent = this.selected ? "step" : "false";
    const e = (
      /* additional tab index logic needed because of display: contents for horizontal layout */
      this.layout === "horizontal" && !this.disabled ? 0 : null
    );
    return b({ disabled: this.disabled, children: r`<div class=${t(i.container)}>${this.complete && r`<span aria-live=polite class=${t(i.visuallyHidden)}>${this.messages.complete}</span>` || ""}<div class=${t(i.stepperItemHeader)} tabindex=${e ?? d} ${m(this.headerEl)}>${this.icon ? this.renderIcon() : null}${this.numbered ? r`<div class=${t(i.stepperItemNumber)}>${this.renderNumbers()}.</div>` : null}<div class=${t(i.stepperItemHeaderText)}><span class=${t(i.stepperItemHeading)}>${this.heading}</span><span class=${t(i.stepperItemDescription)}>${this.description}</span></div></div><div class=${t(i.stepperItemContent)}><slot></slot></div></div>` });
  }
  renderIcon() {
    let e = "circle";
    return this.selected && (this.layout !== "horizontal-single" || !this.error && !this.complete) ? e = "circleF" : this.error ? e = "exclamationMarkCircleF" : this.complete && (e = "checkCircleF"), r`<calcite-icon class="stepper-item-icon" .flipRtl=${this.iconFlipRtl} .icon=${e} scale=s></calcite-icon>`;
  }
  renderNumbers() {
    return s.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: !1
    }, s.numberFormatter.format(this.itemPosition + 1);
  }
}
p("calcite-stepper-item", z);
export {
  z as StepperItem
};
