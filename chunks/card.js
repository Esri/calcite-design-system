import { b as d, L as h, c as s, s as a, x as c, q as p } from "./index.js";
import { e as b, n as u } from "./ref.js";
import { s as o } from "./dom.js";
import { u as g, I as f } from "./interactive.js";
import { i as m } from "./key.js";
import { u as v } from "./useT9n.js";
import { u as x } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  container: "container",
  contentWrapper: "content-wrapper",
  header: "header",
  footer: "footer",
  checkboxWrapper: "checkbox-wrapper",
  checkboxWrapperDeprecated: "checkbox-wrapper-deprecated",
  thumbnailWrapper: "thumbnail-wrapper",
  headerTextContainer: "header-text-container",
  cardContent: "card-content",
  hasSlottedContent: "has-slotted-content"
}, i = {
  thumbnail: "thumbnail",
  heading: "heading",
  description: "description",
  footerStart: "footer-start",
  footerEnd: "footer-end",
  title: "title",
  subtitle: "subtitle"
}, n = {
  selected: "check-square-f",
  unselected: "square",
  selectedSingle: "circle-f",
  unselectedSingle: "circle"
}, k = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;max-inline-size:100%}.content-wrapper{position:relative;display:flex;block-size:100%;flex-direction:column;justify-content:space-between;overflow:hidden;border:var(--calcite-border-width-sm) solid var(--calcite-card-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-card-corner-radius, var(--calcite-corner-radius-sharp));background-color:var(--calcite-card-background-color, var(--calcite-color-foreground-1));box-shadow:var(--calcite-card-shadow, var(--calcite-shadow-none));pointer-events:none}::slotted(*){pointer-events:auto}:host(:not([selectable])) .content-wrapper:not(.non-interactive){outline-color:transparent}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container{position:relative;display:flex;flex:1 1 auto;flex-direction:column}:host([loading]) .content-wrapper *:not(calcite-loader):not(.calcite-card-loader-container){pointer-events:none;opacity:0}:host([loading]) .calcite-card-loader-container{position:absolute;inset:0;display:flex;align-items:center}.header{display:flex;flex-direction:row;align-items:flex-start}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:var(--calcite-spacing-md);padding-block-start:var(--calcite-spacing-xxs);padding-block-end:var(--calcite-spacing-md)}.header-text-container{display:flex;inline-size:100%;flex-direction:column;justify-content:center;padding-inline:.75rem;padding-block:.5rem}.header-text-container:not(:only-child){padding-inline-end:.125rem}.footer{margin-block-start:auto;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:.75rem;padding-block:.25rem .75rem}.card-content{block-size:auto;font-size:var(--calcite-font-size--2);line-height:1.375}.has-slotted-content{padding:.75rem}:host([selected]) .content-wrapper{box-shadow:inset 0 -4px 0 0 var(--calcite-card-accent-color-selected, var(--calcite-color-brand))}:host([selectable]) .header{padding-inline-end:var(--calcite-spacing-xxxl)}slot[name=title]::slotted(*),*::slotted([slot=title]){margin:0;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){margin:0;margin-block-start:.125rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}slot[name=heading]::slotted(*),*::slotted([slot=heading]){margin:0;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=description]::slotted(*),*::slotted([slot=description]){margin:0;margin-block-start:.125rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){min-inline-size:100%;max-inline-size:100%}slot[name=footer-start]::slotted(*),*::slotted([slot=footer-start]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375;margin-inline-end:auto}slot[name=footer-end]::slotted(*),*::slotted([slot=footer-end]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375}.checkbox-wrapper-deprecated{pointer-events:auto;position:absolute;inset-block-start:var(--calcite-spacing-sm);inset-inline-end:var(--calcite-spacing-sm);margin:0;padding:0;color:var(--calcite-card-selection-color, var(--calcite-color-text-3))}.checkbox-wrapper-deprecated:hover{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}.checkbox-wrapper-deprecated:active{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press))}.checkbox-wrapper{pointer-events:auto;margin:.5rem;cursor:pointer;padding:.5rem;outline-color:transparent;display:flex;align-items:center;justify-items:center;color:var(--calcite-card-selection-color, var(--calcite-color-text-3))}.checkbox-wrapper:hover{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}.checkbox-wrapper:active{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press))}.checkbox-wrapper calcite-icon{pointer-events:none}:host([selected]) .checkbox-wrapper-deprecated,:host([selected]) .checkbox-wrapper{color:var(--calcite-card-accent-color-selected, var(--calcite-card-selection-icon-color-selected, var(--calcite-color-brand)))}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper-deprecated,:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-card-selection-color-hover, var(--calcite-card-selection-icon-color-hover, var(--calcite-color-text-2)))}:host([selected]:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper-deprecated,:host([selected]:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-press, var(--calcite-color-transparent-press));color:var(--calcite-card-accent-color-selected, var(--calcite-card-selection-icon-color-selected, var(--calcite-color-brand)))}.thumbnail-wrapper{display:flex}.content-wrapper.inline{flex-direction:row}.content-wrapper.inline>.container{inline-size:60%}.content-wrapper.inline>.thumbnail-wrapper{inline-size:40%;align-items:flex-start}.content-wrapper.inline slot[name=thumbnail]::slotted(img),.content-wrapper.inline img::slotted([slot=thumbnail]){inline-size:100%}slot[name=footer-start]::slotted(*),slot[name=footer-end]::slotted(*){display:flex;gap:.25rem}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class w extends h {
  constructor() {
    super(...arguments), this.containerRef = b(), this.messages = v(), this.focusSetter = x()(this), this.hasContent = !1, this.hasDescription = !1, this.hasFooterEnd = !1, this.hasFooterStart = !1, this.hasHeading = !1, this.hasSubtitle = !1, this.hasThumbnail = !1, this.hasTitle = !1, this.disabled = !1, this.loading = !1, this.selectable = !1, this.selected = !1, this.selectionMode = "none", this.thumbnailPosition = "block-start", this.calciteCardSelect = s({ cancelable: !1 }), this.calciteInternalCardKeyEvent = s({ cancelable: !1 });
  }
  static {
    this.properties = { hasContent: 16, hasDescription: 16, hasFooterEnd: 16, hasFooterStart: 16, hasHeading: 16, hasSubtitle: 16, hasThumbnail: 16, hasTitle: 16, disabled: 7, label: 1, loading: 7, messageOverrides: 0, selectable: 7, selected: 7, selectionMode: 1, thumbnailPosition: 3 };
  }
  static {
    this.styles = k;
  }
  async setFocus(e) {
    return this.focusSetter(() => ({ target: this.containerRef.value, includeContainer: !0 }), e);
  }
  updated() {
    g(this);
  }
  handleThumbnailSlotChange(e) {
    this.hasThumbnail = o(e);
  }
  handleHeadingSlotChange(e) {
    this.hasHeading = o(e);
  }
  handleDescriptionSlotChange(e) {
    this.hasDescription = o(e);
  }
  handleTitleSlotChange(e) {
    this.hasTitle = o(e);
  }
  handleSubtitleSlotChange(e) {
    this.hasSubtitle = o(e);
  }
  handleFooterStartSlotChange(e) {
    this.hasFooterStart = o(e);
  }
  handleFooterEndSlotChange(e) {
    this.hasFooterEnd = o(e);
  }
  handleDefaultSlotChange(e) {
    this.hasContent = o(e);
  }
  keyDownHandler(e) {
    if (e.target === this.containerRef.value && !this.selectable && !this.disabled)
      if (m(e.key) && this.selectionMode !== "none")
        this.calciteCardSelect.emit(), e.preventDefault();
      else
        switch (e.key) {
          case "ArrowRight":
          case "ArrowLeft":
          case "Home":
          case "End":
            this.calciteInternalCardKeyEvent.emit(e), e.preventDefault();
            break;
        }
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
    return c`<section class=${a(t.thumbnailWrapper)} .hidden=${!this.hasThumbnail}><slot name=${i.thumbnail} @slotchange=${this.handleThumbnailSlotChange}></slot></section>`;
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" && this.selected ? n.selected : this.selectionMode === "multiple" ? n.unselected : this.selected ? n.selectedSingle : n.unselectedSingle;
    return c`<div class=${a(t.checkboxWrapper)} @pointerdown=${this.cardSelectClick} tabindex=-1><calcite-icon .icon=${e} scale=s></calcite-icon></div>`;
  }
  renderHeader() {
    const e = this.hasHeading || this.hasDescription, r = this.hasSubtitle || this.hasTitle, l = e || r;
    return c`<header class=${a(t.header)} .hidden=${!l}>${this.selectable ? this.renderCheckboxDeprecated() : null}<div class=${a(t.headerTextContainer)}><slot name=${i.heading} @slotchange=${this.handleHeadingSlotChange}></slot><slot name=${i.description} @slotchange=${this.handleDescriptionSlotChange}></slot><slot name=${i.title} @slotchange=${this.handleTitleSlotChange}></slot><slot name=${i.subtitle} @slotchange=${this.handleSubtitleSlotChange}></slot></div>${this.selectionMode !== "none" && this.renderSelectionIcon() || ""}</header>`;
  }
  renderFooter() {
    const e = this.hasFooterStart || this.hasFooterEnd;
    return c`<footer class=${a(t.footer)} .hidden=${!e}><slot name=${i.footerStart} @slotchange=${this.handleFooterStartSlotChange}></slot><slot name=${i.footerEnd} @slotchange=${this.handleFooterEndSlotChange}></slot></footer>`;
  }
  render() {
    const e = this.thumbnailPosition.startsWith("inline"), r = this.thumbnailPosition.endsWith("start"), l = this.selectionMode === "multiple" ? "checkbox" : this.selectionMode !== "none" ? "radio" : void 0;
    return f({ disabled: this.disabled, children: c`<div .ariaChecked=${this.selectionMode !== "none" ? this.selected : void 0} .ariaLabel=${this.label} class=${a({ [t.contentWrapper]: !0, inline: e })} @click=${this.cardBodyClickHandler} @keydown=${this.keyDownHandler} .role=${l} .tabIndex=${!this.selectable || this.disabled ? 0 : -1} ${u(this.containerRef)}>${this.loading ? c`<div aria-live=polite class="calcite-card-loader-container"><calcite-loader .label=${this.messages.loading}></calcite-loader></div>` : null}${r && this.renderThumbnail() || ""}<section .ariaBusy=${this.loading} class=${a({ [t.container]: !0 })}>${this.renderHeader()}<div class=${a({
      [t.cardContent]: !0,
      [t.hasSlottedContent]: this.hasContent
    })}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div>${this.renderFooter()}</section>${!r && this.renderThumbnail() || ""}</div>` });
  }
}
p("calcite-card", w);
export {
  w as Card
};
