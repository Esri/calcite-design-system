import { b as S, L as $, c as w, s, x as o, d as h, E as c, q as b } from "./index.js";
import { i as x } from "./keyed.js";
import { e as C, n as y } from "./ref.js";
import { f as z, h as u } from "./utils4.js";
import { s as k } from "./dom.js";
import { u as I, I as E } from "./interactive.js";
import { u as M } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  imageContainer: "image-container",
  container: "container",
  selectable: "selectable",
  nonInteractive: "non-interactive",
  selected: "selected",
  internalSvgContainer: "internal-svg-container",
  internalSvgDisabled: "internal-svg-disabled",
  internalSvgEmpty: "internal-svg-empty",
  swatch: "swatch",
  checker: "checker",
  noColorSwatch: "swatch--no-color"
}, D = {
  image: "image"
}, f = 4, n = {
  squareSize: f,
  size: f * 2
}, d = {
  checker: "checker",
  shape: "shape",
  swatchRect: "swatch-rect",
  swatchSolid: "swatch-solid",
  swatchTransparent: "swatch-transparent"
}, P = S`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block;--calcite-internal-swatch-inset: var(--calcite-spacing-xxs)}:host([scale=s]) .container{--calcite-internal-swatch-size: var(--calcite-spacing-xl)}:host([scale=m]) .container{--calcite-internal-swatch-size: var(--calcite-spacing-xxl)}:host([scale=l]) .container{--calcite-internal-swatch-size: var(--calcite-spacing-xxxl)}.container{position:relative;box-sizing:border-box;justify-content:center;overflow:hidden;outline-color:transparent;font-size:var(--calcite-internal-swatch-font-size, var(--calcite-font-size));block-size:var(--calcite-internal-swatch-size, auto);inline-size:var(--calcite-internal-swatch-size, auto);min-inline-size:var(--calcite-internal-swatch-size, auto);border-radius:var(--calcite-swatch-corner-radius, 0)}.container:not(.non-interactive):hover{cursor:pointer;box-shadow:0 0 0 var(--calcite-border-width-md) var(--calcite-color-border-2)}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.swatch{position:absolute;display:inline-flex;overflow:hidden;z-index:calc(var(--calcite-z-index) + 1);block-size:var(--calcite-internal-swatch-size, auto);inline-size:var(--calcite-internal-swatch-size, auto);min-inline-size:var(--calcite-internal-swatch-size, auto);border-radius:var(--calcite-swatch-corner-radius, 0)}:host([selected]) .swatch{inset:var(--calcite-internal-swatch-inset);block-size:calc(var(--calcite-internal-swatch-size, auto) - 2 * var(--calcite-internal-swatch-inset));inline-size:calc(var(--calcite-internal-swatch-size, auto) - 2 * var(--calcite-internal-swatch-inset));min-inline-size:calc(var(--calcite-internal-swatch-size, auto) - 2 * var(--calcite-internal-swatch-inset))}:host([selected]) .container{box-shadow:inset 0 0 0 var(--calcite-border-width-md) var(--calcite-color-text-1),inset 0 0 0 var(--calcite-border-width-lg) var(--calcite-color-foreground-1)}:host([selected]) .image-container{inset:var(--calcite-internal-swatch-inset)}.image-container{position:absolute;display:inline-flex;overflow:hidden;z-index:calc(var(--calcite-z-index) + 2);inset:var(--calcite-spacing-px);display:flex;align-items:center;justify-content:center;pointer-events:none;border-radius:var(--calcite-swatch-corner-radius, 0)}.internal-svg-container{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:calc(var(--calcite-z-index) + 2)}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}:host([selected]) #swatch-rect,:host([selected]) #swatch-solid,:host([selected]) #swatch-transparent{stroke-width:0}#swatch-rect,#swatch-solid,#swatch-transparent{stroke:var(--calcite-color-text-1);stroke-width:var(--calcite-border-width-md);stroke-opacity:.3;rx:var(--calcite-swatch-corner-radius)}.internal-svg-disabled{stroke:#6a6a6a;fill:#fff}.internal-svg-empty{stroke:var(--calcite-color-status-danger);stroke-width:3}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}`;
class R extends $ {
  constructor() {
    super(), this.containerRef = C(), this.focusSetter = M()(this), this.hasImage = !1, this.disabled = !1, this.interactive = !1, this.scale = "m", this.selected = !1, this.selectionMode = "none", this.calciteInternalSwatchKeyEvent = w({ cancelable: !1 }), this.calciteInternalSwatchSelect = w({ cancelable: !1 }), this.calciteInternalSyncSelectedSwatches = w({ cancelable: !1 }), this.calciteSwatchSelect = w({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { hasImage: 16, color: 1, disabled: 7, interactive: 5, label: 1, parentSwatchGroup: 0, scale: 3, selected: 7, selectionMode: 1, value: 1 };
  }
  static {
    this.styles = P;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async load() {
    this.handleColorChange(this.color);
  }
  willUpdate(e) {
    e.has("selected") && this.hasUpdated && this.watchSelected(this.selected), e.has("color") && this.handleColorChange(this.color);
  }
  updated() {
    I(this);
  }
  loaded() {
    this.selectionMode !== "none" && this.interactive && this.selected && this.handleSelectionPropertyChange(this.selected);
  }
  watchSelected(e) {
    this.selectionMode !== "none" && this.handleSelectionPropertyChange(e);
  }
  keyDownHandler(e) {
    if (e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent(), e.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalSwatchKeyEvent.emit(e), e.preventDefault();
          break;
      }
  }
  handleSlotImageChange(e) {
    this.hasImage = k(e);
  }
  handleEmittingEvent() {
    this.interactive && this.calciteSwatchSelect.emit();
  }
  handleSelectionPropertyChange(e) {
    this.selectionMode === "single" && this.calciteInternalSyncSelectedSwatches.emit(), !this.parentSwatchGroup.selectedItems.includes(this.el) && e && this.selectionMode !== "multiple" && this.calciteInternalSwatchSelect.emit(), this.selectionMode !== "single" && this.calciteInternalSyncSelectedSwatches.emit();
  }
  handleColorChange(e) {
    this.internalColor = e ? z(e) : null;
  }
  renderSwatchImage() {
    return o`<div class=${s(t.imageContainer)}><slot name=${D.image} @slotchange=${this.handleSlotImageChange}></slot></div>`;
  }
  renderEmptyDisplay() {
    const e = this.scale === "s" ? "12" : this.scale === "m" ? "16" : "20";
    return o`<div class=${s(t.internalSvgContainer)}><svg fill=none height=${e} viewBox=${`0 0 ${e} ${e}`} width=${e} xmlns=http://www.w3.org/2000/svg>${h`<path class=${s(t.internalSvgEmpty)} d=${`M${e} 0L0 ${e}`} />`}</svg></div>`;
  }
  renderDisabledDisplay() {
    const e = o`<svg fill=none height=14 viewBox="0 0 14 14" width=14 xmlns=http://www.w3.org/2000/svg>${h`<path class=${s(t.internalSvgDisabled)} d="M7 0.5C10.5899 0.5 13.5 3.41015 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5ZM4.78906 10.917C5.44221 11.2866 6.19529 11.5 7 11.5C9.48528 11.5 11.5 9.48528 11.5 7C11.5 6.19529 11.2866 5.44221 10.917 4.78906L4.78906 10.917ZM7 2.5C4.51472 2.5 2.5 4.51472 2.5 7C2.5 7.95644 2.79808 8.84235 3.30664 9.57129L9.57129 3.30664C8.84235 2.79808 7.95644 2.5 7 2.5Z" />`}</svg>`, i = o`<svg fill=none height=18 viewBox="0 0 18 18" width=18 xmlns=http://www.w3.org/2000/svg>${h`<path class=${s(t.internalSvgDisabled)} d="M9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 13.6944 13.6944 17.5 9 17.5C4.30558 17.5 0.5 13.6944 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5ZM5.78125 14.2588C6.71828 14.8337 7.81941 15.167 9 15.167C12.4058 15.167 15.167 12.4058 15.167 9C15.167 7.81941 14.8337 6.71828 14.2588 5.78125L5.78125 14.2588ZM9 2.83301C5.59424 2.83301 2.83301 5.59424 2.83301 9C2.83301 10.3817 3.28731 11.6565 4.05469 12.6846L12.6846 4.05469C11.6565 3.28731 10.3817 2.83301 9 2.83301Z" />`}</svg>`;
    return o`<div class=${s(t.internalSvgContainer)}>${this.scale === "l" ? i : e}</div>`;
  }
  renderSwatch() {
    const { internalColor: e } = this, i = "0", r = !e, a = {
      height: "100%",
      rx: i,
      width: "100%"
    };
    if (r)
      return h`<clipPath id=${d.shape}><rect height=100% rx=${i} width=100% /></clipPath>${this.renderSwatchRect({
        clipPath: `inset(0 round "${i}")`,
        ...a
      })}<line clip-path=url(#shape) x1=100% x2=0 y1=0 y2=100% />`;
    const l = e.alpha(), v = u(e), p = u(e, l < 1);
    return h`<defs><pattern height=${n.size} id=${d.checker} patternUnits=userSpaceOnUse width=${n.size} x=0 y=0><rect class=${s(t.checker)} height=${n.squareSize} width=${n.squareSize} x=0 y=0 /><rect class=${s(t.checker)} height=${n.squareSize} width=${n.squareSize} x=${n.squareSize} y=${n.squareSize} /></pattern></defs>${this.renderSwatchRect({
      fill: "url(#checker)",
      rx: a.rx,
      height: a.height,
      width: a.width
    })}${this.renderSwatchRect({
      clipPath: l < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round "${i}")`,
      fill: v,
      id: d.swatchSolid,
      ...a
    })}${l < 1 ? this.renderSwatchRect({
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      fill: p,
      id: d.swatchTransparent,
      key: "opacity-fill",
      ...a
    }) : null}`;
  }
  renderSwatchRect({ clipPath: e, fill: i, height: r, key: a, rx: l, stroke: v, strokeWidth: p, width: m, id: g }) {
    return x(a, h`<rect clip-path=${e ?? c} fill=${i ?? c} height=${r ?? c} id=${(g || d.swatchRect) ?? c} rx=${l ?? c} stroke=${v ?? c} stroke-width=${p ?? c} width=${m ?? c} />`);
  }
  render() {
    const { disabled: e } = this, i = e || !e && !this.interactive, r = this.selectionMode === "multiple" && this.interactive ? "checkbox" : this.selectionMode !== "none" && this.interactive ? "radio" : this.interactive ? "button" : "presentation", a = !this.internalColor, l = {
      [t.swatch]: !0,
      [t.noColorSwatch]: a || this.hasImage && !this.internalColor
    };
    return E({ disabled: e, children: o`<div .ariaChecked=${this.selectionMode !== "none" && this.interactive ? this.selected : void 0} .ariaLabel=${r !== "presentation" ? this.label : ""} class=${s({
      [t.container]: !0,
      [t.selectable]: this.selectionMode !== "none",
      [t.selected]: this.selected,
      [t.nonInteractive]: !this.interactive
    })} @click=${this.handleEmittingEvent} .role=${r} .tabIndex=${i ? -1 : 0} title=${this.label ?? c} ${y(this.containerRef)}>${this.renderSwatchImage()}${!this.internalColor && !this.hasImage && this.renderEmptyDisplay() || ""}${this.disabled && this.renderDisabledDisplay() || ""}<svg class=${s(l)} role=presentation xmlns=http://www.w3.org/2000/svg>${this.renderSwatch()}</svg></div>` });
  }
}
b("calcite-swatch", R);
export {
  R as Swatch
};
