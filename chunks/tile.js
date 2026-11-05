/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as x, L as k, d as z, s as n, b as a, o as C, f as w } from "./index.js";
import { n as $ } from "./ref.js";
import { s as y } from "./dom.js";
import { u as S } from "./useFocusable.js";
import { u as T } from "./useInteractive.js";
import { H as E } from "./Heading.js";
import { S as l, I as r, C as t } from "./resources32.js";
import { i as B } from "./key.js";
const H = x`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-shadow:var(--calcite-tile-shadow, var(--calcite-shadow-none));box-sizing:border-box;display:inline-block}calcite-link{--calcite-internal-link-text-decoration-line: none;--calcite-link-text-color: var(--calcite-tile-link-text-color)}.container{background-color:var(--calcite-tile-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));block-size:var(--calcite-container-size-content-fluid);border-radius:var(--calcite-tile-corner-radius, var(--calcite-corner-radius));box-sizing:border-box;color:var(--calcite-tile-text-color, var(--calcite-color-text-3));inline-size:var(--calcite-container-size-content-fluid);outline:var(--calcite-border-width-sm, 1px) solid var(--calcite-tile-border-color, var(--calcite-color-border-2));padding:var(--calcite-internal-tile-spacing);position:relative;-webkit-user-select:none;user-select:none}.container .selection-icon{color:var(--calcite-tile-text-color, var(--calcite-color-text-3))}.container ::slotted(calcite-chip){--calcite-icon-color: var(--calcite-tile-text-color, var(--calcite-color-text-3))}.container.interactive{cursor:pointer}.container.interactive:hover,.container.interactive:focus,.container.interactive.selected{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:var(--calcite-z-index)}.container.interactive:hover .selection-icon,.container.interactive:focus .selection-icon,.container.interactive.selected .selection-icon{color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}.container.interactive:hover .icon,.container.interactive:focus .icon,.container.interactive.selected .icon{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1))}.container.interactive:hover ::slotted(calcite-chip),.container.interactive:focus ::slotted(calcite-chip),.container.interactive.selected ::slotted(calcite-chip){--calcite-icon-color: var(--calcite-tile-text-color, var(--calcite-color-text-1))}.container.interactive:focus{box-shadow:inset 0 0 0 1px var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:calc(var(--calcite-z-index) + 1)}.content-container,.row{align-items:flex-start;display:flex}.content-container{flex-direction:column;overflow-wrap:break-word;word-break:break-word;inline-size:var(--calcite-container-size-content-fluid)}.text-content-container{inline-size:100%;outline-color:transparent;padding:0}.text-content{display:flex;flex-direction:column}.heading{margin:0;padding:0;color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1));font-weight:var(--calcite-font-weight-medium);line-height:1.20313rem;overflow-wrap:break-word}.description{color:var(--calcite-tile-text-color, var(--calcite-color-text-2));font-weight:var(--calcite-font-weight-regular);overflow-wrap:break-word}:host([alignment=center]) .icon{align-self:center}:host([alignment=center]) .text-content-container{justify-content:center}:host([alignment=center]) .text-content{text-align:center}:host([alignment=center]) slot[name=content-bottom]::slotted(*),:host([alignment=center]) slot[name=content-top]::slotted(*){align-self:center}:host([scale=s]){--calcite-internal-tile-spacing: var(--calcite-theme-space-sm, var(--calcite-spacing-sm));max-inline-size:400px;min-inline-size:100px}:host([scale=s]) .heading{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=s]) .description{font-size:var(--calcite-font-size--3);line-height:.85938rem}:host([scale=m]){--calcite-internal-tile-spacing: var(--calcite-theme-space-md, var(--calcite-spacing-md));max-inline-size:460px;min-inline-size:140px}:host([scale=m]) .heading{font-size:var(--calcite-font-size--1);line-height:1.20313rem}:host([scale=m]) .description{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=l]){--calcite-internal-tile-spacing: var(--calcite-theme-space-lg, var(--calcite-spacing-lg));max-inline-size:520px;min-inline-size:160px}:host([scale=l]) .heading{font-size:var(--calcite-font-size-0);line-height:1.375rem}:host([scale=l]) .description{font-size:var(--calcite-font-size--1);line-height:1.20313rem}.content-container--has-content,.row{gap:var(--calcite-internal-tile-spacing)}.content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-internal-tile-spacing)}:host([selection-appearance=highlight]) .container.selected{background-color:var(--calcite-color-surface-highlight)}:host(:hover:not([disabled])) .heading,:host([active]:not([disabled])) .heading{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .description,:host([active]:not([disabled])) .description{color:var(--calcite-tile-text-color, var(--calcite-color-text-2))}:host([href]:focus:not([disabled])) .container,:host([href]:hover:not([disabled])) .container{outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link));z-index:var(--calcite-z-index)}:host([href]:focus:not([disabled])) .icon,:host([href]:hover:not([disabled])) .icon{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:focus:not([disabled])) .heading,:host([href]:hover:not([disabled])) .heading{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:active:not([disabled])) .container{box-shadow:inset 0 0 0 1px var(--calcite-tile-link-color, var(--calcite-color-text-link));outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([embed]) .container{padding:0}:host([selection-mode=none]) .container:hover,:host([selection-mode=none]) .container.selected{outline-color:var(--calcite-tile-border-color, var(--calcite-color-border-2))}:host([selection-mode=none]) .container:focus{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}::slotted(*){max-inline-size:100%}`;
class A extends k {
  constructor() {
    super(), this.focusSetter = S()(this), this.interactiveContainer = T(this), this.hasContentBottom = !1, this.hasContentTop = !1, this.active = !1, this.alignment = "start", this.disabled = !1, this.embed = !1, this.iconFlipRtl = !1, this.interactive = !1, this.layout = "horizontal", this.scale = "m", this.selected = !1, this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteTileSelect = z(), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasContentBottom: 16, hasContentTop: 16, active: 7, alignment: 3, description: 3, disabled: 7, embed: 7, heading: 3, headingLevel: 11, href: 3, icon: 3, iconFlipRtl: 7, interactive: 5, label: 1, layout: 3, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = H;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.interactive ? this.containerEl : void 0, e);
  }
  clickHandler() {
    this.interactive && (this.setFocus(), this.handleSelectEvent());
  }
  handleSelectEvent() {
    this.disabled || !this.interactive || this.selectionMode === "single-persist" && this.selected === !0 || this.calciteTileSelect.emit();
  }
  handleSlotChange(e) {
    const o = y(e), i = e.target.name;
    i === l.contentBottom ? this.hasContentBottom = o : i === l.contentTop && (this.hasContentTop = o);
  }
  setContainerEl(e) {
    this.containerEl = e;
  }
  keyDownHandler(e) {
    !this.href && e.target === this.el && B(e.key) && (this.handleSelectEvent(), e.preventDefault());
  }
  renderSelectionIcon() {
    const { selected: e, selectionAppearance: o, selectionMode: i } = this;
    if (o === "icon" && i !== "none")
      return a`<calcite-icon class=${n(t.selectionIcon)} .icon=${e ? i === "multiple" ? r.selectedMultiple : r.selectedSingle : i === "multiple" ? r.unselectedMultiple : r.unselectedSingle} scale=s></calcite-icon>`;
  }
  renderTile() {
    const { description: e, disabled: o, hasContentBottom: i, hasContentTop: f, heading: s, headingLevel: g, icon: d, iconFlipRtl: u, interactive: c, selectionMode: h } = this, v = !!this.href || !c, p = h === "multiple" && c ? "checkbox" : h !== "none" && c ? "radio" : c ? "button" : void 0, m = !!(e || s || d), b = !m && f && i;
    return a`<div .ariaChecked=${h !== "none" && c ? this.selected : void 0} .ariaDisabled=${v ? o : void 0} .ariaLabel=${p && this.label} class=${n({
      [t.container]: !0,
      [t.interactive]: c,
      [t.row]: !0,
      [t.selected]: this.selected
    })} @click=${this.clickHandler} .role=${p} tabindex=${(v ? void 0 : 0) ?? C} ${$(this.setContainerEl)}>${this.renderSelectionIcon()}<div class=${n({
      [t.contentContainer]: !0,
      [t.contentContainerHasContent]: m,
      [t.contentContainerHasOnlyContentTopAndBottom]: b
    })}><slot name=${l.contentTop} @slotchange=${this.handleSlotChange}></slot>${d && a`<calcite-icon class=${n(t.icon)} .flipRtl=${u} .icon=${d} scale=l></calcite-icon>` || ""}<div class=${n({ [t.textContentContainer]: !0, [t.row]: !0 })}><div class=${n(t.textContent)}>${s && E({ class: t.heading, level: g, children: s }) || ""}${e && a`<div class=${n(t.description)}>${e}</div>` || ""}</div></div><slot name=${l.contentBottom} @slotchange=${this.handleSlotChange}></slot></div></div>`;
  }
  render() {
    const { disabled: e } = this;
    return this.interactiveContainer({ disabled: e, children: this.href ? a`<calcite-link .disabled=${e} .href=${this.href}>${this.renderTile()}</calcite-link>` : this.renderTile() });
  }
}
w("calcite-tile", A);
export {
  A as Tile
};
