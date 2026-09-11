/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as m, L as g, c as e, s as c, b as v, d as u } from "./index.js";
import { i as b } from "./keyed.js";
import { e as y, n as p } from "./ref.js";
import { u as k } from "./index2.js";
import { b as d, r as x, c as w, e as E, h as z, F as f } from "./floating-ui.js";
import { t as C } from "./openCloseComponent.js";
import { F as L } from "./FloatingArrow.js";
import { u as D } from "./useTopLayer.js";
import { u as O, r as T } from "./manager.js";
import { C as h } from "./resources5.js";
const F = m`:host{display:contents;--calcite-internal-tooltip-padding-block: var(--calcite-spacing-sm);--calcite-internal-tooltip-padding-inline: var(--calcite-spacing-md)}:host([top-layer-disabled]){--calcite-floating-ui-z-index: var(--calcite-z-index-tooltip)}.position-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.position-container{opacity:0;inset-block-start:0;left:0}}.position-container{max-inline-size:var(--calcite-tooltip-max-size-x, 20rem);max-block-size:20rem}.position-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.position-container:popover-open{display:block}.position-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]){--calcite-internal-tooltip-padding-block: var(--calcite-spacing-xxs);--calcite-internal-tooltip-padding-inline: var(--calcite-spacing-sm)}:host([scale=s]) .container{font-size:var(--calcite-font-size-relative-xs);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .container{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}.container{position:relative;overflow:hidden;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;padding-block:var(--calcite-internal-tooltip-padding-block);padding-inline:var(--calcite-internal-tooltip-padding-inline);border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round));color:var(--calcite-tooltip-text-color, var(--calcite-color-text-1));text-align:start}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;box-shadow:var(--calcite-shadow-md);background-color:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-tooltip-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-tooltip-border-color, var(--calcite-color-border-3))}:host([hidden]){display:none}[hidden]{display:none}`, S = T({ hover: !0 });
class U extends g {
  constructor() {
    super(...arguments), this.direction = k(), this.referenceElementType = "hover", this.referenceElementController = O({ manager: S })(this), this.transitionProp = "opacity", this.transitionRef = y(), this.topLayer = D({
      disabledOverride: () => this.open && !this.referenceEl,
      target: () => this.floatingEl
    })(this), this.floatingLayout = "vertical", this.closeOnClick = !1, this.offsetDistance = d, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.pointerDisabled = !1, this.scale = "m", this.topLayerDisabled = !1, this.calciteTooltipBeforeClose = e({ cancelable: !1 }), this.calciteTooltipBeforeOpen = e({ cancelable: !1 }), this.calciteTooltipClose = e({ cancelable: !1 }), this.calciteTooltipOpen = e({ cancelable: !1 });
  }
  static {
    this.properties = { floatingLayout: 16, referenceEl: 16, closeOnClick: 7, label: 1, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, pointerDisabled: 7, referenceElement: 1, scale: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = F;
  }
  async reposition(i = !1) {
    const { referenceEl: o, placement: a, overlayPositioning: n, offsetDistance: l, offsetSkidding: t, arrowEl: r, floatingEl: s } = this;
    return x(this, {
      direction: this.direction,
      floatingEl: s,
      referenceEl: o,
      overlayPositioning: n,
      placement: a,
      offsetDistance: l,
      offsetSkidding: t,
      arrowEl: r,
      type: "tooltip"
    }, i);
  }
  willUpdate(i) {
    (i.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== d) || i.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || i.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || i.has("placement") && (this.hasUpdated || this.placement !== "auto")) && this.reposition(!0), i.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), i.has("referenceElement") && !this.referenceElement && this.open && this.topLayer.hide();
  }
  updated(i) {
    i.has("referenceEl") && w(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), E(this);
  }
  openHandler() {
    C(this), this.reposition(!0);
  }
  onBeforeOpen() {
    this.calciteTooltipBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.calciteTooltipOpen.emit();
  }
  onBeforeClose() {
    this.calciteTooltipBeforeClose.emit();
  }
  onClose() {
    this.calciteTooltipClose.emit(), z(this), this.topLayer.hide();
  }
  setFloatingEl(i) {
    this.floatingEl = i;
  }
  setArrowEl(i) {
    this.arrowEl = i, this.reposition(!0);
  }
  render() {
    const { referenceEl: i, label: o, open: a, pointerDisabled: n, floatingLayout: l } = this, t = i && a, r = !t, s = n ? null : b("floating-arrow", L({ floatingLayout: l, ref: this.setArrowEl }));
    return this.el.inert = r, this.el.ariaLabel = o ?? null, this.el.ariaLive = "polite", this.el.role = "tooltip", v`<div class=${c(h.positionContainer)} popover=manual ${p(this.setFloatingEl)}><div class=${c({
      [f.animation]: !0,
      [f.animationActive]: t
    })} ${p(this.transitionRef)}>${s}<div class=${c(h.container)}><slot></slot></div></div></div>`;
  }
}
u("calcite-tooltip", U);
export {
  U as Tooltip
};
