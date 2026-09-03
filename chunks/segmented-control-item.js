/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as r, L as s, c as d, s as i, b as o, d as h } from "./index.js";
import { u as g } from "./dom.js";
import { t as m } from "./aria.js";
import { C as t, S as u } from "./resources23.js";
const b = r`:host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);outline-color:transparent;transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out}.label{pointer-events:none;margin:.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-segmented-control-color, var(--calcite-color-text-3));background-color:var(--calcite-segmented-control-background-color);box-shadow:var(--calcite-segmented-control-shadow);border-radius:max(0px,var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius)) - 2px);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out,color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host(:focus){outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));outline-offset:-1px;z-index:var(--calcite-z-index)}.label--scale-s{padding-inline:.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);padding-block:.125rem}.label--scale-m{padding-inline:.75rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);padding-block:.375rem}.label--scale-l{padding-inline:1rem;padding-block:var(--calcite-space-sm-plus);font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host(:hover) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-2));color:var(--calcite-segmented-control-color, var(--calcite-color-text-1))}:host(:active) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-3))}:host([checked]) .label{cursor:default;background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-brand));color:var(--calcite-segmented-control-color, var(--calcite-color-text-inverse))}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-1));box-shadow:var(--calcite-segmented-control-shadow, inset 0 0 0 1px var(--calcite-color-brand));color:var(--calcite-segmented-control-color, var(--calcite-color-brand))}:host([checked]) .label--outline{background-color:var(--calcite-segmented-control-background-color, transparent)}::slotted(input){display:none}@media(forced-colors:active){:host([checked]) .label{background-color:highlight}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{outline:2px solid transparent;outline-offset:2px}:host([checked]) .label:not([class~=label--outline]) .icon{color:highlightText}}.icon{position:relative;margin:0;display:inline-flex;line-height:inherit;margin-inline-start:var(--calcite-internal-segmented-control-icon-margin-start);margin-inline-end:var(--calcite-internal-segmented-control-icon-margin-end);--calcite-icon-color: var(--calcite-segmented-control-icon-color)}:host([icon-start]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-end: .5rem}:host([icon-end]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-start: .5rem}:host([icon-start]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-end: .75rem}:host([icon-end]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-start: .75rem}:host([icon-start]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-end: 1rem}:host([icon-end]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-start: 1rem}.label .icon--solo{--calcite-internal-segmented-control-icon-margin-start: 0;--calcite-internal-segmented-control-icon-margin-end: 0}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends s {
  constructor() {
    super(...arguments), this.hasSlottedContent = !1, this.appearance = "solid", this.checked = !1, this.iconFlipRtl = !1, this.layout = "horizontal", this.scale = "m", this.calciteInternalSegmentedControlItemChange = d({ cancelable: !1 });
  }
  static {
    this.properties = { hasSlottedContent: 16, appearance: 1, checked: 7, iconEnd: 3, iconFlipRtl: 7, iconStart: 3, layout: 1, scale: 1, value: 1 };
  }
  static {
    this.styles = b;
  }
  willUpdate(e) {
    e.has("checked") && (this.hasUpdated || this.checked !== !1) && this.calciteInternalSegmentedControlItemChange.emit();
  }
  handleSlotChange(e) {
    this.hasSlottedContent = g(e);
  }
  renderIcon(e, l = !1) {
    return e ? o`<calcite-icon class=${i({
      [t.icon]: !0,
      [t.iconSolo]: l
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} scale=s></calcite-icon>` : null;
  }
  render() {
    const { appearance: e, checked: l, layout: n, scale: a, value: c } = this;
    return this.el.ariaChecked = m(l), this.el.ariaLabel = c, this.el.role = "radio", o`<label class=${i({
      [t.label]: !0,
      [t.labelScale(a)]: !0,
      [t.labelHorizontal]: n === "horizontal",
      [t.labelOutline]: e === "outline",
      [t.labelOutlineFill]: e === "outline-fill"
    })}>${this.renderContent()}</label>`;
  }
  renderContent() {
    const { hasSlottedContent: e, iconEnd: l, iconStart: n } = this, a = n || l;
    return !e && a ? [this.renderIcon(a, !0), o`<slot @slotchange=${this.handleSlotChange}></slot>`] : [
      this.renderIcon(n),
      o`<slot @slotchange=${this.handleSlotChange}></slot>`,
      o`<slot name=${u.input}></slot>`,
      this.renderIcon(l)
    ];
  }
}
h("calcite-segmented-control-item", v);
export {
  v as SegmentedControlItem
};
