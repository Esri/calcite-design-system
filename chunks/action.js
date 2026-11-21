/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as k, L as y, s as a, b as t, o as r, C as x, f as z } from "./index.js";
import { i as g } from "./keyed.js";
import { e as f, n as v } from "./ref.js";
import { g as E } from "./guid.js";
import { c as w } from "./observers.js";
import { g as C } from "./component.js";
import { u as L } from "./useT9n.js";
import { u as I } from "./useFocusable.js";
import { u as R } from "./useInteractive.js";
import { u as B } from "./useFormTrigger.js";
import { I as T, C as i } from "./resources.js";
import { s as S } from "./screen-reader.js";
import { t as $ } from "./aria.js";
const F = k`:host{box-sizing:border-box;background-color:var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1));color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-internal-action-font-size: var(--calcite-font-size--2);--calcite-internal-action-min-height: var(--calcite-size-sm);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=m]){--calcite-internal-action-font-size: var(--calcite-font-size--1);--calcite-internal-action-min-height: var(--calcite-size-md);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]){--calcite-internal-action-font-size: var(--calcite-font-size-0);--calcite-internal-action-min-height: var(--calcite-size-lg);--calcite-internal-action-line-height: 1.25rem;--calcite-internal-action-spacing: var(--calcite-theme-space-sm-plus, var(--calcite-spacing-sm-plus))}:host{display:flex;background-color:var(--calcite-color-transparent);cursor:pointer;--calcite-internal-action-text-color: var(--calcite-color-text-3);border-radius:var(--calcite-action-corner-radius, var(--calcite-corner-radius-xs))}.interaction-container{border-radius:inherit}:host([width=full]){flex:1 0 auto}:host([width=full]) .button{justify-content:center}:host([width=full]) .button .text-container--visible{flex:none}:host([drag-handle]){cursor:move;--calcite-internal-action-text-color: var(--calcite-color-border-input);--calcite-internal-action-padding-inline: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.button{outline-color:var(--calcite-color-transparent);position:relative;margin:var(--calcite-space-none);display:flex;inline-size:auto;align-items:center;justify-content:flex-start;border-style:none;box-sizing:border-box;background-color:var(--calcite-action-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));border-radius:inherit;color:var(--calcite-action-text-color, var(--calcite-internal-action-text-color));cursor:inherit;flex:1 0 auto;font-family:inherit;font-size:var(--calcite-internal-action-font-size);font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));line-height:var(--calcite-internal-action-line-height);min-block-size:var(--calcite-internal-action-height, var(--calcite-internal-action-min-height));max-block-size:var(--calcite-internal-action-height, none);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-internal-action-spacing));padding-inline:var(--calcite-internal-action-padding-inline, var(--calcite-internal-action-spacing));text-align:start}.button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)));color:var(--calcite-action-text-color-press, var(--calcite-color-text-1))}.button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)))}.button--text-visible{gap:var(--calcite-internal-action-spacing);inline-size:100%}.icon-container{pointer-events:none;margin:var(--calcite-space-none);display:flex;align-items:center;justify-content:center}.text-container{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition-property:inline-size;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin:var(--calcite-space-none);inline-size:var(--calcite-space-none);opacity:0;transition-timing-function:var(--calcite-animation-easing-function)}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:var(--calcite-opacity-full)}:host([active]) .button{background-color:var(--calcite-action-background-color, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)));color:var(--calcite-action-text-color-press, var(--calcite-color-text-1))}:host([active]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)))}:host([active]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}:host([loading]) calcite-loader[inline]{margin-inline-end:0px;--calcite-loader-progress-color-inline: var(--calcite-action-loader-color)}:host([appearance=transparent]):host([active]) .button{background-color:var(--calcite-action-background-color-press, var(--calcite-color-transparent-press))}:host([appearance=transparent]) .button{transition-property:box-shadow;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;transition-timing-function:var(--calcite-animation-easing-function);background-color:var(--calcite-action-background-color, var(--calcite-color-transparent))}:host([appearance=transparent]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-transparent-hover))}:host([appearance=transparent]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-color-transparent-press))}:host([selection-appearance=highlight]):host([active]) .button{background-color:var(--calcite-color-surface-highlight);color:var(--calcite-color-text-highlight)}:host([active-descendant]) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}.slot-container{display:flex}.slot-container--hidden{display:none}.indicator-with-icon{position:relative}.indicator-with-icon:after{content:"";position:absolute;block-size:var(--calcite-space-sm);inline-size:var(--calcite-space-sm);border-radius:var(--calcite-corner-radius-pill);inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{inline-size:var(--calcite-space-lg);margin-inline:var(--calcite-space-2xs);position:relative}.indicator-without-icon:after{content:"";position:absolute;block-size:var(--calcite-space-sm);inline-size:var(--calcite-space-sm);border-radius:var(--calcite-corner-radius-pill);inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}:host([scale=s]) .indicator-with-icon{position:relative}:host([scale=s]) .indicator-with-icon:after{content:"";position:absolute;block-size:var(--calcite-space-sm);inline-size:var(--calcite-space-sm);border-radius:var(--calcite-corner-radius-pill);inset-block-end:-.125rem;inset-inline-end:-.125rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}:host([scale=s]) .indicator-without-icon{position:relative}:host([scale=s]) .indicator-without-icon:after{content:"";position:absolute;block-size:var(--calcite-space-sm);inline-size:var(--calcite-space-sm);border-radius:var(--calcite-corner-radius-pill);inset-block-end:-.175rem;inset-inline-end:-.175rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}`;
class O extends y {
  constructor() {
    super(), this.guid = E(), this.buttonRef = f(), this.buttonId = T.button(this.guid), this.mutationObserver = w("mutation", () => this.requestUpdate()), this.messages = L({ blocking: !0 }), this.focusSetter = I()(this).setFocus, this.indicatorRef = f(), this.interactiveContainer = R(this), this.labelElRef = f(), this.active = !1, this.appearance = "transparent", this.disabled = !1, this.dragHandle = !1, this.iconFlipRtl = !1, this.indicator = !1, this.loading = !1, this.overflowDisabled = !1, this.scale = "m", this.width = "auto", this.textEnabled = !1, this.type = "button", B()(this);
  }
  static {
    this.properties = { aria: 0, active: 7, alignment: 3, appearance: 3, disabled: 7, dragHandle: 7, form: 3, icon: 3, iconFlipRtl: 7, indicator: 7, label: 1, loading: 7, messageOverrides: 0, overflowDisabled: 7, scale: 3, width: 3, text: 1, textEnabled: 7, type: 3, selectionAppearance: 3 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [F, S];
  }
  async setFocus(e) {
    return this.focusSetter(() => this.buttonRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  getAccessibleLabel() {
    const e = this.label || this.text || "";
    return this.indicator ? this.messages.indicatorLabel.replace("{label}", e) : e;
  }
  getLabelledByElements() {
    const e = [
      ...this.labelElRef.value ? [this.labelElRef.value] : [],
      ...this.aria?.labelledByElements ?? []
    ];
    return e.length ? e : void 0;
  }
  renderTextContainer() {
    const { text: e, textEnabled: c } = this, o = {
      [i.textContainer]: !0,
      [i.textContainerVisible]: c
    };
    return e ? g("text-container", t`<div aria-hidden=true class=${a(o)}>${e}</div>`) : null;
  }
  renderIndicatorText() {
    const { indicator: e, messages: c, buttonId: o } = this;
    return t`<div aria-labelledby=${o ?? r} aria-live=polite class=${a(x.screenReaderText)} role=region ${v(this.indicatorRef)}>${e ? c.indicator : null}</div>`;
  }
  renderIconContainer() {
    const { loading: e, icon: c, scale: o, el: p, iconFlipRtl: l, indicator: s } = this, d = o === "l" ? "l" : "m", u = e ? t`<calcite-loader inline .label=${this.messages.loading} .scale=${d}></calcite-loader>` : null, h = c ? t`<calcite-icon class=${a({ [i.indicatorWithIcon]: s })} .flipRtl=${l} .icon=${c} .scale=${C(this.scale)}></calcite-icon>` : null, n = u || h, m = n || p.children?.length, b = t`<div class=${a({
      [i.slotContainer]: !0,
      [i.slotContainerHidden]: e
    })}><slot></slot></div>`;
    return m ? g("icon-container", t`<div aria-hidden=true class=${a(i.iconContainer)}>${n}${b}</div>`) : null;
  }
  renderLabel() {
    const e = this.getAccessibleLabel();
    return e ? t`<span class=${a(x.screenReaderText)} ${v(this.labelElRef)}>${e}</span>` : null;
  }
  renderButton() {
    const { disabled: e, icon: c, loading: o, textEnabled: p, indicator: l, indicatorRef: s, buttonId: d } = this, u = this.getLabelledByElements(), h = {
      [i.button]: !0,
      [i.buttonTextVisible]: p
    }, n = t`${this.renderIconContainer()}${this.renderTextContainer()}${!c && l && g("indicator-no-icon", t`<div class=${a(i.indicatorWithoutIcon)}></div>`) || ""}${this.renderLabel()}`, m = l && s.value ? [s.value] : [], b = [
      ...this.aria?.controlsElements ?? [],
      ...m
    ];
    return this.dragHandle ? t`<span .ariaBusy=${$(o, void 0)} .ariaControlsElements=${b} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${this.aria?.label} .ariaLabelledByElements=${u} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${a(h)} id=${d ?? r} role=button tabindex=${(e ? void 0 : 0) ?? r} ${v(this.buttonRef)}>${n}</span>` : t`<button .ariaBusy=${$(o, void 0)} .ariaChecked=${this.aria?.checked} .ariaControlsElements=${b} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${this.aria?.label} .ariaLabelledByElements=${u} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${a(h)} .disabled=${e} id=${d ?? r} .role=${this.aria?.role} type=${this.type ?? r} ${v(this.buttonRef)}>${n}</button>`;
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: t`${this.renderButton()}${this.renderIndicatorText()}` });
  }
}
z("calcite-action", O);
export {
  O as Action
};
