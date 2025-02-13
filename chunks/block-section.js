import { j as h, L as v, n as p, x as a, s as c, z as u, k as b } from "./iframe.js";
import { i as x } from "./keyed.js";
import { f } from "./dom.js";
import { i as k } from "./key.js";
import { c as m } from "./component.js";
import { u as $ } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const l = {
  content: "content",
  toggle: "toggle"
}, t = {
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
}, s = {
  menuOpen: "chevron-up",
  menuClosed: "chevron-down",
  valid: "check-circle",
  invalid: "exclamation-mark-triangle"
}, w = h`:host{box-sizing:border-box;display:block;font-size:var(--calcite-font-size--1);color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, var(--calcite-color-foreground-1))}:host([open]){border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-block-section-border-color, var(--calcite-color-border-3))}:host([open]) .toggle{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([open]) .toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host([open]) .chevron-icon{color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}:host([open]) .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}:host(:last-child){border-block-end-width:0px}.toggle{inline-size:100%;border-width:0px;font-family:var(--calcite-font-family);gap:var(--calcite-spacing-md);color:var(--calcite-block-section-header-text-color, var(--calcite-color-text-2));background-color:var(--calcite-block-section-background-color, transparent);font-weight:var(--calcite-font-weight-normal)}.toggle:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.toggle--switch,.section-header{margin-inline:0px;margin-block:.25rem;display:flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;padding-inline:0px;padding-block:.5rem;font-size:var(--calcite-font-size--1);outline-color:transparent}.toggle--switch:focus,.section-header:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle--switch:hover,.section-header:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.section-header__text{margin-block:0px;flex:1 1 auto;text-align:initial;word-wrap:anywhere}.toggle-container{position:relative;display:flex;align-items:center;word-break:break-word;background-color:var(--calcite-block-section-background-color, transparent)}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-block-section-text-color, var(--calcite-color-text-3))}.toggle-container .icon--end:hover,.toggle-container .icon--start:hover,.toggle-container .chevron-icon:hover{color:var(--calcite-block-section-text-color-hover, var(--calcite-color-text-1))}.status-icon{display:flex;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([hidden]){display:none}[hidden]{display:none}`;
class S extends v {
  constructor() {
    super(...arguments), this.messages = $(), this.open = !1, this.toggleDisplay = "button", this.calciteBlockSectionToggle = p({ cancelable: !1 });
  }
  static {
    this.properties = { iconEnd: 3, iconFlipRtl: 3, iconStart: 3, messageOverrides: 0, open: 7, status: 3, text: 1, toggleDisplay: 3 };
  }
  static {
    this.styles = w;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's first tabbable element. */
  async setFocus() {
    await m(this), f(this.el);
  }
  // #endregion
  // #region Private Methods
  handleHeaderKeyDown(e) {
    k(e.key) && (this.toggleSection(), e.preventDefault(), e.stopPropagation());
  }
  toggleSection() {
    this.open = !this.open, this.calciteBlockSectionToggle.emit();
  }
  // #endregion
  // #region Rendering
  renderStatusIcon() {
    const { status: e } = this, o = s[e] ?? !1, i = {
      [t.statusIcon]: !0,
      [t.valid]: e == "valid",
      [t.invalid]: e == "invalid"
    };
    return o ? a`<calcite-icon class=${c(i)} .icon=${o} scale=s></calcite-icon>` : null;
  }
  renderIcon(e) {
    const { iconFlipRtl: o } = this;
    if (e === void 0)
      return null;
    const i = o === "both" || o === "start", r = o === "both" || o === "end", n = e === this.iconStart;
    return x(n ? this.iconStart : this.iconEnd, a`<calcite-icon class=${c(n ? t.iconStart : t.iconEnd)} .flipRtl=${n ? i : r} .icon=${n ? this.iconStart : this.iconEnd} scale=s></calcite-icon>`);
  }
  render() {
    const { messages: e, open: o, text: i, toggleDisplay: r } = this, n = o ? s.menuOpen : s.menuClosed, d = o ? e.collapse : e.expand, g = r === "switch" ? a`<div class=${c({
      [t.toggleContainer]: !0
    })}><div aria-controls=${l.content} .ariaExpanded=${o} class=${c({
      [t.toggle]: !0,
      [t.toggleSwitch]: !0
    })} id=${l.toggle} @click=${this.toggleSection} @keydown=${this.handleHeaderKeyDown} role=button tabindex=0 title=${d ?? u}>${this.renderIcon(this.iconStart)}<div class=${c(t.toggleSwitchContent)}><span class=${c(t.toggleSwitchText)}>${i}</span></div>${this.renderIcon(this.iconEnd)}${this.renderStatusIcon()}<calcite-switch .checked=${o} class=${c(t.switch)} inert .label=${d} scale=s></calcite-switch></div></div>` : a`<div class=${c({
      [t.toggleContainer]: !0
    })}><button aria-controls=${l.content} .ariaExpanded=${o} class=${c({
      [t.sectionHeader]: !0,
      [t.toggle]: !0
    })} id=${l.toggle} @click=${this.toggleSection}>${this.renderIcon(this.iconStart)}<span class=${c(t.sectionHeaderText)}>${i}</span>${this.renderIcon(this.iconEnd)}${this.renderStatusIcon()}<calcite-icon class=${c(t.chevronIcon)} .icon=${n} scale=s></calcite-icon></button></div>`;
    return a`${g}<section aria-labelledby=${l.toggle} class=${c(t.content)} .hidden=${!o} id=${l.content}><slot></slot></section>`;
  }
}
b("calcite-block-section", S);
export {
  S as BlockSection
};
