/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as i, L as n, s as e, b as s, d as a } from "./index.js";
import { s as d } from "./dom.js";
const t = {
  container: "container",
  legend: "legend",
  fieldWrapper: "field-wrapper"
}, o = i`:host{display:block;inline-size:100%}.container{display:flex;flex-direction:column;padding:0;border:0;margin:0}.legend{display:block;font-size:var(--calcite-font-size);font-weight:var(--calcite-font-weight-bold);line-height:var(--calcite-font-line-height-fixed-base);color:var(--calcite-field-set-legend-text-color, var(--calcite-color-text-1));padding-inline:0;margin-block-end:var(--calcite-space-md)}.field-wrapper{display:flex;flex-direction:column;gap:var(--calcite-field-group-gap, var(--calcite-field-set-gap, var(--calcite-space-md)))}:host([hidden]){display:none}[hidden]{display:none}`;
class c extends n {
  constructor() {
    super(...arguments), this.hasSlottedLegendElement = !1;
  }
  static {
    this.properties = { hasSlottedLegendElement: 16, legend: 1 };
  }
  static {
    this.styles = o;
  }
  handleLegendSlotChange(l) {
    this.hasSlottedLegendElement = d(l);
  }
  render() {
    return s`<fieldset class=${e(t.container)}><legend class=${e(t.legend)} .hidden=${!this.legend && !this.hasSlottedLegendElement}><slot name=legend @slotchange=${this.handleLegendSlotChange}>${this.legend}</slot></legend><div class=${e(t.fieldWrapper)}><slot></slot></div></fieldset>`;
  }
}
a("calcite-field-set", c);
export {
  c as FieldSet
};
