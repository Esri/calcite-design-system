/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { s, b as o, a as w, L as V, d as L, H as I, C as m, o as u, q as C, f as R } from "./index.js";
import { l as T } from "./live.js";
import { u as q } from "./index2.js";
import { g as S } from "./guid.js";
import { g as F } from "./label.js";
import { u as z } from "./useLabel.js";
import { I as E } from "./InternalLabel.js";
import { V as O } from "./Validation.js";
import { u as A } from "./useT9n.js";
import { u as M } from "./useFocusable.js";
import { u as P } from "./useInteractive.js";
import { u as D } from "./useForm.js";
import { s as K } from "./screen-reader.js";
const f = ({ full: v, scale: e, partial: t }) => o`<calcite-icon class=${s(t ? void 0 : "icon")} .icon=${v ? "star-f" : "star"} .scale=${e}></calcite-icon>`, c = {
  fieldSet: "fieldset",
  star: "star",
  fraction: "fraction",
  numberAverage: "number--average",
  numberCount: "number--count",
  wrapper: "wrapper"
}, N = "calcite-ratings", p = {
  validationMessage: "validationMessage",
  host: (v) => `${N}-${v}`
}, U = w`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([read-only]) *,:host([disabled]) *,:host([read-only]) ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;align-items:center;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}:host([scale=s]){min-block-size:var(--calcite-space-2xl);--calcite-internal-rating-spacing: .25rem}:host([scale=m]){min-block-size:var(--calcite-space-3xl);--calcite-internal-rating-spacing: .5rem}:host([scale=l]){min-block-size:var(--calcite-space-4xl);--calcite-internal-rating-spacing: .75rem}.fieldset{margin:0;display:flex;border-width:0;padding:0;align-items:center;gap:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.wrapper{display:inline-block}.star{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;display:flex;flex-direction:column;cursor:pointer;color:var(--calcite-rating-color, var(--calcite-color-border-input))}.star:hover{color:var(--calcite-rating-color-hover, var(--calcite-color-brand-hover))}.star:active{color:var(--calcite-rating-color-press, var(--calcite-color-brand-press))}.star:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.average,.fraction{color:var(--calcite-rating-average-color, var(--calcite-color-status-warning))}.hovered,.selected{color:var(--calcite-rating-color, var(--calcite-color-brand))}.fraction{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;pointer-events:none;inset-block-start:0;overflow:hidden;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:700;color:var(--calcite-rating-average-text-color)}.number--count{color:var(--calcite-rating-count-text-color, var(--calcite-color-text-2));font-style:italic}.number--count:not(:first-child){margin-inline-start:var(--calcite-rating-spacing, var(--calcite-internal-rating-spacing))}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base))}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class _ extends V {
  constructor() {
    super(), this.direction = q(), this.emit = !1, this.formSupport = D({
      inputType: "number",
      getValue: () => this.value === 0 ? "" : this.value
    })(this), this.guid = p.host(S()), this.isKeyboardInteraction = !0, this.labelElements = [], this.max = 5, this._value = 0, this.messages = A({ blocking: !0 }), this.focusSetter = M()(this).setFocus, this.interactiveContainer = P(this), this.disabled = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.showChip = !1, this.status = "idle", this.calciteRatingChange = L({ cancelable: !1 }), z(this), this.listen("keydown", this.handleHostKeyDown), this.listen("pointerout", this.handleRatingPointerOut), this.listen("pointerover", this.handleRatingPointerOver);
  }
  static {
    this.properties = { hoverValue: 16, average: 11, count: 11, disabled: 7, form: 3, labelText: 1, messageOverrides: 0, name: 3, readOnly: 7, required: 7, scale: 3, showChip: 7, status: 3, validationIcon: [3, { converter: I }], validationMessage: 1, validity: 32, value: 11 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [U, K];
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
  async load() {
    this.requestUpdate("value");
  }
  willUpdate() {
    this.starsMap = Array.from({ length: this.max }, (e, t) => {
      const a = t + 1, i = this.hoverValue ?? 0, n = i > 0, l = this.average != null, r = this.average ?? 0, g = !n && l && !this.value && a <= r, h = a === this.value, d = l ? r + 1 - a : 0, b = n && a <= i, $ = `${this.guid}-${a}`, y = !n && !this.value && l && !b && d > 0 && d < 1, x = this.value >= a, k = this.getTabIndex(a);
      return {
        average: g,
        checked: h,
        fraction: d,
        hovered: b,
        id: $,
        partial: y,
        selected: x,
        value: a,
        tabIndex: k
      };
    });
  }
  loaded() {
    this.labelElements = Array.from(this.renderRoot.querySelectorAll("label"));
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
    this.isKeyboardInteraction = !0, this.hoverValue = void 0;
  }
  handleHostKeyDown() {
    this.isKeyboardInteraction = !0;
  }
  handleLabelKeyDown(e) {
    const t = this.getValueFromLabelEvent(e), a = e.key, i = a == " " ? NaN : Number(a), n = this.direction === "rtl";
    if (this.emit = !0, isNaN(i))
      switch (a) {
        case "Enter":
        case " ":
          this.value = !this.required && this.value === t ? 0 : t;
          break;
        case "ArrowLeft":
        case "ArrowRight": {
          const r = a === "ArrowLeft" === n;
          this.value = r ? this.getNextRatingValue(t) : this.getPreviousRatingValue(t), this.updateFocus(), e.preventDefault();
          break;
        }
        case "Tab":
          this.hoverValue = void 0;
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
    this.hoverValue = this.value, this.labelElements[this.value - 1]?.focus();
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
    return this.interactiveContainer({ disabled: this.disabled, children: o`<span class=${s(c.wrapper)}>${this.labelText && E({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<fieldset class=${s(c.fieldSet)} .disabled=${this.disabled}><legend class=${s(m.screenReaderText)}>${this.messages.rating}</legend>${this.starsMap.map(({ average: t, checked: a, fraction: i, hovered: n, id: l, partial: r, selected: g, value: h, tabIndex: d }) => o`<label class=${s({
      [c.star]: !0,
      selected: g,
      hovered: n,
      average: t,
      partial: r
    })} data-value=${h ?? u} for=${l ?? u} @click=${this.handleLabelClick} @focus=${this.handleLabelFocus} @keydown=${this.handleLabelKeyDown} @pointerdown=${this.handleLabelPointerDown} @pointerover=${this.handleLabelPointerOver} tabindex=${d ?? u}><input aria-errormessage=${p.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${F(this)} .ariaRequired=${this.required} .checked=${a} class=${s(m.screenReaderText)} .disabled=${this.disabled || this.readOnly} id=${l ?? u} name=${this.guid ?? u} @change=${this.handleInputChange} tabindex=-1 type=radio .value=${T(h ?? "")}>${f({ full: g || t || n, scale: this.scale })}${r && o`<div class=${s(c.fraction)} style=${C({ width: `${i * 100}%` })}>${f({ full: !0, partial: !0, scale: this.scale })}</div>` || ""}<span class=${s(m.screenReaderText)}>${this.messages.stars.replace("{num}", `${h}`)}</span></label>`)}${(this.count || this.average) && this.showChip ? o`<calcite-chip .label=${e} .scale=${this.scale} .value=${e}>${!!this.average && o`<span class=${s(c.numberAverage)}>${this.average.toString()}</span>` || ""}${!!this.count && o`<span class=${s(c.numberCount)}>(${e})</span>` || ""}</calcite-chip>` : null}</fieldset>${this.validationMessage && this.status === "invalid" ? O({ icon: this.validationIcon, id: p.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}</span>` });
  }
}
R("calcite-rating", _);
export {
  _ as Rating
};
