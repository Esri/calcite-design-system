import { h as g, L as x, k as s, s as i, x as a, C as u, j as f } from "./iframe.js";
import { i as h } from "./keyed.js";
import { n as b } from "./ref.js";
import { c as m, s as p, g as $ } from "./dom.js";
import { c as S, g as l } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const v = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end"
}, e = {
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
}, y = g`.icon-position--end,.icon-position--start{--calcite-internal-accordion-item-icon-rotation: -90deg ;--calcite-internal-accordion-item-active-icon-rotation: 0deg;--calcite-internal-accordion-item-icon-rotation-rtl: 90deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: 0deg}:host{position:relative;display:flex;flex-direction:column;text-decoration-line:none;color:var(--calcite-accordion-item-text-color, var(--calcite-accordion-text-color, var(--calcite-color-text-3)));background-color:var(--calcite-accordion-item-background-color);border-width:0}:host .header{background-color:var(--calcite-accordion-item-header-background-color)}.icon-position--start{--calcite-internal-accordion-item-flex-direction: row-reverse;--calcite-internal-accordion-item-icon-spacing-start: 0;--calcite-internal-accordion-item-icon-spacing-end: var(--calcite-internal-accordion-icon-margin)}.icon-position--end{--calcite-internal-accordion-item-flex-direction: row;--calcite-internal-accordion-item-icon-spacing-start: var(--calcite-internal-accordion-icon-margin);--calcite-internal-accordion-item-icon-spacing-end: 0}.icon-position--end:not(.icon-type--plus-minus){--calcite-internal-accordion-item-icon-rotation: 0deg;--calcite-internal-accordion-item-active-icon-rotation: 180deg;--calcite-internal-accordion-item-icon-rotation-rtl: 0deg;--calcite-internal-accordion-item-active-icon-rotation-rtl: -180deg }.content,.header{border-block-end-width:var(--calcite-border-width-sm);border-block-end-style:solid;border-color:var(--calcite-accordion-item-border-color, var(--calcite-accordion-border-color, var(--calcite-color-border-2)))}.header-content{padding:var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem))}.content{padding:var(--calcite-accordion-item-content-space, var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, .5rem .75rem)))}.header{display:flex;align-items:stretch}.header-content,.header-container,.header .actions-start,.header .actions-end{display:flex;align-items:center;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);word-wrap:break-word;word-break:break-word}.header-content{flex-grow:1;cursor:pointer;outline-color:transparent;flex-direction:var(--calcite-internal-accordion-item-flex-direction);color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color, inherit))}.header-content:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.header-content:focus,.header-content:hover,.header-content:active{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-hover, var(--calcite-color-text-2)))}.header-content:focus .heading,.header-content:hover .heading,.header-content:active .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-text-color-pressed, var(--calcite-color-text-1)))}.header-container{inline-size:100%}.header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;margin-inline-end:auto}.heading,.description{display:flex;inline-size:100%}.heading{font-weight:var(--calcite-font-weight-medium)}.actions-start ::slotted(calcite-action),.actions-end ::slotted(calcite-action){align-self:stretch}.icon{display:flex;align-items:center;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-end)}.icon--start{color:var(--calcite-accordion-item-icon-color-start, var(--calcite-accordion-item-start-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin)}.icon--end{color:var(--calcite-accordion-item-icon-color-end, var(--calcite-accordion-item-end-icon-color, var(--calcite-accordion-item-icon-color, currentColor)));margin-inline-end:var(--calcite-internal-accordion-icon-margin);margin-inline-start:var(--calcite-internal-accordion-icon-margin)}.expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-text-color, var(--calcite-color-text-3))));margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-internal-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-icon-rotation-rtl))}.description{margin-block-start:.25rem}.content{display:none;text-align:initial}:host(:not(:focus):not(:hover):not([expanded])) .heading{color:var(--calcite-accordion-item-heading-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2)))}:host([expanded]){color:var(--calcite-accordion-item-text-color, var(--calcite-accordion-text-color, var(--calcite-accordion-text-color-pressed, var(--calcite-color-text-1))))}:host([expanded]) .header{border-block-end-color:transparent}:host([expanded]) .expand-icon{color:var(--calcite-accordion-item-expand-icon-color, var(--calcite-accordion-item-text-color, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2)))));transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation-rtl))}:host([expanded]) .description{color:var(--calcite-accordion-item-text-color, var(--calcite-accordion-text-color, var(--calcite-accordion-item-text-color-hover, var(--calcite-color-text-2))))}:host([expanded]) .content{display:block}@media (forced-colors: active){:host([expanded]) .header{border-block-end:none}:host([expanded]) .heading{font-weight:bolder}.header-content:hover .heading,.header-content:focus .heading{text-decoration:underline}}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends x {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.expanded = !1, this.calciteInternalAccordionItemClose = s({ cancelable: !1 }), this.calciteInternalAccordionItemSelect = s({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listenOn(document.body, "calciteInternalAccordionChange", this.updateActiveItemOnChange), this.listenOn(document, "calciteInternalAccordionItemsSync", this.accordionItemSyncHandler);
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, accordionParent: 0, description: 1, expanded: 7, heading: 1, iconEnd: 3, iconFlipRtl: 3, iconPosition: 1, iconStart: 3, iconType: 1, scale: 1 };
  }
  static {
    this.styles = y;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await S(this), this.headerEl.focus();
  }
  // #endregion
  // #region Private Methods
  keyDownHandler(t) {
    if (t.target === this.el)
      switch (t.key) {
        case " ":
        case "Enter":
          this.emitRequestedItem(), t.preventDefault();
          break;
      }
  }
  updateActiveItemOnChange(t) {
    const [c] = t.composedPath(), o = m(this.el, "calcite-accordion");
    c === o && (this.determineActiveItem(o.selectionMode, t.detail.requestedAccordionItem), t.stopPropagation());
  }
  accordionItemSyncHandler(t) {
    const [c] = t.composedPath(), o = this.el;
    if (o.parentElement === c)
      return;
    const n = m(o, "calcite-accordion");
    c === n && (this.iconPosition = n.iconPosition, this.iconType = n.iconType, this.scale = n.scale, t.stopPropagation());
  }
  handleActionsStartSlotChange(t) {
    this.hasActionsStart = p(t);
  }
  handleActionsEndSlotChange(t) {
    this.hasActionsEnd = p(t);
  }
  storeHeaderEl(t) {
    this.headerEl = t;
  }
  /** handle clicks on item header */
  itemHeaderClickHandler() {
    this.emitRequestedItem();
  }
  determineActiveItem(t, c) {
    switch (t) {
      case "multiple":
        this.el === c && (this.expanded = !this.expanded);
        break;
      case "single":
        this.expanded = this.el === c ? !this.expanded : !1;
        break;
      case "single-persist":
        this.expanded = this.el === c;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteInternalAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  // #endregion
  // #region Rendering
  renderActionsStart() {
    return a`<div class=${i(e.actionsStart)} .hidden=${!this.hasActionsStart}><slot name=${v.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`;
  }
  renderActionsEnd() {
    return a`<div class=${i(e.actionsEnd)} .hidden=${!this.hasActionsEnd}><slot name=${v.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>`;
  }
  render() {
    const { iconFlipRtl: t } = this, c = $(this.el), o = this.iconStart ? h("icon-start", a`<calcite-icon class=${i({ [e.icon]: !0, [e.iconStart]: !0 })} .flipRtl=${t === "both" || t === "start"} .icon=${this.iconStart} .scale=${l(this.scale)}></calcite-icon>`) : null, d = this.iconEnd ? h("icon-end", a`<calcite-icon class=${i({ [e.iconEnd]: !0, [e.icon]: !0 })} .flipRtl=${t === "both" || t === "end"} .icon=${this.iconEnd} .scale=${l(this.scale)}></calcite-icon>`) : null, { description: n } = this;
    return a`<div class=${i({
      [`icon-position--${this.iconPosition}`]: !0,
      [`icon-type--${this.iconType}`]: !0
    })}><div class=${i({ [e.header]: !0, [u.rtl]: c === "rtl" })}>${this.renderActionsStart()}<div aria-controls=${r.section} .ariaExpanded=${this.expanded} class=${i(e.headerContent)} id=${r.sectionToggle} @click=${this.itemHeaderClickHandler} role=button tabindex=0 ${b(this.storeHeaderEl)}><div class=${i(e.headerContainer)}>${o}<div class=${i(e.headerText)}><span class=${i(e.heading)}>${this.heading}</span>${n ? a`<span class=${i(e.description)}>${n}</span>` : null}</div>${d}</div><calcite-icon class=${i(e.expandIcon)} .icon=${this.iconType === "chevron" ? "chevronDown" : this.iconType === "caret" ? "caretDown" : this.expanded ? "minus" : "plus"} .scale=${l(this.scale)}></calcite-icon></div>${this.renderActionsEnd()}</div><section aria-labelledby=${r.sectionToggle} class=${i(e.content)} id=${r.section}><slot></slot></section></div>`;
  }
}
f("calcite-accordion-item", E);
export {
  E as AccordionItem
};
