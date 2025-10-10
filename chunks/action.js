import { b as E, L as z, s as n, x as e, z as g, q as I } from "./index.js";
import { i as m } from "./keyed.js";
import { e as S, n as f } from "./ref.js";
import { g as T } from "./guid.js";
import { u as B, I as L } from "./interactive.js";
import { c as F } from "./observers.js";
import { g as R } from "./component.js";
import { u as H } from "./useT9n.js";
import { u as O } from "./useSetFocus.js";
import { f as D, s as P, r as j } from "./form.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  button: "button",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  indicatorText: "indicator-text",
  iconContainer: "icon-container",
  slotContainer: "slot-container",
  slotContainerHidden: "slot-container--hidden",
  textContainer: "text-container",
  textContainerVisible: "text-container--visible",
  indicatorWithIcon: "indicator-with-icon",
  indicatorWithoutIcon: "indicator-without-icon"
}, w = "calcite-action", N = {
  button: (s) => `${w}-${s}-button`,
  indicator: (s) => `${w}-${s}-indicator`
}, V = {
  tooltip: "tooltip"
}, W = E`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;cursor:pointer;background-color:transparent;--calcite-internal-action-text-color: var(--calcite-color-text-3);border-radius:var(--calcite-action-corner-radius, var(--calcite-action-corner-radius-start-start, var(--calcite-corner-radius)) var(--calcite-action-corner-radius-start-end, var(--calcite-corner-radius)) var(--calcite-action-corner-radius-end-end, var(--calcite-corner-radius)) var(--calcite-action-corner-radius-end-start, var(--calcite-corner-radius)))}.interaction-container{border-radius:inherit}:host([width=full]){flex:1 0 auto}:host([width=full]) .button{justify-content:center}:host([width=full]) .button .text-container--visible{flex:none}:host([drag-handle]){cursor:move;--calcite-internal-action-text-color: var(--calcite-color-border-input);--calcite-internal-action-padding-inline: var(--calcite-spacing-xxs)}.button{border-radius:inherit;position:relative;margin:0;display:flex;inline-size:auto;align-items:center;justify-content:flex-start;border-style:none;font-family:var(--calcite-font-family);font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));color:var(--calcite-action-text-color, var(--calcite-internal-action-text-color));text-align:unset;flex:1 0 auto;cursor:inherit}.button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}.button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}.icon-container{pointer-events:none;margin:0;display:flex;align-items:center;justify-content:center;min-inline-size:1rem;min-block-size:1.5rem}.text-container{margin:0;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.5rem;opacity:0;transition-property:opacity;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:inline-size}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([active]) .button{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-3));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}:host([active]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-3))}:host([active]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) .text-container{opacity:var(--calcite-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-inline-end:0px}:host([appearance=transparent]):host([active]) .button{background-color:var(--calcite-color-transparent-press)}:host([appearance=transparent]) .button{background-color:transparent;transition-property:box-shadow;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1)}:host([appearance=transparent]) .button:hover{background-color:var(--calcite-color-transparent-hover)}:host([appearance=transparent]) .button:active{background-color:var(--calcite-color-transparent-press)}:host([selection-appearance=highlight][active]) .button{background-color:var(--calcite-color-surface-highlight);color:var(--calcite-color-text-highlight)}:host([active-descendant]) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .button{font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal);padding-inline:var(--calcite-internal-action-padding-inline, .5rem);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-spacing-xxs))}:host([scale=s]) .button--text-visible .icon-container{margin-inline-end:.5rem}:host([scale=m]) .button{font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-normal);padding-inline:var(--calcite-internal-action-padding-inline, 1rem);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-spacing-md))}:host([scale=m]) .button--text-visible .icon-container{margin-inline-end:.75rem}:host([scale=l]) .button{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal);padding-inline:var(--calcite-internal-action-padding-inline, 1.25rem);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-spacing-xl))}:host([scale=l]) .button--text-visible .icon-container{margin-inline-end:1rem}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.button--text-visible{inline-size:100%}.indicator-with-icon{position:relative}.indicator-with-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{margin-inline:.25rem;inline-size:1rem;position:relative}.indicator-without-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;opacity:var(--calcite-opacity-disabled);background-color:var(--calcite-action-background-color, var(--calcite-action-background-color, var(--calcite-color-foreground-1)))}:host([disabled]):host([active]) .button,:host([disabled]):host([active]) .button:hover,:host([disabled]):host([active]) .button:focus{opacity:var(--calcite-opacity-disabled);background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3))))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class A extends z {
  constructor() {
    super(...arguments), this.guid = T(), this.buttonRef = S(), this.buttonId = N.button(this.guid), this.mutationObserver = F("mutation", () => this.requestUpdate()), this.messages = H({ blocking: !0 }), this.focusSetter = O()(this), this.active = !1, this.activeDescendant = !1, this.appearance = "solid", this.compact = !1, this.disabled = !1, this.dragHandle = !1, this.iconFlipRtl = !1, this.indicator = !1, this.loading = !1, this.scale = "m", this.width = "auto", this.textEnabled = !1, this.type = "button";
  }
  static {
    this.properties = { aria: 0, active: 7, activeDescendant: 7, alignment: 3, appearance: 3, compact: 7, disabled: 7, dragHandle: 7, form: 3, icon: [3, { type: String }], iconFlipRtl: 7, indicator: 7, label: 1, loading: 7, messageOverrides: 0, scale: 3, width: 3, text: 1, textEnabled: 7, type: 3, selectionAppearance: 3 };
  }
  static {
    this.styles = W;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.buttonRef.value, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.formEl = D(this), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  updated() {
    B(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.formEl = null, this.mutationObserver?.disconnect();
  }
  handleClick() {
    const { type: t } = this;
    t === "submit" ? P(this) : t === "reset" && j(this);
  }
  handleTooltipSlotChange(t) {
    const o = t.target.assignedElements({
      flatten: !0
    }).filter((c) => c?.matches("calcite-tooltip"))[0];
    o && (o.referenceElement = this.buttonRef.value);
  }
  storeIndicatorEl(t) {
    this.indicatorEl = t;
  }
  renderTextContainer() {
    const { text: t, textEnabled: a } = this, o = {
      [i.textContainer]: !0,
      [i.textContainerVisible]: a
    };
    return t ? m("text-container", e`<div class=${n(o)}>${t}</div>`) : null;
  }
  renderIndicatorText() {
    const { indicator: t, messages: a, buttonId: o } = this;
    return e`<div aria-labelledby=${o ?? g} aria-live=polite class=${n(i.indicatorText)} role=region ${f(this.storeIndicatorEl)}>${t ? a.indicator : null}</div>`;
  }
  renderIconContainer() {
    const { loading: t, icon: a, scale: o, el: c, iconFlipRtl: b, indicator: h } = this, p = o === "l" ? "l" : "m", r = t ? e`<calcite-loader inline .label=${this.messages.loading} .scale=${p}></calcite-loader>` : null, d = a ? e`<calcite-icon class=${n({ [i.indicatorWithIcon]: h })} .flipRtl=${b} .icon=${a} .scale=${R(this.scale)}></calcite-icon>` : null, l = r || d, v = l || c.children?.length, u = e`<div class=${n({
      [i.slotContainer]: !0,
      [i.slotContainerHidden]: t
    })}><slot></slot></div>`;
    return v ? m("icon-container", e`<div aria-hidden=true class=${n(i.iconContainer)}>${l}${u}</div>`) : null;
  }
  renderButton() {
    const { compact: t, disabled: a, icon: o, loading: c, textEnabled: b, label: h, text: p, indicator: r, indicatorEl: d, buttonId: l, messages: v } = this, u = h || p || "", x = r ? v.indicatorLabel.replace("{label}", u) : u, $ = {
      [i.button]: !0,
      [i.buttonTextVisible]: b,
      [i.buttonCompact]: t
    }, k = e`${this.renderIconContainer()}${this.renderTextContainer()}${!o && r && m("indicator-no-icon", e`<div class=${n(i.indicatorWithoutIcon)}></div>`) || ""}`, C = r && d ? [d] : [], y = [
      ...this.aria?.controlsElements ?? [],
      ...C
    ];
    return this.dragHandle ? e`<span .ariaBusy=${c} .ariaControlsElements=${y} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${x} .ariaLabelledByElements=${this.aria?.labelledByElements} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${n($)} id=${l ?? g} role=button tabindex=${this.disabled ? null : 0} ${f(this.buttonRef)}>${k}</span>` : e`<button .ariaBusy=${c} .ariaControlsElements=${y} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${x} .ariaLabelledByElements=${this.aria?.labelledByElements} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${n($)} .disabled=${a} id=${l ?? g} @click=${this.handleClick} ${f(this.buttonRef)}>${k}</button>`;
  }
  render() {
    return L({ disabled: this.disabled, children: e`${this.renderButton()}<slot name=${V.tooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${this.renderIndicatorText()}` });
  }
}
I("calcite-action", A);
export {
  A as Action
};
