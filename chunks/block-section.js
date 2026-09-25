/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as u, L as x, c as g, l as b, s as o, b as n, n as m, d as f } from "./index.js";
import { i as k } from "./keyed.js";
import { s as $ } from "./dom.js";
import { i as w } from "./key.js";
import { g as h } from "./component.js";
import { u as S } from "./useT9n.js";
import { u as y } from "./useSetFocus.js";
const i = {
  content: "content",
  toggle: "toggle"
}, t = {
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
}, v = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, E = u`:host{box-sizing:border-box;display:block;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2))}:host([expanded]){border-width:var(--calcite-border-width-none);border-block-end-width:var(--calcite-border-width-sm);border-style:solid;border-block-end-color:var(--calcite-block-section-border-color, var(--calcite-color-border-3))}:host([expanded]) .toggle{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .icon--end,:host([expanded]) .icon--start{color:var(--calcite-block-section-text-color, var(--calcite-color-text-1))}:host([expanded]) .chevron-icon{color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}:host([expanded]) .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle-container:hover calcite-switch{--calcite-switch-background-color: var(--calcite-color-brand-hover)}:host(:last-child){border-block-end-width:var(--calcite-border-width-none)}:host([scale=s]) .toggle{padding-block:var(--calcite-spacing-xxs);gap:var(--calcite-spacing-sm);font-size:var(--calcite-font-size-sm)}:host([scale=s]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-xxs))}:host([scale=m]) .toggle{padding-block:var(--calcite-spacing-sm);gap:var(--calcite-spacing-md);font-size:var(--calcite-font-size)}:host([scale=m]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-sm))}:host([scale=l]) .toggle{padding-block:var(--calcite-spacing-md);gap:var(--calcite-spacing-lg);font-size:var(--calcite-font-size-md)}:host([scale=l]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-spacing-md))}.toggle{outline-color:transparent;display:flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;inline-size:100%;border-width:var(--calcite-border-width-none);font-family:inherit;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, var(--calcite-color-foreground-1));font-weight:var(--calcite-font-weight-regular);padding-inline:0;line-height:var(--calcite-font-line-height-relative-snug)}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));z-index:var(--calcite-z-index)}.toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.section-header__text{margin-block:0;flex:1 1 auto;text-align:initial;overflow-wrap:anywhere}.toggle-container{display:flex;align-items:center;position:relative;word-break:break-word}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}.toggle-container:hover .chevron-icon{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.toggle-container:hover calcite-switch{--calcite-switch-background-color: var(--calcite-color-text-3)}.status-icon{display:flex;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends x {
  constructor() {
    super(...arguments), this.messages = S(), this.focusSetter = y()(this), this.defaultSlotHasElements = !1, this.expanded = !1, this.scale = "m", this.toggleDisplay = "button", this.calciteBlockSectionCollapse = g({ cancelable: !1 }), this.calciteBlockSectionExpand = g({ cancelable: !1 }), this.calciteBlockSectionToggle = g({ cancelable: !1 });
  }
  static {
    this.properties = { defaultSlotHasElements: 16, expanded: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, messageOverrides: 0, open: 7, scale: 3, status: 3, text: 1, toggleDisplay: 3 };
  }
  static {
    this.styles = E;
  }
  get open() {
    return this.expanded;
  }
  set open(e) {
    b.deprecated("property", {
      component: this,
      name: "open",
      removalVersion: 5,
      suggested: "expanded"
    }), this.expanded = e;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockSectionExpand.emit() : this.calciteBlockSectionCollapse.emit());
  }
  handleHeaderKeyDown(e) {
    w(e.key) && (this.toggleSection(), e.preventDefault(), e.stopPropagation());
  }
  toggleSection() {
    this.expanded = !this.expanded, this.calciteBlockSectionToggle.emit();
  }
  handleDefaultSlot(e) {
    this.defaultSlotHasElements = $(e);
  }
  renderStatusIcon() {
    const { status: e } = this, c = e && v[e], a = {
      [t.statusIcon]: !0,
      [t.valid]: e == "valid",
      [t.invalid]: e == "invalid"
    };
    return c ? n`<calcite-icon class=${o(a)} .icon=${c} .scale=${h(this.scale)}></calcite-icon>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: c, iconStart: a, iconEnd: l } = this;
    if ((e === "start" ? a : l) === void 0)
      return null;
    const s = c === "both" || c === "start", d = c === "both" || c === "end", r = e === "start";
    return k(r ? a : l, n`<calcite-icon class=${o(r ? t.iconStart : t.iconEnd)} .flipRtl=${r ? s : d} .icon=${r ? a : l} .scale=${h(this.scale)}></calcite-icon>`);
  }
  render() {
    const { messages: e, expanded: c, text: a, toggleDisplay: l } = this, p = c ? v.menuExpanded : v.menuCollapsed, s = c ? e.collapse : e.expand, d = l === "switch" ? n`<div class=${o({
      [t.toggleContainer]: !0
    })}><div aria-controls=${i.content} .ariaExpanded=${c} class=${o({
      [t.toggle]: !0
    })} id=${i.toggle} @click=${this.toggleSection} @keydown=${this.handleHeaderKeyDown} role=button tabindex=0 title=${s ?? m}>${this.renderIcon("start")}<div class=${o(t.toggleSwitchContent)}><span class=${o(t.toggleSwitchText)}>${a}</span></div>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-switch .checked=${c} class=${o(t.switch)} inert .label=${s} .scale=${this.scale}></calcite-switch></div></div>` : n`<div class=${o({
      [t.toggleContainer]: !0
    })}><button aria-controls=${i.content} .ariaExpanded=${c} class=${o({
      [t.toggle]: !0
    })} id=${i.toggle} @click=${this.toggleSection}>${this.renderIcon("start")}<span class=${o(t.sectionHeaderText)}>${a}</span>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-icon class=${o(t.chevronIcon)} .icon=${p} .scale=${h(this.scale)}></calcite-icon></button></div>`;
    return n`${d}<section aria-labelledby=${i.toggle} class=${o({ [t.content]: this.defaultSlotHasElements })} .hidden=${!c} id=${i.content}><slot @slotchange=${this.handleDefaultSlot}></slot></section>`;
  }
}
f("calcite-block-section", I);
export {
  I as BlockSection
};
