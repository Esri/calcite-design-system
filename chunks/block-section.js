/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as x, L as b, c as g, s as o, b as r, n as m, d as u } from "./index.js";
import { i as f } from "./keyed.js";
import { s as k } from "./dom.js";
import { i as $ } from "./key.js";
import { g as p } from "./component.js";
import { u as w } from "./useT9n.js";
import { u as S } from "./useFocusable.js";
const l = {
  content: "content",
  toggle: "toggle"
}, t = {
  chevronIcon: "chevron-icon",
  content: "content",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  sectionHeaderText: "section-header__text",
  switch: "switch",
  toggle: "toggle",
  toggleContainer: "toggle-container",
  toggleSwitchContent: "toggle--switch__content",
  toggleSwitchText: "toggle--switch__text"
}, v = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down"
}, y = x`:host{box-sizing:border-box;display:block;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2))}:host([expanded]){border-width:var(--calcite-border-width-none);border-block-end-width:var(--calcite-border-width-sm);border-style:solid;border-block-end-color:var(--calcite-block-section-border-color, var(--calcite-color-border-3))}:host([expanded]) .toggle{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .icon--end,:host([expanded]) .icon--start{color:var(--calcite-block-section-text-color, var(--calcite-color-text-1))}:host([expanded]) .chevron-icon{color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}:host([expanded]) .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle-container:hover calcite-switch{--calcite-switch-background-color: var(--calcite-color-brand-hover)}:host(:last-child){border-block-end-width:var(--calcite-border-width-none)}:host([scale=s]) .toggle{padding-block:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs));gap:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));font-size:var(--calcite-font-size-sm)}:host([scale=s]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs)))}:host([scale=m]) .toggle{padding-block:var(--calcite-theme-space-sm, var(--calcite-spacing-sm));gap:var(--calcite-theme-space-md, var(--calcite-spacing-md));font-size:var(--calcite-font-size)}:host([scale=m]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-theme-space-sm, var(--calcite-spacing-sm)))}:host([scale=l]) .toggle{padding-block:var(--calcite-theme-space-md, var(--calcite-spacing-md));gap:var(--calcite-theme-space-lg, var(--calcite-spacing-lg));font-size:var(--calcite-font-size-md)}:host([scale=l]) .content{padding-block:var(--calcite-block-section-content-space, var(--calcite-theme-space-md, var(--calcite-spacing-md)))}.toggle{outline-color:transparent;display:flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;inline-size:100%;border-width:var(--calcite-border-width-none);font-family:inherit;color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));font-weight:var(--calcite-font-weight-regular);padding-inline:0;line-height:var(--calcite-font-line-height-relative-snug)}.toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));z-index:var(--calcite-z-index)}.toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.section-header__text{margin-block:0;flex:1 1 auto;text-align:initial;overflow-wrap:anywhere}.toggle-container{display:flex;align-items:center;position:relative;word-break:break-word}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}.toggle-container:hover .chevron-icon{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.toggle-container:hover calcite-switch{--calcite-switch-background-color: var(--calcite-color-text-3)}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends b {
  constructor() {
    super(...arguments), this.messages = w(), this.focusSetter = S()(this).setFocus, this.defaultSlotHasElements = !1, this.expanded = !1, this.scale = "m", this.toggleDisplay = "button", this.calciteBlockSectionCollapse = g({ cancelable: !1 }), this.calciteBlockSectionExpand = g({ cancelable: !1 }), this.calciteBlockSectionToggle = g({ cancelable: !1 });
  }
  static {
    this.properties = { defaultSlotHasElements: 16, expanded: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, messageOverrides: 0, scale: 3, text: 1, toggleDisplay: 3 };
  }
  static {
    this.styles = y;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  willUpdate(e) {
    e.has("expanded") && this.hasUpdated && (this.expanded ? this.calciteBlockSectionExpand.emit() : this.calciteBlockSectionCollapse.emit());
  }
  handleHeaderKeyDown(e) {
    $(e.key) && (this.toggleSection(), e.preventDefault(), e.stopPropagation());
  }
  toggleSection() {
    this.expanded = !this.expanded, this.calciteBlockSectionToggle.emit();
  }
  handleDefaultSlot(e) {
    this.defaultSlotHasElements = k(e);
  }
  renderIcon(e) {
    const { iconFlipRtl: c, iconStart: a, iconEnd: i } = this;
    if ((e === "start" ? a : i) === void 0)
      return null;
    const n = c === "both" || c === "start", d = c === "both" || c === "end", s = e === "start";
    return f(s ? a : i, r`<calcite-icon class=${o(s ? t.iconStart : t.iconEnd)} .flipRtl=${s ? n : d} .icon=${s ? a : i} .scale=${p(this.scale)}></calcite-icon>`);
  }
  render() {
    const { messages: e, expanded: c, text: a, toggleDisplay: i } = this, h = c ? v.menuExpanded : v.menuCollapsed, n = c ? e.collapse : e.expand, d = i === "switch" ? r`<div class=${o({
      [t.toggleContainer]: !0
    })}><div aria-controls=${l.content} .ariaExpanded=${c} class=${o({
      [t.toggle]: !0
    })} id=${l.toggle} @click=${this.toggleSection} @keydown=${this.handleHeaderKeyDown} role=button tabindex=0 title=${n ?? m}>${this.renderIcon("start")}<div class=${o(t.toggleSwitchContent)}><span class=${o(t.toggleSwitchText)}>${a}</span></div>${this.renderIcon("end")}<calcite-switch .checked=${c} class=${o(t.switch)} inert .label=${n} .scale=${this.scale}></calcite-switch></div></div>` : r`<div class=${o({
      [t.toggleContainer]: !0
    })}><button aria-controls=${l.content} .ariaExpanded=${c} class=${o({
      [t.toggle]: !0
    })} id=${l.toggle} @click=${this.toggleSection} type=button>${this.renderIcon("start")}<span class=${o(t.sectionHeaderText)}>${a}</span>${this.renderIcon("end")}<calcite-icon class=${o(t.chevronIcon)} .icon=${h} .scale=${p(this.scale)}></calcite-icon></button></div>`;
    return r`${d}<section aria-labelledby=${l.toggle} class=${o({ [t.content]: this.defaultSlotHasElements })} .hidden=${!c} id=${l.content}><slot @slotchange=${this.handleDefaultSlot}></slot></section>`;
  }
}
u("calcite-block-section", E);
export {
  E as BlockSection
};
