import { s as g, x as s, a as b, L as f, d as y, h as $, o as r, j as k, c as w } from "./iframe.js";
import { l as x } from "./live.js";
import { c as V, d as L, H as I } from "./form.js";
import { g as F } from "./guid.js";
import { u as C, I as M } from "./interactive.js";
import { c as E, d as O } from "./label.js";
import { c as R } from "./component.js";
import { f as z } from "./dom.js";
import { V as D } from "./Validation.js";
import { u as K } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const p = ({ full: u, scale: e, partial: t }) => s`<calcite-icon class=${g(t ? void 0 : "icon")} .icon=${u ? "star-f" : "star"} .scale=${e}></calcite-icon>`, v = {
  validationMessage: "validationMessage"
}, P = b`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([read-only]) *,:host([disabled]) *,:host([read-only]) ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;align-items:center;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){block-size:1.5rem;--calcite-internal-rating-spacing: .25rem}:host([scale=m]){block-size:2rem;--calcite-internal-rating-spacing: .5rem}:host([scale=l]){block-size:2.75rem;--calcite-internal-rating-spacing: .75rem}.fieldset{margin:0;display:flex;border-width:0;padding:0;align-items:center;gap:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.wrapper{display:inline-block}.star{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;display:flex;flex-direction:column;cursor:pointer;color:var(--calcite-rating-color, var(--calcite-color-border-input))}.star:hover{color:var(--calcite-rating-color-hover, var(--calcite-color-brand-hover))}.star:active{color:var(--calcite-rating-color-press, var(--calcite-color-brand-press))}.star:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.average,.fraction{color:var(--calcite-rating-average-color, var(--calcite-color-status-warning))}.hovered,.selected{color:var(--calcite-rating-color, var(--calcite-color-brand))}.fraction{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;pointer-events:none;inset-block-start:0;overflow:hidden;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:700;color:var(--calcite-rating-average-text-color)}.number--count{color:var(--calcite-rating-count-text-color, var(--calcite-color-text-2));font-style:italic}.number--count:not(:first-child){margin-inline-start:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class S extends f {
  constructor() {
    super(), this.emit = !1, this.guid = `calcite-ratings-${F()}`, this.isKeyboardInteraction = !0, this.labelElements = [], this.max = 5, this._value = 0, this.messages = K({ blocking: !0 }), this.disabled = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.showChip = !1, this.status = "idle", this.validity = {
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
    }, this.calciteRatingChange = y({ cancelable: !1 }), this.listen("keydown", this.handleHostKeyDown), this.listen("pointerout", this.handleRatingPointerOut), this.listen("pointerover", this.handleRatingPointerOver);
  }
  static {
    this.properties = { hoverValue: 16, average: 11, count: 11, disabled: 7, form: 3, messageOverrides: 0, name: 3, readOnly: 7, required: 7, scale: 3, showChip: 7, status: 3, validationIcon: [3, { converter: $ }], validationMessage: 1, validity: 0, value: 11 };
  }
  static {
    this.styles = P;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.hasUpdated && this.handleValueUpdate(e));
  }
  async setFocus() {
    await R(this), z(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), E(this), V(this);
  }
  async load() {
    this.requestUpdate("value");
  }
  willUpdate() {
    this.starsMap = Array.from({ length: this.max }, (e, t) => {
      const a = t + 1, i = !this.hoverValue && this.average && !this.value && a <= this.average, c = a === this.value, n = this.average && this.average + 1 - a, l = a <= this.hoverValue, d = `${this.guid}-${a}`, o = !this.hoverValue && !this.value && !l && n > 0 && n < 1, h = this.value >= a, m = this.getTabIndex(a);
      return {
        average: i,
        checked: c,
        fraction: n,
        hovered: l,
        id: d,
        partial: o,
        selected: h,
        value: a,
        tabIndex: m
      };
    });
  }
  updated() {
    C(this);
  }
  loaded() {
    this.labelElements = Array.from(this.renderRoot.querySelectorAll("label"));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), O(this), L(this);
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
    return M({ disabled: this.disabled, children: s`<span class="wrapper"><fieldset class="fieldset" .disabled=${this.disabled}><legend class="visually-hidden">${this.messages.rating}</legend>${this.starsMap.map(({ average: t, checked: a, fraction: i, hovered: c, id: n, partial: l, selected: d, value: o, tabIndex: h }) => s`<label class=${g({
      star: !0,
      selected: d,
      hovered: c,
      average: t,
      partial: l
    })} data-value=${o ?? r} for=${n ?? r} @click=${this.handleLabelClick} @focus=${this.handleLabelFocus} @keydown=${this.handleLabelKeyDown} @pointerdown=${this.handleLabelPointerDown} @pointerover=${this.handleLabelPointerOver} tabindex=${h ?? r}><input aria-errormessage=${v.validationMessage} .ariaInvalid=${this.status === "invalid"} .checked=${a} class="visually-hidden" .disabled=${this.disabled || this.readOnly} id=${n ?? r} name=${this.guid ?? r} @change=${this.handleInputChange} tabindex=-1 type=radio .value=${x(o ?? "")}>${p({ full: d || t || c, scale: this.scale })}${l && s`<div class="fraction" style=${k({ width: `${i * 100}%` })}>${p({ full: !0, partial: !0, scale: this.scale })}</div>` || ""}<span class="visually-hidden">${this.messages.stars.replace("{num}", `${o}`)}</span></label>`)}${(this.count || this.average) && this.showChip ? s`<calcite-chip .label=${e} .scale=${this.scale} .value=${e}>${!!this.average && s`<span class="number--average">${this.average.toString()}</span>` || ""}${!!this.count && s`<span class="number--count">(${e})</span>` || ""}</calcite-chip>` : null}</fieldset>${I({ component: this })}${this.validationMessage && this.status === "invalid" ? D({ icon: this.validationIcon, id: v.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}</span>` });
  }
}
w("calcite-rating", S);
export {
  S as Rating
};
