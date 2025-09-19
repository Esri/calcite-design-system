import { b as i, L as n, c as r, x as o, q as c } from "./index.js";
import { c as d } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
const h = i`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class u extends n {
  constructor() {
    super(...arguments), this.mutationObserver = d("mutation", () => {
      this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
    }), this.disabled = !1, this.calciteInternalOptionChange = r({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1, selected: 7, value: 1 };
  }
  static {
    this.styles = h;
  }
  connectedCallback() {
    super.connectedCallback(), this.ensureTextContentDependentProps(), this.mutationObserver?.observe(this.el, {
      attributeFilter: ["label", "value"],
      characterData: !0,
      childList: !0,
      subtree: !0
    });
  }
  willUpdate(e) {
    e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handlePropChange(this.disabled, e.get("disabled"), "disabled"), e.has("label") && this.handlePropChange(this.label, e.get("label"), "label"), e.has("selected") && this.handlePropChange(this.selected, e.get("selected"), "selected"), e.has("value") && this.handlePropChange(this.value, e.get("value"), "value");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  handlePropChange(e, l, t) {
    (t === "label" || t === "value") && this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
  }
  ensureTextContentDependentProps() {
    const { el: { textContent: e }, internallySetLabel: l, internallySetValue: t, label: a, value: s } = this;
    (!a || a === l) && (this.label = e, this.internallySetLabel = e), (s == null || s === t) && (this.value = e, this.internallySetValue = e);
  }
  render() {
    return o`<slot>${this.label}</slot>`;
  }
}
c("calcite-option", u);
export {
  u as Option
};
