import { s, x as l, b as f, L as y, c as $, u as x, z as d, w as k, q as w } from "./index.js";
import { l as V } from "./live.js";
import { c as L, d as I, H as C } from "./form.js";
import { g as z } from "./guid.js";
import { u as F, I as S } from "./interactive.js";
import { c as q, d as M, g as R } from "./label.js";
import { I as E } from "./InternalLabel.js";
import { V as O } from "./Validation.js";
import { u as T } from "./useT9n.js";
import { u as P } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const b = ({ full: h, scale: e, partial: t }) => l`<calcite-icon class=${s(t ? void 0 : "icon")} .icon=${h ? "star-f" : "star"} .scale=${e}></calcite-icon>`, n = {
  fieldSet: "fieldset",
  star: "star",
  fraction: "fraction",
  numberAverage: "number--average",
  numberCount: "number--count",
  wrapper: "wrapper",
  visuallyHidden: "visually-hidden"
}, D = "calcite-ratings", v = {
  validationMessage: "validationMessage",
  host: (h) => `${D}-${h}`
}, K = f`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([read-only]) *,:host([disabled]) *,:host([read-only]) ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;align-items:center;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){block-size:1.5rem;--calcite-internal-rating-spacing: .25rem}:host([scale=m]){block-size:2rem;--calcite-internal-rating-spacing: .5rem}:host([scale=l]){block-size:2.75rem;--calcite-internal-rating-spacing: .75rem}.fieldset{margin:0;display:flex;border-width:0;padding:0;align-items:center;gap:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.wrapper{display:inline-block}.star{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;display:flex;flex-direction:column;cursor:pointer;color:var(--calcite-rating-color, var(--calcite-color-border-input))}.star:hover{color:var(--calcite-rating-color-hover, var(--calcite-color-brand-hover))}.star:active{color:var(--calcite-rating-color-press, var(--calcite-color-brand-press))}.star:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.average,.fraction{color:var(--calcite-rating-average-color, var(--calcite-color-status-warning))}.hovered,.selected{color:var(--calcite-rating-color, var(--calcite-color-brand))}.fraction{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;pointer-events:none;inset-block-start:0;overflow:hidden;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:700;color:var(--calcite-rating-average-text-color)}.number--count{color:var(--calcite-rating-count-text-color, var(--calcite-color-text-2));font-style:italic}.number--count:not(:first-child){margin-inline-start:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class H extends y {
  constructor() {
    super(), this.emit = !1, this.guid = v.host(z()), this.isKeyboardInteraction = !0, this.labelElements = [], this.max = 5, this._value = 0, this.messages = T({ blocking: !0 }), this.focusSetter = P()(this), this.disabled = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.showChip = !1, this.status = "idle", this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.calciteRatingChange = $({ cancelable: !1 }), this.listen("keydown", this.handleHostKeyDown), this.listen("pointerout", this.handleRatingPointerOut), this.listen("pointerover", this.handleRatingPointerOver);
  }
  static {
    this.properties = { hoverValue: 16, average: 11, count: 11, disabled: 7, form: 3, labelText: 1, messageOverrides: 0, name: 3, readOnly: 7, required: 7, scale: 3, showChip: 7, status: 3, validationIcon: [3, { converter: x, type: String }], validationMessage: 1, validity: 0, value: 11 };
  }
  static {
    this.styles = K;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.hasUpdated && this.handleValueUpdate(e));
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), q(this), L(this);
  }
  async load() {
    this.requestUpdate("value");
  }
  willUpdate() {
    this.starsMap = Array.from({ length: this.max }, (e, t) => {
      const a = t + 1, i = !this.hoverValue && this.average && !this.value && a <= this.average, u = a === this.value, r = this.average && this.average + 1 - a, o = a <= this.hoverValue, g = `${this.guid}-${a}`, c = !this.hoverValue && !this.value && !o && r > 0 && r < 1, p = this.value >= a, m = this.getTabIndex(a);
      return {
        average: i,
        checked: u,
        fraction: r,
        hovered: o,
        id: g,
        partial: c,
        selected: p,
        value: a,
        tabIndex: m
      };
    });
  }
  updated() {
    F(this);
  }
  loaded() {
    this.labelElements = Array.from(this.renderRoot.querySelectorAll("label"));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), M(this), I(this);
  }
  handleValueUpdate(e) {
    this.hoverValue = e, this.emit && this.calciteRatingChange.emit(), this.emit = !1;
  }
  onLabelClick() {
    this.setFocus();
  }
  handleRatingPointerOver() {
    this.isKeyboardInteraction = !1;
  }
  handleRatingPointerOut() {
    this.isKeyboardInteraction = !0, this.hoverValue = null;
  }
  handleHostKeyDown() {
    this.isKeyboardInteraction = !0;
  }
  handleLabelKeyDown(e) {
    const t = this.getValueFromLabelEvent(e), a = e.key, i = a == " " ? void 0 : Number(a);
    if (this.emit = !0, isNaN(i))
      switch (a) {
        case "Enter":
        case " ":
          this.value = !this.required && this.value === t ? 0 : t;
          break;
        case "ArrowLeft":
          this.value = this.getPreviousRatingValue(t), this.updateFocus(), e.preventDefault();
          break;
        case "ArrowRight":
          this.value = this.getNextRatingValue(t), this.updateFocus(), e.preventDefault();
          break;
        case "Tab":
          this.hoverValue = null;
          break;
      }
    else
      !this.required && i >= 0 && i <= this.max ? this.value = i : this.required && i > 0 && i <= this.max && (this.value = i), this.updateFocus();
  }
  handleInputChange(e) {
    if (this.isKeyboardInteraction === !0) {
      const t = Number(e.target.value);
      this.hoverValue = t, this.value = t;
    }
  }
  handleLabelPointerOver(e) {
    this.hoverValue = this.getValueFromLabelEvent(e);
  }
  handleLabelPointerDown(e) {
    const t = e.currentTarget, a = this.getValueFromLabelEvent(e);
    this.hoverValue = a, this.emit = !0, this.value = !this.required && this.value === a ? 0 : a, t.focus();
  }
  handleLabelClick(e) {
    e.preventDefault();
  }
  handleLabelFocus(e) {
    const t = this.getValueFromLabelEvent(e);
    this.hoverValue = t;
  }
  updateFocus() {
    this.hoverValue = this.value, this.labelElements[this.value - 1].focus();
  }
  getTabIndex(e) {
    return this.readOnly || this.value !== e && (this.value || e !== 1) ? -1 : 0;
  }
  getValueFromLabelEvent(e) {
    const t = e.currentTarget;
    return Number(t.getAttribute("data-value"));
  }
  getNextRatingValue(e) {
    return e === 5 ? 1 : e + 1;
  }
  getPreviousRatingValue(e) {
    return e === 1 ? 5 : e - 1;
  }
  render() {
    const e = this.count?.toString();
    return S({ disabled: this.disabled, children: l`<span class=${s(n.wrapper)}>${this.labelText && E({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<fieldset class=${s(n.fieldSet)} .disabled=${this.disabled}><legend class=${s(n.visuallyHidden)}>${this.messages.rating}</legend>${this.starsMap.map(({ average: t, checked: a, fraction: i, hovered: u, id: r, partial: o, selected: g, value: c, tabIndex: p }) => l`<label class=${s({
      [n.star]: !0,
      selected: g,
      hovered: u,
      average: t,
      partial: o
    })} data-value=${c ?? d} for=${r ?? d} @click=${this.handleLabelClick} @focus=${this.handleLabelFocus} @keydown=${this.handleLabelKeyDown} @pointerdown=${this.handleLabelPointerDown} @pointerover=${this.handleLabelPointerOver} tabindex=${p ?? d}><input aria-errormessage=${v.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${R(this)} .ariaRequired=${this.required} .checked=${a} class=${s(n.visuallyHidden)} .disabled=${this.disabled || this.readOnly} id=${r ?? d} name=${this.guid ?? d} @change=${this.handleInputChange} tabindex=-1 type=radio .value=${V(c ?? "")}>${b({ full: g || t || u, scale: this.scale })}${o && l`<div class=${s(n.fraction)} style=${k({ width: `${i * 100}%` })}>${b({ full: !0, partial: !0, scale: this.scale })}</div>` || ""}<span class=${s(n.visuallyHidden)}>${this.messages.stars.replace("{num}", `${c}`)}</span></label>`)}${(this.count || this.average) && this.showChip ? l`<calcite-chip .label=${e} .scale=${this.scale} .value=${e}>${!!this.average && l`<span class=${s(n.numberAverage)}>${this.average.toString()}</span>` || ""}${!!this.count && l`<span class=${s(n.numberCount)}>(${e})</span>` || ""}</calcite-chip>` : null}</fieldset>${C({ component: this })}${this.validationMessage && this.status === "invalid" ? O({ icon: this.validationIcon, id: v.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}</span>` });
  }
}
w("calcite-rating", H);
export {
  H as Rating
};
