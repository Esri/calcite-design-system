import { b as C, L as E, c as l, s as c, x as i, E as k, C as y, q as A } from "./index.js";
import { i as u } from "./keyed.js";
import { e as w, n as I } from "./ref.js";
import { c as x, s as d, a as T } from "./dom.js";
import { g as v } from "./component.js";
import { u as P } from "./useSetFocus.js";
import { u as D } from "./useT9n.js";
import { H } from "./Heading.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end",
  contentEnd: "content-end",
  contentStart: "content-start"
}, t = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  content: "content",
  description: "description",
  expandIcon: "expand-icon",
  header: "header",
  headerContainer: "header-container",
  headerContent: "header-content",
  headerText: "header-text",
  headerAppearance: (r) => `header--${r}`,
  heading: "heading",
  icon: "icon",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  iconPosition: (r) => `icon-position--${r}`,
  iconType: (r) => `icon-type--${r}`,
  item: "item",
  slotContentEnd: "slot-content-end",
  slotContentStart: "slot-content-start"
}, h = {
  section: "section",
  sectionToggle: "section-toggle"
}, m = {
  chevronDown: "chevronDown",
  caretDown: "caretDown",
  plus: "plus",
  minus: "minus"
}, z = C`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}.icon-position--end,.icon-position--start{--calcite-internal-accordion-item-icon-rotation: -90deg ;--calcite-internal-accordion-item-active-icon-rotation: 0deg;--calcite-internal-accordion-item-icon-rotation-rtl: 90deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: 0deg}:host{position:relative;display:flex;flex-direction:column;text-decoration-line:none;color:var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-3)));background-color:var(--calcite-accordion-background-color, var(--calcite-accordion-item-background-color));border-width:0}:host .header{background-color:var(--calcite-accordion-item-header-background-color)}:host .header:hover{background-color:var(--calcite-internal-accordion-item-header-background-color-hover)}:host .header:active{background-color:var(--calcite-internal-accordion-item-header-background-color-press)}.header--solid{--calcite-internal-accordion-item-header-background-color-hover: var( --calcite-accordion-item-header-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-accordion-item-header-background-color-press: var( --calcite-accordion-item-header-background-color-press, var(--calcite-color-foreground-3) )}.header--transparent{--calcite-internal-accordion-item-header-background-color-hover: var( --calcite-accordion-item-header-background-color-hover, var(--calcite-color-transparent-hover) );--calcite-internal-accordion-item-header-background-color-press: var( --calcite-accordion-item-header-background-color-press, var(--calcite-color-transparent-press) )}.icon-position--start{--calcite-internal-accordion-item-flex-direction: row-reverse;--calcite-internal-accordion-item-icon-spacing-start: 0;--calcite-internal-accordion-item-icon-spacing-end: var(--calcite-internal-accordion-icon-margin)}.icon-position--end{--calcite-internal-accordion-item-flex-direction: row;--calcite-internal-accordion-item-icon-spacing-start: var(--calcite-internal-accordion-icon-margin);--calcite-internal-accordion-item-icon-spacing-end: 0}.icon-position--end:not(.icon-type--plus-minus){--calcite-internal-accordion-item-icon-rotation: 0deg;--calcite-internal-accordion-item-active-icon-rotation: 180deg;--calcite-internal-accordion-item-icon-rotation-rtl: 0deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: -180deg }.content,.header{border-block-end-width:var(--calcite-border-width-sm);border-block-end-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-accordion-item-border-color, var(--calcite-color-border-2)))}.header-content{padding:var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem))}.content{padding:var(--calcite-accordion-item-content-space, var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem)))}.header{display:flex;align-items:stretch}.header-content,.header-container,.header .actions-start,.header .actions-end{display:flex;align-items:center;transition-timing-function:cubic-bezier(.4,0,.2,1);word-wrap:break-word;word-break:break-word}.header-content{flex-grow:1;cursor:pointer;outline-color:transparent;flex-direction:var(--calcite-internal-accordion-item-flex-direction);color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color, inherit))}.header-content:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content:focus,.header-content:hover,.header-content:active{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-hover))}.header-content:focus .heading,.header-content:hover .heading,.header-content:active .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-press))}.header-container{inline-size:100%}.slot-content-end{margin-inline-start:var(--calcite-internal-accordion-icon-margin)}.slot-content-start{margin-inline-end:var(--calcite-internal-accordion-icon-margin)}.header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;margin-inline-end:auto}.heading,.description{display:flex;inline-size:100%}.heading{margin:0;padding:0;font-weight:var(--calcite-font-weight-medium)}:host([scale=s]) .heading{font-size:var(--calcite-font-size--2)}:host([scale=m]) .heading{font-size:var(--calcite-font-size--1)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-0)}.actions-start ::slotted(calcite-action),.actions-end ::slotted(calcite-action){align-self:stretch}.icon{display:flex;align-items:center;transition-timing-function:cubic-bezier(.4,0,.2,1);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-end)}.icon--start{color:var(--calcite-accordion-item-icon-color-start, var(--calcite-accordion-item-start-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin)}.icon--end{color:var(--calcite-accordion-item-icon-color-end, var(--calcite-accordion-item-end-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin);margin-inline-start:var(--calcite-internal-accordion-icon-margin)}.expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-3))));margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-internal-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-icon-rotation-rtl))}.description{margin-block-start:.25rem}.content{display:none;text-align:initial}:host(:not([expanded])) .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-hover, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2))))}:host([expanded]){color:var(--calcite-accordion-text-color-press, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-1))))}:host([expanded]) .header{border-block-end-color:transparent}:host([expanded]) .expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-text-color-hover, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2))))));transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation-rtl))}:host([expanded]) .description{color:var(--calcite-accordion-text-color-hover, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2)))))}:host([expanded]) .content{display:block}@media (forced-colors: active){:host([expanded]) .header{border-block-end:none}:host([expanded]) .heading{font-weight:bolder}.header-content:hover .heading,.header-content:focus .heading{text-decoration:underline}}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends E {
  constructor() {
    super(), this.headerRef = w(), this.focusSetter = P()(this), this.messages = D(), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.expanded = !1, this.calciteAccordionItemCollapse = l({ cancelable: !1 }), this.calciteAccordionItemExpand = l({ cancelable: !1 }), this.calciteInternalAccordionItemClose = l({ cancelable: !1 }), this.calciteInternalAccordionItemSelect = l({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listenOn(document.body, "calciteInternalAccordionChange", this.updateActiveItemOnChange), this.listenOn(document, "calciteInternalAccordionItemsSync", this.accordionItemSyncHandler);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, hasContentEnd: 16, hasContentStart: 16, accordionParent: 0, description: 1, expanded: 7, heading: 1, iconEnd: [3, { type: String }], iconFlipRtl: 3, appearance: 1, headingLevel: 11, iconPosition: 1, iconStart: [3, { type: String }], iconType: 1, scale: 3, messageOverrides: 0 };
  }
  static {
    this.styles = z;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.headerRef.value, e);
  }
  willUpdate(e) {
    e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteAccordionItemExpand.emit() : this.calciteAccordionItemCollapse.emit());
  }
  keyDownHandler(e) {
    if (e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.emitRequestedItem(), e.preventDefault();
          break;
      }
  }
  updateActiveItemOnChange(e) {
    const [n] = e.composedPath(), a = x(this.el, "calcite-accordion");
    n === a && (this.determineActiveItem(a.selectionMode, e.detail.requestedAccordionItem), e.stopPropagation());
  }
  accordionItemSyncHandler(e) {
    const [n] = e.composedPath(), a = this.el;
    if (a.parentElement === n)
      return;
    const o = x(a, "calcite-accordion");
    n === o && (this.appearance = o.appearance, this.iconPosition = o.iconPosition, this.iconType = o.iconType, this.scale = o.scale, e.stopPropagation());
  }
  handleActionsStartSlotChange(e) {
    this.hasActionsStart = d(e);
  }
  handleActionsEndSlotChange(e) {
    this.hasActionsEnd = d(e);
  }
  handleContentEndSlotChange(e) {
    this.hasContentEnd = d(e);
  }
  handleContentStartSlotChange(e) {
    this.hasContentStart = d(e);
  }
  itemHeaderClickHandler() {
    this.emitRequestedItem();
  }
  determineActiveItem(e, n) {
    switch (e) {
      case "multiple":
        this.el === n && (this.expanded = !this.expanded);
        break;
      case "single":
        this.expanded = this.el === n ? !this.expanded : !1;
        break;
      case "single-persist":
        this.expanded = this.el === n;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteInternalAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  renderActionsStart() {
    return i`<div class=${c(t.actionsStart)} .hidden=${!this.hasActionsStart}><slot name=${s.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`;
  }
  renderActionsEnd() {
    return i`<div class=${c(t.actionsEnd)} .hidden=${!this.hasActionsEnd}><slot name=${s.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>`;
  }
  renderContentEnd() {
    return i`<div class=${c(t.slotContentEnd)} .hidden=${!this.hasContentEnd}><slot name=${s.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  renderContentStart() {
    return i`<div class=${c(t.slotContentStart)} .hidden=${!this.hasContentStart}><slot name=${s.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  render() {
    const { iconFlipRtl: e, heading: n, headingLevel: a, messages: p, expanded: o } = this, f = T(this.el), b = o ? p.collapse : p.expand, S = this.iconStart ? u("icon-start", i`<calcite-icon class=${c({ [t.icon]: !0, [t.iconStart]: !0 })} .flipRtl=${e === "both" || e === "start"} .icon=${this.iconStart} .scale=${v(this.scale)}></calcite-icon>`) : null, $ = this.iconEnd ? u("icon-end", i`<calcite-icon class=${c({ [t.iconEnd]: !0, [t.icon]: !0 })} .flipRtl=${e === "both" || e === "end"} .icon=${this.iconEnd} .scale=${v(this.scale)}></calcite-icon>`) : null, { description: g } = this;
    return i`<div class=${c({
      [t.iconPosition(this.iconPosition)]: !0,
      [t.iconType(this.iconType)]: !0
    })}><div class=${c({
      [t.header]: !0,
      [y.rtl]: f === "rtl",
      [t.headerAppearance(this.appearance)]: !0
    })}>${this.renderActionsStart()}<div aria-controls=${h.section} .ariaExpanded=${o} class=${c(t.headerContent)} id=${h.sectionToggle} @click=${this.itemHeaderClickHandler} role=button tabindex=0 ${I(this.headerRef)}><div class=${c(t.headerContainer)}>${this.renderContentStart()}${S}<div class=${c(t.headerText)}>${H({ class: t.heading, level: a, children: n })}${g ? i`<span class=${c(t.description)}>${g}</span>` : null}</div>${$}${this.renderContentEnd()}</div><calcite-icon class=${c(t.expandIcon)} .icon=${this.iconType === "chevron" ? m.chevronDown : this.iconType === "caret" ? m.caretDown : o ? m.minus : m.plus} .scale=${v(this.scale)} title=${b ?? k}></calcite-icon></div>${this.renderActionsEnd()}</div><section aria-labelledby=${h.sectionToggle} class=${c(t.content)} id=${h.section}><slot></slot></section></div>`;
  }
}
A("calcite-accordion-item", R);
export {
  R as AccordionItem
};
