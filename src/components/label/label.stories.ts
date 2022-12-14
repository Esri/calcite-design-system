import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";
export default {
  title: "Components/Label",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label>
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label>
      Default label wrapping a radio group
      <calcite-radio-group>
        <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
        <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
        <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      </calcite-radio-group>
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
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;" class="calcite-theme-dark" dir="rtl">
    <calcite-label class="calcite-theme-dark">
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-theme-dark">
      Default label wrapping a radio group
      <calcite-radio-group>
        <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
        <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
        <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      </calcite-radio-group>
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-theme-dark">
      Focus slider test
      <calcite-slider></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-theme-dark">
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
    </calcite-label>
    <calcite-label class="calcite-theme-dark" layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
    </calcite-label>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const spacingWithLabel_TestOnly = (): string => html`
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
`;
