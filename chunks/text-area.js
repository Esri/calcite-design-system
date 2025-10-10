import { b as y, L as z, c as m, u as w, s as i, z as l, x as d, q as k } from "./index.js";
import { l as L } from "./live.js";
import { e as S, n as u } from "./ref.js";
import { u as E } from "./index2.js";
import { c as $, d as C, H as A } from "./form.js";
import { c as O, d as H, g as T } from "./label.js";
import { s as x } from "./dom.js";
import { n as h } from "./locale.js";
import { c as I, u as M } from "./observers.js";
import { u as R, I as W } from "./interactive.js";
import { g as q } from "./guid.js";
import { I as F } from "./InternalLabel.js";
import { V as j } from "./Validation.js";
import { s as V } from "./input.js";
import { u as B } from "./useT9n.js";
import { u as N } from "./useCancelable.js";
import { u as D } from "./useSetFocus.js";
import { t as G } from "./throttle.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  assistiveText: "assistive-text",
  characterLimit: "character-limit",
  content: "content",
  container: "container",
  footer: "footer",
  characterOverLimit: "character--over-limit",
  readOnly: "readonly",
  textAreaInvalid: "text-area--invalid",
  footerSlotted: "footer--slotted",
  hide: "hide",
  footerEndSlotOnly: "footer--end-only",
  textArea: "text-area",
  textAreaOnly: "text-area--only",
  wrapper: "wrapper"
}, f = {
  validationMessage: "textAreaValidationMessage"
}, v = {
  footerStart: "footer-start",
  footerEnd: "footer-end"
}, P = 100, g = Object.freeze({ height: 0, width: 0 }), U = y`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:inline-block;block-size:100%;inline-size:100%;--calcite-internal-text-area-border-color: var(--calcite-text-area-border-color, var(--calcite-color-border-input));--calcite-internal-text-area-footer-border-color: var( --calcite-text-area-footer-border-color, var(--calcite-internal-text-area-border-color) );--calcite-internal-text-area-corner-radius: var( --calcite-text-area-corner-radius, var(--calcite-corner-radius-default) );--calcite-internal-text-area-shadow: var(--calcite-text-area-shadow, var(--calcite-shadow-none));--calcite-internal-text-area-footer-background-color: var( --calcite-text-area-footer-background-color, var(--calcite-text-area-background-color, var(--calcite-color-foreground-1)) );min-block-size:var(--calcite-text-area-min-height, calc(2 * var(--calcite-internal-text-area-padding-block) + 2 * var(--calcite-border-width-sm)));min-inline-size:var(--calcite-text-area-min-width, 12rem)}.wrapper{box-sizing:border-box;block-size:100%;inline-size:100%;box-shadow:var(--calcite-internal-text-area-shadow);border-radius:var(--calcite-internal-text-area-corner-radius)}.text-area,.footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));padding-block:var(--calcite-internal-text-area-padding-block);padding-inline:var(--calcite-internal-text-area-padding-inline)}.footer{background-color:var(--calcite-internal-text-area-footer-background-color);border-radius:0 0 var(--calcite-internal-text-area-corner-radius) var(--calcite-internal-text-area-corner-radius)}.text-area{position:relative;margin:0;box-sizing:border-box;display:block;inline-size:100%;font-family:var(--calcite-font-family);--calcite-internal-text-area-border-block-end-color: var(--calcite-internal-text-area-border-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-border-color);border-block-end-color:var(--calcite-internal-text-area-border-block-end-color);color:var(--calcite-text-area-text-color, var(--calcite-color-text-1));font-family:var(--calcite-sans-family);max-block-size:var(--calcite-text-area-max-height);min-block-size:calc(var(--calcite-text-area-min-height, 0px) - var(--calcite-internal-text-area-footer-min-height, 0px));max-inline-size:var(--calcite-text-area-max-width);min-inline-size:var(--calcite-text-area-min-width, 12rem);background-color:var(--calcite-text-area-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-internal-text-area-corner-radius) var(--calcite-internal-text-area-corner-radius) 0 0}.text-area::placeholder{font-weight:var(--calcite-font-weight-normal)}@media screen and (max-width: 480px){.text-area{resize:none}}.text-area:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.text-area--invalid{--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}.text-area.text-area--invalid:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.footer--slotted{min-inline-size:18rem}.text-area.text-area--only{border-radius:var(--calcite-internal-text-area-corner-radius)}.text-area:not(.text-area--only,.text-area--invalid){--calcite-internal-text-area-border-block-end-color: var( --calcite-text-area-divider-color, var(--calcite-color-border-3) )}.footer{box-sizing:border-box;display:flex;align-items:center;border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-footer-border-color);border-block-start:var(--calcite-border-width-none);min-block-size:var(--calcite-internal-text-area-footer-min-height)}.character-limit{display:flex;align-items:center;justify-content:flex-end;white-space:nowrap;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));font-weight:var(--calcite-font-weight-regular);color:var(--calcite-text-area-character-limit-text-color, var(--calcite-color-text-2));padding-inline-start:var(--calcite-spacing-md)}.character--over-limit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-status-danger)}.readonly{background-color:var(--calcite-text-area-background-color, var(--calcite-color-background));font-weight:var(--calcite-font-weight-medium)}.footer.readonly{background-color:var(--calcite-internal-text-area-footer-background-color, var(--calcite-color-background))}.content,.hide{display:none}.container{display:flex;inline-size:100%;justify-content:space-between}.footer--end-only{justify-content:flex-end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.text-area.text-area--only{block-size:100%;min-block-size:var(--calcite-text-area-min-height, 0)}:host([resize=none]) .text-area{resize:none}:host([resize=horizontal]) .text-area{resize:horizontal}:host([resize=vertical]) .text-area{resize:vertical}:host([scale=s]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-xxs);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-sm);--calcite-internal-text-area-footer-min-height: 1.75rem}:host([scale=s]) .text-area,:host([scale=s]) .footer,:host([scale=s]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--2))}:host([scale=s]) .character-limit{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-sm);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-md);--calcite-internal-text-area-footer-min-height: 2.25rem}:host([scale=l]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-md);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-lg);--calcite-internal-text-area-footer-min-height: 2.75rem}:host([scale=l]) .text-area,:host([scale=l]) .footer,:host([scale=l]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0))}:host([scale=l]) .character-limit{padding-inline-start:var(--calcite-spacing-lg)}:host([status=invalid]){--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}:host([status=invalid]) .text-area:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([disabled]) .text-area,:host([disabled]) .footer{opacity:var(--calcite-opacity-half)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class _ extends z {
  constructor() {
    super(...arguments), this.attributeWatch = E(["autofocus", "spellcheck"], this.handleGlobalAttributesChanged), this.footerRef = S(), this.guid = q(), this.resizeObserver = I("resize", async () => {
      await this.componentOnReady();
      const { textAreaHeight: e, textAreaWidth: t, elHeight: r, elWidth: n, footerHeight: o, footerWidth: s, validationMessageHeight: c } = this.getHeightAndWidthOfElements();
      if (s > 0 && s !== t && (this.footerRef.value.style.width = `${t}px`), this.resize === "none")
        return;
      const { width: p, height: b } = getComputedStyle(this.el);
      n !== t && p !== "auto" && this.updateSizeToAuto("width"), r !== e + o + c && b !== "auto" && this.updateSizeToAuto("height");
    }), this.cancelable = N()(this), this.updateSizeToAuto = G((e) => {
      this.el.style[e] = "auto";
    }, P, { edges: ["trailing"] }), this.messages = B({ blocking: !0 }), this.focusSetter = D()(this), this.disabled = !1, this.groupSeparator = !1, this.limitText = !1, this.readOnly = !1, this.required = !1, this.resize = "both", this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.value = "", this.wrap = "soft", this.calciteTextAreaChange = m(), this.calciteTextAreaInput = m();
  }
  static {
    this.properties = { endSlotHasElements: 16, startSlotHasElements: 16, columns: 11, disabled: 7, form: 3, groupSeparator: 7, label: 1, labelText: 1, limitText: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, numberingSystem: 1, placeholder: 1, readOnly: 7, required: 7, resize: 3, rows: 11, scale: 3, status: 3, validationIcon: [3, { converter: w, type: String }], validationMessage: 1, validity: 0, value: 1, wrap: 3 };
  }
  static {
    this.styles = U;
  }
  async selectText() {
    await this.componentOnReady(), this.textAreaEl?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.textAreaEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), O(this), $(this), this.cancelable.add(this.updateSizeToAuto);
  }
  updated() {
    R(this), this.setTextAreaHeight();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), H(this), C(this), this.resizeObserver?.disconnect();
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  onLabelClick() {
    this.setFocus();
  }
  handleInput(e) {
    this.value = e.target.value, this.calciteTextAreaInput.emit();
  }
  handleChange() {
    this.calciteTextAreaChange.emit();
  }
  contentSlotChangeHandler() {
    this.value || this.el.childNodes.forEach((t) => {
      t.nodeName === "#text" && (this.value = t.nodeValue.trim());
    });
  }
  getLocalizedCharacterLength() {
    const e = this.value ? this.value.length.toString() : "0", t = this.maxLength.toString();
    return this.numberingSystem === "latn" ? { currentLength: e, maxLength: t } : (h.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator
    }, {
      currentLength: h.localize(e),
      maxLength: h.localize(t)
    });
  }
  syncHiddenFormInput(e) {
    e.setCustomValidity(""), this.isCharacterLimitExceeded() && e.setCustomValidity(this.replacePlaceholdersInMessages()), V("textarea", this, e);
  }
  setTextAreaEl(e) {
    M(this.resizeObserver, this.textAreaEl, e), this.textAreaEl = e;
  }
  setTextAreaHeight() {
    const { textAreaHeight: e, elHeight: t, footerHeight: r, validationMessageHeight: n } = this.getHeightAndWidthOfElements();
    r > 0 && e + r + n != t && (this.textAreaEl.style.height = `${t - r}px`);
  }
  getHeightAndWidthOfElements() {
    const { height: e, width: t } = this.textAreaEl ? this.textAreaEl.getBoundingClientRect() : g, { height: r, width: n } = this.el.getBoundingClientRect(), { height: o, width: s } = this.footerRef.value ? this.footerRef.value.getBoundingClientRect() : g, { height: c } = this.validationMessageEl ? this.validationMessageEl.getBoundingClientRect() : g;
    return {
      textAreaHeight: e,
      textAreaWidth: t,
      elHeight: r,
      elWidth: n,
      footerHeight: o,
      footerWidth: s,
      validationMessageHeight: c
    };
  }
  replacePlaceholdersInMessages() {
    return this.messages.tooLong.replace("{maxLength}", this.localizedCharacterLengthObj.maxLength).replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }
  isCharacterLimitExceeded() {
    return this.value?.length > this.maxLength;
  }
  setValidationRef(e) {
    e && (this.validationMessageEl = e);
  }
  render() {
    const e = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    return W({ disabled: this.disabled, children: d`<div class=${i(a.wrapper)}>${this.labelText && F({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<textarea aria-describedby=${this.guid ?? l} aria-errormessage=${f.validationMessage} .ariaInvalid=${this.status === "invalid" || this.isCharacterLimitExceeded()} .ariaLabel=${T(this)} .autofocus=${this.el.autofocus} class=${i({
      [a.textArea]: !0,
      [a.readOnly]: this.readOnly,
      [a.textAreaInvalid]: this.isCharacterLimitExceeded(),
      [a.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
      [a.textAreaOnly]: !e
    })} .cols=${this.columns} .disabled=${this.disabled} maxlength=${(this.limitText ? this.maxLength : void 0) ?? l} name=${this.name ?? l} @change=${this.handleChange} @input=${this.handleInput} placeholder=${this.placeholder ?? l} .readOnly=${this.readOnly} .required=${this.required} .rows=${this.rows} spellcheck=${this.el.spellcheck ?? l} .value=${L(this.value ?? "")} wrap=${this.wrap ?? l} ${u(this.setTextAreaEl)}></textarea><span class=${i({ [a.content]: !0 })}><slot @slotchange=${this.contentSlotChangeHandler}></slot></span><footer class=${i({
      [a.footer]: !0,
      [a.readOnly]: this.readOnly,
      [a.hide]: !e
    })} ${u(this.footerRef)}><div class=${i({
      [a.container]: !0,
      [a.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements
    })}><slot name=${v.footerStart} @slotchange=${(t) => this.startSlotHasElements = x(t)}></slot><slot name=${v.footerEnd} @slotchange=${(t) => this.endSlotHasElements = x(t)}></slot></div>${this.renderCharacterLimit()}</footer>${A({ component: this })}${this.isCharacterLimitExceeded() && d`<span aria-live=polite class=${i(a.assistiveText)} id=${this.guid ?? l}>${this.replacePlaceholdersInMessages()}</span>` || ""}${this.validationMessage && this.status === "invalid" ? j({ icon: this.validationIcon, id: f.validationMessage, message: this.validationMessage, ref: this.setValidationRef, scale: this.scale, status: this.status }) : null}</div>` });
  }
  renderCharacterLimit() {
    return this.maxLength ? (this.localizedCharacterLengthObj = this.getLocalizedCharacterLength(), d`<span class=${i(a.characterLimit)}><span class=${i({ [a.characterOverLimit]: this.isCharacterLimitExceeded() })}>${this.localizedCharacterLengthObj.currentLength}</span>/${this.localizedCharacterLengthObj.maxLength}</span>`) : null;
  }
}
k("calcite-text-area", _);
export {
  _ as TextArea
};
