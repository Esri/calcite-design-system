import { a as g, L as x, d as s, s as t, x as a, C as u, c as b } from "./iframe.js";
import { i as h } from "./keyed.js";
import { n as f } from "./ref.js";
import { c as m, s as p, g as $ } from "./dom.js";
import { c as k, g as l } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const v = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end"
}, c = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  content: "content",
  description: "description",
  expandIcon: "expand-icon",
  header: "header",
  headerContainer: "header-container",
  headerContent: "header-content",
  headerText: "header-text",
  heading: "heading",
  icon: "icon",
  iconEnd: "icon--end",
  iconStart: "icon--start"
}, r = {
  section: "section",
  sectionToggle: "section-toggle"
}, S = g`.icon-position--end,.icon-position--start{--calcite-internal-accordion-item-icon-rotation: -90deg ;--calcite-internal-accordion-item-active-icon-rotation: 0deg;--calcite-internal-accordion-item-icon-rotation-rtl: 90deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: 0deg}:host{position:relative;display:flex;flex-direction:column;text-decoration-line:none;color:var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-3)));background-color:var(--calcite-accordion-background-color, var(--calcite-accordion-item-background-color));border-width:0}:host .header{background-color:var(--calcite-accordion-item-header-background-color)}:host .header:hover{background-color:var(--calcite-internal-accordion-item-header-background-color-hover)}:host .header:active{background-color:var(--calcite-internal-accordion-item-header-background-color-press)}.header--solid{--calcite-internal-accordion-item-header-background-color-hover: var( --calcite-accordion-item-header-background-color-hover, var(--calcite-color-foreground-2) );--calcite-internal-accordion-item-header-background-color-press: var( --calcite-accordion-item-header-background-color-press, var(--calcite-color-foreground-3) )}.header--transparent{--calcite-internal-accordion-item-header-background-color-hover: var( --calcite-accordion-item-header-background-color-hover, var(--calcite-color-transparent-hover) );--calcite-internal-accordion-item-header-background-color-press: var( --calcite-accordion-item-header-background-color-press, var(--calcite-color-transparent-press) )}.icon-position--start{--calcite-internal-accordion-item-flex-direction: row-reverse;--calcite-internal-accordion-item-icon-spacing-start: 0;--calcite-internal-accordion-item-icon-spacing-end: var(--calcite-internal-accordion-icon-margin)}.icon-position--end{--calcite-internal-accordion-item-flex-direction: row;--calcite-internal-accordion-item-icon-spacing-start: var(--calcite-internal-accordion-icon-margin);--calcite-internal-accordion-item-icon-spacing-end: 0}.icon-position--end:not(.icon-type--plus-minus){--calcite-internal-accordion-item-icon-rotation: 0deg;--calcite-internal-accordion-item-active-icon-rotation: 180deg;--calcite-internal-accordion-item-icon-rotation-rtl: 0deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: -180deg }.content,.header{border-block-end-width:var(--calcite-border-width-sm);border-block-end-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-accordion-item-border-color, var(--calcite-color-border-2)))}.header-content{padding:var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem))}.content{padding:var(--calcite-accordion-item-content-space, var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem)))}.header{display:flex;align-items:stretch}.header-content,.header-container,.header .actions-start,.header .actions-end{display:flex;align-items:center;transition-timing-function:cubic-bezier(.4,0,.2,1);word-wrap:break-word;word-break:break-word}.header-content{flex-grow:1;cursor:pointer;outline-color:transparent;flex-direction:var(--calcite-internal-accordion-item-flex-direction);color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color, inherit))}.header-content:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content:focus,.header-content:hover,.header-content:active{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-hover))}.header-content:focus .heading,.header-content:hover .heading,.header-content:active .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-press))}.header-container{inline-size:100%}.header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;margin-inline-end:auto}.heading,.description{display:flex;inline-size:100%}.heading{font-weight:var(--calcite-font-weight-medium)}.actions-start ::slotted(calcite-action),.actions-end ::slotted(calcite-action){align-self:stretch}.icon{display:flex;align-items:center;transition-timing-function:cubic-bezier(.4,0,.2,1);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-end)}.icon--start{color:var(--calcite-accordion-item-icon-color-start, var(--calcite-accordion-item-start-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin)}.icon--end{color:var(--calcite-accordion-item-icon-color-end, var(--calcite-accordion-item-end-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin);margin-inline-start:var(--calcite-internal-accordion-icon-margin)}.expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-3))));margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-internal-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-icon-rotation-rtl))}.description{margin-block-start:.25rem}.content{display:none;text-align:initial}:host(:not([expanded])) .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-hover, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2))))}:host([expanded]){color:var(--calcite-accordion-text-color-press, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-color-text-1))))}:host([expanded]) .header{border-block-end-color:transparent}:host([expanded]) .expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-text-color-hover, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2))))));transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation-rtl))}:host([expanded]) .description{color:var(--calcite-accordion-text-color-hover, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2)))))}:host([expanded]) .content{display:block}@media (forced-colors: active){:host([expanded]) .header{border-block-end:none}:host([expanded]) .heading{font-weight:bolder}.header-content:hover .heading,.header-content:focus .heading{text-decoration:underline}}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends x {
  constructor() {
    super(), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.expanded = !1, this.calciteInternalAccordionItemClose = s({ cancelable: !1 }), this.calciteInternalAccordionItemSelect = s({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listenOn(document.body, "calciteInternalAccordionChange", this.updateActiveItemOnChange), this.listenOn(document, "calciteInternalAccordionItemsSync", this.accordionItemSyncHandler);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, accordionParent: 0, description: 1, expanded: 7, heading: 1, iconEnd: 3, iconFlipRtl: 3, appearance: 1, iconPosition: 1, iconStart: 3, iconType: 1, scale: 1 };
  }
  static {
    this.styles = S;
  }
  async setFocus() {
    await k(this), this.headerEl.focus();
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
    const [i] = e.composedPath(), n = m(this.el, "calcite-accordion");
    i === n && (this.determineActiveItem(n.selectionMode, e.detail.requestedAccordionItem), e.stopPropagation());
  }
  accordionItemSyncHandler(e) {
    const [i] = e.composedPath(), n = this.el;
    if (n.parentElement === i)
      return;
    const o = m(n, "calcite-accordion");
    i === o && (this.appearance = o.appearance, this.iconPosition = o.iconPosition, this.iconType = o.iconType, this.scale = o.scale, e.stopPropagation());
  }
  handleActionsStartSlotChange(e) {
    this.hasActionsStart = p(e);
  }
  handleActionsEndSlotChange(e) {
    this.hasActionsEnd = p(e);
  }
  storeHeaderEl(e) {
    this.headerEl = e;
  }
  itemHeaderClickHandler() {
    this.emitRequestedItem();
  }
  determineActiveItem(e, i) {
    switch (e) {
      case "multiple":
        this.el === i && (this.expanded = !this.expanded);
        break;
      case "single":
        this.expanded = this.el === i ? !this.expanded : !1;
        break;
      case "single-persist":
        this.expanded = this.el === i;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteInternalAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  renderActionsStart() {
    return a`<div class=${t(c.actionsStart)} .hidden=${!this.hasActionsStart}><slot name=${v.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`;
  }
  renderActionsEnd() {
    return a`<div class=${t(c.actionsEnd)} .hidden=${!this.hasActionsEnd}><slot name=${v.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>`;
  }
  render() {
    const { iconFlipRtl: e } = this, i = $(this.el), n = this.iconStart ? h("icon-start", a`<calcite-icon class=${t({ [c.icon]: !0, [c.iconStart]: !0 })} .flipRtl=${e === "both" || e === "start"} .icon=${this.iconStart} .scale=${l(this.scale)}></calcite-icon>`) : null, d = this.iconEnd ? h("icon-end", a`<calcite-icon class=${t({ [c.iconEnd]: !0, [c.icon]: !0 })} .flipRtl=${e === "both" || e === "end"} .icon=${this.iconEnd} .scale=${l(this.scale)}></calcite-icon>`) : null, { description: o } = this;
    return a`<div class=${t({
      [`icon-position--${this.iconPosition}`]: !0,
      [`icon-type--${this.iconType}`]: !0
    })}><div class=${t({
      [c.header]: !0,
      [u.rtl]: i === "rtl",
      [`header--${this.appearance}`]: !0
    })}>${this.renderActionsStart()}<div aria-controls=${r.section} .ariaExpanded=${this.expanded} class=${t(c.headerContent)} id=${r.sectionToggle} @click=${this.itemHeaderClickHandler} role=button tabindex=0 ${f(this.storeHeaderEl)}><div class=${t(c.headerContainer)}>${n}<div class=${t(c.headerText)}><span class=${t(c.heading)}>${this.heading}</span>${o ? a`<span class=${t(c.description)}>${o}</span>` : null}</div>${d}</div><calcite-icon class=${t(c.expandIcon)} .icon=${this.iconType === "chevron" ? "chevronDown" : this.iconType === "caret" ? "caretDown" : this.expanded ? "minus" : "plus"} .scale=${l(this.scale)}></calcite-icon></div>${this.renderActionsEnd()}</div><section aria-labelledby=${r.sectionToggle} class=${t(c.content)} id=${r.section}><slot></slot></section></div>`;
  }
}
b("calcite-accordion-item", y);
export {
  y as AccordionItem
};
