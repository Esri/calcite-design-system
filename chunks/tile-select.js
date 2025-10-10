import { b, L as m, c as f, s as a, x as l, q as v } from "./index.js";
import { g as k } from "./guid.js";
import { u as x, I as y } from "./interactive.js";
import { l as w } from "./logger.js";
import { u as C } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  description: "description",
  descriptionOnly: "description-only",
  heading: "heading",
  headingOnly: "heading-only",
  icon: "icon",
  iconOnly: "icon-only",
  inputAlignmentEnd: "input-alignment-end",
  inputAlignmentStart: "input-alignment-start",
  inputEnabled: "input-enabled",
  largeVisual: "large-visual",
  tile: "tile",
  tileContentContainer: "tile-content-container",
  tileContent: "tile-content",
  tileDescription: "tile-description",
  tileHeading: "tile-heading",
  tileLargeVisual: "tile--large-visual",
  widthAuto: "width-auto",
  widthFull: "width-full"
}, B = b`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host .container{background-color:var(--calcite-color-foreground-1);box-shadow:0 0 0 1px var(--calcite-color-border-2);box-sizing:border-box;cursor:pointer;display:inline-block;block-size:100%;max-inline-size:300px;padding:.75rem;position:relative;vertical-align:top;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host .container.checked{z-index:var(--calcite-z-index);box-shadow:0 0 0 1px var(--calcite-color-brand)}:host .container.heading-only{align-items:center}:host .container:not(.input-enabled) ::slotted(calcite-checkbox),:host .container:not(.input-enabled) ::slotted(calcite-radio-button){position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host .container.focused{outline-color:transparent}:host .container.focused:not(.disabled):not(.input-enabled){outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));outline-offset:-4px;box-shadow:0 0 0 1px var(--calcite-color-brand),inset 0 0 0 2px var(--calcite-color-foreground-1)}:host .container.input-enabled.input-alignment-start.width-auto.heading-only,:host .container.input-enabled.input-alignment-start.width-auto.icon-only,:host .container.input-enabled.input-alignment-start.width-auto.description-only,:host .container.input-enabled.input-alignment-start.width-auto.heading.description,:host .container.input-enabled.input-alignment-start.width-auto.icon.description,:host .container.input-enabled.input-alignment-start.width-auto.heading.icon.description{display:inline-grid;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-start.heading-only,:host .container.input-enabled.input-alignment-start.icon-only,:host .container.input-enabled.input-alignment-start.description-only,:host .container.input-enabled.input-alignment-start.heading.description,:host .container.input-enabled.input-alignment-start.icon.description,:host .container.input-enabled.input-alignment-start.heading.icon.description{gap:.75rem}:host .container.input-enabled.input-alignment-start .tile{order:1}:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:.75rem;inset-inline-start:.75rem}:host .container.input-enabled.input-alignment-end.width-auto.heading-only,:host .container.input-enabled.input-alignment-end.width-auto.icon-only{display:inline-grid;grid-gap:.75rem;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-end.heading-only,:host .container.input-enabled.input-alignment-end.icon-only{gap:.75rem}:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-radio-button){position:absolute;inset-block-start:.75rem;inset-inline-end:.75rem}:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:.75rem;inset-inline-end:.75rem}:host .container.width-full{display:flex;max-inline-size:none}:host .container.width-full .tile{flex:1 1 auto}.tile{pointer-events:none;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;flex-direction:column;gap:.5rem;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-3);transition-timing-function:cubic-bezier(.4,0,.2,1)}.tile-content-container{display:flex;inline-size:100%;align-items:stretch;padding:0;color:var(--calcite-color-text-2);outline-color:transparent}.tile-content{display:flex;flex:1 1 auto;flex-direction:column;gap:.5rem;inline-size:10%}.tile-heading{pointer-events:none;overflow-wrap:break-word;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);transition-timing-function:cubic-bezier(.4,0,.2,1)}.tile-description{pointer-events:none;overflow-wrap:break-word;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-color-text-3);transition-timing-function:cubic-bezier(.4,0,.2,1)}.tile--large-visual{display:grid;justify-content:center;text-align:center;min-block-size:12rem}.tile--large-visual .icon{align-self:flex-end}.tile--large-visual calcite-icon{block-size:64px;inline-size:64px}.tile--large-visual .tile-content-container{align-self:center}:host(:hover) .container:not(.input-enabled){box-shadow:0 0 0 1px var(--calcite-color-brand)}:host(:hover) .tile-heading,.checked .tile-heading{color:var(--calcite-color-text-1)}:host(:hover) .tile-description,.checked .tile-description{color:var(--calcite-color-text-2)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends m {
  constructor() {
    super(), this.guid = `calcite-tile-select-${k()}`, this.focusSetter = C()(this), this.focused = !1, this.checked = !1, this.disabled = !1, this.iconFlipRtl = !1, this.inputAlignment = "start", this.inputEnabled = !1, this.type = "radio", this.width = "auto", this.calciteTileSelectChange = f({ cancelable: !1 }), this.listen("calciteCheckboxChange", this.checkboxChangeHandler), this.listen("calciteInternalCheckboxFocus", this.checkboxFocusBlurHandler), this.listen("calciteInternalCheckboxBlur", this.checkboxFocusBlurHandler), this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler), this.listen("calciteInternalRadioButtonCheckedChange", this.radioButtonCheckedChangeHandler), this.listen("calciteInternalRadioButtonFocus", this.radioButtonFocusBlurHandler), this.listen("calciteInternalRadioButtonBlur", this.radioButtonFocusBlurHandler), this.listen("click", this.clickHandler), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler);
  }
  static {
    this.properties = { focused: 16, checked: 7, description: 3, disabled: 7, heading: 3, icon: [3, { type: String }], iconFlipRtl: 7, inputAlignment: 3, inputEnabled: 7, name: 3, type: 3, value: 1, width: 3 };
  }
  static {
    this.styles = B;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.input, t);
  }
  connectedCallback() {
    super.connectedCallback(), this.renderInput();
  }
  load() {
    w.deprecated("component", {
      name: "tile-select",
      removalVersion: 4,
      suggested: ["tile", "tile-group"]
    });
  }
  willUpdate(t) {
    t.has("checked") && (this.hasUpdated || this.checked !== !1) && (this.input.checked = this.checked), t.has("name") && (this.input.name = this.name);
  }
  updated() {
    x(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.input?.remove();
  }
  checkboxChangeHandler(t) {
    const e = t.target;
    e === this.input && (this.checked = e.checked), t.stopPropagation(), this.calciteTileSelectChange.emit();
  }
  checkboxFocusBlurHandler(t) {
    t.target === this.input && (this.focused = t.detail), t.stopPropagation();
  }
  radioButtonChangeHandler(t) {
    const e = t.target;
    e === this.input && (this.checked = e.checked), t.stopPropagation(), this.calciteTileSelectChange.emit();
  }
  radioButtonCheckedChangeHandler(t) {
    const e = t.target;
    e === this.input && (this.checked = e.checked), t.stopPropagation();
  }
  radioButtonFocusBlurHandler(t) {
    const e = t.target;
    e === this.input && (this.focused = e.focused), t.stopPropagation();
  }
  clickHandler(t) {
    if (this.disabled)
      return;
    const e = t.target;
    ["calcite-tile", "calcite-tile-select"].includes(e.localName) && this.input.click();
  }
  pointerEnterHandler() {
    if (this.disabled)
      return;
    const { localName: t } = this.input;
    (t === "calcite-radio-button" || t === "calcite-checkbox") && (this.input.hovered = !0);
  }
  pointerLeaveHandler() {
    if (this.disabled)
      return;
    const { localName: t } = this.input;
    (t === "calcite-radio-button" || t === "calcite-checkbox") && (this.input.hovered = !1);
  }
  renderInput() {
    this.input = this.type === "radio" ? (
      /* we need to call createElement(x) separately to ensure supporting components are properly bundled */
      document.createElement(
        // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
        "calcite-radio-button"
      )
    ) : document.createElement(
      // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
      "calcite-checkbox"
    ), this.input.checked = this.checked, this.input.disabled = this.disabled, this.input.hidden = this.el.hidden, this.input.id = this.guid, this.input.label = this.heading || this.name || "", this.name && (this.input.name = this.name), this.value && (this.input.value = this.value != null ? this.value.toString() : ""), this.el.insertAdjacentElement("beforeend", this.input);
  }
  render() {
    const { checked: t, description: e, disabled: c, focused: h, heading: n, icon: o, inputAlignment: s, inputEnabled: p, width: r, iconFlipRtl: g } = this, d = n && o && !e, u = !!o;
    return y({ disabled: c, children: l`<div class=${a({
      checked: t,
      container: !0,
      [i.description]: !!e,
      [i.descriptionOnly]: !!(!n && !o && e),
      disabled: c,
      focused: h,
      [i.heading]: !!n,
      [i.headingOnly]: n && !o && !e,
      [i.icon]: u,
      [i.iconOnly]: !n && o && !e,
      [i.inputAlignmentEnd]: s === "end",
      [i.inputAlignmentStart]: s === "start",
      [i.inputEnabled]: p,
      [i.largeVisual]: d,
      [i.widthAuto]: r === "auto",
      [i.widthFull]: r === "full"
    })}><div class=${a({ [i.tile]: !0, [i.tileLargeVisual]: d })}>${o && l`<div class=${a({ [i.icon]: u })}><calcite-icon .flipRtl=${g} .icon=${o} scale=l></calcite-icon></div>` || ""}<div class=${a(i.tileContentContainer)}><div class=${a(i.tileContent)}>${n && l`<div class=${a(i.tileHeading)}>${n}</div>` || ""}${e && l`<div class=${a(i.tileDescription)}>${e}</div>` || ""}</div></div></div><slot></slot></div>` });
  }
}
v("calcite-tile-select", z);
export {
  z as TileSelect
};
