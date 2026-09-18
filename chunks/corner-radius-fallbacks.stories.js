/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as e } from "./formatting.js";
import "./combobox-item.js";
import "./combobox.js";
import "./input-date-picker.js";
import "./input-time-picker.js";
import { s as i, b as l, a as c, i as t, c as r, d as s, e as o, f as d, g as n, h as p, j as m, t as b, k, l as u, p as v, m as f } from "./color-picker2.js";
const x = () => e`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
    <style>
      .fallback-grid {
        display: grid;
        gap: 2rem;
      }

      .fallback-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 2rem;
      }

      .fallback-row--single {
        flex-wrap: nowrap;
      }
    </style>

    <div class="fallback-grid">
      <div class="fallback-row fallback-row--single">
        <calcite-input-time-picker label-text="Input Time Picker"></calcite-input-time-picker>
        <calcite-combobox label-text="Combobox">
          <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
        </calcite-combobox>
        <calcite-input-date-picker label-text="Input Date Picker"></calcite-input-date-picker>
      </div>

      <div class="fallback-row">${i} ${l} ${c}</div>

      <div class="fallback-row">${t} ${r} ${s}</div>

      <div class="fallback-row">${o} ${d} ${n}</div>

      <div class="fallback-row">${p} ${m} ${b}</div>

      <div class="fallback-row">${k} ${u}</div>

      <div class="fallback-row">
        <calcite-slider min="0" max="100" value="50"></calcite-slider>
        ${v}
      </div>

      <div class="fallback-row">${f}</div>
    </div>
  </div>`, F = {
  title: "Theming/Corner Radius Fallbacks"
}, a = () => x();
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return kitchenSink();
}`,
      ...a.parameters?.docs?.source
    }
  }
};
const R = ["cornerRadiusFallbacks"];
export {
  R as __namedExportsOrder,
  a as cornerRadiusFallbacks,
  F as default
};
