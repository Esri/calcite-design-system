import { html } from "../support/formatting";
import "./components/combobox-item/combobox-item";
import "./components/combobox/combobox";
import "./components/input-date-picker/input-date-picker";
import "./components/input-time-picker/input-time-picker";
import { autocomplete } from "./custom-theme/autocomplete";
import { buttons } from "./custom-theme/button";
import { card } from "./custom-theme/card";
import { colorPicker, colorPickerFieldDisabled } from "./custom-theme/color-picker";
import { datePicker } from "./custom-theme/date-picker";
import { filter } from "./custom-theme/filter";
import { input } from "./custom-theme/input";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { inputTimeZone } from "./custom-theme/input-time-zone";
import { panel } from "./custom-theme/panel";
import { progress } from "./custom-theme/progress";
import { select } from "./custom-theme/select";
import { segmentedControl } from "./custom-theme/segmented-control";
import { splitButton } from "./custom-theme/split-button";
import { table } from "./custom-theme/table";
import { textArea } from "./custom-theme/text-area";
import { tile } from "./custom-theme/tile";
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

      .fallback-row--single {
        flex-wrap: nowrap;
      }

      .fallback-range-picker {
        inline-size: 340px;
        max-inline-size: 100%;
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

      <div class="fallback-row">
        ${splitButton}
        <div dir="rtl">${splitButton}</div>
        ${buttons} ${segmentedControl}
      </div>

      <div class="fallback-row">
        <calcite-input-date-picker
          class="fallback-range-picker"
          label-text="Horizontal range"
          layout="horizontal"
          range
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          class="fallback-range-picker"
          label-text="Vertical range"
          layout="vertical"
          range
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          class="fallback-range-picker"
          dir="rtl"
          label-text="Horizontal range RTL"
          layout="horizontal"
          range
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          class="fallback-range-picker"
          dir="rtl"
          label-text="Vertical range RTL"
          layout="vertical"
          range
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          class="fallback-range-picker"
          label-text="Read-only vertical range"
          layout="vertical"
          range
          read-only
        ></calcite-input-date-picker>
        <calcite-input-date-picker
          class="fallback-range-picker"
          dir="rtl"
          label-text="Read-only vertical range RTL"
          layout="vertical"
          range
          read-only
        ></calcite-input-date-picker>
      </div>

      <div class="fallback-row">${inputText} ${inputNumber} ${inputTimeZone}</div>

      <div class="fallback-row">${input} ${autocomplete} ${select}</div>

      <div class="fallback-row">${textArea}</div>

      <div class="fallback-row">${filter}</div>

      <div class="fallback-row">
        <calcite-color-picker></calcite-color-picker>
        <calcite-color-picker dir="rtl"></calcite-color-picker>
        ${colorPicker} <calcite-color-picker alpha-channel dir="rtl"></calcite-color-picker> ${colorPickerFieldDisabled}
        ${datePicker} ${timePicker}
      </div>

      <div class="fallback-row">${card} ${tile}</div>

      <div class="fallback-row">${panel}</div>

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
