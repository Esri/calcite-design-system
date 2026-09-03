/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as l } from "./formatting.js";
import { b as e, c as s, a as i, d as c, i as r, e as t, f as o, g as d, h as n, s as m, j as k, k as v, t as b, l as f, m as p, n as u, o as g } from "./color-picker2.js";
import "./segmented-control.js";
import "./segmented-control-item.js";
const $ = () => l`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
    <style>
      .fallback-grid {
        display: grid;
        gap: 1rem;
      }

      .fallback-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 1rem;
      }

      .fallback-row > * {
        flex: 0 0 auto;
      }

      .fallback-card {
        inline-size: 260px;
      }
    </style>

    <div class="fallback-grid">
      <div class="fallback-row">${e}</div>

      <div class="fallback-row fallback-card">${s}</div>

      <div class="fallback-row">${i} ${c} ${r}</div>

      <div class="fallback-row">${t} ${o} ${d} ${n} ${m}</div>

      <div class="fallback-row">${k}</div>

      <div class="fallback-row">${v}</div>

      <div class="fallback-row">
        <calcite-segmented-control>
          <calcite-segmented-control-item value="alpha" checked>Alpha</calcite-segmented-control-item>
          <calcite-segmented-control-item value="beta">Beta</calcite-segmented-control-item>
        </calcite-segmented-control>
      </div>

      <div class="fallback-row">${b}</div>

      <div class="fallback-row">${f}</div>

      <div class="fallback-row">${p}</div>

      <div class="fallback-row">${u}</div>

      <div class="fallback-row">${g}</div>
    </div>
  </div>`, F = {
  title: "Theming/Corner Radius Fallbacks"
}, a = () => $();
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
