import { b as n, L as r, c as a, u as l, s as e, x as c, q as s } from "./index.js";
import { u as d, I as p } from "./interactive.js";
import { u as h } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider"
}, u = {
  trigger: "trigger"
}, t = {
  chevronDown: "chevronDown",
  caretDown: "caretDown",
  ellipsis: "ellipsis",
  handleVertical: "handle-vertical"
}, b = n`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}:host([kind=brand]){--calcite-internal-split-button-divider-border-color: var(--calcite-color-brand);--calcite-internal-split-button-divider-color: var(--calcite-color-foreground-1)}:host([kind=danger]){--calcite-internal-split-button-divider-border-color: var(--calcite-color-status-danger);--calcite-internal-split-button-divider-color: var(--calcite-color-foreground-1)}:host([kind=neutral]){--calcite-internal-split-button-divider-border-color: var(--calcite-color-foreground-3);--calcite-internal-split-button-divider-color: var(--calcite-color-text-1)}:host([kind=inverse]){--calcite-internal-split-button-divider-border-color: var(--calcite-color-inverse);--calcite-internal-split-button-divider-color: var(--calcite-color-foreground-1)}:host([appearance=transparent]){--calcite-internal-split-button-divider-border-color: transparent}:host([appearance=transparent]):host([kind=brand]){--calcite-internal-split-button-divider-color: var(--calcite-color-brand)}:host([appearance=transparent]):host([kind=danger]){--calcite-internal-split-button-divider-color: var(--calcite-color-status-danger)}:host([appearance=transparent]):host([kind=neutral]){--calcite-internal-split-button-divider-color: var(--calcite-color-text-1)}:host([appearance=transparent]):host([kind=inverse]){--calcite-internal-split-button-divider-color: var(--calcite-color-foreground-1)}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline]):host([kind=danger]),:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline]):host([kind=inverse]){--calcite-internal-split-button-divider-border-color: transparent}:host([appearance=outline-fill]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=danger]),:host([appearance=outline-fill]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-internal-split-button-divider-border-color: var(--calcite-color-background)}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=brand]){--calcite-internal-split-button-divider-color: var(--calcite-color-brand)}:host([appearance=outline]):host([kind=danger]),:host([appearance=outline-fill]):host([kind=danger]){--calcite-internal-split-button-divider-color: var(--calcite-color-status-danger)}:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=neutral]){--calcite-internal-split-button-divider-color: var(--calcite-color-border-1)}:host([appearance=outline]):host([kind=inverse]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-internal-split-button-divider-color: var(--calcite-color-inverse)}.container{display:flex;align-items:stretch}.container>calcite-dropdown>calcite-button{block-size:100%;vertical-align:top}.divider-container{display:flex;inline-size:1px;align-items:stretch;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-split-button-divider-color, var(--calcite-internal-split-button-divider-border-color))}.divider{margin-block:.25rem;display:inline-block;inline-size:1px;background-color:var(--calcite-split-button-divider-border-color, var(--calcite-internal-split-button-divider-color))}:host([appearance=outline-fill]) .divider-container,:host([appearance=outline]) .divider-container{border-block:1px solid var(--calcite-internal-split-button-divider-color)}:host([appearance=outline-fill]):hover .divider-container,:host([appearance=outline]):hover .divider-container{background-color:var(--calcite-internal-split-button-divider-color)}:host([appearance=outline-fill]:hover) .divider-container,:host([appearance=outline]:hover) .divider-container{background-color:var(--calcite-internal-split-button-divider-color)}:host([appearance=outline-fill]:focus-within):host([kind=brand]),:host([appearance=outline]:focus-within):host([kind=brand]){--calcite-internal-split-button-divider-color: var(--calcite-color-brand-press)}:host([appearance=outline-fill]:focus-within):host([kind=danger]),:host([appearance=outline]:focus-within):host([kind=danger]){--calcite-internal-split-button-divider-color: var(--calcite-color-danger-press)}:host([appearance=outline-fill]:focus-within) .divider-container,:host([appearance=outline]:focus-within) .divider-container{background-color:var(--calcite-internal-split-button-divider-color)}calcite-button[split-child=primary],calcite-button[split-child=secondary]{--calcite-button-background-color: var(--calcite-split-button-background-color);--calcite-button-border-color: var(--calcite-split-button-border-color);--calcite-button-text-color: var(--calcite-split-button-text-color);--calcite-button-icon-color: var(--calcite-split-button-icon-color);--calcite-button-loading-color: var(--calcite-split-button-loading-color);--calcite-button-shadow: var(--calcite-split-button-shadow)}calcite-button[split-child=primary]{--calcite-button-corner-radius: var(--calcite-split-button-corner-radius) var(--calcite-corner-radius-none) var(--calcite-corner-radius-none) var(--calcite-split-button-corner-radius)}calcite-button[split-child=secondary]{--calcite-button-corner-radius: var(--calcite-corner-radius-none) var(--calcite-split-button-corner-radius) var(--calcite-split-button-corner-radius) var(--calcite-corner-radius-none)}calcite-dropdown{--calcite-dropdown-shadow: var(--calcite-split-button-dropdown-shadow);--calcite-dropdown-background-color: var(--calcite-split-button-dropdown-background-color);--calcite-dropdown-width: var(--calcite-split-button-dropdown-width)}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}:host([disabled]):host([appearance=outline-fill]) .divider-container{background-color:var(--calcite-color-background)}:host([disabled]):host([appearance=outline]) .divider-container{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends r {
  constructor() {
    super(...arguments), this.focusSetter = h()(this), this.active = !1, this.appearance = "solid", this.disabled = !1, this.download = !1, this.dropdownIconType = "chevron", this.kind = "brand", this.loading = !1, this.overlayPositioning = "absolute", this.placement = "bottom-end", this.scale = "m", this.width = "auto", this.calciteSplitButtonPrimaryClick = a({ cancelable: !1 }), this.calciteSplitButtonSecondaryClick = a({ cancelable: !1 });
  }
  static {
    this.properties = { active: 7, appearance: 3, disabled: 7, download: [3, { converter: l }], dropdownIconType: 3, dropdownLabel: 3, flipPlacements: 0, href: 3, kind: 3, loading: 7, overlayPositioning: 3, rel: 3, placement: 3, primaryIconEnd: [3, { type: String }], primaryIconFlipRtl: 3, primaryIconStart: [3, { type: String }], primaryLabel: 3, primaryText: 3, scale: 3, target: 3, width: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = b;
  }
  get dropdownIcon() {
    return this.dropdownIconType === "chevron" ? t.chevronDown : this.dropdownIconType === "caret" ? t.caretDown : this.dropdownIconType === "ellipsis" ? t.ellipsis : t.handleVertical;
  }
  async setFocus(i) {
    return this.focusSetter(() => this.el, i);
  }
  updated() {
    d(this);
  }
  calciteSplitButtonPrimaryClickHandler() {
    this.calciteSplitButtonPrimaryClick.emit();
  }
  calciteSplitButtonSecondaryClickHandler() {
    this.calciteSplitButtonSecondaryClick.emit();
  }
  render() {
    const i = this.width === "auto" ? "auto" : "full";
    return p({ disabled: this.disabled, children: c`<div class=${e(o.container)}><calcite-button .appearance=${this.appearance} .disabled=${this.disabled} .download=${this.download} .href=${this.href} .iconEnd=${this.primaryIconEnd ? this.primaryIconEnd : null} .iconFlipRtl=${this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null} .iconStart=${this.primaryIconStart ? this.primaryIconStart : null} .kind=${this.kind} .label=${this.primaryLabel} .loading=${this.loading} @click=${this.calciteSplitButtonPrimaryClickHandler} .rel=${this.rel} .scale=${this.scale} split-child=primary .target=${this.target} type=button .width=${i}>${this.primaryText}</calcite-button><div class=${e(o.dividerContainer)}><div class=${e(o.divider)}></div></div><calcite-dropdown .disabled=${this.disabled} .flipPlacements=${this.flipPlacements} @click=${this.calciteSplitButtonSecondaryClickHandler} .open=${this.active} .overlayPositioning=${this.overlayPositioning} .placement=${this.placement} .scale=${this.scale} .widthScale=${this.scale}><calcite-button .appearance=${this.appearance} .disabled=${this.disabled} .iconStart=${this.dropdownIcon} .kind=${this.kind} .label=${this.dropdownLabel} .scale=${this.scale} slot=${u.trigger} split-child=secondary type=button></calcite-button><slot></slot></calcite-dropdown></div>` });
  }
}
s("calcite-split-button", v);
export {
  v as SplitButton
};
