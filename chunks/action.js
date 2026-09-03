/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as $, L as y, s as a, b as e, I as r, F as k, d as z } from "./index.js";
import { i as m } from "./keyed.js";
import { e as f, n as p } from "./ref.js";
import { g as w } from "./guid.js";
import { c as E } from "./observers.js";
import { g as C } from "./component.js";
import { u as I } from "./useT9n.js";
import { u as R } from "./useSetFocus.js";
import { u as L } from "./useInteractive.js";
import { u as B } from "./useFormTrigger.js";
import { I as T, C as i } from "./resources.js";
const S = $`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-internal-action-font-size: var(--calcite-font-size--2);--calcite-internal-action-min-height: var(--calcite-size-sm);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-font-size: var(--calcite-font-size--1);--calcite-internal-action-min-height: var(--calcite-size-md);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-font-size: var(--calcite-font-size-0);--calcite-internal-action-min-height: var(--calcite-size-lg);--calcite-internal-action-line-height: 1.25rem;--calcite-internal-action-spacing: var(--calcite-spacing-sm-plus)}:host{display:flex;cursor:pointer;background-color:transparent;--calcite-internal-action-text-color: var(--calcite-color-text-3);border-radius:var(--calcite-action-corner-radius, var(--calcite-action-corner-radius-start-start, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-start-end, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-end-end, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-end-start, var(--calcite-corner-radius-xs)))}.interaction-container{border-radius:inherit}:host([width=full]){flex:1 0 auto}:host([width=full]) .button{justify-content:center}:host([width=full]) .button .text-container--visible{flex:none}:host([drag-handle]){cursor:move;--calcite-internal-action-text-color: var(--calcite-color-border-input);--calcite-internal-action-padding-inline: var(--calcite-spacing-xxs)}.button{position:relative;margin:0;display:flex;inline-size:auto;align-items:center;justify-content:flex-start;border-style:none;outline-color:transparent;box-sizing:border-box;background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));border-radius:inherit;color:var(--calcite-action-text-color, var(--calcite-internal-action-text-color));cursor:inherit;flex:1 0 auto;font-family:inherit;font-size:var(--calcite-internal-action-font-size);font-weight:var(--calcite-font-weight-normal);line-height:var(--calcite-internal-action-line-height);min-block-size:var(--calcite-internal-action-height, var(--calcite-internal-action-min-height));max-block-size:var(--calcite-internal-action-height, none);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-internal-action-spacing));padding-inline:var(--calcite-internal-action-padding-inline, var(--calcite-internal-action-spacing));text-align:start}.button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}.button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}.button--text-visible{gap:var(--calcite-internal-action-spacing);inline-size:100%}.icon-container{pointer-events:none;margin:0;display:flex;align-items:center;justify-content:center}.text-container{margin:0;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:0;transition-property:opacity;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:inline-size}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([active]) .button{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-3));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}:host([active]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-3))}:host([active]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) calcite-loader[inline]{margin-inline-end:0px;--calcite-loader-progress-color-inline: var(--calcite-action-loader-color)}:host([appearance=transparent]):host([active]) .button{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-transparent-press)))}:host([appearance=transparent]) .button{transition-property:box-shadow;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);background-color:var(--calcite-action-background-color, var(--calcite-color-transparent))}:host([appearance=transparent]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-transparent-hover))}:host([appearance=transparent]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-transparent-press)))}:host([selection-appearance=highlight]):host([active]) .button{background-color:var(--calcite-color-surface-highlight);color:var(--calcite-color-text-highlight)}:host([active-descendant]) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.indicator-with-icon{position:relative}.indicator-with-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{margin-inline:.25rem;inline-size:1rem;position:relative}.indicator-without-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}:host([scale=s]) .indicator-with-icon{position:relative}:host([scale=s]) .indicator-with-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.125rem;inset-inline-end:-.125rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}:host([scale=s]) .indicator-without-icon{position:relative}:host([scale=s]) .indicator-without-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.175rem;inset-inline-end:-.175rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`, D = $`.screen-reader-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}`;
class F extends y {
  constructor() {
    super(), this.guid = w(), this.buttonRef = f(), this.buttonId = T.button(this.guid), this.mutationObserver = E("mutation", () => this.requestUpdate()), this.messages = I({ blocking: !0 }), this.focusSetter = R()(this), this.indicatorRef = f(), this.interactiveContainer = L(this), this.labelElRef = f(), this.active = !1, this.activeDescendant = !1, this.appearance = "transparent", this.compact = !1, this.disabled = !1, this.dragHandle = !1, this.iconFlipRtl = !1, this.indicator = !1, this.loading = !1, this.overflowDisabled = !1, this.scale = "m", this.width = "auto", this.textEnabled = !1, this.type = "button", B()(this);
  }
  static {
    this.properties = { aria: 0, active: 7, activeDescendant: 7, alignment: 3, appearance: 3, compact: 7, disabled: 7, dragHandle: 7, form: 3, icon: 3, iconFlipRtl: 7, indicator: 7, label: 1, loading: 7, messageOverrides: 0, overflowDisabled: 7, scale: 3, width: 3, text: 1, textEnabled: 7, type: 3, selectionAppearance: 3 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [S, D];
  }
  async setFocus(t) {
    return this.focusSetter(() => this.buttonRef.value, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  getAccessibleLabel() {
    const t = this.label || this.text || "";
    return this.indicator ? this.messages.indicatorLabel.replace("{label}", t) : t;
  }
  getLabelledByElements() {
    const t = [
      ...this.labelElRef.value ? [this.labelElRef.value] : [],
      ...this.aria?.labelledByElements ?? []
    ];
    return t.length ? t : void 0;
  }
  renderTextContainer() {
    const { text: t, textEnabled: o } = this, n = {
      [i.textContainer]: !0,
      [i.textContainerVisible]: o
    };
    return t ? m("text-container", e`<div aria-hidden=true class=${a(n)}>${t}</div>`) : null;
  }
  renderIndicatorText() {
    const { indicator: t, messages: o, buttonId: n } = this;
    return e`<div aria-labelledby=${n ?? r} aria-live=polite class=${a(k.screenReaderText)} role=region ${p(this.indicatorRef)}>${t ? o.indicator : null}</div>`;
  }
  renderIconContainer() {
    const { loading: t, icon: o, scale: n, el: l, iconFlipRtl: v, indicator: s } = this, d = n === "l" ? "l" : "m", u = t ? e`<calcite-loader inline .label=${this.messages.loading} .scale=${d}></calcite-loader>` : null, h = o ? e`<calcite-icon class=${a({ [i.indicatorWithIcon]: s })} .flipRtl=${v} .icon=${o} .scale=${C(this.scale)}></calcite-icon>` : null, c = u || h, b = c || l.children?.length, g = e`<div class=${a({
      [i.slotContainer]: !0,
      [i.slotContainerHidden]: t
    })}><slot></slot></div>`;
    return b ? m("icon-container", e`<div aria-hidden=true class=${a(i.iconContainer)}>${c}${g}</div>`) : null;
  }
  renderLabel() {
    const t = this.getAccessibleLabel();
    return t ? e`<span class=${a(k.screenReaderText)} ${p(this.labelElRef)}>${t}</span>` : null;
  }
  renderButton() {
    const { compact: t, disabled: o, icon: n, loading: l, textEnabled: v, indicator: s, indicatorRef: d, buttonId: u } = this, h = this.getLabelledByElements(), c = {
      [i.button]: !0,
      [i.buttonTextVisible]: v,
      [i.buttonCompact]: t
    }, b = e`${this.renderIconContainer()}${this.renderTextContainer()}${!n && s && m("indicator-no-icon", e`<div class=${a(i.indicatorWithoutIcon)}></div>`) || ""}${this.renderLabel()}`, g = s && d.value ? [d.value] : [], x = [
      ...this.aria?.controlsElements ?? [],
      ...g
    ];
    return this.dragHandle ? e`<span .ariaBusy=${l} .ariaControlsElements=${x} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabelledByElements=${h} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${a(c)} id=${u ?? r} role=button tabindex=${(this.disabled ? void 0 : 0) ?? r} ${p(this.buttonRef)}>${b}</span>` : e`<button .ariaBusy=${l} .ariaChecked=${this.aria?.checked} .ariaControlsElements=${x} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabelledByElements=${h} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${a(c)} .disabled=${o} id=${u ?? r} .role=${this.aria?.role} type=${this.type ?? r} ${p(this.buttonRef)}>${b}</button>`;
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: e`${this.renderButton()}${this.renderIndicatorText()}` });
  }
}
z("calcite-action", F);
export {
  F as Action
};
