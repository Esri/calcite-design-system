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
import "./components/segmented-control/segmented-control";
import "./components/segmented-control-item/segmented-control-item";
import { timePicker } from "./custom-theme/time-picker";

const kitchenSink = () =>
  html`<div style="--calcite-corner-radius: 24px; padding: 1rem;">
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

      .fallback-popup-row {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
        gap: 2rem;
        min-block-size: 24rem;
        padding-block-end: 1rem;
      }

      .fallback-popup-row > * {
        max-inline-size: 20rem;
      }

      .fallback-popup-row--first {
        min-block-size: 10rem;
      }
    </style>

    <div class="fallback-grid">
      <div class="fallback-popup-row fallback-popup-row--first">
        <calcite-split-button active primary-text="Button" style="--calcite-split-button-dropdown-width: 6rem">
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>Option 2</calcite-dropdown-item>
            <calcite-dropdown-item>Option 3</calcite-dropdown-item>
            <calcite-dropdown-item>Option 4</calcite-dropdown-item>
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
        <calcite-input-time-picker label-text="Input Time Picker" open></calcite-input-time-picker>
      </div>

      <div class="fallback-popup-row">
        <calcite-input-date-picker label-text="Input Date Picker" open></calcite-input-date-picker>
        ${defaultCombobox}
        <calcite-input-time-zone max-items="7" open reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
      </div>

      <div class="fallback-row">${inputText} ${inputNumber}</div>

      <div class="fallback-row">${input} ${autocomplete} ${select}</div>

      <div class="fallback-row">${segmentedControl} ${buttons}</div>

      <div class="fallback-row">${colorPicker} ${datePicker} ${timePicker}</div>

      <div class="fallback-row">${card} ${tile}</div>

      <div class="fallback-row">
        <calcite-slider min="0" max="100" value="50"></calcite-slider>
        ${progress}
      </div>

      <div class="fallback-row">${table}</div>
    </div>
  </div>`;

export default {
  title: "Theming/Corner Radius Fallbacks",
};

export const cornerRadiusFallbacks = (): string => {
  return kitchenSink();
};
