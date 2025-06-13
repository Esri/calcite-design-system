import { a as v, L as p, d as u, s as c, x as l, o as x, c as b } from "./iframe.js";
import { i as f } from "./keyed.js";
import { f as m } from "./dom.js";
import { i as k } from "./key.js";
import { c as $ } from "./component.js";
import { u as w } from "./useT9n.js";
import { l as S } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const i = {
  content: "content",
  toggle: "toggle"
}, e = {
  chevronIcon: "chevron-icon",
  content: "content",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  invalid: "invalid",
  sectionHeader: "section-header",
  sectionHeaderText: "section-header__text",
  statusIcon: "status-icon",
  switch: "switch",
  toggle: "toggle",
  toggleSwitch: "toggle--switch",
  toggleContainer: "toggle-container",
  toggleSwitchContent: "toggle--switch__content",
  toggleSwitchText: "toggle--switch__text",
  valid: "valid"
}, g = {
  menuExpanded: "chevron-up",
  menuCollapsed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, y = v`:host{box-sizing:border-box;display:block;font-size:var(--calcite-font-size--1);color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, var(--calcite-color-foreground-1))}:host([expanded]){border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-block-section-border-color, var(--calcite-color-border-3))}:host([expanded]) .toggle{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([expanded]) .chevron-icon{color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}:host([expanded]) .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host(:last-child){border-block-end-width:0px}.toggle{inline-size:100%;border-width:0px;font-family:var(--calcite-font-family);gap:var(--calcite-spacing-md);color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, transparent);font-weight:var(--calcite-font-weight-normal)}.toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.toggle--switch,.section-header{margin-inline:0px;margin-block:.25rem;display:flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;padding-inline:0px;padding-block:.5rem;font-size:var(--calcite-font-size--1);outline-color:transparent}.toggle--switch:focus,.section-header:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle--switch:hover,.section-header:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.section-header__text{margin-block:0px;flex:1 1 auto;text-align:initial;word-wrap:anywhere}.toggle-container{position:relative;display:flex;align-items:center;word-break:break-word;background-color:var(--calcite-block-section-background-color, transparent)}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}.toggle-container .icon--end:hover,.toggle-container .icon--start:hover,.toggle-container .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.status-icon{display:flex;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends p {
  constructor() {
    super(...arguments), this.messages = w(), this.expanded = !1, this.toggleDisplay = "button", this.calciteBlockSectionToggle = u({ cancelable: !1 });
  }
  static {
    this.properties = { expanded: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, messageOverrides: 0, open: 7, status: 3, text: 1, toggleDisplay: 3 };
  }
  static {
    this.styles = y;
  }
  get open() {
    return this.expanded;
  }
  set open(t) {
    S.deprecated("property", {
      name: "open",
      removalVersion: 4,
      suggested: "expanded"
    }), this.expanded = t;
  }
  async setFocus() {
    await $(this), m(this.el);
  }
  handleHeaderKeyDown(t) {
    k(t.key) && (this.toggleSection(), t.preventDefault(), t.stopPropagation());
  }
  toggleSection() {
    this.expanded = !this.expanded, this.calciteBlockSectionToggle.emit();
  }
  renderStatusIcon() {
    const { status: t } = this, o = g[t] ?? !1, n = {
      [e.statusIcon]: !0,
      [e.valid]: t == "valid",
      [e.invalid]: t == "invalid"
    };
    return o ? l`<calcite-icon class=${c(n)} .icon=${o} scale=s></calcite-icon>` : null;
  }
  renderIcon(t) {
    const { iconFlipRtl: o, iconStart: n, iconEnd: a } = this;
    if ((t === "start" ? n : a) === void 0)
      return null;
    const r = o === "both" || o === "start", d = o === "both" || o === "end", s = t === "start";
    return f(s ? n : a, l`<calcite-icon class=${c(s ? e.iconStart : e.iconEnd)} .flipRtl=${s ? r : d} .icon=${s ? n : a} scale=s></calcite-icon>`);
  }
  render() {
    const { messages: t, expanded: o, text: n, toggleDisplay: a } = this, h = o ? g.menuExpanded : g.menuCollapsed, r = o ? t.collapse : t.expand, d = a === "switch" ? l`<div class=${c({
      [e.toggleContainer]: !0
    })}><div aria-controls=${i.content} .ariaExpanded=${o} class=${c({
      [e.toggle]: !0,
      [e.toggleSwitch]: !0
    })} id=${i.toggle} @click=${this.toggleSection} @keydown=${this.handleHeaderKeyDown} role=button tabindex=0 title=${r ?? x}>${this.renderIcon("start")}<div class=${c(e.toggleSwitchContent)}><span class=${c(e.toggleSwitchText)}>${n}</span></div>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-switch .checked=${o} class=${c(e.switch)} inert .label=${r} scale=s></calcite-switch></div></div>` : l`<div class=${c({
      [e.toggleContainer]: !0
    })}><button aria-controls=${i.content} .ariaExpanded=${o} class=${c({
      [e.sectionHeader]: !0,
      [e.toggle]: !0
    })} id=${i.toggle} @click=${this.toggleSection}>${this.renderIcon("start")}<span class=${c(e.sectionHeaderText)}>${n}</span>${this.renderIcon("end")}${this.renderStatusIcon()}<calcite-icon class=${c(e.chevronIcon)} .icon=${h} scale=s></calcite-icon></button></div>`;
    return l`${d}<section aria-labelledby=${i.toggle} class=${c(e.content)} .hidden=${!o} id=${i.content}><slot></slot></section>`;
  }
}
b("calcite-block-section", I);
export {
  I as BlockSection
};
