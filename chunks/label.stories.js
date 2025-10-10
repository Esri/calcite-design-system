import { h as a, j as t } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const n = {
  title: "Components/Label"
}, l = () => a`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label>
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label>
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Default label wrapping a select
      <calcite-select>
        <calcite-option>a</calcite-option>
        <calcite-option>b</calcite-option>
        <calcite-option>c</calcite-option>
      </calcite-select>
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
    <calcite-label layout="block">
      layout="block"
      <calcite-input-text placeholder="I'm below the label"></calcite-input-text>
    </calcite-label>
    <calcite-label layout="inline">
      layout="inline"
      <calcite-input-text placeholder="I'm next to the label"></calcite-input-text>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      layout="inline-space-between"
      <calcite-input-text placeholder="I'm right aligned"></calcite-input-text>
    </calcite-label>
  </div>
`, e = () => a`
  <div style="width:300px;max-width:100%;text-align:center;" class="calcite-mode-dark" dir="rtl">
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
  </div>
`;
e.parameters = {
  themes: t
};
const c = () => a`
  <style>
    .css-var {
      --calcite-label-margin-bottom: 0;
    }
  </style>
  <calcite-label class="css-var">
    I don't have a bottom margin because the document I am rendered in has overridden the --calcite-label-margin-bottom
    css variable to 0.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should still not have a bottom margin because I'm using the CSS variable.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should also have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    Add Notes
    <calcite-text-area></calcite-text-area>
  </calcite-label>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label>
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label>
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label>
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Default label wrapping a select
      <calcite-select>
        <calcite-option>a</calcite-option>
        <calcite-option>b</calcite-option>
        <calcite-option>c</calcite-option>
      </calcite-select>
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
    <calcite-label layout="block">
      layout="block"
      <calcite-input-text placeholder="I'm below the label"></calcite-input-text>
    </calcite-label>
    <calcite-label layout="inline">
      layout="inline"
      <calcite-input-text placeholder="I'm next to the label"></calcite-input-text>
    </calcite-label>
    <calcite-label layout="inline-space-between">
      layout="inline-space-between"
      <calcite-input-text placeholder="I'm right aligned"></calcite-input-text>
    </calcite-label>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:300px;max-width:100%;text-align:center;" class="calcite-mode-dark" dir="rtl">
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Default label wrapping a segmented control
      <calcite-segmented-control>
        <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
        <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark">
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-mode-dark" layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label>
      Add Notes
      <calcite-text-area></calcite-text-area>
    </calcite-label>
  </div>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .css-var {
      --calcite-label-margin-bottom: 0;
    }
  </style>
  <calcite-label class="css-var">
    I don't have a bottom margin because the document I am rendered in has overridden the --calcite-label-margin-bottom
    css variable to 0.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should still not have a bottom margin because I'm using the CSS variable.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    I should also have a bottom margin
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label class="css-var">
    I should not have a bottom margin because I have the CSS variable set.
    <calcite-input></calcite-input>
  </calcite-label>
  <calcite-label>
    Add Notes
    <calcite-text-area></calcite-text-area>
  </calcite-label>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const s = ["simple", "darkModeRTL_TestOnly", "spacingWithLabel_TestOnly"];
export {
  s as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  n as default,
  l as simple,
  c as spacingWithLabel_TestOnly
};
