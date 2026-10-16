/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { L as o, c as d, b as h, d as c } from "./index.js";
import { c as u } from "./observers.js";
function b(l, e) {
  if (e === void 0) return l.trimEnd();
  let t = l.length;
  switch (typeof e) {
    case "string":
      if (e.length !== 1) throw new Error("The 'chars' parameter should be a single character string.");
      for (; t > 0 && l[t - 1] === e; ) t--;
      break;
    case "object":
      for (; t > 0 && e.includes(l[t - 1]); ) t--;
  }
  return l.substring(0, t);
}
function p(l, e) {
  if (e === void 0) return l.trimStart();
  let t = 0;
  switch (typeof e) {
    case "string":
      if (e.length !== 1) throw new Error("The 'chars' parameter should be a single character string.");
      for (; t < l.length && l[t] === e; ) t++;
      break;
    case "object":
      for (; t < l.length && e.includes(l[t]); ) t++;
  }
  return l.substring(t);
}
function m(l, e) {
  return e === void 0 ? l.trim() : p(b(l, e), e);
}
const f = [" ", `
`, "	", "\r"], g = /[^\S\u00A0]+/g;
class C extends o {
  constructor() {
    super(...arguments), this.mutationObserver = u("mutation", () => {
      this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
    }), this.disabled = !1, this.selected = !1, this.calciteInternalOptionChange = d({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1, selected: 7, value: 1 };
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
  handlePropChange(e, t, n) {
    (n === "label" || n === "value") && this.ensureTextContentDependentProps(), this.calciteInternalOptionChange.emit();
  }
  ensureTextContentDependentProps() {
    const { el: e, internallySetLabel: t, internallySetValue: n, label: r, value: a } = this, i = m(e.textContent, f).replaceAll(g, " "), s = r;
    (!s || s === t) && (this.label = i, this.internallySetLabel = i), (a == null || a === n) && (this.value = i, this.internallySetValue = i);
  }
  render() {
    return h`<slot>${this.label}</slot>`;
  }
}
c("calcite-option", C);
export {
  C as Option
};
