import { h as e } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = e`<calcite-autocomplete scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-autocomplete>`, l = e`<calcite-checkbox
  name="m-unchecked"
  scale="m"
  label-text="Label text"
  required
></calcite-checkbox>`, a = e`<calcite-combobox
  label="test"
  label-text="Label text"
  placeholder="select element"
  max-items="6"
  selection-mode="single"
  scale="m"
  required
>
  <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
  <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
  <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-combobox>`, i = e`<calcite-input-date-picker
  scale="m"
  value="2023-03-07"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input-date-picker>`, o = e`<calcite-input-number
  placeholder="Placeholder"
  scale="m"
  value="123"
  step="1"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input-number>`, n = e`<calcite-input-text placeholder="Placeholder" scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input-text>`, s = e`<calcite-input-time-picker
  label-text="Label text"
  required
  scale="m"
  step="0.1"
  value="10:37:09.5"
  ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
></calcite-input-time-picker>`, r = e`<calcite-input-time-zone scale="m" label-text="Label text" required
  ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
></calcite-input-time-zone>`, d = e`<calcite-input
  type="text"
  placeholder="Placeholder"
  scale="m"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input>`, m = e`<calcite-radio-button-group
  scale="m"
  name="def-h-m"
  label-text="Label text"
  required
>
  <calcite-radio-button value="stencil-def-m" checked label-text="Stencil"></calcite-radio-button>
  <calcite-radio-button value="react-def-m" label-text="React"></calcite-radio-button>
  <calcite-radio-button value="ember-def-m" label-text="Ember"></calcite-radio-button>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-radio-button-group>`, b = e`<calcite-radio-button scale="m" label-text="Label text"></calcite-radio-button>`, u = e`<calcite-rating scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-rating>`, x = e`<calcite-segmented-control scale="m" label-text="Label text" required>
  <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
  <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
  <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
  <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-segmented-control>`, v = e`<calcite-select
  label="calcite select"
  width="auto"
  scale="m"
  label-text="Label text"
  required
>
  <calcite-option value="high">😃</calcite-option>
  <calcite-option value="medium">😶</calcite-option>
  <calcite-option value="low">😭</calcite-option>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-select>`, p = e`<calcite-slider
  scale="m"
  min="10000"
  max="100000"
  value="100000"
  step="1000"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-slider>`, g = e`<calcite-switch
  label-text-start="Label text start"
  label-text-end="Label text end"
></calcite-switch>`, h = e`<calcite-text-area placeholder="add notes" scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-text-area>`, w = () => e`<div>
    <style>
      .demo {
        display: flex;
        align-items: flex-start;
        justify-items: space-between;
      }
      .demo-column {
        margin-right: 2rem;
      }
      .demo-row {
        display: flex;
        margin-bottom: 2rem;
      }
    </style>
    <div class="demo">
      <div class="demo-column">
        <div class="demo-row">${c}</div>

        <div class="demo-row">${l}</div>

        <div class="demo-row">${a}</div>

        <div class="demo-row">${i}</div>

        <div class="demo-row">${o}</div>

        <div class="demo-row">${n}</div>

        <div class="demo-row">${s}</div>

        <div class="demo-row">${r}</div>

        <div class="demo-row">${d}</div>
      </div>

      <div class="demo-column">
        <div class="demo-row">${m}</div>

        <div class="demo-row">${b}</div>

        <div class="demo-row">${u}</div>

        <div class="demo-row">${x}</div>

        <div class="demo-row">${v}</div>

        <div class="demo-row">${p}</div>

        <div class="demo-row">${g}</div>

        <div class="demo-row">${h}</div>
      </div>
    </div>
  </div>`, k = {
  title: "Forms/Internal label"
}, t = () => w();
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return kitchenSink();
}`,
      ...t.parameters?.docs?.source
    }
  }
};
const $ = ["internalLabel"];
export {
  $ as __namedExportsOrder,
  k as default,
  t as internalLabel
};
