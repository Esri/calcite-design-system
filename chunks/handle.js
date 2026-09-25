/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as d, L as h, c as i, l as u, A as r, s as b, b as p, d as g } from "./index.js";
import { e as f, n as m } from "./ref.js";
import { u as v } from "./useT9n.js";
import { u as y } from "./useSetFocus.js";
import { u as x } from "./useInteractive.js";
const n = {
  handle: "handle",
  handleSelected: "handle--selected"
}, S = {
  drag: "drag"
}, l = {
  itemLabel: "{itemLabel}",
  position: "{position}",
  total: "{total}"
}, k = d`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.handle{display:flex;align-items:center;justify-content:center;align-self:stretch;border-style:none;outline-color:transparent;color:var(--calcite-handle-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-handle-background-color, transparent);padding-block:.75rem;padding-inline:.25rem;line-height:0}.handle calcite-icon{color:inherit}:host(:not([disabled])) .handle{cursor:move}:host(:not([disabled])) .handle:hover{color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-hover, var(--calcite-color-foreground-2))}:host(:not([disabled])) .handle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));color:var(--calcite-handle-icon-color-hover, var(--calcite-color-text-1))}:host(:not([disabled])) .handle--selected{color:var(--calcite-handle-icon-color-selected, var(--calcite-color-text-1));background-color:var(--calcite-handle-background-color-selected, var(--calcite-color-foreground-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends h {
  constructor() {
    super(...arguments), this.handleButtonRef = f(), this.messages = v({ blocking: !0 }), this.focusSetter = y()(this), this.interactiveContainer = x(this), this.blurUnselectDisabled = !1, this.disabled = !1, this.selected = !1, this.calciteHandleChange = i({ cancelable: !1 }), this.calciteHandleNudge = i({ cancelable: !1 }), this.calciteInternalAssistiveTextChange = i({ cancelable: !1 });
  }
  static {
    this.properties = { blurUnselectDisabled: 5, disabled: 7, dragHandle: 3, label: 1, messageOverrides: 0, selected: 7, setPosition: 9, setSize: 9 };
  }
  static {
    this.styles = k;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.handleButtonRef.value, e);
  }
  willUpdate(e) {
    (e.has("messages") || e.has("label") || e.has("selected") && (this.hasUpdated || this.selected !== !1) || e.has("setPosition") || e.has("setSize")) && this.handleAriaTextChange();
  }
  loaded() {
    u.deprecated("component", {
      component: this,
      name: "handle",
      removalVersion: 5,
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
    const { setPosition: t, setSize: s, label: o, messages: a, selected: c } = this;
    return !a || !o || typeof s != "number" || typeof t != "number" ? void 0 : (e === "label" ? c ? a.dragHandleChange : a.dragHandleIdle : c ? a.dragHandleActive : a.dragHandleCommit).replace(l.position, t.toString()).replace(l.itemLabel, o).replace(l.total, s.toString());
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
    return this.interactiveContainer({ disabled: this.disabled, children: p`<span .ariaChecked=${this.disabled ? void 0 : this.selected} .ariaDisabled=${this.disabled ? this.disabled : void 0} .ariaLabel=${this.disabled ? void 0 : this.getAriaText("label")} class=${b({ [n.handle]: !0, [n.handleSelected]: !this.disabled && this.selected })} @blur=${this.handleBlur} @keydown=${this.handleKeyDown} role=radio tabindex=${(this.disabled ? void 0 : 0) ?? r} title=${this.getTooltip() ?? r} ${m(this.handleButtonRef)}><calcite-icon .icon=${S.drag} scale=s></calcite-icon></span>` });
  }
}
g("calcite-handle", C);
export {
  C as Handle
};
