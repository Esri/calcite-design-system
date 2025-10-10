import { b as o, L as d, c, x as h, q as u } from "./index.js";
import { c as b } from "./observers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function p(n, e) {
  if (e === void 0)
    return n.trimEnd();
  let t = n.length;
  switch (typeof e) {
    case "string": {
      if (e.length !== 1)
        throw new Error("The 'chars' parameter should be a single character string.");
      for (; t > 0 && n[t - 1] === e; )
        t--;
      break;
    }
    case "object":
      for (; t > 0 && e.includes(n[t - 1]); )
        t--;
  }
  return n.substring(0, t);
}
function f(n, e) {
  if (e === void 0)
    return n.trimStart();
  let t = 0;
  switch (typeof e) {
    case "string": {
      for (; t < n.length && n[t] === e; )
        t++;
      break;
    }
    case "object":
      for (; t < n.length && e.includes(n[t]); )
        t++;
  }
  return n.substring(t);
}
function m(n, e) {
  return e === void 0 ? n.trim() : f(p(n, e), e);
}
const C = o`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}:host([hidden]){display:none}[hidden]{display:none}`, v = [" ", `
`, "	", "\r"];
class g extends d {
  constructor() {
    super(...arguments), this.mutationObserver = b("mutation", () => {
      this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
    }), this.disabled = !1, this.calciteInternalOptionChange = c({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1, selected: 7, value: 1 };
  }
  static {
    this.styles = C;
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
  handlePropChange(e, t, l) {
    (l === "label" || l === "value") && this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
  }
  ensureTextContentDependentProps() {
    const { el: e, internallySetLabel: t, internallySetValue: l, label: r, value: a } = this, i = m(e.textContent, v), s = r;
    (!s || s === t) && (this.label = i, this.internallySetLabel = i), (a == null || a === l) && (this.value = i, this.internallySetValue = i);
  }
  render() {
    return h`<slot>${this.label}</slot>`;
  }
}
u("calcite-option", g);
export {
  g as Option
};
