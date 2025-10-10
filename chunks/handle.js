import { b as n, L as d, c as s, s as h, E as u, x as b, q as p } from "./index.js";
import { e as f, n as g } from "./ref.js";
import { u as m, I as v } from "./interactive.js";
import { u as y } from "./useT9n.js";
import { l as x } from "./logger.js";
import { u as S } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = {
  handle: "handle",
  handleSelected: "handle--selected"
}, k = {
  drag: "drag"
}, l = {
  itemLabel: "{itemLabel}",
  position: "{position}",
  total: "{total}"
}, H = n`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.handle{display:flex;align-items:center;justify-content:center;align-self:stretch;border-style:none;outline-color:transparent;color:var(--calcite-handle-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-handle-background-color, transparent);padding-block:.75rem;padding-inline:.25rem;line-height:0}.handle calcite-icon{color:inherit}:host(:not([disabled])) .handle{cursor:move}:host(:not([disabled])) .handle:hover{color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-hover, var(--calcite-color-foreground-2))}:host(:not([disabled])) .handle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1))}:host(:not([disabled])) .handle--selected{color:var(--calcite-handle-icon-color-selected, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-selected, var(--calcite-color-foreground-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends d {
  constructor() {
    super(...arguments), this.handleButtonRef = f(), this.messages = y({ blocking: !0 }), this.focusSetter = S()(this), this.blurUnselectDisabled = !1, this.disabled = !1, this.selected = !1, this.calciteHandleChange = s({ cancelable: !1 }), this.calciteHandleNudge = s({ cancelable: !1 }), this.calciteInternalAssistiveTextChange = s({ cancelable: !1 });
  }
  static {
    this.properties = { blurUnselectDisabled: 5, disabled: 7, dragHandle: 3, label: 1, messageOverrides: 0, selected: 7, setPosition: 9, setSize: 9 };
  }
  static {
    this.styles = H;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.handleButtonRef.value, e);
  }
  willUpdate(e) {
    (e.has("messages") || e.has("label") || e.has("selected") && (this.hasUpdated || this.selected !== !1) || e.has("setPosition") || e.has("setSize")) && this.handleAriaTextChange();
  }
  updated() {
    m(this);
  }
  loaded() {
    x.deprecated("component", {
      name: "handle",
      removalVersion: 4,
      suggested: "sort-handle"
    });
  }
  handleAriaTextChange() {
    const e = this.getAriaText("live");
    e && this.calciteInternalAssistiveTextChange.emit({
      message: e
    });
  }
  getTooltip() {
    const { label: e, messages: t } = this;
    return t ? e ? t.dragHandle.replace(l.itemLabel, e) : t.dragHandleUntitled : "";
  }
  getAriaText(e) {
    const { setPosition: t, setSize: i, label: c, messages: a, selected: o } = this;
    return !a || !c || typeof i != "number" || typeof t != "number" ? null : (e === "label" ? o ? a.dragHandleChange : a.dragHandleIdle : o ? a.dragHandleActive : a.dragHandleCommit).replace(l.position, t.toString()).replace(l.itemLabel, c).replace(l.total, i.toString());
  }
  handleKeyDown(e) {
    if (!this.disabled)
      switch (e.key) {
        case " ":
          this.selected = !this.selected, this.calciteHandleChange.emit(), e.preventDefault();
          break;
        case "ArrowUp":
          if (!this.selected)
            return;
          e.preventDefault(), this.calciteHandleNudge.emit({ direction: "up" });
          break;
        case "ArrowDown":
          if (!this.selected)
            return;
          e.preventDefault(), this.calciteHandleNudge.emit({ direction: "down" });
          break;
      }
  }
  handleBlur() {
    this.blurUnselectDisabled || this.disabled || this.selected && (this.selected = !1, this.calciteHandleChange.emit());
  }
  render() {
    return v({ disabled: this.disabled, children: b`<span .ariaChecked=${this.disabled ? null : this.selected} .ariaDisabled=${this.disabled ? this.disabled : null} .ariaLabel=${this.disabled ? null : this.getAriaText("label")} class=${h({ [r.handle]: !0, [r.handleSelected]: !this.disabled && this.selected })} @blur=${this.handleBlur} @keydown=${this.handleKeyDown} role=radio tabindex=${this.disabled ? null : 0} title=${this.getTooltip() ?? u} ${g(this.handleButtonRef)}><calcite-icon .icon=${k.drag} scale=s></calcite-icon></span>` });
  }
}
p("calcite-handle", C);
export {
  C as Handle
};
