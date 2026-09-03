/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as s, L as d, c as h, s as a, b as c, d as p } from "./index.js";
import { e as v, n as g } from "./ref.js";
import { g as b } from "./component.js";
import { s as i } from "./dom.js";
import { i as f } from "./key.js";
import { u as m } from "./useT9n.js";
import { u } from "./useSetFocus.js";
import { u as x } from "./useInteractive.js";
import { C as t, S as r, I as n } from "./resources11.js";
const k = s`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;max-inline-size:100%}:host([scale=s]){--calcite-internal-card-header-text-container-padding-inline: var(--calcite-space-sm);--calcite-internal-card-header-text-container-padding-block: var(--calcite-space-xs);--calcite-internal-card-header-text-container-padding-right: 0;--calcite-internal-card-heading-font-size: var(--calcite-font-size-relative-sm);--calcite-internal-card-description-font-size: var(--calcite-font-size-relative-xs);--calcite-internal-card-checkbox-wrapper-padding: var(--calcite-space-xs);--calcite-internal-card-checkbox-wrapper-margin: var(--calcite-space-xs);--calcite-internal-card-slotted-content-padding: var(--calcite-space-sm);--calcite-internal-card-footer-padding-inline: var(--calcite-space-sm);--calcite-internal-card-footer-start-end-gap: var(--calcite-space-base)}:host([scale=m]){--calcite-internal-card-header-text-container-padding-inline: var(--calcite-space-md);--calcite-internal-card-header-text-container-padding-block: var(--calcite-space-sm);--calcite-internal-card-header-text-container-padding-right: var(--calcite-space-base);--calcite-internal-card-heading-font-size: var(--calcite-font-size-relative-base);--calcite-internal-card-description-font-size: var(--calcite-font-size-relative-sm);--calcite-internal-card-checkbox-wrapper-padding: var(--calcite-space-sm);--calcite-internal-card-checkbox-wrapper-margin: var(--calcite-space-sm);--calcite-internal-card-slotted-content-padding: var(--calcite-space-md);--calcite-internal-card-footer-padding-inline: var(--calcite-space-md);--calcite-internal-card-footer-start-end-gap: var(--calcite-space-2xs)}:host([scale=l]){--calcite-internal-card-header-text-container-padding-inline: var(--calcite-space-lg);--calcite-internal-card-header-text-container-padding-block: var(--calcite-space-md);--calcite-internal-card-header-text-container-padding-right: var(--calcite-space-xs);--calcite-internal-card-heading-font-size: var(--calcite-font-size-relative-md);--calcite-internal-card-description-font-size: var(--calcite-font-size-relative-base);--calcite-internal-card-checkbox-wrapper-padding: var(--calcite-space-md);--calcite-internal-card-checkbox-wrapper-margin: var(--calcite-space-md);--calcite-internal-card-slotted-content-padding: var(--calcite-space-lg);--calcite-internal-card-footer-padding-inline: var(--calcite-space-lg);--calcite-internal-card-footer-start-end-gap: var(--calcite-space-sm)}.content-wrapper{position:relative;display:flex;block-size:100%;flex-direction:column;justify-content:space-between;overflow:hidden;border:var(--calcite-border-width-sm) solid var(--calcite-card-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-card-corner-radius, var(--calcite-corner-radius-sharp));background-color:var(--calcite-card-background-color, var(--calcite-color-foreground-1));box-shadow:var(--calcite-card-shadow, var(--calcite-shadow-none));pointer-events:none}::slotted(*){pointer-events:auto}:host(:not([selectable])) .content-wrapper:not(.non-interactive){outline-color:transparent}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container{position:relative;display:flex;flex:1 1 auto;flex-direction:column}:host([loading]) .content-wrapper *:not(calcite-loader):not(.calcite-card-loader-container){pointer-events:none;opacity:0}:host([loading]) .calcite-card-loader-container{position:absolute;inset:0;display:flex;align-items:center}.header{display:flex;flex-direction:row;align-items:flex-start}.header-text-container{display:flex;flex-direction:column;inline-size:100%;justify-content:center;padding-inline:var(--calcite-internal-card-header-text-container-padding-inline);padding-block:var(--calcite-internal-card-header-text-container-padding-block)}.header-text-container:not(:only-child){padding-inline-end:var(--calcite-internal-card-header-text-container-padding-right)}.footer{display:flex;margin-block-start:auto;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:var(--calcite-internal-card-footer-padding-inline);padding-block-start:var(--calcite-space-2xs);padding-block-end:var(--calcite-space-md)}.card-content{block-size:auto;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}.has-slotted-content{padding:var(--calcite-internal-card-slotted-content-padding)}:host([selected]) .content-wrapper{border:1px solid var(--calcite-card-accent-color-selected, var(--calcite-color-brand))}:host([selectable]) .header{padding-inline-end:var(--calcite-spacing-xxxl)}slot[name=heading]::slotted(*),*::slotted([slot=heading]){color:var(--calcite-color-text-1);margin:0;font-weight:var(--calcite-font-weight-medium);line-height:var(--calcite-font-line-height-relative-snug);font-size:var(--calcite-internal-card-heading-font-size)}slot[name=description]::slotted(*),*::slotted([slot=description]){color:var(--calcite-color-text-2);margin:0;font-weight:var(--calcite-font-weight-normal);line-height:var(--calcite-font-line-height-relative-snug);font-size:var(--calcite-internal-card-description-font-size)}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){min-inline-size:100%;max-inline-size:100%}slot[name=footer-start]::slotted(*),*::slotted([slot=footer-start]){align-self:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);margin-inline-end:auto}slot[name=footer-end]::slotted(*),*::slotted([slot=footer-end]){align-self:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}.checkbox-wrapper-deprecated{pointer-events:auto;position:absolute;inset-block-start:var(--calcite-spacing-sm);inset-inline-end:var(--calcite-spacing-sm);margin:0;padding:0;color:var(--calcite-card-selection-color, var(--calcite-color-text-3))}.checkbox-wrapper-deprecated:hover{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}.checkbox-wrapper-deprecated:active{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press))}.checkbox-wrapper{outline-color:transparent;cursor:pointer;pointer-events:auto;display:flex;align-items:center;justify-items:center;color:var(--calcite-card-selection-color, var(--calcite-color-text-3));padding:var(--calcite-internal-card-checkbox-wrapper-padding);margin:var(--calcite-internal-card-checkbox-wrapper-margin)}.checkbox-wrapper:hover{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}.checkbox-wrapper:active{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press))}.checkbox-wrapper calcite-icon{pointer-events:none}:host([selected]) .checkbox-wrapper-deprecated,:host([selected]) .checkbox-wrapper{color:var(--calcite-card-accent-color-selected, var(--calcite-card-selection-icon-color-selected, var(--calcite-color-brand)))}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper-deprecated,:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}:host([selected]:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper-deprecated,:host([selected]:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press));color:var(--calcite-card-accent-color-selected, var(--calcite-card-selection-icon-color-selected, var(--calcite-color-brand)))}.thumbnail-wrapper{display:flex}.content-wrapper.inline{flex-direction:row}.content-wrapper.inline>.container{inline-size:60%}.content-wrapper.inline>.thumbnail-wrapper{inline-size:40%;align-items:flex-start}.content-wrapper.inline slot[name=thumbnail]::slotted(img),.content-wrapper.inline img::slotted([slot=thumbnail]){inline-size:100%}slot[name=footer-start]::slotted(*),slot[name=footer-end]::slotted(*){display:flex;gap:var(--calcite-internal-card-footer-start-end-gap)}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class w extends d {
  constructor() {
    super(...arguments), this.containerRef = v(), this.messages = m(), this.focusSetter = u()(this), this.interactiveContainer = x(this), this.hasContent = !1, this.hasDescription = !1, this.hasFooterEnd = !1, this.hasFooterStart = !1, this.hasHeading = !1, this.hasThumbnail = !1, this.disabled = !1, this.loading = !1, this.scale = "m", this.selectable = !1, this.selected = !1, this.selectionMode = "none", this.thumbnailPosition = "block-start", this.calciteCardSelect = h({ cancelable: !1 });
  }
  static {
    this.properties = { hasContent: 16, hasDescription: 16, hasFooterEnd: 16, hasFooterStart: 16, hasHeading: 16, hasThumbnail: 16, disabled: 7, label: 1, loading: 7, messageOverrides: 0, scale: 3, selectable: 7, selected: 7, selectionMode: 1, thumbnailPosition: 3 };
  }
  static {
    this.styles = k;
  }
  async setFocus(e) {
    return this.focusSetter(() => ({ target: this.containerRef.value, includeContainer: !0 }), e);
  }
  handleThumbnailSlotChange(e) {
    this.hasThumbnail = i(e);
  }
  handleHeadingSlotChange(e) {
    this.hasHeading = i(e);
  }
  handleDescriptionSlotChange(e) {
    this.hasDescription = i(e);
  }
  handleFooterStartSlotChange(e) {
    this.hasFooterStart = i(e);
  }
  handleFooterEndSlotChange(e) {
    this.hasFooterEnd = i(e);
  }
  handleDefaultSlotChange(e) {
    this.hasContent = i(e);
  }
  keyDownHandler(e) {
    e.target === this.containerRef.value && !this.selectable && !this.disabled && f(e.key) && this.selectionMode !== "none" && (this.calciteCardSelect.emit(), e.preventDefault());
  }
  cardBodyClickHandler(e) {
    e.target === this.containerRef.value && !this.selectable && !this.disabled && this.selectionMode !== "none" && this.calciteCardSelect.emit();
  }
  selectCardDeprecated(e) {
    this.selected = e.currentTarget.checked, this.calciteCardSelect.emit();
  }
  cardSelectClick(e) {
    this.disabled || (e.preventDefault(), this.calciteCardSelect.emit(), this.setFocus());
  }
  renderCheckboxDeprecated() {
    return c`<calcite-label class=${a(t.checkboxWrapperDeprecated)}><calcite-checkbox .checked=${this.selected} .label=${this.messages.select} @calciteCheckboxChange=${this.selectCardDeprecated}></calcite-checkbox></calcite-label>`;
  }
  renderThumbnail() {
    return c`<section class=${a(t.thumbnailWrapper)} .hidden=${!this.hasThumbnail}><slot name=${r.thumbnail} @slotchange=${this.handleThumbnailSlotChange}></slot></section>`;
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" && this.selected ? n.selected : this.selectionMode === "multiple" ? n.unselected : this.selected ? n.selectedSingle : n.unselectedSingle;
    return c`<div class=${a(t.checkboxWrapper)} @pointerdown=${this.cardSelectClick} tabindex=-1><calcite-icon .icon=${e} .scale=${b(this.scale)}></calcite-icon></div>`;
  }
  renderHeader() {
    const e = this.hasHeading || this.hasDescription;
    return c`<header class=${a(t.header)} .hidden=${!e}>${this.selectable ? this.renderCheckboxDeprecated() : null}<div class=${a(t.headerTextContainer)}><slot name=${r.heading} @slotchange=${this.handleHeadingSlotChange}></slot><slot name=${r.description} @slotchange=${this.handleDescriptionSlotChange}></slot></div>${this.selectionMode !== "none" && this.renderSelectionIcon() || ""}</header>`;
  }
  renderFooter() {
    const e = this.hasFooterStart || this.hasFooterEnd;
    return c`<footer class=${a(t.footer)} .hidden=${!e}><slot name=${r.footerStart} @slotchange=${this.handleFooterStartSlotChange}></slot><slot name=${r.footerEnd} @slotchange=${this.handleFooterEndSlotChange}></slot></footer>`;
  }
  render() {
    const e = this.thumbnailPosition.startsWith("inline"), o = this.thumbnailPosition.endsWith("start"), l = this.selectionMode === "multiple" ? "checkbox" : this.selectionMode !== "none" ? "radio" : void 0;
    return this.interactiveContainer({ disabled: this.disabled, children: c`<div .ariaChecked=${this.selectionMode !== "none" ? this.selected : void 0} .ariaLabel=${this.label} class=${a({ [t.contentWrapper]: !0, inline: e })} @click=${this.cardBodyClickHandler} @keydown=${this.keyDownHandler} .role=${l} .tabIndex=${!this.selectable || this.disabled ? 0 : -1} ${g(this.containerRef)}>${this.loading ? c`<div aria-live=polite class="calcite-card-loader-container"><calcite-loader .label=${this.messages.loading}></calcite-loader></div>` : null}${o && this.renderThumbnail() || ""}<section .ariaBusy=${this.loading} class=${a({ [t.container]: !0 })}>${this.renderHeader()}<div class=${a({
      [t.cardContent]: !0,
      [t.hasSlottedContent]: this.hasContent
    })}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div>${this.renderFooter()}</section>${!o && this.renderThumbnail() || ""}</div>` });
  }
}
p("calcite-card", w);
export {
  w as Card
};
