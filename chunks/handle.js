import { a as d, L as h, d as i, s as u, E as r, x as b, c as p } from "./iframe.js";
import { e as f, n as g } from "./ref.js";
import { c as m } from "./component.js";
import { u as v, I as y } from "./interactive.js";
import { u as x } from "./useT9n.js";
import { l as k } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const n = {
  handle: "handle",
  handleSelected: "handle--selected"
}, H = {
  drag: "drag"
}, l = {
  itemLabel: "{itemLabel}",
  position: "{position}",
  total: "{total}"
}, C = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.handle{display:flex;align-items:center;justify-content:center;align-self:stretch;border-style:none;outline-color:transparent;color:var(--calcite-handle-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-handle-background-color, transparent);padding-block:.75rem;padding-inline:.25rem;line-height:0}.handle calcite-icon{color:inherit}:host(:not([disabled])) .handle{cursor:move}:host(:not([disabled])) .handle:hover{color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-hover, var(--calcite-color-foreground-2))}:host(:not([disabled])) .handle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1))}:host(:not([disabled])) .handle--selected{color:var(--calcite-handle-icon-color-selected, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-selected, var(--calcite-color-foreground-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class w extends h {
  constructor() {
    super(...arguments), this.handleButton = f(), this.messages = x({ blocking: !0 }), this.blurUnselectDisabled = !1, this.disabled = !1, this.selected = !1, this.calciteHandleChange = i({ cancelable: !1 }), this.calciteHandleNudge = i({ cancelable: !1 }), this.calciteInternalAssistiveTextChange = i({ cancelable: !1 });
  }
  static {
    this.properties = { blurUnselectDisabled: 5, disabled: 7, dragHandle: 3, label: 1, messageOverrides: 0, selected: 7, setPosition: 9, setSize: 9 };
  }
  static {
    this.styles = C;
  }
  async setFocus() {
    await m(this), this.handleButton.value?.focus();
  }
  willUpdate(e) {
    (e.has("messages") || e.has("label") || e.has("selected") && (this.hasUpdated || this.selected !== !1) || e.has("setPosition") || e.has("setSize")) && this.handleAriaTextChange();
  }
  updated() {
    v(this);
  }
  loaded() {
    k.deprecated("component", {
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
    const { setPosition: t, setSize: s, label: c, messages: a, selected: o } = this;
    return !a || !c || typeof s != "number" || typeof t != "number" ? null : (e === "label" ? o ? a.dragHandleChange : a.dragHandleIdle : o ? a.dragHandleActive : a.dragHandleCommit).replace(l.position, t.toString()).replace(l.itemLabel, c).replace(l.total, s.toString());
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
    return y({ disabled: this.disabled, children: b`<span .ariaChecked=${this.disabled ? null : this.selected} .ariaDisabled=${this.disabled ? this.disabled : null} .ariaLabel=${this.disabled ? null : this.getAriaText("label")} class=${u({ [n.handle]: !0, [n.handleSelected]: !this.disabled && this.selected })} @blur=${this.handleBlur} @keydown=${this.handleKeyDown} role=radio tabindex=${(this.disabled ? null : 0) ?? r} title=${this.getTooltip() ?? r} ${g(this.handleButton)}><calcite-icon .icon=${H.drag} scale=s></calcite-icon></span>` });
  }
}
p("calcite-handle", w);
export {
  w as Handle
};
