import { h as u, L as x, u as v, k as d, n as b, y as r, s, x as c, j as y } from "./iframe.js";
import { l as z } from "./live.js";
import { e as L, n as m } from "./ref.js";
import { c as E, d as $, H as w } from "./form.js";
import { c as k, d as A, g as C } from "./label.js";
import { s as g } from "./dom.js";
import { n as h } from "./locale.js";
import { c as S } from "./observers.js";
import { c as O } from "./component.js";
import { u as H, I } from "./interactive.js";
import { g as T } from "./guid.js";
import { V as M } from "./Validation.js";
import { s as W } from "./input.js";
import { u as F } from "./useT9n.js";
import { t as j } from "./throttle.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
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
  textAreaOnly: "text-area--only"
}, f = {
  validationMessage: "textAreaValidationMessage"
}, p = {
  footerStart: "footer-start",
  footerEnd: "footer-end"
}, R = 100, V = u`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;block-size:100%;inline-size:100%;--calcite-internal-text-area-border-color: var(--calcite-text-area-border-color, var(--calcite-color-border-input));--calcite-internal-text-area-footer-border-color: var( --calcite-text-area-footer-border-color, var(--calcite-internal-text-area-border-color) )}.text-area,.footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));background-color:var(--calcite-text-area-background-color, var(--calcite-color-foreground-1));padding-block:var(--calcite-spacing-sm);padding-inline:var(--calcite-spacing-md)}.text-area{position:relative;margin:0;box-sizing:border-box;display:block;inline-size:100%;font-family:var(--calcite-font-family);--calcite-internal-text-area-border-block-end-color: var(--calcite-internal-text-area-border-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-border-color);border-block-end-color:var(--calcite-internal-text-area-border-block-end-color);color:var(--calcite-text-area-text-color, var(--calcite-color-text-1));font-family:var(--calcite-sans-family);max-block-size:var(--calcite-text-area-max-height);min-block-size:var(--calcite-text-area-min-height);max-inline-size:var(--calcite-text-area-max-width);min-inline-size:var(--calcite-text-area-min-width, 12rem)}.text-area::placeholder{font-weight:var(--calcite-font-weight-normal)}@media screen and (max-width: 480px){.text-area{resize:none}}.text-area:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.text-area--invalid{--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}.text-area.text-area--invalid:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.footer--slotted{min-inline-size:18rem}.text-area:not(.text-area--only,.text-area--invalid){--calcite-internal-text-area-border-block-end-color: var( --calcite-text-area-divider-color, var(--calcite-color-border-3) )}.footer{box-sizing:border-box;display:flex;align-items:center;border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-footer-border-color);border-block-start:var(--calcite-border-width-none);min-block-size:2.25rem}.character-limit{display:flex;align-items:center;justify-content:flex-end;white-space:nowrap;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));font-weight:var(--calcite-font-weight-regular);color:var(--calcite-text-area-character-limit-text-color, var(--calcite-color-text-2));padding-inline-start:var(--calcite-spacing-md)}.character--over-limit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-status-danger)}.readonly{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium)}.content,.hide{display:none}.container{display:flex;inline-size:100%;justify-content:space-between}.footer--end-only{justify-content:flex-end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.text-area.text-area--only{block-size:100%}:host([resize=none]) .text-area{resize:none}:host([resize=horizontal]) .text-area{resize:horizontal}:host([resize=vertical]) .text-area{resize:vertical}:host([scale=s]) .text-area,:host([scale=s]) .footer,:host([scale=s]) .character-limit{padding-inline-start:.5rem;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--2))}:host([scale=s]) .footer{min-block-size:1.75rem}:host([scale=s]) .text-area{padding-block:.25rem;padding-inline:.5rem}:host([scale=m]) .text-area{padding-block:.5rem;padding-inline:.75rem}:host([scale=m]) .footer{padding-block:.5rem;padding-inline:.75rem;min-block-size:2.25rem}:host([scale=l]) .text-area,:host([scale=l]) .footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0));padding-block:var(--calcite-spacing-md);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .footer{min-block-size:2.75rem}:host([scale=l]) .text-area,:host([scale=l]) .footer,:host([scale=l]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0));padding-inline-start:var(--calcite-spacing-lg)}:host([status=invalid]){--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}:host([status=invalid]) .text-area:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([disabled]) .text-area,:host([disabled]) .footer{opacity:var(--calcite-opacity-half)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends x {
  constructor() {
    super(...arguments), this.attributeWatch = v(["autofocus", "spellcheck"], this.handleGlobalAttributesChanged), this.footerEl = L(), this.guid = T(), this.resizeObserver = S("resize", async () => {
      await this.componentOnReady();
      const { textAreaHeight: e, textAreaWidth: t, elHeight: i, elWidth: l, footerHeight: n, footerWidth: o } = this.getHeightAndWidthOfElements();
      o > 0 && o !== t && (this.footerEl.value.style.width = `${t}px`), (l !== t || i !== e + (n || 0)) && this.setHeightAndWidthToAuto();
    }), this.setHeightAndWidthToAuto = j(() => {
      (this.resize === "vertical" || this.resize === "both") && (this.el.style.height = "auto"), (this.resize === "horizontal" || this.resize === "both") && (this.el.style.width = "auto");
    }, R, { leading: !1 }), this.disabled = !1, this.groupSeparator = !1, this.limitText = !1, this.messages = F({ blocking: !0 }), this.readOnly = !1, this.required = !1, this.resize = "both", this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.value = "", this.wrap = "soft", this.calciteTextAreaChange = d(), this.calciteTextAreaInput = d();
  }
  static {
    this.properties = { endSlotHasElements: 16, startSlotHasElements: 16, columns: 11, disabled: 7, form: 3, groupSeparator: 7, label: 1, limitText: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, numberingSystem: 1, placeholder: 1, readOnly: 7, required: 7, resize: 3, rows: 11, scale: 3, status: 3, validationIcon: [3, { converter: b }], validationMessage: 1, validity: 0, value: 1, wrap: 3 };
  }
  static {
    this.styles = V;
  }
  // #endregion
  // #region Public Methods
  /** Selects the text of the component's `value`. */
  async selectText() {
    await this.componentOnReady(), this.textAreaEl.select();
  }
  /** Sets focus on the component. */
  async setFocus() {
    await O(this), this.textAreaEl.focus();
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), k(this), E(this);
  }
  updated() {
    H(this), this.setTextAreaHeight();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), A(this), $(this), this.resizeObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
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
    e.setCustomValidity(""), this.isCharacterLimitExceeded() && e.setCustomValidity(this.replacePlaceholdersInMessages()), W("textarea", this, e);
  }
  setTextAreaEl(e) {
    e && (this.textAreaEl = e, this.resizeObserver?.observe(e));
  }
  setTextAreaHeight() {
    const { textAreaHeight: e, elHeight: t, footerHeight: i } = this.getHeightAndWidthOfElements();
    i > 0 && e + i != t && (this.textAreaEl.style.height = `${t - i}px`);
  }
  getHeightAndWidthOfElements() {
    const { height: e, width: t } = this.textAreaEl.getBoundingClientRect(), { height: i, width: l } = this.el.getBoundingClientRect(), { height: n, width: o } = this.footerEl.value ? this.footerEl.value.getBoundingClientRect() : { height: 0, width: 0 };
    return {
      textAreaHeight: e,
      textAreaWidth: t,
      elHeight: i,
      elWidth: l,
      footerHeight: n,
      footerWidth: o
    };
  }
  replacePlaceholdersInMessages() {
    return this.messages.tooLong.replace("{maxLength}", this.localizedCharacterLengthObj.maxLength).replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }
  isCharacterLimitExceeded() {
    return this.value?.length > this.maxLength;
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    return I({ disabled: this.disabled, children: c`<textarea aria-describedby=${this.guid ?? r} aria-errormessage=${f.validationMessage} .ariaInvalid=${this.status === "invalid" || this.isCharacterLimitExceeded()} .ariaLabel=${C(this)} .autofocus=${this.el.autofocus} class=${s({
      [a.textArea]: !0,
      [a.readOnly]: this.readOnly,
      [a.textAreaInvalid]: this.isCharacterLimitExceeded(),
      [a.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
      [a.textAreaOnly]: !e
    })} .cols=${this.columns} .disabled=${this.disabled} maxlength=${(this.limitText ? this.maxLength : void 0) ?? r} name=${this.name ?? r} @change=${this.handleChange} @input=${this.handleInput} placeholder=${this.placeholder ?? r} .readOnly=${this.readOnly} .required=${this.required} .rows=${this.rows} spellcheck=${this.el.spellcheck ?? r} .value=${z(this.value ?? "")} wrap=${this.wrap ?? r} ${m(this.setTextAreaEl)}></textarea><span class=${s({ [a.content]: !0 })}><slot @slotchange=${this.contentSlotChangeHandler}></slot></span><footer class=${s({
      [a.footer]: !0,
      [a.readOnly]: this.readOnly,
      [a.hide]: !e
    })} ${m(this.footerEl)}><div class=${s({
      [a.container]: !0,
      [a.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements
    })}><slot name=${p.footerStart} @slotchange=${(t) => this.startSlotHasElements = g(t)}></slot><slot name=${p.footerEnd} @slotchange=${(t) => this.endSlotHasElements = g(t)}></slot></div>${this.renderCharacterLimit()}</footer>${w({ component: this })}${this.isCharacterLimitExceeded() && c`<span aria-live=polite class=${s(a.assistiveText)} id=${this.guid ?? r}>${this.replacePlaceholdersInMessages()}</span>` || ""}${this.validationMessage && this.status === "invalid" ? M({ icon: this.validationIcon, id: f.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderCharacterLimit() {
    return this.maxLength ? (this.localizedCharacterLengthObj = this.getLocalizedCharacterLength(), c`<span class=${s(a.characterLimit)}><span class=${s({ [a.characterOverLimit]: this.isCharacterLimitExceeded() })}>${this.localizedCharacterLengthObj.currentLength}</span>/${this.localizedCharacterLengthObj.maxLength}</span>`) : null;
  }
}
y("calcite-text-area", q);
export {
  q as TextArea
};
