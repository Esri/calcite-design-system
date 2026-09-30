/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as e } from "./formatting.js";
import "./combobox-item.js";
import "./combobox.js";
import "./input-date-picker.js";
import "./input-time-picker.js";
import { s as i, b as l, a as c, i as s, c as t, d as r, e as o, f as d, g as n, t as p, h as m, j as b, k, l as u, m as v, n as f, p as x, o as $ } from "./color-picker2.js";
const w = () => e`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
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

      <div class="fallback-row">${s} ${t} ${r}</div>

      <div class="fallback-row">${o} ${d} ${n}</div>

      <div class="fallback-row">${p}</div>

      <div class="fallback-row">${m}</div>

      <div class="fallback-row">${b} ${k} ${u}</div>

      <div class="fallback-row">${v} ${f}</div>

      <div class="fallback-row">
        <calcite-slider min="0" max="100" value="50"></calcite-slider>
        ${x}
      </div>

      <div class="fallback-row">${$}</div>
    </div>
  </div>`, T = {
  title: "Theming/Corner Radius Fallbacks"
}, a = () => w();
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
const C = ["cornerRadiusFallbacks"];
export {
  C as __namedExportsOrder,
  a as cornerRadiusFallbacks,
  T as default
};
