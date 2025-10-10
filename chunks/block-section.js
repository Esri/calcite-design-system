import { b as u, L as x, c as g, s as c, x as n, z as b, q as m } from "./index.js";
import { i as f } from "./keyed.js";
import { s as $ } from "./dom.js";
import { i as k } from "./key.js";
import { g as h } from "./component.js";
import { u as S } from "./useT9n.js";
import { l as w } from "./logger.js";
import { u as y } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  content: "content",
  toggle: "toggle"
}, e = {
  chevronIcon: "chevron-icon",
  content: "content",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  invalid: "invalid",
  sectionHeaderText: "section-header__text",
  statusIcon: "status-icon",
  switch: "switch",
  toggle: "toggle",
  toggleContainer: "toggle-container",
  toggleSwitchContent: "toggle--switch__content",
  toggleSwitchText: "toggle--switch__text",
  valid: "valid"
}, p = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, E = u`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;display:block;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2))}:host([expanded]){border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-block-section-border-color, var(--calcite-color-border-3))}:host([expanded]) .toggle{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .chevron-icon{color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}:host([expanded]) .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host(:last-child){border-block-end-width:0px}:host([scale=s]) .toggle{padding-block:var(--calcite-spacing-xxs);gap:var(--calcite-spacing-sm);font-size:var(--calcite-font-size-sm)}:host([scale=s]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-xxs))}:host([scale=m]) .toggle{padding-block:var(--calcite-spacing-sm);gap:var(--calcite-spacing-md);font-size:var(--calcite-font-size)}:host([scale=m]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-sm))}:host([scale=l]) .toggle{padding-block:var(--calcite-spacing-md);gap:var(--calcite-spacing-lg);font-size:var(--calcite-font-size-md)}:host([scale=l]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-md))}.toggle{display:flex;inline-size:100%;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;border-width:0px;font-family:var(--calcite-font-family);outline-color:transparent;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, var(--calcite-color-foreground-1));font-weight:var(--calcite-font-weight-regular);padding-inline:0;line-height:var(--calcite-font-line-height-relative-snug)}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);z-index:var(--calcite-z-index)}.toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.section-header__text{margin-block:0px;flex:1 1 auto;text-align:initial;word-wrap:anywhere}.toggle-container{position:relative;display:flex;align-items:center;word-break:break-word}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}.toggle-container .icon--end:hover,.toggle-container .icon--start:hover,.toggle-container .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.status-icon{display:flex;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends x {
  constructor() {
    super(...arguments), this.messages = S(), this.focusSetter = y()(this), this.defaultSlotHasElements = !1, this.expanded = !1, this.scale = "m", this.toggleDisplay = "button", this.calciteBlockSectionCollapse = g({ cancelable: !1 }), this.calciteBlockSectionExpand = g({ cancelable: !1 }), this.calciteBlockSectionToggle = g({ cancelable: !1 });
  }
  static {
    this.properties = { defaultSlotHasElements: 16, expanded: 7, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], messageOverrides: 0, open: 7, scale: 3, status: 3, text: 1, toggleDisplay: 3 };
  }
  static {
    this.styles = E;
  }
  get open() {
    return this.expanded;
  }
  set open(t) {
    w.deprecated("property", {
      name: "open",
      removalVersion: 4,
      suggested: "expanded"
    }), this.expanded = t;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  willUpdate(t) {
    t.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockSectionExpand.emit() : this.calciteBlockSectionCollapse.emit());
  }
  handleHeaderKeyDown(t) {
    k(t.key) && (this.toggleSection(), t.preventDefault(), t.stopPropagation());
  }
  toggleSection() {
    this.expanded = !this.expanded, this.calciteBlockSectionToggle.emit();
  }
  handleDefaultSlot(t) {
    this.defaultSlotHasElements = $(t);
  }
  renderStatusIcon() {
    const { status: t } = this, o = p[t] ?? !1, a = {
      [e.statusIcon]: !0,
      [e.valid]: t == "valid",
      [e.invalid]: t == "invalid"
    };
    return o ? n`<calcite-icon class=${c(a)} .icon=${o} .scale=${h(this.scale)}></calcite-icon>` : null;
  }
  renderIcon(t) {
    const { iconFlipRtl: o, iconStart: a, iconEnd: l } = this;
    if ((t === "start" ? a : l) === void 0)
      return null;
    const s = o === "both" || o === "start", d = o === "both" || o === "end", r = t === "start";
    return f(r ? a : l, n`<calcite-icon class=${c(r ? e.iconStart : e.iconEnd)} .flipRtl=${r ? s : d} .icon=${r ? a : l} .scale=${h(this.scale)}></calcite-icon>`);
  }
  render() {
    const { messages: t, expanded: o, text: a, toggleDisplay: l } = this, v = o ? p.menuExpanded : p.menuCollapsed, s = o ? t.collapse : t.expand, d = l === "switch" ? n`<div class=${c({
      [e.toggleContainer]: !0
    })}><div aria-controls=${i.content} .ariaExpanded=${o} class=${c({
      [e.toggle]: !0
    })} id=${i.toggle} @click=${this.toggleSection} @keydown=${this.handleHeaderKeyDown} role=button tabindex=0 title=${s ?? b}>${this.renderIcon("start")}<div class=${c(e.toggleSwitchContent)}><span class=${c(e.toggleSwitchText)}>${a}</span></div>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-switch .checked=${o} class=${c(e.switch)} inert .label=${s} .scale=${this.scale}></calcite-switch></div></div>` : n`<div class=${c({
      [e.toggleContainer]: !0
    })}><button aria-controls=${i.content} .ariaExpanded=${o} class=${c({
      [e.toggle]: !0
    })} id=${i.toggle} @click=${this.toggleSection}>${this.renderIcon("start")}<span class=${c(e.sectionHeaderText)}>${a}</span>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-icon class=${c(e.chevronIcon)} .icon=${v} .scale=${h(this.scale)}></calcite-icon></button></div>`;
    return n`${d}<section aria-labelledby=${i.toggle} class=${c({ [e.content]: this.defaultSlotHasElements })} .hidden=${!o} id=${i.content}><slot @slotchange=${this.handleDefaultSlot}></slot></section>`;
  }
}
m("calcite-block-section", I);
export {
  I as BlockSection
};
