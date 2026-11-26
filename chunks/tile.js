/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as b, L as k, c as z, s as c, b as a, n as w, d as C } from "./index.js";
import { n as $ } from "./ref.js";
import { s as y } from "./dom.js";
import { u as S } from "./useFocusable.js";
import { u as T } from "./useInteractive.js";
import { H as E } from "./Heading.js";
import { S as l, I as r, C as t } from "./resources32.js";
import { i as H } from "./key.js";
const B = b`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-shadow:var(--calcite-tile-shadow, var(--calcite-shadow-none));box-sizing:border-box;display:inline-block}calcite-link{--calcite-internal-link-text-decoration-line: none;--calcite-link-text-color: var(--calcite-tile-link-text-color)}.container{background-color:var(--calcite-tile-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));block-size:var(--calcite-container-size-content-fluid);border-radius:var(--calcite-tile-corner-radius, var(--calcite-corner-radius));box-sizing:border-box;color:var(--calcite-tile-text-color, var(--calcite-color-text-3));inline-size:var(--calcite-container-size-content-fluid);outline:var(--calcite-border-width-sm, 1px) solid var(--calcite-tile-border-color, var(--calcite-color-border-2));padding:var(--calcite-internal-tile-spacing);position:relative;-webkit-user-select:none;user-select:none}.container .selection-icon{color:var(--calcite-tile-text-color, var(--calcite-color-text-3))}.container ::slotted(calcite-chip){--calcite-icon-color: var(--calcite-tile-text-color, var(--calcite-color-text-3))}.container.interactive{cursor:pointer}.container.interactive:hover,.container.interactive:focus,.container.interactive.selected{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:var(--calcite-z-index)}.container.interactive:hover .selection-icon,.container.interactive:focus .selection-icon,.container.interactive.selected .selection-icon{color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}.container.interactive:hover .icon,.container.interactive:focus .icon,.container.interactive.selected .icon{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1))}.container.interactive:hover ::slotted(calcite-chip),.container.interactive:focus ::slotted(calcite-chip),.container.interactive.selected ::slotted(calcite-chip){--calcite-icon-color: var(--calcite-tile-text-color, var(--calcite-color-text-1))}.container.interactive:focus{box-shadow:inset 0 0 0 1px var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:calc(var(--calcite-z-index) + 1)}.content-container,.row{align-items:flex-start;display:flex}.content-container{flex-direction:column;overflow-wrap:break-word;word-break:break-word;inline-size:var(--calcite-container-size-content-fluid)}.text-content-container{inline-size:100%;outline-color:transparent;padding:0}.text-content{display:flex;flex-direction:column}.heading{margin:0;padding:0;color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1));font-weight:var(--calcite-font-weight-medium);line-height:1.20313rem;overflow-wrap:break-word}.description{color:var(--calcite-tile-text-color, var(--calcite-color-text-2))}.description{font-weight:var(--calcite-font-weight-regular);overflow-wrap:break-word}:host([alignment=center]) .icon{align-self:center}:host([alignment=center]) .text-content-container{justify-content:center}:host([alignment=center]) .text-content{text-align:center}:host([alignment=center]) slot[name=content-bottom]::slotted(*),:host([alignment=center]) slot[name=content-top]::slotted(*){align-self:center}:host([scale=s]){--calcite-internal-tile-spacing: var(--calcite-theme-space-sm, var(--calcite-spacing-sm));max-inline-size:400px;min-inline-size:100px}:host([scale=s]) .heading{font-size:var(--calcite-font-size-relative-sm);line-height:1.03125rem}:host([scale=s]) .description{font-size:var(--calcite-font-size-relative-xs);line-height:.85938rem}:host([scale=m]){--calcite-internal-tile-spacing: var(--calcite-theme-space-md, var(--calcite-spacing-md));max-inline-size:460px;min-inline-size:140px}:host([scale=m]) .heading{font-size:var(--calcite-font-size-relative-base);line-height:1.20313rem}:host([scale=m]) .description{font-size:var(--calcite-font-size-relative-sm);line-height:1.03125rem}:host([scale=l]){--calcite-internal-tile-spacing: var(--calcite-theme-space-lg, var(--calcite-spacing-lg));max-inline-size:520px;min-inline-size:160px}:host([scale=l]) .heading{font-size:var(--calcite-font-size-relative-md);line-height:1.375rem}:host([scale=l]) .description{font-size:var(--calcite-font-size-relative-base);line-height:1.20313rem}.content-container--has-content,.row{gap:var(--calcite-internal-tile-spacing)}.content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-internal-tile-spacing)}:host([selection-appearance=highlight]) .container.selected{background-color:var(--calcite-color-surface-highlight)}:host(:hover:not([disabled])) .heading{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .description{color:var(--calcite-tile-text-color, var(--calcite-color-text-2))}:host([href]:focus:not([disabled])) .container,:host([href]:hover:not([disabled])) .container{outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link));z-index:var(--calcite-z-index)}:host([href]:focus:not([disabled])) .icon,:host([href]:hover:not([disabled])) .icon{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:focus:not([disabled])) .heading,:host([href]:hover:not([disabled])) .heading{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:active:not([disabled])) .container{box-shadow:inset 0 0 0 1px var(--calcite-tile-link-color, var(--calcite-color-text-link));outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([selection-mode=none]) .container:hover,:host([selection-mode=none]) .container.selected{outline-color:var(--calcite-tile-border-color, var(--calcite-color-border-2))}:host([selection-mode=none]) .container:focus{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}@media(forced-colors:active){.container.interactive:hover,.container.interactive:focus,.container.interactive.selected{outline-color:Highlight;z-index:calc(var(--calcite-z-index) + 1)}:host([selection-appearance=highlight]) .container.selected{outline-width:calc(var(--calcite-border-width-sm, 1px) * 3)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}::slotted(*){max-inline-size:100%}`;
class A extends k {
  constructor() {
    super(), this.focusSetter = S()(this).setFocus, this.interactiveContainer = T(this), this.hasContentBottom = !1, this.hasContentTop = !1, this.alignment = "start", this.disabled = !1, this.iconFlipRtl = !1, this.interactive = !1, this.layout = "horizontal", this.scale = "m", this.selected = !1, this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteTileSelect = z(), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasContentBottom: 16, hasContentTop: 16, alignment: 3, description: 3, disabled: 7, heading: 3, headingLevel: 11, href: 3, icon: 3, iconFlipRtl: 7, interactive: 5, label: 1, layout: 3, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = B;
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
    const n = y(e), i = e.target.name;
    i === l.contentBottom ? this.hasContentBottom = n : i === l.contentTop && (this.hasContentTop = n);
  }
  setContainerEl(e) {
    this.containerEl = e;
  }
  keyDownHandler(e) {
    !this.href && e.target === this.el && H(e.key) && (this.handleSelectEvent(), e.preventDefault());
  }
  renderSelectionIcon() {
    const { selected: e, selectionAppearance: n, selectionMode: i } = this;
    if (n === "icon" && i !== "none")
      return a`<calcite-icon class=${c(t.selectionIcon)} .icon=${e ? i === "multiple" ? r.selectedMultiple : r.selectedSingle : i === "multiple" ? r.unselectedMultiple : r.unselectedSingle} scale=s></calcite-icon>`;
  }
  renderTile() {
    const { description: e, disabled: n, hasContentBottom: i, hasContentTop: f, heading: s, headingLevel: g, icon: d, iconFlipRtl: u, interactive: o, selectionMode: h } = this, v = !!this.href || !o, p = h === "multiple" && o ? "checkbox" : h !== "none" && o ? "radio" : o ? "button" : void 0, m = !!(e || s || d), x = !m && f && i;
    return a`<div .ariaChecked=${h !== "none" && o ? this.selected : void 0} .ariaDisabled=${v ? n : void 0} .ariaLabel=${p && this.label} class=${c({
      [t.container]: !0,
      [t.interactive]: o,
      [t.row]: !0,
      [t.selected]: this.selected
    })} @click=${this.clickHandler} .role=${p} tabindex=${(v ? void 0 : 0) ?? w} ${$(this.setContainerEl)}>${this.renderSelectionIcon()}<div class=${c({
      [t.contentContainer]: !0,
      [t.contentContainerHasContent]: m,
      [t.contentContainerHasOnlyContentTopAndBottom]: x
    })}><slot name=${l.contentTop} @slotchange=${this.handleSlotChange}></slot>${d && a`<calcite-icon class=${c(t.icon)} .flipRtl=${u} .icon=${d} scale=l></calcite-icon>` || ""}<div class=${c({ [t.textContentContainer]: !0, [t.row]: !0 })}><div class=${c(t.textContent)}>${s && E({ class: t.heading, level: g, children: s }) || ""}${e && a`<div class=${c(t.description)}>${e}</div>` || ""}</div></div><slot name=${l.contentBottom} @slotchange=${this.handleSlotChange}></slot></div></div>`;
  }
  render() {
    const { disabled: e } = this;
    return this.interactiveContainer({ disabled: e, children: this.href ? a`<calcite-link .disabled=${e} .href=${this.href}>${this.renderTile()}</calcite-link>` : this.renderTile() });
  }
}
C("calcite-tile", A);
export {
  A as Tile
};
