/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as i, L as s, c as d, s as n, b as c, d as h } from "./index.js";
import { x as g } from "./dom.js";
import { t as v } from "./aria.js";
import { C as t, S as m } from "./resources23.js";
const u = i`:host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));outline:none;transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out}.label{pointer-events:none;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-segmented-control-color, var(--calcite-theme-color-text-3, var(--calcite-color-text-3)));background-color:var(--calcite-segmented-control-background-color);border:var(--calcite-border-width-sm) solid transparent;box-shadow:var(--calcite-segmented-control-shadow);border-radius:max(0px,(var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))));transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out,color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host(:focus){z-index:var(--calcite-z-index)}:host(:focus) .label{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)));outline-offset:-1px;border-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))}.label--scale-s{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);padding-inline:var(--calcite-space-sm);padding-block:calc(var(--calcite-space-base) + var(--calcite-space-px))}.label--scale-m{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);padding-inline:var(--calcite-space-md);padding-block:calc(var(--calcite-space-xs) + var(--calcite-space-px))}.label--scale-l{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);padding-inline:var(--calcite-space-lg);padding-block:calc(var(--calcite-space-sm-plus) + var(--calcite-space-px))}:host(:hover) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-transparent-hover));color:var(--calcite-segmented-control-color, var(--calcite-color-text-1))}:host(:active) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-transparent-press));color:var(--calcite-segmented-control-color, var(--calcite-color-text-1))}:host([checked]) .label{cursor:default;background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-brand));color:var(--calcite-segmented-control-color, var(--calcite-color-text-inverse));border-color:var(--calcite-segmented-control-item-border-color, var(--calcite-color-brand))}:host([checked]) .label--neutral{border-color:var(--calcite-segmented-control-item-border-color, var(--calcite-color-border-input));background-color:var(--calcite-segmented-control-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));color:var(--calcite-segmented-control-color, var(--calcite-color-text-1))}:host([checked]) .label--highlight{border-color:var(--calcite-segmented-control-item-border-color, var(--calcite-color-brand));background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-surface-highlight));color:var(--calcite-segmented-control-color, var(--calcite-color-text-highlight))}:host(:first-of-type) .label--horizontal{border-start-start-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius));border-end-start-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))}:host(:last-of-type) .label--horizontal{border-start-end-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius));border-end-end-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))}:host(:first-of-type) .label:not(.label--horizontal){border-start-start-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius));border-start-end-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))}:host(:last-of-type) .label:not(.label--horizontal){border-end-start-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius));border-end-end-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius))}::slotted(input){display:none}@media(forced-colors:active){:host([checked]) .label{background-color:highlight}:host([checked]) .label--neutral,:host([checked]) .label--highlight{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md)}:host([checked]) .label:not([class~=label--neutral]) .icon{color:highlightText}:host(:focus) .label{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)));outline-offset:-1px}}.icon{position:relative;margin:var(--calcite-space-none);display:inline-flex;line-height:inherit;margin-inline-start:var(--calcite-internal-segmented-control-icon-margin-start);margin-inline-end:var(--calcite-internal-segmented-control-icon-margin-end);--calcite-icon-color: var(--calcite-segmented-control-icon-color, currentColor)}:host([icon-start]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-end: var(--calcite-space-sm)}:host([icon-end]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-start: var(--calcite-space-sm)}:host([icon-start]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-end: var(--calcite-space-md)}:host([icon-end]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-start: var(--calcite-space-md)}:host([icon-start]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-end: var(--calcite-space-lg)}:host([icon-end]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-start: var(--calcite-space-lg)}.label .icon--solo{--calcite-internal-segmented-control-icon-margin-start: 0;--calcite-internal-segmented-control-icon-margin-end: 0}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends s {
  constructor() {
    super(...arguments), this.hasSlottedContent = !1, this.appearance = "neutral", this.checked = !1, this.iconFlipRtl = !1, this.layout = "horizontal", this.scale = "m", this.calciteInternalSegmentedControlItemChange = d({ cancelable: !1 });
  }
  static {
    this.properties = { hasSlottedContent: 16, appearance: 1, checked: 7, iconEnd: 3, iconFlipRtl: 7, iconStart: 3, layout: 1, scale: 1, value: 1 };
  }
  static {
    this.styles = u;
  }
  willUpdate(e) {
    e.has("checked") && (this.hasUpdated || this.checked !== !1) && this.calciteInternalSegmentedControlItemChange.emit();
  }
  handleSlotChange(e) {
    this.hasSlottedContent = g(e);
  }
  renderIcon(e, a = !1) {
    return e ? c`<calcite-icon class=${n({
      [t.icon]: !0,
      [t.iconSolo]: a
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} scale=s></calcite-icon>` : null;
  }
  render() {
    const { appearance: e, checked: a, layout: r, scale: o, value: l } = this;
    return this.el.ariaChecked = v(a), this.el.ariaLabel = l, this.el.role = "radio", c`<label class=${n({
      [t.label]: !0,
      [t.labelScale(o)]: !0,
      [t.labelHorizontal]: r === "horizontal",
      [t.labelNeutral]: e === "neutral",
      [t.labelHighlight]: e === "highlight"
    })}>${this.renderContent()}</label>`;
  }
  renderContent() {
    const { hasSlottedContent: e, iconEnd: a, iconStart: r } = this, o = r || a;
    return !e && o ? [this.renderIcon(o, !0), c`<slot @slotchange=${this.handleSlotChange}></slot>`] : [
      this.renderIcon(r),
      c`<slot @slotchange=${this.handleSlotChange}></slot>`,
      c`<slot name=${m.input}></slot>`,
      this.renderIcon(a)
    ];
  }
}
h("calcite-segmented-control-item", b);
export {
  b as SegmentedControlItem
};
