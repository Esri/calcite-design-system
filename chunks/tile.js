import { b as C, L as w, c as b, s as n, x as o, q as $ } from "./index.js";
import { n as y } from "./ref.js";
import { u as S, I as E } from "./interactive.js";
import { s as T } from "./dom.js";
import { u as A } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  container: "container",
  contentContainer: "content-container",
  contentContainerHasContent: "content-container--has-content",
  contentContainerHasOnlyContentTopAndBottom: "content-container--has-only-content-top-and-bottom",
  textContentContainer: "text-content-container",
  description: "description",
  heading: "heading",
  icon: "icon",
  interactive: "interactive",
  largeVisualDeprecated: "large-visual-deprecated",
  row: "row",
  selected: "selected",
  selectionIcon: "selection-icon",
  textContent: "text-content"
}, r = {
  selectedMultiple: "check-square-f",
  selectedSingle: "circle-f",
  unselectedMultiple: "square",
  unselectedSingle: "circle"
}, d = {
  contentBottom: "content-bottom",
  contentEnd: "content-end",
  contentStart: "content-start",
  contentTop: "content-top"
}, H = C`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-shadow:var(--calcite-tile-shadow, var(--calcite-shadow-none));box-sizing:border-box;display:inline-block}calcite-link{--calcite-link-text-color: var(--calcite-tile-link-text-color)}.container{background-color:var(--calcite-tile-background-color, var(--calcite-color-foreground-1));block-size:var(--calcite-container-size-content-fluid);border-radius:var(--calcite-tile-corner-radius, var(--calcite-corner-radius));box-sizing:border-box;color:var(--calcite-tile-text-color, var(--calcite-color-text-3));inline-size:var(--calcite-container-size-content-fluid);outline:var(--calcite-border-width-sm, 1px) solid var(--calcite-tile-border-color, var(--calcite-color-border-2));padding:var(--calcite-internal-tile-spacing);position:relative;-webkit-user-select:none;user-select:none}.container .selection-icon{color:var(--calcite-tile-text-color, var(--calcite-color-text-3))}.container.interactive{cursor:pointer}.container.interactive:hover,.container.interactive:focus,.container.interactive.selected{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:var(--calcite-z-index)}.container.interactive:hover .selection-icon,.container.interactive:focus .selection-icon,.container.interactive.selected .selection-icon{color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}.container.interactive:focus{box-shadow:inset 0 0 0 1px var(--calcite-tile-accent-color-press, var(--calcite-color-brand));z-index:calc(var(--calcite-z-index) + 1)}.content-container,.row{align-items:flex-start;display:flex}.content-container{flex-direction:column;word-wrap:break-word;word-break:break-word;inline-size:var(--calcite-container-size-content-fluid)}.text-content-container{inline-size:100%;outline-color:transparent;padding:0}.text-content{display:flex;flex-direction:column}.heading{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-2));font-weight:var(--calcite-font-weight-medium);line-height:1.20313rem;overflow-wrap:break-word}.description{font-weight:var(--calcite-font-weight-regular);overflow-wrap:break-word}.large-visual-deprecated{align-items:center;justify-content:center;min-block-size:12rem;text-align:center}.large-visual-deprecated .icon{align-self:center;block-size:64px;inline-size:64px}.large-visual-deprecated .selection-icon{position:absolute;inset-inline-start:var(--calcite-internal-tile-spacing);inset-block-start:var(--calcite-internal-tile-spacing);z-index:var(--calcite-z-index)}.large-visual-deprecated .text-content-container{justify-content:center}:host([alignment=center]) .icon{align-self:center}:host([alignment=center]) .text-content{text-align:center}:host([alignment=center]) slot[name=content-bottom]::slotted(*),:host([alignment=center]) slot[name=content-top]::slotted(*),:host([alignment=center]) slot[name=content-start]::slotted(*),:host([alignment=center]) slot[name=content-end]::slotted(*){align-self:center}:host([scale=s]){--calcite-internal-tile-spacing: var(--calcite-spacing-sm);max-inline-size:400px;min-inline-size:100px}:host([scale=s]) .heading{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=s]) .description{font-size:var(--calcite-font-size--3);line-height:.85938rem}:host([scale=m]){--calcite-internal-tile-spacing: var(--calcite-spacing-md);max-inline-size:460px;min-inline-size:140px}:host([scale=m]) .heading{font-size:var(--calcite-font-size--1);line-height:1.20313rem}:host([scale=m]) .description{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=l]){--calcite-internal-tile-spacing: var(--calcite-spacing-lg);max-inline-size:520px;min-inline-size:160px}:host([scale=l]) .heading{font-size:var(--calcite-font-size-0);line-height:1.375rem}:host([scale=l]) .description{font-size:var(--calcite-font-size--1);line-height:1.20313rem}.content-container--has-content,.row{gap:var(--calcite-internal-tile-spacing)}.content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-internal-tile-spacing)}:host([selection-appearance=border][layout=horizontal]) .container.selected:focus:before,:host([selection-appearance=border][layout=vertical]) .container.selected:focus:before{block-size:100%;box-shadow:inset 0 0 0 1px var(--calcite-tile-accent-color-press, var(--calcite-color-brand));content:"";display:block;inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}:host([selection-appearance=border][layout=horizontal]) .container.selected{box-shadow:inset 0 -4px 0 0 var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}:host([selection-appearance=border][layout=vertical]) .container.selected{box-shadow:inset 4px 0 0 0 var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}:host(:hover:not([disabled])) .heading,:host([active]:not([disabled])) .heading{color:var(--calcite-tile-heading-text-color, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .description,:host([active]:not([disabled])) .description{color:var(--calcite-tile-text-color, var(--calcite-color-text-2))}:host([href]:focus:not([disabled])) .container,:host([href]:hover:not([disabled])) .container{outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link));z-index:var(--calcite-z-index)}:host([href]:focus:not([disabled])) .icon,:host([href]:hover:not([disabled])) .icon{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:focus:not([disabled])) .heading,:host([href]:hover:not([disabled])) .heading{color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([href]:active:not([disabled])) .container{box-shadow:inset 0 0 0 1px var(--calcite-tile-link-color, var(--calcite-color-text-link));outline-color:var(--calcite-tile-link-color, var(--calcite-color-text-link))}:host([embed]) .container{padding:0}:host([selection-mode=none]) .container:hover,:host([selection-mode=none]) .container.selected{outline-color:var(--calcite-tile-border-color, var(--calcite-color-border-2))}:host([selection-mode=none]) .container:focus{outline-color:var(--calcite-tile-accent-color-press, var(--calcite-color-brand))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}::slotted(*){max-inline-size:100%}`;
class I extends w {
  constructor() {
    super(), this.focusSetter = A()(this), this.hasContentBottom = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.hasContentTop = !1, this.active = !1, this.alignment = "start", this.disabled = !1, this.embed = !1, this.iconFlipRtl = !1, this.interactive = !1, this.layout = "horizontal", this.scale = "m", this.selected = !1, this.selectionAppearance = "icon", this.selectionMode = "none", this.calciteInternalTileKeyEvent = b({ cancelable: !1 }), this.calciteTileSelect = b(), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasContentBottom: 16, hasContentEnd: 16, hasContentStart: 16, hasContentTop: 16, active: 7, alignment: 3, description: 3, disabled: 7, embed: 7, heading: 3, href: 3, icon: [3, { type: String }], iconFlipRtl: 7, interactive: 5, label: 1, layout: 3, scale: 3, selected: 7, selectionAppearance: 3, selectionMode: 3 };
  }
  static {
    this.styles = H;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.interactive ? this.containerEl : void 0, e);
  }
  updated() {
    S(this);
  }
  clickHandler() {
    this.interactive && (this.setFocus(), this.handleSelectEvent());
  }
  handleSelectEvent() {
    this.disabled || !this.interactive || this.selectionMode === "single-persist" && this.selected === !0 || this.calciteTileSelect.emit();
  }
  handleSlotChange(e) {
    const c = e.target.dataset.name;
    this[`has${c}`] = T(e);
  }
  setContainerEl(e) {
    this.containerEl = e;
  }
  keyDownHandler(e) {
    if (e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.handleSelectEvent(), e.preventDefault();
          break;
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "Home":
        case "End":
          this.calciteInternalTileKeyEvent.emit(e), e.preventDefault();
          break;
      }
  }
  renderSelectionIcon() {
    const { selected: e, selectionAppearance: c, selectionMode: a } = this;
    if (c === "icon" && a !== "none")
      return o`<calcite-icon class=${n(t.selectionIcon)} .icon=${e ? a === "multiple" ? r.selectedMultiple : r.selectedSingle : a === "multiple" ? r.unselectedMultiple : r.unselectedSingle} scale=s></calcite-icon>`;
  }
  renderTile() {
    const { description: e, disabled: c, hasContentBottom: a, hasContentEnd: g, hasContentStart: f, hasContentTop: m, heading: l, icon: s, iconFlipRtl: x, interactive: i, selectionMode: h } = this, k = l && s && !e, v = !!this.href || !i, p = h === "multiple" && i ? "checkbox" : h !== "none" && i ? "radio" : i ? "button" : void 0, u = !!(e || g || f || l || s), z = !u && m && a;
    return o`<div .ariaChecked=${h !== "none" && i ? this.selected : void 0} .ariaDisabled=${v ? c : void 0} .ariaLabel=${p && this.label} class=${n({
      [t.container]: !0,
      [t.interactive]: i,
      // [Deprecated] Use the content-top slot for rendering icon with alignment="center" instead
      [t.largeVisualDeprecated]: k,
      [t.row]: !0,
      [t.selected]: this.selected
    })} @click=${this.clickHandler} .role=${p} tabindex=${v ? void 0 : 0} ${y(this.setContainerEl)}>${this.renderSelectionIcon()}<div class=${n({
      [t.contentContainer]: !0,
      [t.contentContainerHasContent]: u,
      [t.contentContainerHasOnlyContentTopAndBottom]: z
    })}><slot name=${d.contentTop} @slotchange=${this.handleSlotChange}></slot>${s && o`<calcite-icon class=${n(t.icon)} .flipRtl=${x} .icon=${s} scale=l></calcite-icon>` || ""}<div class=${n({ [t.textContentContainer]: !0, [t.row]: !0 })}><slot name=${d.contentStart} @slotchange=${this.handleSlotChange}></slot><div class=${n(t.textContent)}>${l && o`<div class=${n(t.heading)}>${l}</div>` || ""}${e && o`<div class=${n(t.description)}>${e}</div>` || ""}</div><slot name=${d.contentEnd} @slotchange=${this.handleSlotChange}></slot></div><slot name=${d.contentBottom} @slotchange=${this.handleSlotChange}></slot></div></div>`;
  }
  render() {
    const { disabled: e } = this;
    return E({ disabled: e, children: this.href ? o`<calcite-link .disabled=${e} .href=${this.href}>${this.renderTile()}</calcite-link>` : this.renderTile() });
  }
}
$("calcite-tile", I);
export {
  I as Tile
};
