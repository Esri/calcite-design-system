import { b as s, L as d, c as h, s as i, x as t, q as g } from "./index.js";
import { u as m, t as b } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const u = {
  input: "input"
}, o = {
  label: "label",
  labelScale: (c) => `label--scale-${c}`,
  labelHorizontal: "label--horizontal",
  labelOutline: "label--outline",
  labelOutlineFill: "label--outline-fill",
  icon: "icon",
  iconSolo: "icon--solo"
}, v = s`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);outline-color:transparent;transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out,border-color var(--calcite-animation-timing) ease-in-out}.label{pointer-events:none;margin:.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-segmented-control-color, var(--calcite-color-text-3));background-color:var(--calcite-segmented-control-background-color);box-shadow:var(--calcite-segmented-control-shadow);border-color:var(--calcite-segmented-control-border-color);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out,border-color var(--calcite-internal-animation-timing-fast) ease-in-out,color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host(:focus){outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));outline-offset:-1px;z-index:var(--calcite-z-index)}.label--scale-s{padding-inline:.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-block:.125rem}.label--scale-m{padding-inline:.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-block:.375rem}.label--scale-l{padding-inline:1rem;padding-block:.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-2));color:var(--calcite-segmented-control-color, var(--calcite-color-text-1))}:host(:active) .label{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-3))}:host([checked]) .label{cursor:default;background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-brand));border-color:var(--calcite-segmented-control-border-color, var(--calcite-color-brand));color:var(--calcite-segmented-control-color, var(--calcite-color-text-inverse))}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{background-color:var(--calcite-segmented-control-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-segmented-control-border-color, var(--calcite-color-brand));box-shadow:var(--calcite-segmented-control-shadow, inset 0 0 0 1px var(--calcite-color-brand));color:var(--calcite-segmented-control-color, var(--calcite-color-brand))}:host([checked]) .label--outline{background-color:var(--calcite-segmented-control-background-color, transparent)}::slotted(input){display:none}@media (forced-colors: active){:host([checked]) .label{background-color:highlight}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{outline:2px solid transparent;outline-offset:2px}:host([checked]) .label:not([class~=label--outline]) .icon{color:highlightText}}.icon{position:relative;margin:0;display:inline-flex;line-height:inherit;margin-inline-start:var(--calcite-internal-segmented-control-icon-margin-start);margin-inline-end:var(--calcite-internal-segmented-control-icon-margin-end);--calcite-icon-color: var(--calcite-segmented-control-icon-color)}:host([icon-start]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-end: .5rem}:host([icon-end]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-start: .5rem}:host([icon-start]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-end: .75rem}:host([icon-end]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-start: .75rem}:host([icon-start]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-end: 1rem}:host([icon-end]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-start: 1rem}.label .icon--solo{--calcite-internal-segmented-control-icon-margin-start: 0;--calcite-internal-segmented-control-icon-margin-end: 0}:host([hidden]){display:none}[hidden]{display:none}`;
class f extends d {
  constructor() {
    super(...arguments), this.hasSlottedContent = !1, this.appearance = "solid", this.checked = !1, this.iconFlipRtl = !1, this.layout = "horizontal", this.scale = "m", this.calciteInternalSegmentedControlItemChange = h({ cancelable: !1 });
  }
  static {
    this.properties = { hasSlottedContent: 16, appearance: 1, checked: 7, iconEnd: [3, { type: String }], iconFlipRtl: 7, iconStart: [3, { type: String }], layout: 1, scale: 1, value: 1 };
  }
  static {
    this.styles = v;
  }
  willUpdate(e) {
    e.has("checked") && (this.hasUpdated || this.checked !== !1) && this.calciteInternalSegmentedControlItemChange.emit();
  }
  handleSlotChange(e) {
    this.hasSlottedContent = m(e);
  }
  renderIcon(e, l = !1) {
    return e ? t`<calcite-icon class=${i({
      [o.icon]: !0,
      [o.iconSolo]: l
    })} .flipRtl=${this.iconFlipRtl} .icon=${e} scale=s></calcite-icon>` : null;
  }
  render() {
    const { appearance: e, checked: l, layout: n, scale: a, value: r } = this;
    return this.el.ariaChecked = b(l), this.el.ariaLabel = r, this.el.role = "radio", t`<label class=${i({
      [o.label]: !0,
      [o.labelScale(a)]: !0,
      [o.labelHorizontal]: n === "horizontal",
      [o.labelOutline]: e === "outline",
      [o.labelOutlineFill]: e === "outline-fill"
    })}>${this.renderContent()}</label>`;
  }
  renderContent() {
    const { hasSlottedContent: e, iconEnd: l, iconStart: n } = this, a = n || l;
    return !e && a ? [this.renderIcon(a, !0), t`<slot @slotchange=${this.handleSlotChange}></slot>`] : [
      this.renderIcon(n),
      t`<slot @slotchange=${this.handleSlotChange}></slot>`,
      t`<slot name=${u.input}></slot>`,
      this.renderIcon(l)
    ];
  }
}
g("calcite-segmented-control-item", f);
export {
  f as SegmentedControlItem
};
