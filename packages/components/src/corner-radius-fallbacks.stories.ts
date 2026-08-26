import { html } from "../support/formatting";
import { autocomplete } from "./custom-theme/autocomplete";
import { buttons } from "./custom-theme/button";
import { card } from "./custom-theme/card";
import { colorPicker } from "./custom-theme/color-picker";
import { defaultCombobox } from "./custom-theme/combobox";
import { datePicker } from "./custom-theme/date-picker";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { input } from "./custom-theme/input";
import { progress } from "./custom-theme/progress";
import { select } from "./custom-theme/select";
import { segmentedControl } from "./custom-theme/segmented-control";
import { table } from "./custom-theme/table";
import { tile } from "./custom-theme/tile";
import { timePicker } from "./custom-theme/time-picker";

const kitchenSink = () =>
  html`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
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

      .fallback-popup-row {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        gap: 1rem;
        min-block-size: 24rem;
        padding-block-end: 1rem;
      }

      .fallback-popup-row > * {
        flex: 0 1 11rem;
        max-inline-size: 11rem;
        min-inline-size: 0;
      }

      .fallback-card {
        inline-size: 260px;
      }

      .fallback-slider {
        inline-size: 12rem;
      }
    </style>

    <div class="fallback-grid">
      <div class="fallback-popup-row">
        <calcite-split-button active primary-text="Button">
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>Option 2</calcite-dropdown-item>
            <calcite-dropdown-item>Option 3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>
        <calcite-menu layout="horizontal">
          <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers" open>
            <calcite-menu-item
              href="#calcite-navigation-slots"
              icon-start="add-in"
              slot="submenu-item"
              text="Slots"
              active
            ></calcite-menu-item>
            <calcite-menu-item
              href="#calcite-navigation-css-vars"
              icon-start="multiple-variables"
              slot="submenu-item"
              text="Css vars"
            ></calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu layout="vertical">
          <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers" open>
            <calcite-menu-item
              href="#calcite-navigation-slots"
              icon-start="add-in"
              slot="submenu-item"
              text="Slots"
              active
            ></calcite-menu-item>
            <calcite-menu-item
              href="#calcite-navigation-css-vars"
              icon-start="multiple-variables"
              slot="submenu-item"
              text="Css vars"
            ></calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu>
      </div>

      <div class="fallback-popup-row">
        <calcite-input-time-zone max-items="7" open reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
        <calcite-input-time-picker label-text="Input Time Picker" open></calcite-input-time-picker>
        <calcite-input-date-picker label-text="Input Date Picker" open></calcite-input-date-picker>
        ${defaultCombobox}
      </div>

      <div class="fallback-row">${inputText} ${inputNumber} ${input} ${select}</div>

      <div class="fallback-row">${buttons} ${autocomplete} ${segmentedControl}</div>

      <div class="fallback-row">
        <calcite-slider class="fallback-slider" min="0" max="100" value="50"></calcite-slider>
      </div>

      <div class="fallback-row">${progress}</div>

      <div class="fallback-row">${colorPicker} ${datePicker} ${tile} ${timePicker}</div>

      <div class="fallback-row fallback-card">${card}</div>

      <div class="fallback-row">${table}</div>
    </div>
  </div>`;

export default {
  title: "Theming/Corner Radius Fallbacks",
};

export const cornerRadiusFallbacks = (): string => {
  return kitchenSink();
};
