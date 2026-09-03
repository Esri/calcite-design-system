/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as z, L as y, c as m, T as w, s as r, b as o, I as l, d as k } from "./index.js";
import { l as S } from "./live.js";
import { t as L } from "./throttle.js";
import { e as u, n as d } from "./ref.js";
import { b as C } from "./index2.js";
import { g as $ } from "./label.js";
import { u as E } from "./useLabel.js";
import { s as x } from "./dom.js";
import { n as h } from "./locale.js";
import { c as A, u as O } from "./observers.js";
import { g as T } from "./guid.js";
import { I as H } from "./InternalLabel.js";
import { V as I } from "./Validation.js";
import { u as R } from "./useT9n.js";
import { u as M } from "./useCancelable.js";
import { u as W } from "./useSetFocus.js";
import { u as j } from "./useInteractive.js";
import { u as q } from "./useForm.js";
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
  wrapper: "wrapper",
  loaderContainer: "loader-container",
  loader: "loader"
}, v = {
  validationMessage: "textAreaValidationMessage"
}, f = {
  footerStart: "footer-start",
  footerEnd: "footer-end"
}, F = 100, g = Object.freeze({ height: 0, width: 0 }), D = z`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:inline-block;block-size:100%;inline-size:100%;--calcite-internal-text-area-border-color: var(--calcite-text-area-border-color, var(--calcite-color-border-input));--calcite-internal-text-area-footer-border-color: var( --calcite-text-area-footer-border-color, var(--calcite-internal-text-area-border-color) );--calcite-internal-text-area-corner-radius: var( --calcite-text-area-corner-radius, var(--calcite-corner-radius-default) );--calcite-internal-text-area-shadow: var(--calcite-text-area-shadow, var(--calcite-shadow-none));--calcite-internal-text-area-footer-background-color: var( --calcite-text-area-footer-background-color, var(--calcite-text-area-background-color, var(--calcite-color-foreground-1)) );min-block-size:var(--calcite-text-area-min-height, calc(2 * var(--calcite-internal-text-area-padding-block) + 2 * var(--calcite-border-width-sm)));min-inline-size:var(--calcite-text-area-min-width, 12rem)}.wrapper{box-sizing:border-box;block-size:100%;inline-size:100%;box-shadow:var(--calcite-internal-text-area-shadow);border-radius:var(--calcite-internal-text-area-corner-radius)}.text-area,.footer{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));padding-block:var(--calcite-internal-text-area-padding-block);padding-inline:var(--calcite-internal-text-area-padding-inline)}.footer{background-color:var(--calcite-internal-text-area-footer-background-color);border-radius:0 0 var(--calcite-internal-text-area-corner-radius) var(--calcite-internal-text-area-corner-radius)}.text-area{position:relative;margin:0;box-sizing:border-box;display:block;inline-size:100%;--calcite-internal-text-area-border-block-end-color: var(--calcite-internal-text-area-border-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-border-color);border-block-end-color:var(--calcite-internal-text-area-border-block-end-color);color:var(--calcite-text-area-text-color, var(--calcite-color-text-1));font-family:inherit;line-height:var(--calcite-font-line-height-base);max-block-size:var(--calcite-text-area-max-height);min-block-size:calc(var(--calcite-text-area-min-height, 0px) - var(--calcite-internal-text-area-footer-min-height, 0px));max-inline-size:var(--calcite-text-area-max-width);min-inline-size:var(--calcite-text-area-min-width, 12rem);background-color:var(--calcite-text-area-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-internal-text-area-corner-radius) var(--calcite-internal-text-area-corner-radius) 0 0}.text-area::placeholder{font-weight:var(--calcite-font-weight-normal)}@media screen and (max-width:480px){.text-area{resize:none}}.text-area:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.text-area--invalid{--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}.text-area.text-area--invalid:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.text-area.footer--slotted{min-inline-size:18rem}.text-area.text-area--only{border-radius:var(--calcite-internal-text-area-corner-radius)}.text-area:not(.text-area--only,.text-area--invalid){--calcite-internal-text-area-border-block-end-color: var( --calcite-text-area-divider-color, var(--calcite-color-border-3) )}.loader-container{position:relative;block-size:inherit}.loader{position:absolute;inset-block-start:0;inset-block-start:var(--calcite-spacing-px);inset-inline:var(--calcite-spacing-px)}.footer{box-sizing:border-box;display:flex;align-items:center;line-height:var(--calcite-font-line-height-base);border:var(--calcite-border-width-sm) solid var(--calcite-internal-text-area-footer-border-color);border-block-start:var(--calcite-border-width-none);min-block-size:var(--calcite-internal-text-area-footer-min-height)}.character-limit{display:flex;align-items:center;justify-content:flex-end;white-space:nowrap;font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--1));font-weight:var(--calcite-font-weight-regular);color:var(--calcite-text-area-character-limit-text-color, var(--calcite-color-text-2));padding-inline-start:var(--calcite-spacing-md)}.character--over-limit{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-status-danger)}.readonly{background-color:var(--calcite-text-area-background-color, var(--calcite-color-background));font-weight:var(--calcite-font-weight-medium)}.footer.readonly{background-color:var(--calcite-internal-text-area-footer-background-color, var(--calcite-color-background))}.content,.hide{display:none}.container{display:flex;inline-size:100%;justify-content:space-between}.footer--end-only{justify-content:flex-end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.text-area.text-area--only{block-size:100%;min-block-size:var(--calcite-text-area-min-height, 0)}:host([resize=none]) .text-area{resize:none}:host([resize=horizontal]) .text-area{resize:horizontal}:host([resize=vertical]) .text-area{resize:vertical}:host([scale=s]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-xxs);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-sm);--calcite-internal-text-area-footer-min-height: 1.75rem}:host([scale=s]) .text-area,:host([scale=s]) .footer,:host([scale=s]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size--2))}:host([scale=s]) .character-limit{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-sm);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-md);--calcite-internal-text-area-footer-min-height: 2.25rem}:host([scale=l]){--calcite-internal-text-area-padding-block: var(--calcite-spacing-md);--calcite-internal-text-area-padding-inline: var(--calcite-spacing-lg);--calcite-internal-text-area-footer-min-height: 2.75rem}:host([scale=l]) .text-area,:host([scale=l]) .footer,:host([scale=l]) .character-limit{font-size:var(--calcite-text-area-font-size, var(--calcite-font-size-0))}:host([scale=l]) .character-limit{padding-inline-start:var(--calcite-spacing-lg)}:host([status=invalid]){--calcite-internal-text-area-border-color: var(--calcite-color-status-danger)}:host([status=invalid]) .text-area:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([disabled]) .text-area,:host([disabled]) .footer{opacity:var(--calcite-opacity-half)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-text-area-placeholder-text-color, var(--calcite-color-text-3))}`;
class N extends y {
  constructor() {
    super(), this.attributeWatch = C(["autofocus", "spellcheck"], this.handleGlobalAttributesChanged), this.footerRef = u(), this.loaderContainerRef = u(), this.formSupport = q({
      inputType: "text"
    })(this), this.guid = T(), this.resizeObserver = A("resize", async () => {
      await this.componentOnReady();
      const { textAreaHeight: e, textAreaWidth: t, loaderHeight: i, elWidth: c, footerHeight: n, footerWidth: s } = this.getHeightAndWidthOfElements();
      if (s > 0 && s !== t && (this.footerRef.value.style.width = `${t}px`), this.resize === "none")
        return;
      const { width: p, height: b } = getComputedStyle(this.el);
      this.dimensionsDiffer(c, t) && p !== "auto" && this.updateSizeToAuto("width"), i > 0 && e > 0 && n > 0 && this.dimensionsDiffer(i, e + n) && b !== "auto" && this.updateSizeToAuto("height");
    }), this.cancelable = M()(this), this.updateSizeToAuto = L((e) => {
      this.el.style[e] = "auto";
    }, F, { edges: ["trailing"] }), this.messages = R({ blocking: !0 }), this.focusSetter = W()(this), this.interactiveContainer = j(this), this.endSlotHasElements = !1, this.startSlotHasElements = !1, this.disabled = !1, this.groupSeparator = !1, this.limitText = !1, this.loading = !1, this.readOnly = !1, this.required = !1, this.resize = "both", this.scale = "m", this.status = "idle", this.value = "", this.wrap = "soft", this.calciteTextAreaChange = m(), this.calciteTextAreaInput = m(), E(this);
  }
  static {
    this.properties = { endSlotHasElements: 16, startSlotHasElements: 16, columns: 11, disabled: 7, form: 3, groupSeparator: 7, label: 1, labelText: 1, limitText: 7, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, numberingSystem: 1, placeholder: 1, readOnly: 7, required: 7, resize: 3, rows: 11, scale: 3, status: 3, validationIcon: [3, { converter: w }], validationMessage: 1, validity: 32, value: 1, wrap: 3 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = D;
  }
  async selectText() {
    await this.componentOnReady(), this.textAreaEl?.select();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.textAreaEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.cancelable.add(this.updateSizeToAuto);
  }
  willUpdate(e) {
    let t = !1;
    (e.has("messages") || e.has("numberingSystem") || e.has("groupSeparator")) && (t = !0), (e.has("value") || e.has("maxLength") || t) && (this.updateNumberFormatter(), this.localizedCharacterLengthObj = this.getLocalizedCharacterLength(), this.formSupport.setCustomValidity(this.isCharacterLimitExceeded() ? this.replacePlaceholdersInMessages() : ""));
  }
  updated() {
    this.setTextAreaHeight();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  dimensionsDiffer(e, t) {
    return Math.abs(e - t) > 1;
  }
  updateNumberFormatter() {
    h.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator
    };
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
      t.nodeName === "#text" && t.nodeValue && (this.value = t.nodeValue.trim());
    });
  }
  getLocalizedCharacterLength() {
    const e = this.value?.length.toString() || "0", t = this.maxLength?.toString() || "0";
    return this.numberingSystem === "latn" ? { currentLength: e, maxLength: t } : {
      currentLength: h.localize(e),
      maxLength: h.localize(t)
    };
  }
  setTextAreaEl(e) {
    O(this.resizeObserver, this.textAreaEl, e), this.textAreaEl = e;
  }
  setTextAreaHeight() {
    const { textAreaHeight: e, loaderHeight: t, footerHeight: i } = this.getHeightAndWidthOfElements();
    t <= 0 || e <= 0 || i <= 0 || this.dimensionsDiffer(e + i, t) && (this.textAreaEl.style.height = `${t - i}px`);
  }
  getHeightAndWidthOfElements() {
    const { height: e, width: t } = this.textAreaEl ? this.textAreaEl.getBoundingClientRect() : g, { height: i } = this.loaderContainerRef.value ? this.loaderContainerRef.value.getBoundingClientRect() : g, { width: c } = this.el.getBoundingClientRect(), { height: n, width: s } = this.footerRef.value ? this.footerRef.value.getBoundingClientRect() : g;
    return {
      textAreaHeight: e,
      textAreaWidth: t,
      loaderHeight: i,
      elWidth: c,
      footerHeight: n,
      footerWidth: s
    };
  }
  replacePlaceholdersInMessages() {
    return this.messages.tooLong.replace("{maxLength}", this.localizedCharacterLengthObj.maxLength).replace("{currentLength}", this.localizedCharacterLengthObj.currentLength);
  }
  isCharacterLimitExceeded() {
    return this.maxLength !== void 0 && this.value?.length > this.maxLength || !1;
  }
  render() {
    const e = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength, t = o`<div class=${r(a.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`;
    return this.interactiveContainer({ disabled: this.disabled, children: o`<div class=${r(a.wrapper)}>${this.labelText && H({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${r(a.loaderContainer)} ${d(this.loaderContainerRef)}>${this.loading ? t : null}<textarea aria-describedby=${this.guid ?? l} aria-errormessage=${v.validationMessage} .ariaInvalid=${this.status === "invalid" || this.isCharacterLimitExceeded()} .ariaLabel=${$(this)} .autofocus=${this.el.autofocus} class=${r({
      [a.textArea]: !0,
      [a.readOnly]: this.readOnly,
      [a.textAreaInvalid]: this.isCharacterLimitExceeded(),
      [a.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
      [a.textAreaOnly]: !e
    })} .cols=${this.columns} .disabled=${this.disabled} maxlength=${(this.limitText ? this.maxLength : void 0) ?? l} name=${this.name ?? l} @change=${this.handleChange} @input=${this.handleInput} placeholder=${this.placeholder ?? l} .readOnly=${this.readOnly} .required=${this.required} .rows=${this.rows} spellcheck=${this.el.spellcheck ?? l} .value=${S(this.value ?? "")} wrap=${this.wrap ?? l} ${d(this.setTextAreaEl)}></textarea><span class=${r({ [a.content]: !0 })}><slot @slotchange=${this.contentSlotChangeHandler}></slot></span><footer class=${r({
      [a.footer]: !0,
      [a.readOnly]: this.readOnly,
      [a.hide]: !e
    })} ${d(this.footerRef)}><div class=${r({
      [a.container]: !0,
      [a.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements
    })}><slot name=${f.footerStart} @slotchange=${(i) => this.startSlotHasElements = x(i)}></slot><slot name=${f.footerEnd} @slotchange=${(i) => this.endSlotHasElements = x(i)}></slot></div>${this.renderCharacterLimit()}</footer>${this.isCharacterLimitExceeded() && o`<span aria-live=polite class=${r(a.assistiveText)} id=${this.guid ?? l}>${this.replacePlaceholdersInMessages()}</span>` || ""}</div>${this.validationMessage && this.status === "invalid" ? I({ icon: this.validationIcon, id: v.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}</div>` });
  }
  renderCharacterLimit() {
    return this.maxLength ? o`<span class=${r(a.characterLimit)}><span class=${r({ [a.characterOverLimit]: this.isCharacterLimitExceeded() })}>${this.localizedCharacterLengthObj.currentLength}</span>/${this.localizedCharacterLengthObj.maxLength}</span>` : null;
  }
}
k("calcite-text-area", N);
export {
  N as TextArea
};
